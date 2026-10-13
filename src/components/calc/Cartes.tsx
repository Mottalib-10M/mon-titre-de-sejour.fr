/** Carte de résident, carte pluriannuelle, renouvellement, VLS-TS et délai de réponse. */
import { useEffect } from 'react';
import DateField from '../ui/DateField';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import ResultCard from './ResultCard';
import Shell, { Row2 } from './Shell';
import { useUrl } from './useUrl';
import { fmt, T, type L } from './i18n';
import { residentEligible, anneesResident, absencesOk, pluriannuelleEligible, fenetreRenouvellement, vlsTs, refusImplicite, type MotifResident } from '../../lib/engine/dates-sejour';
import { coutTitre, titreById } from '../../lib/engine/couts';
import { titreOptions } from './labels';
import { readParams } from '../../lib/url-state';
import { P } from '../../lib/engine/params';

const MOTIFS: Array<[MotifResident, string, string]> = [
  ['residence', '5 ans de résidence régulière (longue durée-UE)', '5 years of lawful residence (EU long-term)'],
  ['conjoint', 'Conjoint de Français : 3 ans de mariage', 'Spouse of a French national: 3 years of marriage'],
  ['conjoint_tunisien', 'Conjoint de Français, nationalité tunisienne : 1 an', 'Spouse of a French national, Tunisian: 1 year'],
  ['regroupement', 'Venu par regroupement familial auprès d’un résident : 3 ans', 'Came through family reunification with a resident: 3 years'],
  ['protection', 'Protection subsidiaire ou apatride : 4 ans de carte', 'Subsidiary protection or stateless: 4 years of cards'],
];

export function ResidentCalc({ lang = 'fr', methodHref }: { lang?: L; methodHref?: string }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ motif: 'residence', debut: '2021-11-02', longue: 2, total: 4 });
  const m = s.motif as MotifResident;
  const d = residentEligible(s.debut, m);
  const abs = absencesOk(s.longue, s.total);
  const c = coutTitre(m === 'residence' ? 'resident_ue' : 'resident', 'premiere');
  return (
    <Shell
      form={<>
        <SelectField id="re-m" label={T(lang, 'Motif de la carte de résident', 'Ground for the resident card')} value={s.motif} onChange={set('motif')} options={MOTIFS.map(([v, fr, en]) => ({ value: v, label: T(lang, fr, en) }))} />
        <Row2>
          <DateField id="re-d" label={m.startsWith('conjoint') ? T(lang, 'Date du mariage', 'Date of marriage') : T(lang, 'Début du séjour régulier', 'Start of lawful residence')} value={s.debut} onChange={set('debut')} min="1960-01-01" />
          <NumberField id="re-l" label={T(lang, 'Plus longue absence de France', 'Longest absence from France')} value={s.longue} onChange={set('longue')} unit={T(lang, 'mois', 'months')} max={60} lang={lang} />
        </Row2>
        <Row2>
          <NumberField id="re-t" label={T(lang, 'Total des absences sur 5 ans', 'Total absences over 5 years')} value={s.total} onChange={set('total')} unit={T(lang, 'mois', 'months')} max={60} lang={lang} />
        </Row2>
      </>}
      result={<ResultCard head={T(lang, 'Condition de durée remplie le', 'Length condition met on')} big={f.date(d)}
        sub={T(lang, `${f.num(anneesResident(m))} ans exigés`, `${f.num(anneesResident(m))} years required`)}
        rows={[
          { label: T(lang, 'Absences (6 mois d’affilée, 10 mois au total)', 'Absences (6 months in a row, 10 in total)'), value: abs ? T(lang, 'compatibles', 'acceptable') : T(lang, 'au-delà du plafond', 'over the limit'), strong: true },
          { label: T(lang, 'Timbres à la première délivrance', 'Stamps on first issue'), value: f.eur(c.total) },
          { label: T(lang, 'Niveau de français (1re carte, moins de 65 ans)', 'French level (first card, under 65)'), value: P.resident.langue },
          { label: T(lang, 'Examen civique', 'Civic exam'), value: T(lang, `${f.num(P.pluriannuelle.examen_seuil)} bonnes réponses sur ${f.num(P.pluriannuelle.examen_questions)}`, `${f.num(P.pluriannuelle.examen_seuil)} correct out of ${f.num(P.pluriannuelle.examen_questions)}`) },
        ]}
        note={m === 'residence' ? T(lang, 'Résident longue durée-UE : ressources au moins égales au Smic, logement et assurance maladie exigés en plus.', 'EU long-term resident: income at least equal to the minimum wage, housing and health cover are also required.') : T(lang, 'La préfecture vérifie aussi les autres conditions du motif (communauté de vie, intégration, ordre public).', 'The prefecture also checks the other conditions of the ground (shared life, integration, public order).')}
        methodHref={methodHref} methodLabel={T(lang, 'Règles et sources', 'Rules and sources')} />}
    />
  );
}

export function PluriannuelleCalc({ lang = 'fr', methodHref }: { lang?: L; methodHref?: string }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ titre: 'salarie', debut: '2026-02-01', fin: '2027-01-31' });
  const t = titreById(s.titre);
  const elig = pluriannuelleEligible(s.debut);
  const w = fenetreRenouvellement(s.fin, s.debut);
  return (
    <Shell
      form={<>
        <SelectField id="pl-t" label={T(lang, 'Premier titre d’un an', 'First one-year permit')} value={s.titre} onChange={set('titre')} options={titreOptions(lang, (id) => !id.startsWith('resident') && id !== 'refugie' && id !== 'retraite')} />
        <Row2>
          <DateField id="pl-d" label={T(lang, 'Début du premier titre (ou VLS-TS)', 'Start of the first permit (or VLS-TS)')} value={s.debut} onChange={set('debut')} />
          <DateField id="pl-f" label={T(lang, 'Fin de validité de ce titre', 'Expiry of this permit')} value={s.fin} onChange={set('fin')} />
        </Row2>
      </>}
      result={<ResultCard head={T(lang, 'Demande de carte pluriannuelle au plus tard le', 'Multi-year card: apply by')} big={f.date(w.limite)}
        rows={[
          { label: T(lang, 'Dépôt possible dès le', 'Earliest filing date'), value: f.date(w.ouverture) },
          { label: T(lang, 'Un an de séjour atteint le', 'One year of residence reached on'), value: f.date(elig) },
          { label: T(lang, 'Timbres', 'Stamps'), value: f.eur(coutTitre(s.titre, t.vls ? 'premiere' : 'renouvellement').total), strong: true },
          { label: T(lang, 'Français exigé (1re carte)', 'French required (first card)'), value: P.pluriannuelle.langue },
        ]}
        note={T(lang, 'Contrat d’intégration républicaine respecté, examen civique réussi, conditions du motif toujours remplies. Sans ces preuves, la préfecture délivre une nouvelle carte temporaire d’un an.', 'Integration contract complied with, civic exam passed, conditions of the ground still met. Without them, the prefecture issues another one-year card.')}
        methodHref={methodHref} methodLabel={T(lang, 'Règles et sources', 'Rules and sources')} />}
    />
  );
}

export function RenouvellementCalc({ lang = 'fr', methodHref }: { lang?: L; methodHref?: string }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ titre: 'salarie', fin: '2027-03-31', jour: __BUILD_DAY__ });
  // Jour du calcul : jour du build au premier rendu, puis aujourd'hui (règle d'hydratation, url-state.ts).
  useEffect(() => { if (!readParams(window.location.search).get('jour')) set('jour')(new Date().toISOString().slice(0, 10)); }, []);
  const w = fenetreRenouvellement(s.fin, s.jour);
  const normal = coutTitre(s.titre, 'renouvellement').total;
  const retard = coutTitre(s.titre, 'renouvellement', { retard: true }).total;
  const phase = { trop_tot: T(lang, 'Trop tôt pour déposer', 'Too early to file'), ouverte: T(lang, 'Fenêtre de dépôt ouverte', 'Filing window open'), retard: T(lang, 'Hors délai : majoration due', 'Late: surcharge due'), expire: T(lang, 'Titre expiré', 'Permit expired') }[w.phase];
  return (
    <Shell
      form={<>
        <SelectField id="rn-t" label={T(lang, 'Titre à renouveler', 'Permit to renew')} value={s.titre} onChange={set('titre')} options={titreOptions(lang)} />
        <Row2>
          <DateField id="rn-f" label={T(lang, 'Date de fin de validité', 'Expiry date')} value={s.fin} onChange={set('fin')} />
          <DateField id="rn-j" label={T(lang, 'Date du calcul', 'Date of calculation')} value={s.jour} onChange={set('jour')} />
        </Row2>
      </>}
      result={<ResultCard head={T(lang, 'Déposer au plus tard le', 'File no later than')} big={f.date(w.limite)} sub={phase}
        rows={[
          { label: T(lang, 'Dépôt possible dès le (ANEF)', 'Earliest filing date (ANEF)'), value: f.date(w.ouverture) },
          { label: T(lang, 'Jours restants avant la limite', 'Days left before the deadline'), value: w.joursAvantLimite >= 0 ? f.num(w.joursAvantLimite) : T(lang, 'dépassée', 'passed') },
          { label: T(lang, 'Timbres dans les délais', 'Stamps if on time'), value: f.eur(normal), strong: true },
          { label: T(lang, 'Timbres si dépôt hors délai', 'Stamps if filed late'), value: f.eur(retard) },
          { label: T(lang, 'Récépissé ou attestation valable jusqu’au', 'Receipt or certificate valid until'), value: f.date(w.recepisseFin) },
        ]}
        note={T(lang, `Au-delà de la date limite, un droit de visa de régularisation de ${f.eur(P.tarifs.retard_renouvellement)} s’ajoute, sauf force majeure ou visa en cours de validité. Le récépissé peut être renouvelé.`, `After the deadline, a ${f.eur(P.tarifs.retard_renouvellement)} regularisation visa fee is added, unless there is force majeure or a valid visa. The receipt can be renewed.`)}
        methodHref={methodHref} methodLabel={T(lang, 'Règles et sources', 'Rules and sources')} />}
    />
  );
}

export function VlsCalc({ lang = 'fr', methodHref }: { lang?: L; methodHref?: string }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ titre: 'etudiant', arrivee: '2026-09-05', fin: '2027-09-01' });
  const t = titreById(s.titre);
  const v = vlsTs(s.arrivee, s.fin);
  return (
    <Shell
      form={<>
        <SelectField id="vl-t" label={T(lang, 'Motif du visa', 'Purpose of the visa')} value={s.titre} onChange={set('titre')} options={titreOptions(lang, (id) => !!titreById(id).vls)} />
        <Row2>
          <DateField id="vl-a" label={T(lang, 'Date d’arrivée en France', 'Date of arrival in France')} value={s.arrivee} onChange={set('arrivee')} />
          <DateField id="vl-f" label={T(lang, 'Fin de validité du visa', 'Visa expiry date')} value={s.fin} onChange={set('fin')} />
        </Row2>
      </>}
      result={<ResultCard head={T(lang, 'Valider le VLS-TS en ligne avant le', 'Validate the VLS-TS online by')} big={f.date(v.validationAvant)}
        rows={[
          { label: T(lang, 'Taxe de validation', 'Validation tax'), value: f.eur(coutTitre(s.titre, 'vls').total), strong: true },
          { label: T(lang, 'Demande de carte possible dès le', 'Card application from'), value: f.date(v.carteOuverture) },
          { label: T(lang, 'Demande de carte au plus tard le', 'Card application by'), value: f.date(v.carteLimite) },
          { label: T(lang, 'Timbres de la première carte', 'Stamps for the first card'), value: t.vls ? f.eur(coutTitre(s.titre, 'premiere').total) : '-' },
        ]}
        note={T(lang, 'Sans validation dans les 3 mois, le séjour devient irrégulier et le visa ne permet plus de revenir dans l’espace Schengen.', 'Without validation within 3 months, your stay becomes irregular and the visa no longer lets you re-enter the Schengen area.')}
        methodHref={methodHref} methodLabel={T(lang, 'Règles et sources', 'Rules and sources')} />}
    />
  );
}

export function DelaiCalc({ lang = 'fr', methodHref }: { lang?: L; methodHref?: string }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ titre: 'vpf_conjoint', depot: '2026-10-13' });
  const t = titreById(s.titre);
  const d = refusImplicite(s.depot, { mois: t.implicite_mois, jours: t.implicite_jours });
  const duree = t.implicite_mois ? T(lang, `${f.num(t.implicite_mois)} mois`, `${f.num(t.implicite_mois)} months`) : t.implicite_jours ? T(lang, `${f.num(t.implicite_jours)} jours`, `${f.num(t.implicite_jours)} days`) : T(lang, 'non précisé', 'not stated');
  return (
    <Shell
      form={<>
        <SelectField id="de-t" label={T(lang, 'Titre demandé', 'Permit applied for')} value={s.titre} onChange={set('titre')} options={titreOptions(lang)} />
        <DateField id="de-d" label={T(lang, 'Date du dépôt', 'Filing date')} value={s.depot} onChange={set('depot')} />
      </>}
      result={<ResultCard head={T(lang, 'Sans réponse, refus implicite le', 'No answer means implicit refusal on')} big={d ? f.date(d) : T(lang, 'Non publié', 'Not published')}
        sub={T(lang, `Silence de l’administration : ${duree}`, `Administrative silence: ${duree}`)}
        rows={[
          { label: T(lang, 'Recours gracieux ou au tribunal', 'Appeal to the prefect or the court'), value: T(lang, '2 mois après le refus', '2 months after the refusal') },
          { label: T(lang, 'Délai réel en préfecture', 'Actual prefecture waiting time'), value: T(lang, 'aucune donnée officielle', 'no official data') },
        ]}
        note={T(lang, 'Ce délai est le délai légal au terme duquel le silence vaut refus. Les préfectures ne publient pas leurs délais moyens : nous n’en inventons pas.', 'This is the legal period after which silence counts as refusal. Prefectures publish no average times, so we do not invent any.')}
        methodHref={methodHref} methodLabel={T(lang, 'Règles et sources', 'Rules and sources')} />}
    />
  );
}
