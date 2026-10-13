import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { receSeuilOk } from '../engine/travail';
export default (l: L) => ({
  title: T(l, 'Après le diplôme : votre salaire suffit-il ?', 'After graduating: is your salary enough?'), cta: T(l, 'Tous les seuils de salaire', 'All salary thresholds'),
  inputs: [{ id: 's', label: T(l, 'Salaire mensuel brut proposé', 'Gross monthly salary offered'), def: 2900, unit: '€', max: 100000 }],
  run: ({ s }: Record<string, number>) => { const ok = receSeuilOk(s);
    return { head: [T(l, 'Changement de statut simplifié', 'Simplified status change'), ok ? T(l, 'oui', 'yes') : T(l, 'non', 'no')] as [string, string],
      rows: [[T(l, 'Seuil (strictement au-dessus)', 'Threshold (strictly above)'), eur2(P.rece.seuil_mensuel, l)], [T(l, 'Écart', 'Gap'), eur(s - P.rece.seuil_mensuel, l)]] as [string, string][] }; },
});
