import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { naturalisation, dixAnsA } from '../../lib/engine/dates-sejour';
import { timbreNationalite } from '../../lib/engine/couts';
import { formatMoney, displayDate } from '../../lib/format';

// Valeurs par défaut du calculateur : résidence depuis le 1er septembre 2021, cas général, récépissé du 2 novembre 2026.
const N = P.naturalisation;
const def = naturalisation({ debut: '2021-09-01', cas: 'general', naissance: '1992-04-10', recepisse: '2026-11-02' });
const dip = naturalisation({ debut: '2024-10-01', cas: 'diplome' });
const ref = naturalisation({ debut: '2025-03-10', cas: 'dispense' });
const jeune = naturalisation({ debut: '2015-01-01', cas: 'general', naissance: '2010-05-20' });
const ancien = naturalisation({ debut: '2014-01-01', cas: 'general', recepisse: '2026-02-15', dixAns: dixAnsA('2014-01-01', '2026-02-15') });
const LF = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070721/LEGISCTA000006165459';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'naturalisation-francaise',
  group: 'nationalite',
  order: 10,
  tool: 'naturalisation',
  related: ['dossier-naturalisation', 'delai-naturalisation', 'nationalite-par-mariage', 'niveau-de-francais-exige', 'examen-civique'],
  sources: ['sp_F2213', 'cciv_21_14', 'decret_93_1362', 'sp_F11926', 'sp_F39426'],
  fr: {
    slug: 'naturalisation-francaise',
    nav: 'Naturalisation : date de dépôt',
    card: 'La date à partir de laquelle déposer et le délai légal de réponse, depuis votre arrivée.',
    title: 'Naturalisation française 2026 : date de dépôt et délai légal',
    description: 'Naturalisation française 2026 : à partir de quand déposer (5 ans, 2 ans après un diplôme, réfugié), âge minimal, délai légal de réponse de 18 ou 12 mois.',
    h1: 'Naturalisation française : à partir de quand déposer votre demande',
    intro: 'Indiquez le début de votre résidence régulière et votre situation : le simulateur donne la date de dépôt possible et la date limite de réponse.',
    resume: `La naturalisation par décret exige ${N.residence_ans} ans de résidence en France au jour du dépôt, comptés de date à date à partir du début du séjour régulier. Arrivé le 1er septembre 2021, vous pouvez déposer à partir du ${dF(def.eligible)}. La durée tombe à ${N.reduite_ans} ans si vous avez obtenu un diplôme d’un établissement français d’enseignement supérieur après deux années d’études, ou si vous avez rendu ou pouvez rendre des services importants à la France ; elle disparaît pour un réfugié et pour la personne d’un pays francophone dont le français est la langue maternelle. Il faut avoir ${N.age_min} ans, mais le dossier peut partir dès ${N.depot_age} ans. Une fois le récépissé de dossier complet remis, l’administration a ${N.delai_mois} mois pour répondre, ${N.delai_10ans_mois} mois si vous résidez en France depuis au moins dix ans, avec une seule prolongation motivée de ${N.prolongation_mois} mois. Le timbre fiscal coûte ${eF(timbreNationalite())}, ${eF(timbreNationalite(true), 2)} en Guyane. La décision reste discrétionnaire : remplir la durée ouvre le droit de demander, pas celui d’obtenir.`,
    faqs: [
      { q: 'La durée de cinq ans se compte-t-elle jusqu’au dépôt ou jusqu’au décret ?', a: `Jusqu’au dépôt de la demande : c’est à cette date que la fiche officielle apprécie les ${N.residence_ans} ans. Le simulateur ajoute donc la durée à la date de début de votre résidence régulière. En revanche, vous devez toujours résider en France, centre de vos intérêts matériels et familiaux, au moment où le décret est signé.` },
      { q: 'Quel diplôme permet de réduire la durée à deux ans ?', a: `Un diplôme délivré par un établissement d’enseignement supérieur français, obtenu après deux années d’études dans cet établissement. Une licence obtenue après deux ans d’études en France le permet ; un diplôme étranger, même reconnu, ne le permet pas. Commencées le 1er octobre 2024, ces deux années ouvrent la demande le ${dF(dip.eligible)} si le diplôme est obtenu.` },
      { q: 'Peut-on déposer avant ses dix-huit ans ?', a: `Oui, dès ${N.depot_age} ans, à condition de remplir aussi la durée de résidence ; la nationalité ne peut toutefois être accordée qu’à partir de ${N.age_min} ans. Né le 20 mai 2010 et résidant en France depuis 2015, un jeune peut envoyer son dossier à partir du ${dF(jeune.depotDes)}. Le simulateur retient la plus tardive des deux dates.` },
      { q: 'Quand le délai de réponse passe-t-il à douze mois ?', a: `Quand vous justifiez d’une résidence habituelle en France d’au moins dix ans à la date du récépissé. Installé depuis le 1er janvier 2014, un demandeur dont le récépissé date du 15 février 2026 doit recevoir une réponse avant le ${dF(ancien.delaiReponse!)}, au lieu de ${N.delai_mois} mois dans le cas général. La prolongation de ${N.prolongation_mois} mois reste possible, avec une décision motivée.` },
    ],
    body: (h) => `
<h2>Ce que calcule le simulateur</h2>
<p>Il prend la date de début de votre résidence régulière, celle de votre premier titre ou de votre visa de long séjour, et y ajoute la durée qui correspond à votre cas. Il compare cette date à celle de vos ${N.depot_age} ans et retient la plus tardive : c’est le premier jour où un dossier peut être déposé. Si vous indiquez la date du récépissé, il ajoute le délai légal de réponse (${N.delai_mois} mois, ou ${N.delai_10ans_mois} mois si vous avez dix ans de résidence à cette date) et la date maximale avec la prolongation motivée de ${N.prolongation_mois} mois. Ces règles viennent de ${h.src('sp_F2213', 'la fiche Naturalisation française par décret')} et des ${h.ext(LF, 'articles 21-14-1 à 21-25-1 du Code civil')}.</p>
${h.table(['Situation', 'Début de résidence', 'Durée', 'Dépôt possible'], [
  ['Cas général', h.date('2021-09-01'), `${h.num(N.residence_ans)} ans`, h.date(def.eligible)],
  ['Diplôme du supérieur en France', h.date('2024-10-01'), `${h.num(N.reduite_ans)} ans`, h.date(dip.eligible)],
  ['Réfugié', h.date('2025-03-10'), 'aucune', h.date(ref.eligible)],
], 'Exemples calculés par le simulateur', ['l', 'r', 'r', 'r'])}
<h2>Les autres conditions, que la date ne remplace pas</h2>
<p>La durée n’est qu’une condition parmi d’autres. Vous devez détenir un titre de séjour en cours de validité au dépôt (sauf ressortissant européen ou suisse), justifier d’un niveau ${N.langue} en français à l’oral et à l’écrit, réussir l’examen civique (${h.num(N.examen_seuil)} bonnes réponses sur ${h.num(N.examen_questions)}) et passer un entretien d’assimilation en préfecture. L’insertion professionnelle compte : des revenus stables et suffisants pour le foyer fiscal. Une condamnation à six mois de prison ferme ou plus, sauf réhabilitation, ferme la porte. Voir ${h.a('niveau-de-francais-exige', 'le niveau de français exigé')} et ${h.a('examen-civique', 'l’examen civique')}.</p>
<h2>Limites</h2>
<p>Le simulateur ne vérifie ni la continuité de votre résidence ni le centre de vos intérêts : une famille restée à l’étranger peut motiver un refus. Il ne connaît pas non plus les délais réels des plateformes de naturalisation, qu’aucune source officielle ne publie. Information, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'french-naturalisation-eligibility',
    nav: 'Naturalisation: filing date',
    card: 'The date you can apply from and the legal response deadline, counted from your arrival.',
    title: 'Naturalisation France 2026: When to Apply, Legal Deadline',
    description: 'Naturalisation in France 2026: when you can apply (5 years, 2 after a French degree, refugees), minimum age, and the 18- or 12-month legal response deadline.',
    h1: 'Naturalisation in France: from when you can apply',
    intro: 'Enter the start of your lawful residence and your situation: the calculator gives the earliest filing date and the date by which you must get an answer.',
    resume: `Naturalisation by decree requires ${N.residence_ans} years of residence in France on the day you apply, counted date to date from the start of your lawful stay. If you arrived on 1 September 2021, you can apply from ${dE(def.eligible)}. The period drops to ${N.reduite_ans} years if you earned a degree from a French higher-education institution after two years of study there, or have rendered or can render important services to France; it disappears for refugees and for people from a French-speaking country whose mother tongue is French. You must be ${N.age_min} to be naturalised, but the file can be sent from age ${N.depot_age}. Once you receive the receipt (récépissé) confirming a complete file, the administration has ${N.delai_mois} months to answer, or ${N.delai_10ans_mois} months if you have lived in France for at least ten years, with a single reasoned extension of ${N.prolongation_mois} months. The tax stamp costs ${eE(timbreNationalite())}, ${eE(timbreNationalite(true), 2)} in French Guiana. The decision remains discretionary: meeting the residence period gives you the right to ask, not the right to obtain.`,
    faqs: [
      { q: 'Are the five years counted to the filing date or to the decree?', a: `To the filing date: that is when the official guidance assesses the ${N.residence_ans} years, so the calculator adds the period to the start of your lawful residence. You must still be living in France, with your work and family life centred here, on the day the naturalisation decree is signed.` },
      { q: 'Which degree cuts the residence period to two years?', a: `A degree awarded by a French higher-education institution after two years of study at that institution. A bachelor’s degree (licence) earned after two years in France counts; a foreign degree, even recognised, does not. Two years begun on 1 October 2024 open the application on ${dE(dip.eligible)}, provided the degree is awarded.` },
      { q: 'Can a teenager apply before turning eighteen?', a: `Yes, from age ${N.depot_age}, provided the residence period is also met; citizenship itself can only be granted from ${N.age_min}. A young person born on 20 May 2010 and living in France since 2015 can send the file from ${dE(jeune.depotDes)}. The calculator keeps the later of the two dates.` },
      { q: 'When does the response deadline drop to twelve months?', a: `When you show at least ten years of habitual residence in France on the receipt date. Someone settled since 1 January 2014 whose receipt is dated 15 February 2026 must receive an answer by ${dE(ancien.delaiReponse!)}, rather than after ${N.delai_mois} months as in the general case. The ${N.prolongation_mois}-month extension remains possible, with a reasoned decision.` },
    ],
    body: (h) => `
<h2>What the calculator works out</h2>
<p>It takes the date your lawful residence began, meaning your first residence permit or long-stay visa, and adds the period that applies to your case. It compares that date with your ${N.depot_age}th birthday and keeps the later one: the first day a file can be sent. If you enter the receipt date, it adds the legal response deadline (${N.delai_mois} months, or ${N.delai_10ans_mois} months with ten years of residence on that date) and the latest date including the reasoned ${N.prolongation_mois}-month extension. These rules come from ${h.src('sp_F2213', 'the official naturalisation-by-decree page')} and ${h.ext(LF, 'articles 21-14-1 to 21-25-1 of the Civil Code')}.</p>
${h.table(['Situation', 'Residence began', 'Period', 'Can apply from'], [
  ['General case', h.date('2021-09-01'), `${h.num(N.residence_ans)} years`, h.date(def.eligible)],
  ['French higher-education degree', h.date('2024-10-01'), `${h.num(N.reduite_ans)} years`, h.date(dip.eligible)],
  ['Refugee', h.date('2025-03-10'), 'none', h.date(ref.eligible)],
], 'Examples worked out by the calculator', ['l', 'r', 'r', 'r'])}
<h2>The other conditions a date cannot replace</h2>
<p>The residence period is only one condition. You need a valid residence permit when you apply (EU and Swiss nationals excepted), ${N.langue}-level French, spoken and written, a pass in the civic exam (${h.num(N.examen_seuil)} correct answers out of ${h.num(N.examen_questions)}) and an assimilation interview at the prefecture. Professional integration matters: stable income sufficient for your tax household. A sentence of six months or more in prison without suspension, unless rehabilitated, rules you out. See ${h.a('niveau-de-francais-exige', 'the French level required')} and ${h.a('examen-civique', 'the civic exam')}.</p>
<h2>Limits</h2>
<p>The calculator does not check whether your residence was continuous or where your life is centred: a spouse and children still living abroad can justify a refusal. Nor does it know the actual processing times of the naturalisation platforms, which no official source publishes. This is information, not legal advice.</p>
`,
  },
});
