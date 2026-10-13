/** Naturalisation par décret et déclaration par mariage : date de dépôt possible et délai légal de réponse. */
import DateField from '../ui/DateField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import ResultCard from './ResultCard';
import Shell, { Row2 } from './Shell';
import { useUrl } from './useUrl';
import { fmt, T, type L } from './i18n';
import { naturalisation, mariage, dixAnsA, type CasNaturalisation } from '../../lib/engine/dates-sejour';
import { timbreNationalite } from '../../lib/engine/couts';
import { P } from '../../lib/engine/params';

const yn = (l: L) => [{ value: '1', label: T(l, 'Oui', 'Yes') }, { value: '0', label: T(l, 'Non', 'No') }];

export function NaturalisationCalc({ lang = 'fr', methodHref }: { lang?: L; methodHref?: string }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ debut: '2021-09-01', cas: 'general', naissance: '1992-04-10', recepisse: '2026-11-02', guyane: '0' });
  const dix = dixAnsA(s.debut, s.recepisse);
  const r = naturalisation({ debut: s.debut, cas: s.cas as CasNaturalisation, naissance: s.naissance, recepisse: s.recepisse, dixAns: dix });
  return (
    <Shell
      form={<>
        <Row2>
          <DateField id="na-d" label={T(lang, 'Début de la résidence régulière en France', 'Start of lawful residence in France')} value={s.debut} onChange={set('debut')} min="1960-01-01" help={T(lang, 'Date du premier titre ou visa long séjour', 'Date of your first permit or long-stay visa')} />
          <SelectField id="na-cas" label={T(lang, 'Votre situation', 'Your situation')} value={s.cas} onChange={set('cas')} options={[
            { value: 'general', label: T(lang, 'Cas général : 5 ans', 'General case: 5 years') },
            { value: 'diplome', label: T(lang, 'Diplôme après 2 ans d’études supérieures en France : 2 ans', 'Degree after 2 years of higher education in France: 2 years') },
            { value: 'dispense', label: T(lang, 'Réfugié, ou pays francophone et langue maternelle française : aucune durée', 'Refugee, or French-speaking country with French as mother tongue: no minimum') }]} />
        </Row2>
        <Row2>
          <DateField id="na-n" label={T(lang, 'Date de naissance', 'Date of birth')} value={s.naissance} onChange={set('naissance')} min="1920-01-01" />
          <DateField id="na-r" label={T(lang, 'Date du récépissé (dossier complet)', 'Date of the receipt (complete file)')} value={s.recepisse} onChange={set('recepisse')} help={T(lang, 'Prévue ou réelle', 'Planned or actual')} />
        </Row2>
        <Toggle id="na-g" label={T(lang, 'Domicile en Guyane', 'Living in French Guiana')} value={s.guyane} onChange={set('guyane')} options={[{ value: '0', label: T(lang, 'Non', 'No') }, { value: '1', label: T(lang, 'Oui', 'Yes') }]} />
      </>}
      result={<ResultCard head={T(lang, 'Dépôt de la demande possible à partir du', 'Application possible from')} big={f.date(r.depotDes)}
        rows={[
          { label: T(lang, 'Condition de résidence remplie le', 'Residence condition met on'), value: f.date(r.eligible) },
          { label: T(lang, `Réponse au plus tard (${f.num(r.delaiMois)} mois)`, `Answer due by (${f.num(r.delaiMois)} months)`), value: r.delaiReponse ? f.date(r.delaiReponse) : '-', strong: true },
          { label: T(lang, 'Avec la prolongation motivée de 3 mois', 'With the 3-month extension'), value: r.delaiProlonge ? f.date(r.delaiProlonge) : '-' },
          { label: T(lang, 'Timbre fiscal', 'Tax stamp'), value: f.eur2(timbreNationalite(s.guyane === '1')) },
          { label: T(lang, 'Niveau de français exigé', 'French level required'), value: P.naturalisation.langue },
        ]}
        note={dix ? T(lang, 'Dix ans de résidence habituelle à la date du récépissé : le délai légal passe à 12 mois.', 'Ten years of habitual residence on the receipt date: the legal deadline drops to 12 months.') : T(lang, 'Délai légal compté depuis le récépissé de dossier complet ; aucun délai par préfecture n’est publié officiellement.', 'Legal deadline counted from the complete-file receipt; no official per-prefecture waiting time is published.')}
        methodHref={methodHref} methodLabel={T(lang, 'Règles et sources', 'Rules and sources')} />}
    />
  );
}

export function MariageCalc({ lang = 'fr', methodHref }: { lang?: L; methodHref?: string }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ date: '2022-07-09', res: '1', consulat: '0', recepisse: '2026-12-01' });
  const r = mariage({ date: s.date, residence3ans: s.res === '1', inscritConsulat: s.consulat === '1', recepisse: s.recepisse });
  return (
    <Shell
      form={<>
        <Row2>
          <DateField id="ma-d" label={T(lang, 'Date du mariage', 'Date of marriage')} value={s.date} onChange={set('date')} min="1950-01-01" />
          <DateField id="ma-r" label={T(lang, 'Date du récépissé (après l’entretien)', 'Date of the receipt (after the interview)')} value={s.recepisse} onChange={set('recepisse')} />
        </Row2>
        <Row2>
          <Toggle id="ma-res" label={T(lang, 'Au moins 3 ans en France sans interruption depuis le mariage', 'At least 3 continuous years in France since the wedding')} value={s.res} onChange={set('res')} options={yn(lang)} />
          <Toggle id="ma-c" label={T(lang, 'Conjoint inscrit au registre consulaire à l’étranger', 'Spouse on the consular register abroad')} value={s.consulat} onChange={set('consulat')} options={yn(lang)} />
        </Row2>
      </>}
      result={<ResultCard head={T(lang, 'Déclaration possible à partir du', 'Declaration possible from')} big={f.date(r.eligible)}
        sub={T(lang, `${f.num(r.annees)} ans de mariage exigés`, `${f.num(r.annees)} years of marriage required`)}
        rows={[
          { label: T(lang, 'Refus d’enregistrement possible jusqu’au', 'Registration can be refused until'), value: r.refusAvant ? f.date(r.refusAvant) : '-', strong: true },
          { label: T(lang, 'En cas d’opposition du Gouvernement', 'If the Government opposes'), value: r.refusOppositionAvant ? f.date(r.refusOppositionAvant) : '-' },
          { label: T(lang, 'Timbre fiscal', 'Tax stamp'), value: f.eur(timbreNationalite()) },
          { label: T(lang, 'Niveau de français exigé', 'French level required'), value: P.naturalisation.langue },
        ]}
        note={T(lang, 'Communauté de vie affective et matérielle continue depuis le mariage, conjoint français à la date du mariage ; un mariage célébré à l’étranger doit être transcrit.', 'Continuous shared life since the wedding, spouse French on the wedding date; a marriage abroad must be registered in France.')}
        methodHref={methodHref} methodLabel={T(lang, 'Règles et sources', 'Rules and sources')} />}
    />
  );
}
