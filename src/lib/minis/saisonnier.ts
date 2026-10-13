import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { taxeEmployeur } from '../engine/travail';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Saison en France : taxes et timbres', 'A season in France: taxes and stamps'), cta: T(l, 'Barème de la taxe employeur', 'Employer tax schedule'),
  inputs: [{ id: 'm', label: T(l, 'Mois de travail de la saison', 'Months worked in the season'), def: 5, max: 12 }],
  run: ({ m }: Record<string, number>) => { const tx = taxeEmployeur({ type: 'saisonnier', salaireMensuel: 0, moisSaison: m });
    return { head: [T(l, 'Taxe due par l’employeur', 'Tax due from the employer'), eur(tx, l)] as [string, string],
      rows: [[T(l, 'Carte saisonnier (1re délivrance)', 'Seasonal card (first issue)'), eur(coutTitre('saisonnier', 'premiere').total, l)], [T(l, 'Renouvellement', 'Renewal'), eur(coutTitre('saisonnier', 'renouvellement').total, l)]] as [string, string][] }; },
});
