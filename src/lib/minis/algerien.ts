import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
export default (l: L) => ({
  title: T(l, 'Certificat algérien de 10 ans : coût et absences', 'Algerian 10-year certificate: cost and absences'), cta: T(l, 'Fenêtre de renouvellement', 'Renewal window'),
  inputs: [{ id: 'a', label: T(l, 'Plus longue absence de France prévue', 'Longest planned absence from France'), def: 1, unit: T(l, 'ans', 'yrs'), max: 20, decimals: 1 }],
  run: ({ a }: Record<string, number>) => { const ok = a <= P.algerien.absence_max_ans;
    return { head: [T(l, 'Certificat conservé', 'Certificate kept'), ok ? T(l, 'oui', 'yes') : T(l, 'non, sauf accord', 'no, unless approved')] as [string, string],
      rows: [[T(l, 'Absence maximale d’affilée', 'Maximum continuous absence'), T(l, `${num(P.algerien.absence_max_ans, l)} ans`, `${num(P.algerien.absence_max_ans, l)} years`)], [T(l, 'Certificat de 10 ans', '10-year certificate'), eur(P.algerien.dix_ans_cout, l)], [T(l, 'Certificat d’un an (1re demande)', 'One-year certificate (first)'), eur(P.algerien.un_an_premiere, l)]] as [string, string][] }; },
});
