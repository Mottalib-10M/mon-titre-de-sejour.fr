import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Talent-famille : le budget de la famille', 'Talent-family: the family budget'), cta: T(l, 'Seuils du passeport talent', 'Talent passport thresholds'),
  inputs: [{ id: 'n', label: T(l, 'Conjoint et enfants majeurs concernés', 'Spouse and adult children concerned'), def: 1, max: 10 }],
  run: ({ n }: Record<string, number>) => { const k = Math.max(1, Math.round(n)); const u = coutTitre('talent_famille', 'premiere').total;
    return { head: [T(l, 'Timbres pour la famille', 'Stamps for the family'), eur(u * k, l)] as [string, string],
      rows: [[T(l, 'Par carte', 'Per card'), eur(u, l)], [T(l, 'Carte du titulaire', 'Main holder’s card'), eur(coutTitre('talent_salarie', 'premiere').total, l)]] as [string, string][] }; },
});
