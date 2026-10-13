import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
export default (l: L) => ({
  title: T(l, 'Le timbre de votre démarche', 'The stamp for your procedure'), cta: T(l, 'Coût complet de votre titre', 'Full cost of your permit'),
  inputs: [
    { id: 'r', label: T(l, 'Tarif du titre', 'Rate for the permit'), def: 0, options: [{ value: '0', label: T(l, 'Normal (salarié, conjoint…)', 'Standard (employee, spouse…)') }, { value: '1', label: T(l, 'Minoré (étudiant, saisonnier…)', 'Reduced (student, seasonal…)') }, { value: '2', label: T(l, 'Droit de timbre seul (retraité, soins)', 'Stamp duty only (retiree, care)') }] },
    { id: 'o', label: T(l, 'Démarche', 'Procedure'), def: 0, options: [{ value: '0', label: T(l, 'Première délivrance', 'First issue') }, { value: '1', label: T(l, 'Renouvellement', 'Renewal') }, { value: '2', label: T(l, 'Duplicata', 'Replacement') }] },
  ],
  run: ({ r, o }: Record<string, number>) => {
    const b = [P.tarifs.normal, P.tarifs.minore, P.tarifs.timbre_seul][r] as Record<string, number>;
    const op = ['premiere', 'renouvellement', 'duplicata'][o];
    const tot = b[op]; const timbre = Math.min(P.tarifs.droit_timbre, tot);
    return { head: [T(l, 'À acheter en timbre fiscal', 'Tax stamp to buy'), eur(tot, l)] as [string, string],
      rows: [[T(l, 'dont taxe', 'of which tax'), eur(tot - timbre, l)], [T(l, 'dont droit de timbre', 'of which stamp duty'), eur(timbre, l)]] as [string, string][] };
  },
});
