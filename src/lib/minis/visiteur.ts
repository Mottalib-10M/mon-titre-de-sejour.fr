import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Ressources exigées pour la carte visiteur', 'Resources required for the visitor card'), cta: T(l, 'Coût des timbres', 'Stamp costs'),
  inputs: [{ id: 'r', label: T(l, 'Vos revenus nets par mois', 'Your net income per month'), def: 1600, unit: '€', max: 100000 }],
  run: ({ r }: Record<string, number>) => { const min = P.visiteur.ressources_mensuelles_net; const e = r - min;
    return { head: [T(l, e >= 0 ? 'Marge sur le minimum' : 'Il manque par mois', e >= 0 ? 'Margin over the minimum' : 'Shortfall per month'), eur(Math.abs(e), l)] as [string, string],
      rows: [[T(l, 'Minimum mensuel (Smic net)', 'Monthly minimum (net minimum wage)'), eur2(min, l)], [T(l, 'Minimum annuel', 'Annual minimum'), eur2(P.visiteur.ressources_annuelles_net, l)], [T(l, 'Timbres première carte', 'First-card stamps'), eur(coutTitre('visiteur', 'premiere').total, l)]] as [string, string][] }; },
});
