import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { addMonths } from '../engine/dates';
export default (l: L) => ({
  title: T(l, 'Autorisation de travail : date du refus implicite', 'Work authorisation: implicit refusal date'), cta: T(l, 'Taxe employeur', 'Employer tax'),
  inputs: [{ id: 'm', label: T(l, 'Mois de la demande', 'Month of application'), def: 10, options: moisOptions(l) }, { id: 'y', label: T(l, 'Année', 'Year'), def: 2026, max: 2035 }],
  run: ({ m, y }: Record<string, number>) => { const d = isoMois(m, y); const imp = addMonths(d, P.autorisation_travail.implicite_mois); const rec = addMonths(imp, P.autorisation_travail.recours_mois);
    return { head: [T(l, 'Sans réponse, refus implicite le', 'No answer means refusal on'), date(imp, l)] as [string, string],
      rows: [[T(l, 'Demande déposée le', 'Application filed on'), date(d, l)], [T(l, 'Recours possible jusqu’au', 'Appeal possible until'), date(rec, l)], [T(l, 'Offre publiée au préalable', 'Prior job advert'), T(l, `${num(P.autorisation_travail.offre_semaines, l)} semaines`, `${num(P.autorisation_travail.offre_semaines, l)} weeks`)]] as [string, string][] }; },
});
