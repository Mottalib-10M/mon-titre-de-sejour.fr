/** Coût d'un titre de séjour en timbres fiscaux (barème du 1er mai 2026), pour une ou plusieurs personnes. */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import ResultCard from './ResultCard';
import Shell, { Row2 } from './Shell';
import { useUrl } from './useUrl';
import { fmt, T, type L } from './i18n';
import { coutTitre, coutParcours, titreById, type Operation } from '../../lib/engine/couts';
import { titreOptions, LIGNE, OP, TARIF, ficheUrl } from './labels';

export default function CoutTitre({ lang = 'fr', methodHref, preset = 'salarie', presetOp = 'premiere' }: { lang?: L; methodHref?: string; preset?: string; presetOp?: string }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ titre: preset, op: presetOp, visa: '1', retard: '0', personnes: 1, annees: 3 });
  const t = titreById(s.titre);
  const op = (s.op === 'vls' && !t.vls ? 'premiere' : s.op) as Operation;
  const c = coutTitre(s.titre, op, { sansVisa: s.visa === '0', retard: s.retard === '1' });
  const n = Math.max(1, Math.round(s.personnes));
  const parcours = coutParcours(s.titre, Math.max(1, Math.min(10, Math.round(s.annees))));
  const ops = (['premiere', 'renouvellement', 'duplicata', 'vls'] as Operation[]).filter((o) => o !== 'vls' || t.vls);
  return (
    <Shell
      form={<>
        <SelectField id="ct-titre" label={T(lang, 'Titre demandé', 'Permit applied for')} value={s.titre} onChange={set('titre')} options={titreOptions(lang)} />
        <Row2>
          <SelectField id="ct-op" label={T(lang, 'Démarche', 'Procedure')} value={op} onChange={set('op')} options={ops.map((o) => ({ value: o, label: OP[o][lang] }))} />
          <NumberField id="ct-n" label={T(lang, 'Nombre de personnes concernées', 'Number of people')} value={s.personnes} onChange={set('personnes')} max={12} lang={lang} help={T(lang, 'Un timbre par titre', 'One stamp per permit')} />
        </Row2>
        <Row2>
          <Toggle id="ct-visa" label={T(lang, 'Entré avec un visa de long séjour', 'Entered on a long-stay visa')} value={s.visa} onChange={set('visa')} options={[{ value: '1', label: T(lang, 'Oui', 'Yes') }, { value: '0', label: T(lang, 'Non', 'No') }]} />
          <Toggle id="ct-retard" label={T(lang, 'Renouvellement déposé en retard', 'Renewal filed late')} value={s.retard} onChange={set('retard')} options={[{ value: '0', label: T(lang, 'Non', 'No') }, { value: '1', label: T(lang, 'Oui', 'Yes') }]} />
        </Row2>
        <NumberField id="ct-ans" label={T(lang, 'Parcours à chiffrer (années)', 'Years of renewals to cost')} value={s.annees} onChange={set('annees')} max={10} lang={lang} help={T(lang, 'VLS-TS, première carte puis renouvellements annuels', 'VLS-TS, first card, then yearly renewals')} />
      </>}
      result={<ResultCard head={T(lang, `À payer en timbres fiscaux${n > 1 ? ` pour ${f.num(n)} personnes` : ''}`, `Payable in tax stamps${n > 1 ? ` for ${f.num(n)} people` : ''}`)} big={f.eur(c.total * n)}
        sub={`${TARIF[c.tarif][lang]} · ${OP[op][lang]}`}
        rows={[
          ...c.lignes.map((l) => ({ label: LIGNE[l.cle][lang], value: f.eur(l.montant) })),
          ...(n > 1 ? [{ label: T(lang, 'Par personne', 'Per person'), value: f.eur(c.total) }] : []),
          { label: T(lang, `Parcours sur ${f.num(parcours.etapes.length)} an(s), par personne`, `Over ${f.num(parcours.etapes.length)} year(s), per person`), value: f.eur(parcours.total), strong: true },
        ]}
        note={T(lang, 'Montants dus à la remise du titre (ou à la validation du visa), en vigueur depuis le 1er mai 2026. Le droit de visa payé au consulat s’ajoute ; il varie selon le pays.', 'Amounts due when the permit is handed over (or the visa validated), in force since 1 May 2026. The visa fee paid at the consulate comes on top; it varies by country.')}
        methodHref={methodHref} methodLabel={T(lang, 'Barème et sources', 'Fee schedule and sources')} />}
      foot={ficheUrl(t.fiche) && <a className="underline" href={ficheUrl(t.fiche)} target="_blank" rel="nofollow noopener noreferrer">{T(lang, 'Fiche officielle : ', 'Official page: ')}{t.label[lang]}</a>}
    />
  );
}
