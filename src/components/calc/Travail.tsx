/** Seuils de salaire (talent, carte bleue européenne, RECE) et taxe employeur. */
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import ResultCard from './ResultCard';
import Shell, { Row2 } from './Shell';
import { useUrl } from './useUrl';
import { fmt, T, type L } from './i18n';
import { seuilsTalent, carteBleue, receSeuilOk, taxeEmployeur, type Contrat, type Voie } from '../../lib/engine/travail';
import { coutTitre } from '../../lib/engine/couts';

const VOIE: Record<Voie, [string, string]> = {
  talent_salarie: ['Talent salarié qualifié (master français)', 'Talent: skilled employee (French master’s)'],
  carte_bleue: ['Carte bleue européenne', 'EU Blue Card'],
  praticien: ['Talent professions médicales', 'Talent: medical professions'],
  mandataire: ['Talent mandataire social', 'Talent: company officer'],
  rece: ['Changement de statut après la carte RECE', 'Status change after the RECE card'],
};

export function TalentCalc({ lang = 'fr', methodHref, focus = 'talent' }: { lang?: L; methodHref?: string; focus?: 'talent' | 'cbe' | 'rece' }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ salaire: focus === 'rece' ? 36000 : 52000, contrat: 24, master: '1' });
  const seuils = seuilsTalent(s.salaire);
  const cbe = carteBleue(s.salaire, s.contrat);
  const main = focus === 'cbe' ? seuils.find((x) => x.voie === 'carte_bleue')! : focus === 'rece' ? seuils.find((x) => x.voie === 'rece')! : seuils.find((x) => x.voie === 'talent_salarie')!;
  const ok = focus === 'rece' ? receSeuilOk(s.salaire / 12) : focus === 'talent' ? main.atteint && s.master === '1' : main.atteint && cbe.contratOk;
  return (
    <Shell
      form={<>
        <NumberField id="ta-s" label={T(lang, 'Salaire brut annuel du contrat', 'Gross annual salary in the contract')} value={s.salaire} onChange={set('salaire')} unit="€" max={2000000} lang={lang} help={T(lang, 'Primes fixes comprises, hors avantages variables', 'Including fixed bonuses, excluding variable perks')} />
        <Row2>
          <NumberField id="ta-c" label={T(lang, 'Durée du contrat', 'Contract length')} value={s.contrat} onChange={set('contrat')} unit={T(lang, 'mois', 'months')} max={600} lang={lang} />
          <Toggle id="ta-m" label={T(lang, 'Diplôme français de niveau master', 'French master’s-level degree')} value={s.master} onChange={set('master')} options={[{ value: '1', label: T(lang, 'Oui', 'Yes') }, { value: '0', label: T(lang, 'Non', 'No') }]} />
        </Row2>
      </>}
      result={<ResultCard head={T(lang, `${VOIE[main.voie][0]} : seuil annuel`, `${VOIE[main.voie][1]}: annual threshold`)} big={f.eur2(main.annuel)}
        sub={ok ? T(lang, 'Votre contrat remplit la condition de salaire', 'Your contract meets the salary condition') : T(lang, `Il manque ${f.eur(Math.max(0, -main.ecart))} par an ou une autre condition`, `Short by ${f.eur(Math.max(0, -main.ecart))} a year, or another condition is missing`)}
        rows={[
          ...seuils.filter((x) => x.voie !== main.voie).map((x) => ({ label: T(lang, VOIE[x.voie][0], VOIE[x.voie][1]), value: `${f.eur(x.annuel)} · ${x.atteint ? '✓' : '✗'}` })),
          { label: T(lang, 'Durée de la carte bleue', 'Blue Card length'), value: cbe.dureeMois ? T(lang, `${f.num(cbe.dureeMois)} mois`, `${f.num(cbe.dureeMois)} months`) : T(lang, 'contrat trop court', 'contract too short') },
          { label: T(lang, 'Timbres de la carte talent', 'Talent card stamps'), value: f.eur(coutTitre('carte_bleue', 'premiere').total), strong: true },
        ]}
        note={T(lang, 'Seuils fixés par l’arrêté du 21 août 2025 (salaire de référence) et le Smic du 1er juin 2026. La carte talent dispense d’autorisation de travail ; la famille suit avec la carte talent-famille.', 'Thresholds set by the order of 21 August 2025 (reference salary) and the minimum wage of 1 June 2026. The talent card needs no work authorisation; the family follows with the talent-family card.')}
        methodHref={methodHref} methodLabel={T(lang, 'Seuils et sources', 'Thresholds and sources')} />}
    />
  );
}

export function EmployeurCalc({ lang = 'fr', methodHref }: { lang?: L; methodHref?: string }) {
  const f = fmt(lang);
  const [s, set] = useUrl({ type: 'long', salaire: 3200, mois: 4 });
  const taxe = taxeEmployeur({ type: s.type as Contrat, salaireMensuel: s.salaire, moisSaison: s.mois });
  return (
    <Shell
      form={<>
        <SelectField id="em-t" label={T(lang, 'Type de contrat', 'Type of contract')} value={s.type} onChange={set('type')} options={[
          { value: 'long', label: T(lang, '12 mois ou plus', '12 months or more') }, { value: 'court', label: T(lang, 'Plus de 3 mois et moins de 12 mois', 'Over 3 and under 12 months') },
          { value: 'saisonnier', label: T(lang, 'Saisonnier', 'Seasonal') }, { value: 'jeune_pro', label: T(lang, 'Échange de jeunes professionnels', 'Young professionals exchange') }]} />
        <Row2>
          <NumberField id="em-s" label={T(lang, 'Salaire mensuel brut', 'Gross monthly salary')} value={s.salaire} onChange={set('salaire')} unit="€" max={200000} lang={lang} />
          <NumberField id="em-m" label={T(lang, 'Mois de saison (saisonnier)', 'Months of season (seasonal)')} value={s.mois} onChange={set('mois')} max={12} lang={lang} />
        </Row2>
      </>}
      result={<ResultCard head={T(lang, 'Taxe due par l’employeur', 'Tax due from the employer')} big={f.eur(taxe)}
        rows={[
          { label: T(lang, 'Quand', 'When'), value: T(lang, 'à la 1re admission au séjour', 'on first admission') },
          { label: T(lang, 'Déclaration', 'Return'), value: T(lang, 'avec la TVA (annexe 3310 A)', 'with the VAT return (form 3310 A)') },
          { label: T(lang, 'Timbres du salarié (1re carte)', 'Employee stamps (first card)'), value: f.eur(coutTitre('salarie', 'premiere').total), strong: true },
        ]}
        note={T(lang, 'Due une seule fois, par le premier employeur qui permet le titre « travail ». Exonérations : particulier employeur, recherche publique, assistant de langue, titre qui permet de travailler sans autorisation.', 'Due once, by the first employer behind the work permit. Exempt: private household employers, public research, language assistants, permits that allow work without authorisation.')}
        methodHref={methodHref} methodLabel={T(lang, 'Barème et sources', 'Schedule and sources')} />}
    />
  );
}
