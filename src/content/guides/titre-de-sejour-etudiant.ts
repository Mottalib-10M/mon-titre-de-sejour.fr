import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre, coutParcours } from '../../lib/engine/couts';
import { vlsTs, fenetreRenouvellement } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

// Exemple : arrivée le 5 septembre 2026, VLS-TS d'un an jusqu'au 4 septembre 2027.
const T = P.tarifs;
const R = P.etudiant.ressources_mensuelles;
const vls = vlsTs('2026-09-05', '2027-09-04');
const ren = fenetreRenouvellement('2027-09-04', '2027-06-01');
const vlsEtu = coutTitre('etudiant', 'vls').total;
const carteEtu = coutTitre('etudiant', 'premiere').total;
const renEtu = coutTitre('etudiant', 'renouvellement').total;
const retardEtu = coutTitre('etudiant', 'renouvellement', { retard: true }).total;
const master = coutParcours('etudiant', 2).total;
const licence = coutParcours('etudiant', 3).total;
const doctorat = coutParcours('etudiant', 5).total;
const mobilite = coutTitre('etudiant_mobilite', 'premiere').total;
const salarieVls = coutTitre('salarie', 'vls').total;
const LF = {
  l422: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771652/',
  r4222: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054301706/',
  l5221: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006903741',
};
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'titre-de-sejour-etudiant',
  group: 'titres',
  order: 60,
  mini: 'etudiant',
  miniHref: 'validation-vls-ts',
  related: ['validation-vls-ts', 'changement-de-statut-etudiant-salarie', 'carte-recherche-emploi-creation-entreprise', 'renouvellement-titre-de-sejour', 'carte-de-sejour-pluriannuelle'],
  sources: ['sp_F2231', 'sp_F35796', 'sp_F2713', 'sp_F2229'],
  fr: {
    slug: 'titre-de-sejour-etudiant',
    nav: 'Titre de séjour étudiant',
    card: 'VLS-TS, carte d’un an puis pluriannuelle, ressources mensuelles, heures de travail et coût de chaque étape.',
    title: 'Titre de séjour étudiant 2026 : ressources, coût et travail',
    description: 'Titre de séjour étudiant 2026 : VLS-TS à valider en 3 mois, ressources exigées, timbres au tarif minoré, 964 heures de travail par an, carte pluriannuelle.',
    h1: 'Titre de séjour étudiant : du visa à la carte pluriannuelle',
    intro: 'La première année se passe sous visa long séjour valant titre de séjour ; la carte étudiant ne vient qu’ensuite, avec ses propres conditions.',
    resume: `Un étudiant étranger non européen arrive en France avec un visa de long séjour valant titre de séjour (VLS-TS) mention étudiant, valable de 4 mois à 1 an, qu’il doit valider en ligne dans les 3 mois suivant son arrivée en payant une taxe de ${eF(vlsEtu)}. Après la première année, il demande une carte de séjour étudiant, d’un an ou pluriannuelle pour la durée restante du cycle, au plus tôt 4 mois et au plus tard 2 mois avant la fin de son visa. À chaque étape, il doit justifier de ressources d’au moins ${eF(R, 2)} par mois, soit ${eF(R * 12)} sur une année, et d’une inscription dans un établissement d’enseignement supérieur. La carte coûte ${eF(carteEtu)} au tarif minoré et chaque renouvellement ${eF(renEtu)} ; un dépôt hors délai ajoute ${eF(T.retard_renouvellement)}. Un master de deux ans revient ainsi à ${eF(master)} de timbres, une licence de trois ans à ${eF(licence)}. Le titre étudiant permet de travailler 964 heures par an sans autorisation de travail, à condition que l’employeur déclare l’embauche à la préfecture.`,
    faqs: [
      { q: 'Faut-il un titre de séjour pour étudier moins d’un an en France ?', a: 'Non, si le visa obtenu au consulat est un VLS-TS étudiant : il vaut titre de séjour pour sa durée, de 4 mois à 1 an, à condition d’être validé en ligne dans les 3 mois suivant l’arrivée. Pour une formation plus courte que 4 mois, la fiche officielle renvoie vers les procédures de France-Visas, qui dépendent de votre pays.' },
      { q: 'Les ressources de l’étudiant peuvent-elles venir des parents ?', a: `Oui. La fiche officielle accepte une prise en charge par un tiers, avec sa pièce d’identité et la preuve de virements réguliers, ou une attestation sur l’honneur de versement atteignant ${eF(R, 2)} par mois. Une bourse du gouvernement français, une bourse du pays d’origine, des fiches de paie ou un solde bancaire suffisant sont aussi admis, chacun avec son justificatif.` },
      { q: 'Combien d’heures un étudiant étranger peut-il travailler ?', a: 'Jusqu’à 964 heures par an, soit 60 % de la durée annuelle légale du travail, sans autorisation de travail. Le compteur démarre à la délivrance de la carte ou à la validation du VLS-TS. Au-delà, l’employeur doit obtenir une autorisation ; sinon, l’étudiant risque le retrait ou le refus de renouvellement de son titre.' },
      { q: 'Le titre étudiant permet-il de créer une micro-entreprise ?', a: 'Non. La fiche officielle précise que la carte de séjour étudiant ne permet pas d’être auto-entrepreneur. Les activités salariées restent possibles dans la limite des heures autorisées, après déclaration de l’employeur à la préfecture. Un projet d’entreprise se prépare plutôt après le diplôme, avec la carte recherche d’emploi ou création d’entreprise.' },
      { q: 'Que se passe-t-il si la préfecture ne répond pas à la demande de carte étudiant ?', a: 'Le silence gardé pendant 90 jours vaut refus implicite. Vous avez alors 2 mois pour former un recours gracieux auprès du préfet, un recours hiérarchique auprès du ministre de l’Intérieur ou un recours devant le tribunal administratif. Pendant l’instruction, l’attestation de dépôt délivrée en ligne prouve que vous avez déposé à temps.' },
    ],
    body: (h) => `
<h2>Première année : le visa long séjour fait office de titre</h2>
<p>Le parcours ne commence pas en préfecture mais au consulat. L’étudiant inscrit ou préinscrit dans un établissement d’enseignement supérieur, public ou privé, ou dans un organisme de formation professionnelle supérieure, demande un VLS-TS mention étudiant. Les ressortissants de 72 pays passent par la plateforme Études en France au moment de leur préinscription ; les autres déposent leur demande sur France-Visas. Deux cas sont dispensés de visa long séjour : l’étudiant entré régulièrement avec un visa de court séjour « étudiant-concours » qui a réussi son concours, et celui qui a suivi sa scolarité en France depuis au moins ses 16 ans et poursuit des études supérieures. Les deux demandent directement leur titre en préfecture.</p>
<p>À l’arrivée, le compte à rebours démarre : le VLS-TS doit être validé en ligne dans les 3 mois, avec une taxe de ${h.eur(vlsEtu)}. Sans cette validation, le séjour n’est pas régulier et le visa ne permet plus de revenir dans l’espace Schengen après un voyage. Pour une arrivée le ${h.date('2026-09-05')}, la validation doit être faite avant le ${h.date(vls.validationAvant)}. ${h.src('sp_F2231', 'La fiche officielle sur le titre étudiant')} décrit cette étape.</p>
<h2>Les ressources : ${h.eur(R, 2)} par mois, à chaque étape</h2>
<p>La condition de ressources s’applique au visa comme à chaque carte : au moins ${h.eur(R, 2)} par mois, appréciés selon la situation de l’étudiant. Elle ne s’applique pas à celui qui a réussi le concours d’entrée d’un établissement ayant signé une convention avec l’État. Sur une année universitaire de dix mois, cela représente ${h.eur(R * 10)} ; sur douze mois, ${h.eur(R * 12)}. Les justificatifs varient : attestation de bourse, trois dernières fiches de paie, virements programmés par un tiers, attestation bancaire d’un solde créditeur suffisant. En cas de ressources multiples, chacune doit être prouvée.</p>
${h.table(['Durée de séjour', 'Ressources minimales'], [
  ['4 mois', h.eur(R * 4)],
  ['9 mois', h.eur(R * 9)],
  ['12 mois', h.eur(R * 12)],
  ['24 mois', h.eur(R * 24)],
], `Montant mensuel de ${h.eur(R, 2)} fixé par la fiche F2231 (vérifiée le 1er août 2026)`, ['l', 'r'])}
<h2>Après un an : carte d’un an ou carte pluriannuelle</h2>
<p>Quand le VLS-TS arrive à échéance, l’étudiant demande sa carte sur le site de l’administration numérique pour les étrangers en France (ANEF), au plus tôt 4 mois et au plus tard 2 mois avant la fin de son visa. Pour un visa qui expire le ${h.date('2027-09-04')}, la fenêtre court du ${h.date(ren.ouverture)} au ${h.date(ren.limite)}. Une attestation dématérialisée de dépôt est remise aussitôt.</p>
<p>Après un an de présence sous VLS-TS ou carte temporaire, la préfecture peut délivrer une carte pluriannuelle étudiant, dont la durée correspond aux années restant dans le cycle d’études : un étudiant qui a terminé sa première année de licence reçoit une carte de deux ans. Il doit alors prouver le caractère réel et sérieux de ses études : assiduité, résultats, diplômes, explications en cas de changement de cursus. Un redoublement par cycle ne remet pas en cause, à lui seul, ce caractère sérieux. ${h.ext(LF.l422, 'Les articles L422-1 à L422-3 du CESEDA')} et ${h.ext(LF.r4222, 'l’article R422-2')} fondent ce titre.</p>
<h2>Ce que coûte un cursus complet</h2>
<p>L’étudiant paie le tarif minoré, soit environ deux fois moins que le tarif normal : ${h.eur(carteEtu)} pour une première carte contre ${h.eur(T.normal.premiere)}, ${h.eur(renEtu)} pour un renouvellement contre ${h.eur(T.normal.renouvellement)}, et ${h.eur(vlsEtu)} pour la validation du visa contre ${h.eur(salarieVls)} pour un salarié. En retard, le renouvellement monte à ${h.eur(retardEtu)}.</p>
${h.table(['Cursus', 'Timbres sur la durée'], [
  ['Master (2 ans)', h.eur(master)],
  ['Licence (3 ans)', h.eur(licence)],
  ['Licence puis master (5 ans)', h.eur(doctorat)],
], 'VLS-TS validé la première année, carte la deuxième, puis un renouvellement par an ; une carte pluriannuelle réduit le nombre de renouvellements', ['l', 'r'])}
<p>Ces totaux supposent un renouvellement chaque année. Avec une carte pluriannuelle couvrant la fin du cycle, l’étudiant paie moins de timbres. Le droit de visa payé au consulat, qui dépend du pays, n’est pas compris.</p>
<h2>Le programme de mobilité, une carte à part</h2>
<p>L’étudiant qui relève d’un programme de mobilité de l’Union européenne ou d’une convention entre établissements reçoit une carte « étudiant – programme de mobilité ». Elle coûte ${h.eur(mobilite)}, est valable un an si le programme dure moins de deux ans, et pour la durée du programme au-delà. Elle exige les mêmes ressources mensuelles et autorise aussi 964 heures de travail par an. ${h.src('sp_F35796', 'La fiche Programme de mobilité')} en donne les pièces.</p>
<h2>Travailler pendant ses études</h2>
<p>Le titre étudiant autorise une activité salariée de 964 heures par an, soit 60 % de la durée annuelle légale du travail, sans autorisation de travail. Le compteur démarre à la délivrance de la carte ou à la validation du VLS-TS : une carte délivrée le 1er septembre 2025 permet 964 heures jusqu’au 31 août 2026. L’employeur doit déclarer nominativement l’embauche à la préfecture au moins 2 jours ouvrables avant son début. Un contrat d’apprentissage validé par l’opérateur de compétences permet de dépasser ce plafond ; il suppose en principe un an de présence en France, sauf inscription en master. ${h.src('sp_F2713', 'La fiche sur le travail des étudiants')} et ${h.ext(LF.l5221, 'l’article L5221-9 du Code du travail')} encadrent ces règles. Les étudiants algériens relèvent d’un régime différent.</p>
<h2>Après le diplôme</h2>
<p>Avec un master ou un diplôme équivalent, trois voies s’ouvrent : la carte ${h.a('carte-recherche-emploi-creation-entreprise', 'recherche d’emploi ou création d’entreprise')}, à demander avant la fin de la carte étudiant ; la carte salarié avec une autorisation de travail ; ou la carte talent si le salaire atteint le seuil. Le ${h.a('changement-de-statut-etudiant-salarie', 'simulateur de changement de statut')} compare votre salaire aux seuils. Ce guide informe ; il ne remplace pas l’examen de votre dossier par la préfecture.</p>
`,
  },
  en: {
    slug: 'student-residence-permit',
    nav: 'Student residence permit',
    card: 'VLS-TS, one-year then multi-year card, monthly resources, work hours and the cost of each step.',
    title: 'Student Residence Permit 2026: Resources, Cost, Work Hours',
    description: 'Student residence permit France 2026: VLS-TS to validate within 3 months, resources required, reduced stamp rate, 964 work hours a year, multi-year card.',
    h1: 'Student residence permit in France: from visa to multi-year card',
    intro: 'Your first year runs on a long-stay visa that doubles as a permit; the student card only comes afterwards, with its own conditions.',
    resume: `A non-EU student arrives in France on a long-stay visa that serves as a residence permit (VLS-TS) marked "étudiant", valid for 4 months to 1 year, which must be validated online within 3 months of arrival, paying a ${eE(vlsEtu)} tax. After the first year, the student applies for a student card (carte de séjour étudiant), either for one year or multi-year for the rest of the degree, between 4 and 2 months before the visa ends. At every step, you must show resources of at least ${eE(R, 2)} a month, ${eE(R * 12)} over a year, and enrolment in a higher-education institution. The card costs ${eE(carteEtu)} at the reduced rate and each renewal ${eE(renEtu)}; filing late adds ${eE(T.retard_renouvellement)}. A two-year master's therefore costs ${eE(master)} in tax stamps, a three-year bachelor's ${eE(licence)}. The student permit allows 964 hours of paid work a year without a work authorisation, provided the employer declares the hire to the prefecture.`,
    faqs: [
      { q: 'Do I need a residence permit to study in France for less than a year?', a: 'No, if the consulate gave you a student VLS-TS: it counts as a residence permit for its whole length, 4 months to 1 year, as long as you validate it online within 3 months of arrival. For courses shorter than 4 months, the official page refers you to the France-Visas procedures for your country.' },
      { q: 'Can my parents provide the resources required for the student permit?', a: `Yes. The official page accepts support from a third party, with their ID and proof of regular transfers, or a sworn statement that payments reaching ${eE(R, 2)} a month will be made. A French government scholarship, a home-country grant, payslips or a sufficient bank balance are also accepted, each with its own proof.` },
      { q: 'How many hours may an international student work in France?', a: 'Up to 964 hours a year, 60% of the legal annual working time, with no work authorisation. The count starts when the card is issued or the VLS-TS validated. Beyond that, the employer must obtain an authorisation; otherwise the student risks having the permit withdrawn or its renewal refused.' },
      { q: 'Can a student permit holder register as a micro-entrepreneur?', a: 'No. The official page states that the student card does not allow you to be an auto-entrepreneur (micro-business). Salaried jobs remain possible within the hours allowed, once the employer has declared you to the prefecture. A business project is usually prepared after graduation, with the job-search or business-creation card.' },
      { q: 'What if the prefecture never answers my student card application?', a: 'Ninety days of silence count as an implicit refusal. You then have 2 months to appeal to the prefect (recours gracieux), to the Interior Minister (recours hiérarchique) or to the administrative court. While the file is pending, the online filing certificate proves you applied on time.' },
    ],
    body: (h) => `
<h2>Year one: the long-stay visa works as your permit</h2>
<p>The route starts at the consulate, not the prefecture. A student enrolled or pre-enrolled in a public or private higher-education institution, or a higher vocational training body, applies for a student VLS-TS. Nationals of 72 countries go through the Études en France platform when they pre-enrol; everyone else applies on France-Visas. Two groups skip the long-stay visa: a student who entered lawfully on a short-stay "student-entrance exam" visa and passed the exam, and someone who has been at school in France since at least age 16 and goes on to higher education. Both apply for their permit directly at the prefecture.</p>
<p>Once you land, the clock starts: the VLS-TS must be validated online within 3 months, with a ${h.eur(vlsEtu)} tax. Without validation your stay is not lawful and the visa no longer lets you re-enter the Schengen area after a trip. Arriving on ${h.date('2026-09-05')}, you must validate before ${h.date(vls.validationAvant)}. ${h.src('sp_F2231', 'The official student permit page')} covers this step.</p>
<h2>Resources: ${h.eur(R, 2)} a month, every step of the way</h2>
<p>The resources condition applies to the visa and to every card: at least ${h.eur(R, 2)} a month, assessed against your situation. It does not apply if you passed the entrance exam of an institution that has an agreement with the State. Over a ten-month academic year that is ${h.eur(R * 10)}; over twelve months, ${h.eur(R * 12)}. Accepted proof includes a scholarship certificate, your last three payslips, scheduled transfers from a sponsor, or a bank statement showing a sufficient balance. With several sources, each must be documented.</p>
${h.table(['Length of stay', 'Minimum resources'], [
  ['4 months', h.eur(R * 4)],
  ['9 months', h.eur(R * 9)],
  ['12 months', h.eur(R * 12)],
  ['24 months', h.eur(R * 24)],
], `Monthly amount of ${h.eur(R, 2)} set by page F2231 (checked 1 August 2026)`, ['l', 'r'])}
<h2>After a year: one-year or multi-year card</h2>
<p>When the VLS-TS is about to end, you apply for the card on ANEF, the online portal for foreign nationals, no earlier than 4 months and no later than 2 months before the visa expires. For a visa ending on ${h.date('2027-09-04')}, the window runs from ${h.date(ren.ouverture)} to ${h.date(ren.limite)}. A digital filing certificate is issued straight away.</p>
<p>After a year in France on a VLS-TS or temporary card, the prefecture may issue a multi-year student card covering the years left in your degree: someone who has completed the first year of a bachelor's receives a two-year card. You must then show that your studies are genuine and serious: attendance, results, degrees obtained, and an explanation if you changed course. Repeating one year per cycle does not, on its own, count against you. ${h.ext(LF.l422, 'Sections L422-1 to L422-3 of the CESEDA immigration code')} and ${h.ext(LF.r4222, 'section R422-2')} set out this permit.</p>
<h2>What a full degree costs</h2>
<p>Students pay the reduced rate, roughly half the standard one: ${h.eur(carteEtu)} for a first card instead of ${h.eur(T.normal.premiere)}, ${h.eur(renEtu)} for a renewal instead of ${h.eur(T.normal.renouvellement)}, and ${h.eur(vlsEtu)} to validate the visa against ${h.eur(salarieVls)} for an employee. Filed late, a renewal rises to ${h.eur(retardEtu)}.</p>
${h.table(['Degree', 'Stamps over the period'], [
  ['Master’s (2 years)', h.eur(master)],
  ['Bachelor’s (3 years)', h.eur(licence)],
  ['Bachelor’s then master’s (5 years)', h.eur(doctorat)],
], 'VLS-TS validated in year one, card in year two, then one renewal a year; a multi-year card means fewer renewals', ['l', 'r'])}
<p>These totals assume a renewal every year. With a multi-year card covering the end of the degree, you buy fewer stamps. The consulate visa fee, which depends on the country, is not included.</p>
<h2>Mobility programmes have their own card</h2>
<p>A student on an EU mobility programme or an inter-university agreement receives a "student – mobility programme" card. It costs ${h.eur(mobilite)}, lasts one year if the programme is shorter than two years and the length of the programme beyond that. It requires the same monthly resources and also allows 964 hours of work a year. ${h.src('sp_F35796', 'The official mobility-programme page')} lists the documents.</p>
<h2>Working while you study</h2>
<p>The student permit allows 964 hours of salaried work a year, 60% of the legal annual working time, with no work authorisation. The count starts when the card is issued or the VLS-TS validated: a card issued on 1 September 2025 allows 964 hours until 31 August 2026. The employer must send a named declaration to the prefecture at least 2 working days before you start. An apprenticeship contract approved by the skills operator (OPCO) lets you go beyond the cap; it normally requires a year in France, except for master's students. ${h.src('sp_F2713', 'The official page on student work')} and ${h.ext(LF.l5221, 'article L5221-9 of the Labour Code')} set these rules. Algerian students fall under a different regime, set by the Franco-Algerian agreement, and should check their own official page before taking a job.</p>
<h2>After graduating</h2>
<p>With a master's or equivalent, three routes open: the ${h.a('carte-recherche-emploi-creation-entreprise', 'job-search or business-creation card')}, to request before your student card ends; the employee card with a work authorisation; or the talent card if the salary meets the threshold. The ${h.a('changement-de-statut-etudiant-salarie', 'status-change calculator')} compares your salary with the thresholds. This guide is information; it does not replace the prefecture's review of your file.</p>
`,
  },
});
