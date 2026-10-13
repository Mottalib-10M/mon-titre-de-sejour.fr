import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { pluriannuelleEligible, fenetreRenouvellement } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

// Valeurs par défaut du simulateur : carte salarié du 1er février 2026 au 31 janvier 2027.
const PL = P.pluriannuelle;
const elig = pluriannuelleEligible('2026-02-01');
const w = fenetreRenouvellement('2027-01-31', '2026-02-01');
const sal = coutTitre('salarie', 'renouvellement').total;
const salVls = coutTitre('salarie', 'premiere').total;
const etu = coutTitre('etudiant', 'renouvellement').total;
const L_L433 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771972/';
const L_L412 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000049055586/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'carte-de-sejour-pluriannuelle',
  group: 'titres',
  order: 30,
  tool: 'pluriannuelle',
  related: ['carte-de-resident', 'renouvellement-titre-de-sejour', 'niveau-de-francais-exige', 'examen-civique', 'titre-de-sejour'],
  sources: ['sp_F35799', 'sp_F34501', 'sp_F39530', 'sp_F17048', 'sp_F38329'],
  fr: {
    slug: 'carte-de-sejour-pluriannuelle',
    nav: 'Carte pluriannuelle',
    card: 'Quand la demander après la première année, A2, examen civique, CIR et timbres.',
    title: 'Carte de séjour pluriannuelle 2026 : quand la demander',
    description: 'Carte de séjour pluriannuelle 2026 : demande après la première année, 4 ans ou 2 ans selon le motif, français A2, examen civique, CIR, timbres et dates.',
    h1: 'Carte de séjour pluriannuelle : la date de votre demande',
    intro: 'Indiquez votre premier titre et sa date de fin : le simulateur donne la fenêtre de dépôt de la carte pluriannuelle et son coût.',
    resume: `La carte de séjour pluriannuelle ne se demande pas à l’arrivée : elle succède à un premier titre d’un an, visa long séjour valant titre de séjour ou carte temporaire, et porte en principe le même motif. Sa durée est de 4 ans dans le cas général (salarié, entrepreneur, famille venue par regroupement), au plus 2 ans pour le conjoint ou le parent d’un Français et pour les liens personnels et familiaux, et celle du cycle d’études pour un étudiant. Depuis le 1er janvier 2026, une première carte pluriannuelle exige le niveau ${PL.langue} en français et l’examen civique (${PL.examen_seuil} bonnes réponses sur ${PL.examen_questions}), sauf à partir de ${PL.age_exemption} ans, ainsi que le respect du contrat d’intégration républicaine. Avec une première carte salarié valable jusqu’au 31 janvier 2027, la demande se dépose entre le ${dF(w.ouverture)} et le ${dF(w.limite)}. Elle coûte ${eF(sal)} en timbres, ${eF(etu)} pour un étudiant ; après un VLS-TS, c’est une première carte à ${eF(salVls)}.`,
    faqs: [
      { q: 'Que se passe-t-il si l’on n’a pas réussi l’examen civique à temps ?', a: 'La préfecture ne délivre pas la carte pluriannuelle et renouvelle à la place une carte temporaire d’un an, si les autres conditions du motif sont remplies. La fiche du contrat d’intégration républicaine précise qu’après un contrat résilié, le titre annuel ne peut être renouvelé que trois fois. Passer l’examen tôt évite de dépendre de cette limite.' },
      { q: 'Peut-on changer de motif en passant à la carte pluriannuelle ?', a: 'Oui, dans le cas général : vous remplissez alors les conditions de la carte temporaire correspondant au nouveau motif. Exception : pour une carte pluriannuelle salarié ou entrepreneur, il faut déjà détenir une carte temporaire de ce motif. Les titulaires d’une carte visiteur, stagiaire, au pair ou travailleur temporaire n’y ont pas accès pour le même motif.' },
      { q: 'Le contrat d’engagement aux principes de la République est-il le même que le CIR ?', a: 'Non. Le contrat d’engagement à respecter les principes de la République se signe à chaque demande ou renouvellement de titre, sauf exceptions comme les Algériens. Le contrat d’intégration républicaine est signé avec l’OFII à l’arrivée, dure un an et prévoit une formation civique de 24 heures, plus une formation linguistique si le niveau A2 n’est pas atteint.' },
    ],
    body: (h) => `
<h2>Ce que calcule le simulateur</h2>
<p>Il prend la fin de validité de votre premier titre et en déduit la fenêtre de dépôt : au plus tôt ${h.num(P.renouvellement.au_plus_tot_mois)} mois, au plus tard ${h.num(P.renouvellement.au_plus_tard_mois)} mois avant l’expiration. Il vérifie que la première année de séjour est atteinte (le ${h.date(elig)} pour un titre débutant le 1er février 2026) et affiche les timbres dus pour le motif choisi. Pour un VLS-TS, la carte pluriannuelle est la première carte de séjour et se paie au tarif de première délivrance.</p>
${h.table(['Motif de la carte', 'Durée de la carte pluriannuelle', 'Timbres'], [
  ['Salarié, entrepreneur', '4 ans', h.eur(sal)],
  ['Famille venue par regroupement familial', '4 ans', h.eur(coutTitre('regroupement', 'renouvellement').total)],
  ['Conjoint ou parent de Français, liens familiaux', '2 ans au plus', h.eur(coutTitre('vpf_conjoint', 'renouvellement').total)],
  ['Étudiant', 'durée du cycle, de 12 mois à 4 ans', h.eur(etu)],
], 'Durées de la fiche F35799, timbres du barème du 1er mai 2026 (renouvellement d’une carte temporaire)', ['l', 'l', 'r'])}
<h2>Trois preuves à réunir avant le dépôt</h2>
<p>D’abord l’attestation de niveau ${PL.langue} : test TCF ou TEF de moins de deux ans, diplôme DELF ou équivalent, ou diplôme français de niveau 3 ; les diplômes étrangers ne comptent pas. Ensuite l’attestation de réussite à l’examen civique mention « carte de séjour pluriannuelle », sans durée de validité, à passer dans un centre agréé. Enfin la preuve de votre assiduité aux formations du contrat d’intégration républicaine. Le contrat d’engagement aux principes de la République est signé au dépôt. Ces règles viennent de ${h.ext(L_L433, 'l’article L433-1 et suivants du CESEDA')} et de ${h.ext(L_L412, 'l’article L412-7')}, résumées par ${h.src('sp_F35799', 'la fiche Carte de séjour pluriannuelle')} et ${h.src('sp_F34501', 'la fiche sur le niveau de français')}.</p>
<h2>Limites</h2>
<p>Le simulateur ne vérifie pas les conditions propres au motif (contrat de travail, communauté de vie, ressources). Il ne connaît pas non plus le délai d’instruction de votre préfecture, qu’aucune source officielle ne publie. ${h.a('examen-civique', 'La page Examen civique')} décrit l’épreuve.</p>
`,
  },
  en: {
    slug: 'multi-year-residence-permit',
    nav: 'Multi-year card',
    card: 'When to apply after year one, A2 French, civic exam, CIR and stamps.',
    title: 'Multi-Year Residence Permit 2026: When and How to Apply',
    description: 'Multi-year residence card in France 2026: apply after the first year, 4 or 2 years depending on the ground, A2 French, civic exam, CIR, stamps and dates.',
    h1: 'Multi-year residence card: the date of your application',
    intro: 'Enter your first permit and its expiry: the calculator gives the filing window for the multi-year card and what it costs.',
    resume: `The carte de séjour pluriannuelle (multi-year card) is not issued on arrival: it follows a first one-year permit, either a long-stay visa that serves as a permit (VLS-TS) or a temporary card, and normally keeps the same ground. It lasts 4 years in the general case (employee, self-employed, family admitted by reunification), at most 2 years for the spouse or parent of a French national and for personal and family ties, and the length of the course for a student. Since 1 January 2026, a first multi-year card requires ${PL.langue}-level French and the civic exam (${PL.examen_seuil} correct answers out of ${PL.examen_questions}), unless you are ${PL.age_exemption} or over, plus compliance with the republican integration contract (CIR). With a first employee card valid until 31 January 2027, you file between ${dE(w.ouverture)} and ${dE(w.limite)}. It costs ${eE(sal)} in tax stamps, ${eE(etu)} for a student; after a VLS-TS it counts as a first card at ${eE(salVls)}.`,
    faqs: [
      { q: 'What happens if I have not passed the civic exam in time?', a: 'The prefecture does not issue the multi-year card and renews a one-year temporary card instead, provided the other conditions of your ground are met. The official integration-contract page adds that once a contract is terminated, the annual permit can only be renewed three times. Sitting the exam early avoids depending on that limit.' },
      { q: 'Can I change ground when moving to the multi-year card?', a: 'Yes, as a rule: you then meet the conditions of the temporary card for the new ground. The exception is the employee or self-employed multi-year card, which requires already holding a temporary card on that ground. Holders of a visitor, trainee, au pair or temporary-worker card cannot get a multi-year card on the same ground.' },
      { q: 'Is the commitment to the principles of the Republic the same as the CIR?', a: 'No. The contract committing you to the principles of the Republic is signed with every permit application or renewal, with exceptions such as Algerian nationals. The republican integration contract is signed with OFII on arrival, lasts one year and includes 24 hours of civic training, plus French lessons if you are below A2.' },
    ],
    body: (h) => `
<h2>What the calculator works out</h2>
<p>It takes your first permit's expiry date and derives the filing window: at the earliest ${h.num(P.renouvellement.au_plus_tot_mois)} months, at the latest ${h.num(P.renouvellement.au_plus_tard_mois)} months before expiry. It checks that the first year of residence has been reached (${h.date(elig)} for a permit starting on 1 February 2026) and shows the stamps due for the ground chosen. After a VLS-TS, the multi-year card is your first residence card and is charged at the first-issue rate.</p>
${h.table(['Ground of the card', 'Length of the multi-year card', 'Stamps'], [
  ['Employee, self-employed', '4 years', h.eur(sal)],
  ['Family admitted through reunification', '4 years', h.eur(coutTitre('regroupement', 'renouvellement').total)],
  ['Spouse or parent of a French national, family ties', 'up to 2 years', h.eur(coutTitre('vpf_conjoint', 'renouvellement').total)],
  ['Student', 'length of the course, 12 months to 4 years', h.eur(etu)],
], 'Lengths from page F35799, stamps from the 1 May 2026 schedule (renewal of a temporary card)', ['l', 'l', 'r'])}
<h2>Three proofs to gather before filing</h2>
<p>First, proof of ${PL.langue} French: a TCF or TEF test under two years old, a DELF-type diploma or a French qualification at level 3; foreign diplomas do not count. Second, the pass certificate for the civic exam ("carte de séjour pluriannuelle" version), which never expires and is taken at an approved centre. Third, proof that you attended the training sessions of the integration contract. The commitment to the principles of the Republic is signed when you file. These rules come from ${h.ext(L_L433, 'article L433-1 onwards of the CESEDA')} and ${h.ext(L_L412, 'article L412-7')}, summarised on ${h.src('sp_F35799', 'the official multi-year card page')} and ${h.src('sp_F34501', 'the page on French-language requirements')}.</p>
<h2>Limits</h2>
<p>The calculator does not check the conditions specific to your ground (employment contract, shared life, income). Nor does it know your prefecture's processing time, which no official source publishes. ${h.a('examen-civique', 'The civic exam page')} describes the test.</p>
`,
  },
});
