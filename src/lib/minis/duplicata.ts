import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
export default (l: L) => ({
  title: T(l, 'Carte perdue ou volée : le prix du duplicata', 'Lost or stolen card: price of a replacement'), cta: T(l, 'Coût de chaque titre', 'Cost of each permit'),
  inputs: [{ id: 'r', label: T(l, 'Tarif de votre carte', 'Rate of your card'), def: 0, options: [{ value: '0', label: T(l, 'Normal', 'Standard') }, { value: '1', label: T(l, 'Minoré (étudiant, saisonnier…)', 'Reduced (student, seasonal…)') }, { value: '2', label: T(l, 'Droit de timbre seul', 'Stamp duty only') }] }],
  run: ({ r }: Record<string, number>) => { const b = [P.tarifs.normal, P.tarifs.minore, P.tarifs.timbre_seul][r] as Record<string, number>;
    return { head: [T(l, 'Duplicata', 'Replacement'), eur(b.duplicata, l)] as [string, string],
      rows: [[T(l, 'Renouvellement, pour comparaison', 'Renewal, for comparison'), eur(b.renouvellement, l)]] as [string, string][] }; },
});
