import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
export default (l: L) => ({
  title: T(l, 'Votre score à l’examen civique', 'Your civic exam score'), cta: T(l, 'Niveau de français exigé', 'French level required'),
  inputs: [{ id: 'b', label: T(l, 'Bonnes réponses obtenues', 'Correct answers'), def: 30, max: 40 }],
  run: ({ b }: Record<string, number>) => { const n = Math.min(P.naturalisation.examen_questions, Math.max(0, Math.round(b))); const ok = n >= P.naturalisation.examen_seuil;
    return { head: [T(l, 'Résultat', 'Result'), ok ? T(l, 'réussi', 'passed') : T(l, 'échoué', 'failed')] as [string, string],
      rows: [[T(l, 'Seuil de réussite', 'Pass mark'), `${num(P.naturalisation.examen_seuil, l)}/${num(P.naturalisation.examen_questions, l)}`], [T(l, ok ? 'Marge' : 'Il manque', ok ? 'Margin' : 'Short by'), T(l, `${num(Math.abs(n - P.naturalisation.examen_seuil), l)} réponse(s)`, `${num(Math.abs(n - P.naturalisation.examen_seuil), l)} answer(s)`)], [T(l, 'Taux de réussite', 'Score'), `${num(Math.round((n / P.naturalisation.examen_questions) * 100), l)} %`]] as [string, string][] }; },
});
