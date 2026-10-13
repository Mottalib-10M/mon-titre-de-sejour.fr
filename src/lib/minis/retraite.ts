import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Carte retraité : le coût pour le foyer', 'Retiree card: cost for the household'), cta: T(l, 'Comparer avec la carte visiteur', 'Compare with the visitor card'),
  inputs: [{ id: 'c', label: T(l, 'Avec le conjoint', 'With your spouse'), def: 1, options: yn(l).reverse() }],
  run: ({ c }: Record<string, number>) => { const n = c ? 2 : 1; const u = coutTitre('retraite', 'premiere').total;
    return { head: [T(l, 'Timbres pour le foyer', 'Stamps for the household'), eur(u * n, l)] as [string, string],
      rows: [[T(l, 'Par carte', 'Per card'), eur(u, l)], [T(l, 'Carte visiteur, à titre de comparaison', 'Visitor card, for comparison'), eur(coutTitre('visiteur', 'premiere').total * n, l)]] as [string, string][] }; },
});
