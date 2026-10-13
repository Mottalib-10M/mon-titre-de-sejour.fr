import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { refusImplicite } from '../../lib/engine/dates-sejour';
import { addMonths } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

const T = P.tarifs;
const aes = coutTitre('admission_exceptionnelle', 'premiere', { sansVisa: true });
const aesSansRegul = coutTitre('admission_exceptionnelle', 'premiere').total;
const salTravail = coutTitre('salarie', 'premiere', { sansVisa: true }).total;
const renouv = coutTitre('admission_exceptionnelle', 'renouvellement').total;
const nonRemb = T.visa_regularisation_non_remboursable;
const resteAccord = T.visa_regularisation - nonRemb;
// Exemple de calendrier : dépôt le 2 novembre 2026.
const depot = '2026-11-02';
const implicite = refusImplicite(depot, { mois: P.titres.find((t) => t.id === 'admission_exceptionnelle')!.implicite_mois })!;
const recours = addMonths(implicite, P.recours.mois);
const LF = {
  l435: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042772028/',
  circ: 'https://www.legifrance.gouv.fr/download/pdf/circ?id=45584',
  tension: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051643488',
};
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'admission-exceptionnelle-au-sejour',
  group: 'titres',
  order: 80,
  mini: 'regul',
  miniHref: 'cout-titre-de-sejour',
  related: ['vie-privee-et-familiale', 'autorisation-de-travail', 'cout-titre-de-sejour', 'delai-titre-de-sejour', 'recepisse-titre-de-sejour'],
  sources: ['sp_F17146', 'sp_F16053', 'sp_F2209', 'sp_A18881'],
  fr: {
    slug: 'admission-exceptionnelle-au-sejour',
    nav: 'Admission exceptionnelle au séjour',
    card: 'Régularisation au cas par cas : 7 ans de présence, métiers en tension, coût avec le visa de régularisation.',
    title: 'Admission exceptionnelle au séjour 2026 : conditions et coût',
    description: 'Admission exceptionnelle au séjour 2026 : 7 ans de présence en principe, métiers en tension jusqu’au 31 décembre 2026, visa de régularisation, coût et recours.',
    h1: 'Admission exceptionnelle au séjour : la régularisation au cas par cas',
    intro: 'Sans titre de séjour, une seule porte reste ouverte : convaincre le préfet que votre situation justifie une carte, à des conditions qu’il apprécie librement.',
    resume: `L’admission exceptionnelle au séjour permet à un étranger non européen en situation irrégulière de demander une carte de séjour vie privée et familiale, salarié ou travailleur temporaire pour des motifs humanitaires ou exceptionnels. Elle n’est jamais automatique : le préfet décide au cas par cas, avec un pouvoir discrétionnaire. Depuis la circulaire du 23 janvier 2025, une présence en France d’au moins 7 ans est attendue, sauf exception, ainsi qu’une intégration appréciée notamment par la maîtrise du français ; au-delà de 10 ans de présence, le préfet doit consulter la commission du titre de séjour avant un refus. Pour les métiers et zones en tension, jusqu’au 31 décembre 2026, il suffit de 3 ans de présence et de 12 mois de travail sur les 24 derniers mois. Le coût, si la carte est accordée, est de ${eF(aes.total)} : ${eF(aesSansRegul)} de timbres et ${eF(T.visa_regularisation)} de visa de régularisation, dont ${eF(nonRemb)} payés au dépôt et perdus en cas de refus. La carte accordée est d’un an.`,
    faqs: [
      { q: 'Combien d’années de présence faut-il pour une admission exceptionnelle ?', a: 'La fiche officielle, vérifiée le 12 mars 2025, indique une durée de présence en France qui doit, sauf exception, être d’au moins 7 ans. Pour les métiers et zones en tension, la condition est de 3 ans de présence ininterrompue avec 12 mois de travail sur 24 mois. Une durée plus courte n’interdit pas la demande, mais elle rend l’accord peu probable.' },
      { q: 'Le visa de régularisation est-il remboursé si la carte est refusée ?', a: `Pas en totalité. Sur les ${eF(T.visa_regularisation)} du visa de régularisation, ${eF(nonRemb)} se paient dès le dépôt de la demande et restent acquis même si la préfecture refuse. Les ${eF(resteAccord)} restants ne sont dus qu’en cas d’accord, avec les ${eF(aesSansRegul)} de timbres de la carte.` },
      { q: 'Qu’apporte la commission du titre de séjour après 10 ans en France ?', a: 'Si vous résidez en France depuis plus de 10 ans et que le préfet envisage de refuser, il doit d’abord saisir la commission du titre de séjour pour avis, avec vos preuves de présence. Cet avis ne lie pas le préfet, mais il impose un examen contradictoire de votre dossier avant toute décision défavorable.' },
      { q: 'Peut-on travailler pendant l’examen d’une régularisation par le travail ?', a: 'Dans la procédure des métiers et zones en tension, oui : si le dossier est complet, la préfecture délivre un récépissé qui autorise à travailler. Dans le cas général, la fiche ne prévoit pas cette autorisation pendant l’instruction ; seul le titre accordé, carte salarié pour un CDI ou travailleur temporaire pour un CDD, ouvre le droit au travail.' },
      { q: 'Que faire si la préfecture ne répond pas à une demande de régularisation ?', a: `Le silence pendant 4 mois vaut refus implicite. Pour un dépôt le ${dF(depot)}, ce refus naît le ${dF(implicite)} et le délai de recours de 2 mois court jusqu’au ${dF(recours)}. Vous pouvez saisir le préfet, le ministre de l’Intérieur ou le tribunal administratif ; l’avocat n’est pas obligatoire.` },
    ],
    body: (h) => `
<h2>Ce que recouvre l’admission exceptionnelle</h2>
<p>L’admission exceptionnelle au séjour (AES) est une voie de régularisation pour l’étranger non européen présent en France sans titre. Elle repose sur ${h.ext(LF.l435, 'les articles L435-1 à L435-4 du CESEDA')} et sur les orientations données aux préfets par ${h.ext(LF.circ, 'la circulaire du 23 janvier 2025')}. Trois familles de motifs peuvent être invoquées : la vie privée et familiale (ancienneté de séjour, liens privés et familiaux, enfant scolarisé en France, violences subies), le travail (ancienneté de séjour et d’emploi), et un talent exceptionnel ou des services rendus à la collectivité dans les domaines culturel, sportif, associatif, civique ou économique.</p>
<p>Selon le motif, la préfecture délivre une carte vie privée et familiale, ou une carte salarié ou travailleur temporaire. Le point commun est l’absence de droit : le préfet dispose d’un pouvoir discrétionnaire et apprécie chaque dossier. ${h.src('sp_F17146', 'La fiche officielle sur la régularisation humanitaire ou exceptionnelle')} le rappelle ; elle a été vérifiée le 12 mars 2025, avant la hausse des taxes de mai 2026, et nous appliquons pour le coût le barème en vigueur.</p>
<h2>Les critères examinés</h2>
<ul>
<li><strong>Durée de présence</strong> : au moins 7 ans en principe, sauf exception.</li>
<li><strong>Intégration</strong> : appréciée notamment par la maîtrise du français, attestée par un diplôme français ou une certification d’un organisme agréé.</li>
<li><strong>Ordre public</strong> : pas de menace, pas d’obligation de quitter le territoire non exécutée, pas de polygamie en France.</li>
<li><strong>Principes de la République</strong> : signature du contrat d’engagement à les respecter.</li>
</ul>
<p>Au-delà de 10 ans de présence en France, le préfet qui envisage un refus doit saisir la commission du titre de séjour pour avis. Les preuves de présence année par année deviennent alors l’essentiel du dossier : avis d’imposition, attestations d’aide médicale de l’État, bulletins de salaire, certificats de scolarité des enfants.</p>
<h2>La régularisation par le travail</h2>
<p>${h.src('sp_F16053', 'La fiche sur la régularisation par le travail')} distingue deux procédures. Dans le cas général, la préfecture peut exiger 7 ans de séjour ; le dossier comprend le formulaire cerfa n° 15186 rempli et signé par l’employeur et les preuves d’activité salariée passée. En cas d’accord, un CDI donne une carte salarié d’un an renouvelable, un CDD une carte travailleur temporaire pour la durée du contrat.</p>
<p>Pour les métiers et zones géographiques en tension, dont la liste est fixée par ${h.ext(LF.tension, 'l’arrêté du 21 mai 2025')}, la procédure reste ouverte jusqu’au 31 décembre 2026. Il faut 3 ans de présence ininterrompue et 12 mois d’activité sur les 24 derniers mois dans un métier et une zone en tension. Les périodes travaillées sous titre étudiant ou saisonnier, sous attestation de demandeur d’asile ou comme entrepreneur ne comptent pas. Ici, c’est le demandeur qui remplit lui-même la demande d’autorisation de travail, sans l’employeur, et le récépissé délivré sur dossier complet l’autorise à travailler.</p>
${h.table(['', 'Cas général', 'Métiers en tension'], [
  ['Présence en France', '7 ans en principe', '3 ans ininterrompus'],
  ['Travail', 'ancienneté d’emploi prise en compte', '12 mois sur les 24 derniers'],
  ['Demande d’autorisation de travail', 'par l’employeur (cerfa 15186)', 'par le demandeur'],
  ['Travail pendant l’examen', 'non prévu', 'oui, avec le récépissé'],
  ['Fin du dispositif', 'aucune', h.date('2026-12-31')],
], 'Fiche F16053, vérifiée le 3 juin 2025', ['l', 'l', 'l'])}
<h2>Combien coûte une régularisation</h2>
<p>La personne entrée sans visa de long séjour paie, en plus du prix de la carte, un visa de régularisation de ${h.eur(T.visa_regularisation)}, dont ${h.eur(nonRemb)} dès le dépôt. Pour une carte vie privée et familiale accordée à titre exceptionnel, le total atteint ${h.eur(aes.total)} : ${h.eur(aesSansRegul)} de taxe et droit de timbre, plus le visa de régularisation. Le résultat est le même pour une carte salarié obtenue par le travail : ${h.eur(salTravail)}. Le renouvellement, un an plus tard, coûte ensuite ${h.eur(renouv)}, sans visa de régularisation. Ces montants suivent ${h.src('sp_A18881', 'le barème du 1er mai 2026')}.</p>
${h.table(['Ligne', 'Montant', 'Quand'], [
  ...aes.lignes.map((l) => [l.cle === 'taxe' ? 'Taxe' : l.cle === 'timbre' ? 'Droit de timbre' : 'Visa de régularisation', h.eur(l.montant), l.cle === 'regularisation' ? `dont ${h.eur(nonRemb)} au dépôt` : 'à la remise de la carte'] as [string, string, string]),
  ['Total', h.eur(aes.total), ''],
], 'Carte accordée à une personne entrée sans visa de long séjour', ['l', 'r', 'l'])}
<h2>Préparer le dossier</h2>
<p>La liste des pièces est remise par la préfecture selon votre situation, mais quelques documents reviennent dans toutes les fiches : copie intégrale d’acte de naissance, passeport ou attestation consulaire avec photo, justificatif de domicile de moins de 6 mois, trois photos, déclaration sur l’honneur de non-polygamie si votre pays l’autorise, engagement signé à respecter les principes de la République. Le cœur du dossier reste la preuve de présence : mieux vaut plusieurs documents par année que des attestations de proches sans date. Gardez des copies de tout ce que vous déposez, et notez la date de dépôt, qui fait courir les délais.</p>
<h2>Délais et recours</h2>
<p>Aucune préfecture ne publie de délai moyen d’examen. Le seul délai fixé est celui du refus implicite : 4 mois de silence. Pour un dépôt le ${h.date(depot)}, ce refus naît le ${h.date(implicite)} ; vous avez ensuite jusqu’au ${h.date(recours)} pour un recours gracieux, hiérarchique ou contentieux. Un refus écrit est le plus souvent assorti d’une obligation de quitter le territoire, avec un délai de recours bien plus court. ${h.a('delai-titre-de-sejour', 'Le simulateur de délai')} donne la date pour chaque titre.</p>
<p>Une régularisation engage une situation entière : pour un dossier difficile, une association d’aide aux étrangers ou un avocat en droit des étrangers peuvent vous accompagner. Ce guide informe ; il ne constitue pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'exceptional-admission-france',
    nav: 'Exceptional admission',
    card: 'Case-by-case regularisation: 7 years in France, shortage occupations, cost with the regularisation fee.',
    title: 'Exceptional Admission France 2026: Conditions and Cost',
    description: 'Exceptional admission to stay in France 2026: 7 years of presence as a rule, shortage jobs until 31 December 2026, regularisation fee, total cost and appeals.',
    h1: 'Exceptional admission to stay: regularisation case by case',
    intro: 'Without a residence permit, one door stays open: persuading the prefect that your situation justifies a card, on terms the prefect weighs freely.',
    resume: `Exceptional admission to stay (admission exceptionnelle au séjour, AES) lets a non-EU national living in France without a permit apply for a private and family life, employee or temporary worker card on humanitarian or exceptional grounds. It is never automatic: the prefect decides case by case, with full discretion. Since the circular of 23 January 2025, at least 7 years of presence in France is expected unless there is an exception, along with integration judged notably on French language skills; after 10 years in France, the prefect must consult the residence permit commission before refusing. For shortage occupations and areas, until 31 December 2026, 3 years of presence and 12 months of work in the last 24 are enough. If the card is granted, it costs ${eE(aes.total)}: ${eE(aesSansRegul)} in stamps and a ${eE(T.visa_regularisation)} regularisation visa fee, ${eE(nonRemb)} of it paid at filing and lost if you are refused. The card granted lasts one year.`,
    faqs: [
      { q: 'How many years in France do I need for exceptional admission?', a: 'The official page, checked on 12 March 2025, says your presence in France should, unless there is an exception, be at least 7 years. For shortage occupations and areas, the condition is 3 years of uninterrupted presence and 12 months of work out of 24. A shorter stay does not bar you from applying, but makes approval unlikely.' },
      { q: 'Is the regularisation visa fee refunded if I am refused?', a: `Not all of it. Of the ${eE(T.visa_regularisation)} regularisation fee, ${eE(nonRemb)} is paid when you file and is kept even if the prefecture refuses. The remaining ${eE(resteAccord)} is only due if the card is granted, together with the card's ${eE(aesSansRegul)} in stamps.` },
      { q: 'What does the residence permit commission add after 10 years in France?', a: 'If you have lived in France for more than 10 years and the prefect intends to refuse, the prefect must first ask the residence permit commission (commission du titre de séjour) for an opinion, with your proof of presence. The opinion does not bind the prefect, but it ensures your file is heard before any refusal.' },
      { q: 'Can I work while a work-based regularisation is being examined?', a: 'Under the shortage-occupation procedure, yes: if the file is complete, the prefecture issues a receipt (récépissé) that allows you to work. In the general case, the official page provides for no such permission during the review; only the permit granted, an employee card for a permanent contract or a temporary worker card for a fixed-term one, gives the right to work.' },
      { q: 'What if the prefecture never answers my regularisation request?', a: `Four months of silence count as an implicit refusal. For a filing on ${dE(depot)}, that refusal arises on ${dE(implicite)} and the 2-month appeal period runs to ${dE(recours)}. You can appeal to the prefect, the Interior Minister or the administrative court; a lawyer is not compulsory.` },
    ],
    body: (h) => `
<h2>What exceptional admission covers</h2>
<p>Exceptional admission to stay is a regularisation route for a non-EU national present in France without a permit. It rests on ${h.ext(LF.l435, 'sections L435-1 to L435-4 of the CESEDA immigration code')} and on the guidelines sent to prefects in ${h.ext(LF.circ, 'the circular of 23 January 2025')}. Three kinds of grounds can be put forward: private and family life (length of stay, personal and family ties, a child at school in France, violence suffered), work (length of stay and of employment), and exceptional talent or services to the community in culture, sport, associations, civic life or the economy.</p>
<p>Depending on the ground, the prefecture issues a private and family life card (vie privée et familiale), or an employee (salarié) or temporary worker card. What they share is the absence of any right: the prefect has discretion and weighs each file. ${h.src('sp_F17146', 'The official page on humanitarian or exceptional regularisation')} says so; it was checked on 12 March 2025, before the May 2026 fee increase, and we apply the schedule now in force for the cost.</p>
<h2>What the prefect looks at</h2>
<ul>
<li><strong>Length of presence</strong>: at least 7 years as a rule, unless there is an exception.</li>
<li><strong>Integration</strong>: judged notably on your French, shown by a French diploma or a certificate from an approved body.</li>
<li><strong>Public order</strong>: no threat, no unexecuted order to leave France (OQTF), no polygamy in France.</li>
<li><strong>Republican principles</strong>: signing the commitment to respect them.</li>
</ul>
<p>After 10 years in France, a prefect who intends to refuse must ask the residence permit commission for an opinion. Year-by-year proof of presence then becomes the heart of the file: tax notices, state medical aid (AME) certificates, payslips, children's school certificates.</p>
<h2>Regularisation through work</h2>
<p>${h.src('sp_F16053', 'The official page on regularisation through work')} sets out two procedures. In the general case, the prefecture may require 7 years in France; the file includes form cerfa no. 15186, completed and signed by the employer, and proof of past salaried work. If approved, a permanent contract (CDI) leads to a one-year renewable employee card, a fixed-term contract (CDD) to a temporary worker card for the length of the contract.</p>
<p>For shortage occupations and areas, listed in ${h.ext(LF.tension, 'the order of 21 May 2025')}, the procedure stays open until 31 December 2026. You need 3 years of uninterrupted presence and 12 months of work in the last 24 in a shortage occupation and area. Periods worked on a student or seasonal permit, under an asylum-seeker certificate or as self-employed do not count. Here the applicant fills in the work authorisation request personally, without the employer, and the receipt issued for a complete file allows you to work.</p>
${h.table(['', 'General case', 'Shortage occupations'], [
  ['Presence in France', '7 years as a rule', '3 uninterrupted years'],
  ['Work', 'length of employment considered', '12 months out of the last 24'],
  ['Work authorisation request', 'by the employer (cerfa 15186)', 'by the applicant'],
  ['Work during the review', 'not provided for', 'yes, with the receipt'],
  ['Scheme ends', 'no end date', h.date('2026-12-31')],
], 'Official page F16053, checked 3 June 2025', ['l', 'l', 'l'])}
<h2>What regularisation costs</h2>
<p>Someone who entered without a long-stay visa pays, on top of the card, a ${h.eur(T.visa_regularisation)} regularisation visa fee, ${h.eur(nonRemb)} of it at filing. For a private and family life card granted on exceptional grounds, the total reaches ${h.eur(aes.total)}: ${h.eur(aesSansRegul)} of tax and stamp duty plus the regularisation fee. The figure is the same for an employee card obtained through work: ${h.eur(salTravail)}. The renewal a year later costs ${h.eur(renouv)}, with no regularisation fee. These amounts follow ${h.src('sp_A18881', 'the schedule of 1 May 2026')}.</p>
${h.table(['Item', 'Amount', 'When'], [
  ...aes.lignes.map((l) => [l.cle === 'taxe' ? 'Tax' : l.cle === 'timbre' ? 'Stamp duty' : 'Regularisation visa fee', h.eur(l.montant), l.cle === 'regularisation' ? `${h.eur(nonRemb)} of it at filing` : 'when the card is handed over'] as [string, string, string]),
  ['Total', h.eur(aes.total), ''],
], 'Card granted to someone who entered without a long-stay visa', ['l', 'r', 'l'])}
<h2>Preparing the file</h2>
<p>The prefecture hands you the list of documents for your situation, but some appear on every official page: a full copy of your birth certificate, a passport or consular certificate with photo, proof of address under 6 months old, three photos, a sworn statement of non-polygamy if your country allows polygamy, and the signed commitment to respect the principles of the Republic. The heart of the file is proof of presence: several dated documents for each year carry more weight than undated letters from friends. Keep copies of everything you hand in, and write down the filing date, since every deadline runs from it. If a document is in another language, plan for a certified translation, which adds cost and time that no calculator can estimate for you.</p>
<h2>Timing and appeals</h2>
<p>No prefecture publishes an average review time. The only fixed period is the implicit refusal: 4 months of silence. For a filing on ${h.date(depot)}, that refusal arises on ${h.date(implicite)}; you then have until ${h.date(recours)} to appeal to the prefect, the minister or the court. A written refusal usually comes with an order to leave France, which carries a much shorter appeal deadline. ${h.a('delai-titre-de-sejour', 'The deadline calculator')} gives the date for each permit.</p>
<p>A regularisation involves your whole situation: for a difficult file, a migrant-support association or an immigration lawyer can help. This guide is information, not legal advice.</p>
`,
  },
});
