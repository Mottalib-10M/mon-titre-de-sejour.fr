import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { fenetreRenouvellement } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

const T = P.tarifs, A = P.algerien;
const fen = fenetreRenouvellement('2027-05-31', '2026-10-13');
const L_DEC = 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000599731';
const L_L432 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771934/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'certificat-de-residence-algerien',
  group: 'titres',
  order: 90,
  mini: 'algerien',
  miniHref: 'renouvellement-titre-de-sejour',
  related: ['renouvellement-titre-de-sejour', 'carte-de-resident', 'titre-de-sejour', 'conjoint-de-francais', 'procedure-regroupement-familial'],
  sources: ['sp_F2215', 'sp_F2257', 'sp_F39', 'sp_F38329'],
  fr: {
    slug: 'certificat-de-residence-algerien',
    nav: 'Certificat de résidence algérien',
    card: 'Accord de 1968 : certificats d’un an et de dix ans, cas gratuits, absences et renouvellement.',
    title: 'Certificat de résidence algérien 2026 : 1 an, 10 ans, prix',
    description: 'Certificat de résidence algérien 2026 : accord de 1968, certificat d’un an ou de dix ans, cas gratuits, timbres, règle des 3 ans d’absence et renouvellement.',
    h1: 'Certificat de résidence algérien : un an ou dix ans, et à quel prix',
    intro: 'Les Algériens ne reçoivent pas de carte de séjour mais un certificat de résidence, sous les règles de l’accord franco-algérien de 1968.',
    resume: `Un ressortissant algérien majeur qui reste plus de trois mois en France ne demande pas une carte de séjour du CESEDA mais un certificat de résidence, régi par l’accord franco-algérien du 27 décembre 1968. Il en existe deux : le certificat d’un an, avec une mention (vie privée et familiale, salarié, étudiant, visiteur…), et le certificat de dix ans. Le certificat de dix ans est délivré gratuitement, à la première demande comme au renouvellement ; le conjoint d’un Français y accède après un an de mariage, contre trois ans pour la carte de résident des autres nationalités. Le certificat d’un an suit en général le barème des timbres : ${eF(A.un_an_premiere)} pour un premier certificat vie privée et familiale, ${eF(T.minore.premiere)} pour un étudiant, ${eF(T.normal.renouvellement)} pour la plupart des renouvellements. Le certificat de dix ans cesse d’être valable après plus de ${A.absence_max_ans} ans d’absence consécutifs. Pour un certificat qui expire le 31 mai 2027, le renouvellement se dépose sur l’ANEF entre le ${dF(fen.ouverture)} et le ${dF(fen.limite)}.`,
    faqs: [
      { q: 'Pourquoi les Algériens n’ont-ils pas de carte de séjour ?', a: 'Parce que leur séjour est réglé par l’accord franco-algérien de 1968, qui prévaut sur le CESEDA pour les points qu’il traite. Il crée ses propres titres, les certificats de résidence, avec des durées et des conditions différentes. Le CESEDA continue de s’appliquer pour ce que l’accord ne prévoit pas, comme la procédure ou certaines taxes.' },
      { q: 'Un Algérien marié à une Française obtient-il plus vite le certificat de dix ans ?', a: 'Oui. La fiche officielle prévoit le certificat de dix ans après au moins un an de mariage, avec communauté de vie effective, conjoint resté français, séjour régulier et mariage transcrit s’il a eu lieu à l’étranger. Pour les autres nationalités, la carte de résident du conjoint de Français demande trois ans de mariage, un an pour les Tunisiens.' },
      { q: 'Le contrat d’engagement aux principes de la République est-il obligatoire pour un Algérien ?', a: 'Non. La fiche sur ce contrat dispense les Algériens de l’obligation, pour tous leurs titres ; sa signature reste facultative et le formulaire figure dans la liste des pièces comme document facultatif. Les autres conditions du certificat demandé, ressources ou communauté de vie par exemple, restent exigées.' },
      { q: 'Peut-on perdre son certificat de dix ans en vivant en Algérie ?', a: `Oui, si vous vous absentez de France plus de ${A.absence_max_ans} ans d’affilée, sauf accord de l’administration pour prolonger cette absence. Avant un long séjour à l’étranger, demandez cette prolongation à la préfecture. Le renouvellement lui-même reste gratuit, mais un dépôt hors délai coûte ${eF(T.retard_renouvellement)}.` },
    ],
    body: (h) => `
<h2>Ce que dit l’accord de 1968</h2>
<p>L’accord du 27 décembre 1968 relatif à la circulation, à l’emploi et au séjour des ressortissants algériens fixe ses propres règles, publiées en dernier lieu par ${h.ext(L_DEC, 'le décret n° 2002-1500 du 20 décembre 2002')}. ${h.src('sp_F39', 'La fiche sur les titres obligatoires')} rappelle qu’un Algérien doit détenir un visa de long séjour, un certificat de résidence d’un an, un certificat de dix ans ou un certificat retraité. Il ne reçoit ni carte pluriannuelle ni carte de résident permanent : la fiche Carte de résident permanent le renvoie au certificat de résidence.</p>
<p>Les certificats se demandent comme les cartes : sur l’ANEF pour la plupart des motifs, en préfecture pour d’autres, avec une visite médicale de l’OFII avant le premier certificat. Les actes d’état civil sont accompagnés d’une traduction par un traducteur agréé.</p>
<h2>Le certificat d’un an : les motifs</h2>
<p>${h.src('sp_F2215', 'La fiche Certificat de résidence d’un an')}, vérifiée le 1er août 2026, distingue des motifs familiaux et des motifs professionnels ou d’études. Côté famille : conjoint ou enfant majeur d’un Algérien venu par regroupement familial, conjoint d’un Français (un visa de court séjour suffit pour être entré régulièrement), parent d’un enfant français mineur, jeune né en France, résidence habituelle de plus de dix ans (quinze ans si une partie s’est faite comme étudiant), état de santé, liens personnels et familiaux. Côté activité : salarié, profession non salariée, travailleur temporaire, chercheur, artiste, étudiant, stagiaire, visiteur.</p>
${h.table(['Certificat d’un an', 'Première délivrance', 'Renouvellement'], [
  ['Famille venue par regroupement familial', 'gratuit', h.eur(T.minore.renouvellement)],
  ['Conjoint de Français, vie privée et familiale', h.eur(A.un_an_premiere), h.eur(T.normal.renouvellement)],
  ['Salarié, profession non salariée (sur visa)', 'gratuit', h.eur(T.normal.renouvellement)],
  ['Changement de statut vers un motif professionnel', h.eur(T.normal.renouvellement), h.eur(T.normal.renouvellement)],
  ['Étudiant, stagiaire', h.eur(T.minore.premiere), h.eur(T.minore.renouvellement)],
], 'Montants relevés sur la fiche F2215 ; en situation irrégulière, droit de visa de régularisation en plus', ['l', 'r', 'r'])}
<p>Quand le demandeur est en situation irrégulière, le droit de visa de régularisation de ${h.eur(T.visa_regularisation)} s’ajoute. Sans réponse en quatre mois, la demande est réputée refusée.</p>
<h2>Le certificat de dix ans : qui y a droit</h2>
<p>${h.src('sp_F2257', 'La fiche Certificat de résidence de dix ans')} n’a pas été mise à jour depuis le 1er octobre 2024 : ses règles de fond découlent de l’accord et n’ont pas été modifiées par les réformes de 2026, mais vérifiez-la avant de déposer. Elle prévoit le certificat de dix ans pour le conjoint d’un Français marié depuis au moins un an, l’enfant ou l’ascendant d’un Français, le parent d’un enfant français mineur à la fin de son certificat d’un an, la famille d’un Algérien titulaire du certificat de dix ans venue par regroupement familial, le titulaire d’une rente d’accident du travail, la personne qui réside en France depuis l’âge de dix ans ou régulièrement depuis plus de dix ans, et celle qui a cinq ans de certificat vie privée et familiale.</p>
<p>Un dernier cas dépend du préfet : après trois ans de séjour légal et ininterrompu avec un certificat d’un an visiteur, salarié, vie privée et familiale, travailleur temporaire, scientifique ou profession artistique, il peut accorder ou refuser le certificat de dix ans, en tenant compte de vos moyens d’existence et de votre intention de vous installer durablement.</p>
<h2>Prix, absences et renouvellement</h2>
<p>Le certificat de dix ans est gratuit, à la première délivrance comme au renouvellement. Seul le dépôt hors délai coûte ${h.eur(T.retard_renouvellement)}, sauf force majeure ou visa valide. Le renouvellement se fait sur l’ANEF, au plus tôt ${h.num(P.renouvellement.au_plus_tot_mois)} mois et au plus tard ${h.num(P.renouvellement.au_plus_tard_mois)} mois avant la fin du certificat. Le certificat cesse d’être valable après plus de ${h.num(A.absence_max_ans)} ans d’absence consécutifs, sauf accord de l’administration pour prolonger l’absence : le mini-simulateur ci-dessus vous le signale.</p>
<p>Pendant l’instruction, le récépissé de renouvellement d’un certificat vie privée et familiale d’un an ou d’un certificat de dix ans permet de continuer à travailler. Les refus suivent ${h.ext(L_L432, 'les règles de procédure du CESEDA (articles L432-1 et suivants)')} : recours gracieux, hiérarchique ou contentieux dans les deux mois.</p>
<h2>Le dossier pratique</h2>
<p>Pour un premier certificat sur l’ANEF, comptez le visa de long séjour (ou le visa d’entrée pour le conjoint d’un Français), le passeport avec les pages d’état civil, de validité et les cachets d’entrée, un extrait d’acte de naissance avec filiation, l’acte de mariage et les actes de naissance des enfants le cas échéant, un justificatif de domicile de moins de trois mois et le code d’une e-photo. Le certificat médical de l’OFII se remet sauf exception. Une personne mariée originaire d’un pays qui autorise la polygamie joint une déclaration sur l’honneur de non-polygamie. La liste exacte dépend du motif : elle figure sur la fiche de chaque cas.</p>
<h2>Ce que ce régime change par rapport aux autres nationalités</h2>
<p>Trois différences reviennent le plus souvent. La durée de mariage pour le titre de dix ans est plus courte. Le titre de dix ans est gratuit, alors que la carte de résident coûte ${h.eur(coutResident())} aux autres. Enfin la carte pluriannuelle n’existe pas : on passe directement du certificat d’un an au certificat de dix ans. Notre simulateur « quel titre » signale l’accord quand vous choisissez la nationalité algérienne, sans le simuler en entier. Cette page est une information générale, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'algerian-residence-certificate',
    nav: 'Algerian residence certificate',
    card: 'The 1968 agreement: one-year and ten-year certificates, free cases, absences and renewal.',
    title: 'Algerian Residence Certificate 2026: 1 Year, 10 Years, Cost',
    description: 'Algerian residence certificate France 2026: the 1968 agreement, one-year or ten-year certificate, free cases, stamps, 3-year absence rule and renewal.',
    h1: 'Algerian residence certificate: one year or ten, and at what cost',
    intro: 'Algerian nationals do not receive a residence card but a residence certificate, under the rules of the 1968 Franco-Algerian agreement.',
    resume: `An adult Algerian national staying more than three months in France does not apply for a residence card under the CESEDA immigration code but for a residence certificate (certificat de résidence), governed by the Franco-Algerian agreement of 27 December 1968. There are two: the one-year certificate, with a mention (private and family life, employee, student, visitor and so on), and the ten-year certificate. The ten-year certificate is free, on first issue and on renewal; the spouse of a French national can get it after one year of marriage, against three years for the resident card of other nationalities. The one-year certificate generally follows the stamp schedule: ${eE(A.un_an_premiere)} for a first private and family life certificate, ${eE(T.minore.premiere)} for a student, ${eE(T.normal.renouvellement)} for most renewals. The ten-year certificate stops being valid after more than ${A.absence_max_ans} consecutive years of absence. For a certificate ending on 31 May 2027, renewal is filed on the ANEF portal between ${dE(fen.ouverture)} and ${dE(fen.limite)}.`,
    faqs: [
      { q: 'Why don’t Algerian nationals get a residence card?', a: 'Because their stay is governed by the 1968 Franco-Algerian agreement, which takes precedence over the CESEDA on the points it covers. It creates its own permits, the residence certificates, with different lengths and conditions. The CESEDA still applies to whatever the agreement leaves out, such as procedure and some fees.' },
      { q: 'Does an Algerian married to a French national get the ten-year certificate sooner?', a: 'Yes. The official page provides the ten-year certificate after at least one year of marriage, with a genuine shared life, a spouse who has kept French nationality, lawful residence and the marriage registered in France if it took place abroad. For other nationalities, the spouse’s resident card requires three years of marriage, one year for Tunisians.' },
      { q: 'Must an Algerian sign the commitment to the principles of the Republic?', a: 'No. The official page on that contract exempts Algerian nationals for all their permits; signing it is optional and the form appears as an optional document in the file. The other conditions of the certificate requested, such as income or a shared married life, still apply.' },
      { q: 'Can I lose my ten-year certificate by living in Algeria?', a: `Yes, if you are away from France for more than ${A.absence_max_ans} years in a row, unless the administration agrees to extend the absence. Before a long stay abroad, ask the prefecture for that extension. Renewal itself remains free, but filing late costs ${eE(T.retard_renouvellement)}.` },
    ],
    body: (h) => `
<h2>What the 1968 agreement says</h2>
<p>The agreement of 27 December 1968 on the movement, employment and residence of Algerian nationals sets its own rules, most recently published by ${h.ext(L_DEC, 'decree no. 2002-1500 of 20 December 2002')}. ${h.src('sp_F39', 'The official page on compulsory permits')} states that an Algerian must hold a long-stay visa, a one-year certificate, a ten-year certificate or a retiree certificate. There is no multi-year card and no permanent resident card: the official permanent-resident page sends Algerians back to the residence certificate.</p>
<p>Certificates are applied for like cards: on the ANEF online portal for most grounds, at the prefecture for others, with an OFII medical check before the first certificate (OFII is the French immigration and integration office). Civil-status documents must come with a translation by an approved translator.</p>
<h2>The one-year certificate: grounds</h2>
<p>${h.src('sp_F2215', 'The official one-year certificate page')}, checked on 1 August 2026, separates family grounds from work and study grounds. Family: spouse or adult child of an Algerian admitted through family reunification, spouse of a French national (a short-stay visa is enough to count as lawful entry), parent of a French minor, young person born in France, habitual residence of over ten years (fifteen if part of it was as a student), health, personal and family ties. Work and study: employee, self-employed activity, temporary worker, researcher, artist, student, trainee, visitor.</p>
${h.table(['One-year certificate', 'First issue', 'Renewal'], [
  ['Family admitted through reunification', 'free', h.eur(T.minore.renouvellement)],
  ['Spouse of a French national, family life', h.eur(A.un_an_premiere), h.eur(T.normal.renouvellement)],
  ['Employee, self-employed (on a visa)', 'free', h.eur(T.normal.renouvellement)],
  ['Change of status to a work ground', h.eur(T.normal.renouvellement), h.eur(T.normal.renouvellement)],
  ['Student, trainee', h.eur(T.minore.premiere), h.eur(T.minore.renouvellement)],
], 'Amounts read on page F2215; if your stay is irregular, the regularisation visa fee comes on top', ['l', 'r', 'r'])}
<p>When the applicant's stay is irregular, the ${h.eur(T.visa_regularisation)} regularisation visa fee is added. With no answer in four months, the application counts as refused.</p>
<h2>The ten-year certificate: who qualifies</h2>
<p>${h.src('sp_F2257', 'The official ten-year certificate page')} has not been updated since 1 October 2024: its substantive rules come from the agreement and were not changed by the 2026 reforms, but check it before filing. It grants the ten-year certificate to the spouse of a French national married for at least one year, the child or dependent parent of a French national, the parent of a French minor at the end of their one-year certificate, the family of an Algerian holding the ten-year certificate admitted through reunification, the holder of a work-accident pension, a person living in France since age ten or lawfully for more than ten years, and someone with five years on a family-life certificate.</p>
<p>A last case is up to the prefect: after three years of lawful, uninterrupted residence on a one-year visitor, employee, family life, temporary worker, scientist or artistic profession certificate, the prefect may grant or refuse the ten-year certificate, weighing your means of support and your intention to settle for good.</p>
<h2>Cost, absences and renewal</h2>
<p>The ten-year certificate is free, on first issue and on renewal. Only filing late costs ${h.eur(T.retard_renouvellement)}, unless there is force majeure or a valid visa. Renewal is filed on the ANEF, at the earliest ${h.num(P.renouvellement.au_plus_tot_mois)} months and at the latest ${h.num(P.renouvellement.au_plus_tard_mois)} months before the certificate ends. It stops being valid after more than ${h.num(A.absence_max_ans)} consecutive years of absence, unless the administration agrees to extend the absence: the mini-calculator above flags this.</p>
<p>While the renewal is examined, the receipt (récépissé) issued for a one-year family life certificate or a ten-year certificate lets you keep working. Refusals follow ${h.ext(L_L432, 'the CESEDA procedure rules (articles L432-1 onwards)')}: an appeal to the prefect, the minister or the court within two months.</p>
<h2>The practical file</h2>
<p>For a first certificate on the ANEF, plan for the long-stay visa (or the entry visa for a French national's spouse), the passport pages showing identity, validity and entry stamps, a birth certificate extract showing your parents, the marriage certificate and the children's birth certificates where relevant, proof of address under three months old and the code of an e-photo (a digital photo from an approved booth or photographer). The OFII medical certificate is handed in unless an exception applies. A married applicant from a country that allows polygamy adds a sworn statement of non-polygamy. The exact list depends on the ground and is set out on the official page for each case.</p>
<h2>A worked example</h2>
<p>Take an Algerian engineer who married a French national in Lyon on 10 June 2025 and entered France on a short-stay visa. She first receives a one-year family life certificate, paying ${h.eur(A.un_an_premiere)} in tax stamps. Once the marriage is a year old and the couple still lives together, she can ask for the ten-year certificate, which is free. If she later spends two years working in Algiers, the certificate stays valid; beyond ${h.num(A.absence_max_ans)} consecutive years away she would need the prefecture's prior agreement. When it comes up for renewal, she files on the ANEF in the window above and pays nothing if she is on time.</p>
<h2>How this regime differs from other nationalities</h2>
<p>Three differences come up most often. The marriage period for the ten-year permit is shorter. The ten-year permit is free, whereas the resident card costs others ${h.eur(coutResident())}. And there is no multi-year card: you move straight from the one-year certificate to the ten-year one. Our which-permit calculator flags the agreement when you pick Algerian nationality, without simulating it in full. This page is general information, not legal advice.</p>
`,
  },
});

function coutResident(): number { return P.tarifs.normal.premiere; }
