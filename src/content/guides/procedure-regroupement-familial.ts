import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { regroupementDes, regroupementImplicite } from '../../lib/engine/famille';
import { coutTitre } from '../../lib/engine/couts';
import { addMonths } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

const RF = P.regroupement;
const T = P.tarifs;
// Calendrier type : titre d’un an obtenu le 1er mars 2025, dossier complet déposé le 15 septembre 2026.
const debut = '2025-03-01';
const des = regroupementDes(debut);
const depot = '2026-09-15';
const avisMaire = addMonths(depot, 2);
const implicite = regroupementImplicite(depot);
const vls = coutTitre('regroupement', 'vls').total;
const carte = coutTitre('regroupement', 'premiere').total;
const sansVisa = coutTitre('regroupement', 'premiere', { sansVisa: true }).total;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');
const L434 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771996/';
const R434 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042801438/';

export default defineGuide({
  id: 'procedure-regroupement-familial',
  group: 'famille',
  order: 30,
  mini: 'rfdates',
  miniHref: 'regroupement-familial',
  related: ['regroupement-familial', 'logement-regroupement-familial', 'validation-vls-ts', 'vie-privee-et-familiale', 'delai-titre-de-sejour'],
  sources: ['sp_F11166', 'sp_F11168', 'ceseda_r434', 'sp_A18881'],
  fr: {
    slug: 'procedure-regroupement-familial',
    nav: 'Regroupement familial : étapes',
    card: 'De la demande à l’OFII à la carte de séjour de la famille : chaque étape, chaque délai légal.',
    title: 'Procédure regroupement familial 2026 : étapes et délais',
    description: 'Regroupement familial 2026, la procédure : dossier à l’OFII, avis du maire en 2 mois, décision du préfet en 6 mois, visa, visite médicale, timbres fiscaux.',
    h1: 'Procédure du regroupement familial : les étapes et leurs délais',
    intro: 'De l’attestation de dépôt de l’OFII au premier titre de séjour de votre conjoint, voici l’ordre des étapes et les seuls délais que la loi fixe.',
    resume: `La procédure de regroupement familial se déroule en cinq temps : vérifier les conditions, constituer le dossier, le transmettre à l’OFII, attendre l’instruction par le maire puis la décision du préfet, et enfin préparer l’arrivée de la famille. La demande n’est possible qu’après ${RF.sejour_min_mois} mois de séjour régulier : avec un premier titre obtenu le ${dF(debut)}, la date d’ouverture est le ${dF(des)}. Pour un dossier complet déposé le ${dF(depot)}, le maire doit rendre son avis dans les deux mois, soit avant le ${dF(avisMaire)}, faute de quoi il est réputé favorable ; le préfet doit notifier sa décision dans les ${RF.implicite_mois} mois, soit avant le ${dF(implicite)}, et son silence vaut alors refus. Une fois l’accord donné, le conjoint demande un visa de long séjour, entre en France dans les trois mois, valide son visa en ligne contre une taxe de ${eF(vls)}, passe la visite médicale de l’OFII puis, l’année suivante, paie ${eF(carte)} pour sa première carte. Aucun délai moyen n’est publié par les préfectures.`,
    faqs: [
      { q: 'À qui envoie-t-on la demande de regroupement familial ?', a: 'À l’Office français de l’immigration et de l’intégration (OFII), en ligne ou par courrier recommandé avec accusé de réception, jamais par les deux voies à la fois. L’OFII vérifie que le dossier est complet, vous remet une attestation de dépôt datée et informe le préfet. Un dossier incomplet vous est renvoyé pour être complété.' },
      { q: 'Que fait le maire dans le regroupement familial ?', a: 'L’OFII lui confie l’instruction des ressources et du logement. Le maire vérifie que les conditions sont remplies, peut faire visiter le logement par des agents habilités et, à la demande du préfet, contrôler le séjour régulier et le respect des principes de la vie familiale. Il rend un avis motivé dans les deux mois ; passé ce délai, l’avis est réputé favorable.' },
      { q: 'Que se passe-t-il si le préfet ne répond pas ?', a: `Sans décision notifiée dans les ${RF.implicite_mois} mois qui suivent le dépôt du dossier complet, la demande est refusée implicitement. Vous pouvez alors former un recours gracieux auprès du préfet ou hiérarchique auprès du ministre de l’Intérieur, et un recours devant le tribunal administratif dans les délais. Une décision de refus explicite doit être motivée.` },
      { q: 'Combien de temps la famille a-t-elle pour venir après le visa ?', a: 'Elle doit entrer en France dans les trois mois qui suivent la délivrance des visas, les frais de voyage étant à sa charge. Le conjoint reçoit un visa de long séjour valant titre de séjour, à valider en ligne dans les trois mois de son arrivée ; les enfants mineurs entrent avec un visa portant la mention regroupement familial.' },
      { q: 'Peut-on faire venir une partie seulement de la famille ?', a: 'En principe non : tous les membres doivent arriver ensemble. Un regroupement partiel peut être accepté à titre exceptionnel dans l’intérêt des enfants, par exemple pour leur scolarité, leur santé ou parce que le logement est trop petit pour tous. Il faut le justifier par une lettre motivée jointe au dossier dès le dépôt.' },
      { q: 'Les parents du demandeur peuvent-ils venir par regroupement familial ?', a: 'Non, la procédure ne vise que le conjoint majeur légalement marié et les enfants mineurs. Les ascendants peuvent éventuellement s’installer en France avec une carte de séjour visiteur s’ils disposent de ressources suffisantes. La famille d’un Français, d’un Européen ou d’un réfugié relève d’autres procédures.' },
    ],
    body: (h) => `
<h2>Étape 1 : vérifier les conditions</h2>
<p>Au dépôt, le demandeur doit détenir une carte de séjour d’au moins un an, une carte pluriannuelle, une carte de résident ou le récépissé de renouvellement de l’un de ces titres. Il doit surtout résider en France depuis au moins ${h.num(RF.sejour_min_mois)} mois ; ce séjour peut avoir été accompli sous un visa long séjour valant titre, une carte de moins d’un an, une autorisation provisoire, un récépissé ou une attestation de demande d’asile. Viennent ensuite les ressources (${h.a('regroupement-familial', 'simulateur des ressources')}), le logement (${h.a('logement-regroupement-familial', 'simulateur de surface')}) et le respect des principes essentiels de la vie familiale en France. Une situation de polygamie interdit de faire venir une seconde épouse. Ces règles figurent au ${h.ext(L434, 'CESEDA, articles L434-1 à L434-12')}.</p>
<p>À Mayotte, les règles diffèrent : il faut y séjourner depuis au moins trois ans avec un titre d’au moins cinq ans. Les membres de la famille sont le conjoint d’au moins 18 ans légalement marié et les enfants de moins de 18 ans, ceux du couple, ou ceux d’une précédente union si l’autre parent est décédé, déchu de l’autorité parentale, ou si une décision étrangère confie l’autorité parentale. L’âge s’apprécie au jour du dépôt.</p>
<h2>Étape 2 : constituer le dossier</h2>
<p>Le dossier comprend le formulaire cerfa de demande, la copie recto verso de votre titre, les actes d’état civil en copie intégrale (mariage, naissance de chacun) traduits par un traducteur agréé, douze mois de justificatifs de ressources et les justificatifs du logement. Les pièces de ressources changent selon votre situation : avis d’imposition et bulletins de paie pour un salarié, extrait du registre national des entreprises et bilan pour un commerçant ou un artisan, relevé de France Travail pour un demandeur d’emploi, décision d’attribution pour un retraité. Le logement se prouve par le bail et la dernière quittance, l’acte de propriété ou une attestation d’hébergement. ${h.src('sp_F11166', 'La fiche officielle')} donne la liste complète, cas par cas.</p>
<h2>Étape 3 : la transmission à l’OFII</h2>
<p>Le dossier part à l’OFII en ligne ou par lettre recommandée. Complet, il donne lieu à une attestation de dépôt qui précise la date : c’est elle qui fait courir les délais légaux et qui permet à votre famille d’engager la demande de visa. Gardez-la précieusement, et transmettez-la avec les pièces d’état civil à votre famille à l’étranger dès que vous la recevez. La simulation ci-dessous donne la date d’ouverture de la demande et, si vous déposez ce jour-là, la date du refus implicite.</p>
<h2>Étape 4 : l’instruction par le maire, puis la décision du préfet</h2>
<p>Le maire de votre commune, ou de celle où vous comptez vous installer, examine les ressources et le logement. Il dispose de deux mois pour rendre son avis ; son silence vaut avis favorable. Le dossier revient à la délégation territoriale de l’OFII, qui complète l’instruction si besoin et le transmet au préfet du département (à Paris, le préfet de police). Le préfet a ${h.num(RF.implicite_mois)} mois à compter du dépôt du dossier complet pour notifier sa décision. Ces délais sont les seuls fixés par les textes, aux ${h.ext(R434, 'articles R434-7 à R434-11 du CESEDA')} notamment ; aucune préfecture ne publie la durée moyenne réelle.</p>
${h.table(['Étape', 'Délai légal', 'Exemple'], [
  ['Ouverture de la demande', `${h.num(RF.sejour_min_mois)} mois de séjour`, h.date(des)],
  ['Dépôt du dossier complet', '-', h.date(depot)],
  ['Avis du maire', '2 mois', h.date(avisMaire)],
  ['Décision du préfet (sinon refus implicite)', `${h.num(RF.implicite_mois)} mois`, h.date(implicite)],
], `Calendrier type pour un premier titre obtenu le ${h.date(debut)}`, ['l', 'l', 'r'])}
<h2>Étape 5 : préparer l’arrivée de la famille</h2>
<p>Après l’accord, l’OFII prévient le maire et le consulat. Le conjoint dépose sans attendre une demande de visa de long séjour valant titre de séjour ; la famille doit entrer en France dans les trois mois suivant la délivrance des visas. Arrivé, le conjoint valide son visa en ligne dans les trois mois et paie la taxe, de ${h.eur(vls)} au tarif minoré qui s’applique au regroupement familial. La famille passe une visite médicale organisée par l’OFII, parfois dès le pays de départ ; le certificat remis à la fin est indispensable pour obtenir un titre. ${h.a('validation-vls-ts', 'Le calendrier de validation du VLS-TS')} donne les dates exactes.</p>
<!--mini:vlscout-->
<h2>Le titre de séjour de la famille, puis les timbres</h2>
<p>Dans le cas général, le conjoint demande après un an de séjour une carte de séjour temporaire vie privée et familiale. Les enfants mineurs n’ont pas besoin de titre ; devenus majeurs, ou dès 16 ans s’ils veulent travailler, ils demandent la même carte. Pour les ressortissants du Maroc et de la Tunisie, et pour ceux des pays d’Afrique liés à la France par un accord de circulation (Bénin, Burkina Faso, Cameroun, Côte d’Ivoire, Gabon, Mali, Sénégal, Togo notamment), la famille obtient le même titre que le demandeur : carte temporaire ou carte de résident, à demander dans les deux mois de l’arrivée. Chaque titre de la famille coûte ${h.eur(carte)} en timbres fiscaux ; si le membre de la famille est entré sans visa de long séjour, le visa de régularisation porte la somme à ${h.eur(sansVisa)}, dont ${h.eur(T.visa_regularisation_non_remboursable)} payés au dépôt et non remboursables. Ces montants suivent ${h.src('sp_A18881', 'la hausse du 1er mai 2026')}.</p>
<h2>Les familles qui suivent une autre procédure</h2>
<p>${h.src('sp_F11168', 'Service-Public.fr le rappelle')} : le regroupement familial ne concerne que la famille d’un étranger non européen. Le conjoint d’un Français, le parent d’un enfant français, la famille d’un Européen, celle d’un réfugié ou d’un protégé subsidiaire (réunification familiale), celle d’un résident de longue durée-UE venu d’un autre pays européen et celle d’un titulaire de carte talent (${h.a('carte-talent-famille', 'carte talent-famille')}) obtiennent un visa par une autre voie, souvent plus rapide. La famille déjà présente en France peut exceptionnellement bénéficier d’un regroupement sur place. Information, pas un conseil juridique : en cas de refus, une association d’aide aux étrangers ou un avocat peuvent vous accompagner dans le recours.</p>
`,
  },
  en: {
    slug: 'family-reunification-steps',
    nav: 'Family reunification: steps',
    card: 'From the OFII application to your family’s first permit: every step and every legal deadline.',
    title: 'Family Reunification Steps 2026: Procedure and Deadlines',
    description: 'Family reunification steps 2026: OFII file, mayor’s opinion within 2 months, prefect’s decision within 6, visa, validation, medical check and stamp costs.',
    h1: 'Family reunification in France: the steps and their deadlines',
    intro: 'From OFII’s filing certificate to your spouse’s first residence permit, here is the order of the steps and the only deadlines the law sets.',
    resume: `Family reunification (regroupement familial) runs in five stages: check the conditions, build the file, send it to OFII (the French immigration and integration office), wait for the mayor’s review and the prefect’s decision, then prepare the family’s arrival. You can only apply after ${RF.sejour_min_mois} months of lawful residence: if your first permit began on ${dE(debut)}, the application opens on ${dE(des)}. For a complete file lodged on ${dE(depot)}, the mayor must give an opinion within two months, by ${dE(avisMaire)}, otherwise it counts as favourable; the prefect must notify a decision within ${RF.implicite_mois} months, by ${dE(implicite)}, after which silence means refusal. Once approved, your spouse applies for a long-stay visa, enters France within three months, validates the visa online for a ${eE(vls)} tax, has the OFII medical check and, the following year, pays ${eE(carte)} for a first card. Prefectures publish no average processing times.`,
    faqs: [
      { q: 'Where do I send a family-reunification application?', a: 'To OFII, the French immigration and integration office, either online or by registered post with proof of receipt, never both. OFII checks that the file is complete, issues a dated filing certificate (attestation de dépôt) and informs the prefect. An incomplete file is sent back to you to be completed.' },
      { q: 'What does the mayor do in a family-reunification case?', a: 'OFII asks the mayor to examine income and housing. The mayor checks the conditions, may have authorised officers visit the home and, if the prefect asks, can check lawful residence and respect for the principles of family life. The mayor gives a reasoned opinion within two months; after that, the opinion counts as favourable.' },
      { q: 'What happens if the prefect does not answer?', a: `If no decision is notified within ${RF.implicite_mois} months of the complete file being lodged, the application is implicitly refused. You can then ask the prefect to reconsider (recours gracieux), appeal to the Interior Minister and take the case to the administrative court within the time limits. An explicit refusal must give reasons.` },
      { q: 'How long does the family have to travel after the visa?', a: 'It must enter France within three months of the visas being issued, and pays its own travel costs. The spouse receives a long-stay visa that serves as a residence permit (VLS-TS), to be validated online within three months of arrival; minor children travel on a visa marked family reunification.' },
      { q: 'Can only part of the family come?', a: 'Normally no: all members must arrive together. A partial reunification can exceptionally be accepted in the children’s interest, for example for schooling, health, or because the home is too small for everyone. It must be justified in a reasoned letter attached to the file when it is lodged.' },
      { q: 'Can my parents come through family reunification?', a: 'No. The procedure only covers a legally married adult spouse and minor children. Parents may be able to settle in France on a visitor card if they have enough resources of their own. The family of a French national, an EU citizen or a refugee follows other procedures.' },
    ],
    body: (h) => `
<h2>Step 1: check the conditions</h2>
<p>When you apply, you must hold a residence card valid for at least one year, a multi-year card, a resident card, or the receipt (récépissé) for renewing one of these. Above all, you must have lived in France for at least ${h.num(RF.sejour_min_mois)} months; that time may have been spent on a long-stay visa serving as a permit, a card of less than a year, a temporary permit, a receipt or an asylum-application certificate. Then come income (${h.a('regroupement-familial', 'income calculator')}), housing (${h.a('logement-regroupement-familial', 'floor-area calculator')}) and respect for the basic principles of family life in France. Polygamy rules out bringing a second wife. The rules are in ${h.ext(L434, 'CESEDA (immigration code), articles L434-1 to L434-12')}.</p>
<p>Mayotte has its own rules: you must have lived there for at least three years on a permit of at least five years. Family members are a legally married spouse aged at least 18 and children under 18: the couple’s own, or a previous partner’s if the other parent has died, lost parental authority, or a foreign court has granted parental authority. Ages are assessed on the filing date.</p>
<h2>Step 2: build the file</h2>
<p>The file contains the official application form (cerfa), a two-sided copy of your permit, full copies of civil-status records (marriage and everyone’s birth) translated by a sworn translator, twelve months of income evidence and proof of housing. Income evidence depends on your situation: tax notice and payslips for an employee, an extract from the national business register and accounts for a trader or craftsman, a France Travail statement for a jobseeker, the award letter for a pensioner. Housing is shown by the lease and last rent receipt, the title deed or a statement from the person housing you. ${h.src('sp_F11166', 'The official page')} lists everything case by case.</p>
<h2>Step 3: sending the file to OFII</h2>
<p>The file goes to OFII online or by registered letter. If complete, OFII issues a filing certificate showing the date: it starts the legal clock and lets your family begin the visa application. Keep it safe and send it, with the civil-status documents, to your family abroad as soon as you receive it. The calculator below gives the date the application opens and, if you file on that day, the date of implicit refusal.</p>
<h2>Step 4: the mayor’s review, then the prefect’s decision</h2>
<p>The mayor of your town, or of the town where you plan to live, examines income and housing. The mayor has two months to give an opinion, and silence counts as favourable. The file then returns to OFII’s regional office, which completes the review if needed and sends it to the prefect of the département (in Paris, the police prefect). The prefect has ${h.num(RF.implicite_mois)} months from the complete filing to notify a decision. These are the only periods set by law, notably in ${h.ext(R434, 'articles R434-7 to R434-11 of the CESEDA')}; no prefecture publishes its actual average.</p>
${h.table(['Step', 'Legal period', 'Example'], [
  ['Application opens', `${h.num(RF.sejour_min_mois)} months of residence`, h.date(des)],
  ['Complete file lodged', '-', h.date(depot)],
  ['Mayor’s opinion', '2 months', h.date(avisMaire)],
  ['Prefect’s decision (or implicit refusal)', `${h.num(RF.implicite_mois)} months`, h.date(implicite)],
], `Sample timetable for a first permit starting on ${h.date(debut)}`, ['l', 'l', 'r'])}
<h2>Step 5: preparing the family’s arrival</h2>
<p>After approval, OFII informs the mayor and the consulate. Your spouse should apply straight away for a long-stay visa serving as a residence permit; the family must enter France within three months of the visas being issued. Once here, the spouse validates the visa online within three months and pays the tax, ${h.eur(vls)} at the reduced rate that applies to family reunification. The family has a medical check organised by OFII, sometimes in the country of departure; the certificate issued afterwards is essential to obtain a permit. ${h.a('validation-vls-ts', 'The VLS-TS validation timetable')} gives the exact dates.</p>
<!--mini:vlscout-->
<h2>The family’s residence permit, and the stamps</h2>
<p>In most cases, your spouse applies after a year for a temporary private and family life card (vie privée et familiale). Minor children need no permit; once adults, or from 16 if they want to work, they apply for the same card. For nationals of Morocco and Tunisia, and of the African countries with a movement agreement with France (including Benin, Burkina Faso, Cameroon, Côte d’Ivoire, Gabon, Mali, Senegal and Togo), the family receives the same permit as the sponsor, temporary or resident card, to be requested within two months of arrival. Each family member’s permit costs ${h.eur(carte)} in tax stamps; if that person entered without a long-stay visa, the regularisation fee brings it to ${h.eur(sansVisa)}, ${h.eur(T.visa_regularisation_non_remboursable)} of it paid at filing and non-refundable. These amounts follow ${h.src('sp_A18881', 'the increase of 1 May 2026')}.</p>
<h2>Families that follow another procedure</h2>
<p>${h.src('sp_F11168', 'As Service-Public.fr points out')}, family reunification only covers the family of a non-EU foreign national. The spouse of a French national, the parent of a French child, the family of an EU citizen, of a refugee or subsidiary-protection holder (family reunification for refugees, réunification familiale), of an EU long-term resident arriving from another EU country, and of a talent-card holder (${h.a('carte-talent-famille', 'talent-family card')}) get their visa another way, often faster. A family already in France can exceptionally be reunited on the spot. This is information, not legal advice: if you are refused, a migrant-support association or a lawyer can help with the appeal.</p>
`,
  },
});
