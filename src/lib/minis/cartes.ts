import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { TITRES, coutTitre } from '../engine/couts';
const LISTE = ['salarie', 'etudiant', 'vpf_conjoint', 'visiteur', 'entrepreneur', 'carte_bleue', 'resident', 'retraite'];
export default (l: L) => ({
  title: T(l, 'Une carte, son prix et son délai de réponse', 'One card: price and response time'), cta: T(l, 'Comparer tous les titres', 'Compare every permit'),
  inputs: [{ id: 'c', label: T(l, 'Carte', 'Card'), def: 0, options: LISTE.map((id, i) => ({ value: String(i), label: TITRES.find((t) => t.id === id)!.label[l] })) }],
  run: ({ c }: Record<string, number>) => {
    const id = LISTE[c] ?? LISTE[0]; const t = TITRES.find((x) => x.id === id)!;
    const sil = t.implicite_mois ? T(l, `${num(t.implicite_mois, l)} mois`, `${num(t.implicite_mois, l)} months`) : t.implicite_jours ? T(l, `${num(t.implicite_jours, l)} jours`, `${num(t.implicite_jours, l)} days`) : T(l, 'non précisé', 'not stated');
    return { head: [T(l, 'Première délivrance', 'First issue'), eur(coutTitre(id, 'premiere').total, l)] as [string, string],
      rows: [[T(l, 'Renouvellement', 'Renewal'), eur(coutTitre(id, 'renouvellement').total, l)], [T(l, 'Validation du VLS-TS', 'VLS-TS validation'), t.vls ? eur(coutTitre(id, 'vls').total, l) : '-'], [T(l, 'Silence valant refus', 'Silence means refusal after'), sil]] as [string, string][] };
  },
});
