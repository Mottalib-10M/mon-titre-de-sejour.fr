/**
 * Regroupement familial (CESEDA L434-1 et s., R434-1 et s. ; fiche F11166 du 1er juin 2026) :
 * - ressources : moyenne du Smic mensuel brut sur les 12 mois précédant la demande pour 2 ou 3
 *   personnes, majorée d'un dixième pour 4 ou 5 personnes et d'un cinquième pour 6 personnes ou plus ;
 * - logement : 22 m² (zones A bis et A), 24 m² (B1 et B2) ou 28 m² (C) pour 2 personnes, plus 10 m²
 *   par personne jusqu'à 8, puis 5 m² par personne au-delà ;
 * - 18 mois de séjour régulier avant la demande ; silence de 6 mois = refus implicite.
 */
import { P } from './params';
import { moyenneSmic12 } from './smic';
import { addMonths } from './dates';

const RF = P.regroupement;

/** Coefficient de majoration selon le nombre de personnes du foyer (demandeur compris). */
export function coefFamille(personnes: number): number {
  const n = Math.max(2, Math.round(personnes));
  return (RF.coefficients.find((c) => n >= c.min && n <= c.max) ?? RF.coefficients[RF.coefficients.length - 1]).coef;
}

export interface SeuilRF { seuil: number; moyenneSmic: number; coef: number; mois: Array<{ mois: string; mensuel: number }> }
/** Seuil mensuel moyen de ressources pour un dépôt à la date donnée. */
export function seuilRegroupement(personnes: number, depot: string): SeuilRF {
  const { moyenne, mois } = moyenneSmic12(depot);
  const coef = coefFamille(personnes);
  return { seuil: Math.round(moyenne * coef * 100) / 100, moyenneSmic: moyenne, coef, mois };
}

export interface VerdictRF extends SeuilRF { ressources: number; ecart: number; atteint: boolean; dispense: boolean }
/**
 * `ressources` : moyenne mensuelle brute des ressources du couple sur les 12 mois (prestations
 * familiales, RSA, ASPA, ASS, ATA et AER exclues). `aah` : bénéficiaire de l'AAH ou de l'ASI
 * (pas de condition de ressources).
 */
export function verdictRegroupement(o: { personnes: number; depot: string; ressources: number; aah?: boolean }): VerdictRF {
  const s = seuilRegroupement(o.personnes, o.depot);
  const ecart = Math.round((o.ressources - s.seuil) * 100) / 100;
  return { ...s, ressources: o.ressources, ecart, atteint: !!o.aah || ecart >= 0, dispense: !!o.aah };
}

export type Zone = 'A' | 'B' | 'C';
/** Surface habitable minimale (m²) pour un foyer de `personnes` personnes dans la zone. */
export function surfaceMin(zone: Zone, personnes: number): number {
  const n = Math.max(2, Math.round(personnes));
  const s = RF.surface;
  return s.base[zone] + s.par_personne * (Math.min(n, 8) - 2) + s.au_dela_8 * Math.max(0, n - 8);
}

/** Date à partir de laquelle la demande est possible (18 mois de séjour régulier). */
export const regroupementDes = (debutSejour: string) => addMonths(debutSejour, RF.sejour_min_mois);
/** Date du refus implicite en l'absence de réponse du préfet (6 mois). */
export const regroupementImplicite = (depot: string) => addMonths(depot, RF.implicite_mois);
