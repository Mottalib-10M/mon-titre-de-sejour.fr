import { T, eur, eur2, num, date, moisOptions, isoMois, yn, type L } from './_kit';
import { naturalisation, type CasNaturalisation } from '../engine/dates-sejour';
const CAS: CasNaturalisation[] = ['general', 'diplome', 'dispense'];
export default (l: L) => ({
  title: T(l, 'À partir de quand déposer votre dossier ?', 'When can you file?'), cta: T(l, 'Calcul complet avec délai de réponse', 'Full calculation with response time'),
  inputs: [{ id: 'm', label: T(l, 'Mois d’installation régulière', 'Month you settled lawfully'), def: 9, options: moisOptions(l) }, { id: 'y', label: T(l, 'Année', 'Year'), def: 2021, max: 2035 },
    { id: 'c', label: T(l, 'Situation', 'Situation'), def: 0, options: [T(l, 'Cas général', 'General case'), T(l, 'Diplôme du supérieur en France', 'French higher-education degree'), T(l, 'Réfugié', 'Refugee')].map((x, i) => ({ value: String(i), label: x })) }],
  run: ({ m, y, c }: Record<string, number>) => { const r = naturalisation({ debut: isoMois(m, y), cas: CAS[c] ?? 'general' });
    return { head: [T(l, 'Dossier recevable à partir du', 'File admissible from'), date(r.eligible, l)] as [string, string], rows: [] as [string, string][] }; },
});
