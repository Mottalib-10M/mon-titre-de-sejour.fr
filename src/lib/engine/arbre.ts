/**
 * « Quel titre pour ma situation ? » : arbre de décision sur les motifs de séjour du CESEDA tels que
 * les fiches Service-Public les décrivent (relues le 2026-10-13). Le résultat est une orientation :
 * le titre dont les conditions correspondent aux réponses, ses alternatives et les étapes suivantes
 * (carte pluriannuelle, carte de résident, nationalité). Il ne remplace pas l'examen de la préfecture.
 */
import { P } from './params';

export type Nationalite = 'autre' | 'ue' | 'algerien' | 'tunisien';
export type Motif = 'salarie' | 'qualifie' | 'entreprise' | 'etudes' | 'conjoint' | 'parent' | 'famille' | 'retraite' | 'visiteur' | 'soins' | 'protection' | 'sans_titre';

export interface Reponses {
  nationalite: Nationalite;
  motif: Motif;
  /** Salaire brut annuel prévu (motifs « salarie » et « qualifie »). */
  salaire?: number;
  /** Diplôme français au moins équivalent au master. */
  master?: boolean;
  /** Années de résidence régulière déjà accomplies en France. */
  annees?: number;
  /** Années de mariage (motif « conjoint »). */
  anneesMariage?: number;
}

export interface Piste { titre: string; fiche: string; pourquoi: string }
export interface Orientation { principal: Piste; alternatives: Piste[]; suite: Array<{ etape: string; dans: number }>; horsTitre?: 'ue' | 'algerien' }

const fiche = (id: string) => (P.titres.find((t) => t.id === id) ?? { fiche: 'sp_F39' }).fiche;
const piste = (titre: string, pourquoi: string): Piste => ({ titre, fiche: fiche(titre), pourquoi });

export function orienter(r: Reponses): Orientation {
  const a = Math.max(0, r.annees ?? 0);
  const suite: Array<{ etape: string; dans: number }> = [];
  const push = (etape: string, total: number) => { const d = Math.max(0, total - a); suite.push({ etape, dans: d }); };

  // Européens (UE, EEE, Suisse) : pas de titre obligatoire (fiche F2651).
  if (r.nationalite === 'ue') {
    return { principal: { titre: 'ue', fiche: 'sp_F2651', pourquoi: 'ue_libre' }, alternatives: [], suite: [{ etape: 'naturalisation', dans: Math.max(0, P.naturalisation.residence_ans - a) }], horsTitre: 'ue' };
  }

  let principal: Piste;
  const alternatives: Piste[] = [];
  switch (r.motif) {
    case 'qualifie': {
      const s = r.salaire ?? 0;
      if (s >= P.talent.cbe) { principal = piste('carte_bleue', 'cbe_seuil'); if (r.master) alternatives.push(piste('talent_salarie', 'talent_seuil')); }
      else if (s >= P.talent.salaire_ref && r.master) principal = piste('talent_salarie', 'talent_seuil');
      else { principal = piste('salarie', 'sous_seuil_talent'); }
      alternatives.push(piste('salarie', 'salarie_autorisation'));
      push('resident', P.resident.residence_ans);
      break;
    }
    case 'salarie':
      principal = piste('salarie', 'salarie_autorisation');
      alternatives.push(piste('travailleur_temporaire', 'contrat_court'));
      if ((r.salaire ?? 0) >= P.talent.salaire_ref && r.master) alternatives.unshift(piste('talent_salarie', 'talent_seuil'));
      push('pluriannuelle', P.pluriannuelle.apres_ans); push('resident', P.resident.residence_ans);
      break;
    case 'entreprise':
      principal = piste('entrepreneur', 'entreprise_smic');
      alternatives.push(piste('talent_salarie', 'talent_createur'));
      push('pluriannuelle', P.pluriannuelle.apres_ans); push('resident', P.resident.residence_ans);
      break;
    case 'etudes':
      principal = piste('etudiant', 'etudes_ressources');
      alternatives.push(piste('etudiant_mobilite', 'mobilite'), piste('rece', 'apres_diplome'));
      push('pluriannuelle', P.pluriannuelle.apres_ans);
      break;
    case 'conjoint':
      principal = piste('vpf_conjoint', 'conjoint_francais');
    {
      const m = Math.max(0, r.anneesMariage ?? 0);
      const y = r.nationalite === 'tunisien' ? P.resident.conjoint_tunisien_ans : P.resident.conjoint_francais_ans;
      suite.push({ etape: 'resident', dans: Math.max(0, y - m) }, { etape: 'mariage', dans: Math.max(0, P.mariage.duree_ans - m) });
      break;
    }
    case 'parent':
      principal = piste('vpf_parent', 'parent_francais');
      push('resident', P.resident.conjoint_francais_ans);
      break;
    case 'famille':
      principal = piste('regroupement', a * 12 >= P.regroupement.sejour_min_mois ? 'regroupement_ok' : 'regroupement_attente');
      alternatives.push(piste('vpf_liens', 'liens_familiaux'));
      break;
    case 'retraite':
      principal = piste('retraite', 'pension_france');
      alternatives.push(piste('visiteur', 'ressources_propres'));
      break;
    case 'visiteur':
      principal = piste('visiteur', 'ressources_propres');
      break;
    case 'soins':
      principal = piste('etranger_malade', 'soins');
      break;
    case 'protection':
      principal = piste('refugie', 'protection');
      alternatives.push(piste('famille_refugie', 'famille_protection'));
      break;
    default:
      principal = piste('admission_exceptionnelle', 'sans_titre');
      alternatives.push(piste('vpf_liens', 'liens_familiaux'));
  }
  if (r.motif !== 'etudes' && r.motif !== 'soins' && r.motif !== 'sans_titre') push('naturalisation', P.naturalisation.residence_ans);
  if (r.motif === 'etudes') push('naturalisation', P.naturalisation.reduite_ans);
  const alts = alternatives.filter((x, i, arr) => x.titre !== principal.titre && arr.findIndex((y) => y.titre === x.titre) === i);
  return { principal, alternatives: alts, suite, ...(r.nationalite === 'algerien' ? { horsTitre: 'algerien' as const } : {}) };
}
