import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { refusImplicite } from '../../lib/engine/dates-sejour';
import { regroupementDes } from '../../lib/engine/famille';
import { addMonths, monthsBetween } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

// Exemple : carte talent du conjoint valable jusqu’au 31 août 2029, arrivée de la famille le 10 novembre 2026.
const finTalent = '2029-08-31';
const arrivee = '2026-11-10';
const depotAvant = addMonths(arrivee, 2);
const implicite = refusImplicite(arrivee, { mois: coutTitreMois() })!;
function coutTitreMois() { return P.titres.find((t) => t.id === 'talent_famille')!.implicite_mois!; }
const dureeMois = monthsBetween(arrivee, finTalent);
const tf = coutTitre('talent_famille', 'premiere').total;
// Comparaison : la même famille par le regroupement familial, demandeur arrivé en même temps.
const rfDes = regroupementDes(arrivee);
const rfCout = coutTitre('regroupement', 'vls').total + coutTitre('regroupement', 'premiere').total;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');
const L421 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771610';

export default defineGuide({
  id: 'carte-talent-famille',
  group: 'famille',
  order: 70,
  mini: 'talentfamille',
  miniHref: 'passeport-talent',
  related: ['passeport-talent', 'carte-bleue-europeenne', 'salarie-detache-ict', 'regroupement-familial', 'procedure-regroupement-familial'],
  sources: ['sp_F35792', 'sp_F35308', 'sp_F16922'],
  fr: {
    slug: 'carte-talent-famille',
    nav: 'Carte talent-famille',
    card: 'La famille du titulaire d’une carte talent : sans regroupement familial, avec le droit de travailler.',
    title: 'Talent-famille 2026 : carte du conjoint, durée, coût, délais',
    description: 'Carte talent-famille 2026 : conjoint et enfants d’un titulaire de carte talent ou carte bleue, famille accompagnante, droit au travail, durée et timbres.',
    h1: 'Carte talent-famille : la famille qui accompagne un talent',
    intro: 'Le conjoint et les enfants d’un titulaire de carte talent ne passent pas par le regroupement familial : voici la procédure simplifiée, son coût et ses délais.',
    resume: `La carte de séjour pluriannuelle « talent-famille » est délivrée au conjoint majeur et aux enfants du titulaire d’une carte talent (salarié qualifié, carte bleue européenne, chercheur, porteur de projet, profession artistique…), par la procédure simplifiée dite de la famille accompagnante, sans passer par le regroupement familial. Elle autorise toute activité professionnelle : l’employeur du conjoint n’a pas d’autorisation de travail à demander et ne paie pas la taxe sur l’emploi d’un étranger. Sa durée est celle qui reste à courir sur la carte talent : pour une famille arrivée le ${dF(arrivee)} auprès d’un titulaire dont la carte expire le ${dF(finTalent)}, environ ${dureeMois} mois. Chaque carte coûte ${eF(tf)} en timbres fiscaux. Avec un visa de long séjour, la demande se dépose en ligne dans les deux mois de l’entrée, ici avant le ${dF(depotAvant)} ; sans réponse en ${coutTitreMois()} mois, le refus est implicite. Par le regroupement familial, la même famille n’aurait pu être demandée qu’à partir du ${dF(rfDes)}.`,
    faqs: [
      { q: 'Qui peut obtenir la carte talent-famille ?', a: 'Le conjoint de plus de 18 ans marié au titulaire d’une carte talent ; l’enfant du couple devenu majeur et entré en France mineur ; l’enfant de 16 à 18 ans qui veut travailler. Les enfants mineurs n’ont pas besoin de titre. La famille d’un titulaire de carte bleue européenne qui vivait dans un autre État de l’Union demande la carte dans le mois de son entrée.' },
      { q: 'Combien de temps la carte talent-famille est-elle valable ?', a: 'Aussi longtemps que la carte talent du conjoint ou du parent : sa durée est la période de validité qui reste à courir sur ce titre. Si le titulaire de la carte talent la renouvelle, la famille renouvelle la sienne. Après cinq ans de résidence en France avec une carte talent-famille, le renouvellement ne peut plus être refusé et il est accordé pour quatre ans.' },
      { q: 'Le conjoint peut-il travailler dès son arrivée ?', a: 'Oui. La carte talent-famille autorise une activité salariée comme non salariée. L’employeur n’a pas à demander d’autorisation de travail pour le conjoint et il est exonéré de la taxe due pour l’emploi d’un salarié étranger, contrairement à l’embauche d’un étranger sous carte salarié. C’est l’un des principaux avantages de cette carte.' },
      { q: 'La famille peut-elle arriver après le titulaire de la carte talent ?', a: 'Oui. La procédure de famille accompagnante s’applique même si la famille rejoint le titulaire plus tard, ou si le mariage a lieu après son arrivée en France, comme le précise la fiche officielle pour les titulaires d’une carte ICT. La famille demande un visa de long séjour au consulat, puis la carte en ligne une fois en France.' },
      { q: 'Combien coûte la carte talent-famille pour toute la famille ?', a: `Chaque bénéficiaire paie ${eF(tf)} en timbres fiscaux : ${eF(P.tarifs.normal.taxe_premiere)} de taxe et ${eF(P.tarifs.droit_timbre)} de droit de timbre. Un conjoint et un enfant majeur paient ${eF(tf * 2)} ; les enfants mineurs, sans titre, ne paient rien. Le droit de visa réglé au consulat avant le départ s’ajoute, selon le pays de résidence.` },
      { q: 'Que se passe-t-il si la préfecture ne répond pas ?', a: `Sans réponse au bout de ${coutTitreMois()} mois, la demande est implicitement refusée. Vous disposez alors de deux mois pour un recours gracieux auprès du préfet, hiérarchique auprès du ministre de l’Intérieur, ou contentieux devant le tribunal administratif, sans obligation d’avocat. Si votre récépissé expire avant la décision, il peut être renouvelé.` },
    ],
    body: (h) => `
<h2>La procédure de la famille accompagnante</h2>
<p>${h.src('sp_F35308', 'La fiche Service-Public.fr sur la procédure simplifiée')} explique le principe : la « famille accompagnante » comprend l’époux ou l’épouse et les enfants mineurs du titulaire d’une carte talent. Elle peut venir en France pour la durée de son séjour sans faire la demande de regroupement familial. Le conjoint et les enfants majeurs reçoivent une carte pluriannuelle talent-famille ; les enfants mineurs sont dispensés de titre jusqu’à leur majorité. La même logique vaut pour la famille d’un titulaire de carte ICT (salarié détaché ou stagiaire d’un groupe, ${h.a('salarie-detache-ict', 'page dédiée')}) et pour celle d’un Algérien titulaire d’un certificat de résidence mention scientifique. Le fondement est aux ${h.ext(L421, 'articles L421-22 à L421-25 du CESEDA')}.</p>
<p>${h.src('sp_F35792', 'La fiche de la carte talent-famille')} précise les bénéficiaires : le conjoint de plus de 18 ans marié au titulaire ; l’enfant du couple entré mineur et devenu majeur ; l’enfant de 16 à 18 ans qui souhaite travailler. La famille d’un titulaire de carte bleue européenne qui vivait déjà dans un autre État membre de l’Union peut demander la carte dans le mois qui suit son entrée en France.</p>
<h2>Les dates et le coût</h2>
${h.table(['Étape', 'Date dans l’exemple'], [
  ['Arrivée de la famille avec un visa de long séjour', h.date(arrivee)],
  ['Demande de carte en ligne, au plus tard', h.date(depotAvant)],
  [`Refus implicite si aucune réponse (${coutTitreMois()} mois)`, h.date(implicite)],
  ['Fin de la carte talent du titulaire, et de la carte talent-famille', h.date(finTalent)],
], 'Calendrier type d’une famille accompagnante', ['l', 'r'])}
<p>La famille qui réside à l’étranger demande d’abord un visa au consulat de France, puis la carte en ligne sur l’ANEF une fois en France, dans les deux mois de l’entrée. Celle qui est déjà en France avec un VLS-TS ou un titre dépose sa demande au plus tôt ${h.num(P.renouvellement.au_plus_tot_mois)} mois et au plus tard ${h.num(P.renouvellement.au_plus_tard_mois)} mois avant la fin de son document. Chaque carte coûte ${h.eur(tf)} en timbres fiscaux (taxe de ${h.eur(P.tarifs.normal.taxe_premiere)} et droit de timbre de ${h.eur(P.tarifs.droit_timbre)}), réglés à la remise. Pour un conjoint et un enfant devenu majeur, la famille paie donc ${h.eur(tf * 2)}.</p>
<h2>Talent-famille ou regroupement familial : ce qui change</h2>
<p>Le regroupement familial impose dix-huit mois de séjour avant de déposer la demande, l’instruction des ressources et du logement par le maire, puis la décision du préfet. Pour un étranger arrivé le ${h.date(arrivee)}, la demande ne serait possible qu’à partir du ${h.date(rfDes)}. La carte talent-famille évite cette attente : la famille peut arriver avec le titulaire ou peu après. En contrepartie, elle coûte plus cher en timbres, puisqu’elle suit le tarif normal : ${h.eur(tf)} par carte, contre ${h.eur(rfCout)} sur deux ans pour un membre de famille venu par regroupement familial (validation du visa puis première carte au tarif minoré). Pour le titulaire d’une carte salarié, qui n’a pas accès à cette procédure, seul le regroupement familial reste ouvert (${h.a('procedure-regroupement-familial', 'étapes du regroupement')}).</p>
<h2>Le droit de travailler du conjoint</h2>
<p>C’est la différence la plus concrète avec beaucoup d’autres cartes familiales : la carte talent-famille donne droit à toute activité, salariée ou indépendante, et l’employeur n’a ni autorisation de travail à demander, ni taxe employeur à payer pour embaucher le conjoint. Un conjoint qui trouve un poste peut donc commencer dès la délivrance de sa carte. Les seuils de salaire du titulaire, eux, restent ceux de la carte talent : ${h.a('passeport-talent', 'le simulateur du passeport talent')} les applique à un contrat.</p>
<h2>Ce que la carte ne change pas</h2>
<p>La carte talent-famille dépend du titre du titulaire : si la carte talent prend fin ou n’est pas renouvelée, la carte de la famille suit son sort, sauf garantie acquise après cinq ans. Un conjoint qui veut sécuriser son séjour indépendamment peut, le moment venu, viser la carte de résident ou la nationalité selon ses propres années de résidence. Le mini-simulateur ci-dessus additionne les timbres de la famille et les compare au coût de la carte du titulaire.</p>
<h2>Le dossier et le renouvellement</h2>
<p>Pièces à fournir : visa de long séjour talent-famille ou titre en cours de validité, passeport ou document d’identité, justificatif de domicile de moins de six mois, carte de séjour du conjoint ou du parent titulaire, acte de mariage portant la mention la plus récente ou acte de naissance avec filiation, e-photo, engagement signé à respecter les principes de la République, et à la remise le justificatif des timbres. La carte suit le titre du titulaire et se renouvelle avec lui. Après cinq ans de résidence en France avec la carte talent-famille, le renouvellement ne peut plus être refusé et il est accordé pour quatre ans. Pour la famille d’un titulaire de carte bleue européenne, la même garantie suppose cinq ans de résidence légale dans des États de l’Union, dont les deux dernières années en France. ${h.src('sp_F16922', 'La fiche de la carte talent')} détaille les catégories du titulaire. Information, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'talent-family-card',
    nav: 'Talent-family card',
    card: 'The family of a talent-card holder: no family-reunification wait, and the right to work.',
    title: 'Talent-Family Card 2026: Spouse Permit, Length, Cost, Dates',
    description: 'Talent-family card 2026: spouse and children of a talent passport or EU Blue Card holder, accompanying-family route, right to work, length and stamps.',
    h1: 'The talent-family card: the family that comes with a talent',
    intro: 'The spouse and children of a talent-card holder skip family reunification: here is the simplified route, its cost and its deadlines.',
    resume: `The multi-year "talent-famille" residence card goes to the adult spouse and the children of someone holding a talent card in France (skilled employee, EU Blue Card, researcher, business founder, artist and others), through the simplified "accompanying family" (famille accompagnante) route, without going through family reunification. It allows any kind of work: the spouse’s employer needs no work authorisation and pays no tax for employing a foreign national. It lasts as long as the time left on the talent card: for a family arriving on ${dE(arrivee)} to join a holder whose card ends on ${dE(finTalent)}, about ${dureeMois} months. Each card costs ${eE(tf)} in tax stamps. With a long-stay visa, the application is filed online within two months of entry, here by ${dE(depotAvant)}; with no answer in ${coutTitreMois()} months, it is implicitly refused. Through family reunification, the same family could only have been applied for from ${dE(rfDes)}.`,
    faqs: [
      { q: 'Who can get the talent-family card?', a: 'A spouse over 18 married to the talent-card holder; a child of the couple who entered France as a minor and is now an adult; a child aged 16 to 18 who wants to work. Minor children need no permit. The family of an EU Blue Card holder who lived in another EU country applies within a month of entering France.' },
      { q: 'How long is the talent-family card valid?', a: 'As long as the spouse’s or parent’s talent card: its length is whatever validity remains on that permit. When the holder renews the talent card, the family renews its own. After five years of residence in France on a talent-family card, renewal can no longer be refused and is granted for four years.' },
      { q: 'Can the spouse work straight away?', a: 'Yes. The talent-family card allows both salaried and self-employed work. The employer does not need a work authorisation for the spouse and is exempt from the tax due for employing a foreign worker, unlike when hiring someone on a standard employee card. It is one of the card’s main advantages.' },
      { q: 'Can the family arrive after the talent-card holder?', a: 'Yes. The accompanying-family route applies even if the family joins the holder later, or if the wedding takes place after the holder’s arrival in France, as the official page states for ICT card holders. The family applies for a long-stay visa at the consulate, then for the card online once in France.' },
      { q: 'How much does the talent-family card cost for the whole family?', a: `Each person covered pays ${eE(tf)} in tax stamps: ${eE(P.tarifs.normal.taxe_premiere)} tax and ${eE(P.tarifs.droit_timbre)} stamp duty. A spouse and an adult child pay ${eE(tf * 2)}; minor children hold no permit and pay nothing. The visa fee paid at the consulate before departure comes on top and depends on the country you live in.` },
      { q: 'What if the prefecture does not answer?', a: `With no answer after ${coutTitreMois()} months, the application is implicitly refused. You then have two months to ask the prefect to reconsider, appeal to the Interior Minister or go to the administrative court, with no obligation to use a lawyer. If your receipt (récépissé) runs out before the decision, it can be renewed.` },
    ],
    body: (h) => `
<h2>The accompanying-family route</h2>
<p>${h.src('sp_F35308', 'The Service-Public.fr page on the simplified route')} explains the principle: the "accompanying family" is the spouse and minor children of a talent-card holder. They may come to France for the length of the holder’s stay without a family-reunification application. The spouse and adult children receive a multi-year talent-family card; minor children need no permit until they turn 18. The same logic applies to the family of an ICT card holder (staff seconded or trainees within a group, ${h.a('salarie-detache-ict', 'dedicated page')}) and of an Algerian holding a residence certificate marked scientist. The legal basis is ${h.ext(L421, 'articles L421-22 to L421-25 of the CESEDA')} (immigration code).</p>
<p>${h.src('sp_F35792', 'The talent-family card page')} lists who qualifies: a spouse over 18 married to the holder; a child of the couple who arrived as a minor and is now an adult; a child aged 16 to 18 who wants to work. The family of an EU Blue Card holder who already lived in another EU member state can apply within a month of entering France.</p>
<h2>Dates and cost</h2>
${h.table(['Step', 'Date in the example'], [
  ['Family arrives on a long-stay visa', h.date(arrivee)],
  ['Online card application, at the latest', h.date(depotAvant)],
  [`Implicit refusal if no answer (${coutTitreMois()} months)`, h.date(implicite)],
  ['End of the holder’s talent card, and of the talent-family card', h.date(finTalent)],
], 'Sample timetable for an accompanying family', ['l', 'r'])}
<p>A family living abroad first applies for a visa at the French consulate, then for the card online on ANEF, the residence-permit portal, within two months of entry. A family already in France on a VLS-TS or a permit files at the earliest ${h.num(P.renouvellement.au_plus_tot_mois)} months and at the latest ${h.num(P.renouvellement.au_plus_tard_mois)} months before its document ends. Each card costs ${h.eur(tf)} in tax stamps (timbres fiscaux: ${h.eur(P.tarifs.normal.taxe_premiere)} tax plus ${h.eur(P.tarifs.droit_timbre)} stamp duty), paid on collection. For a spouse and an adult child, the family therefore pays ${h.eur(tf * 2)}.</p>
<h2>Talent-family or family reunification: what changes</h2>
<p>Family reunification requires eighteen months of residence before applying, a review of income and housing by the mayor, then the prefect’s decision. For a foreign national who arrived on ${h.date(arrivee)}, the application would only open on ${h.date(rfDes)}. The talent-family card avoids that wait: the family can come with the holder or shortly afterwards. In return it costs more in stamps, since it follows the standard rate: ${h.eur(tf)} per card, against ${h.eur(rfCout)} over two years for a family member who came through family reunification (visa validation, then a first card at the reduced rate). Holders of a standard employee card have no access to this route and can only use family reunification (${h.a('procedure-regroupement-familial', 'family-reunification steps')}).</p>
<h2>The spouse’s right to work</h2>
<p>This is the most practical difference from many other family permits: the talent-family card allows any work, salaried or self-employed, and the employer has neither a work authorisation to request nor an employer tax to pay when hiring the spouse. A spouse who finds a job can start as soon as the card is issued. The holder’s salary thresholds remain those of the talent card: ${h.a('passeport-talent', 'the talent passport calculator')} applies them to a contract.</p>
<h2>What the card does not change</h2>
<p>The talent-family card depends on the holder’s permit: if the talent card ends or is not renewed, the family’s card follows, unless the five-year guarantee has been reached. A spouse who wants a right to stay of their own can, in time, aim for the resident card or citizenship on the strength of their own years of residence. The mini calculator above adds up the family’s stamps and compares them with the cost of the holder’s card.</p>
<p>Expatriate families often ask whether the spouse needs to speak French. The talent-family card itself sets no language test in the official page; the language level and civic exam only come into play later, for a first resident card or for citizenship. Adult children covered by the card have the same right to work as the spouse, salaried or self-employed.</p>
<h2>The file and renewal</h2>
<p>Documents: talent-family long-stay visa or a valid permit, passport or identity document, proof of address less than six months old, the residence card of the spouse or parent who holds the talent card, a marriage certificate with the latest annotations or a birth certificate showing parentage, an e-photo, the signed commitment to respect the principles of the Republic, and proof of the stamps when you collect the card. The card follows the holder’s permit and is renewed with it. After five years of residence in France on the talent-family card, renewal can no longer be refused and is granted for four years. For the family of an EU Blue Card holder, the same guarantee requires five years of lawful residence in EU countries, the last two in France. ${h.src('sp_F16922', 'The talent card page')} covers the holder’s categories. This is information, not legal advice.</p>
`,
  },
});
