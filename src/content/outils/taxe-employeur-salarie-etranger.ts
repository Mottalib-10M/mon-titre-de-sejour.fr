import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { taxeEmployeur } from '../../lib/engine/travail';
import { formatMoney, formatPercent } from '../../lib/format';

// Valeurs par défaut du simulateur : contrat de 12 mois ou plus, 3 200 € brut par mois.
const TE = P.taxe_employeur;
const def = taxeEmployeur({ type: 'long', salaireMensuel: 3200 });
const smic = taxeEmployeur({ type: 'long', salaireMensuel: TE.court[0].jusqua! });
const haut = taxeEmployeur({ type: 'long', salaireMensuel: 6500 });
const c1 = taxeEmployeur({ type: 'court', salaireMensuel: 1900 });
const c2 = taxeEmployeur({ type: 'court', salaireMensuel: 3100 });
const sais = taxeEmployeur({ type: 'saisonnier', salaireMensuel: 0, moisSaison: 4 });
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const pF = formatPercent(TE.long_taux, 0, 'fr'), pE = formatPercent(TE.long_taux, 0, 'en');
const LF = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042772058/';

export default defineGuide({
  id: 'taxe-employeur-salarie-etranger',
  group: 'travail',
  order: 50,
  tool: 'employeur',
  related: ['autorisation-de-travail', 'titre-de-sejour-salarie', 'travailleur-saisonnier', 'passeport-talent', 'cout-titre-de-sejour'],
  sources: ['sp_F2728', 'ceseda_l436_10', 'sp_F16922'],
  fr: {
    slug: 'taxe-employeur-salarie-etranger',
    nav: 'Taxe employeur',
    card: 'Montant de la taxe due par l’employeur à l’embauche d’un salarié étranger, selon contrat et salaire.',
    title: 'Taxe employeur salarié étranger 2026 : le montant exact',
    description: `Taxe employeur pour un salarié étranger en 2026 : ${pF} du salaire mensuel plafonné pour un contrat d’un an, contrats courts, saisonniers, exonérations.`,
    h1: 'Taxe employeur à l’embauche d’un salarié étranger : le montant exact',
    intro: 'Choisissez le type de contrat et le salaire mensuel brut : le simulateur applique le barème de la taxe due par l’employeur.',
    resume: `L’employeur qui obtient une autorisation de travail pour un salarié étranger paie une taxe à la première admission au séjour de ce salarié, une seule fois et par le seul premier employeur. Pour un contrat de 12 mois ou plus, elle vaut ${pF} du salaire mensuel brut, plafonnée à ${eF(TE.long_plafond, 2)} dès que le salaire atteint ${eF(TE.long_plafond_salaire, 2)}. Un salarié payé ${eF(3200)} brut par mois coûte donc ${eF(def, 2)} de taxe ; au Smic, ${eF(smic, 2)} ; à ${eF(6500)}, le plafond s’applique. Pour un contrat de plus de 3 mois et de moins de 12 mois, le barème est forfaitaire : ${eF(TE.court[0].montant)} jusqu’au Smic de ${eF(TE.court[0].jusqua!, 2)}, ${eF(TE.court[1].montant)} jusqu’à ${eF(TE.court[1].jusqua!, 2)}, ${eF(TE.court[2].montant)} au-delà. Un saisonnier coûte ${eF(TE.saisonnier_par_mois)} par mois d’activité, un jeune professionnel ${eF(TE.jeune_pro)}. La taxe se déclare avec la TVA, sur l’annexe 3310 A ou le formulaire 3517-S-SD selon le régime de l’entreprise.`,
    faqs: [
      { q: 'Quand la taxe employeur pour un salarié étranger est-elle due ?', a: 'À la première admission au séjour du salarié au titre du travail, pour une autorisation de travail de plus de 3 mois ; pour les saisonniers agricoles, dès le premier jour. Elle n’est due qu’une fois, par le premier employeur. Elle redevient exigible si le salarié, parti à l’expiration de son titre, revient occuper un emploi soumis à autorisation.' },
      { q: 'Qui est exonéré de la taxe employeur ?', a: 'Le particulier qui emploie quelqu’un à domicile pour des tâches familiales ou ménagères, les organismes publics de recherche et établissements d’enseignement supérieur qui recrutent chercheurs et enseignants, l’employeur d’un assistant de langue, et tout employeur dont le salarié a déjà un titre permettant de travailler sans autorisation, comme une carte talent ou une carte de résident.' },
      { q: 'Comment déclarer et payer la taxe employeur ?', a: 'Avec la TVA. Au régime réel normal, sur l’annexe 3310 A de la déclaration du mois de janvier ou du premier trimestre de l’année suivante ; au régime simplifié, sur le formulaire 3517-S-SD ou 3517-AGR-SD. L’employeur non redevable de la TVA dépose l’annexe 3310 A au plus tard le 25 février de l’année suivante.' },
      { q: 'Combien coûte un contrat de six mois payé 1 900 € par mois ?', a: `${eF(c1)}, car le salaire dépasse le Smic de ${eF(TE.court[0].jusqua!, 2)} sans atteindre ${eF(TE.court[1].jusqua!, 2)}. À ${eF(3100)} par mois, la taxe passe à ${eF(c2)}. Le barème des contrats courts est forfaitaire : il ne dépend pas de la durée exacte entre 3 et 12 mois.` },
    ],
    body: (h) => `
<h2>Le barème appliqué</h2>
<p>Le simulateur reprend les montants publiés sur ${h.src('sp_F2728', 'la fiche Autorisation de travail d’un salarié étranger')}, qui applique les ${h.ext(LF, 'articles L436-10 à L436-13 du CESEDA')}. Le salaire saisi est le salaire mensuel brut prévu au contrat.</p>
${h.table(['Contrat', 'Salaire mensuel brut', 'Taxe'], [
  ['Plus de 3 mois, moins de 12', `jusqu’à ${h.eur(TE.court[0].jusqua!, 2)}`, h.eur(TE.court[0].montant)],
  ['Plus de 3 mois, moins de 12', `jusqu’à ${h.eur(TE.court[1].jusqua!, 2)}`, h.eur(TE.court[1].montant)],
  ['Plus de 3 mois, moins de 12', `au-delà de ${h.eur(TE.court[1].jusqua!, 2)}`, h.eur(TE.court[2].montant)],
  ['12 mois ou plus', `moins de ${h.eur(TE.long_plafond_salaire, 2)}`, `${h.pct(TE.long_taux, 0)} du salaire`],
  ['12 mois ou plus', `${h.eur(TE.long_plafond_salaire, 2)} ou plus`, h.eur(TE.long_plafond, 2)],
  ['Saisonnier', 'tout salaire', `${h.eur(TE.saisonnier_par_mois)} par mois`],
], 'Taxe employeur (fiche vérifiée le 18 juin 2026)', ['l', 'l', 'r'])}
<h2>Exemples</h2>
<p>Un contrat de travail saisonnier de quatre mois coûte ${h.eur(sais)} à l’employeur, quel que soit le salaire. Un cadre recruté en CDI à ${h.eur(6500)} par mois atteint le plafond : ${h.eur(haut, 2)}. Le seuil de ${h.eur(TE.long_plafond_salaire, 2)} représente deux fois et demie le Smic mensuel, ce qui explique que le plafond soit atteint dès les salaires de cadre. La taxe est une charge de l’employeur : elle ne peut pas être retenue sur le salaire du nouveau collaborateur.</p>
<h2>Quand la taxe disparaît</h2>
<p>Un salarié titulaire d’une carte talent, comme ${h.src('sp_F16922', 'la carte talent salarié qualifié ou la carte bleue européenne')}, n’a pas besoin d’autorisation de travail : la taxe n’est pas due. Avant de recruter hors de ces cartes, voir ${h.a('autorisation-de-travail', 'la page Autorisation de travail')}.</p>
`,
  },
  en: {
    slug: 'employer-tax-foreign-employee',
    nav: 'Employer tax',
    card: 'The tax an employer pays when hiring a non-EU worker, by contract and salary.',
    title: 'Employer Tax for a Foreign Employee 2026: Amount by Salary',
    description: `Employer tax on hiring a non-EU employee in France 2026: ${pE} of monthly pay with a cap for one-year contracts, short-contract scale, seasonal rate, exemptions.`,
    h1: 'Employer tax on hiring a foreign employee in France: the exact amount',
    intro: 'Choose the contract type and gross monthly salary: the calculator applies the scale of the tax the employer owes.',
    resume: `An employer who obtains a work authorisation for a non-EU employee pays a tax (taxe employeur) when that employee is first admitted to stay in France for work, once only and by the first employer alone. For a contract of 12 months or more, it is ${pE} of gross monthly pay, capped at ${eE(TE.long_plafond, 2)} once pay reaches ${eE(TE.long_plafond_salaire, 2)}. An employee on ${eE(3200)} gross a month therefore costs ${eE(def, 2)} in tax; on the minimum wage, ${eE(smic, 2)}; at ${eE(6500)}, the cap applies. For a contract longer than 3 months and shorter than 12, the scale is flat: ${eE(TE.court[0].montant)} up to the ${eE(TE.court[0].jusqua!, 2)} minimum wage, ${eE(TE.court[1].montant)} up to ${eE(TE.court[1].jusqua!, 2)}, ${eE(TE.court[2].montant)} above. A seasonal worker costs ${eE(TE.saisonnier_par_mois)} per month worked, a young-professional exchange ${eE(TE.jeune_pro)}. The tax is declared with VAT, on schedule 3310 A or form 3517-S-SD depending on the company's VAT regime.`,
    faqs: [
      { q: 'When does the employer tax for a foreign employee fall due?', a: 'On the employee’s first admission to stay in France for work, for a work authorisation of more than 3 months; for seasonal farm workers, from day one. It is due once, from the first employer. It becomes payable again if the employee left when the permit ended and comes back for a job that needs an authorisation.' },
      { q: 'Which employers are exempt from the tax?', a: 'A private household employing someone at home for family or domestic tasks, public research bodies and higher-education institutions hiring researchers and lecturers, employers of language assistants, and any employer whose new hire already holds a permit that allows work without authorisation, such as a talent card or a resident card.' },
      { q: 'How is the employer tax declared and paid?', a: 'With VAT. Under the standard regime, on schedule 3310 A of the return for January or the first quarter of the following year; under the simplified regime, on form 3517-S-SD or 3517-AGR-SD. An employer not liable for VAT files schedule 3310 A by 25 February of the following year.' },
      { q: 'What does a six-month contract paying €1,900 a month cost?', a: `${eE(c1)}, because the salary is above the ${eE(TE.court[0].jusqua!, 2)} minimum wage but below ${eE(TE.court[1].jusqua!, 2)}. At ${eE(3100)} a month the tax rises to ${eE(c2)}. The short-contract scale is flat: it does not depend on the exact length between 3 and 12 months.` },
    ],
    body: (h) => `
<h2>The scale applied</h2>
<p>The calculator uses the amounts published on ${h.src('sp_F2728', 'the official work-authorisation page')} (in French), which applies ${h.ext(LF, 'sections L436-10 to L436-13 of the CESEDA immigration code')}. The salary you enter is the gross monthly pay in the contract.</p>
${h.table(['Contract', 'Gross monthly pay', 'Tax'], [
  ['Over 3 and under 12 months', `up to ${h.eur(TE.court[0].jusqua!, 2)}`, h.eur(TE.court[0].montant)],
  ['Over 3 and under 12 months', `up to ${h.eur(TE.court[1].jusqua!, 2)}`, h.eur(TE.court[1].montant)],
  ['Over 3 and under 12 months', `above ${h.eur(TE.court[1].jusqua!, 2)}`, h.eur(TE.court[2].montant)],
  ['12 months or more', `below ${h.eur(TE.long_plafond_salaire, 2)}`, `${h.pct(TE.long_taux, 0)} of pay`],
  ['12 months or more', `${h.eur(TE.long_plafond_salaire, 2)} or more`, h.eur(TE.long_plafond, 2)],
  ['Seasonal', 'any pay', `${h.eur(TE.saisonnier_par_mois)} per month`],
], 'Employer tax (official page checked 18 June 2026)', ['l', 'l', 'r'])}
<h2>Examples</h2>
<p>A four-month seasonal contract costs the employer ${h.eur(sais)}, whatever the pay. A manager hired on a permanent contract (CDI) at ${h.eur(6500)} a month hits the cap: ${h.eur(haut, 2)}. The ${h.eur(TE.long_plafond_salaire, 2)} threshold is two and a half times the monthly minimum wage, which is why most executive salaries reach the cap. The tax is a cost for the employer and cannot be deducted from the new employee’s pay.</p>
<h2>When the tax does not apply</h2>
<p>An employee holding a talent card, such as ${h.src('sp_F16922', 'the skilled-employee talent card or the EU Blue Card')}, needs no work authorisation, so no tax is due. Before hiring outside those cards, see ${h.a('autorisation-de-travail', 'the work authorisation page')}.</p>
`,
  },
});
