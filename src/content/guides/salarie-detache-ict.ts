import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre, titreById } from '../../lib/engine/couts';
import { seuilsTalent } from '../../lib/engine/travail';
import { refusImplicite, vlsTs } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

// Exemple suivi : ingénieure détachée par la filiale indienne d'un groupe, 4 500 € brut par mois, mission de 30 mois.
const R = P.ict.ressources_mensuelles;
const prix = coutTitre('ict', 'premiere').total;
const vls = coutTitre('ict', 'vls').total;
const jours = titreById('ict').implicite_jours!;
const depot = '2026-11-16';
const imp = refusImplicite(depot, { jours })!;
const sal = 4500;
const talent = seuilsTalent(sal * 12).find((x) => x.voie === 'talent_salarie')!;
const famille = coutTitre('talent_famille', 'premiere').total;
const arr = '2026-09-07', finV = '2027-09-06';
const v = vlsTs(arr, finV);
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');
const LF = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771622/';

export default defineGuide({
  id: 'salarie-detache-ict',
  group: 'travail',
  order: 60,
  mini: 'ict',
  miniHref: 'cout-titre-de-sejour',
  related: ['passeport-talent', 'autorisation-de-travail', 'taxe-employeur-salarie-etranger', 'validation-vls-ts', 'cout-titre-de-sejour'],
  sources: ['sp_F33952', 'sp_F2728', 'sp_F16922'],
  fr: {
    slug: 'salarie-detache-ict',
    nav: 'Salarié détaché ICT',
    card: 'Transfert intragroupe : conditions, six mois d’ancienneté, durée de 3 ans, famille et coût.',
    title: 'Salarié détaché ICT 2026 : conditions, durée et coût',
    description: 'Carte salarié détaché ICT 2026 : transfert intragroupe de cadres et d’experts, six mois d’ancienneté, rémunération minimale, 3 ans au plus, famille, timbres.',
    h1: 'Salarié détaché ICT : venir en France pour une mission dans son groupe',
    intro: 'La carte ICT couvre le cadre ou l’expert qu’un groupe envoie dans une de ses entités françaises, sans quitter son contrat d’origine.',
    resume: `La carte de séjour pluriannuelle « salarié détaché ICT », pour intra-corporate transfer, s’adresse au cadre ou à l’expert non européen qui garde son contrat de travail avec l’entreprise qui l’emploie à l’étranger et vient travailler dans une entreprise du même groupe en France. Il faut au moins six mois d’ancienneté dans le groupe et une rémunération d’au moins ${eF(R, 2)} brut par mois, le niveau du Smic. Pour une mission de plus de trois mois et d’un an au plus, un VLS-TS suffit, validé en ligne avec une taxe de ${eF(vls)}. Au-delà, la carte couvre la mission dans la limite de trois ans, durée du visa déduite : après un an de VLS-TS, il reste deux ans au plus. Elle coûte ${eF(prix)} en timbres et ne se renouvelle pas. L’employeur n’a pas d’autorisation de travail à demander pour la mission. Si la préfecture ne répond pas sous ${jours} jours, la demande est réputée refusée : pour un dépôt le ${dF(depot)}, le ${dF(imp)}.`,
    faqs: [
      { q: 'Quelle différence entre la carte ICT et la carte talent salarié en mission ?', a: `Les deux visent la mobilité intragroupe. La carte ICT demande six mois d’ancienneté et une rémunération au moins égale au Smic, mais plafonne le séjour à trois ans sans renouvellement. La carte talent salarié en mission demande trois mois d’ancienneté et ${eF(P.talent.salaire_ref)} brut par an, et dure jusqu’à quatre ans. À ${eF(sal)} par mois, l’ingénieure de notre exemple dépasse ce seuil de ${eF(talent.ecart)}.` },
      { q: 'La carte ICT est-elle renouvelable ?', a: 'Non. La durée maximale de trois ans, visa compris, est un plafond : la préfecture refuse la carte quand il est atteint. Après six mois cumulés passés hors de l’Union européenne, une nouvelle carte peut être délivrée pour un nouveau détachement intragroupe en France. Pour rester au-delà, il faut changer de titre, par exemple vers une carte talent.' },
      { q: 'Ma famille peut-elle venir avec une carte ICT ?', a: 'Oui, par la procédure « famille accompagnante », sans regroupement familial, même si la famille arrive après vous ou si vous vous mariez après votre arrivée. Le conjoint et les enfants majeurs reçoivent une carte « salarié détaché ICT (famille) » pour la durée restante de votre séjour, qui permet toute activité professionnelle. Les enfants mineurs n’ont pas besoin de titre.' },
      { q: 'Un salarié ICT d’un autre pays de l’Union peut-il travailler en France ?', a: 'Oui, pour une mission identique de 90 jours au plus, sans autorisation de travail. Pour une mission plus longue, l’employeur doit demander une autorisation de travail et le salarié un titre de séjour en France. Le conjoint et les enfants mineurs d’un salarié en mobilité de longue durée relèvent aussi de cette procédure.' },
    ],
    body: (h) => `
<h2>À qui s’adresse la carte ICT</h2>
<p>La fiche officielle énumère cinq conditions cumulatives : être étranger hors Union européenne et hors Algérie ; détenir un visa de long séjour ou un VLS-TS « salarié détaché ICT » ; venir en France pour occuper un poste d’encadrement supérieur ou apporter une expertise ; avoir un contrat de travail avec l’entreprise qui vous emploie à l’étranger ; justifier d’au moins six mois d’ancienneté dans le groupe. La mission doit se dérouler dans une entreprise du même groupe que l’employeur d’origine. Ces conditions sont celles de ${h.src('sp_F33952', 'la fiche Carte de séjour pluriannuelle salarié détaché ICT')}, qui renvoie aux ${h.ext(LF, 'articles L421-26 à L421-29 du CESEDA')}.</p>
<h2>Visa ou carte : tout dépend de la durée</h2>
<p>Pour une mission de plus de trois mois et d’un an au plus, le consulat délivre un VLS-TS « salarié détaché ICT », qui vaut titre de séjour : il suffit de le valider en ligne dans les trois mois suivant l’arrivée et de payer la taxe de ${h.eur(vls)}. Pour une mission plus longue, la carte pluriannuelle prend le relais. Elle est délivrée pour la durée de la mission, trois ans au maximum, à laquelle on retranche le temps passé sous visa de long séjour.</p>
${h.table(['Mission prévue', 'Document', 'Coût en timbres'], [
  ['Plus de 3 mois, un an au plus', 'VLS-TS salarié détaché ICT', h.eur(vls)],
  ['30 mois, dont 12 sous VLS-TS', 'VLS-TS puis carte de 18 mois', `${h.eur(vls)} + ${h.eur(prix)}`],
  ['36 mois demandés depuis la France', 'Carte de 3 ans au plus', h.eur(prix)],
], 'Document et coût selon la durée de la mission', ['l', 'l', 'r'])}
<h2>La condition de rémunération</h2>
<p>Le dossier comprend un justificatif de ressources supérieures ou égales à ${h.eur(R, 2)} brut par mois. Le mini-simulateur en tête de page compare votre rémunération à ce minimum. En pratique, les cadres et experts concernés gagnent souvent bien plus : il vaut alors la peine de comparer avec ${h.a('passeport-talent', 'la carte talent salarié en mission')}, qui n’a pas le plafond de trois ans. Avec ${h.eur(sal)} par mois, l’ingénieure de notre exemple atteint ${h.eur(sal * 12)} par an, au-dessus des ${h.eur(P.talent.salaire_ref)} de la carte talent.</p>
<h2>Les pièces à fournir</h2>
<p>Outre le visa ou le titre en cours de validité, la préfecture demande le formulaire cerfa n° 15619 et ses pièces, le contrat de travail avec l’entreprise étrangère, la preuve des six mois d’ancienneté (attestation de l’employeur et fiches de paie), le justificatif de ressources, la preuve que les deux entreprises appartiennent au même groupe, les diplômes correspondant aux fonctions de cadre ou d’expert, les justificatifs d’une profession réglementée le cas échéant, et l’engagement signé de respecter les principes de la République. Depuis l’étranger, la demande se dépose au consulat ; depuis la France, à la préfecture du domicile dans les deux mois qui précèdent la fin du visa ou du titre.</p>
<h2>Les motifs de refus propres à l’ICT</h2>
<p>La préfecture refuse la carte si l’entreprise d’accueil a été créée principalement pour faciliter l’entrée d’étrangers détachés, si l’employeur a été condamné pour fraude en vue d’obtenir un titre, ou si la durée maximale de trois ans est atteinte. Elle peut la refuser si l’employeur ou l’entreprise d’accueil a été sanctionné pour travail illégal ou emploi d’étrangers sans autorisation, ou a manqué à ses obligations sociales, fiscales ou de droit du travail. En l’absence de réponse dans les ${h.num(jours)} jours, la demande est réputée refusée ; un recours est alors possible pendant deux mois. Aucune préfecture ne publie de délai moyen de traitement.</p>
<h2>Un exemple daté</h2>
<p>Prenons l’ingénieure de notre exemple, arrivée le ${h.date(arr)} avec un VLS-TS d’un an pour une mission de trente mois. Elle doit valider son visa en ligne avant le ${h.date(v.validationAvant)} et payer ${h.eur(vls)}. Comme sa mission dépasse un an, elle demande ensuite la carte pluriannuelle à la préfecture de son domicile : la demande s’ouvre le ${h.date(v.carteOuverture)} et doit être déposée au plus tard le ${h.date(v.carteLimite)}. La carte, de dix-huit mois au plus puisque douze mois ont déjà été passés sous visa, coûte ${h.eur(prix)}. Au total, ses timbres reviennent à ${h.eur(vls + prix)} pour toute la mission. Comme son titre lui permet de travailler sans autorisation de travail, la taxe employeur prévue pour les embauches soumises à autorisation ne s’applique pas à son détachement.</p>
<h2>Travail, taxe et famille</h2>
<p>La carte ICT autorise l’activité salariée de la mission : l’employeur est dispensé d’autorisation de travail, comme le rappelle ${h.src('sp_F2728', 'la fiche Autorisation de travail')}. La famille suit sans regroupement familial : le conjoint et les enfants majeurs reçoivent une carte « famille » pour la durée restante, avec le droit de travailler. Pour mémoire, une carte talent-famille coûterait ${h.eur(famille)} ; la fiche ICT ne précise pas de tarif distinct pour la carte famille ICT, nous n’en publions donc pas. La carte talent, présentée sur ${h.src('sp_F16922', 'sa fiche officielle')}, reste l’alternative pour une installation plus longue.</p>
<p>Information, pas un conseil juridique : le service mobilité de votre groupe et la préfecture restent les interlocuteurs pour votre dossier. Si la mission doit se prolonger au-delà du plafond de trois ans, préparez le passage vers un autre titre bien avant la fin de la carte, puisqu’une carte ICT ne se renouvelle pas.</p>
`,
  },
  en: {
    slug: 'intra-corporate-transfer-permit',
    nav: 'ICT transferee permit',
    card: 'Intra-group transfer: conditions, six months with the group, three-year cap, family and cost.',
    title: 'ICT Permit France 2026: Intra-Corporate Transfer Rules',
    description: 'ICT seconded-employee permit France 2026: intra-group transfers of managers and experts, six months with the group, minimum pay, three-year cap, family, cost.',
    h1: 'ICT seconded employee: coming to France on a group assignment',
    intro: 'The ICT card covers a manager or specialist sent by a group to one of its French entities while keeping the original employment contract.',
    resume: `The multi-year "salarié détaché ICT" card (intra-corporate transfer) is for a non-EU manager or specialist who keeps their employment contract with the company that employs them abroad and comes to work in a company of the same group in France. You need at least six months with the group and pay of at least ${eE(R, 2)} gross a month, the level of the French minimum wage. For an assignment of more than three months and up to one year, a VLS-TS visa is enough, validated online with a ${eE(vls)} tax. Beyond that, the card covers the assignment up to three years, minus the time already spent on the visa: after one year on a VLS-TS, two years at most remain. It costs ${eE(prix)} in tax stamps and cannot be renewed. The employer does not need a work authorisation for the assignment. If the prefecture does not answer within ${jours} days, the application counts as refused: for a filing on ${dE(depot)}, on ${dE(imp)}.`,
    faqs: [
      { q: 'How does the ICT card differ from the talent card for employees on assignment?', a: `Both cover intra-group mobility. The ICT card needs six months with the group and pay at least equal to the minimum wage, but caps the stay at three years with no renewal. The talent card for employees on assignment needs three months with the group and ${eE(P.talent.salaire_ref)} gross a year, and lasts up to four years. At ${eE(sal)} a month, the engineer in our example clears that bar by ${eE(talent.ecart)}.` },
      { q: 'Can the ICT card be renewed?', a: 'No. The three-year maximum, visa included, is a ceiling: the prefecture refuses the card once it is reached. After six months in total spent outside the European Union, a new card can be issued for a fresh intra-group secondment to France. To stay longer, you need to switch to another permit, a talent card for instance.' },
      { q: 'Can my family come with me on an ICT card?', a: 'Yes, through the "accompanying family" procedure, without family reunification, even if they arrive after you or you marry after arriving. Your spouse and adult children receive a "salarié détaché ICT (famille)" card for the rest of your stay, which allows any professional activity. Minor children need no permit.' },
      { q: 'Can an ICT transferee from another EU country work in France?', a: 'Yes, for an identical assignment of up to 90 days, with no work authorisation. For a longer assignment, the employer must request a work authorisation and the employee must apply for a French residence permit. The spouse and minor children of someone on long-term mobility fall under the same procedure.' },
    ],
    body: (h) => `
<h2>Who the ICT card is for</h2>
<p>The official page lists five conditions, all required: being a non-EU national other than Algerian; holding a long-stay visa or a VLS-TS marked "salarié détaché ICT"; coming to France for a senior management post or to bring expertise; having an employment contract with the company that employs you abroad; and at least six months' service with the group. The assignment must take place in a company of the same group as the original employer. These are the conditions on ${h.src('sp_F33952', 'the official ICT seconded-employee card page')} (in French), which refers to ${h.ext(LF, 'sections L421-26 to L421-29 of the CESEDA immigration code')}.</p>
<h2>Visa or card: it all depends on length</h2>
<p>For an assignment of more than three months and up to a year, the consulate issues an ICT VLS-TS, a long-stay visa that serves as a residence permit: you only need to validate it online within three months of arrival and pay the ${h.eur(vls)} tax. For a longer assignment, the multi-year card takes over. It is issued for the length of the assignment, three years at most, minus the time spent on a long-stay visa.</p>
${h.table(['Planned assignment', 'Document', 'Stamp cost'], [
  ['Over 3 months, up to a year', 'ICT VLS-TS', h.eur(vls)],
  ['30 months, 12 of them on a VLS-TS', 'VLS-TS then an 18-month card', `${h.eur(vls)} + ${h.eur(prix)}`],
  ['36 months, applied for in France', 'Card of up to 3 years', h.eur(prix)],
], 'Document and cost by length of assignment', ['l', 'l', 'r'])}
<h2>The pay condition</h2>
<p>The file includes proof of resources of at least ${h.eur(R, 2)} gross a month. The mini calculator at the top of the page compares your pay with that minimum. In practice, the managers and experts concerned often earn far more, so it is worth comparing with ${h.a('passeport-talent', 'the talent card for employees on assignment')}, which has no three-year cap. On ${h.eur(sal)} a month, the engineer in our example earns ${h.eur(sal * 12)} a year, above the ${h.eur(P.talent.salaire_ref)} talent threshold.</p>
<h2>Documents to provide</h2>
<p>Besides the valid visa or permit, the prefecture asks for form cerfa no. 15619 and its supporting documents, the employment contract with the foreign company, proof of six months' service (employer certificate and payslips), proof of resources, evidence that both companies belong to the same group, degrees matching the managerial or expert role, proof of meeting the rules of a regulated profession where relevant, and the signed commitment to respect the principles of the Republic. From abroad, you apply at the consulate; from France, at the prefecture where you live within the two months before your visa or permit expires.</p>
<h2>Refusal grounds specific to ICT</h2>
<p>The prefecture refuses the card if the host company was set up mainly to ease the entry of seconded foreign staff, if the employer was convicted of fraud to obtain a permit, or if the three-year maximum has been reached. It may refuse if the employer or host company was penalised for illegal work or employing foreign nationals without authorisation, or failed its social-security, tax or labour-law obligations. Without an answer within ${h.num(jours)} days, the application counts as refused; you can then appeal for two months. No prefecture publishes an average processing time.</p>
<h2>A dated example</h2>
<p>Take the engineer in our example, arriving on ${h.date(arr)} with a one-year VLS-TS for a thirty-month assignment. She must validate the visa online by ${h.date(v.validationAvant)} and pay ${h.eur(vls)}. Because her assignment runs beyond a year, she then applies for the multi-year card at the prefecture where she lives: the window opens on ${h.date(v.carteOuverture)} and the application must be in by ${h.date(v.carteLimite)}. The card, eighteen months at most since twelve months were already spent on the visa, costs ${h.eur(prix)}. In total, her stamps come to ${h.eur(vls + prix)} for the whole assignment. Because her permit lets her work without a work authorisation, the employer tax that applies to hires needing an authorisation does not apply to her secondment. Note that the dates are counted from the day of arrival and the day the visa ends, not from the start of the assignment in the employment contract: keep your boarding pass and the visa sticker, which the online validation asks for.</p>
<h2>Work, tax and family</h2>
<p>The ICT card authorises the salaried work of the assignment: the employer needs no work authorisation, as ${h.src('sp_F2728', 'the work authorisation page')} confirms. The family follows without family reunification: the spouse and adult children receive a "family" card for the remaining period, with the right to work. For reference, a talent-family card would cost ${h.eur(famille)}; the ICT page states no separate fee for the ICT family card, so we publish none. Your spouse applies at the prefecture where you live if the family already holds long-stay visas, with your card, the marriage certificate and an e-photo code. The talent card, described on ${h.src('sp_F16922', 'its official page')}, remains the alternative for a longer move.</p>
<p>Information, not legal advice: your group's mobility team and the prefecture remain the contacts for your file. If the assignment is extended beyond the three-year ceiling, plan the switch to another permit well before the card ends, since an ICT card cannot simply be renewed.</p>
`,
  },
});
