import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Au pair : argent de poche et timbres', 'Au pair: pocket money and stamps'), cta: T(l, 'Dates de validation du visa', 'Visa validation dates'),
  inputs: [{ id: 'm', label: T(l, 'Mois de séjour', 'Months of stay'), def: 12, max: 24 }],
  run: ({ m }: Record<string, number>) => { const n = Math.max(1, Math.round(m));
    return { head: [T(l, 'Argent de poche minimal sur le séjour', 'Minimum pocket money over the stay'), eur(P.au_pair.argent_de_poche_min * n, l)] as [string, string],
      rows: [[T(l, 'Par mois', 'Per month'), eur(P.au_pair.argent_de_poche_min, l)], [T(l, 'Validation du VLS-TS', 'VLS-TS validation'), eur(coutTitre('au_pair', 'vls').total, l)], [T(l, 'Première carte', 'First card'), eur(coutTitre('au_pair', 'premiere').total, l)]] as [string, string][] }; },
});
