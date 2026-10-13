import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre, timbreNationalite } from '../../lib/engine/couts';
import { formatMoney, displayDate } from '../../lib/format';

// Valeurs par défaut du calculateur : conjoint de Français, renouvellement.
const T = P.tarifs;
const conjRen = coutTitre('vpf_conjoint', 'renouvellement');
const etuRen = coutTitre('etudiant', 'renouvellement');
const retraite = coutTitre('retraite', 'premiere');
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'timbre-fiscal-titre-de-sejour',
  group: 'calculs',
  order: 30,
  tool: 'cout',
  preset: 'vpf_conjoint:renouvellement',
  related: ['cout-titre-de-sejour', 'hausse-timbres-titre-de-sejour', 'renouvellement-titre-de-sejour', 'duplicata-titre-de-sejour', 'validation-vls-ts'],
  sources: ['sp_F33071', 'sp_A18881', 'sp_F32952', 'lf2026_art128', 'ceseda_l436'],
  fr: {
    slug: 'timbre-fiscal-titre-de-sejour',
    nav: 'Timbre fiscal titre de séjour',
    card: 'Le bon montant pour votre démarche, et comment l’acheter en ligne ou chez un buraliste.',
    title: 'Timbre fiscal titre de séjour 2026 : montant et achat',
    description: 'Timbre fiscal titre de séjour 2026 : montant exact par démarche et par titre, achat en ligne ou chez un buraliste, PDF ou SMS à 16 chiffres, remboursement.',
    h1: 'Timbre fiscal pour un titre de séjour : quel montant acheter',
    intro: 'Le simulateur part d’un renouvellement de carte vie privée et familiale ; changez le titre ou la démarche pour lire le montant du timbre.',
    resume: `Le timbre fiscal d’un titre de séjour est électronique : il s’achète sur le site officiel des timbres ou chez un buraliste équipé, et se présente sous forme de PDF avec un code 2D ou de SMS portant un identifiant à 16 chiffres. Le montant dépend du titre et de la démarche. Depuis le ${dF(T.en_vigueur)}, le renouvellement d’une carte de conjoint de Français demande un timbre de ${eF(conjRen.total)}, celui d’une carte étudiant ${eF(etuRen.total)}, la première carte retraité ${eF(retraite.total)} seulement. Le timbre d’une naturalisation ou d’une déclaration par mariage vaut ${eF(timbreNationalite())}. Le timbre s’achète une fois la carte accordée : la préfecture vous prévient par SMS que le titre est prêt et vous présentez le justificatif lors de la remise. Un timbre acheté à tort peut être remboursé sur demande en ligne. Attention à ne pas acheter un timbre amende, qui ne sert à rien pour un titre.`,
    faqs: [
      { q: 'Le timbre fiscal d’un titre de séjour peut-il s’acheter chez un buraliste ?', a: 'Oui, dans un bureau de tabac équipé pour éditer les timbres électroniques ; un service en ligne permet de localiser un buraliste partenaire. Le buraliste remet un justificatif, que l’agent de la préfecture scanne lors de la remise de la carte. Sur internet, le paiement se fait par carte bancaire CB, Visa ou Mastercard, sans PayPal ni American Express.' },
      { q: 'Que faire d’un timbre fiscal acheté mais non utilisé ?', a: `En demander le remboursement en ligne sur le service officiel des timbres. Pour le timbre de nationalité, la fiche officielle précise que le timbre est valable un an et remboursable dans les 18 mois qui suivent l’achat. Gardez le PDF ou le SMS avec l’identifiant à 16 chiffres : c’est lui qui prouve l’achat.` },
      { q: 'Faut-il acheter le timbre avant de déposer la demande ?', a: `Non, pour une carte de séjour : le timbre se paie quand la demande est acceptée, à la remise du titre. Seuls le visa de régularisation, dont ${eF(T.visa_regularisation_non_remboursable)} sont dus au dépôt, et la naturalisation, payée pendant la démarche en ligne, se règlent en amont. Pour un VLS-TS, la taxe se paie pendant la validation.` },
    ],
    body: (h) => `
<h2>Trois supports, un seul contrôle</h2>
<p>Le timbre électronique est délivré soit en PDF avec un code 2D, que l’agent scanne directement sur votre téléphone ou une tablette, soit par SMS avec un identifiant à 16 chiffres. Les deux sont acceptés par le service qui traite votre dossier. Selon ${h.src('sp_F33071', 'la fiche Comment acheter un timbre fiscal (étranger en France)')}, le même service en ligne sert pour une première demande, un renouvellement ou un duplicata de carte de séjour ou de carte de résident, pour la validation du VLS-TS et pour un document de circulation pour mineur.</p>
${h.table(['Démarche', 'Timbre à acheter'], [
  ['Renouvellement, conjoint de Français', h.eur(conjRen.total)],
  ['Renouvellement, étudiant', h.eur(etuRen.total)],
  ['Première carte retraité', h.eur(retraite.total)],
  ['Validation du VLS-TS salarié', h.eur(coutTitre('salarie', 'vls').total)],
  ['Duplicata, tarif normal', h.eur(T.normal.duplicata)],
  ['Naturalisation ou déclaration par mariage', h.eur(timbreNationalite())],
], `Montants en vigueur depuis le ${h.date(T.en_vigueur)}`, ['l', 'r'])}
<h2>Pourquoi le montant a changé en 2026</h2>
<p>${h.src('lf2026_art128', 'L’article 128 de la loi de finances pour 2026')} a relevé l’ensemble des taxes. ${h.src('sp_A18881', 'L’actualité officielle de Service-Public.fr')} précise que le nouveau montant s’applique aux décisions rendues à partir du 1er mai 2026 : un dossier déposé avant mais accepté après paie le nouveau timbre. Le timbre de nationalité est passé à ${h.eur(T.nationalite)}, ${h.eur(T.nationalite_guyane, 2)} en Guyane, selon ${h.src('sp_F32952', 'la fiche Timbre fiscal pour la nationalité')}.</p>
<h2>Erreurs fréquentes</h2>
<ul><li>Acheter un timbre amende au lieu d’un timbre fiscal « titre pour étranger ».</li><li>Acheter le tarif normal pour une carte au tarif minoré, ou l’inverse.</li><li>Oublier les ${h.eur(T.droit_timbre)} de droit de timbre inclus dans le total.</li></ul>
<p>Information générale, pas un conseil juridique : en cas de doute, le montant affiché dans le SMS de la préfecture fait foi.</p>
`,
  },
  en: {
    slug: 'residence-permit-tax-stamp',
    nav: 'Residence permit tax stamp',
    card: 'The right amount for your procedure, and how to buy it online or at a tobacconist.',
    title: 'Tax Stamp for a Residence Permit 2026: Amount and Purchase',
    description: 'Tax stamp (timbre fiscal) for a French residence permit in 2026: exact amount per procedure and permit, online or tobacconist purchase, PDF or SMS code, refund.',
    h1: 'Tax stamp for a residence permit: which amount to buy',
    intro: 'The calculator starts from a renewal of a private and family life card; change the permit or the procedure to read the stamp amount.',
    resume: `The tax stamp (timbre fiscal) for a French residence permit is electronic: you buy it on the official stamp website or from an equipped tobacconist (bureau de tabac), and it comes as a PDF with a 2D code or as a text message holding a 16-digit identifier. The amount depends on the permit and the procedure. Since ${dE(T.en_vigueur)}, renewing the card of a French national's spouse needs a ${eE(conjRen.total)} stamp, renewing a student card ${eE(etuRen.total)}, and a first retiree card only ${eE(retraite.total)}. The stamp for naturalisation or a declaration through marriage is ${eE(timbreNationalite())}. You buy it once the card is granted: the prefecture texts you that the permit is ready and you show the proof of purchase when collecting it. A stamp bought by mistake can be refunded through an online request. Do not buy a fine stamp (timbre amende), which is useless for a permit.`,
    faqs: [
      { q: 'Can I buy the residence permit stamp at a tobacconist?', a: 'Yes, at a tobacconist equipped to issue electronic stamps; an online service lists partner shops. The tobacconist gives you a receipt that the prefecture officer scans when handing over the card. Online, payment is by CB, Visa or Mastercard card; PayPal and American Express are not accepted.' },
      { q: 'What do I do with a stamp I bought but did not use?', a: 'Request a refund online on the official stamp service. For the citizenship stamp, the official page states it is valid for one year and refundable within 18 months of purchase. Keep the PDF or the text message with the 16-digit identifier: it is your proof of purchase.' },
      { q: 'Should I buy the stamp before filing my application?', a: `No, for a residence card: the stamp is paid when the application is approved, on collection of the permit. Only the regularisation visa fee, of which ${eE(T.visa_regularisation_non_remboursable)} is due at filing, and naturalisation, paid during the online application, are settled upfront. For a VLS-TS visa, the tax is paid during validation.` },
    ],
    body: (h) => `
<h2>Two formats, one check</h2>
<p>The electronic stamp arrives either as a PDF with a 2D code, which the officer scans straight from your phone or tablet, or as a text message with a 16-digit identifier. Both are accepted by the office handling your file. According to ${h.src('sp_F33071', 'the official page on buying a tax stamp as a foreign national')}, the same online service covers a first application, renewal or replacement of a residence card or resident card, the VLS-TS validation and the travel document for minors.</p>
${h.table(['Procedure', 'Stamp to buy'], [
  ['Renewal, spouse of a French national', h.eur(conjRen.total)],
  ['Renewal, student', h.eur(etuRen.total)],
  ['First retiree card', h.eur(retraite.total)],
  ['VLS-TS validation, employee', h.eur(coutTitre('salarie', 'vls').total)],
  ['Replacement, standard rate', h.eur(T.normal.duplicata)],
  ['Naturalisation or declaration by marriage', h.eur(timbreNationalite())],
], `Amounts in force since ${h.date(T.en_vigueur)}`, ['l', 'r'])}
<h2>Why the amount changed in 2026</h2>
<p>${h.src('lf2026_art128', 'Section 128 of the 2026 Finance Act')} raised every fee. ${h.src('sp_A18881', 'The official Service-Public.fr notice')} states that the new amount applies to decisions made from 1 May 2026: a file lodged earlier but approved later pays the new stamp. The citizenship stamp went up to ${h.eur(T.nationalite)}, ${h.eur(T.nationalite_guyane, 2)} in French Guiana, according to ${h.src('sp_F32952', 'the page on the citizenship stamp')}.</p>
<h2>Common mistakes</h2>
<ul><li>Buying a fine stamp instead of a "titre pour étranger" tax stamp.</li><li>Buying the standard rate for a card on the reduced rate, or the other way round.</li><li>Forgetting the ${h.eur(T.droit_timbre)} stamp duty included in the total.</li></ul>
<p>General information, not legal advice: if in doubt, the amount in the prefecture's text message is the one that counts.</p>
`,
  },
});
