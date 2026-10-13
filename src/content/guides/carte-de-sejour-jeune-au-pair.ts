import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { vlsTs, refusImplicite } from '../../lib/engine/dates-sejour';
import { addMonths } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

// Fiche F15813 (vérifiée le 1er mai 2026) : carte de séjour temporaire « jeune au pair ».
const POCHE = P.au_pair.argent_de_poche_min;
const vls = coutTitre('au_pair', 'vls').total;
const carte = coutTitre('au_pair', 'premiere').total;
const renouv = coutTitre('au_pair', 'renouvellement').total;
const deuxAns = vls + carte; // année 1 : VLS-TS validé ; année 2 : première carte (convention renouvelée)
const poche12 = POCHE * 12, poche24 = POCHE * 24;
// Exemple : arrivée le 1er septembre 2026 avec un VLS-TS d'un an.
const ARRIVEE = '2026-09-01';
const FIN_VISA = addMonths(ARRIVEE, 12);
const v = vlsTs(ARRIVEE, FIN_VISA);
const DEPOT = '2027-07-15';
const silence = refusImplicite(DEPOT, { jours: 90 })!; // « délai de 90 jours » (F15813)
const LF_L426_22 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771906/';
const LF_R426 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042801260/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'carte-de-sejour-jeune-au-pair',
  group: 'travail',
  order: 90,
  mini: 'aupair',
  miniHref: 'validation-vls-ts',
  related: ['validation-vls-ts', 'visa-long-sejour', 'titre-de-sejour-stagiaire', 'titre-de-sejour-etudiant', 'cout-titre-de-sejour'],
  sources: ['sp_F15813', 'sp_F16162', 'sp_A18881'],
  fr: {
    slug: 'carte-de-sejour-jeune-au-pair',
    nav: 'Carte jeune au pair',
    card: 'De 18 à 30 ans, convention avec la famille, argent de poche minimal, deux ans au plus en France.',
    title: 'Jeune au pair 2026 : carte de séjour, convention et timbres',
    description: 'Jeune au pair 2026 : conditions de 18 à 30 ans, convention avec la famille d’accueil, argent de poche minimal, 25 heures par semaine, timbres et durée.',
    h1: 'Carte de séjour jeune au pair : conditions, convention et coût',
    intro: 'Le jeune au pair non européen vit dans une famille française en échange de petits travaux et de la garde d’enfants : un VLS-TS d’abord, puis une carte d’un an.',
    resume: `La carte de séjour temporaire « jeune au pair » est ouverte à l’étranger non européen de 18 à 30 ans accueilli temporairement par une famille d’une autre nationalité, sans lien de parenté, pour améliorer son français et sa connaissance de la France en échange de petits travaux ménagers et de la garde d’enfants. Elle suppose une connaissance de base du français, ou un niveau d’études secondaires ou une qualification professionnelle, et une convention signée avec la famille avant le départ. Cette convention fixe l’argent de poche, au moins ${eF(POCHE)} par mois, soit ${eF(poche12)} sur un an, un maximum de 25 heures de tâches par semaine, une chambre d’au moins 9 m² avec fenêtre et un jour de repos hebdomadaire. Elle dure un an au plus et peut être renouvelée une fois, pour deux ans de séjour au total. Côté timbres, la validation du visa coûte ${eF(vls)} à l’arrivée, puis la première carte ${eF(carte)}, soit ${eF(deuxAns)} sur les deux ans. La préfecture a 90 jours pour répondre à une demande complète.`,
    faqs: [
      { q: 'Quel argent de poche minimum la famille d’accueil doit-elle verser ?', a: `Au moins ${eF(POCHE)} par mois, inscrits dans la convention signée avec la famille. Sur une année, cela représente ${eF(poche12)}, et ${eF(poche24)} sur deux ans, la durée maximale du séjour au pair. La convention précise aussi le logement et la nourriture fournis par la famille. Le mini-simulateur de la page multiplie ce minimum par le nombre de mois de séjour.` },
      { q: 'Combien d’heures un jeune au pair peut-il travailler par semaine ?', a: 'Vingt-cinq heures au maximum pour les tâches et la garde d’enfants prévues dans la convention, avec au moins un jour de repos par semaine. Le jeune au pair n’est pas autorisé à travailler à titre accessoire en dehors de ces tâches. Le temps restant est destiné à l’apprentissage du français et à la découverte du pays, ce qui est l’objet même du séjour.' },
      { q: 'Peut-on être jeune au pair dans la famille d’un oncle ou d’une tante ?', a: 'Non. La famille d’accueil doit être d’une nationalité différente de la vôtre et ne doit avoir aucun lien de parenté avec vous. La fiche officielle pose ces deux conditions ensemble, avec la limite d’âge de 18 à 30 ans et la convention signée avant le départ, indispensable pour obtenir le visa de long séjour.' },
      { q: 'Combien de temps peut durer un séjour au pair en France ?', a: `Deux ans au plus. La première convention dure un an au maximum ; une nouvelle convention d’un an au plus peut être conclue pour prolonger. La carte de séjour jeune au pair est valable un an au maximum et se renouvelle au cours des deux mois précédant sa fin, pour ${eF(renouv)} en timbres fiscaux.` },
      { q: 'Faut-il parler français avant de partir comme jeune au pair ?', a: 'Une connaissance de base du français suffit, et elle peut être remplacée par un parcours complet d’études secondaires ou une qualification professionnelle. Le dossier de carte comprend tout document qui l’atteste. Aucun niveau du cadre européen n’est exigé, contrairement à la carte pluriannuelle ou à la carte de résident.' },
    ],
    body: (h) => `
<h2>Les conditions, une par une</h2>
<ul>
<li><strong>Âge</strong> : entre 18 et 30 ans.</li>
<li><strong>Nationalité</strong> : hors Union européenne ; les Européens n’ont pas besoin de titre.</li>
<li><strong>Famille d’accueil</strong> : d’une nationalité différente de la vôtre, sans lien de parenté avec vous.</li>
<li><strong>Objet du séjour</strong> : améliorer vos compétences linguistiques et votre connaissance de la France, en échange de petits travaux ménagers et de la garde d’enfants.</li>
<li><strong>Langue ou formation</strong> : connaissance de base du français, ou études secondaires complètes, ou qualification professionnelle.</li>
<li><strong>Visa</strong> : un visa de long séjour obtenu avant l’arrivée ; sans lui, pas de carte jeune au pair.</li>
</ul>
<p>Le titre est prévu par ${h.ext(LF_L426_22, 'l’article L426-22 du CESEDA')} et précisé aux ${h.ext(LF_R426, 'articles R426-13 à R426-15')}.</p>
<h2>Ce que doit contenir la convention</h2>
<p>La convention se remplit sur un formulaire cerfa (n° 15973) et se signe avec la famille avant le départ, car le consulat la demande pour délivrer le visa. Elle définit les droits et obligations des deux parties.</p>
${h.table(['Point de la convention', 'Minimum ou maximum fixé'], [
  ['Argent de poche', `${h.eur(POCHE)} par mois au minimum`],
  ['Tâches et garde d’enfants', '25 heures par semaine au maximum'],
  ['Chambre', '9 m² habitables au minimum, avec au moins une fenêtre'],
  ['Repos', '1 jour par semaine au minimum'],
  ['Durée', '1 an au plus, renouvelable une fois'],
], 'Convention jeune au pair (fiche F15813)', ['l', 'l'])}
<p>Sur un séjour de douze mois, l’argent de poche minimal représente ${h.eur(poche12)} ; sur deux ans, ${h.eur(poche24)}. Le jeune au pair ne peut pas prendre d’autre emploi en dehors des tâches prévues dans la famille.</p>
<h2>Le calendrier : du visa à la carte</h2>
<p>Vous arrivez avec un visa de long séjour valant titre de séjour, qu’il faut valider en ligne dans les trois mois suivant l’arrivée, comme le prévoit ${h.src('sp_F16162', 'la fiche Visa de long séjour')}. Exemple : arrivé le ${h.date(ARRIVEE)} avec un visa qui expire le ${h.date(FIN_VISA)}, vous validez avant le ${h.date(v.validationAvant)} et payez ${h.eur(vls)}. Pour rester une deuxième année, il faut une nouvelle convention et une carte de séjour temporaire jeune au pair, demandée à la préfecture ou à la sous-préfecture du domicile dans les deux mois qui précèdent la fin du visa, ici à partir du ${h.date(v.carteLimite)}.</p>
<p>Le dossier comprend le visa, le passeport, un justificatif de domicile de moins de six mois, trois photos, la convention signée, la preuve du niveau de français ou d’études, la copie d’une pièce d’identité de chacun des parents de la famille et l’engagement à respecter les principes de la République. Un dossier complet donne un récépissé. La préfecture dispose de 90 jours, à partir du dépôt complet, pour décider : sans réponse, la demande est implicitement refusée. Pour un dépôt complet le ${h.date(DEPOT)}, ce délai expirerait le ${h.date(silence)}.</p>
<h2>Le coût en timbres</h2>
<p>Le jeune au pair bénéficie du tarif minoré du ${h.src('sp_A18881', 'barème en vigueur depuis le 1er mai 2026')}. La fiche officielle détaille les montants : ${h.eur(vls)} lors de la validation du visa à l’arrivée, puis ${h.eur(carte)} lors de la délivrance d’un premier titre de séjour. Le mini-simulateur en haut de page additionne ces timbres et l’argent de poche minimal selon la durée.</p>
${h.table(['Étape', 'Timbres fiscaux'], [
  ['Année 1 : validation du VLS-TS', h.eur(vls)],
  ['Année 2 : première carte jeune au pair', h.eur(carte)],
  ['Total sur deux ans', h.eur(deuxAns)],
], 'Jeune au pair, tarif minoré', ['l', 'r'])}
<h2>Renouveler la carte jeune au pair</h2>
<p>Pour poursuivre au-delà d’un an, il faut d’abord conclure une nouvelle convention avec la famille, d’une durée d’un an au plus. La demande de renouvellement se fait ensuite au cours des deux mois qui précèdent la fin de la carte, à la préfecture ou à la sous-préfecture du domicile, souvent sur rendez-vous. Le dossier reprend celui de la première demande : la carte en cours, le passeport ou une autre pièce d’identité avec photo, un justificatif de domicile de moins de six mois, trois photos, la nouvelle convention (cerfa n° 15973) signée par les deux parties, la preuve du niveau de français ou d’études, la copie d’une pièce d’identité de chacun des parents et l’engagement à respecter les principes de la République. Un dossier complet donne un récépissé. Les timbres s’élèvent à ${h.eur(renouv)} et ne sont demandés qu’à la remise de la carte. En tout état de cause, le séjour au pair ne dépasse jamais deux ans.</p>
<h2>Après le séjour au pair</h2>
<p>La carte jeune au pair est valable un an au plus et le séjour ne peut pas dépasser deux ans. Elle ne fait pas partie des cartes qui peuvent devenir pluriannuelles pour le même motif. Pour rester en France ensuite, il faut remplir les conditions d’un autre titre : des études dans un établissement français (${h.a('titre-de-sejour-etudiant', 'titre de séjour étudiant')}) ou un emploi, avec ses propres règles. Anticipez : la nouvelle demande doit être déposée avant l’expiration de la carte jeune au pair, et les pièces du nouveau motif, inscription ou autorisation de travail, demandent du temps. Référence : ${h.src('sp_F15813', 'la fiche Carte de séjour temporaire jeune au pair')}. Information générale, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'au-pair-residence-permit',
    nav: 'Au pair residence permit',
    card: 'Aged 18 to 30, an agreement with the host family, minimum pocket money, two years in France at most.',
    title: 'Au Pair Residence Permit 2026: Agreement, Pocket Money, Fees',
    description: 'Au pair permit in France 2026: ages 18 to 30, the agreement with the host family, minimum pocket money, 25 hours a week, tax stamps and the maximum length.',
    h1: 'Au pair residence card in France: conditions, agreement and cost',
    intro: 'A non-EU au pair lives with a French family in exchange for light housework and childcare: first a VLS-TS visa, then a one-year card.',
    resume: `The temporary "jeune au pair" residence card is open to non-EU nationals aged 18 to 30 hosted for a while by a family of a different nationality, with no family tie, to improve their French and their knowledge of France in exchange for light housework and childcare. You need a basic knowledge of French, or completed secondary education or a vocational qualification, and an agreement signed with the family before you leave. The agreement sets the pocket money, at least ${eE(POCHE)} a month, ${eE(poche12)} over a year, a maximum of 25 hours of duties a week, a bedroom of at least 9 m² with a window and one day off a week. It lasts one year at most and can be renewed once, for two years in France in total. In tax stamps (timbres fiscaux), validating the visa on arrival costs ${eE(vls)}, then the first card ${eE(carte)}, ${eE(deuxAns)} over the two years. The prefecture has 90 days to decide on a complete application.`,
    faqs: [
      { q: 'What is the minimum pocket money a host family must pay an au pair?', a: `At least ${eE(POCHE)} a month, written into the agreement signed with the family. Over a year that comes to ${eE(poche12)}, and ${eE(poche24)} over two years, the maximum length of an au pair stay. The agreement also states the housing and food the family provides. The mini-calculator on this page multiplies the minimum by your number of months.` },
      { q: 'How many hours a week can an au pair work in France?', a: 'Twenty-five hours at most for the household tasks and childcare set out in the agreement, with at least one day off each week. An au pair may not take any side job outside those duties. The rest of the time is meant for learning French and discovering the country, which is the whole purpose of the stay.' },
      { q: 'Can I be an au pair with my aunt’s or uncle’s family?', a: 'No. The host family must be of a different nationality from yours and must have no family relationship with you. The official page sets both conditions together, along with the 18 to 30 age range and the agreement signed before departure, which you need to obtain the long-stay visa.' },
      { q: 'How long can an au pair stay in France?', a: `Two years at most. The first agreement lasts one year at most; a new agreement of up to one year can be signed to extend the stay. The au pair card is valid for one year at most and is renewed during the two months before it ends, for ${eE(renouv)} in tax stamps.` },
      { q: 'Do I need to speak French before leaving as an au pair?', a: 'A basic knowledge of French is enough, and it can be replaced by completed secondary education or a vocational qualification. The card file includes any document showing this. No level on the European framework is required, unlike the multi-year card or the resident card.' },
    ],
    body: (h) => `
<h2>The conditions, one by one</h2>
<ul>
<li><strong>Age</strong>: between 18 and 30.</li>
<li><strong>Nationality</strong>: non-EU; EU citizens need no permit.</li>
<li><strong>Host family</strong>: of a different nationality from yours, with no family relationship.</li>
<li><strong>Purpose</strong>: to improve your language skills and knowledge of France, in exchange for light housework and childcare.</li>
<li><strong>Language or education</strong>: basic French, or completed secondary education, or a vocational qualification.</li>
<li><strong>Visa</strong>: a long-stay visa obtained before arrival; without it, there is no au pair card.</li>
</ul>
<p>The permit is provided for in ${h.ext(LF_L426_22, 'section L426-22 of the CESEDA')}, the French immigration code, with details in ${h.ext(LF_R426, 'sections R426-13 to R426-15')}.</p>
<h2>What the agreement must contain</h2>
<p>The agreement is filled in on an official form (cerfa no. 15973) and signed with the family before departure, because the consulate asks for it before issuing the visa. It sets out the rights and duties of both sides.</p>
${h.table(['Item in the agreement', 'Minimum or maximum'], [
  ['Pocket money', `at least ${h.eur(POCHE)} a month`],
  ['Duties and childcare', '25 hours a week at most'],
  ['Bedroom', 'at least 9 m² of living space, with a window'],
  ['Rest', 'at least 1 day a week'],
  ['Length', '1 year at most, renewable once'],
], 'Au pair agreement (page F15813)', ['l', 'l'])}
<p>Over a twelve-month stay, the minimum pocket money adds up to ${h.eur(poche12)}; over two years, ${h.eur(poche24)}. An au pair cannot take any other job besides the duties agreed with the family.</p>
<h2>The timetable: from visa to card</h2>
<p>You arrive with a long-stay visa that serves as a residence permit (VLS-TS), which must be validated online within three months of arrival, as ${h.src('sp_F16162', 'the official long-stay visa page')} states. Example: arriving on ${h.date(ARRIVEE)} with a visa expiring on ${h.date(FIN_VISA)}, you validate it by ${h.date(v.validationAvant)} and pay ${h.eur(vls)}. To stay a second year, you need a new agreement and a temporary au pair card, requested at the prefecture or sub-prefecture where you live within the two months before the visa ends, here from ${h.date(v.carteLimite)}.</p>
<p>The file includes the visa, your passport, proof of address under six months old, three photos, the signed agreement, proof of your French or education level, a copy of an identity document for each parent in the host family and the commitment to respect the principles of the Republic. A complete file gets you a receipt (récépissé). The prefecture has 90 days from a complete filing to decide: with no answer, the application counts as refused. For a complete filing on ${h.date(DEPOT)}, that period would end on ${h.date(silence)}.</p>
<h2>The cost in tax stamps</h2>
<p>Au pairs pay the reduced rate of ${h.src('sp_A18881', 'the schedule in force since 1 May 2026')}. The official page gives the amounts: ${h.eur(vls)} when the visa is validated on arrival, then ${h.eur(carte)} when the first residence card is issued. The mini-calculator at the top of the page adds up the stamps and minimum pocket money for your length of stay.</p>
${h.table(['Step', 'Tax stamps'], [
  ['Year 1: VLS-TS validation', h.eur(vls)],
  ['Year 2: first au pair card', h.eur(carte)],
  ['Total over two years', h.eur(deuxAns)],
], 'Au pair, reduced rate', ['l', 'r'])}
<h2>Renewing the au pair card</h2>
<p>To stay beyond one year, you first sign a new agreement with the family, for one year at most. The renewal is then requested during the two months before the card ends, at the prefecture or sub-prefecture where you live, often by appointment. The file repeats the first one: your current card, your passport or another photo identity document, proof of address under six months old, three photos, the new agreement (cerfa no. 15973) signed by both sides, proof of your French or education level, a copy of an identity document for each parent and the commitment to respect the principles of the Republic. A complete file gets you a receipt, which covers you while the prefecture decides. The stamps come to ${h.eur(renouv)} and are only requested when the card is handed over, so do not buy them in advance. Whatever happens, an au pair stay never goes beyond two years in total, so a renewal only makes sense within that limit.</p>
<h2>After the au pair stay</h2>
<p>The au pair card lasts one year at most and the stay cannot exceed two years. It is not one of the cards that can become a multi-year card on the same ground. To stay in France afterwards, you must meet the conditions of another permit: studies at a French institution (${h.a('titre-de-sejour-etudiant', 'student residence permit')}) or a job, each with its own rules. If you hope to study in France afterwards, plan it early: the new application has to go in before your au pair card expires, and the conditions of the new ground, such as enrolment or a work authorisation, take time to gather. Reference: ${h.src('sp_F15813', 'the official au pair card page')}. General information, not legal advice.</p>
`,
  },
});
