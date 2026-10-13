import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { fenetreRenouvellement } from '../../lib/engine/dates-sejour';
import { coutTitre } from '../../lib/engine/couts';
import { displayDate, formatMoney } from '../../lib/format';

const RN = P.renouvellement, T = P.tarifs;
// Exemples : une carte qui expire le 30 juin 2027, un VLS-TS étudiant qui expire le 1er septembre 2027.
const w = fenetreRenouvellement('2027-06-30', '2026-10-13');
const wEtu = fenetreRenouvellement('2027-09-01', '2026-10-13');
const conjRen = coutTitre('vpf_conjoint', 'renouvellement').total, etuPrem = coutTitre('etudiant', 'premiere').total;
const R431_15 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000043288806/';
const eF = (x: number) => formatMoney(x, 0, 'fr'), eE = (x: number) => formatMoney(x, 0, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'anef-titre-de-sejour',
  group: 'demarches',
  order: 30,
  mini: 'fenetre',
  miniHref: 'renouvellement-titre-de-sejour',
  related: ['renouvellement-titre-de-sejour', 'recepisse-titre-de-sejour', 'timbre-fiscal-titre-de-sejour', 'carte-de-sejour-pluriannuelle', 'titre-de-sejour-etudiant'],
  sources: ['sp_F2209', 'sp_F35799', 'sp_F2231', 'sp_F33052', 'sp_F36206'],
  fr: {
    slug: 'anef-titre-de-sejour',
    nav: 'Dépôt sur l’ANEF',
    card: 'Fenêtre de dépôt, pièces à numériser, justificatif de domicile, attestations reçues.',
    title: 'ANEF titre de séjour 2026 : quand déposer et quelles pièces',
    description: `ANEF titre de séjour 2026 : dépôt en ligne de ${RN.au_plus_tot_mois} à ${RN.au_plus_tard_mois} mois avant la fin du titre, pièces à numériser, justificatif de domicile, e-photo, attestations et remise.`,
    h1: 'Déposer sa demande de titre de séjour sur l’ANEF',
    intro: 'Le portail de l’Administration numérique pour les étrangers en France reçoit la plupart des demandes : voici quand déposer et quoi préparer.',
    resume: `L’ANEF, l’Administration numérique pour les étrangers en France, est le téléservice officiel du ministère de l’Intérieur où se déposent la plupart des premières demandes et des renouvellements de cartes de séjour, mais aussi les changements de situation et les demandes de naturalisation. Pour un titre dont le renouvellement passe par l’ANEF, la demande se dépose au plus tôt ${RN.au_plus_tot_mois} mois et au plus tard ${RN.au_plus_tard_mois} mois avant la fin du document de séjour : pour une carte qui expire le 30 juin 2027, entre le ${dF(w.ouverture)} et le ${dF(w.limite)}. Toutes les pièces s’envoient numérisées et lisibles : passeport, acte de naissance, justificatif de domicile de moins de six mois, code de l’e-photo, pièces propres au motif. Le site remet aussitôt une attestation de dépôt, qui ne vaut pas titre, puis une attestation de prolongation d’instruction si le dossier est complet et déposé dans les délais. Le timbre fiscal, ${eF(conjRen)} pour renouveler une carte de conjoint de Français, se paie à la remise de la carte, sur rendez-vous en préfecture.`,
    faqs: [
      { q: 'Toutes les cartes se demandent-elles sur l’ANEF ?', a: `Non. La fiche officielle de la carte pluriannuelle prévoit encore un dépôt en préfecture ou en sous-préfecture pour les cartes salarié et entrepreneur, dans les ${RN.au_plus_tard_mois} mois qui précèdent la fin de la carte temporaire. La carte étudiant et la plupart des cartes vie privée et familiale passent par l’ANEF. La fiche de chaque titre indique le canal ; le site de la préfecture confirme les règles locales.` },
      { q: 'Quel justificatif de domicile envoyer sur l’ANEF quand on est hébergé ?', a: 'Trois documents : une attestation datée et signée de la personne qui vous héberge, la copie de sa carte d’identité ou de sa carte de séjour, et un justificatif de domicile à son nom si l’adresse de sa carte n’est plus à jour. À l’hôtel, une attestation de l’hôtelier et la facture du dernier mois. Le justificatif doit dater de moins de six mois.' },
      { q: 'Peut-on corriger un dossier ANEF après l’envoi ?', a: 'Le téléservice permet de compléter la demande quand la préfecture réclame une pièce, et d’y déclarer un changement de situation. Tant que la pièce manque, le dossier n’est pas complet : l’attestation de prolongation d’instruction, qui prouve la régularité du séjour, n’est délivrée que pour un dossier complet déposé dans les délais. Répondez vite aux demandes de pièces.' },
      { q: 'Faut-il prendre rendez-vous en préfecture après un dépôt sur l’ANEF ?', a: 'Pour l’instruction, non : tout passe par le téléservice. Pour la remise de la carte, oui dans la plupart des préfectures : quand la demande est acceptée, la préfecture vous prévient que le titre est disponible et vous le retirez sur rendez-vous, avec le justificatif du timbre fiscal et, pour une première carte, le certificat médical de l’OFII si on vous l’a demandé.' },
    ],
    body: (h) => `
<h2>La fenêtre de dépôt</h2>
<p>La règle tient en deux dates : pas plus de ${h.num(RN.au_plus_tot_mois)} mois avant la fin de votre visa, VLS-TS ou titre, pas moins de ${h.num(RN.au_plus_tard_mois)} mois. Elle est écrite dans ${h.src('sp_F2209', 'la fiche Carte vie privée et familiale')} et dans ${h.src('sp_F2231', 'la fiche Étudiant')}. Avant l’ouverture, le téléservice n’accepte pas la demande ; après la fermeture, la demande reste possible mais hors délai, avec un droit de ${h.eur(T.retard_renouvellement)} en plus du timbre et la perte de l’attestation de prolongation d’instruction.</p>
${h.table(['Document de séjour', 'Fin de validité', 'Dépôt dès le', 'Dépôt au plus tard le'], [
  ['Carte de séjour', h.date('2027-06-30'), h.date(w.ouverture), h.date(w.limite)],
  ['VLS-TS étudiant', h.date('2027-09-01'), h.date(wEtu.ouverture), h.date(wEtu.limite)],
  ['Carte de séjour', h.date('2027-01-31'), h.date(fenetreRenouvellement('2027-01-31', '2026-10-13').ouverture), h.date(fenetreRenouvellement('2027-01-31', '2026-10-13').limite)],
], 'Fenêtres ANEF calculées par le moteur du site', ['l', 'l', 'r', 'r'])}
<h2>Les pièces à numériser</h2>
<p>Pour une demande en ligne, toutes les pièces doivent être fournies sous forme numérique et lisible. La fiche de la carte vie privée et familiale, pour un conjoint de Français, en donne un exemple complet, que l’on retrouve à quelques variantes près pour les autres titres :</p>
<ul>
<li><strong>Entrée et séjour réguliers</strong> : pages du passeport avec le visa et le cachet d’entrée, ou titre de séjour en cours de validité.</li>
<li><strong>Nationalité</strong> : passeport, ou carte consulaire, carte d’identité ou attestation consulaire avec photo.</li>
<li><strong>État civil</strong> : copie intégrale de l’acte de naissance avec les mentions les plus récentes, sauf si vous avez déjà une carte de séjour ; un acte étranger est traduit par un traducteur agréé et parfois légalisé ou apostillé.</li>
<li><strong>Photo</strong> : le code de l’e-photo inscrit sur la planche remise par le photographe ou la cabine agréée.</li>
<li><strong>Domicile</strong> : justificatif de moins de six mois.</li>
<li><strong>Motif du séjour</strong> : les pièces propres au titre, par exemple l’acte de mariage et les preuves de vie commune pour un conjoint de Français.</li>
<li><strong>Engagement</strong> : l’exemplaire signé du contrat d’engagement à respecter les principes de la République.</li>
</ul>
<p>Deux pièces se remettent plus tard, le jour de la remise de la carte : le justificatif de paiement du timbre fiscal et, le cas échéant, le certificat médical de l’OFII.</p>
<h2>Le justificatif de domicile, selon votre logement</h2>
<p>${h.src('sp_F33052', 'La fiche Justificatif de domicile')} distingue trois cas. Locataire ou propriétaire : une facture d’électricité, de gaz, d’eau, de téléphone fixe ou d’internet, un bail ou une quittance de loyer. À l’hôtel : l’attestation de l’hôtelier et la facture du dernier mois. Hébergé chez un particulier : l’attestation signée de l’hébergeant, la copie de sa pièce d’identité ou de sa carte de séjour, et un justificatif à son nom si l’adresse de sa pièce n’est plus à jour. Un justificatif sécurisé portant un code 2D-Doc ne peut pas être refusé.</p>
<h2>Les attestations que vous recevez</h2>
<p>Le dépôt donne immédiatement une attestation de dépôt, qui prouve l’envoi mais pas la régularité du séjour. Pour un dossier complet déposé dans les délais suit une attestation de prolongation d’instruction, valable ${h.num(RN.recepisse_mois)} mois au plus et renouvelée jusqu’à la décision, puis, en cas d’accord, une attestation de décision favorable. Ces documents sont prévus par le ${h.ext(R431_15, 'CESEDA, articles R431-15-1 et R431-15-2')} et décrits dans ${h.src('sp_F36206', 'la fiche Attestations de demande de carte de séjour')}. ${h.a('recepisse-titre-de-sejour', 'La page Récépissé')} détaille ce qu’ils permettent, notamment pour travailler.</p>
<!--mini:recepisse-->
<h2>Six erreurs qui bloquent un dossier</h2>
<ol>
<li>Un scan flou ou coupé : les fiches exigent des pièces lisibles, et une pièce illisible équivaut à une pièce manquante.</li>
<li>Un acte de naissance étranger sans traduction par un traducteur agréé, ou sans légalisation quand elle est exigée.</li>
<li>Un justificatif de domicile de plus de six mois, ou une attestation d’hébergement sans la pièce d’identité de l’hébergeant.</li>
<li>L’oubli du code de l’e-photo, qui remplace les photos papier.</li>
<li>Un dépôt après la date limite, qui coûte ${h.eur(T.retard_renouvellement)} de plus et fait perdre l’attestation de prolongation.</li>
<li>Un timbre amende acheté à la place du timbre fiscal « titre pour étranger », sans aucune valeur pour la remise de la carte.</li>
</ol>
<h2>Après l’accord : la remise de la carte</h2>
<p>Quand la demande est acceptée, la préfecture vous prévient que la carte est disponible ; elle se retire à la préfecture ou à la sous-préfecture du domicile, sur rendez-vous dans la plupart des cas. C’est à ce moment que vous présentez le timbre fiscal : ${h.eur(conjRen)} pour renouveler une carte de conjoint de Français, ${h.eur(etuPrem)} pour une première carte étudiant. Le passage de la carte temporaire à la carte pluriannuelle se demande aussi sur l’ANEF pour les titres qui y sont ouverts, selon ${h.src('sp_F35799', 'la fiche Carte pluriannuelle')}.</p>
<h2>Ce que l’ANEF ne fait pas</h2>
<p>Le téléservice est gratuit : seul le timbre fiscal est payant. Aucun site privé n’est nécessaire pour déposer, et aucun ne peut accélérer l’instruction. Si vous n’arrivez pas à déposer en ligne, les préfectures disposent de points d’accueil numérique. Ce site est indépendant de l’administration et ne dépose rien à votre place : information générale, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'anef-online-application',
    nav: 'Filing on ANEF',
    card: 'Filing window, documents to scan, proof of address, certificates you receive.',
    title: 'ANEF Residence Permit 2026: When to File and What to Upload',
    description: `ANEF residence permit in 2026: file online ${RN.au_plus_tot_mois} to ${RN.au_plus_tard_mois} months before your permit ends, documents to scan, proof of address, e-photo code and the certificates.`,
    h1: 'Applying for a residence permit on ANEF',
    intro: 'The French online portal for foreign nationals takes most applications: here is when to file and what to prepare.',
    resume: `ANEF (Administration numérique pour les étrangers en France) is the Interior Ministry's official online portal, where most first applications and renewals of residence cards are filed, along with changes of circumstances and naturalisation applications. For a permit renewed through ANEF, you file no earlier than ${RN.au_plus_tot_mois} months and no later than ${RN.au_plus_tard_mois} months before your residence document ends: for a card expiring on 30 June 2027, between ${dE(w.ouverture)} and ${dE(w.limite)}. Every document is uploaded as a clear scan: passport, birth certificate, proof of address under six months old, your e-photo code and the documents for your specific ground. The portal immediately issues a filing certificate, which is not a permit, then a certificate extending the examination if the file is complete and on time. The tax stamp, ${eE(conjRen)} to renew a French national's spouse's card, is paid when you collect the card, by appointment at the prefecture.`,
    faqs: [
      { q: 'Are all residence cards applied for on ANEF?', a: `No. The official multi-year card page still has employee and self-employed cards filed at the prefecture or sub-prefecture, in the ${RN.au_plus_tard_mois} months before the temporary card ends. The student card and most private and family life cards go through ANEF. Each permit's page states the channel; your prefecture's website confirms local arrangements.` },
      { q: 'Which proof of address do I upload if someone is hosting me?', a: 'Three documents: a dated and signed statement from your host, a copy of their ID card or residence card, and a proof of address in their name if the address on their card is out of date. In a hotel, a statement from the hotel and the last month’s invoice. The proof must be less than six months old.' },
      { q: 'Can I correct an ANEF file after sending it?', a: 'The portal lets you add documents when the prefecture asks for one and declare a change of circumstances. While a document is missing, the file is not complete, and the certificate extending the examination, which proves your stay is lawful, is only issued for a complete file filed on time. Answer requests for documents quickly.' },
      { q: 'Do I need a prefecture appointment after filing on ANEF?', a: 'Not for the examination: everything happens on the portal. For collecting the card, yes in most prefectures: once your application is approved, the prefecture tells you the permit is ready and you collect it by appointment, with proof of the tax stamp and, for a first card, the OFII medical certificate if you were asked for one.' },
    ],
    body: (h) => `
<h2>The filing window</h2>
<p>The rule comes down to two dates: no more than ${h.num(RN.au_plus_tot_mois)} months before your visa, VLS-TS or permit ends, and no less than ${h.num(RN.au_plus_tard_mois)} months. It is written in ${h.src('sp_F2209', 'the private and family life card page')} and ${h.src('sp_F2231', 'the student page')}. Before the window opens the portal will not take the application; after it closes you can still file, but late, with a ${h.eur(T.retard_renouvellement)} fee on top of the stamp and without the certificate extending the examination.</p>
${h.table(['Residence document', 'Ends on', 'File from', 'File by'], [
  ['Residence card', h.date('2027-06-30'), h.date(w.ouverture), h.date(w.limite)],
  ['Student VLS-TS', h.date('2027-09-01'), h.date(wEtu.ouverture), h.date(wEtu.limite)],
  ['Residence card', h.date('2027-01-31'), h.date(fenetreRenouvellement('2027-01-31', '2026-10-13').ouverture), h.date(fenetreRenouvellement('2027-01-31', '2026-10-13').limite)],
], 'ANEF windows worked out by the site’s engine', ['l', 'l', 'r', 'r'])}
<h2>Documents to scan</h2>
<p>For an online application, every document must be uploaded in digital form and be readable. The official page for the private and family life card, for a French national's spouse, gives a full example that other permits follow with a few variations:</p>
<ul>
<li><strong>Lawful entry and stay</strong>: passport pages with the visa and entry stamp, or a valid residence permit.</li>
<li><strong>Nationality</strong>: passport, or a consular card, ID card or consular certificate with a photo.</li>
<li><strong>Civil status</strong>: a full copy of your birth certificate with the latest annotations, unless you already hold a residence card; a foreign certificate must be translated by a sworn translator and sometimes legalised or apostilled.</li>
<li><strong>Photo</strong>: the e-photo code printed on the sheet from an approved photographer or photo booth.</li>
<li><strong>Address</strong>: a proof of address under six months old.</li>
<li><strong>Ground for the permit</strong>: the documents specific to it, for instance the marriage certificate and proof of living together for a spouse.</li>
<li><strong>Commitment</strong>: the signed contract committing you to respect the principles of the Republic.</li>
</ul>
<p>Two items come later, when you collect the card: proof of the tax stamp and, where applicable, the medical certificate from OFII (the French immigration and integration office).</p>
<h2>Proof of address, by type of housing</h2>
<p>${h.src('sp_F33052', 'The official proof-of-address page')} sets out three cases. Tenant or owner: an electricity, gas, water, landline or internet bill, a lease or a rent receipt. Hotel: a statement from the hotel and the last month's invoice. Staying with someone: the host's signed statement, a copy of their ID or residence card, and a proof of address in their name if the address on their card is out of date. A secure document carrying a 2D-Doc barcode cannot be refused.</p>
<h2>Certificates you receive</h2>
<p>Filing produces an immediate filing certificate, which proves you sent the file but not that your stay is lawful. For a complete file lodged on time, a certificate extending the examination follows, valid for ${h.num(RN.recepisse_mois)} months at most and renewed until the decision, then, if approved, a certificate of favourable decision. These documents are provided for by ${h.ext(R431_15, 'CESEDA, articles R431-15-1 and R431-15-2')} and described on ${h.src('sp_F36206', 'the official page on application certificates')}. ${h.a('recepisse-titre-de-sejour', 'The receipt page')} explains what each allows, including work.</p>
<!--mini:recepisse-->
<h2>Six mistakes that hold up a file</h2>
<ol>
<li>A blurred or cropped scan: the official pages require readable documents, and an unreadable one counts as missing.</li>
<li>A foreign birth certificate without a translation by a sworn translator, or without legalisation where it is required.</li>
<li>A proof of address more than six months old, or a host's statement without the host's ID.</li>
<li>Forgetting the e-photo code, which replaces paper photos.</li>
<li>Filing after the deadline, which costs ${h.eur(T.retard_renouvellement)} more and loses you the extension certificate.</li>
<li>Buying a fine stamp (timbre amende) instead of the "titre pour étranger" tax stamp; it is worthless when you collect the card.</li>
</ol>
<h2>A typical timeline</h2>
<p>For a card ending on ${h.date('2027-06-30')}, the earliest filing date is ${h.date(w.ouverture)} and the latest ${h.date(w.limite)}. Filing early in that window leaves time to answer a request for a missing document before the card expires. If the decision has not been made by the expiry date, the certificate extending the examination covers you from the following day. The prefecture then contacts you when the card is ready; you book the collection appointment and buy the stamp at that stage, not before, because the stamp is only due once the permit is granted. Keep every certificate the portal sends you until the card is in your hands, and download a copy of each, because your employer may ask for the one currently valid.</p>
<h2>After approval: collecting the card</h2>
<p>When the application is approved, the prefecture tells you the card is available; you collect it at the prefecture or sub-prefecture for your address, by appointment in most cases. That is when you show the tax stamp: ${h.eur(conjRen)} to renew a French national's spouse's card, ${h.eur(etuPrem)} for a first student card. Moving from the temporary card to the multi-year card is also requested on ANEF for the permits it covers, according to ${h.src('sp_F35799', 'the multi-year card page')}.</p>
<h2>What ANEF does not do</h2>
<p>The portal is free: only the tax stamp costs money. No private website is needed to file, and none can speed up the examination. If you cannot manage the online application, prefectures have digital help desks (points d'accueil numérique). This site is independent of the French administration and files nothing on your behalf: general information, not legal advice.</p>
`,
  },
});
