import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
export default (l: L) => ({
  title: T(l, 'Quel niveau de français pour votre démarche ?', 'Which French level for your application?'), cta: T(l, 'Conditions de la carte de résident', 'Resident card conditions'),
  inputs: [{ id: 'd', label: T(l, 'Démarche', 'Application'), def: 0, options: [T(l, '1re carte pluriannuelle', 'First multi-year card'), T(l, '1re carte de résident', 'First resident card'), T(l, 'Naturalisation ou mariage', 'Naturalisation or marriage')].map((x, i) => ({ value: String(i), label: x })) }, { id: 'a', label: T(l, 'Votre âge', 'Your age'), def: 35, max: 110 }],
  run: ({ d, a }: Record<string, number>) => { const carte = d < 2; const exempt = carte && a >= P.pluriannuelle.age_exemption;
    const niv = d === 0 ? P.pluriannuelle.langue : d === 1 ? P.resident.langue : P.naturalisation.langue;
    return { head: [T(l, 'Niveau exigé (oral et écrit)', 'Level required (spoken and written)'), exempt ? T(l, 'aucun', 'none') : niv] as [string, string],
      rows: [[T(l, 'Examen civique', 'Civic exam'), exempt ? T(l, 'non exigé', 'not required') : T(l, `${num(P.pluriannuelle.examen_seuil, l)}/${num(P.pluriannuelle.examen_questions, l)} bonnes réponses`, `${num(P.pluriannuelle.examen_seuil, l)}/${num(P.pluriannuelle.examen_questions, l)} correct`)], [T(l, 'Dispense d’âge', 'Age exemption'), carte ? T(l, `${num(P.pluriannuelle.age_exemption, l)} ans et plus`, `${num(P.pluriannuelle.age_exemption, l)} and over`) : T(l, 'aucune', 'none')]] as [string, string][] }; },
});
