import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { receSeuilOk, seuilsTalent } from '../../lib/engine/travail';
import { coutTitre } from '../../lib/engine/couts';
import { formatMoney } from '../../lib/format';

// Valeurs par défaut du simulateur (preset « rece ») : 36 000 € brut par an, soit 3 000 € par mois.
const S = P.rece.seuil_mensuel;
const ex = 36000;
const exOk = receSeuilOk(ex / 12);
const exT = seuilsTalent(ex).find((x) => x.voie === 'talent_salarie')!;
const juste = receSeuilOk(S);
const rece = coutTitre('rece', 'premiere').total;
const salPrem = coutTitre('salarie', 'premiere').total;
const smic = P.smic.historique[P.smic.historique.length - 1].mensuel;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const LF = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771670/';

export default defineGuide({
  id: 'changement-de-statut-etudiant-salarie',
  group: 'travail',
  order: 40,
  tool: 'talent',
  preset: 'rece',
  related: ['carte-recherche-emploi-creation-entreprise', 'titre-de-sejour-etudiant', 'passeport-talent', 'autorisation-de-travail', 'titre-de-sejour-salarie'],
  sources: ['sp_F2229', 'sp_F17319', 'sp_F2713'],
  fr: {
    slug: 'changement-de-statut-etudiant-salarie',
    nav: 'Changement de statut étudiant',
    card: 'Le salaire qui dispense de l’examen de la situation de l’emploi, et la carte à demander.',
    title: 'Changement de statut étudiant 2026 : le seuil de salaire',
    description: 'Changement de statut étudiant vers salarié 2026 : seuil de 1,5 Smic, master ou licence pro, carte recherche d’emploi, cartes talent, coût et calendrier.',
    h1: 'Changement de statut étudiant vers salarié : quel salaire faut-il ?',
    intro: 'Saisissez le salaire annuel proposé : le simulateur dit si l’emploi échappe à l’examen de la situation de l’emploi et quelles cartes talent sont accessibles.',
    resume: `Passer d’une carte étudiant à une carte de travail s’appelle un changement de statut, et la règle dépend du diplôme. Avec un bac+2, l’employeur obtient une autorisation de travail et la situation de l’emploi vous est opposée, sauf métier en tension. Avec un master, une licence professionnelle ou un diplôme équivalent obtenu en France, l’emploi en relation avec votre formation échappe à cet examen si le salaire atteint une fois et demie le Smic, soit ${eF(S, 2)} brut par mois depuis la revalorisation du 1er juin 2026, alors que le Smic est à ${eF(smic, 2)}. Pour la carte de recherche d’emploi, le salaire doit être strictement supérieur à ce montant. Un poste à ${eF(ex)} par an, soit ${eF(ex / 12)} par mois, passe la barre ; il reste ${eF(-exT.ecart)} sous le seuil de la carte talent salarié qualifié. La carte de recherche d’emploi coûte ${eF(rece)}, la carte salarié ${eF(salPrem)} en première délivrance. La demande se dépose dans les deux mois qui précèdent la fin de la carte étudiant.`,
    faqs: [
      { q: 'Un salaire égal à 1,5 Smic suffit-il pour changer de statut ?', a: `Pour la carte de recherche d’emploi, non : la fiche officielle exige une rémunération mensuelle brute supérieure à ${eF(S, 2)}, et le simulateur rend « non » à ce montant exact (${juste ? 'oui' : 'non'}). Pour le diplômé de master demandant directement une autorisation de travail, la fiche parle d’une rémunération au moins égale à ce montant. Visez un salaire au-dessus pour éviter toute discussion.` },
      { q: 'Combien d’heures un étudiant étranger peut-il travailler avant son changement de statut ?', a: 'Au plus 964 heures par an, soit 60 % de la durée annuelle légale, sans autorisation de travail. La période court à partir de la délivrance de la carte ou de la validation du VLS-TS. Au-delà, l’employeur doit demander une autorisation, sauf contrat d’apprentissage validé par l’opérateur de compétences ; dépasser la limite expose à un refus de renouvellement.' },
      { q: 'Faut-il que l’emploi corresponde à mes études ?', a: 'Oui, pour bénéficier de la dispense d’examen de la situation de l’emploi : le contrat doit être en relation avec la formation ou les recherches. Un emploi sans lien avec le diplôme reste possible, mais l’employeur doit alors demander une autorisation de travail classique, avec publication préalable de l’offre ou métier en tension.' },
      { q: 'Quand déposer la demande de changement de statut ?', a: `Dans les deux mois qui précèdent la fin de validité de la carte étudiant. Après le diplôme, la carte de recherche d’emploi ou de création d’entreprise donne un an pour trouver le poste ; elle coûte ${eF(rece)} et ne se renouvelle pas. Un diplômé reparti à l’étranger peut la demander dans les quatre ans qui suivent le diplôme.` },
    ],
    body: (h) => `
<h2>Ce que le simulateur compare</h2>
<p>Il convertit le salaire annuel en salaire mensuel et le compare au seuil de ${h.eur(S, 2)}, une fois et demie le Smic mensuel brut. Il affiche aussi les seuils des cartes talent, parce qu’un jeune diplômé bien payé peut sauter l’étape de la carte salarié. Les règles viennent de ${h.src('sp_F2229', 'la fiche sur le travail après les études')} et de ${h.src('sp_F17319', 'la fiche Carte recherche d’emploi ou création d’entreprise')}.</p>
${h.table(['Salaire proposé', 'Carte à demander', 'Autorisation de travail'], [
  [`plus de ${h.eur(S, 2)} par mois, emploi lié aux études`, 'Salarié ou travailleur temporaire', 'oui, sans examen de la situation de l’emploi'],
  [`à partir de ${h.eur(P.talent.salaire_ref)} par an, master français`, 'Talent salarié qualifié', 'non'],
  [`à partir de ${h.eur(P.talent.praticien, 2)} par an`, 'Talent professions médicales', 'non'],
  [`à partir de ${h.eur(P.talent.cbe)} par an`, 'Talent carte bleue européenne', 'non'],
], 'Carte demandée à l’issue de la carte recherche d’emploi, selon le salaire', ['l', 'l', 'l'])}
<h2>Le cas du bac+2 et de la licence</h2>
<p>Sans master ni licence professionnelle, le changement de statut passe par une autorisation de travail demandée par l’employeur et l’examen de la situation de l’emploi, sauf si le poste figure sur la liste des métiers en tension. Les ressortissants de pays liés à la France par un accord sur les flux migratoires disposent de listes de métiers propres. Pendant les études, ${h.src('sp_F2713', 'la fiche sur le travail des étudiants')} rappelle la limite de 964 heures par an. La base légale est aux ${h.ext(LF, 'articles L422-8 à L422-14 du CESEDA')}.</p>
<h2>Limites</h2>
<p>Les étudiants algériens relèvent de l’accord franco-algérien et ne peuvent pas demander la carte de recherche d’emploi. Le simulateur ne vérifie ni le lien entre l’emploi et le diplôme ni la nature du contrat : la préfecture en juge sur pièces.</p>
`,
  },
  en: {
    slug: 'student-to-employee-status-change',
    nav: 'Student to employee status',
    card: 'The salary that removes the labour-market test, and which card to apply for.',
    title: 'Student to Employee Status Change 2026: Salary Threshold',
    description: 'Student to employee status change 2026: the 1.5 minimum-wage threshold, master’s or professional degree, job-search card, talent cards, cost and timing.',
    h1: 'From student to employee in France: what salary do you need?',
    intro: 'Enter the annual salary offered: the calculator shows whether the job escapes the labour-market test and which talent cards are within reach.',
    resume: `Moving from a student card to a work permit is called a change of status (changement de statut), and the rule depends on your degree. With a two-year diploma, the employer obtains a work authorisation and the labour-market test applies (the job must be advertised first), unless the role is on the shortage-occupation list. With a master's, a professional bachelor's (licence professionnelle) or an equivalent degree earned in France, a job related to your studies escapes that test if the pay reaches one and a half times the minimum wage: ${eE(S, 2)} gross a month since the 1 June 2026 increase, with the minimum wage itself at ${eE(smic, 2)}. For the job-search card, pay must be strictly above that figure. A post at ${eE(ex)} a year, ${eE(ex / 12)} a month, clears the bar but remains ${eE(-exT.ecart)} short of the skilled-employee talent card. The job-search card costs ${eE(rece)}, the employee card ${eE(salPrem)} on first issue. You apply in the two months before your student card expires.`,
    faqs: [
      { q: 'Is a salary of exactly 1.5 times the minimum wage enough?', a: `For the job-search card, no: the official page requires gross monthly pay above ${eE(S, 2)}, and the calculator answers "no" at exactly that figure (${juste ? 'yes' : 'no'}). For a master's graduate applying directly for a work authorisation, the page says pay at least equal to that amount. Aim above it to avoid any argument.` },
      { q: 'How many hours can an international student work before changing status?', a: 'Up to 964 hours a year, 60% of the legal working year, without a work authorisation. The year runs from the date the card was issued or the VLS-TS validated. Beyond that the employer needs an authorisation, except for an apprenticeship approved by the skills operator (OPCO); going over the limit can lead to the permit not being renewed.' },
      { q: 'Does the job have to match what I studied?', a: 'Yes, to benefit from the exemption from the labour-market test: the contract must relate to your degree or research. A job unrelated to your studies is still possible, but then the employer goes through the standard work authorisation, with the job advertised beforehand or listed as a shortage occupation.' },
      { q: 'When should I file the change-of-status application?', a: `In the two months before your student card expires. After graduating, the job-search or business-creation card gives you one year to find the job; it costs ${eE(rece)} and cannot be renewed. A graduate who has left France can still apply for it within four years of the degree.` },
    ],
    body: (h) => `
<h2>What the calculator compares</h2>
<p>It turns your annual salary into a monthly figure and compares it with ${h.eur(S, 2)}, one and a half times the gross monthly minimum wage (Smic). It also shows the talent card thresholds, because a well-paid graduate can skip the employee card altogether. The rules come from ${h.src('sp_F2229', 'the official page on working after your studies')} and ${h.src('sp_F17319', 'the job-search and business-creation card page')} (both in French).</p>
${h.table(['Salary offered', 'Card to apply for', 'Work authorisation'], [
  [`above ${h.eur(S, 2)} a month, job linked to studies`, 'Employee or temporary worker', 'yes, without labour-market test'],
  [`from ${h.eur(P.talent.salaire_ref)} a year, French master’s`, 'Talent: skilled employee', 'no'],
  [`from ${h.eur(P.talent.praticien, 2)} a year`, 'Talent: medical professions', 'no'],
  [`from ${h.eur(P.talent.cbe)} a year`, 'Talent: EU Blue Card', 'no'],
], 'Card to apply for at the end of the job-search card, by salary', ['l', 'l', 'l'])}
<h2>Two-year diplomas and bachelor's degrees</h2>
<p>Without a master's or professional bachelor's, the change of status goes through a work authorisation requested by the employer and the labour-market test, unless the job is on the shortage-occupation list (métiers en tension). Nationals of countries with a migration agreement with France have their own occupation lists. During your studies, ${h.src('sp_F2713', 'the page on student work')} sets the 964-hour annual limit. The legal basis is ${h.ext(LF, 'sections L422-8 to L422-14 of the CESEDA immigration code')}.</p>
<h2>Limits</h2>
<p>Algerian students fall under the Franco-Algerian agreement and cannot apply for the job-search card. The calculator does not check the link between the job and the degree, nor the type of contract: the prefecture decides on the documents.</p>
`,
  },
});
