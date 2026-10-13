import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { carteBleue } from '../../lib/engine/travail';
import { coutTitre, titreById } from '../../lib/engine/couts';
import { formatMoney } from '../../lib/format';

// Exemples : contrat de 12 mois (carte de 15 mois), 18 mois (21 mois), 36 mois (36 mois), 60 mois (48 mois).
const TL = P.talent;
const c12 = carteBleue(62000, 12), c18 = carteBleue(62000, 18), c36 = carteBleue(62000, 36), c60 = carteBleue(62000, 60), c5 = carteBleue(62000, 5);
const sous = carteBleue(57000, 24);
const prix = coutTitre('carte_bleue', 'premiere').total;
const vls = coutTitre('carte_bleue', 'vls').total;
const jours = titreById('carte_bleue').implicite_jours!;
const mensuel = TL.cbe / 12;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const LF = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771564/';

export default defineGuide({
  id: 'carte-bleue-europeenne',
  group: 'travail',
  order: 20,
  tool: 'talent',
  preset: 'cbe',
  related: ['passeport-talent', 'carte-talent-famille', 'taxe-employeur-salarie-etranger', 'carte-resident-longue-duree-ue', 'validation-vls-ts'],
  sources: ['sp_F16922', 'arrete_salaire_ref', 'sp_A18881'],
  fr: {
    slug: 'carte-bleue-europeenne',
    nav: 'Carte bleue européenne',
    card: 'Seuil de salaire, contrat minimum et durée de la carte calculée sur votre contrat.',
    title: 'Carte bleue européenne 2026 : salaire minimum et durée',
    description: 'Carte bleue européenne 2026 : salaire minimum brut annuel, diplôme ou expérience exigés, contrat de 6 mois, durée calculée sur votre contrat et délai légal.',
    h1: 'Carte bleue européenne : seuil de salaire et durée de la carte',
    intro: 'Le simulateur vérifie le salaire et la durée du contrat, puis calcule la durée de la carte qui vous serait délivrée.',
    resume: `La carte bleue européenne est une carte talent réservée aux emplois hautement qualifiés. Elle demande trois conditions : un diplôme sanctionnant au moins trois années d’études supérieures, ou cinq ans d’expérience professionnelle de niveau comparable ; un contrat de travail d’au moins ${TL.cbe_contrat_min_mois} mois ; une rémunération brute annuelle d’au moins ${eF(TL.cbe)}, soit une fois et demie le salaire de référence de ${eF(TL.salaire_ref)}. Ramené au mois sur douze mois, le seuil représente ${eF(mensuel, 2)} brut. La durée de la carte suit le contrat : un contrat de deux ans ou plus donne une carte de même durée, dans la limite de ${TL.duree_max_ans} ans ; un contrat plus court donne la durée du contrat plus trois mois, dans la limite de deux ans. Un contrat de 12 mois ouvre ainsi une carte de ${c12.dureeMois} mois, un contrat de 5 ans une carte de ${c60.dureeMois} mois. La carte coûte ${eF(prix)} en timbres fiscaux, et la préfecture qui ne répond pas sous ${jours} jours est réputée refuser.`,
    faqs: [
      { q: 'Quelle est la durée d’une carte bleue européenne pour un contrat de 18 mois ?', a: `${c18.dureeMois} mois. Pour un contrat de moins de deux ans, la carte couvre la durée du contrat augmentée de trois mois, sans dépasser deux ans. Un contrat de 36 mois donne une carte de ${c36.dureeMois} mois, et au-delà de quatre ans la carte plafonne à ${c60.dureeMois} mois. Le simulateur applique ces règles à la durée saisie.` },
      { q: 'Un diplôme étranger suffit-il pour la carte bleue européenne ?', a: 'Oui. Contrairement à la carte talent salarié qualifié, la carte bleue n’exige pas de diplôme français : il faut un diplôme sanctionnant au moins trois années d’études supérieures, ou cinq ans d’expérience professionnelle de niveau comparable et pertinente pour le poste. Pour certaines professions fixées par arrêté, trois ans d’expérience acquis dans les sept dernières années suffisent.' },
      { q: `Que se passe-t-il avec un salaire de ${eF(57000)} ?`, a: `Il manque ${eF(TL.cbe - 57000)} par an pour atteindre ${eF(TL.cbe)} : la carte bleue n’est pas accessible. Avec un master français, la carte talent salarié qualifié reste possible dès ${eF(TL.salaire_ref)}. Elle offre la même dispense d’autorisation de travail, mais pas la mobilité facilitée vers les autres États de l’Union européenne.` },
      { q: 'Peut-on venir en France avec une carte bleue obtenue dans un autre pays de l’Union ?', a: `Oui, après au moins un an de séjour dans cet autre pays avec une carte bleue européenne. La demande se fait dans le mois qui suit l’entrée en France, sans visa de long séjour. Dans ce cas, la préfecture qui ne répond pas sous 30 jours, au lieu de ${jours}, est réputée refuser la demande.` },
    ],
    body: (h) => `
<h2>Ce que le simulateur vérifie</h2>
<p>Il compare le salaire brut annuel au seuil de ${h.eur(TL.cbe)} publié sur ${h.src('sp_F16922', 'la fiche officielle de la carte talent')}, contrôle que le contrat dure au moins ${h.num(TL.cbe_contrat_min_mois)} mois et calcule la durée de la carte. Le seuil découle du salaire brut moyen de référence fixé par ${h.src('arrete_salaire_ref', 'l’arrêté du 21 août 2025')}, multiplié par ${h.num(TL.cbe_coef, 1)}. Avec un contrat de 5 mois, le résultat est négatif quel que soit le salaire (${c5.contratOk ? 'contrat accepté' : 'contrat trop court'}).</p>
${h.table(['Durée du contrat', 'Durée de la carte', 'Règle appliquée'], [
  ['12 mois', `${h.num(c12.dureeMois)} mois`, 'contrat + 3 mois, 2 ans au plus'],
  ['18 mois', `${h.num(c18.dureeMois)} mois`, 'contrat + 3 mois, 2 ans au plus'],
  ['36 mois', `${h.num(c36.dureeMois)} mois`, 'durée du contrat'],
  ['60 mois', `${h.num(c60.dureeMois)} mois`, `plafond de ${h.num(TL.duree_max_ans)} ans`],
], 'Durée de la carte bleue européenne selon le contrat', ['l', 'r', 'l'])}
<h2>Coût et démarche</h2>
<p>Depuis l’étranger, le consulat délivre un visa talent : pour un séjour de moins de douze mois, c’est un VLS-TS à valider dans les trois mois avec une taxe de ${h.eur(vls)} ; pour un an ou plus, un visa de trois mois suivi d’une demande de carte en ligne dans les deux mois de l’arrivée. La carte coûte ${h.eur(prix)} en timbres, barème fixé par ${h.src('sp_A18881', 'la hausse du 1er mai 2026')}. Un salaire de ${h.eur(57000)} sur un contrat de deux ans échoue sur le seul critère du salaire (${sous.salaireOk ? 'atteint' : 'non atteint'}). Les conditions sont celles des ${h.ext(LF, 'articles L421-7 à L421-25 du CESEDA')}.</p>
<h2>Après la carte bleue</h2>
<p>La famille suit avec ${h.a('carte-talent-famille', 'la carte talent-famille')}. Après cinq ans de séjour, la carte de résident de longue durée-UE devient accessible ; ${h.a('carte-resident-longue-duree-ue', 'sa page détaille les absences admises')}.</p>
`,
  },
  en: {
    slug: 'eu-blue-card-france',
    nav: 'EU Blue Card France',
    card: 'Salary threshold, minimum contract and card length worked out from your contract.',
    title: 'EU Blue Card France 2026: Salary Threshold and Card Length',
    description: 'EU Blue Card France 2026: minimum gross annual salary, degree or experience required, 6-month contract rule, card length from your contract, legal deadline.',
    h1: 'EU Blue Card in France: salary threshold and card length',
    intro: 'The calculator checks your salary and contract length, then works out how long the card you would receive lasts.',
    resume: `The EU Blue Card (carte bleue européenne) is a talent card for highly qualified jobs. It has three conditions: a degree after at least three years of higher education, or five years of professional experience at a comparable level; an employment contract of at least ${TL.cbe_contrat_min_mois} months; and gross annual pay of at least ${eE(TL.cbe)}, one and a half times the ${eE(TL.salaire_ref)} reference salary. Spread over twelve months, that is ${eE(mensuel, 2)} gross a month. The card follows the contract: a contract of two years or more gives a card of the same length, up to ${TL.duree_max_ans} years; a shorter contract gives its length plus three months, up to two years. A 12-month contract therefore opens a ${c12.dureeMois}-month card, a five-year contract a ${c60.dureeMois}-month card. The card costs ${eE(prix)} in tax stamps, and if the prefecture has not answered within ${jours} days the application counts as refused, which opens the right to appeal.`,
    faqs: [
      { q: 'How long is an EU Blue Card for an 18-month contract?', a: `${c18.dureeMois} months. For a contract under two years, the card covers the contract plus three months, never more than two years. A 36-month contract gives a ${c36.dureeMois}-month card, and beyond four years the card is capped at ${c60.dureeMois} months. The calculator applies these rules to the length you enter.` },
      { q: 'Can I get the EU Blue Card with a degree from outside France?', a: 'Yes. Unlike the skilled-employee talent card, the Blue Card does not require a French degree: you need a degree after at least three years of higher education, or five years of comparable professional experience relevant to the job. For certain professions listed by order, three years of experience gained within the last seven years are enough.' },
      { q: `What happens with a salary of ${eE(57000)}?`, a: `You are ${eE(TL.cbe - 57000)} a year short of ${eE(TL.cbe)}, so the Blue Card is out of reach. With a French master's degree, the skilled-employee talent card remains open from ${eE(TL.salaire_ref)}. It gives the same exemption from work authorisation, but not the easier move to other EU countries that the Blue Card offers.` },
      { q: 'Can I move to France with a Blue Card issued by another EU country?', a: `Yes, after at least one year in that country with an EU Blue Card. You apply within a month of entering France, with no long-stay visa. In that case, if the prefecture has not answered within 30 days rather than ${jours}, the application counts as refused.` },
    ],
    body: (h) => `
<h2>What the calculator checks</h2>
<p>It compares your gross annual salary with the ${h.eur(TL.cbe)} threshold on ${h.src('sp_F16922', 'the official talent card page')} (in French), checks that the contract runs at least ${h.num(TL.cbe_contrat_min_mois)} months and works out the card's length. The threshold derives from the reference average gross salary set by ${h.src('arrete_salaire_ref', 'the order of 21 August 2025')}, multiplied by ${h.num(TL.cbe_coef, 1)}. With a 5-month contract, the answer is no whatever the salary (${c5.contratOk ? 'contract accepted' : 'contract too short'}).</p>
${h.table(['Contract length', 'Card length', 'Rule applied'], [
  ['12 months', `${h.num(c12.dureeMois)} months`, 'contract + 3 months, 2 years max'],
  ['18 months', `${h.num(c18.dureeMois)} months`, 'contract + 3 months, 2 years max'],
  ['36 months', `${h.num(c36.dureeMois)} months`, 'length of the contract'],
  ['60 months', `${h.num(c60.dureeMois)} months`, `${h.num(TL.duree_max_ans)}-year cap`],
], 'EU Blue Card length by contract', ['l', 'r', 'l'])}
<h2>Cost and procedure</h2>
<p>From abroad, the consulate issues a talent visa: for a stay under twelve months it is a VLS-TS (a long-stay visa that serves as a permit), validated online within three months with a ${h.eur(vls)} tax; for a year or more, a three-month visa followed by an online card application within two months of arrival. The card costs ${h.eur(prix)} in tax stamps (timbres fiscaux), under ${h.src('sp_A18881', 'the 1 May 2026 fee schedule')}. A ${h.eur(57000)} salary on a two-year contract fails on salary alone (${sous.salaireOk ? 'met' : 'not met'}). The conditions are those of ${h.ext(LF, 'sections L421-7 to L421-25 of the CESEDA immigration code')}.</p>
<h2>After the Blue Card</h2>
<p>Your family follows with ${h.a('carte-talent-famille', 'the talent-family card')}. After five years of residence, the EU long-term resident card becomes available; ${h.a('carte-resident-longue-duree-ue', 'its page explains which absences are allowed')}.</p>
`,
  },
});
