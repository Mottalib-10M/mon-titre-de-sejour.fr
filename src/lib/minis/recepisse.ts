import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { fenetreRenouvellement } from '../engine/dates-sejour';
import { addDays } from '../engine/dates';
export default (l: L) => ({
  title: T(l, 'Jusqu’à quand votre récépissé vous couvre', 'How long your receipt covers you'), cta: T(l, 'Calendrier complet du renouvellement', 'Full renewal timetable'),
  inputs: [{ id: 'm', label: T(l, 'Mois de fin du titre', 'Month your permit ends'), def: 3, options: moisOptions(l) }, { id: 'y', label: T(l, 'Année', 'Year'), def: 2027, max: 2040 }],
  run: ({ m, y }: Record<string, number>) => { const fin = addDays(isoMois(m === 12 ? 1 : m + 1, m === 12 ? y + 1 : y), -1); const w = fenetreRenouvellement(fin, fin);
    return { head: [T(l, 'Récépissé valable jusqu’au', 'Receipt valid until'), date(w.recepisseFin, l)] as [string, string],
      rows: [[T(l, 'Fin du titre', 'Permit ends'), date(fin, l)], [T(l, 'Début du récépissé', 'Receipt starts'), date(addDays(fin, 1), l)], [T(l, 'Dépôt au plus tard', 'File by'), date(w.limite, l)]] as [string, string][] }; },
});
