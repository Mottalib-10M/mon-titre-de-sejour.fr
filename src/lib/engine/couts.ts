/**
 * Coût d'un titre de séjour en timbres fiscaux, barème en vigueur depuis le 1er mai 2026
 * (loi de finances pour 2026, art. 128 ; Service-Public A18881 et fiche de chaque titre).
 * Tarif normal : 350 € (1re délivrance, duplicata), 250 € (renouvellement).
 * Tarif minoré : 150 € / 100 €. Droit de timbre seul : 50 €. VLS-TS : taxe de 300 € ou 100 €.
 * Visa de régularisation : 300 € (dont 100 € au dépôt, non remboursables). Dépôt hors délai : 180 €.
 */
import { P } from './params';

export type Tarif = 'normal' | 'minore' | 'timbre_seul' | 'gratuit';
export type Operation = 'premiere' | 'renouvellement' | 'duplicata' | 'vls';
export interface Titre { id: string; fiche: string; tarif: string; vls: string | null; implicite_mois?: number; implicite_jours?: number; regularisation?: boolean; label: { fr: string; en: string } }

export const TITRES: Titre[] = P.titres as Titre[];
export const titreById = (id: string): Titre => {
  const t = TITRES.find((x) => x.id === id);
  if (!t) throw new Error(`Titre inconnu : ${id}`);
  return t;
};

export interface Ligne { cle: 'taxe' | 'timbre' | 'vls' | 'regularisation' | 'retard' | 'nationalite'; montant: number }
export interface Cout { total: number; lignes: Ligne[]; tarif: Tarif; possible: boolean }

/**
 * Coût pour une personne. `sansVisa` : entrée sans visa de long séjour (visa de régularisation).
 * `retard` : renouvellement déposé après la date limite (droit de 180 €).
 */
export function coutTitre(id: string, op: Operation, opts: { sansVisa?: boolean; retard?: boolean } = {}): Cout {
  const t = titreById(id);
  const tarif = t.tarif as Tarif;
  const T = P.tarifs;
  const lignes: Ligne[] = [];
  let possible = true;
  if (op === 'vls') {
    if (!t.vls) possible = false;
    else lignes.push({ cle: 'vls', montant: t.vls === 'minore' ? T.vls_ts.minore : T.vls_ts.normal });
  } else {
    const b = T[tarif] as { premiere: number; renouvellement: number; duplicata: number };
    const total = b[op];
    const timbre = tarif === 'gratuit' ? 0 : Math.min(T.droit_timbre, total);
    if (total - timbre > 0) lignes.push({ cle: 'taxe', montant: total - timbre });
    if (timbre > 0) lignes.push({ cle: 'timbre', montant: timbre });
  }
  if (opts.sansVisa && op === 'premiere') lignes.push({ cle: 'regularisation', montant: T.visa_regularisation });
  if (opts.retard && op === 'renouvellement') lignes.push({ cle: 'retard', montant: T.retard_renouvellement });
  return { total: lignes.reduce((s, l) => s + l.montant, 0), lignes, tarif, possible };
}

/** Parcours d'arrivée classique : validation du VLS-TS (année 1), puis 1re carte (année 2). */
export function coutParcours(id: string, annees: number): { total: number; etapes: Array<{ annee: number; op: Operation; montant: number }> } {
  const t = titreById(id);
  const etapes: Array<{ annee: number; op: Operation; montant: number }> = [];
  for (let a = 1; a <= annees; a++) {
    const op: Operation = a === 1 ? (t.vls ? 'vls' : 'premiere') : a === 2 && t.vls ? 'premiere' : 'renouvellement';
    etapes.push({ annee: a, op, montant: coutTitre(id, op).total });
  }
  return { total: etapes.reduce((s, e) => s + e.montant, 0), etapes };
}

/** Timbre des procédures de nationalité (naturalisation, réintégration, déclaration par mariage). */
export const timbreNationalite = (guyane = false) => (guyane ? P.tarifs.nationalite_guyane : P.tarifs.nationalite);

/** Hausse du 1er mai 2026 : ancien et nouveau montant pour une opération au tarif donné. */
export function hausse2026(tarif: 'normal' | 'minore', op: 'premiere' | 'renouvellement'): { avant: number; apres: number } {
  const A = P.tarifs.anciens;
  const avant = tarif === 'normal' ? A[op] : op === 'premiere' ? A.premiere_minore : A.renouvellement_minore;
  return { avant, apres: (P.tarifs[tarif] as Record<string, number>)[op] };
}
