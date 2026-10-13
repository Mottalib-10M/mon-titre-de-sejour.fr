/**
 * Smic brut en vigueur à une date, et moyenne sur les douze mois qui précèdent une demande
 * (regroupement familial, CESEDA R434-4 tel que repris par la fiche F11166). Série : Insee,
 * « Smic : données annuelles de 1980 à 2026 » (paru le 9 septembre 2026).
 */
import { P } from './params';
import { firstOfMonthAfter, cmp } from './dates';

export interface SmicPoint { depuis: string; horaire: number; mensuel: number }
const HIST: SmicPoint[] = [...P.smic.historique].sort((a, b) => cmp(a.depuis, b.depuis));

/** Smic en vigueur le jour donné (date ISO). Avant la première date connue : la première valeur. */
export function smicAt(iso: string): SmicPoint {
  let cur = HIST[0];
  for (const h of HIST) if (cmp(h.depuis, iso) <= 0) cur = h;
  return cur;
}

/** Smic mensuel brut en vigueur aujourd'hui (dernière valeur de la série). */
export const SMIC_ACTUEL = HIST[HIST.length - 1];

/**
 * Moyenne du Smic mensuel brut sur les 12 mois civils qui précèdent le mois du dépôt :
 * pour un dépôt en octobre 2026, d'octobre 2025 à septembre 2026. Chaque mois prend le Smic
 * en vigueur le 1er du mois. Renvoie aussi le détail mois par mois.
 */
export function moyenneSmic12(depot: string): { moyenne: number; mois: Array<{ mois: string; mensuel: number }> } {
  const mois: Array<{ mois: string; mensuel: number }> = [];
  for (let k = -12; k <= -1; k++) {
    const m = firstOfMonthAfter(depot, k);
    mois.push({ mois: m, mensuel: smicAt(m).mensuel });
  }
  const moyenne = mois.reduce((s, x) => s + x.mensuel, 0) / mois.length;
  return { moyenne: Math.round(moyenne * 100) / 100, mois };
}
