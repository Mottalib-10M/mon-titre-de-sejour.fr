import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { receSeuilOk } from '../../lib/engine/travail';
import { addMonths, addDays } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

// Exemple suivi : diplômée d'un master en juin 2026, carte étudiant valable jusqu'au 31 octobre 2026.
const S = P.rece.seuil_mensuel;
const finEtu = '2026-10-31';
const ouverture = addMonths(finEtu, -2);
const debutRece = addDays(finEtu, 1);
const finRece = addDays(addMonths(debutRece, 12), -1);
const enFrance = coutTitre('rece', 'premiere').total;
const vls = coutTitre('rece', 'vls').total;
const offreA = 2950, offreB = 2700;
const okA = receSeuilOk(offreA), okB = receSeuilOk(offreB);
const salPrem = coutTitre('salarie', 'premiere').total;
const entr = coutTitre('entrepreneur', 'premiere').total;
const TL = P.talent;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');
const LF = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771670/';
const LF_MASTER = 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000023995338/';

export default defineGuide({
  id: 'carte-recherche-emploi-creation-entreprise',
  group: 'travail',
  order: 45,
  mini: 'rece',
  miniHref: 'changement-de-statut-etudiant-salarie',
  related: ['changement-de-statut-etudiant-salarie', 'titre-de-sejour-etudiant', 'carte-entrepreneur-profession-liberale', 'passeport-talent', 'validation-vls-ts'],
  sources: ['sp_F17319', 'sp_F2229', 'sp_F2728'],
  fr: {
    slug: 'carte-recherche-emploi-creation-entreprise',
    nav: 'Carte recherche d’emploi',
    card: 'Un an après le master pour trouver un emploi ou créer son entreprise : qui y a droit, coût, et la suite.',
    title: 'Carte recherche d’emploi 2026 : un an après le diplôme',
    description: 'Carte recherche d’emploi ou création d’entreprise 2026 : diplômes acceptés, demande en France ou dans les 4 ans depuis l’étranger, coût, salaire, suite.',
    h1: 'Carte recherche d’emploi ou création d’entreprise : l’année après le diplôme',
    intro: 'Elle donne un an au jeune diplômé d’un master français pour trouver un emploi lié à ses études ou lancer son entreprise.',
    resume: `La carte de séjour « recherche d’emploi ou création d’entreprise », souvent appelée carte RECE, permet à un étudiant non européen qui vient d’obtenir en France un master, une licence professionnelle, un mastère spécialisé ou un diplôme équivalent de rester un an pour chercher un emploi ou créer une entreprise en lien avec ses études. Le diplôme doit dater de moins de douze mois si vous êtes encore en France ; reparti à l’étranger, vous pouvez la demander dans les quatre ans suivant le diplôme, sous forme de VLS-TS. Elle coûte ${eF(enFrance)} demandée en France, ${eF(vls)} à la validation du visa depuis l’étranger. Pendant cette année, vous pouvez travailler sans autorisation de travail dans un emploi lié à votre formation payé plus de ${eF(S, 2)} brut par mois, et la limite étudiante de 964 heures ne s’applique plus. La carte ne se renouvelle pas. Pour une carte étudiant qui expire le ${dF(finEtu)}, la demande se dépose à partir du ${dF(ouverture)} ; la carte couvrirait alors jusqu’au ${dF(finRece)}.`,
    faqs: [
      { q: 'Quels diplômes ouvrent droit à la carte recherche d’emploi ?', a: 'Une licence professionnelle, un mastère spécialisé, un Master of Science labellisé par la Conférence des grandes écoles, ou tout diplôme au moins équivalent au master, obtenu en France. La liste des diplômes équivalents au master est fixée par arrêté. Une licence générale ou un bac+2 ne suffisent pas : le changement de statut passe alors par une autorisation de travail.' },
      { q: 'Peut-on demander la carte recherche d’emploi après être rentré dans son pays ?', a: `Oui, dans les quatre ans qui suivent l’obtention du diplôme en France. Vous demandez au consulat un VLS-TS « recherche d’emploi ou création d’entreprise », puis vous le validez en ligne dans les trois mois suivant votre arrivée en payant ${eF(vls)}. Le droit de visa payé au consulat s’ajoute et dépend du pays.` },
      { q: 'Peut-on travailler dans n’importe quel emploi avec la carte recherche d’emploi ?', a: `Sans autorisation de travail, seulement dans un emploi en lien avec vos études et payé plus de ${eF(S, 2)} brut par mois. Une offre à ${eF(offreA)} remplit la condition de salaire, une offre à ${eF(offreB)} non (${okB ? 'oui' : 'non'}). Pour un autre emploi, l’employeur doit demander une autorisation de travail classique.` },
      { q: 'Que faire à la fin de l’année de recherche d’emploi ?', a: `Demander une carte de travail. Avec un emploi lié à la formation au-delà du seuil, la carte salarié ou travailleur temporaire, sans examen de la situation de l’emploi, pour ${eF(salPrem)} de timbres. Avec ${eF(TL.salaire_ref)} brut par an, la carte talent salarié qualifié. Avec une entreprise créée, la carte entrepreneur ou la carte talent porteur de projet.` },
      { q: 'Les étudiants algériens peuvent-ils obtenir la carte recherche d’emploi ?', a: 'Non. La fiche officielle précise que cette carte ne concerne pas les étudiants algériens, dont le séjour relève de l’accord franco-algérien de 1968. Les ressortissants de pays liés à la France par un accord sur les flux migratoires peuvent, eux, demander une autorisation provisoire de séjour pour une première expérience professionnelle.' },
    ],
    body: (h) => `
<h2>Qui peut la demander</h2>
<p>Deux publics sont visés. D’abord l’étudiant encore en France, qui séjourne avec une carte étudiant ou étudiant-programme de mobilité et a obtenu dans les douze derniers mois une licence professionnelle, un mastère spécialisé, un Master of Science labellisé ou un diplôme au moins équivalent au master ; la liste des équivalences figure dans ${h.ext(LF_MASTER, 'l’arrêté du 12 mai 2011')}. Ensuite le diplômé reparti à l’étranger, qui dispose de quatre ans après son diplôme français pour revenir avec un VLS-TS. Un troisième cas existe : le titulaire d’une carte talent-chercheur qui a achevé ses travaux. Ces règles viennent de ${h.src('sp_F17319', 'la fiche Carte de séjour ou VLS-TS recherche d’emploi ou création d’entreprise')} et des ${h.ext(LF, 'articles L422-8 à L422-14 du CESEDA')}.</p>
<h2>Ce que la carte permet pendant un an</h2>
<p>Elle vous autorise à rester un an en France pour chercher un emploi ou créer une entreprise dans un domaine lié à vos études ou à vos recherches. Vous pouvez travailler comme salarié pendant ce temps : l’employeur est dispensé d’autorisation de travail, à condition que l’emploi soit en lien avec votre formation et que la rémunération mensuelle brute dépasse ${h.eur(S, 2)}, une fois et demie le Smic. La limite de 964 heures par an qui s’appliquait avec la carte étudiant tombe. La carte n’est pas renouvelable : l’année sert de passerelle vers un titre de travail.</p>
<h2>Calendrier d’une diplômée de juin 2026</h2>
<p>Prenons une étudiante qui a obtenu son master en juin 2026 et dont la carte étudiant expire le ${h.date(finEtu)}. Elle doit déposer sa demande à la préfecture de son domicile dans les deux mois qui précèdent cette date, donc à partir du ${h.date(ouverture)}. Le dossier complet lui vaut un récépissé en attendant la réponse. La carte, d’un an, couvrirait la période du ${h.date(debutRece)} au ${h.date(finRece)}, et c’est avant cette dernière date qu’il faudra demander la carte suivante.</p>
${h.table(['Étape', 'Date ou montant'], [
  ['Fin de la carte étudiant', h.date(finEtu)],
  ['Dépôt possible à partir du', h.date(ouverture)],
  ['Timbres de la carte demandée en France', h.eur(enFrance)],
  ['Taxe de validation du VLS-TS (demande depuis l’étranger)', h.eur(vls)],
  ['Fin de l’année de recherche', h.date(finRece)],
], 'Exemple : master obtenu en juin 2026', ['l', 'r'])}
<h2>Le dossier</h2>
<p>La préfecture demande la carte étudiant en cours de validité ou le VLS-TS validé, un justificatif de nationalité, un justificatif de domicile de moins de six mois, trois photos, une attestation d’assurance maladie, le diplôme obtenu dans les douze derniers mois ou l’attestation de réussite définitive, l’engagement signé de respecter les principes de la République et, si vous visez la création d’entreprise, la description d’un projet dans un domaine correspondant à votre formation. Une déclaration sur l’honneur de non-polygamie est exigée des personnes mariées originaires d’un pays qui l’autorise.</p>
<h2>Trouver l’emploi : la règle du salaire</h2>
<p>Le seuil de ${h.eur(S, 2)} est strict : la fiche parle d’une rémunération « supérieure » à ce montant. Le mini-simulateur en tête de page compare l’offre que vous avez reçue. Une offre à ${h.eur(offreA)} brut par mois passe (${okA ? 'oui' : 'non'}), une offre à ${h.eur(offreB)} ne passe pas : l’employeur devrait alors obtenir une autorisation de travail ordinaire, avec publication de l’offre ou métier en tension, comme le décrit ${h.src('sp_F2728', 'la fiche Autorisation de travail')}. Pour comparer votre offre à tous les seuils, y compris ceux des cartes talent, utilisez ${h.a('changement-de-statut-etudiant-salarie', 'le simulateur Changement de statut')}.</p>
<h2>Créer son entreprise</h2>
<p>Si l’année débouche sur une entreprise, deux titres sont possibles. La carte « entrepreneur / profession libérale » demande une activité capable de procurer au moins le Smic, ${h.eur(P.entrepreneur.revenu_mensuel_min, 2)} par mois, et coûte ${h.eur(entr)} en première délivrance. La carte talent porteur de projet demande un projet réel et sérieux, au moins ${h.eur(TL.createur_investissement)} de financement et des ressources au moins égales au Smic annuel. ${h.a('carte-entrepreneur-profession-liberale', 'La page Carte entrepreneur')} détaille la première.</p>
<h2>Trois erreurs qui coûtent l’année</h2>
<p>La première est de laisser expirer la carte étudiant : la demande se dépose avant sa fin, dans les deux derniers mois, et non après la remise du diplôme si celle-ci intervient plus tard ; l’attestation de réussite définitive suffit. La deuxième est d’accepter un poste sans lien avec la formation en croyant la carte suffisante : sans lien ou sous le seuil, l’employeur doit demander une autorisation de travail. La troisième est d’attendre la dernière semaine de l’année de recherche pour préparer la carte suivante : comme la carte RECE ne se renouvelle pas, c’est la nouvelle demande, déposée à temps, qui maintient le séjour régulier. À noter enfin que la carte étudiant ne permettait pas d’être auto-entrepreneur ; la carte RECE, elle, est conçue pour préparer une création d’entreprise.</p>
<h2>Cas particuliers</h2>
<p>Les étudiants algériens ne peuvent pas obtenir cette carte. Les ressortissants d’un pays lié à la France par un accord sur les flux migratoires peuvent préférer une autorisation provisoire de séjour pour une première expérience professionnelle ; ${h.src('sp_F2229', 'la fiche sur le travail après les études')} liste ces pays et les métiers ouverts. Information, pas un conseil juridique : la préfecture apprécie le lien entre l’emploi et le diplôme.</p>
`,
  },
  en: {
    slug: 'job-search-permit-graduates',
    nav: 'Job-search card for graduates',
    card: 'A year after your French master’s to find a job or start a business: who qualifies, cost, what comes next.',
    title: 'Job-Search Permit France 2026: One Year After Graduating',
    description: 'Job-search or business-creation card 2026: degrees accepted, applying in France or within 4 years from abroad, cost, salary rule and the permit to ask for next.',
    h1: 'Job-search or business-creation card: your year after graduating',
    intro: 'It gives a recent graduate of a French master’s programme one year to find a job related to their studies or launch a business.',
    resume: `The "recherche d'emploi ou création d'entreprise" card, often called the RECE card, lets a non-EU student who has just earned a master's, a professional bachelor's (licence professionnelle), a mastère spécialisé or an equivalent degree in France stay for one year to look for a job or start a business linked to their studies. The degree must be less than twelve months old if you are still in France; if you have gone home, you can apply within four years of graduating, as a VLS-TS visa. It costs ${eE(enFrance)} when applied for in France, or ${eE(vls)} at visa validation if you come from abroad. During that year you can work without a work authorisation in a job related to your degree paying more than ${eE(S, 2)} gross a month, and the student limit of 964 hours no longer applies. The card cannot be renewed. For a student card ending on ${dE(finEtu)}, the application can go in from ${dE(ouverture)}; the card would then run until ${dE(finRece)}.`,
    faqs: [
      { q: 'Which degrees qualify for the job-search card?', a: 'A professional bachelor’s (licence professionnelle), a mastère spécialisé, a Master of Science accredited by the Conférence des grandes écoles, or any degree at least equivalent to a master’s, earned in France. The list of master’s-equivalent degrees is set by ministerial order. A general bachelor’s or a two-year diploma is not enough: the change of status then goes through a work authorisation.' },
      { q: 'Can I apply for the job-search card after going back home?', a: `Yes, within four years of your French degree. You apply at the consulate for a "recherche d'emploi ou création d'entreprise" VLS-TS, then validate it online within three months of arrival, paying ${eE(vls)}. The visa fee charged by the consulate comes on top and depends on the country.` },
      { q: 'Can I take any job while holding the job-search card?', a: `Without a work authorisation, only a job related to your studies and paying more than ${eE(S, 2)} gross a month. An offer at ${eE(offreA)} meets the salary condition, an offer at ${eE(offreB)} does not (${okB ? 'yes' : 'no'}). For any other job, the employer must go through the standard work authorisation procedure.` },
      { q: 'What should I do when the job-search year ends?', a: `Apply for a work permit. With a degree-related job above the threshold, the employee or temporary worker card, with no labour-market test, for ${eE(salPrem)} in stamps. With ${eE(TL.salaire_ref)} gross a year, the skilled-employee talent card. With a business up and running, the self-employed card or the talent card for business founders.` },
      { q: 'Can Algerian graduates get the job-search card?', a: 'No. The official page states that this card does not apply to Algerian students, whose stay is governed by the 1968 Franco-Algerian agreement. Nationals of countries that have a migration agreement with France can instead apply for a temporary residence authorisation (APS) for a first professional experience.' },
    ],
    body: (h) => `
<h2>Who can apply</h2>
<p>Two groups are covered. First, students still in France on a student or student-mobility card who have earned, within the last twelve months, a professional bachelor's, a mastère spécialisé, an accredited Master of Science or a degree at least equivalent to a master's; the list of equivalents is in ${h.ext(LF_MASTER, 'the order of 12 May 2011')}. Second, graduates who have left France, who have four years after their French degree to come back on a VLS-TS. A third case exists: holders of a talent-researcher card whose research is complete. These rules come from ${h.src('sp_F17319', 'the official job-search and business-creation card page')} (in French) and ${h.ext(LF, 'sections L422-8 to L422-14 of the CESEDA immigration code')}.</p>
<h2>What the card allows for one year</h2>
<p>It lets you stay in France for one year to look for work or start a business in a field related to your studies or research. You may work as an employee meanwhile: the employer needs no work authorisation, provided the job relates to your degree and gross monthly pay exceeds ${h.eur(S, 2)}, one and a half times the minimum wage (Smic). The 964-hour annual limit that applied on the student card falls away. The card is not renewable: the year is a bridge to a work permit.</p>
<h2>Timeline for a June 2026 graduate</h2>
<p>Take a student who earned her master's in June 2026 and whose student card ends on ${h.date(finEtu)}. She must apply at the prefecture where she lives within the two months before that date, so from ${h.date(ouverture)}. A complete file earns her a receipt (récépissé) while she waits for the answer. The one-year card would run from ${h.date(debutRece)} to ${h.date(finRece)}, and the next permit must be requested before that last date.</p>
${h.table(['Step', 'Date or amount'], [
  ['Student card ends', h.date(finEtu)],
  ['Application possible from', h.date(ouverture)],
  ['Stamps for the card applied for in France', h.eur(enFrance)],
  ['VLS-TS validation tax (applying from abroad)', h.eur(vls)],
  ['End of the job-search year', h.date(finRece)],
], 'Example: master’s earned in June 2026', ['l', 'r'])}
<h2>The file</h2>
<p>The prefecture asks for your valid student card or validated VLS-TS, proof of nationality, proof of address under six months old, three photos, proof of health insurance, the degree obtained within the last twelve months or the final pass certificate, the signed commitment to respect the principles of the Republic and, if you are aiming to start a business, a description of a project in a field matching your studies. Married applicants from a country that allows polygamy also sign a sworn statement that they do not live in a polygamous situation in France.</p>
<h2>Finding the job: the salary rule</h2>
<p>The ${h.eur(S, 2)} threshold is strict: the official page says pay must be "above" that amount. The mini calculator at the top of the page checks the offer you have received. An offer at ${h.eur(offreA)} gross a month passes (${okA ? 'yes' : 'no'}), one at ${h.eur(offreB)} does not: the employer would then need an ordinary work authorisation, with the job advertised first or listed as a shortage occupation, as ${h.src('sp_F2728', 'the work authorisation page')} explains. To compare your offer with every threshold, talent cards included, use ${h.a('changement-de-statut-etudiant-salarie', 'the change-of-status calculator')}.</p>
<h2>Starting a business</h2>
<p>If the year leads to a business, two permits are possible. The "entrepreneur / profession libérale" (self-employed) card requires a business able to bring in at least the minimum wage, ${h.eur(P.entrepreneur.revenu_mensuel_min, 2)} a month, and costs ${h.eur(entr)} on first issue. The talent card for business founders requires a real and serious project, at least ${h.eur(TL.createur_investissement)} of funding and resources at least equal to the annual minimum wage. ${h.a('carte-entrepreneur-profession-liberale', 'The self-employed card page')} covers the first in detail.</p>
<h2>Three mistakes that cost you the year</h2>
<p>The first is letting the student card lapse: the application goes in before it ends, in its last two months, not after the degree ceremony if that comes later; the final pass certificate is enough. The second is accepting a job unrelated to your degree in the belief that the card covers it: if the job is unrelated or below the threshold, the employer must request a work authorisation. The third is waiting until the last week of the job-search year to prepare the next permit: since the RECE card cannot be renewed, it is the new application, filed in time, that keeps your stay lawful. Note too that the student card did not let you register as a micro-entrepreneur (auto-entrepreneur); the RECE card, by contrast, is designed for preparing a business launch. If you are applying from abroad, remember that the visa must be validated online within three months of arrival, otherwise your stay becomes irregular and you cannot re-enter the Schengen area after a trip.</p>
<h2>Special cases</h2>
<p>Algerian students cannot get this card. Nationals of a country with a migration agreement with France may prefer a temporary residence authorisation for a first professional experience; ${h.src('sp_F2229', 'the official page on working after your studies')} lists those countries and the jobs open to them. Information, not legal advice: the prefecture judges whether the job is really linked to your degree.</p>
`,
  },
});
