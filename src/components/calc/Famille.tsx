/** Regroupement familial : seuil de ressources sur le Smic des 12 derniers mois, logement minimal, dates. */
import { useEffect } from 'react';
import DateField from '../ui/DateField';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import ResultCard from './ResultCard';
import Shell, { Row2 } from './Shell';
import { useUrl } from './useUrl';
import { fmt, T, type L } from './i18n';
import { verdictRegroupement, surfaceMin, regroupementImplicite, type Zone } from '../../lib/engine/famille';
import { coutTitre } from '../../lib/engine/couts';
import { readParams } from '../../lib/url-state';

export default function RegroupementCalc({ lang = 'fr', methodHref, focus = 'ressources' }: { lang?: L; methodHref?: string; focus?: 'ressources' | 'logement' }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ personnes: 4, depot: __BUILD_DAY__, ressources: 2100, aah: '0', zone: 'B', surface: 45 });
  useEffect(() => { if (!readParams(window.location.search).get('depot')) set('depot')(new Date().toISOString().slice(0, 10)); }, []);
  const n = Math.max(2, Math.min(15, Math.round(s.personnes)));
  const v = verdictRegroupement({ personnes: n, depot: s.depot, ressources: s.ressources, aah: s.aah === '1' });
  const surf = surfaceMin(s.zone as Zone, n);
  const logementOk = s.surface >= surf;
  const membres = n - 1;
  const timbres = coutTitre('regroupement', 'premiere').total * membres;
  const ressourcesRows = [
    { label: T(lang, 'Moyenne du Smic brut sur 12 mois', 'Average gross minimum wage over 12 months'), value: f.eur2(v.moyenneSmic) },
    { label: T(lang, 'Majoration selon la taille du foyer', 'Uplift for household size'), value: v.coef === 1 ? T(lang, 'aucune', 'none') : `+${f.pct(v.coef - 1, 0)}` },
    { label: T(lang, 'Vos ressources moyennes', 'Your average income'), value: f.eur(v.ressources) },
    { label: v.ecart >= 0 ? T(lang, 'Marge', 'Margin') : T(lang, 'Manque', 'Shortfall'), value: f.eur(Math.abs(v.ecart)), strong: true },
  ];
  const logementRows = [
    { label: T(lang, 'Surface minimale pour le foyer', 'Minimum floor area for the household'), value: `${f.num(surf)} m²`, strong: true },
    { label: T(lang, 'Surface de votre logement', 'Your home’s floor area'), value: `${f.num(s.surface)} m²` },
    { label: T(lang, 'Logement', 'Housing'), value: logementOk ? T(lang, 'surface suffisante', 'large enough') : T(lang, `${f.num(surf - s.surface)} m² de moins que le minimum`, `${f.num(surf - s.surface)} m² below the minimum`) },
  ];
  const head = focus === 'logement' ? T(lang, 'Surface minimale exigée', 'Minimum floor area required') : T(lang, 'Seuil mensuel moyen de ressources', 'Average monthly income threshold');
  const big = focus === 'logement' ? `${f.num(surf)} m²` : v.dispense ? T(lang, 'Aucun (AAH ou ASI)', 'None (AAH or ASI)') : f.eur2(v.seuil);
  return (
    <Shell
      form={<>
        <Row2>
          <NumberField id="rf-n" label={T(lang, 'Personnes au foyer après l’arrivée', 'People in the household after arrival')} value={s.personnes} onChange={set('personnes')} min={2} max={15} lang={lang} help={T(lang, 'Vous compris', 'Including you')} />
          <DateField id="rf-d" label={T(lang, 'Date de dépôt de la demande', 'Filing date')} value={s.depot} onChange={set('depot')} />
        </Row2>
        <Row2>
          <NumberField id="rf-r" label={T(lang, 'Ressources brutes moyennes par mois', 'Average gross income per month')} value={s.ressources} onChange={set('ressources')} unit="€" max={100000} lang={lang} help={T(lang, 'Couple, sur 12 mois', 'Couple, over 12 months')} />
          <Toggle id="rf-aah" label={T(lang, 'Bénéficiaire de l’AAH ou de l’ASI', 'Receiving AAH or ASI')} value={s.aah} onChange={set('aah')} options={[{ value: '0', label: T(lang, 'Non', 'No') }, { value: '1', label: T(lang, 'Oui', 'Yes') }]} />
        </Row2>
        <Row2>
          <SelectField id="rf-z" label={T(lang, 'Zone du logement', 'Housing zone')} value={s.zone} onChange={set('zone')} options={[{ value: 'A', label: T(lang, 'A bis ou A (Paris, Côte d’Azur, Genevois…)', 'A bis or A (Paris, Riviera, Geneva area…)') }, { value: 'B', label: T(lang, 'B1 ou B2 (grandes agglomérations)', 'B1 or B2 (large urban areas)') }, { value: 'C', label: T(lang, 'C (reste du territoire)', 'C (rest of France)') }]} />
          <NumberField id="rf-s" label={T(lang, 'Surface habitable du logement', 'Living area of the home')} value={s.surface} onChange={set('surface')} unit="m²" max={1000} lang={lang} />
        </Row2>
      </>}
      result={<ResultCard head={head} big={big}
        sub={focus === 'logement' ? (logementOk ? T(lang, 'Votre logement est assez grand', 'Your home is large enough') : T(lang, 'Logement trop petit', 'Home too small')) : (v.atteint ? T(lang, 'Ressources suffisantes', 'Income sufficient') : T(lang, 'Ressources insuffisantes', 'Income insufficient'))}
        rows={[...(focus === 'logement' ? [...logementRows, ressourcesRows[3]] : [...ressourcesRows, logementRows[0]]),
          { label: T(lang, `Timbres pour ${f.num(membres)} membre(s) de la famille`, `Stamps for ${f.num(membres)} family member(s)`), value: f.eur(timbres) },
          { label: T(lang, 'Sans réponse, refus implicite le', 'No answer means refusal on'), value: f.date(regroupementImplicite(s.depot)) }]}
        note={T(lang, 'Prestations familiales, RSA, ASPA, ASS, ATA et AER ne comptent pas. Chaque mois prend le Smic en vigueur le 1er du mois : un dépôt qui couvre des mois de 2025 a un seuil plus bas que le Smic actuel. Le maire vérifie aussi la salubrité du logement.', 'Family benefits, RSA, ASPA, ASS, ATA and AER do not count. Each month uses the minimum wage in force on the 1st: an application covering months of 2025 has a lower threshold than today’s minimum wage. The mayor also checks the home is fit to live in.')}
        methodHref={methodHref} methodLabel={T(lang, 'Calcul et sources', 'Calculation and sources')} />}
    />
  );
}
