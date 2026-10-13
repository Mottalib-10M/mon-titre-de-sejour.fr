import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Titre pour soins : ce que vous paierez', 'Medical permit: what you will pay'), cta: T(l, 'Coût de tous les titres', 'Cost of all permits'),
  inputs: [{ id: 'v', label: T(l, 'Entré avec un visa de long séjour', 'Entered on a long-stay visa'), def: 0, options: [{ value: '1', label: T(l, 'Oui', 'Yes') }, { value: '0', label: T(l, 'Non', 'No') }] }],
  run: ({ v }: Record<string, number>) => { const c = coutTitre('etranger_malade', 'premiere', { sansVisa: !v });
    return { head: [T(l, 'À payer à la délivrance', 'Payable on issue'), eur(c.total, l)] as [string, string],
      rows: c.lignes.map((x) => [x.cle === 'timbre' ? T(l, 'Droit de timbre', 'Stamp duty') : T(l, 'Visa de régularisation', 'Regularisation fee'), eur(x.montant, l)]) as [string, string][] }; },
});
