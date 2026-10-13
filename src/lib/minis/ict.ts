import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Salarié détaché ICT : la condition de rémunération', 'ICT transferee: the pay condition'), cta: T(l, 'Coût du titre', 'Permit cost'),
  inputs: [{ id: 's', label: T(l, 'Rémunération brute mensuelle', 'Gross monthly pay'), def: 4500, unit: '€', max: 200000 }],
  run: ({ s }: Record<string, number>) => { const min = P.ict.ressources_mensuelles; const e = s - min;
    return { head: [T(l, e >= 0 ? 'Au-dessus du minimum de' : 'Sous le minimum de', e >= 0 ? 'Above the minimum by' : 'Below the minimum by'), eur(Math.abs(e), l)] as [string, string],
      rows: [[T(l, 'Minimum mensuel brut', 'Gross monthly minimum'), eur2(min, l)], [T(l, 'Timbres', 'Stamps'), eur(coutTitre('ict', 'premiere').total, l)]] as [string, string][] }; },
});
