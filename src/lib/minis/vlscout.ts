import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { coutTitre } from '../engine/couts';
const M = ['salarie', 'etudiant', 'vpf_conjoint', 'visiteur', 'saisonnier'];
export default (l: L) => ({
  title: T(l, 'Visa long séjour : ce qui se paie en France', 'Long-stay visa: what you pay once in France'), cta: T(l, 'Dates de validation', 'Validation dates'),
  inputs: [{ id: 'm', label: T(l, 'Motif du visa', 'Purpose of the visa'), def: 0, options: [T(l, 'Salarié', 'Employee'), T(l, 'Étudiant', 'Student'), T(l, 'Conjoint de Français', 'Spouse of a French national'), T(l, 'Visiteur', 'Visitor'), T(l, 'Saisonnier', 'Seasonal worker')].map((x, i) => ({ value: String(i), label: x })) }],
  run: ({ m }: Record<string, number>) => { const id = M[m] ?? M[0]; const v = coutTitre(id, 'vls').total; const c = coutTitre(id, 'premiere').total;
    return { head: [T(l, 'Taxe de validation du VLS-TS', 'VLS-TS validation tax'), eur(v, l)] as [string, string],
      rows: [[T(l, 'Première carte (année 2)', 'First card (year 2)'), eur(c, l)], [T(l, 'Deux premières années', 'First two years'), eur(v + c, l)], [T(l, 'Frais de visa au consulat', 'Visa fee at the consulate'), T(l, 'selon le pays', 'depends on country')]] as [string, string][] }; },
});
