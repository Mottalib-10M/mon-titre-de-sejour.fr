import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Ressources à justifier pour vos études', 'Resources to show for your studies'), cta: T(l, 'Dates de validation du VLS-TS', 'VLS-TS validation dates'),
  inputs: [{ id: 'm', label: T(l, 'Mois de séjour prévus', 'Planned months in France'), def: 12, max: 60 }],
  run: ({ m }: Record<string, number>) => { const n = Math.max(1, Math.round(m)); const r = P.etudiant.ressources_mensuelles;
    return { head: [T(l, 'Ressources minimales sur la période', 'Minimum resources for the period'), eur(r * n, l)] as [string, string],
      rows: [[T(l, 'Par mois', 'Per month'), eur2(r, l)], [T(l, 'Validation du VLS-TS', 'VLS-TS validation'), eur(coutTitre('etudiant', 'vls').total, l)], [T(l, 'Carte étudiant ensuite', 'Student card afterwards'), eur(coutTitre('etudiant', 'premiere').total, l)]] as [string, string][] }; },
});
