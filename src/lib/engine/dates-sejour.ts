/**
 * Dates du parcours de séjour, en jours civils (dates ISO) :
 * - naturalisation par décret (Code civil art. 21-17 et 21-18, fiche F2213 du 16 juillet 2026) ;
 * - déclaration par mariage (Code civil art. 21-2, fiche F2726 du 1er mai 2026) ;
 * - carte de résident (fiches F2208 du 1er juillet 2026 et F17359 du 1er juin 2026) ;
 * - carte pluriannuelle (fiche F35799 du 1er mai 2026) ;
 * - renouvellement : dépôt au plus tôt 4 mois et au plus tard 2 mois avant la fin du titre ;
 *   récépissé de 3 mois à partir du lendemain de l'expiration (F2209, F15763) ;
 * - VLS-TS : validation dans les 3 mois suivant l'arrivée (F16162).
 */
import { P } from './params';
import { addMonths, addDays, cmp, monthsBetween } from './dates';

const N = P.naturalisation, M = P.mariage, R = P.resident, RN = P.renouvellement;

export type CasNaturalisation = 'general' | 'diplome' | 'dispense';
/** Durée de résidence exigée, en années : 5 ans ; 2 ans après deux années d'études supérieures en France
 *  sanctionnées par un diplôme (ou services importants, parcours exceptionnel) ; aucune pour un réfugié. */
export const dureeNaturalisation = (cas: CasNaturalisation) => (cas === 'dispense' ? 0 : cas === 'diplome' ? N.reduite_ans : N.residence_ans);

export interface Naturalisation { eligible: string; dateNaissance18?: string; depotDes: string; delaiReponse?: string; delaiProlonge?: string; delaiMois: number }
/**
 * `debut` : début de la résidence régulière en France. `naissance` : pour l'âge (dépôt dès 17 ans).
 * `recepisse` : date du récépissé de dossier complet ; `dixAns` : résidence habituelle d'au moins
 * 10 ans à cette date (délai ramené de 18 à 12 mois). Prolongation possible : 3 mois.
 */
export function naturalisation(o: { debut: string; cas: CasNaturalisation; naissance?: string; recepisse?: string; dixAns?: boolean }): Naturalisation {
  const eligible = addMonths(o.debut, 12 * dureeNaturalisation(o.cas));
  let depotDes = eligible;
  let dateNaissance18: string | undefined;
  if (o.naissance) {
    const a17 = addMonths(o.naissance, 12 * N.depot_age);
    dateNaissance18 = addMonths(o.naissance, 12 * N.age_min);
    if (cmp(a17, depotDes) > 0) depotDes = a17;
  }
  const delaiMois = o.dixAns ? N.delai_10ans_mois : N.delai_mois;
  const r: Naturalisation = { eligible, depotDes, dateNaissance18, delaiMois };
  if (o.recepisse) { r.delaiReponse = addMonths(o.recepisse, delaiMois); r.delaiProlonge = addMonths(r.delaiReponse, N.prolongation_mois); }
  return r;
}

/** Résidence habituelle d'au moins 10 ans à une date (délai de réponse de 12 mois). */
export const dixAnsA = (debut: string, date: string) => monthsBetween(debut, date) >= 120;

export interface Mariage { annees: number; eligible: string; refusAvant?: string; refusOppositionAvant?: string }
/**
 * Déclaration de nationalité par mariage : 4 ans de mariage. 5 ans si, depuis le mariage, le
 * déclarant n'a pas résidé en France de façon continue pendant au moins 3 ans et que le conjoint
 * français n'était pas inscrit au registre des Français établis hors de France.
 * Le ministère a 1 an (2 ans en cas d'opposition) à partir du récépissé pour refuser l'enregistrement.
 */
export function mariage(o: { date: string; residence3ans: boolean; inscritConsulat?: boolean; recepisse?: string }): Mariage {
  const annees = o.residence3ans || o.inscritConsulat ? M.duree_ans : M.duree_longue_ans;
  const r: Mariage = { annees, eligible: addMonths(o.date, 12 * annees) };
  if (o.recepisse) { r.refusAvant = addMonths(o.recepisse, 12 * M.refus_ans); r.refusOppositionAvant = addMonths(o.recepisse, 12 * M.refus_opposition_ans); }
  return r;
}

export type MotifResident = 'residence' | 'conjoint' | 'conjoint_tunisien' | 'regroupement' | 'protection';
/** Années exigées pour la carte de résident selon le motif : 5 ans de résidence régulière
 *  (résident longue durée-UE), 3 ans de mariage avec un Français (1 an pour un Tunisien),
 *  3 ans de résidence pour la famille entrée par regroupement familial auprès d'un résident,
 *  4 ans de carte pluriannuelle pour un protégé subsidiaire ou un apatride. */
export const anneesResident = (m: MotifResident) =>
  m === 'residence' ? R.residence_ans : m === 'conjoint' ? R.conjoint_francais_ans : m === 'conjoint_tunisien' ? R.conjoint_tunisien_ans : m === 'regroupement' ? R.regroupement_ans : R.ps_apatride_ans;

/** Date à partir de laquelle la condition de durée est remplie (le début est la date du mariage
 *  pour un conjoint de Français, celle du premier titre sinon). */
export const residentEligible = (debut: string, m: MotifResident) => addMonths(debut, 12 * anneesResident(m));

/** Absences sur la période de 5 ans de la carte de résident longue durée-UE : au plus 6 mois
 *  consécutifs et 10 mois au total (fiche F17359). */
export const absencesOk = (plusLongueMois: number, totalMois: number) => plusLongueMois <= R.absence_consecutive_mois && totalMois <= R.absences_total_mois;

/** Carte pluriannuelle : demandée au renouvellement du premier titre d'un an (VLS-TS ou carte temporaire). */
export const pluriannuelleEligible = (debutPremierTitre: string) => addMonths(debutPremierTitre, 12 * P.pluriannuelle.apres_ans);

export type Phase = 'trop_tot' | 'ouverte' | 'retard' | 'expire';
export interface Fenetre { ouverture: string; limite: string; expiration: string; recepisseFin: string; phase: Phase; joursAvantLimite: number }
/** Fenêtre de dépôt d'un renouvellement à partir de la date de fin du titre et du jour considéré. */
export function fenetreRenouvellement(expiration: string, jour: string): Fenetre {
  const ouverture = addMonths(expiration, -RN.au_plus_tot_mois);
  const limite = addMonths(expiration, -RN.au_plus_tard_mois);
  const recepisseFin = addMonths(addDays(expiration, 1), RN.recepisse_mois);
  const phase: Phase = cmp(jour, ouverture) < 0 ? 'trop_tot' : cmp(jour, limite) <= 0 ? 'ouverte' : cmp(jour, expiration) <= 0 ? 'retard' : 'expire';
  const joursAvantLimite = Math.round((Date.parse(limite) - Date.parse(jour)) / 86400000);
  return { ouverture, limite, expiration, recepisseFin, phase, joursAvantLimite };
}

/** VLS-TS : validation en ligne au plus tard 3 mois après l'arrivée ; demande de carte au plus
 *  tard 2 mois avant la fin du visa. */
export function vlsTs(arrivee: string, finVisa: string): { validationAvant: string; carteOuverture: string; carteLimite: string } {
  return { validationAvant: addMonths(arrivee, RN.vls_ts_validation_mois), carteOuverture: addMonths(finVisa, -RN.au_plus_tot_mois), carteLimite: addMonths(finVisa, -RN.au_plus_tard_mois) };
}

/** Date du refus implicite (silence de l'administration) à partir du dépôt. */
export function refusImplicite(depot: string, o: { mois?: number; jours?: number }): string | null {
  if (o.mois) return addMonths(depot, o.mois);
  if (o.jours) return addDays(depot, o.jours);
  return null;
}
