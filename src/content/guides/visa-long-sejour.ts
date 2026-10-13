import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { vlsTs } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

const T = P.tarifs;
// Exemple : étudiante arrivée le 1er septembre 2026 avec un VLS-TS valable jusqu'au 31 août 2027.
const v = vlsTs('2026-09-01', '2027-08-31');
const etuVls = coutTitre('etudiant', 'vls').total, salVls = coutTitre('salarie', 'vls').total;
const etu2 = etuVls + coutTitre('etudiant', 'premiere').total, sal2 = salVls + coutTitre('salarie', 'premiere').total;
const L_L312 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771150/';
const L_L412 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771462/';
const L_TARIF = 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000335104/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'visa-long-sejour',
  group: 'demarches',
  order: 15,
  mini: 'vlscout',
  miniHref: 'validation-vls-ts',
  related: ['validation-vls-ts', 'titre-de-sejour', 'titre-de-sejour-etudiant', 'conjoint-de-francais', 'cout-titre-de-sejour'],
  sources: ['sp_F16162', 'sp_F21921', 'sp_F2651', 'sp_A18881'],
  fr: {
    slug: 'visa-long-sejour',
    nav: 'Visa de long séjour',
    card: 'Les cinq visas D, qui en est dispensé, le dépôt au consulat, la taxe due en France et les recours.',
    title: 'Visa long séjour 2026 : types, dispenses, taxe et recours',
    description: 'Visa de long séjour 2026 : VLS-TS, visa suivi d’une carte, vacances-travail, visa temporaire, dispenses, dépôt au consulat, taxe payée en France, recours.',
    h1: 'Visa de long séjour : lequel demander, et ce qui se paie ensuite',
    intro: 'Le visa de type D ouvre un séjour de plus de trois mois. Son type décide de ce que vous ferez en arrivant : valider en ligne, aller en préfecture ou repartir.',
    resume: `Pour séjourner plus de trois mois en France, un étranger majeur doit obtenir un visa de long séjour, dit visa D, auprès du consulat de France du pays où il vit, même si sa nationalité le dispense de visa pour un court séjour. Les citoyens européens en sont dispensés. Il existe plusieurs visas D : le visa valant titre de séjour (VLS-TS), valable de 4 à 12 mois, pour l’étudiant, le salarié en contrat à durée indéterminée, le conjoint de Français ou le talent ; le visa « carte de séjour à solliciter dans les 2 mois » ; le visa vacances-travail d’un an ; le visa de mineur scolarisé ; le visa temporaire de 3 à 12 mois, qui ne permet pas de travailler. La demande se dépose au plus tôt trois mois avant le départ. Le droit de visa payé au consulat varie selon le pays ; une fois en France, le VLS-TS se valide dans les ${P.renouvellement.vls_ts_validation_mois} mois avec une taxe de ${eF(T.vls_ts.normal)}, ou ${eF(T.vls_ts.minore)} au tarif minoré. Sur deux ans, un étudiant paie ainsi ${eF(etu2)} en France, un salarié ${eF(sal2)}.`,
    faqs: [
      { q: 'Combien coûte un visa de long séjour pour la France ?', a: `Le droit de visa se paie au consulat et son montant varie selon le pays, en euros ou en francs CFA : la fiche officielle renvoie à la rubrique Tarif de chaque page-pays de France-Visas. S’y ajoute en France, pour un VLS-TS, la taxe de validation de ${eF(T.vls_ts.normal)} ou ${eF(T.vls_ts.minore)} selon le motif. Nous ne publions pas de droit de visa moyen, faute de barème unique.` },
      { q: 'Un ressortissant dispensé de visa touristique doit-il demander un visa long séjour ?', a: 'Oui, s’il est majeur et compte rester plus de trois mois. La dispense de visa de court séjour, dont bénéficient par exemple certains ressortissants d’Amérique ou d’Asie, ne vaut que pour des séjours de 90 jours. Seuls les citoyens européens, les Andorrans, les Monégasques, les Saint-Marinais, les ressortissants du Saint-Siège et quelques titulaires de titres européens sont dispensés de visa D.' },
      { q: 'Que faire si le consulat refuse le visa de long séjour ?', a: 'Le refus doit être motivé. Vous pouvez demander au consulat de revoir sa décision, et surtout saisir par courrier la Commission de recours contre les refus de visa (CRRV) dans les 30 jours suivant le refus écrit ou le refus implicite né de deux mois de silence. Ce recours est obligatoire avant le tribunal administratif de Nantes.' },
      { q: 'Peut-on voyager dans l’espace Schengen avec un visa de long séjour ?', a: 'Oui. Le visa D permet de circuler sans autre visa dans tout l’espace Schengen, à condition de ne pas y passer plus de 90 jours pendant sa validité. Pour un VLS-TS, la validation en ligne dans les trois mois de l’arrivée est indispensable pour pouvoir franchir à nouveau la frontière.' },
    ],
    body: (h) => `
<h2>Les visas de long séjour, un par projet</h2>
<p>${h.src('sp_F16162', 'La fiche Visa de long séjour')}, vérifiée le 9 octobre 2026, décrit les catégories suivantes. Toutes autorisent l’entrée et un séjour de plus de trois mois ; elles diffèrent par ce qui se passe à l’arrivée.</p>
${h.table(['Visa', 'Durée', 'Pour qui', 'À l’arrivée'], [
  ['VLS-TS (vaut titre de séjour)', '4 à 12 mois', 'étudiant, salarié en CDI, conjoint de Français, talent', 'validation en ligne et taxe'],
  ['« Carte de séjour à solliciter dans les 2 mois »', 'selon le motif', 'famille de Français, profession indépendante, carte bleue, saisonnier, retraité, artiste', 'demande de carte en préfecture'],
  ['Vacances-travail', '1 an au plus', 'jeunes des pays liés par un accord', 'aucune carte, retour à la fin'],
  ['Mineur scolarisé', '11 mois au plus', 'élève mineur', 'aucune carte'],
  ['Visa temporaire', '3 à 12 mois', 'enseignement court, artiste, visiteur', 'aucune carte, pas de travail'],
], 'Catégories de la fiche F16162', ['l', 'l', 'l', 'l'])}
<p>Le VLS-TS évite le passage en préfecture la première année. Pour le conjoint d’un Français, il est délivré sans autre condition, sauf mariage frauduleux ou annulé, ou menace pour l’ordre public. Le visa temporaire, lui, ne mène à aucune carte : à son terme, il faut rentrer, et il ne permet ni de travailler ni de percevoir des prestations sociales. Le visa vacances-travail, réservé aux jeunes des pays liés à la France par un accord bilatéral (et aux Taïwanais sans accord), ne se prolonge pas au-delà d’un an, sauf exceptions prévues par l’accord.</p>
<h2>Qui n’a pas besoin de visa D</h2>
<p>Le citoyen d’un pays de l’Union européenne n’en a jamais besoin ; ${h.src('sp_F2651', 'la fiche sur le séjour des Européens')} décrit ses propres conditions. Sont aussi dispensés le membre de famille d’un citoyen de l’Union titulaire de la carte correspondante délivrée par un autre État, le résident de longue durée-UE d’un autre pays et sa famille, le salarié détaché ICT en mobilité longue, le titulaire depuis au moins un an d’une carte bleue européenne d’un autre État et sa famille, ainsi que les ressortissants d’Andorre, de Monaco, de Saint-Marin et du Saint-Siège. Le titulaire d’une carte retraité entre à tout moment pour des séjours de moins d’un an ; celui d’une carte saisonnier vient travailler jusqu’à six mois cumulés par an.</p>
<h2>Déposer la demande</h2>
<p>La demande se dépose en ligne sur France-Visas puis au consulat du pays où vous vivez, au plus tôt trois mois avant le départ. Les pièces varient selon le motif ; l’assistant de France-Visas en donne la liste. Le passeport doit rester valable au moins trois mois après la fin du visa, compter deux pages vierges et avoir été délivré depuis moins de dix ans. Vos empreintes et votre photo sont enregistrées dans le fichier Visabio, sauf empreintes des enfants de moins de douze ans. Vous ne pouvez pas vous opposer à cet enregistrement, mais vous disposez d’un droit d’accès et de rectification. Prévoyez le temps d’instruction du consulat, qui n’est pas publié de façon uniforme : déposer au début de la fenêtre de trois mois laisse une marge pour une pièce manquante.</p>
<p>Le visa est refusé à qui a fait l’objet d’une obligation de quitter le territoire depuis moins de cinq ans sans prouver l’avoir respectée, à qui est frappé d’une interdiction ou d’une expulsion, et, sauf pour les conjoints de Français, aux ressortissants d’États qui coopèrent insuffisamment pour les réadmissions. Le cadre légal est ${h.ext(L_L312, 'l’article L312-2 du CESEDA')} et ${h.ext(L_L412, 'les articles L412-1 et suivants')}.</p>
<h2>Ce qui se paie, et où</h2>
<p>Deux paiements distincts. Au consulat, le droit de visa, dont le montant dépend du pays et figure dans la rubrique Tarif de France-Visas ; il relève du ${h.ext(L_TARIF, 'décret du 13 août 1981 sur les droits de chancellerie')}. En France, pour un VLS-TS, la taxe de validation : ${h.eur(T.vls_ts.normal)} au tarif normal, ${h.eur(T.vls_ts.minore)} au tarif minoré, depuis le 1er mai 2026 selon ${h.src('sp_A18881', 'l’actualité officielle de Service-Public.fr')}. Le mini-simulateur ci-dessus donne la taxe et la première carte de l’année suivante selon le motif.</p>
<p>Exemple : une étudiante arrivée le 1er septembre 2026 avec un VLS-TS valable jusqu’au 31 août 2027 doit le valider avant le ${h.date(v.validationAvant)} et payer ${h.eur(etuVls)}. Pour rester une deuxième année, elle demande sa carte entre le ${h.date(v.carteOuverture)} et le ${h.date(v.carteLimite)}.</p>
<h2>Refus et abrogation</h2>
<p>Tout refus est motivé. Le recours gracieux auprès du consulat reste possible, mais le recours devant la Commission de recours contre les décisions de refus de visa (CRRV) est obligatoire avant le juge : par courrier, en français, motivé, dans les 30 jours du refus écrit ou du refus implicite né de deux mois de silence du consulat. Si la commission rejette le recours, ou se tait deux mois, le tribunal administratif de Nantes peut être saisi dans les deux mois. Une fois en France, le préfet peut abroger un VLS-TS obtenu par fraude, utilisé à d’autres fins que son motif ou en cas de trouble à l’ordre public.</p>
<h2>À la fin du visa</h2>
<p>Pour rester au-delà, il faut une carte de séjour, demandée en préfecture ou sur l’ANEF selon le motif. Le délai dépend du titre : la carte talent se demande dans les deux mois suivant l’entrée avec un visa de trois mois, la carte qui succède à un VLS-TS au plus tard deux mois avant sa fin. ${h.a('validation-vls-ts', 'Le calculateur de validation')} donne ces dates pour votre visa. Information générale, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'long-stay-visa-france',
    nav: 'Long-stay visa',
    card: 'The five D visas, who is exempt, filing at the consulate, the tax due in France and appeals.',
    title: 'Long-Stay Visa France 2026: Types, Exemptions, Tax, Appeals',
    description: 'French long-stay visa 2026: VLS-TS, visa followed by a card, working holiday, temporary visa, exemptions, consulate filing, tax paid in France and appeals.',
    h1: 'French long-stay visa: which one to apply for, and what you pay next',
    intro: 'The type D visa opens a stay of more than three months. Its type decides what you do on arrival: validate online, go to the prefecture or leave at the end.',
    resume: `To stay in France for more than three months, a foreign adult needs a long-stay visa, known as a D visa, from the French consulate in the country where they live, even if their nationality is exempt from visas for short trips. EU citizens are exempt. There are several D visas: the visa that serves as a residence permit (VLS-TS), valid for 4 to 12 months, for students, employees on permanent contracts, spouses of French nationals and talent-card holders; the visa marked "residence card to be requested within 2 months"; the one-year working-holiday visa; the visa for a minor at school; and the temporary visa of 3 to 12 months, which does not allow work. The application goes in at the earliest three months before departure. The visa fee paid at the consulate varies by country; once in France, the VLS-TS must be validated within ${P.renouvellement.vls_ts_validation_mois} months with a tax of ${eE(T.vls_ts.normal)}, or ${eE(T.vls_ts.minore)} at the reduced rate. Over two years, a student therefore pays ${eE(etu2)} in France and an employee ${eE(sal2)}.`,
    faqs: [
      { q: 'How much does a French long-stay visa cost?', a: `The visa fee is paid at the consulate and varies by country, in euros or CFA francs: the official page refers to the Tarif section of each France-Visas country page. In France, a VLS-TS then carries the validation tax of ${eE(T.vls_ts.normal)} or ${eE(T.vls_ts.minore)} depending on the ground. We publish no average visa fee, since there is no single schedule.` },
      { q: 'If I need no tourist visa, do I still need a long-stay visa?', a: 'Yes, if you are an adult and plan to stay more than three months. The short-stay visa waiver enjoyed by many nationalities in the Americas or Asia only covers stays of up to 90 days. Only EU citizens, Andorran, Monegasque and San Marino nationals, Holy See nationals and some holders of European permits are exempt from the D visa.' },
      { q: 'What can I do if the consulate refuses the long-stay visa?', a: 'The refusal must give reasons. You can ask the consulate to reconsider, and above all write to the visa refusal appeals board (CRRV) within 30 days of the written refusal, or of the implicit refusal after two months of silence. That appeal is compulsory before going to the administrative court in Nantes.' },
      { q: 'Can I travel around the Schengen area on a long-stay visa?', a: 'Yes. The D visa lets you move around the whole Schengen area without another visa, provided you spend no more than 90 days there during its validity. For a VLS-TS, online validation within three months of arrival is essential to be able to cross the border again.' },
    ],
    body: (h) => `
<h2>One long-stay visa per plan</h2>
<p>${h.src('sp_F16162', 'The official long-stay visa page')}, checked on 9 October 2026, describes the following categories. All allow entry and a stay of more than three months; they differ in what happens on arrival.</p>
${h.table(['Visa', 'Length', 'For whom', 'On arrival'], [
  ['VLS-TS (serves as a permit)', '4 to 12 months', 'students, employees on permanent contracts, spouses of French nationals, talent', 'online validation and tax'],
  ['"Residence card to be requested within 2 months"', 'depends on the ground', 'French nationals’ families, self-employed, Blue Card, seasonal, retirees, artists', 'card application at the prefecture'],
  ['Working holiday', 'up to 1 year', 'young people from countries with an agreement', 'no card, leave at the end'],
  ['Minor at school', 'up to 11 months', 'school pupils under 18', 'no card'],
  ['Temporary visa', '3 to 12 months', 'short courses, artists, visitors', 'no card, no work'],
], 'Categories from page F16162', ['l', 'l', 'l', 'l'])}
<p>The VLS-TS spares you the prefecture (the local state office) in year one. For a French national's spouse it is issued with no further condition, unless the marriage is fraudulent or annulled or there is a threat to public order. The temporary visa leads to no card at all: at its end you must go home, and it allows neither work nor social benefits. The working-holiday visa, reserved for young people from countries with a bilateral agreement with France (and Taiwanese nationals without one), cannot be extended beyond a year, save for exceptions in the agreement.</p>
<h2>Who does not need a D visa</h2>
<p>An EU citizen never needs one; ${h.src('sp_F2651', 'the official page on Europeans living in France')} sets out their own conditions. Also exempt are family members of an EU citizen holding the matching card issued by another member state, EU long-term residents of another country and their families, intra-corporate transferees on long-term mobility, holders of another state's EU Blue Card for at least a year and their families, and nationals of Andorra, Monaco, San Marino and the Holy See. Holders of a French retiree card can come at any time for stays under a year; holders of a seasonal-worker card can come to work up to six months in total per year.</p>
<h2>Applying</h2>
<p>You apply online on France-Visas, the official visa portal, then at the consulate of the country where you live, at the earliest three months before departure. Documents depend on the ground; the France-Visas assistant lists them. Your passport must remain valid at least three months beyond the visa's end, have two blank pages and be less than ten years old. Your fingerprints and photo are stored in the Visabio database, except fingerprints of children under twelve. You cannot object to this record, but you have the right to access and correct it. Allow for the consulate's processing time, which is not published in any uniform way: filing at the start of the three-month window leaves room for a missing document.</p>
<p>A visa is refused to anyone under an order to leave France (OQTF) issued less than five years earlier who cannot prove they complied, to anyone under a ban or expulsion order, and, except for French nationals' spouses, to nationals of countries that cooperate poorly on readmissions. The legal basis is ${h.ext(L_L312, 'article L312-2 of the CESEDA')} and ${h.ext(L_L412, 'articles L412-1 onwards')}.</p>
<h2>What you pay, and where</h2>
<p>There are two separate payments. At the consulate, the visa fee, whose amount depends on the country and appears in the Tarif section of France-Visas; it falls under the ${h.ext(L_TARIF, 'decree of 13 August 1981 on consular fees')}. In France, for a VLS-TS, the validation tax: ${h.eur(T.vls_ts.normal)} at the standard rate, ${h.eur(T.vls_ts.minore)} at the reduced rate, since 1 May 2026 according to ${h.src('sp_A18881', 'the official Service-Public.fr notice')}. The mini-calculator above gives the tax and next year's first card for each ground.</p>
<p>Example: a student who arrives on 1 September 2026 with a VLS-TS valid until 31 August 2027 must validate it by ${h.date(v.validationAvant)} and pay ${h.eur(etuVls)}. To stay a second year, she applies for her card between ${h.date(v.carteOuverture)} and ${h.date(v.carteLimite)}.</p>
<h2>Refusal and withdrawal</h2>
<p>Every refusal gives reasons. You may still ask the consulate to reconsider, but the appeal to the visa refusal appeals board (Commission de recours contre les décisions de refus de visa, CRRV) is compulsory before going to court: by post, in French, with reasons, within 30 days of the written refusal or of the implicit refusal arising from two months of silence from the consulate. If the board rejects the appeal, or stays silent for two months, the administrative court in Nantes can be seized within two months. Once you are in France, the prefect may withdraw a VLS-TS obtained by fraud, used for another purpose than its ground, or where there is a disturbance to public order.</p>
<h2>When the visa ends</h2>
<p>To stay longer you need a residence card, requested at the prefecture or on the ANEF portal depending on the ground. The timing depends on the permit: the talent card is requested within two months of entry on a three-month visa, the card that follows a VLS-TS at the latest two months before the visa ends. ${h.a('validation-vls-ts', 'The validation calculator')} gives these dates for your visa. General information, not legal advice.</p>
`,
  },
});
