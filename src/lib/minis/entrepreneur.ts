import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Votre activité atteint-elle le Smic ?', 'Does your business reach the minimum wage?'), cta: T(l, 'Coût de la carte', 'Cost of the card'),
  inputs: [{ id: 'r', label: T(l, 'Revenu mensuel tiré de l’activité', 'Monthly income from the business'), def: 2000, unit: '€', max: 1000000 }],
  run: ({ r }: Record<string, number>) => { const min = P.entrepreneur.revenu_mensuel_min; const e = r - min;
    return { head: [T(l, e >= 0 ? 'Au-dessus du seuil de' : 'En dessous du seuil de', e >= 0 ? 'Above the threshold by' : 'Below the threshold by'), eur(Math.abs(e), l)] as [string, string],
      rows: [[T(l, 'Seuil mensuel (Smic brut)', 'Monthly threshold (gross minimum wage)'), eur2(min, l)], [T(l, 'Revenu annuel exigé', 'Annual income needed'), eur(min * 12, l)], [T(l, 'Timbres première carte', 'First-card stamps'), eur(coutTitre('entrepreneur', 'premiere').total, l)]] as [string, string][] }; },
});
