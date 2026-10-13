import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { fenetreRenouvellement } from '../../lib/engine/dates-sejour';
import { addMonths } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

const T = P.tarifs;
const MIN = P.entrepreneur.revenu_mensuel_min;
const vls = coutTitre('entrepreneur', 'vls').total;
const premiere = coutTitre('entrepreneur', 'premiere').total;
const renouv = coutTitre('entrepreneur', 'renouvellement').total;
const retard = coutTitre('entrepreneur', 'renouvellement', { retard: true }).total;
const pluri = T.normal.premiere; // la fiche F35795 indique 350 € pour une carte pluriannuelle
const parcours = vls + premiere + pluri;
const talent = coutTitre('talent_salarie', 'premiere').total;
// Exemples de revenus mensuels tirés de l'activité.
const cas = [1500, 1900, 3000].map((r) => ({ r, ecart: r - MIN }));
// Carte d'un an qui expire le 31 mai 2027 : dépôt dans les 2 mois avant (préfecture).
const fin = '2027-05-31';
const debutDepot = addMonths(fin, -2);
const pluriFin = addMonths(fin, 48);
const w = fenetreRenouvellement(fin, fin);
const LF = {
  l421: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771558/',
  r421: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042800936/',
  arrete: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054103602',
};
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');

export default defineGuide({
  id: 'carte-entrepreneur-profession-liberale',
  group: 'travail',
  order: 70,
  mini: 'entrepreneur',
  miniHref: 'passeport-talent',
  related: ['passeport-talent', 'carte-de-sejour-pluriannuelle', 'cout-titre-de-sejour', 'carte-recherche-emploi-creation-entreprise', 'niveau-de-francais-exige'],
  sources: ['sp_F35795', 'sp_F16922', 'sp_A18881', 'sp_F2300'],
  fr: {
    slug: 'carte-entrepreneur-profession-liberale',
    nav: 'Carte entrepreneur / profession libérale',
    card: 'Commerce, artisanat ou activité libérale : revenu au niveau du Smic, avis de viabilité, coût et carte de 4 ans.',
    title: 'Carte entrepreneur profession libérale 2026 : revenu et coût',
    description: 'Carte entrepreneur ou profession libérale 2026 : activité viable rapportant le Smic, avis de viabilité, timbres, passage à la carte pluriannuelle de 4 ans.',
    h1: 'Carte entrepreneur / profession libérale : vivre de son activité en France',
    intro: 'Commerçant, artisan, industriel ou libéral : la préfecture juge d’abord si l’activité est viable et si elle vous fait vivre au moins au niveau du Smic.',
    resume: `La carte de séjour entrepreneur/profession libérale permet à un étranger non européen d’exercer en France, à titre principal, une activité commerciale, artisanale, industrielle ou libérale pour plus de 3 mois. L’activité doit être inscrite au guichet unique des formalités des entreprises, correspondre à vos qualifications ou à votre expérience, être économiquement viable et vous procurer des ressources au moins égales au Smic, soit ${eF(MIN, 2)} par mois, ${eF(MIN * 12)} par an. Une plateforme de la main-d’œuvre étrangère rend un avis sur la viabilité du projet. La première carte dure 1 an au plus et coûte ${eF(premiere)} en timbres fiscaux, après ${eF(vls)} de validation du visa long séjour ; un renouvellement temporaire coûte ${eF(renouv)}, ou ${eF(retard)} hors délai. À la fin de la première carte, une carte pluriannuelle de 4 ans est possible pour ${eF(pluri)}, avec le niveau ${P.pluriannuelle.langue} en français et l’examen civique. Le parcours visa, première carte, carte de 4 ans revient à ${eF(parcours)}.`,
    faqs: [
      { q: 'Quel revenu faut-il tirer de son entreprise pour garder la carte ?', a: `Au moins le Smic, soit ${eF(MIN, 2)} par mois. À la création, vous justifiez la capacité de l’activité à procurer ce revenu par un plan d’affaires et un budget prévisionnel ; à la poursuite, par les ressources réellement tirées de l’activité, avec avis d’imposition, livre de compte ou fiches de paie. Les autres revenus du foyer ne remplacent pas cette preuve.` },
      { q: 'Qu’est-ce que l’avis de viabilité économique ?', a: 'C’est l’avis rendu par la plateforme chargée de la main-d’œuvre étrangère du département où le projet est envisagé. Il est demandé pour une création d’activité commerciale, artisanale, industrielle ou libérale, et la liste des pièces à fournir pour l’obtenir est fixée par un arrêté du 13 mai 2026. La demande d’avis se fait par un service en ligne.' },
      { q: 'Combien de fois peut-on renouveler la carte temporaire entrepreneur ?', a: 'La fiche officielle précise que la carte de séjour temporaire ne peut pas être renouvelée plus de 3 fois consécutives pour le même motif. À la fin de la première carte, la voie normale est la carte pluriannuelle de 4 ans, qui suppose le niveau A2 en français, la réussite à l’examen civique et le respect du contrat d’intégration républicaine.' },
      { q: 'Faut-il une caution bancaire pour créer un commerce en France ?', a: 'Pour une activité commerciale, industrielle ou artisanale, le dossier de création comprend soit un justificatif de caution donnée par un établissement de crédit ou une entreprise d’assurance agréée en France, soit une attestation de solde créditeur d’un compte à votre nom ouvert en France. La fiche ne fixe pas de montant minimal pour cette caution.' },
      { q: 'Que risque-t-on si l’activité ne rapporte pas le Smic au moment du renouvellement ?', a: `Pour renouveler la carte, vous devez continuer d’en remplir les conditions, dont des ressources tirées de l’activité au moins égales à ${eF(MIN, 2)} par mois. Si les avis d’imposition, le livre de compte ou les fiches de paie montrent moins, la préfecture peut refuser le renouvellement. Préparez ces pièces plusieurs mois à l’avance pour mesurer l’écart avant de déposer.` },
    ],
    body: (h) => `
<h2>Qui peut demander la carte</h2>
<p>${h.src('sp_F35795', 'La fiche officielle de la carte entrepreneur/profession libérale')} vise l’étranger qui vient exercer en France, pour plus de 3 mois, une activité commerciale, artisanale ou industrielle, ou une activité libérale. Quatre conditions se cumulent : l’activité est exercée à titre principal, elle est inscrite au guichet unique des formalités des entreprises, elle correspond à vos qualifications ou à votre expérience, et elle est économiquement viable, avec des moyens d’existence suffisants. Le titre est prévu par ${h.ext(LF.l421, 'les articles L421-5 et L421-6 du CESEDA')} ; la demande suit ${h.ext(LF.r421, 'les articles R421-7 à R421-10')}.</p>
<h2>Le seuil de revenu : le Smic de l’activité</h2>
<p>La fiche chiffre la viabilité de façon simple : les ressources tirées de l’activité doivent atteindre au moins ${h.eur(MIN, 2)} par mois, le Smic brut mensuel que ${h.src('sp_F2300', 'la fiche Smic')} donne depuis le 1er juin 2026. Pour une création, il s’agit de la capacité de l’activité à procurer ce revenu, démontrée par le projet, le plan d’affaires et un budget prévisionnel pluriannuel ; pour une poursuite, des revenus réellement perçus.</p>
${h.table(['Revenu mensuel de l’activité', 'Écart avec le Smic', 'Lecture'], cas.map((c) => [h.eur(c.r), (c.ecart >= 0 ? '+' : '') + h.eur(c.ecart), c.ecart >= 0 ? 'condition de revenu remplie' : 'revenu insuffisant']), `Seuil de ${h.eur(MIN, 2)} par mois, ${h.eur(MIN * 12)} par an`, ['r', 'r', 'l'])}
<p>Le mini-simulateur en tête de page fait le même calcul pour votre chiffre. Un revenu juste au niveau du seuil passe la condition chiffrée, mais la préfecture apprécie aussi la solidité du projet et l’avis de viabilité. Le chiffre mesuré est le revenu tiré de l’activité elle-même : le salaire d’un conjoint ou une épargne aident à vivre, mais ce n’est pas ce que la préfecture regarde pour cette carte.</p>
<h2>Les pièces selon votre activité</h2>
<h3>Création d’une activité commerciale, industrielle ou artisanale</h3>
<ul>
<li>le formulaire cerfa « commerçant, artisan, industriel » ;</li>
<li>les pièces qui prouvent votre capacité à exercer l’activité, et l’autorisation d’exercice si elle est réglementée ;</li>
<li>l’avis de la plateforme de la main-d’œuvre étrangère du département du projet ;</li>
<li>la présentation du projet, le plan d’affaires et un budget prévisionnel pluriannuel ;</li>
<li>une caution d’un établissement de crédit ou d’un assureur agréé en France, ou l’attestation d’un solde créditeur sur un compte ouvert en France à votre nom ;</li>
<li>selon la forme : promesse de bail ou contrat de domiciliation, promesse de vente du fonds, contrat de location-gérance, projet de statuts de la société.</li>
</ul>
<h3>Activité libérale</h3>
<p>À la création : l’immatriculation à l’Urssaf, les justificatifs de la capacité de l’activité à procurer au moins ${h.eur(MIN, 2)} par mois, l’autorisation d’exercice ou l’inscription à l’ordre pour une profession réglementée, et l’avis de la plateforme. À la poursuite : la preuve de la poursuite d’activité et des revenus tirés de celle-ci. Les pièces de l’avis de viabilité sont fixées par ${h.ext(LF.arrete, 'l’arrêté du 13 mai 2026')}.</p>
<h2>Coût et calendrier</h2>
<p>La carte est au tarif normal du ${h.src('sp_A18881', 'barème du 1er mai 2026')}. L’entrepreneur arrivé avec un visa long séjour le valide d’abord pour ${h.eur(vls)} ; la première carte coûte ${h.eur(premiere)}, un renouvellement de carte temporaire ${h.eur(renouv)}, et la carte pluriannuelle ${h.eur(pluri)}.</p>
${h.table(['Étape', 'Durée', 'Timbres'], [
  ['Validation du visa long séjour', 'jusqu’à 1 an', h.eur(vls)],
  ['Carte temporaire entrepreneur', '1 an au plus', h.eur(premiere)],
  ['Carte pluriannuelle entrepreneur', '4 ans', h.eur(pluri)],
  ['Total du parcours', '', h.eur(parcours)],
], 'Montants de la fiche F35795 vérifiée le 1er juin 2026, barème du 1er mai 2026', ['l', 'l', 'r'])}
<p>La demande de renouvellement se dépose à la préfecture ou à la sous-préfecture du domicile, dans les 2 mois précédant la fin de la carte. Pour une carte qui expire le ${h.date(fin)}, le dépôt se fait à partir du ${h.date(debutDepot)} ; au-delà de l’échéance, le droit de ${h.eur(T.retard_renouvellement)} porte le renouvellement à ${h.eur(retard)}. Une carte pluriannuelle accordée à cette échéance courrait jusqu’au ${h.date(pluriFin)}. Le récépissé remis au dépôt d’un renouvellement couvre ${h.num(P.renouvellement.recepisse_mois)} mois, jusqu’au ${h.date(w.recepisseFin)} dans cet exemple. La fiche ne publie pas de délai de réponse propre à cette carte, et aucun délai moyen de préfecture n’existe officiellement.</p>
<h2>La carte pluriannuelle de 4 ans</h2>
<p>À la fin de la première carte, vous pouvez demander une carte pluriannuelle de 4 ans pour le même motif, à condition de remplir toujours les conditions de la carte temporaire et une condition d’intégration : assiduité aux formations du contrat d’intégration républicaine, niveau ${P.pluriannuelle.langue} en français et réussite à l’examen civique pour une première carte pluriannuelle, sauf après ${P.pluriannuelle.age_exemption} ans. ${h.a('niveau-de-francais-exige', 'La page sur le niveau de français')} détaille les attestations acceptées. La carte temporaire ne peut pas être renouvelée plus de 3 fois consécutives pour le même motif.</p>
<h2>Et la carte talent ?</h2>
<p>Un projet d’entreprise innovant ou appuyé par un investissement d’au moins ${h.eur(P.talent.createur_investissement)} relève plutôt de la ${h.a('passeport-talent', 'carte talent porteur de projet')}, d’emblée pluriannuelle, qui coûte ${h.eur(talent)} et exige des ressources au moins égales au Smic annuel, ${h.eur(P.smic.annuel_brut, 2)}, selon ${h.src('sp_F16922', 'la fiche Carte talent')}. La carte entrepreneur reste la voie de l’artisan, du commerçant ou du libéral dont l’activité est modeste mais viable. Ce guide informe ; il ne remplace pas l’examen de la préfecture ni un conseil juridique.</p>
`,
  },
  en: {
    slug: 'self-employed-residence-permit',
    nav: 'Self-employed residence permit',
    card: 'Trade, craft or liberal profession: income at the minimum wage, viability opinion, cost and a 4-year card.',
    title: 'Self-Employed Residence Permit 2026: Income and Cost',
    description: 'Self-employed permit in France 2026: a viable business earning at least the minimum wage, viability opinion, tax stamps and the 4-year multi-year card.',
    h1: 'Self-employed residence permit: living from your business in France',
    intro: 'Trader, craftsperson, manufacturer or liberal professional: the prefecture first asks whether the business is viable and pays you at least the minimum wage.',
    resume: `The "entrepreneur/profession libérale" residence card lets a non-EU national run a commercial, craft, industrial or liberal activity in France as their main occupation for more than 3 months. The business must be registered with the single business-formalities window (guichet unique), match your qualifications or experience, be economically viable and bring you resources at least equal to the minimum wage (Smic): ${eE(MIN, 2)} a month, ${eE(MIN * 12)} a year. A foreign-workforce platform gives an opinion on the project's viability. The first card lasts 1 year at most and costs ${eE(premiere)} in tax stamps, after ${eE(vls)} to validate the long-stay visa; a temporary renewal costs ${eE(renouv)}, or ${eE(retard)} if filed late. When the first card ends, a 4-year multi-year card is possible for ${eE(pluri)}, with ${P.pluriannuelle.langue}-level French and the civic exam. The route of visa, first card and 4-year card adds up to ${eE(parcours)}.`,
    faqs: [
      { q: 'How much must my business earn for me to keep the card?', a: `At least the minimum wage, ${eE(MIN, 2)} a month. When starting out, you show the business can generate that income through a business plan and multi-year budget; when continuing, through the income actually earned, with tax notices, accounts or payslips. Other household income does not replace this proof.` },
      { q: 'What is the economic viability opinion?', a: 'It is the opinion issued by the foreign-workforce platform for the department where the project is based. It is required when you create a commercial, craft, industrial or liberal activity, and the documents needed to obtain it are listed in an order of 13 May 2026. The request for the opinion is made through an online service.' },
      { q: 'How many times can the temporary self-employed card be renewed?', a: 'The official page states that the temporary card cannot be renewed more than 3 times in a row on the same ground. When the first card ends, the normal next step is the 4-year multi-year card, which requires A2-level French, a pass in the civic exam and compliance with the republican integration contract.' },
      { q: 'Do I need a bank guarantee to open a shop in France?', a: 'For a commercial, industrial or craft business, the start-up file includes either a guarantee from a credit institution or an insurer approved in France, or a certificate showing a credit balance on an account in your name opened in France. The official page sets no minimum amount for this guarantee.' },
      { q: 'What happens if the business earns less than the minimum wage at renewal time?', a: `To renew the card, you must still meet its conditions, including resources from the business of at least ${eE(MIN, 2)} a month. If your tax notices, accounts or payslips show less, the prefecture may refuse the renewal. Gather these documents several months ahead so you can measure any gap before you file.` },
    ],
    body: (h) => `
<h2>Who can apply</h2>
<p>${h.src('sp_F35795', 'The official self-employed and liberal profession card page')} covers foreign nationals coming to France for more than 3 months to run a commercial, craft or industrial business, or a liberal profession. Four conditions apply together: the activity is your main occupation, it is registered with the single business-formalities window, it matches your qualifications or experience, and it is economically viable, giving you enough to live on. The permit is set out in ${h.ext(LF.l421, 'sections L421-5 and L421-6 of the CESEDA immigration code')}; the application follows ${h.ext(LF.r421, 'sections R421-7 to R421-10')}.</p>
<h2>The income threshold: a minimum wage from the business</h2>
<p>The official page puts a simple figure on viability: the resources drawn from the business must reach at least ${h.eur(MIN, 2)} a month, the gross monthly minimum wage that ${h.src('sp_F2300', 'the official minimum-wage page')} gives since 1 June 2026. For a new business, this means its capacity to generate that income, shown through the project, a business plan and a multi-year budget; for an existing one, the income actually earned.</p>
${h.table(['Monthly income from the business', 'Gap with the minimum wage', 'What it means'], cas.map((c) => [h.eur(c.r), (c.ecart >= 0 ? '+' : '') + h.eur(c.ecart), c.ecart >= 0 ? 'income condition met' : 'income too low']), `Threshold of ${h.eur(MIN, 2)} a month, ${h.eur(MIN * 12)} a year`, ['r', 'r', 'l'])}
<p>The mini-calculator at the top of the page runs the same check on your own figure. Income exactly at the threshold meets the numerical condition, but the prefecture also weighs how solid the project is and what the viability opinion says. Bear in mind that the figure is gross income from the activity itself: a spouse's salary or savings may help you live, but they are not what the prefecture measures for this card.</p>
<h2>Documents by type of activity</h2>
<h3>Starting a commercial, industrial or craft business</h3>
<ul>
<li>the "commerçant, artisan, industriel" cerfa form;</li>
<li>proof that you are able to carry out the activity, and the licence to practise if it is regulated;</li>
<li>the opinion of the foreign-workforce platform for the project's department;</li>
<li>a presentation of the project, a business plan and a multi-year budget;</li>
<li>a guarantee from a credit institution or approved insurer in France, or a certificate showing a credit balance on an account in your name opened in France;</li>
<li>depending on the set-up: a lease agreement in principle or a business domiciliation contract, a promise to buy the business, a management-lease contract, or the draft articles of the company.</li>
</ul>
<h3>Liberal professions</h3>
<p>When starting: Urssaf registration (the social contributions body), proof that the activity can bring in at least ${h.eur(MIN, 2)} a month, the licence or professional-body registration for a regulated profession, and the platform's opinion. When continuing: proof that the activity goes on and of the income drawn from it. The documents for the viability opinion are set by ${h.ext(LF.arrete, 'the order of 13 May 2026')}.</p>
<h2>Cost and timetable</h2>
<p>The card is at the standard rate of ${h.src('sp_A18881', 'the 1 May 2026 schedule')}. An entrepreneur who arrived on a long-stay visa first validates it for ${h.eur(vls)}; the first card costs ${h.eur(premiere)}, a temporary renewal ${h.eur(renouv)} and the multi-year card ${h.eur(pluri)}.</p>
${h.table(['Step', 'Length', 'Stamps'], [
  ['Long-stay visa validation', 'up to 1 year', h.eur(vls)],
  ['Temporary self-employed card', '1 year at most', h.eur(premiere)],
  ['Multi-year self-employed card', '4 years', h.eur(pluri)],
  ['Total for the route', '', h.eur(parcours)],
], 'Amounts from page F35795, checked 1 June 2026, schedule of 1 May 2026', ['l', 'l', 'r'])}
<p>The renewal is filed at the prefecture or sub-prefecture of your home in the 2 months before the card ends. For a card expiring on ${h.date(fin)}, you file from ${h.date(debutDepot)}; after expiry, the ${h.eur(T.retard_renouvellement)} fee brings the renewal to ${h.eur(retard)}. A multi-year card granted at that point would run until ${h.date(pluriFin)}. The receipt (récépissé) issued when a renewal is filed covers ${h.num(P.renouvellement.recepisse_mois)} months, until ${h.date(w.recepisseFin)} in this example. The official page publishes no response deadline specific to this card, and no official average prefecture time exists.</p>
<h2>The 4-year multi-year card</h2>
<p>When your first card ends, you may request a 4-year multi-year card on the same ground, provided you still meet the temporary card's conditions and an integration condition: attending the training of the republican integration contract (CIR), ${P.pluriannuelle.langue}-level French and passing the civic exam for a first multi-year card, unless you are over ${P.pluriannuelle.age_exemption}. ${h.a('niveau-de-francais-exige', 'The French-level page')} lists the accepted certificates. The temporary card cannot be renewed more than 3 times in a row on the same ground, so the multi-year card is worth preparing from the first year: book the French test and the civic exam well before your first renewal.</p>
<h2>What about the talent card?</h2>
<p>An innovative business project, or one backed by an investment of at least ${h.eur(P.talent.createur_investissement)}, is better suited to the ${h.a('passeport-talent', 'talent card for business founders')}, which is multi-year from the start, costs ${h.eur(talent)} and requires resources of at least the annual minimum wage, ${h.eur(P.smic.annuel_brut, 2)}, according to ${h.src('sp_F16922', 'the official talent card page')}. The self-employed card remains the route for a craftsperson, trader or liberal professional whose business is modest but viable. This guide is information; it does not replace the prefecture's review or legal advice.</p>
`,
  },
});
