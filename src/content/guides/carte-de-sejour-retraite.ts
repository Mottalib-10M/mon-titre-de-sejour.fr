import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { addMonths } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

const T = P.tarifs;
const carte = coutTitre('retraite', 'premiere').total;
const couple = carte * 2;
const renouv = coutTitre('retraite', 'renouvellement').total;
const retard = coutTitre('retraite', 'renouvellement', { retard: true }).total;
const visiteur = coutTitre('visiteur', 'premiere').total;
const visiteurRen = coutTitre('visiteur', 'renouvellement').total;
const visiteur10 = coutTitre('visiteur', 'vls').total + visiteur + visiteurRen * 8;
const resident = coutTitre('resident', 'renouvellement').total;
// Couple sur vingt ans : une carte puis un renouvellement chacun.
const couple20 = (carte + renouv) * 2;
// Exemple : carte de résident qui expire le 15 mars 2027, demande de carte retraité dans les 2 mois avant.
const finResident = '2027-03-15';
const ouverture = addMonths(finResident, -2);
const finRetraite = addMonths(finResident, 120);
const LF = {
  l426: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771862/',
  r426: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042801224/',
};
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'carte-de-sejour-retraite',
  group: 'titres',
  order: 75,
  mini: 'retraite',
  miniHref: 'cout-titre-de-sejour',
  related: ['carte-de-sejour-visiteur', 'carte-de-resident', 'cout-titre-de-sejour', 'renouvellement-titre-de-sejour'],
  sources: ['sp_F2710', 'sp_A18881', 'sp_F2208'],
  fr: {
    slug: 'carte-de-sejour-retraite',
    nav: 'Carte de séjour retraité',
    card: 'Pension française, résidence à l’étranger : une carte de 10 ans pour le seul droit de timbre, conjoint compris.',
    title: 'Carte de séjour retraité 2026 : conditions, coût et durée',
    description: 'Carte de séjour retraité 2026 : pension d’un régime de base français, résidence à l’étranger, séjours d’un an au plus, carte de 10 ans au seul droit de timbre.',
    h1: 'Carte de séjour retraité : revenir en France sans visa, pour 10 ans',
    intro: 'Pour l’ancien résident parti vivre à l’étranger avec une retraite française, c’est la carte la moins chère et la plus longue du système.',
    resume: `La carte de séjour mention retraité s’adresse à l’étranger qui a vécu en France sous carte de résident, qui a fixé sa résidence habituelle à l’étranger et qui perçoit une pension d’un régime de base français de sécurité sociale. Elle permet d’entrer en France à tout moment, sans visa, pour des séjours d’un an au plus, mais n’autorise pas à travailler ni à faire venir sa famille. Elle est valable 10 ans, renouvelable, et son renouvellement ne peut pas être refusé. Elle ne coûte que le droit de timbre, ${eF(carte)}, contre ${eF(visiteur)} pour une carte visiteur qu’il faudrait renouveler chaque année. L’époux ou l’épouse qui a résidé régulièrement en France avec le retraité obtient une carte conjoint de retraité aux mêmes droits, pour le même prix : ${eF(couple)} pour le couple. La demande se fait dans les 2 mois avant la fin de la carte de résident, ou au consulat depuis l’étranger. Une retraite complémentaire seule, de type Arrco, ne suffit pas.`,
    faqs: [
      { q: 'Une retraite complémentaire suffit-elle pour la carte retraité ?', a: 'Non. La pension doit venir d’un régime de base français de sécurité sociale, directe ou de réversion. La fiche officielle précise que les retraites complémentaires de type Arrco sont exclues comme justificatif. Le dernier avis de paiement de la caisse de retraite de base sert de preuve dans le dossier.' },
      { q: 'Combien de temps peut-on rester en France avec la carte retraité ?', a: 'Chaque séjour dure au plus un an. La carte permet d’entrer et de sortir librement, sans visa, pendant ses 10 ans de validité. Au renouvellement, vous signez une attestation sur l’honneur indiquant qu’aucun de vos séjours n’a dépassé un an. Pour vous réinstaller durablement, vous pouvez demander de nouveau une carte de résident.' },
      { q: 'Le conjoint d’un retraité a-t-il droit à la même carte ?', a: `Oui, s’il a résidé régulièrement en France avec vous. Il reçoit une carte conjoint de retraité, qui donne les mêmes droits : entrées sans visa et séjours d’un an au plus. Elle coûte aussi ${eF(carte)}. La fiche demande la copie de la carte retraité de l’époux et de l’ancienne carte de séjour du conjoint.` },
      { q: 'La carte retraité peut-elle être refusée au renouvellement ?', a: `Non. La fiche officielle indique que le renouvellement ne peut pas vous être refusé ; il suffit de déposer la demande dans les 2 mois avant la fin de la carte, avec les pièces prévues. Un dépôt hors délai reste possible mais coûte ${eF(retard)} au lieu de ${eF(renouv)}, sauf force majeure ou visa valide.` },
      { q: 'Peut-on demander la carte retraité depuis son pays de résidence ?', a: 'Oui. Si vous vivez déjà à l’étranger, la demande se dépose auprès des autorités consulaires françaises de votre pays de résidence. Le consulat la transmet à la préfecture du lieu où vous envisagez de séjourner en France, puis vous fait parvenir la carte. Les pièces sont les mêmes que pour une demande faite en France, avec le certificat de résidence de la mairie locale.' },
    ],
    body: (h) => `
<h2>Les quatre conditions</h2>
<p>${h.src('sp_F2710', 'La fiche officielle de la carte retraité')} pose quatre conditions cumulatives : être étranger, avoir résidé en France avec une carte de résident (carte de résident, de longue durée-UE, ou ancienne carte de résident ordinaire de 3 ans ou privilégié de 10 ans), avoir établi ou établir sa résidence habituelle à l’étranger, et percevoir une pension de retraite d’un régime de base français. La carte ne concerne ni les Européens, ni les Algériens, qui ont un certificat de résidence retraité propre à l’accord franco-algérien. Elle est prévue par ${h.ext(LF.l426, 'les articles L426-8 à L426-10 du CESEDA')} et ${h.ext(LF.r426, 'les articles R426-2 et R426-3')}.</p>
<p>La logique est celle d’un aller-retour : la personne a travaillé et cotisé en France, puis repart vivre dans son pays ou ailleurs, mais veut pouvoir revenir voir ses enfants, se soigner ou passer une partie de l’année en France sans redemander un visa à chaque fois.</p>
<h2>Ce que la carte permet, et ce qu’elle ne permet pas</h2>
${h.table(['', 'Carte retraité', 'Carte visiteur'], [
  ['Durée', '10 ans', '1 an'],
  ['Visa pour entrer', 'non', 'visa long séjour la première fois'],
  ['Durée d’un séjour', 'un an au plus', 'résidence en France'],
  ['Travail', 'non', 'non'],
  ['Regroupement familial', 'non', 'non prévu'],
  ['Première délivrance', h.eur(carte), h.eur(visiteur)],
  ['Sur dix ans', h.eur(carte), h.eur(visiteur10)],
], 'Comparaison pour une personne ; la carte visiteur suppose un renouvellement chaque année', ['l', 'l', 'l'])}
<p>L’écart de coût est considérable : ${h.eur(carte)} pour dix ans contre ${h.eur(visiteur10)} pour un visiteur qui validerait son visa puis renouvellerait sa carte chaque année. Mais les deux cartes ne visent pas la même vie : la carte retraité suppose que le domicile habituel est à l’étranger, la carte visiteur que vous vivez en France. Si vous voulez de nouveau fixer votre domicile en France, la carte retraité vous donne le droit de demander une ${h.a('carte-de-resident', 'carte de résident')}.</p>
<h2>Le conjoint de retraité</h2>
<p>La carte retraité ne permet pas de faire venir sa famille par regroupement familial. L’époux ou l’épouse qui a résidé régulièrement en France avec le retraité peut en revanche obtenir une carte conjoint de retraité, aux mêmes droits. Le couple paie alors ${h.eur(couple)} de droits de timbre au total. Le dossier du conjoint contient la copie de la carte retraité de l’époux et la copie de son ancienne carte de séjour, quelle qu’en ait été la durée.</p>
<h2>Calendrier de la demande</h2>
<p>Depuis la France, la demande se dépose dans les 2 mois avant la fin de la carte de résident. Pour une carte de résident qui expire le ${h.date(finResident)}, il faut déposer à partir du ${h.date(ouverture)} ; un récépissé est remis si le dossier est complet. Une carte retraité délivrée dans la foulée court jusqu’au ${h.date(finRetraite)}. Depuis l’étranger, la demande se fait au consulat de France du pays de résidence, qui la transmet à la préfecture du lieu de séjour envisagé et vous fait parvenir la carte.</p>
<p>Le silence de la préfecture pendant 4 mois vaut refus ; vous avez alors 2 mois pour un recours gracieux, hiérarchique ou contentieux. Aucun délai moyen de traitement n’est publié.</p>
<h2>Le dossier</h2>
<ul>
<li>passeport ou autre document d’identité avec photo ;</li>
<li>justificatif de la résidence habituelle hors de France (quittance de loyer, d’électricité) et certificat de résidence établi par la mairie du pays de résidence ;</li>
<li>justificatif de la résidence régulière passée en France sous carte de résident ;</li>
<li>dernier avis de paiement de la pension de base, directe ou de réversion ;</li>
<li>trois photos, déclaration de non-polygamie le cas échéant, engagement signé à respecter les principes de la République.</li>
</ul>
<h2>Un exemple sur vingt ans</h2>
<p>Un couple de retraités repart vivre à l’étranger au moment où la carte de résident du mari arrive à échéance. Chacun obtient sa carte, retraité pour lui, conjoint de retraité pour elle, puis la renouvelle une fois dix ans plus tard. Sur vingt ans, le couple paie ${h.eur(couple20)} de droits de timbre au total, sans jamais redemander de visa pour ses séjours en France. Il doit seulement veiller à ce qu’aucun séjour ne dépasse un an et à déposer chaque renouvellement dans les 2 mois avant l’échéance, faute de quoi le droit de régularisation s’ajoute. Gardez chaque année les avis de paiement de la caisse de retraite de base : le dossier de renouvellement demande la preuve que la pension est toujours versée, et l’avis en est la preuve la plus simple. Rappelons enfin que la carte n’autorise aucun travail en France, même pendant un long séjour : une offre d’emploi suppose de demander un autre titre.</p>
<h2>Ce que coûte la carte, et son renouvellement</h2>
<p>La carte retraité échappe à la taxe : seul le droit de timbre de ${h.eur(T.droit_timbre)} est dû, à l’accord ou à la remise, conformément au ${h.src('sp_A18881', 'barème du 1er mai 2026')}. Le renouvellement coûte le même montant, ${h.eur(renouv)}, et ne peut pas être refusé ; il se demande dans les 2 mois avant la fin de la carte, avec l’attestation sur l’honneur que chaque séjour n’a pas dépassé un an. Hors délai, le droit de visa de régularisation porte la démarche à ${h.eur(retard)}. À titre de comparaison, un renouvellement de carte de résident coûte ${h.eur(resident)}.</p>
<p>Ce guide décrit les règles publiées ; la préfecture reste seule juge de votre dossier. Information, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'retiree-residence-card',
    nav: 'Retiree residence card',
    card: 'French pension, home abroad: a 10-year card for the stamp duty alone, spouse included.',
    title: 'Retiree Residence Card 2026: Conditions, Cost and Duration',
    description: 'Retiree residence card in France 2026: pension from a basic French scheme, home abroad, stays of up to one year, a 10-year card that costs only the stamp duty.',
    h1: 'Retiree residence card: coming back to France visa-free for 10 years',
    intro: 'For a former resident who moved abroad with a French pension, this is the cheapest and longest-lasting card in the system.',
    resume: `The "retraité" residence card is for a foreign national who lived in France on a resident card, has since made their usual home abroad and receives a pension from a basic French social security scheme. It allows entry to France at any time, with no visa, for stays of up to one year, but does not allow work or bringing family over. It lasts 10 years, is renewable, and its renewal cannot be refused. It costs only the stamp duty, ${eE(carte)}, against ${eE(visiteur)} for a visitor card that would have to be renewed every year. A husband or wife who lived lawfully in France with the retiree gets a "conjoint de retraité" card with the same rights at the same price: ${eE(couple)} for the couple. You apply in the 2 months before your resident card ends, or at the consulate from abroad. A supplementary pension alone, such as Agirc-Arrco, is not enough.`,
    faqs: [
      { q: 'Is a supplementary pension enough for the retiree card?', a: 'No. The pension must come from a basic French social security scheme, either your own or a survivor’s pension. The official page states that supplementary pensions such as Arrco do not count as proof. The latest payment notice from the basic pension fund is the document the file needs.' },
      { q: 'How long can I stay in France on a retiree card?', a: 'Each stay lasts at most one year. The card lets you come and go freely, without a visa, throughout its 10-year validity. At renewal you sign a sworn statement that none of your stays exceeded one year. To settle in France again for good, you may apply for a resident card once more.' },
      { q: 'Does a retiree’s spouse get the same card?', a: `Yes, if your spouse lived lawfully in France with you. They receive a "conjoint de retraité" card with the same rights: visa-free entry and stays of up to one year. It also costs ${eE(carte)}. The official page asks for a copy of the retiree's card and of the spouse's former residence card.` },
      { q: 'Can the retiree card be refused at renewal?', a: `No. The official page says renewal cannot be refused; you only need to apply in the 2 months before the card ends, with the documents listed. Filing late is still possible but costs ${eE(retard)} instead of ${eE(renouv)}, unless there is force majeure or a valid visa.` },
      { q: 'Can I apply for the retiree card from the country where I now live?', a: 'Yes. If you already live abroad, you apply to the French consular authorities in your country of residence. The consulate forwards the application to the prefecture where you plan to stay in France and then sends you the card. The documents are the same as for an application made in France, including the residence certificate from your local town hall.' },
    ],
    body: (h) => `
<h2>The four conditions</h2>
<p>${h.src('sp_F2710', 'The official retiree card page')} sets four cumulative conditions: being a foreign national, having lived in France on a resident card (a resident card, an EU long-term resident card, or the former 3-year ordinary or 10-year privileged resident card), having made or making your usual home abroad, and receiving a retirement pension from a basic French scheme. The card does not apply to EU citizens or to Algerians, who have their own retiree residence certificate under the Franco-Algerian agreement. It is set out in ${h.ext(LF.l426, 'sections L426-8 to L426-10 of the CESEDA immigration code')} and ${h.ext(LF.r426, 'sections R426-2 and R426-3')}.</p>
<p>The card is often overlooked because it only appears once you already hold a resident card, which is exactly when many retirees decide to leave France. Planning the switch before the resident card expires avoids a gap and a costlier visa later.</p>
<p>The idea is a two-way life: you worked and paid contributions in France, then went back to your home country or elsewhere, but want to come back to see your children, receive medical care or spend part of the year in France without applying for a visa each time.</p>
<h2>What the card allows, and what it does not</h2>
${h.table(['', 'Retiree card', 'Visitor card'], [
  ['Length', '10 years', '1 year'],
  ['Visa to enter', 'no', 'long-stay visa the first time'],
  ['Length of a stay', 'up to one year', 'residence in France'],
  ['Work', 'no', 'no'],
  ['Family reunification', 'no', 'not provided for'],
  ['First issue', h.eur(carte), h.eur(visiteur)],
  ['Over ten years', h.eur(carte), h.eur(visiteur10)],
], 'Comparison for one person; the visitor card assumes a renewal every year', ['l', 'l', 'l'])}
<p>The cost gap is large: ${h.eur(carte)} for ten years against ${h.eur(visiteur10)} for a visitor who validates the visa and then renews every year. But the two cards serve different lives: the retiree card assumes your usual home is abroad, the visitor card that you live in France. If you want to make France your home again, the retiree card gives you the right to apply for a ${h.a('carte-de-resident', 'resident card')}.</p>
<h2>The retiree’s spouse</h2>
<p>The retiree card does not allow family reunification. A husband or wife who lived lawfully in France with the retiree can, however, obtain a "conjoint de retraité" card with the same rights. The couple then pays ${h.eur(couple)} in stamp duty in total. The spouse's file includes a copy of the retiree's card and a copy of the spouse's former residence card, whatever its length was.</p>
<h2>When to apply</h2>
<p>From France, you apply in the 2 months before your resident card ends. For a resident card expiring on ${h.date(finResident)}, you file from ${h.date(ouverture)}; a receipt (récépissé) is issued if the file is complete. A retiree card issued straight afterwards runs until ${h.date(finRetraite)}. From abroad, you apply at the French consulate in your country of residence, which forwards the application to the prefecture where you plan to stay and sends you the card.</p>
<p>Four months of silence from the prefecture count as a refusal; you then have 2 months to appeal to the prefect, the minister or the administrative court. No average processing time is published.</p>
<h2>The file</h2>
<ul>
<li>a passport or other identity document with photo;</li>
<li>proof of your usual home outside France (rent receipt, electricity bill) and a residence certificate from the town hall where you live;</li>
<li>proof of your past lawful residence in France on a resident card;</li>
<li>the latest payment notice for your basic pension, own or survivor's;</li>
<li>three photos, a non-polygamy statement where relevant, and the signed commitment to respect the principles of the Republic.</li>
</ul>
<h2>A twenty-year example</h2>
<p>A retired couple moves back abroad just as the husband's resident card is due to expire. Each obtains a card, "retraité" for him and "conjoint de retraité" for her, and renews it once ten years later. Over twenty years the couple pays ${h.eur(couple20)} in stamp duty in total, without ever applying for a visa for their stays in France. They only need to make sure no single stay lasts more than a year and to file each renewal within the 2 months before expiry; otherwise the regularisation fee is added. Keep the payment notices from your basic pension fund each year, because the renewal file asks for proof that you still receive the pension, and a notice is the simplest proof. Note also that the card does not allow paid work in France, even during a long stay, so any job offer means applying for a different permit.</p>
<h2>What the card and its renewal cost</h2>
<p>The retiree card carries no tax: only the ${h.eur(T.droit_timbre)} stamp duty is due, on approval or when the card is handed over, under ${h.src('sp_A18881', 'the schedule of 1 May 2026')}. Renewal costs the same ${h.eur(renouv)} and cannot be refused; it is requested in the 2 months before the card ends, with a sworn statement that no stay exceeded one year. Filed late, the regularisation visa fee brings it to ${h.eur(retard)}. By comparison, renewing a resident card costs ${h.eur(resident)}.</p>
<p>This guide describes the published rules; the prefecture alone decides on your file. Information, not legal advice.</p>
`,
  },
});
