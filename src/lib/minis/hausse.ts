import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { hausse2026 } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Avant et après le 1er mai 2026', 'Before and after 1 May 2026'), cta: T(l, 'Coût complet d’un titre', 'Full cost of a permit'),
  inputs: [{ id: 'r', label: T(l, 'Tarif', 'Rate'), def: 0, options: [{ value: '0', label: T(l, 'Normal', 'Standard') }, { value: '1', label: T(l, 'Minoré', 'Reduced') }] }, { id: 'o', label: T(l, 'Démarche', 'Procedure'), def: 0, options: [{ value: '0', label: T(l, 'Première délivrance', 'First issue') }, { value: '1', label: T(l, 'Renouvellement', 'Renewal') }] }],
  run: ({ r, o }: Record<string, number>) => { const h = hausse2026(r ? 'minore' : 'normal', o ? 'renouvellement' : 'premiere');
    return { head: [T(l, 'Hausse', 'Increase'), `+${eur(h.apres - h.avant, l)}`] as [string, string],
      rows: [[T(l, 'Avant le 1er mai 2026', 'Before 1 May 2026'), eur(h.avant, l)], [T(l, 'Depuis le 1er mai 2026', 'Since 1 May 2026'), eur(h.apres, l)], [T(l, 'Variation', 'Change'), `+${num(Math.round((h.apres / h.avant - 1) * 100), l)} %`]] as [string, string][] }; },
});
