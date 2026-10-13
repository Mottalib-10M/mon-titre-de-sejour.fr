import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { naturalisation } from '../engine/dates-sejour';
export default (l: L) => ({
  title: T(l, 'Délai légal de réponse à votre demande', 'Legal response deadline for your application'), cta: T(l, 'Toutes les dates de la naturalisation', 'All naturalisation dates'),
  inputs: [{ id: 'm', label: T(l, 'Mois du récépissé', 'Month of the receipt'), def: 2, options: moisOptions(l) }, { id: 'y', label: T(l, 'Année', 'Year'), def: 2026, max: 2035 }, { id: 'd', label: T(l, '10 ans de résidence à cette date', '10 years of residence on that date'), def: 0, options: yn(l) }],
  run: ({ m, y, d }: Record<string, number>) => { const r = naturalisation({ debut: '2000-01-01', cas: 'general', recepisse: isoMois(m, y), dixAns: !!d });
    return { head: [T(l, 'Réponse au plus tard le', 'Answer due by'), date(r.delaiReponse!, l)] as [string, string],
      rows: [[T(l, 'Délai applicable', 'Applicable period'), T(l, `${num(r.delaiMois, l)} mois`, `${num(r.delaiMois, l)} months`)], [T(l, 'Avec la prolongation', 'With the extension'), date(r.delaiProlonge!, l)], [T(l, 'Prolongation possible', 'Possible extension'), T(l, `${num(P.naturalisation.prolongation_mois, l)} mois, une fois`, `${num(P.naturalisation.prolongation_mois, l)} months, once`)]] as [string, string][] }; },
});
