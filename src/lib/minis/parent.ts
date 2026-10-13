import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Parent d’enfant français : coût et carte de résident', 'Parent of a French child: cost and resident card'), cta: T(l, 'Calculer la date de la carte de résident', 'Work out the resident-card date'),
  inputs: [{ id: 'a', label: T(l, 'Années déjà passées avec la carte VPF', 'Years already on the VPF card'), def: 1, max: 40 }],
  run: ({ a }: Record<string, number>) => { const r = Math.max(0, P.resident.conjoint_francais_ans - a);
    return { head: [T(l, 'Carte de résident possible', 'Resident card possible'), r === 0 ? T(l, 'dès maintenant', 'now') : T(l, `dans ${num(r, l)} an(s)`, `in ${num(r, l)} year(s)`)] as [string, string],
      rows: [[T(l, 'Première carte VPF', 'First VPF card'), eur(coutTitre('vpf_parent', 'premiere').total, l)], [T(l, 'Renouvellement VPF', 'VPF renewal'), eur(coutTitre('vpf_parent', 'renouvellement').total, l)], [T(l, 'Carte de résident', 'Resident card'), eur(coutTitre('resident', 'premiere').total, l)]] as [string, string][] }; },
});
