import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { P } from '../engine/params';
import { coutTitre } from '../engine/couts';
export default (l: L) => ({
  title: T(l, 'Stage en France : ressources à prévoir', 'Internship in France: resources to plan'), cta: T(l, 'Coût du titre', 'Permit cost'),
  inputs: [{ id: 'm', label: T(l, 'Durée du stage', 'Internship length'), def: 6, unit: T(l, 'mois', 'months'), max: 18 }, { id: 'f', label: T(l, 'Type de stage', 'Type of internship'), def: 0, options: [{ value: '0', label: T(l, 'En entreprise', 'In a company') }, { value: '1', label: T(l, 'Formation continue', 'Continuing education') }] }],
  run: ({ m, f }: Record<string, number>) => { const r = f ? P.stagiaire.ressources_formation_continue : P.stagiaire.ressources_entreprise; const n = Math.min(P.stagiaire.duree_max_mois, Math.max(1, Math.round(m)));
    return { head: [T(l, 'Ressources minimales sur le stage', 'Minimum resources for the internship'), eur(r * n, l)] as [string, string],
      rows: [[T(l, 'Par mois', 'Per month'), eur2(r, l)], [T(l, 'Durée maximale', 'Maximum length'), T(l, `${num(P.stagiaire.duree_max_mois, l)} mois`, `${num(P.stagiaire.duree_max_mois, l)} months`)], [T(l, 'Timbres de la carte', 'Card stamps'), eur(coutTitre('stagiaire', 'premiere').total, l)]] as [string, string][] }; },
});
