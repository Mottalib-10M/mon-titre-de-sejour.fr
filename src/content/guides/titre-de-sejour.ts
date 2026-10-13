import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre, hausse2026 } from '../../lib/engine/couts';
import { fenetreRenouvellement, vlsTs } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

const T = P.tarifs, RN = P.renouvellement;
const h1n = hausse2026('normal', 'premiere');
const vls = vlsTs('2026-09-07', '2027-09-06');
const fen = fenetreRenouvellement('2027-09-06', '2026-10-13');
const rentier = coutTitre('retraite', 'premiere').total;
const L_L411 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771448/';
const L_R431 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000043288804/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'titre-de-sejour',
  group: 'titres',
  order: 10,
  mini: 'tarif',
  miniHref: 'quel-titre-de-sejour',
  related: ['quel-titre-de-sejour', 'carte-de-sejour', 'cout-titre-de-sejour', 'renouvellement-titre-de-sejour', 'recepisse-titre-de-sejour', 'anef-titre-de-sejour'],
  sources: ['sp_F39', 'sp_F33052', 'sp_A18881', 'sp_F15763', 'sp_F36206'],
  fr: {
    slug: 'titre-de-sejour',
    nav: 'Titre de séjour',
    card: 'Qui doit en avoir un, les quatre niveaux de titres, la démarche et son prix.',
    title: 'Titre de séjour 2026 : qui en a besoin et à quel prix',
    description: 'Titre de séjour en 2026 : qui doit en détenir un, du VLS-TS à la carte de résident, pièces à fournir, dépôt sur l’ANEF, récépissé et prix des timbres fiscaux.',
    h1: 'Titre de séjour : qui doit en avoir un et comment l’obtenir',
    intro: 'Plus de trois mois en France et majeur : il faut un titre. Voici les quatre niveaux, l’ordre dans lequel ils s’enchaînent et ce que chacun coûte.',
    resume: `Tout étranger majeur qui reste plus de trois mois en France doit détenir un visa de long séjour ou un titre de séjour, sauf s’il est citoyen d’un pays de l’Espace économique européen ou suisse. Le parcours le plus courant compte quatre marches : le visa de long séjour valant titre de séjour (VLS-TS), valable de 4 à 12 mois et à valider en ligne dans les ${RN.vls_ts_validation_mois} mois de l’arrivée ; la carte de séjour temporaire d’un an ; la carte pluriannuelle, de 2 à 4 ans ; la carte de résident de 10 ans. Chaque marche se paie en timbres fiscaux, à la remise du titre : depuis le ${dF(T.en_vigueur)}, ${eF(T.normal.premiere)} pour une première carte au tarif normal contre ${eF(h1n.avant)} auparavant, ${eF(T.minore.premiere)} au tarif minoré, ${eF(T.normal.renouvellement)} ou ${eF(T.minore.renouvellement)} pour un renouvellement. La demande se dépose le plus souvent sur l’ANEF, entre ${RN.au_plus_tot_mois} et ${RN.au_plus_tard_mois} mois avant la fin du document en cours. Un justificatif de domicile de moins de six mois est toujours demandé.`,
    faqs: [
      { q: 'À partir de quel âge un étranger doit-il avoir un titre de séjour ?', a: 'À 18 ans. Un mineur n’a pas besoin de titre de séjour pour vivre en France avec ses parents ; il peut demander un document de circulation pour voyager. Un jeune de 16 ans qui veut travailler doit en revanche en demander un. À sa majorité, il dépose sa première demande, souvent une carte vie privée et familiale.' },
      { q: 'Un Européen doit-il demander un titre de séjour en France ?', a: 'Non. Les citoyens de l’Espace économique européen et les Suisses ne sont pas obligés d’en détenir un, mais peuvent en demander un. Les membres de leur famille d’une autre nationalité doivent en revanche avoir une carte « membre de la famille d’un citoyen de l’Union » ou une carte de séjour permanent.' },
      { q: 'Quel justificatif de domicile fournir quand on est hébergé ?', a: 'Trois pièces : une attestation d’hébergement datée et signée par la personne qui vous loge, la copie de sa carte d’identité ou de séjour, et un justificatif de domicile à son nom (facture, bail, avis de taxe). À l’hôtel, une attestation de l’hôtelier et la facture du dernier mois. Un justificatif muni d’un code 2D-Doc ne peut pas être refusé.' },
      { q: 'L’attestation de dépôt ANEF permet-elle de rester en France ?', a: 'Non. L’attestation de dépôt remise aussitôt la demande envoyée prouve seulement l’envoi ; elle n’est pas un document de séjour. Ce sont l’attestation de prolongation d’instruction, valable trois mois et renouvelée tant que la préfecture n’a pas décidé, puis l’attestation de décision favorable qui couvrent votre séjour.' },
      { q: 'Combien coûte un titre de séjour pour un retraité ?', a: `La carte retraité ne demande que le droit de timbre : ${eF(rentier)}, sans la taxe qui pèse sur la plupart des cartes. C’est aussi le cas de l’étranger malade et de la famille d’un réfugié. Le réfugié lui-même reçoit sa carte de résident gratuitement. Tous les autres titres sont au tarif normal ou au tarif minoré.` },
    ],
    body: (h) => `
<h2>Qui doit détenir un titre de séjour</h2>
<p>La règle est posée par ${h.ext(L_L411, 'les articles L411-1 et suivants du CESEDA')} : tout étranger de plus de 18 ans qui séjourne en France au-delà de trois mois doit être muni d’un document de séjour. ${h.src('sp_F39', 'La fiche officielle sur les titres obligatoires')} distingue trois cas. Le citoyen de l’Espace économique européen ou suisse n’a rien à demander. L’Algérien relève de l’accord franco-algérien et reçoit des certificats de résidence. Tous les autres doivent détenir l’un des documents suivants : visa de long séjour, VLS-TS, autorisation provisoire de séjour, carte de séjour temporaire ou pluriannuelle, carte de résident ou carte retraité.</p>
<p>Un séjour de moins de trois mois relève du visa de court séjour ou d’une dispense de visa selon la nationalité ; il ne donne pas de titre de séjour et ne compte pas pour la naturalisation. Le titre de séjour est donc l’affaire de ceux qui s’installent : étudiants, salariés, conjoints, familles, retraités.</p>
<h2>Les quatre marches du parcours</h2>
<p>Le visa de long séjour valant titre de séjour est la porte d’entrée la plus fréquente pour les étudiants, les salariés en contrat à durée indéterminée, les conjoints de Français et les talents. Il dispense de passer en préfecture la première année, à condition d’être validé en ligne dans les ${h.num(RN.vls_ts_validation_mois)} mois de l’arrivée, avec la taxe de ${h.eur(T.vls_ts.normal)} ou ${h.eur(T.vls_ts.minore)}. Arrivé le 7 septembre 2026 avec un visa valable jusqu’au 6 septembre 2027, vous devez valider avant le ${h.date(vls.validationAvant)}.</p>
<p>Vient ensuite la carte de séjour temporaire, d’un an au plus, ou directement la carte pluriannuelle quand le VLS-TS a couvert la première année. La carte pluriannuelle dure en principe 4 ans, 2 ans pour certains motifs familiaux ; elle exige depuis 2026 le niveau ${P.pluriannuelle.langue} en français et l’examen civique. La carte de résident, enfin, vaut 10 ans et se demande après une durée de résidence qui dépend du motif. ${h.a('carte-de-sejour', 'Le comparatif des cartes')} donne la durée et le prix de chacune.</p>
${h.table(['Marche', 'Durée', 'Première délivrance', 'Renouvellement'], [
  ['VLS-TS (validation)', '4 à 12 mois', `${h.eur(T.vls_ts.normal)} / ${h.eur(T.vls_ts.minore)}`, '-'],
  ['Carte temporaire', '1 an au plus', `${h.eur(T.normal.premiere)} / ${h.eur(T.minore.premiere)}`, `${h.eur(T.normal.renouvellement)} / ${h.eur(T.minore.renouvellement)}`],
  ['Carte pluriannuelle', '2 à 4 ans', `${h.eur(T.normal.premiere)} / ${h.eur(T.minore.premiere)}`, `${h.eur(T.normal.renouvellement)} / ${h.eur(T.minore.renouvellement)}`],
  ['Carte de résident', '10 ans', h.eur(coutTitre('resident', 'premiere').total), h.eur(coutTitre('resident', 'renouvellement').total)],
], 'Tarif normal / tarif minoré, barème en vigueur depuis le 1er mai 2026', ['l', 'l', 'r', 'r'])}
<h2>La démarche, du dépôt à la remise de la carte</h2>
<p>La plupart des demandes se déposent sur l’ANEF, le téléservice du ministère de l’Intérieur ; quelques motifs passent encore par un rendez-vous en préfecture. Le calendrier est le même : au plus tôt ${h.num(RN.au_plus_tot_mois)} mois, au plus tard ${h.num(RN.au_plus_tard_mois)} mois avant la fin du document en cours. Pour une carte qui expire le 6 septembre 2027, la fenêtre va du ${h.date(fen.ouverture)} au ${h.date(fen.limite)}. Au-delà, le droit de ${h.eur(T.retard_renouvellement)} s’ajoute, sauf force majeure.</p>
<p>Le dossier commun à presque tous les titres comprend le passeport, le titre ou visa en cours, une e-photo, le contrat d’engagement à respecter les principes de la République et un justificatif de domicile de moins de six mois. ${h.src('sp_F33052', 'La fiche sur le justificatif de domicile')} liste les pièces admises selon que vous êtes locataire, hébergé ou à l’hôtel. Le reste dépend du motif : contrat de travail, inscription, acte de mariage, ressources.</p>
<p>Dès le dépôt en ligne, l’ANEF remet une attestation de dépôt, qui n’est pas un document de séjour. Si le dossier est complet et déposé dans les délais, une attestation de prolongation d’instruction, valable trois mois, couvre votre séjour jusqu’à la décision. En préfecture, c’est un récépissé : 4 ou 6 mois pour une première demande, 3 mois pour un renouvellement, selon ${h.ext(L_R431, 'les articles R431-12 à R431-15 du CESEDA')}. Quand la carte est prête, la préfecture vous prévient par SMS et indique le montant des timbres à acheter.</p>
<h2>Ce que le titre coûte, et pourquoi le tarif varie</h2>
<p>Le prix ne dépend pas du revenu mais de la catégorie du titre. ${h.src('sp_A18881', 'L’actualité officielle sur la hausse du 1er mai 2026')} donne les exemples du tarif minoré : travailleur saisonnier, étudiant, recherche d’emploi ou création d’entreprise, regroupement familial, jeune au pair. Le duplicata d’une carte perdue ou volée se paie comme une première délivrance. Le mini-simulateur ci-dessus sépare la taxe du droit de timbre ; ${h.a('cout-titre-de-sejour', 'le calculateur complet')} chiffre un parcours de plusieurs années et toute une famille.</p>
<h2>Changer de motif en cours de route</h2>
<p>Un titre n’enferme pas dans un motif. L’étudiant diplômé peut passer à la carte de recherche d’emploi puis à la carte salarié ; le salarié qui se marie avec un Français peut demander une carte vie privée et familiale. Au renouvellement, la carte pluriannuelle peut être demandée pour un autre motif que la carte temporaire, en remplissant les conditions du nouveau motif ; seules les cartes pluriannuelles salarié et entrepreneur exigent d’avoir déjà eu une carte temporaire du même motif. Le changement se déclare sur l’ANEF, avec les pièces du nouveau motif.</p>
<h2>En cas de silence ou de refus</h2>
<p>Pour la plupart des cartes, quatre mois sans réponse valent refus implicite ; le délai est de 90 jours pour l’étudiant ou la carte bleue européenne. Un refus explicite est souvent accompagné d’une obligation de quitter le territoire, contestable devant le tribunal administratif dans un délai de 48 heures à 30 jours selon le type d’obligation. Aucune préfecture ne publie son délai moyen d’instruction : méfiez-vous des tableaux qui en affichent. Ce guide est une information générale, pas un conseil juridique ; pour un refus, une association d’aide aux étrangers ou un avocat peuvent vous accompagner.</p>
`,
  },
  en: {
    slug: 'residence-permit-france',
    nav: 'Residence permit',
    card: 'Who needs one, the four levels of permit, the procedure and its price.',
    title: 'Residence Permit France 2026: Who Needs One, Levels, Price',
    description: 'French residence permit in 2026: who must hold one, from the VLS-TS visa to the resident card, documents, ANEF online filing, receipt and tax-stamp prices.',
    h1: 'French residence permit: who needs one and how to get it',
    intro: 'Over 18 and staying more than three months: you need a permit. Here are the four levels, the order they come in and what each one costs.',
    resume: `Every foreign adult staying in France for more than three months must hold a long-stay visa or a residence permit (titre de séjour), unless they are a citizen of a European Economic Area country or Switzerland. The usual route has four steps: the long-stay visa that serves as a permit (VLS-TS), valid for 4 to 12 months and to be validated online within ${RN.vls_ts_validation_mois} months of arrival; the one-year temporary card; the multi-year card, lasting 2 to 4 years; and the 10-year resident card. Each step is paid for in tax stamps (timbres fiscaux) when the permit is handed over: since ${dE(T.en_vigueur)}, ${eE(T.normal.premiere)} for a first card at the standard rate, up from ${eE(h1n.avant)}, ${eE(T.minore.premiere)} at the reduced rate, and ${eE(T.normal.renouvellement)} or ${eE(T.minore.renouvellement)} for a renewal. Most applications go through the ANEF online portal, between ${RN.au_plus_tot_mois} and ${RN.au_plus_tard_mois} months before the current document ends. Proof of address under six months old is always required.`,
    faqs: [
      { q: 'From what age does a foreign national need a residence permit in France?', a: 'From 18. A minor does not need a permit to live in France with their parents, though they can ask for a travel document. A 16-year-old who wants to work must apply for one. At 18, the young person files a first application, often for a private and family life card.' },
      { q: 'Do EU citizens need a residence permit in France?', a: 'No. Citizens of the European Economic Area and Swiss nationals do not have to hold one, although they may ask for one. Family members of another nationality, however, must hold a "family member of a Union citizen" card or a permanent residence card.' },
      { q: 'What proof of address do I give if someone is hosting me?', a: 'Three documents: a dated, signed statement from your host (attestation d’hébergement), a copy of their ID card or residence permit, and proof of address in their name (utility bill, lease, tax notice). In a hotel, a letter from the hotel and last month’s bill. A document carrying a 2D-Doc barcode cannot be refused.' },
      { q: 'Does the ANEF filing certificate let me stay in France?', a: 'No. The filing certificate you get as soon as the online application is sent only proves it was sent; it is not a residence document. What covers your stay is the certificate extending the review (attestation de prolongation d’instruction), valid three months and renewed until a decision, then the certificate of favourable decision.' },
      { q: 'How much does a residence permit cost a retiree?', a: `The retiree card (carte retraité) carries only the stamp duty: ${eE(rentier)}, without the tax charged on most cards. The same goes for the medical-grounds permit and for a refugee's family. The recognised refugee receives the resident card free. Every other permit is at the standard or reduced rate.` },
    ],
    body: (h) => `
<h2>Who must hold a residence permit</h2>
<p>The rule is set by ${h.ext(L_L411, 'articles L411-1 onwards of the CESEDA')}, the French immigration code: any foreign national over 18 staying in France beyond three months must hold a residence document. ${h.src('sp_F39', 'The official page on compulsory permits')} sets out three cases. EEA and Swiss citizens need to apply for nothing. Algerian nationals fall under the Franco-Algerian agreement and receive residence certificates. Everyone else must hold one of the following: a long-stay visa, a VLS-TS, a provisional residence authorisation (APS), a temporary or multi-year card, a resident card or a retiree card.</p>
<p>A stay under three months falls under a short-stay visa or a visa waiver depending on nationality; it gives no residence permit and does not count towards citizenship. The residence permit is therefore for people settling in France: students, employees, spouses, families and retirees.</p>
<h2>The four steps of the route</h2>
<p>The long-stay visa that serves as a permit (visa de long séjour valant titre de séjour, VLS-TS) is the most common way in for students, employees on permanent contracts, spouses of French nationals and talent-card holders. It spares you a prefecture visit in the first year, provided you validate it online within ${h.num(RN.vls_ts_validation_mois)} months of arrival and pay the ${h.eur(T.vls_ts.normal)} or ${h.eur(T.vls_ts.minore)} tax. Arriving on 7 September 2026 with a visa valid until 6 September 2027, you must validate by ${h.date(vls.validationAvant)}.</p>
<p>Next comes the temporary card (carte de séjour temporaire), lasting up to a year, or straight away the multi-year card when the VLS-TS covered year one. The multi-year card (carte pluriannuelle) normally lasts 4 years, 2 years for some family grounds; since 2026 it requires ${P.pluriannuelle.langue}-level French and the civic exam. Finally, the resident card (carte de résident) lasts 10 years and is available after a residence period that depends on the ground. ${h.a('carte-de-sejour', 'The card comparison')} gives the length and price of each.</p>
${h.table(['Step', 'Length', 'First issue', 'Renewal'], [
  ['VLS-TS (validation)', '4 to 12 months', `${h.eur(T.vls_ts.normal)} / ${h.eur(T.vls_ts.minore)}`, '-'],
  ['Temporary card', 'up to 1 year', `${h.eur(T.normal.premiere)} / ${h.eur(T.minore.premiere)}`, `${h.eur(T.normal.renouvellement)} / ${h.eur(T.minore.renouvellement)}`],
  ['Multi-year card', '2 to 4 years', `${h.eur(T.normal.premiere)} / ${h.eur(T.minore.premiere)}`, `${h.eur(T.normal.renouvellement)} / ${h.eur(T.minore.renouvellement)}`],
  ['Resident card', '10 years', h.eur(coutTitre('resident', 'premiere').total), h.eur(coutTitre('resident', 'renouvellement').total)],
], 'Standard / reduced rate, schedule in force since 1 May 2026', ['l', 'l', 'r', 'r'])}
<h2>The procedure, from filing to collecting the card</h2>
<p>Most applications are filed on the ANEF, the Interior Ministry's online service; a few grounds still require an appointment at the prefecture (the local state office). The timetable is the same: at the earliest ${h.num(RN.au_plus_tot_mois)} months, at the latest ${h.num(RN.au_plus_tard_mois)} months before your current document ends. For a card expiring on 6 September 2027, the window runs from ${h.date(fen.ouverture)} to ${h.date(fen.limite)}. After that, the ${h.eur(T.retard_renouvellement)} late fee applies unless there is force majeure.</p>
<p>The file common to almost every permit holds your passport, current permit or visa, an e-photo (a digital photo code from an approved booth or photographer), the signed commitment to the principles of the Republic and proof of address under six months old. ${h.src('sp_F33052', 'The official page on proof of address')} lists what is accepted for tenants, people being hosted and hotel residents. The rest depends on the ground: employment contract, enrolment, marriage certificate, income.</p>
<p>As soon as you file online, the ANEF issues a filing certificate, which is not a residence document. If the file is complete and on time, a certificate extending the review, valid three months, covers your stay until the decision. At a prefecture counter you get a receipt (récépissé) instead: 4 or 6 months for a first application, 3 months for a renewal, under ${h.ext(L_R431, 'articles R431-12 to R431-15 of the CESEDA')}. When the card is ready, the prefecture texts you with the amount of stamps to buy.</p>
<h2>What the permit costs, and why the rate varies</h2>
<p>The price depends on the permit category, not on your income. ${h.src('sp_A18881', 'The official notice on the 1 May 2026 increase')} lists examples of the reduced rate: seasonal workers, students, job search or business creation, family reunification, au pairs. Replacing a lost or stolen card costs the same as a first issue. The mini-calculator above splits tax from stamp duty; ${h.a('cout-titre-de-sejour', 'the full calculator')} costs a route over several years and a whole family.</p>
<h2>Changing ground along the way</h2>
<p>A permit does not lock you into one ground. A graduate can move to the job-search card and then the employee card; an employee who marries a French national can ask for a private and family life card. At renewal, the multi-year card can be requested on a different ground from the temporary card, provided you meet the new ground's conditions; only the employee and self-employed multi-year cards require a previous temporary card on the same ground. The change is declared on the ANEF with the documents for the new ground.</p>
<h2>If there is silence or a refusal</h2>
<p>For most cards, four months without an answer count as an implicit refusal; the period is 90 days for students and the EU Blue Card. An explicit refusal usually comes with an order to leave France (OQTF), which can be challenged before the administrative court within 48 hours to 30 days depending on its type. No prefecture publishes its average processing time, so be wary of tables that claim to. This guide is general information, not legal advice; for a refusal, a migrant-support association or a lawyer can help.</p>
`,
  },
});
