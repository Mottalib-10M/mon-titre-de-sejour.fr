import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { regroupementDes, regroupementImplicite } from '../engine/famille';
export default (l: L) => ({
  title: T(l, 'Regroupement familial : vos dates', 'Family reunification: your dates'), cta: T(l, 'Seuil de ressources', 'Income threshold'),
  inputs: [{ id: 'm', label: T(l, 'Mois du début du séjour régulier', 'Month lawful residence began'), def: 3, options: moisOptions(l) }, { id: 'y', label: T(l, 'Année', 'Year'), def: 2025, max: 2035 }],
  run: ({ m, y }: Record<string, number>) => { const d = regroupementDes(isoMois(m, y));
    return { head: [T(l, 'Demande possible à partir du', 'Application possible from'), date(d, l)] as [string, string],
      rows: [[T(l, 'Si déposée ce jour-là, refus implicite le', 'If filed that day, implicit refusal on'), date(regroupementImplicite(d), l)]] as [string, string][] }; },
});
