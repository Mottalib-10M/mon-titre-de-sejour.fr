import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { absencesOk } from '../engine/dates-sejour';
export default (l: L) => ({
  title: T(l, 'Vos absences cassent-elles les 5 ans ?', 'Do your absences break the 5 years?'), cta: T(l, 'Date d’éligibilité', 'Eligibility date'),
  inputs: [{ id: 'a', label: T(l, 'Plus longue absence', 'Longest absence'), def: 3, unit: T(l, 'mois', 'months'), max: 60 }, { id: 't', label: T(l, 'Total sur 5 ans', 'Total over 5 years'), def: 7, unit: T(l, 'mois', 'months'), max: 60 }],
  run: ({ a, t }: Record<string, number>) => { const ok = absencesOk(a, t);
    return { head: [T(l, 'Résidence ininterrompue', 'Uninterrupted residence'), ok ? T(l, 'oui', 'yes') : T(l, 'non', 'no')] as [string, string],
      rows: [[T(l, 'Plafond d’affilée', 'Limit in a row'), T(l, `${num(P.resident.absence_consecutive_mois, l)} mois`, `${num(P.resident.absence_consecutive_mois, l)} months`)], [T(l, 'Plafond total', 'Total limit'), T(l, `${num(P.resident.absences_total_mois, l)} mois`, `${num(P.resident.absences_total_mois, l)} months`)], [T(l, 'Marge restante', 'Margin left'), T(l, `${num(Math.max(0, P.resident.absences_total_mois - t), l)} mois`, `${num(Math.max(0, P.resident.absences_total_mois - t), l)} months`)]] as [string, string][] }; },
});
