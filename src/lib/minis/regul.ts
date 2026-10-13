import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Ce que coûte une admission exceptionnelle', 'What exceptional admission costs'), cta: T(l, 'Coût de chaque titre', 'Cost of each permit'),
  inputs: [{ id: 'n', label: T(l, 'Personnes concernées', 'People concerned'), def: 1, max: 10 }],
  run: ({ n }: Record<string, number>) => { const k = Math.max(1, Math.round(n)); const c = coutTitre('admission_exceptionnelle', 'premiere', { sansVisa: true }).total;
    return { head: [T(l, 'Total si le titre est accordé', 'Total if the permit is granted'), eur(c * k, l)] as [string, string],
      rows: [[T(l, 'Payé au dépôt, non remboursable', 'Paid at filing, non-refundable'), eur(P.tarifs.visa_regularisation_non_remboursable * k, l)], [T(l, 'Par personne', 'Per person'), eur(c, l)]] as [string, string][] }; },
});
