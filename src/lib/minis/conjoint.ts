import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { timbreNationalite, coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Conjoint de Français : vos prochaines étapes', 'Spouse of a French national: your next steps'), cta: T(l, 'Date exacte de la déclaration', 'Exact declaration date'),
  inputs: [{ id: 'a', label: T(l, 'Années de mariage', 'Years of marriage'), def: 1, max: 60 }, { id: 'r', label: T(l, '3 ans en France depuis le mariage', '3 years in France since the wedding'), def: 1, options: yn(l).reverse() }],
  run: ({ a, r }: Record<string, number>) => { const res = Math.max(0, P.resident.conjoint_francais_ans - a); const nat = Math.max(0, (r ? P.mariage.duree_ans : P.mariage.duree_longue_ans) - a);
    const y = (n: number) => (n === 0 ? T(l, 'possible', 'possible') : T(l, `dans ${num(n, l)} an(s)`, `in ${num(n, l)} year(s)`));
    return { head: [T(l, 'Nationalité par mariage', 'Citizenship by marriage'), y(nat)] as [string, string],
      rows: [[T(l, 'Carte de résident', 'Resident card'), y(res)], [T(l, 'Timbre de la déclaration', 'Declaration stamp'), eur(timbreNationalite(), l)], [T(l, 'Timbres de la carte de résident', 'Resident card stamps'), eur(coutTitre('resident', 'premiere').total, l)]] as [string, string][] }; },
});
