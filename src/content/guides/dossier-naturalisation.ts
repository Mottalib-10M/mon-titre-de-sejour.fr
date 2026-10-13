import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { naturalisation } from '../../lib/engine/dates-sejour';
import { timbreNationalite } from '../../lib/engine/couts';
import { formatMoney, displayDate } from '../../lib/format';
import { addMonths } from '../../lib/engine/dates';

const N = P.naturalisation;
// Exemple suivi tout au long de la page : installée le 1er septembre 2021, récépissé le 2 novembre 2026.
const ex = naturalisation({ debut: '2021-09-01', cas: 'general', recepisse: '2026-11-02' });
// Décret hypothétique publié le 1er octobre 2027 : cérémonie en principe dans les 6 mois, retrait possible 2 ans.
const DECRET = '2027-10-01';
const ceremonie = addMonths(DECRET, 6);
const retrait = addMonths(DECRET, 24);
const LF_DECRET = 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000699753';
const LF_CHARTE = 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000025241393/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'dossier-naturalisation',
  group: 'nationalite',
  order: 30,
  mini: 'natdate',
  miniHref: 'naturalisation-francaise',
  related: ['naturalisation-francaise', 'delai-naturalisation', 'examen-civique', 'niveau-de-francais-exige', 'nationalite-par-mariage'],
  sources: ['sp_F2213', 'sp_F34746', 'sp_F32952', 'sp_F15868', 'decret_93_1362'],
  fr: {
    slug: 'dossier-naturalisation',
    nav: 'Dossier de naturalisation',
    card: 'Pièces, justificatifs de revenus, envoi en ligne, entretien, décret et cérémonie : le dossier étape par étape.',
    title: 'Dossier de naturalisation 2026 : pièces, entretien et décret',
    description: 'Dossier de naturalisation 2026 : pièces à fournir, revenus et impôts à justifier, dépôt en ligne, timbre, entretien, décret au Journal officiel, cérémonie.',
    h1: 'Dossier de naturalisation : les pièces et les étapes jusqu’au décret',
    intro: 'Ce que contient un dossier complet, comment il s’envoie et ce qui se passe entre le récépissé et la cérémonie d’accueil.',
    resume: `Un dossier de naturalisation se dépose en ligne sur le téléservice du ministère de l’Intérieur, sauf à Saint-Barthélemy, Saint-Martin, Saint-Pierre-et-Miquelon, Wallis-et-Futuna, en Polynésie et en Nouvelle-Calédonie, et seulement quand la durée de résidence est atteinte : ${N.residence_ans} ans dans le cas général, ${N.reduite_ans} ans après deux années d’études supérieures diplômantes en France. Il réunit le timbre fiscal de ${eF(timbreNationalite())}, le titre de séjour en cours de validité, l’état civil, le domicile, les revenus et impôts des trois dernières années avec le bordereau de situation fiscale P. 237 de moins de trois mois, un diplôme ou test de français de niveau ${N.langue} et l’attestation de réussite à l’examen civique. Le récépissé n’est remis qu’une fois toutes les pièces fournies ; il fait courir le délai légal de ${N.delai_mois} mois. Pour un récépissé du 2 novembre 2026, la réponse doit arriver avant le ${dF(ex.delaiReponse!)}. Suivent l’entretien d’assimilation en préfecture, la signature de la charte des droits et devoirs du citoyen, puis, en cas d’accord, le décret publié au Journal officiel et la cérémonie d’accueil.`,
    faqs: [
      { q: 'Quels justificatifs de revenus joindre quand on est salarié ?', a: 'Les certificats de travail des trois dernières années si possible, le contrat en cours avec salaire et date d’entrée, les trois derniers bulletins de paie, les bulletins de novembre et décembre des trois dernières années, les avis d’imposition ou de non-imposition des trois dernières années et le bordereau de situation fiscale P. 237 couvrant ces trois années, daté de moins de trois mois au dépôt.' },
      { q: 'Faut-il traduire et légaliser son acte de naissance étranger ?', a: 'L’acte d’état civil se fournit en copie intégrale et en original, dans la langue du pays d’origine, avec une traduction originale par un traducteur agréé. Certains pays exigent une légalisation ou une apostille, à demander à l’ambassade concernée. Un extrait plurilingue dont l’une des langues est le français dispense de traduction pour un majeur.' },
      { q: 'Le timbre de naturalisation peut-il être acheté à l’avance ?', a: `Oui, mais il n’est valable qu’un an à partir de son achat. Pour une demande en ligne, le plus simple est de le payer pendant la démarche sur le téléservice. Un timbre de ${eF(timbreNationalite())} acheté puis inutilisé peut être remboursé si la demande est faite en ligne dans les 18 mois qui suivent l’achat.` },
      { q: 'Que se passe-t-il si l’on déménage pendant l’instruction ?', a: 'Tout changement après le récépissé, adresse, situation familiale ou professionnelle, doit être déclaré : sur votre espace en ligne avec les justificatifs numérisés si le dossier a été déposé sur le téléservice, ou par la déclaration jointe au cerfa 12753 envoyée à la plateforme si le dossier est parti par courrier. Un récépissé du dépôt des nouveaux documents vous est délivré.' },
      { q: 'Les enfants deviennent-ils français en même temps que le parent ?', a: 'Les enfants mineurs non mariés qui résident habituellement avec vous deviennent français si leur nom figure dans le décret de naturalisation. La minorité s’apprécie à la date de signature du décret, pas à celle du dépôt : un enfant devenu majeur entre-temps doit faire sa propre demande. Il faut donc joindre leurs actes de naissance au dossier.' },
      { q: 'Un refus peut-il être contesté, et dans quel délai ?', a: 'Oui. Vous avez deux mois à partir de la notification pour former un recours administratif obligatoire auprès du ministre chargé des naturalisations, en ligne sur votre espace pour un dossier déposé sur le téléservice. Sans réponse dans les quatre mois, ou après une réponse négative, vous disposez de deux mois pour saisir le tribunal administratif de Nantes.' },
    ],
    body: (h) => `
<h2>Avant de constituer le dossier : vérifier la date</h2>
<p>Un dossier déposé trop tôt est irrecevable et la recherche de pièces sera à refaire. Le mini-simulateur ci-dessus donne la date à partir de laquelle la durée de résidence est remplie ; ${h.a('naturalisation-francaise', 'le simulateur complet')} ajoute l’âge et le délai de réponse. Comptez aussi le temps d’obtenir les deux attestations que l’on oublie le plus souvent : le diplôme ou test de français de niveau ${N.langue} et la réussite à ${h.a('examen-civique', 'l’examen civique')}. Une attestation de test TCF ou TEF n’est acceptée que si elle date de moins de deux ans.</p>
<h2>Les pièces du dossier</h2>
<p>La liste de ${h.src('sp_F2213', 'la fiche officielle Naturalisation française par décret')} pour un envoi en ligne comprend :</p>
<ul>
<li>le timbre fiscal de ${h.eur(timbreNationalite())} (${h.eur(timbreNationalite(true), 2)} en Guyane) ;</li>
<li>la copie recto verso du titre de séjour en cours de validité, sauf ressortissant de l’Union européenne, de l’Espace économique européen ou suisse ;</li>
<li>un document officiel d’identité, passeport ou titre de séjour ;</li>
<li>les justificatifs d’état civil et de nationalité, de domicile, de ressources et d’impôts ;</li>
<li>le diplôme ou l’attestation de niveau de français et l’attestation de réussite à l’examen civique ;</li>
<li>les justificatifs de couple, d’un précédent mariage dissous et des enfants mineurs ;</li>
<li>si vous vivez en France depuis moins de dix ans, un extrait de casier judiciaire de chaque pays où vous avez vécu, ou de votre pays de nationalité ;</li>
<li>pour un non-Européen entré dans l’espace Schengen pour moins de trois mois au cours des cinq dernières années, le passeport ou un document équivalent.</li>
</ul>
<p>Par courrier, la seule voie possible quand le téléservice ne fonctionne pas pour vous (ce qu’atteste un courriel du centre de contact citoyens de l’ANTS ou un document de la préfecture), s’ajoutent le formulaire cerfa 12753 en deux exemplaires, deux photos d’identité de 35 sur 45 millimètres et une enveloppe timbrée avec une lettre suivie de 500 grammes.</p>
<h2>Les justificatifs de revenus selon votre situation</h2>
<p>L’insertion professionnelle est une condition essentielle : des revenus stables et suffisants pour votre foyer fiscal. ${h.src('sp_F34746', 'La fiche sur les justificatifs de ressources')} détaille les pièces par situation. Dans presque tous les cas, il faut les avis d’imposition ou de non-imposition des trois dernières années et le bordereau de situation fiscale modèle P. 237 sur ces trois années, daté de moins de trois mois au dépôt.</p>
${h.table(['Situation', 'Pièces propres à la situation'], [
  ['Salarié', 'certificats de travail, contrat en cours, 3 derniers bulletins, bulletins de novembre et décembre des 3 dernières années'],
  ['Demandeur d’emploi', 'inscription à France Travail, 3 derniers bordereaux d’indemnités, justificatifs d’activité'],
  ['Artisan, commerçant, gérant', 'extrait d’immatriculation, attestation comptable des revenus, situation fiscale de la société'],
  ['Profession libérale', 'inscription à l’ordre, ressources des 3 dernières années'],
  ['Micro-entrepreneur', 'immatriculation, ressources des 3 années, déclarations Urssaf des 12 derniers mois'],
  ['Étudiant', 'certificat de scolarité, diplômes du supérieur obtenus en France, bourse ou ressources des parents'],
  ['Retraité', 'titre de pension, dernier bordereau de versement'],
], 'Pièces à ajouter aux avis d’imposition et au bordereau P. 237 (fiche F34746)')}
<h2>Les règles sur les documents</h2>
<p>Seuls les actes d’état civil doivent être des originaux ; les autres pièces peuvent être des copies, mais gardez les originaux, l’agent les demandera à l’entretien. Un acte français doit avoir moins de trois mois. Chaque document en langue étrangère est accompagné de la traduction originale d’un traducteur agréé. Selon le pays d’origine, une légalisation ou une apostille peut être exigée. Si une pièce manque, le service instructeur fixe un délai pour la fournir ; passé ce délai, le dossier peut être classé sans suite, c’est-à-dire non examiné.</p>
<h2>Après l’envoi : récépissé, entretien, enquête</h2>
<p>Le récépissé n’est délivré que lorsque tous les documents ont été fournis. C’est sa date qui compte pour le délai légal : l’administration doit répondre dans les ${h.num(N.delai_mois)} mois, ${h.num(N.delai_10ans_mois)} mois si vous résidez en France depuis au moins dix ans, avec une prolongation motivée possible de ${h.num(N.prolongation_mois)} mois (${h.a('delai-naturalisation', 'le détail des délais')}). Dans l’exemple d’une personne installée le 1er septembre 2021 dont le récépissé date du 2 novembre 2026, la limite tombe le ${h.date(ex.delaiReponse!)}, ou le ${h.date(ex.delaiProlonge!)} avec la prolongation.</p>
<p>Si la demande est recevable, vous êtes convoqué à un entretien en préfecture. Il vérifie votre assimilation à la communauté française et votre adhésion aux principes et valeurs de la République, ceux de la charte des droits et devoirs du citoyen français, que vous signez à la fin de l’entretien (${h.ext(LF_CHARTE, 'décret du 30 janvier 2012 approuvant la charte')}). Ne pas se présenter sans motif légitime expose à un classement sans suite. En parallèle, une enquête porte sur votre comportement civique, par exemple le paiement des impôts, et sur votre passé judiciaire en France et à l’étranger. Le livret du citoyen aide à préparer cet entretien.</p>
<h2>La décision et le décret</h2>
<p>En cas d’accord, vous êtes prévenu par courriel de votre inscription dans un décret publié au Journal officiel, que vous téléchargez sur Légifrance. Le décret prend effet à la date de sa signature. Il peut être retiré dans les deux ans de sa publication, sur avis conforme du Conseil d’État, si les conditions n’étaient pas remplies, et dans les deux ans de la découverte d’une fraude. Pour un décret publié le ${h.date(DECRET)}, ce premier délai court jusqu’au ${h.date(retrait)}. Une erreur dans le décret se corrige par un téléservice de rectification. La procédure relève du ${h.ext(LF_DECRET, 'décret n° 93-1362 du 30 décembre 1993')}.</p>
<p>Un refus est motivé. S’il repose sur l’irrecevabilité, une nouvelle demande est possible quand le motif a disparu. S’il repose sur l’inopportunité, la demande est rejetée ou ajournée : après un rejet, une nouvelle demande déposée moins de cinq ans après la notification peut être classée sans suite ; après un ajournement, il faut attendre la fin du délai fixé. Information, pas un conseil juridique : pour un recours, une association ou un avocat peuvent vous aider.</p>
<h2>La cérémonie d’accueil dans la citoyenneté</h2>
<p>D’après ${h.src('sp_F15868', 'la fiche sur la cérémonie d’accueil')}, le préfet organise la cérémonie en principe dans les six mois qui suivent la publication du décret : vers le ${h.date(ceremonie)} dans notre exemple. Un salarié, et son conjoint, ont droit à un congé d’au moins une demi-journée pour y assister, sur présentation de l’invitation, sans que ce temps soit pris sur les congés payés. Vous y recevez un dossier d’accueil avec la charte, la Déclaration des droits de l’homme et du citoyen, des extraits de la Constitution et l’hymne national. Vous pouvez ensuite demander une carte d’identité et un passeport ; un jeune devenu français entre 16 et 25 ans doit se faire recenser dans le mois.</p>
`,
  },
  en: {
    slug: 'naturalisation-application-file',
    nav: 'Naturalisation application file',
    card: 'Documents, proof of income, online filing, interview, decree and ceremony: the file step by step.',
    title: 'Naturalisation File 2026: Documents, Interview and Decree',
    description: 'Naturalisation file in France 2026: documents, proof of income and tax, online filing, the stamp, the prefecture interview, the decree and the welcome ceremony.',
    h1: 'Your naturalisation file: documents and steps up to the decree',
    intro: 'What a complete file contains, how it is sent and what happens between the receipt and the citizenship ceremony.',
    resume: `A French naturalisation file is filed online through the Interior Ministry’s online service, except in Saint-Barthélemy, Saint-Martin, Saint-Pierre-et-Miquelon, Wallis and Futuna, French Polynesia and New Caledonia, and only once the residence period is met: ${N.residence_ans} years in general, ${N.reduite_ans} years after two years of degree-level study in France. It brings together the ${eE(timbreNationalite())} tax stamp (timbre fiscal), a valid residence permit, civil-status documents, proof of address, income and tax for the last three years with the P. 237 tax-status statement (bordereau de situation fiscale) issued less than three months before filing, a French diploma or test at ${N.langue} level and the certificate of passing the civic exam. The receipt (récépissé) is only issued once every document is in; it starts the ${N.delai_mois}-month legal deadline. For a receipt dated 2 November 2026, the answer is due by ${dE(ex.delaiReponse!)}. Next come the assimilation interview at the prefecture, signing the charter of the rights and duties of the French citizen and, if approved, the decree published in the Official Journal and the welcome ceremony.`,
    faqs: [
      { q: 'Which proof of income does an employee attach?', a: 'Employment certificates for the last three years where possible, the current contract showing salary and start date, the last three payslips, the November and December payslips of each of the last three years, the tax assessments (or non-taxation notices) for those three years and the P. 237 tax-status statement covering them, dated less than three months before filing.' },
      { q: 'Must a foreign birth certificate be translated and legalised?', a: 'The certificate is supplied as a full original copy in the language of the country of origin, with an original translation by an approved translator. Some countries require legalisation or an apostille, obtained from the relevant embassy. A multilingual extract that includes French spares an adult the translation.' },
      { q: 'Can the naturalisation stamp be bought in advance?', a: `Yes, but it is only valid for one year from purchase. For an online application, the simplest route is to pay during the procedure on the online service. A ${eE(timbreNationalite())} stamp bought and then not used can be refunded if you request it online within 18 months of buying it.` },
      { q: 'What if I move house while my file is being examined?', a: 'Any change after the receipt, whether address, family or work, must be declared: in your online account with scanned proof if you filed on the online service, or with the change-of-situation form attached to cerfa 12753, sent to the platform, if you filed by post. You receive a receipt for the new documents.' },
      { q: 'Do my children become French at the same time?', a: 'Unmarried minor children who usually live with you become French if their names appear in the naturalisation decree. Minority is judged on the date the decree is signed, not the filing date: a child who has turned 18 in the meantime must apply separately. Their birth certificates therefore belong in your file.' },
      { q: 'Can a refusal be challenged, and how quickly?', a: 'Yes. You have two months from notification to lodge the compulsory administrative appeal with the minister in charge of naturalisation, online through your account if you filed online. With no reply within four months, or after a negative reply, you then have two months to go to the administrative court in Nantes.' },
    ],
    body: (h) => `
<h2>Before building the file: check the date</h2>
<p>A file sent too early is inadmissible, and the documents will have to be gathered again. The mini-calculator above gives the date your residence period is met; ${h.a('naturalisation-francaise', 'the full calculator')} adds age and the response deadline. Allow time for the two certificates people most often forget: the French diploma or test at ${N.langue} level and the pass in ${h.a('examen-civique', 'the civic exam')}. A TCF or TEF test certificate is only accepted if it is less than two years old.</p>
<h2>The documents</h2>
<p>For an online application, the list on ${h.src('sp_F2213', 'the official naturalisation-by-decree page')} is:</p>
<ul>
<li>the ${h.eur(timbreNationalite())} tax stamp (${h.eur(timbreNationalite(true), 2)} in French Guiana);</li>
<li>a two-sided copy of your valid residence permit, unless you are an EU, EEA or Swiss national;</li>
<li>an official identity document, passport or residence permit;</li>
<li>proof of civil status and nationality, of address, of income and of tax;</li>
<li>the French-level diploma or certificate and the civic-exam certificate;</li>
<li>documents on your relationship, any earlier marriage ended by divorce or death, and your minor children;</li>
<li>if you have lived in France for less than ten years, a criminal-record extract from each country where you lived, or from your country of nationality;</li>
<li>for a non-EU national who entered the Schengen area for under three months during the last five years, the passport or an equivalent document.</li>
</ul>
<p>By post, only possible when the online service cannot be used (shown by an email from the ANTS citizens’ contact centre or a prefecture document), you also send form cerfa 12753 in two copies, two 35 by 45 mm photos, and a stamped addressed envelope plus a blank 500 g tracked letter.</p>
<h2>Proof of income for your situation</h2>
<p>Professional integration is an essential condition: stable income sufficient for your tax household. ${h.src('sp_F34746', 'The official page on proof of income')} sets out the documents by situation. Almost every case needs the tax assessments (avis d’imposition) for the last three years and the P. 237 tax-status statement for those years, dated less than three months before filing.</p>
${h.table(['Situation', 'Documents specific to it'], [
  ['Employee', 'employment certificates, current contract, last 3 payslips, November and December payslips of the last 3 years'],
  ['Jobseeker', 'France Travail registration, last 3 benefit statements, proof of past work'],
  ['Craftsperson, trader, company manager', 'registration extract, accountant’s statement of income, the company’s tax status'],
  ['Liberal profession', 'membership of the professional order, income for the last 3 years'],
  ['Micro-entrepreneur', 'registration, income for 3 years, Urssaf returns for the last 12 months'],
  ['Student', 'enrolment certificate, French higher-education degrees, grant or parents’ resources'],
  ['Retiree', 'pension certificate, latest payment statement'],
], 'Documents added to the tax assessments and the P. 237 statement (page F34746)')}
<h2>Rules on documents</h2>
<p>Only civil-status certificates must be originals; other documents can be copies, but keep the originals, as the officer will ask for them at the interview. A French certificate must be less than three months old. Every document in another language comes with an original translation by an approved translator, and some countries require legalisation or an apostille. If something is missing, the case officer sets a deadline; once it passes, the file may be closed without examination (classé sans suite).</p>
<h2>After sending: receipt, interview, background checks</h2>
<p>The receipt is only issued once every document has been supplied, and its date drives the legal deadline: the administration must answer within ${h.num(N.delai_mois)} months, ${h.num(N.delai_10ans_mois)} months if you have lived in France for at least ten years, with one reasoned extension of ${h.num(N.prolongation_mois)} months (${h.a('delai-naturalisation', 'the deadlines in detail')}). For someone settled since 1 September 2021 whose receipt is dated 2 November 2026, the limit falls on ${h.date(ex.delaiReponse!)}, or ${h.date(ex.delaiProlonge!)} with the extension.</p>
<p>If the application is admissible, you are called to an interview at the prefecture. It checks your assimilation into the French community and your commitment to the principles and values of the Republic, those set out in the charter of the rights and duties of the French citizen, which you sign at the end (${h.ext(LF_CHARTE, 'decree of 30 January 2012 approving the charter')}). Missing the interview without good reason can lead to the file being closed. Meanwhile, checks cover your civic conduct, such as paying taxes, and your criminal record in France and abroad. The citizen’s booklet (livret du citoyen) helps you prepare.</p>
<h2>The decision and the decree</h2>
<p>If approved, you are told by email that your name is in a decree published in the Official Journal, which you download from Légifrance. The decree takes effect on the date it is signed. It can be withdrawn within two years of publication, on the Council of State’s binding opinion, if the conditions were not met, and within two years of a fraud being discovered. For a decree published on ${h.date(DECRET)}, that first window runs until ${h.date(retrait)}. A mistake in the decree is corrected through an online rectification service. The procedure is governed by ${h.ext(LF_DECRET, 'decree no. 93-1362 of 30 December 1993')}.</p>
<p>A refusal gives reasons. If the file was inadmissible, you can apply again once the reason has gone. If the application was judged inappropriate (inopportune), it is either rejected or postponed: after a rejection, a new application filed less than five years after notification may be closed without examination; after a postponement, you must wait until the set period ends. This is information, not legal advice: an association or a lawyer can help with an appeal.</p>
<h2>The citizenship welcome ceremony</h2>
<p>According to ${h.src('sp_F15868', 'the official page on the welcome ceremony')}, the prefect holds the ceremony in principle within six months of the decree’s publication: around ${h.date(ceremonie)} in our example. An employee, and their spouse, are entitled to at least half a day off to attend, on showing the invitation, without it counting against paid holiday. You receive a welcome pack with the charter, the 1789 Declaration of the Rights of Man and of the Citizen, extracts of the Constitution and the national anthem. You can then apply for a French identity card and passport; anyone who becomes French between 16 and 25 must register for national service census (recensement) within the month.</p>
`,
  },
});
