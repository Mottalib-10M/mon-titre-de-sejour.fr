import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { taxeEmployeur } from '../engine/travail';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Coût d’une embauche : salarié et employeur', 'Cost of a hire: employee and employer'), cta: T(l, 'Taxe employeur détaillée', 'Employer tax in detail'),
  inputs: [
    { id: 's', label: T(l, 'Salaire mensuel brut', 'Gross monthly salary'), def: 2600, unit: '€', max: 100000 },
    { id: 'c', label: T(l, 'Durée du contrat', 'Contract length'), def: 1, options: [{ value: '1', label: T(l, '12 mois ou plus', '12 months or more') }, { value: '0', label: T(l, 'De 3 à 12 mois', '3 to 12 months') }] },
  ],
  run: ({ s, c }: Record<string, number>) => { const tx = taxeEmployeur({ type: c ? 'long' : 'court', salaireMensuel: s });
    const sal = coutTitre('salarie', 'vls').total + coutTitre('salarie', 'premiere').total;
    return { head: [T(l, 'Taxe due par l’employeur', 'Tax due from the employer'), eur(tx, l)] as [string, string],
      rows: [[T(l, 'Timbres du salarié sur 2 ans', 'Employee stamps over 2 years'), eur(sal, l)], [T(l, 'Total de l’arrivée', 'Total for the arrival'), eur(tx + sal, l)]] as [string, string][] }; },
});
