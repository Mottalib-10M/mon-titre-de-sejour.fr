import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { fenetreRenouvellement } from '../engine/dates-sejour';
import { addDays } from '../engine/dates';
export default (l: L) => ({
  title: T(l, 'Votre fenêtre de dépôt sur l’ANEF', 'Your ANEF filing window'), cta: T(l, 'Calendrier et coût du renouvellement', 'Renewal timetable and cost'),
  inputs: [{ id: 'm', label: T(l, 'Mois de fin du titre', 'Month your permit ends'), def: 6, options: moisOptions(l) }, { id: 'y', label: T(l, 'Année', 'Year'), def: 2027, max: 2040 }],
  run: ({ m, y }: Record<string, number>) => { const fin = addDays(isoMois(m === 12 ? 1 : m + 1, m === 12 ? y + 1 : y), -1); const w = fenetreRenouvellement(fin, fin);
    return { head: [T(l, 'Déposer au plus tard le', 'File by'), date(w.limite, l)] as [string, string],
      rows: [[T(l, 'Ouverture du dépôt', 'Window opens'), date(w.ouverture, l)], [T(l, 'Fin du titre', 'Permit ends'), date(fin, l)]] as [string, string][] }; },
});
