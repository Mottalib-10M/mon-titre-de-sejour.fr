import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { coutTitre } from '../engine/couts';
const M = ['vpf_conjoint', 'vpf_liens', 'vpf_jeune_majeur', 'vpf_rente'];
export default (l: L) => ({
  title: T(l, 'Votre carte vie privée et familiale', 'Your private and family life card'), cta: T(l, 'Tous les cas de figure', 'Every scenario'),
  inputs: [
    { id: 'm', label: T(l, 'Motif', 'Ground'), def: 0, options: [T(l, 'Conjoint de Français', 'Spouse of a French national'), T(l, 'Liens personnels et familiaux', 'Personal and family ties'), T(l, 'Jeune majeur (regroupement)', 'Young adult (reunification)'), T(l, 'Rente d’accident du travail', 'Work-accident pension')].map((x, i) => ({ value: String(i), label: x })) },
    { id: 'v', label: T(l, 'Entré avec un visa de long séjour', 'Entered on a long-stay visa'), def: 1, options: [{ value: '1', label: T(l, 'Oui', 'Yes') }, { value: '0', label: T(l, 'Non', 'No') }] },
  ],
  run: ({ m, v }: Record<string, number>) => { const id = M[m] ?? M[0]; const p = coutTitre(id, 'premiere', { sansVisa: !v });
    return { head: [T(l, 'Première carte', 'First card'), eur(p.total, l)] as [string, string],
      rows: [[T(l, 'dont visa de régularisation', 'of which regularisation fee'), eur(p.lignes.find((x) => x.cle === 'regularisation')?.montant ?? 0, l)], [T(l, 'Renouvellement', 'Renewal'), eur(coutTitre(id, 'renouvellement').total, l)]] as [string, string][] }; },
});
