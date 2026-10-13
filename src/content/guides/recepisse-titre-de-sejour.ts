import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { fenetreRenouvellement } from '../../lib/engine/dates-sejour';
import { addDays, addMonths } from '../../lib/engine/dates';
import { displayDate } from '../../lib/format';

const RN = P.renouvellement;
// Trois cartes qui expirent : le récépissé de renouvellement commence le lendemain, pour 3 mois.
const CAS = ['2027-03-31', '2027-06-30', '2026-12-15'].map((fin) => ({ fin, w: fenetreRenouvellement(fin, fin), debut: addDays(fin, 1) }));
const c0 = CAS[0];
// Première demande : récépissé de 4 ou 6 mois, renouvelable exceptionnellement 3 mois.
const PREMIER = '2026-10-13';
const p4 = addMonths(PREMIER, 4), p6 = addMonths(PREMIER, 6), p6plus = addMonths(p6, RN.recepisse_mois);
const R431 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000043288804/';
const R431_15 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000043288806/';
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'recepisse-titre-de-sejour',
  group: 'demarches',
  order: 50,
  mini: 'recepisse',
  miniHref: 'renouvellement-titre-de-sejour',
  related: ['renouvellement-titre-de-sejour', 'anef-titre-de-sejour', 'delai-titre-de-sejour', 'duplicata-titre-de-sejour', 'titre-de-sejour'],
  sources: ['sp_F15763', 'sp_F36206', 'ceseda_r431'],
  fr: {
    slug: 'recepisse-titre-de-sejour',
    nav: 'Récépissé et attestation',
    card: 'Durée du récépissé, attestation de prolongation ANEF, droit de travailler pendant l’examen.',
    title: 'Récépissé titre de séjour 2026 : durée, attestation, travail',
    description: `Récépissé de titre de séjour en 2026 : ${RN.recepisse_mois} mois en renouvellement dès le lendemain de l’expiration, 4 ou 6 mois en 1re demande, attestation ANEF, travail.`,
    h1: 'Récépissé de demande de titre de séjour : durée et droits',
    intro: 'Entre le dépôt et la remise de la carte, un document provisoire vous couvre : récépissé en préfecture, attestation sur l’ANEF.',
    resume: `Le récépissé est le document provisoire remis quand une demande de titre de séjour complète est enregistrée en préfecture ; sur le portail ANEF, il prend la forme d’une attestation. En renouvellement ou pour un duplicata, il est valable ${RN.recepisse_mois} mois et commence le lendemain de la fin de la carte : pour une carte qui expire le 31 mars 2027, il couvre du ${dF(c0.debut)} au ${dF(c0.w.recepisseFin)}, et peut être renouvelé. Pour une première demande, il dure 4 ou 6 mois, et peut exceptionnellement être prolongé de 3 mois. Sur l’ANEF, seule l’attestation de prolongation d’instruction prouve la régularité du séjour : valable ${RN.recepisse_mois} mois au plus, elle est renouvelée tant que la préfecture n’a pas statué, à condition d’avoir déposé un dossier complet dans les délais. L’attestation de simple dépôt, elle, n’est pas un document de séjour. En renouvellement, le récépissé proroge les droits de l’ancienne carte, y compris le droit de travailler quand elle le donnait.`,
    faqs: [
      { q: 'L’attestation de dépôt ANEF vaut-elle récépissé ?', a: 'Non. L’attestation de dépôt en ligne, reçue immédiatement après l’envoi du dossier, prouve seulement que la demande a été transmise : elle n’est pas un document provisoire de séjour et n’a pas de durée de validité. C’est l’attestation de prolongation d’instruction, délivrée ensuite pour un dossier complet déposé dans les délais, qui justifie de la régularité du séjour.' },
      { q: 'Que faire quand le récépissé arrive à sa fin sans décision ?', a: `En demander le renouvellement à la préfecture ou à la sous-préfecture qui l’a délivré, selon la procédure qu’elle indique sur son site. Sur l’ANEF, l’attestation de prolongation d’instruction, valable ${RN.recepisse_mois} mois au plus, est renouvelée par la préfecture tant qu’aucune décision n’est prise. Conservez les versions successives : ensemble, elles prouvent la continuité de votre séjour régulier.` },
      { q: 'Un récépissé de première demande permet-il de travailler ?', a: 'Seulement pour certaines cartes, dont la carte salarié ou travailleur temporaire déposée avec une autorisation de travail, la carte recherche d’emploi ou création d’entreprise, la plupart des cartes vie privée et familiale, la carte salarié détaché ICT, la carte protection subsidiaire et la carte de résident demandée en préfecture. Pour une carte étudiant ou visiteur, le récépissé de première demande ne donne pas ce droit.' },
      { q: 'Le récépissé permet-il de quitter la France et d’y revenir ?', a: 'La fiche Service-Public sur l’attestation ANEF renvoie à une liste officielle des documents qui autorisent le retour dans l’espace Schengen. Tous les documents provisoires n’y figurent pas. Avant un voyage pendant l’examen de votre demande, vérifiez que le vôtre est sur cette liste ; sinon, le retour peut exiger un visa.' },
      { q: 'La date de début du récépissé de renouvellement est-elle celle du dépôt ?', a: `Non. En renouvellement, la validité commence le lendemain de la date de fin de la carte, pas le jour du dépôt. Pour une carte expirant le 30 juin 2027, le récépissé court du ${dF(CAS[1].debut)} au ${dF(CAS[1].w.recepisseFin)}. Entre le dépôt et l’expiration, c’est la carte elle-même qui vous couvre.` },
    ],
    body: (h) => `
<h2>Trois documents qui se ressemblent</h2>
<p>Le mot récépissé désigne en pratique trois documents différents selon le canal de dépôt. En préfecture, un dossier complet donne un récépissé papier. Sur l’ANEF, le téléservice délivre une attestation de dépôt immédiate, puis, si le dossier est complet et déposé dans les délais, une attestation de prolongation de l’instruction, et enfin une attestation de décision favorable quand la préfecture accepte. ${h.src('sp_F36206', 'La fiche Service-Public sur les attestations ANEF')}, vérifiée en décembre 2023, les décrit une à une ; ${h.src('sp_F15763', 'la fiche Récépissé')}, vérifiée en novembre 2023, couvre le dépôt en préfecture. Les deux renvoient au ${h.ext(R431, 'CESEDA, articles R431-12 à R431-15')} et au ${h.ext(R431_15, 'CESEDA, articles R431-15-1 et R431-15-2')}.</p>
${h.table(['Document', 'Canal', 'Vaut séjour régulier', 'Durée'], [
  ['Récépissé de première demande', 'Préfecture', 'oui', '4 ou 6 mois'],
  ['Récépissé de renouvellement ou de duplicata', 'Préfecture', 'oui', `${h.num(RN.recepisse_mois)} mois, renouvelable`],
  ['Attestation de dépôt', 'ANEF', 'non', 'aucune'],
  ['Attestation de prolongation d’instruction', 'ANEF', 'oui', `${h.num(RN.recepisse_mois)} mois au plus, renouvelée`],
  ['Attestation de décision favorable', 'ANEF', 'oui, jusqu’à la remise', 'jusqu’à la remise de la carte'],
], 'Documents provisoires selon les fiches F15763 et F36206', ['l', 'l', 'l', 'l'])}
<h2>Les dates, cas par cas</h2>
<p>En renouvellement, la règle est mécanique : le récépissé commence le lendemain de la fin de la carte et dure ${h.num(RN.recepisse_mois)} mois. Le moteur du site applique cette règle de date à date, en ramenant au dernier jour du mois un quantième qui n’existe pas.</p>
${h.table(['Carte expirant le', 'Dépôt au plus tard le', 'Récépissé à partir du', 'Récépissé jusqu’au'], CAS.map((c) => [h.date(c.fin), h.date(c.w.limite), h.date(c.debut), h.date(c.w.recepisseFin)]), 'Dates calculées par le moteur du site', ['l', 'r', 'r', 'r'])}
<p>Pour une première demande, la durée est de 4 ou 6 mois, le temps de l’instruction et de la fabrication de la carte. Un récépissé remis le ${h.date(PREMIER)} court donc jusqu’au ${h.date(p4)} ou jusqu’au ${h.date(p6)}. Il ne peut être prolongé qu’exceptionnellement, pour 3 mois au plus, soit au plus tard jusqu’au ${h.date(p6plus)} dans le second cas. La fiche officielle ne dit pas selon quel critère la préfecture choisit 4 ou 6 mois : regardez la date imprimée sur le vôtre.</p>
<h2>Travailler pendant l’examen</h2>
<p>En renouvellement, la règle est simple : le récépissé proroge les droits de la carte précédente. Si votre carte salarié, vie privée et familiale ou talent vous permettait de travailler, vous continuez. Sur l’ANEF, l’attestation permet de travailler seulement si la carte dont vous demandez le renouvellement vous y autorisait.</p>
<p>En première demande, tout dépend de la carte demandée. Le récépissé de préfecture permet de travailler pour une carte salarié ou travailleur temporaire déposée à l’appui d’une autorisation de travail, une carte recherche d’emploi ou création d’entreprise, une carte vie privée et familiale sauf exceptions, une carte salarié détaché ICT, une carte travailleur saisonnier déposée avec une autorisation de travail, une carte protection subsidiaire ou apatride, ou une carte de résident demandée en préfecture. L’attestation ANEF suit une liste voisine : salarié, travailleur temporaire, conjoint ou parent de Français, regroupement familial, recherche d’emploi, talent et talent-famille, saisonnier, ICT, protection subsidiaire et apatride, et plusieurs motifs de carte de résident comme le conjoint de Français, le réfugié ou le retraité.</p>
<p>Pour un Algérien, le récépissé permet de travailler en cas de renouvellement d’un certificat de résidence d’un an vie privée et familiale ou d’un certificat de dix ans.</p>
<!--mini:fenetre-->
<h2>Un exemple du début à la fin</h2>
<p>Prenons une carte vie privée et familiale qui expire le ${h.date(c0.fin)}. La fenêtre de dépôt sur l’ANEF s’ouvre le ${h.date(c0.w.ouverture)} et se ferme le ${h.date(c0.w.limite)}. Le jour du dépôt, le téléservice remet l’attestation de dépôt, qui ne vaut pas titre. Si le dossier est complet et déposé dans cette fenêtre, l’attestation de prolongation d’instruction suit ; elle vous couvre à partir de l’expiration de la carte, pour ${h.num(RN.recepisse_mois)} mois au plus, soit jusqu’au ${h.date(c0.w.recepisseFin)}, puis elle est renouvelée si la décision n’est pas encore prise. Quand la préfecture accepte, l’attestation de décision favorable vous couvre jusqu’à la remise de la carte, contre le timbre fiscal du renouvellement.</p>
<p>Trois réflexes évitent la plupart des difficultés : déposer dans la fenêtre, enregistrer chaque attestation dès qu’elle arrive dans votre espace, et vérifier avant un voyage que le document en cours figure sur la liste officielle des documents permettant le retour dans l’espace Schengen.</p>
<h2>Ce qui fait perdre la protection du récépissé</h2>
<p>La protection suppose un dossier complet. Sur l’ANEF, l’attestation de prolongation d’instruction n’est délivrée que pour un dossier complet déposé dans le délai imposé, c’est-à-dire au plus tard ${h.num(RN.au_plus_tard_mois)} mois avant la fin du titre. Un dépôt tardif ou incomplet laisse un trou entre la fin de la carte et la décision : pendant ce trou, rien ne prouve la régularité de votre séjour, ce qui gêne l’employeur, la banque ou la caisse d’allocations. ${h.a('renouvellement-titre-de-sejour', 'Le calendrier de renouvellement')} donne la date limite de votre carte et le prix du retard.</p>
<p>Le récépissé ne préjuge pas de la décision : la préfecture peut encore refuser le titre. En cas de silence, la date du refus implicite se calcule sur ${h.a('delai-titre-de-sejour', 'la page Délai de réponse')}. Information générale, pas un conseil juridique ; site indépendant de l’administration.</p>
`,
  },
  en: {
    slug: 'residence-permit-receipt',
    nav: 'Receipt and certificates',
    card: 'How long the receipt lasts, the ANEF extension certificate, working while your file is examined.',
    title: 'Residence Permit Receipt 2026: Validity, Certificates, Work',
    description: `Residence permit receipt (récépissé) 2026: ${RN.recepisse_mois} months on renewal from the day after expiry, 4 or 6 months for a first application, ANEF certificates, work.`,
    h1: 'The récépissé: how long it covers you and what it allows',
    intro: 'Between filing and collecting your card, a temporary document covers you: a receipt at the prefecture, a certificate on ANEF.',
    resume: `The récépissé is the temporary document you receive when a complete residence permit application is registered at the prefecture; on the ANEF online portal it takes the form of a certificate (attestation). For a renewal or a replacement it lasts ${RN.recepisse_mois} months and starts the day after your card expires: for a card ending on 31 March 2027 it covers you from ${dE(c0.debut)} to ${dE(c0.w.recepisseFin)}, and it can be renewed. For a first application it lasts 4 or 6 months and can exceptionally be extended by 3 months. On ANEF, only the certificate extending the examination (attestation de prolongation d’instruction) proves lawful residence: it lasts ${RN.recepisse_mois} months at most and is renewed until the prefecture decides, provided you filed a complete application on time. The simple filing certificate is not a residence document at all. On renewal, the receipt extends the rights of your old card, including the right to work if the card gave it.`,
    faqs: [
      { q: 'Is the ANEF filing certificate the same as a receipt?', a: 'No. The online filing certificate, received straight after you send the file, only proves the application was submitted: it is not a temporary residence document and has no validity period. The certificate extending the examination, issued later for a complete file filed on time, is the one that proves your stay is lawful.' },
      { q: 'What if my receipt runs out before a decision?', a: `Ask the prefecture or sub-prefecture that issued it to renew it, following the procedure on its website. On ANEF, the certificate extending the examination, valid for ${RN.recepisse_mois} months at most, is renewed by the prefecture until a decision is made. Keep every successive version: together they prove that your lawful stay was continuous.` },
      { q: 'Can I work on a first-application receipt?', a: 'Only for certain cards, including an employee or temporary-worker card filed with a work authorisation, the job-search or business-creation card, most private and family life cards, the ICT card, the subsidiary-protection card and a resident card applied for at the prefecture. For a student or visitor card, a first-application receipt does not give that right.' },
      { q: 'Can I leave France and come back on a receipt?', a: 'The Service-Public page on ANEF certificates refers to an official list of documents that allow re-entry into the Schengen area. Not every temporary document is on it. Before travelling while your application is being examined, check that yours is listed; if it is not, coming back may require a visa.' },
      { q: 'Does a renewal receipt start on the filing date?', a: `No. On renewal, validity starts the day after your card ends, not the day you file. For a card expiring on 30 June 2027, the receipt runs from ${dE(CAS[1].debut)} to ${dE(CAS[1].w.recepisseFin)}. Between filing and expiry, the card itself still covers you.` },
    ],
    body: (h) => `
<h2>Three documents that look alike</h2>
<p>In practice "récépissé" covers three different documents depending on how you filed. At the prefecture, a complete file gets a paper receipt. On ANEF, the portal issues an instant filing certificate; then, if the file is complete and on time, a certificate extending the examination; and finally a certificate of favourable decision once the prefecture approves. ${h.src('sp_F36206', 'The Service-Public page on ANEF certificates')}, checked in December 2023, describes each one; ${h.src('sp_F15763', 'the receipt page')}, checked in November 2023, covers prefecture filings. Both refer to ${h.ext(R431, 'CESEDA (immigration code), articles R431-12 to R431-15')} and ${h.ext(R431_15, 'CESEDA, articles R431-15-1 and R431-15-2')}.</p>
${h.table(['Document', 'Channel', 'Proves lawful stay', 'Length'], [
  ['First-application receipt', 'Prefecture', 'yes', '4 or 6 months'],
  ['Renewal or replacement receipt', 'Prefecture', 'yes', `${h.num(RN.recepisse_mois)} months, renewable`],
  ['Filing certificate', 'ANEF', 'no', 'none'],
  ['Certificate extending the examination', 'ANEF', 'yes', `${h.num(RN.recepisse_mois)} months at most, renewed`],
  ['Certificate of favourable decision', 'ANEF', 'yes, until collection', 'until the card is collected'],
], 'Temporary documents according to official pages F15763 and F36206', ['l', 'l', 'l', 'l'])}
<h2>The dates, case by case</h2>
<p>On renewal, the rule is mechanical: the receipt starts the day after the card ends and lasts ${h.num(RN.recepisse_mois)} months. The site's engine applies it date to date, moving a day that does not exist in a shorter month back to its last day.</p>
${h.table(['Card ending on', 'File by', 'Receipt from', 'Receipt until'], CAS.map((c) => [h.date(c.fin), h.date(c.w.limite), h.date(c.debut), h.date(c.w.recepisseFin)]), 'Dates worked out by the site’s engine', ['l', 'r', 'r', 'r'])}
<p>For a first application, the receipt lasts 4 or 6 months, the time needed to examine the file and produce the card. A receipt issued on ${h.date(PREMIER)} therefore runs until ${h.date(p4)} or until ${h.date(p6)}. It can only be extended exceptionally, by 3 months at most, so until ${h.date(p6plus)} at the latest in the second case. The official page does not say how the prefecture chooses between 4 and 6 months: read the date printed on yours.</p>
<h2>Working while the file is examined</h2>
<p>On renewal the rule is simple: the receipt extends the rights of the previous card. If your employee, private and family life or talent card let you work, you carry on. On ANEF, the certificate lets you work only if the card you are renewing allowed it.</p>
<p>For a first application, it depends on the card requested. A prefecture receipt lets you work for an employee or temporary-worker card filed with a work authorisation, a job-search or business-creation card, a private and family life card (with some exceptions), an ICT card, a seasonal-worker card filed with a work authorisation, a subsidiary-protection or stateless-person card, or a resident card applied for at the prefecture. The ANEF certificate follows a similar list: employee, temporary worker, spouse or parent of a French national, family reunification, job search, talent and talent-family, seasonal worker, ICT, subsidiary protection and statelessness, and several resident-card grounds such as spouse of a French national, refugee or retiree.</p>
<p>For an Algerian national, the receipt allows work when renewing a one-year private and family life residence certificate or a ten-year certificate.</p>
<!--mini:fenetre-->
<h2>One example from start to finish</h2>
<p>Take a private and family life card ending on ${h.date(c0.fin)}. The ANEF filing window opens on ${h.date(c0.w.ouverture)} and closes on ${h.date(c0.w.limite)}. On the day you file, the portal issues the filing certificate, which is not a permit. If the file is complete and lodged inside that window, the certificate extending the examination follows; it covers you from the day your card expires, for ${h.num(RN.recepisse_mois)} months at most, that is until ${h.date(c0.w.recepisseFin)}, and is then renewed if no decision has been made. Once the prefecture approves, the certificate of favourable decision covers you until you collect the card, paying the renewal tax stamp at that point.</p>
<p>Three habits prevent most problems. File inside the window, because a late file loses the extension certificate. Save each certificate as soon as it appears in your ANEF account, since an employer or the family-benefits office may ask for the one currently valid. And before any trip abroad, check that the document you hold is on the official list of documents allowing re-entry into the Schengen area; if it is not, postpone the trip or ask the prefecture what applies to you.</p>
<p>Keep in mind that these documents carry dates set by the administration. The calculator on this page reproduces the rules, but the date printed on your own receipt or certificate is the one that counts in any check.</p>
<h2>What makes you lose the receipt’s protection</h2>
<p>Protection depends on a complete file. On ANEF, the certificate extending the examination is only issued for a complete file filed within the required period, meaning at the latest ${h.num(RN.au_plus_tard_mois)} months before the permit ends. A late or incomplete file leaves a gap between the end of your card and the decision; during that gap nothing proves your stay is lawful, which causes trouble with employers, banks and the family-benefits office (CAF). ${h.a('renouvellement-titre-de-sejour', 'The renewal timetable')} gives your card's deadline and what being late costs.</p>
<p>A receipt says nothing about the outcome: the prefecture can still refuse the permit. If it stays silent, the implicit-refusal date is worked out on ${h.a('delai-titre-de-sejour', 'the response deadline page')}. General information, not legal advice; an independent site, not run by the French administration.</p>
`,
  },
});
