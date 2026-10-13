/**
 * Seuils de salaire des titres « travail » (fiches F16922 du 1er juin 2026, F17319 et F2229 du
 * 1er juin 2026, F2728 du 18 juin 2026 ; arrêté du 21 août 2025 sur le salaire de référence).
 * - talent salarié qualifié, entreprise innovante, salarié en mission : 39 582 € brut annuel ;
 * - carte bleue européenne : 1,5 fois ce salaire, soit 59 373 € ; contrat d'au moins 6 mois ;
 * - professions médicales (praticien associé, 2e échelon) : 41 386,48 € ;
 * - mandataire social : 3 Smic annuels, soit 67 212,60 € ;
 * - changement de statut après la carte « recherche d'emploi » : plus de 2 800,53 € brut par mois.
 * Taxe employeur (CESEDA L436-10) : contrat de 3 à 12 mois 74 / 210 / 300 € selon le salaire ;
 * contrat de 12 mois ou plus 55 % du salaire mensuel brut, plafonnée à 2 567,15 €.
 */
import { P } from './params';

const TL = P.talent;

export type Voie = 'talent_salarie' | 'carte_bleue' | 'praticien' | 'mandataire' | 'rece';
export interface Seuil { voie: Voie; annuel: number; atteint: boolean; ecart: number }

/** Seuils annuels bruts comparés à un salaire annuel brut. */
export function seuilsTalent(salaireAnnuel: number): Seuil[] {
  const s = (voie: Voie, annuel: number): Seuil => ({ voie, annuel, atteint: salaireAnnuel >= annuel, ecart: Math.round((salaireAnnuel - annuel) * 100) / 100 });
  return [
    s('talent_salarie', TL.salaire_ref),
    s('carte_bleue', TL.cbe),
    s('praticien', TL.praticien),
    s('mandataire', TL.mandataire),
    s('rece', P.rece.seuil_mensuel * 12),
  ];
}

/** Carte bleue européenne : salaire et durée du contrat. Durée de la carte : celle du contrat
 *  jusqu'à 4 ans si le contrat dure 2 ans ou plus ; sinon contrat + 3 mois, dans la limite de 2 ans. */
export function carteBleue(salaireAnnuel: number, contratMois: number): { salaireOk: boolean; contratOk: boolean; dureeMois: number } {
  const contratOk = contratMois >= TL.cbe_contrat_min_mois;
  const dureeMois = contratMois >= 24 ? Math.min(contratMois, 12 * TL.duree_max_ans) : Math.min(contratMois + 3, 24);
  return { salaireOk: salaireAnnuel >= TL.cbe, contratOk, dureeMois: contratOk ? dureeMois : 0 };
}

/** Changement de statut étudiant → salarié depuis la carte RECE : rémunération mensuelle brute
 *  strictement supérieure au seuil (1,5 Smic) et emploi en relation avec la formation. */
export const receSeuilOk = (salaireMensuel: number) => salaireMensuel > P.rece.seuil_mensuel;

export type Contrat = 'court' | 'long' | 'saisonnier' | 'jeune_pro';
/** Taxe due par l'employeur à la première admission au séjour d'un salarié étranger. */
export function taxeEmployeur(o: { type: Contrat; salaireMensuel: number; moisSaison?: number }): number {
  const TE = P.taxe_employeur;
  if (o.type === 'saisonnier') return TE.saisonnier_par_mois * Math.max(1, Math.ceil(o.moisSaison ?? 1));
  if (o.type === 'jeune_pro') return TE.jeune_pro;
  if (o.type === 'court') {
    for (const t of TE.court) if (t.jusqua === null || o.salaireMensuel <= t.jusqua) return t.montant;
    return TE.court[TE.court.length - 1].montant;
  }
  return o.salaireMensuel >= TE.long_plafond_salaire ? TE.long_plafond : Math.round(o.salaireMensuel * TE.long_taux * 100) / 100;
}
