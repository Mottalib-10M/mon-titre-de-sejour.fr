import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Réfugié et famille : timbres à prévoir', 'Refugee and family: stamps to budget'), cta: T(l, 'Autres titres', 'Other permits'),
  inputs: [{ id: 'n', label: T(l, 'Membres de la famille qui vous rejoignent', 'Family members joining you'), def: 2, max: 12 }],
  run: ({ n }: Record<string, number>) => { const k = Math.max(0, Math.round(n)); const f = coutTitre('famille_refugie', 'premiere').total;
    return { head: [T(l, 'Total pour la famille', 'Total for the family'), eur(f * k, l)] as [string, string],
      rows: [[T(l, 'Votre carte de résident', 'Your resident card'), eur(coutTitre('refugie', 'premiere').total, l)], [T(l, 'Par membre de la famille', 'Per family member'), eur(f, l)]] as [string, string][] }; },
});
