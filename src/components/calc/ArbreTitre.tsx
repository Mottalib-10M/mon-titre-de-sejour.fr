/** « Quel titre pour ma situation ? » : orientation, coût de la première année et étapes suivantes. */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import ResultCard from './ResultCard';
import Shell, { Row2 } from './Shell';
import { useUrl } from './useUrl';
import { fmt, T, type L } from './i18n';
import { orienter, type Motif, type Nationalite } from '../../lib/engine/arbre';
import { coutTitre, titreById } from '../../lib/engine/couts';
import { titreLabel, POURQUOI, ETAPE, ficheUrl } from './labels';

const MOTIFS: Array<[Motif, string, string]> = [
  ['qualifie', 'Emploi qualifié (cadre, ingénieur, chercheur)', 'Skilled job (manager, engineer, researcher)'],
  ['salarie', 'Emploi salarié', 'Salaried job'],
  ['entreprise', 'Créer ou reprendre une entreprise', 'Start or take over a business'],
  ['etudes', 'Études', 'Studies'],
  ['conjoint', 'Marié(e) à un ou une Français(e)', 'Married to a French national'],
  ['parent', 'Parent d’un enfant français', 'Parent of a French child'],
  ['famille', 'Rejoindre un conjoint ou parent étranger en France', 'Join a foreign spouse or parent in France'],
  ['retraite', 'Retraite d’un régime français', 'Retired with a French pension'],
  ['visiteur', 'Vivre de ses ressources sans travailler', 'Live on own means without working'],
  ['soins', 'Soins médicaux en France', 'Medical treatment in France'],
  ['protection', 'Réfugié ou protection internationale', 'Refugee or international protection'],
  ['sans_titre', 'En France sans titre de séjour', 'In France without a permit'],
];

export default function ArbreTitre({ lang = 'fr', methodHref }: { lang?: L; methodHref?: string }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ nat: 'autre', motif: 'qualifie', salaire: 45000, master: '0', annees: 0, mariage: 1 });
  const o = orienter({ nationalite: s.nat as Nationalite, motif: s.motif as Motif, salaire: s.salaire, master: s.master === '1', annees: s.annees, anneesMariage: s.mariage });
  const id = o.principal.titre;
  const hors = o.horsTitre === 'ue';
  const t = hors ? null : titreById(id);
  const premiere = t ? (t.vls ? coutTitre(id, 'vls') : coutTitre(id, 'premiere')) : null;
  const annee2 = t && t.vls ? coutTitre(id, 'premiere') : null;
  const ans = (n: number) => (n === 0 ? T(lang, 'dès maintenant', 'now') : T(lang, `dans ${f.num(n)} an${n > 1 ? 's' : ''}`, `in ${f.num(n)} year${n > 1 ? 's' : ''}`));
  const rows = [
    ...(premiere ? [{ label: t!.vls ? T(lang, 'Année 1 : validation du VLS-TS', 'Year 1: VLS-TS validation') : T(lang, 'Première carte', 'First card'), value: f.eur(premiere.total), strong: true }] : []),
    ...(annee2 ? [{ label: T(lang, 'Année 2 : première carte', 'Year 2: first card'), value: f.eur(annee2.total) }] : []),
    ...o.alternatives.slice(0, 2).map((a) => ({ label: T(lang, 'Autre piste', 'Alternative'), value: titreLabel(a.titre, lang) })),
    ...o.suite.map((x) => ({ label: ETAPE[x.etape][lang], value: ans(x.dans) })),
  ];
  const note = [POURQUOI[o.principal.pourquoi][lang], o.horsTitre === 'algerien' ? T(lang, 'Ressortissant algérien : l’accord franco-algérien de 1968 remplace ces cartes par des certificats de résidence (règles et durées propres).', 'Algerian national: the 1968 Franco-Algerian agreement replaces these cards with residence certificates (own rules and durations).') : ''].filter(Boolean).join(' ');
  return (
    <Shell
      form={<>
        <Row2>
          <SelectField id="ar-nat" label={T(lang, 'Nationalité', 'Nationality')} value={s.nat} onChange={set('nat')} options={[
            { value: 'autre', label: T(lang, 'Hors Union européenne', 'Non-EU') }, { value: 'ue', label: T(lang, 'UE, EEE ou Suisse', 'EU, EEA or Swiss') },
            { value: 'algerien', label: T(lang, 'Algérienne', 'Algerian') }, { value: 'tunisien', label: T(lang, 'Tunisienne', 'Tunisian') }]} />
          <SelectField id="ar-motif" label={T(lang, 'Votre projet en France', 'Your plan in France')} value={s.motif} onChange={set('motif')} options={MOTIFS.map(([v, fr, en]) => ({ value: v, label: T(lang, fr, en) }))} />
        </Row2>
        <Row2>
          <NumberField id="ar-sal" label={T(lang, 'Salaire brut annuel prévu', 'Expected gross annual salary')} value={s.salaire} onChange={set('salaire')} unit="€" max={2000000} lang={lang} help={T(lang, 'Sert pour les emplois qualifiés', 'Used for skilled jobs')} />
          <Toggle id="ar-master" label={T(lang, 'Diplôme français de niveau master', 'French master’s-level degree')} value={s.master} onChange={set('master')} options={[{ value: '0', label: T(lang, 'Non', 'No') }, { value: '1', label: T(lang, 'Oui', 'Yes') }]} />
        </Row2>
        <Row2>
          <NumberField id="ar-ans" label={T(lang, 'Années déjà passées en France', 'Years already spent in France')} value={s.annees} onChange={set('annees')} unit={T(lang, 'ans', 'yrs')} max={60} lang={lang} help={T(lang, 'En séjour régulier', 'With a valid permit')} />
          <NumberField id="ar-mar" label={T(lang, 'Années de mariage', 'Years of marriage')} value={s.mariage} onChange={set('mariage')} unit={T(lang, 'ans', 'yrs')} max={70} lang={lang} help={T(lang, 'Pour un conjoint de Français', 'For a French national’s spouse')} />
        </Row2>
      </>}
      result={<ResultCard head={T(lang, 'Titre qui correspond à vos réponses', 'Permit that matches your answers')} big={hors ? T(lang, 'Aucun titre exigé', 'No permit needed') : titreLabel(id, lang)}
        rows={rows} note={note} methodHref={methodHref} methodLabel={T(lang, 'Règles appliquées et sources', 'Rules applied and sources')} />}
      foot={<>{T(lang, 'Orientation tirée des fiches officielles, pas une décision : la préfecture examine chaque dossier. ', 'Guidance drawn from official pages, not a decision: the prefecture examines each file. ')}{!hors && ficheUrl(o.principal.fiche) && <a className="underline" href={ficheUrl(o.principal.fiche)} target="_blank" rel="nofollow noopener noreferrer">{T(lang, 'Fiche officielle du titre', 'Official page for this permit')}</a>}</>}
    />
  );
}
