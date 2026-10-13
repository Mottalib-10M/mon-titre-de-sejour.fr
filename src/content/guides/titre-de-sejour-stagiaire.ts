import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { addMonths, addDays } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

// Fiche F17312 (vérifiée le 1er juin 2026) : visa ou carte « stagiaire » (entreprise, formation continue, hôpital).
const S = P.stagiaire;
const carte = coutTitre('stagiaire', 'premiere').total;
const RE = S.ressources_entreprise, RF = S.ressources_formation_continue;
// Exemples : stage en entreprise de 6 mois ; formation continue de 12 mois.
const ent6 = RE * 6;
const fc12 = RF * 12;
const fc18 = RF * S.duree_max_mois;
// Calendrier : stage débutant le 1er mars 2027 ; convention à faire viser 2 mois avant au moins.
const DEBUT = '2027-03-01';
const viserAvant = addMonths(DEBUT, -2);
const viserAvantEuropeen = addMonths(DEBUT, -1);
const ENVOI = '2026-12-15';
const silenceConvention = addDays(ENVOI, 30);
const silenceAvenant = addDays(ENVOI, 15);
const LF_L426_23 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771910/';
const LF_R426 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042801268/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'titre-de-sejour-stagiaire',
  group: 'travail',
  order: 85,
  mini: 'stagiaire',
  miniHref: 'cout-titre-de-sejour',
  related: ['titre-de-sejour-etudiant', 'visa-long-sejour', 'validation-vls-ts', 'cout-titre-de-sejour', 'carte-de-sejour-jeune-au-pair'],
  sources: ['sp_F17312', 'sp_A18881', 'sp_F2300'],
  fr: {
    slug: 'titre-de-sejour-stagiaire',
    nav: 'Titre de séjour stagiaire',
    card: `Convention visée par la préfecture, ressources de ${eF(RE)} ou du Smic par mois, VLS-TS puis carte stagiaire.`,
    title: 'Titre de séjour stagiaire 2026 : convention et ressources',
    description: 'Stagiaire étranger 2026 : convention visée par la préfecture, ressources mensuelles exigées, VLS-TS mention stagiaire, avenant, carte et durée maximale.',
    h1: 'Titre de séjour stagiaire : convention, ressources et prolongation',
    intro: 'Un stage de plus de trois mois en France passe par une convention visée par la préfecture, puis un visa de long séjour mention stagiaire.',
    resume: `L’étranger non européen qui vient en France plus de trois mois pour un stage obtient un visa de long séjour valant titre de séjour mention stagiaire, puis, si le stage est prolongé, une carte de séjour temporaire stagiaire. Trois cadres existent. En entreprise, dans le cadre d’une formation suivie dans le pays de résidence, le stage dure six mois au plus et les ressources doivent atteindre ${eF(RE)} par mois, soit ${eF(ent6)} pour six mois. En formation continue, pour un salarié d’une entreprise étrangère, la durée initiale va jusqu’à douze mois et il faut ${eF(RF, 2)} par mois, le montant du Smic brut, soit ${eF(fc12, 2)} sur un an. À l’hôpital, dans le cadre d’une coopération internationale, les ressources correspondent à la gratification versée. Dans tous les cas, la convention est visée par la préfecture au moins deux mois avant le début du stage, et le stage ne peut être prolongé qu’une fois, sans dépasser ${S.duree_max_mois} mois. La carte stagiaire coûte ${eF(carte)} en timbres fiscaux. Une convention de stage ne donne jamais le statut de salarié.`,
    faqs: [
      { q: 'Un stage de moins de trois mois demande-t-il un titre stagiaire ?', a: 'Non. La fiche officielle prévoit une procédure différente pour un stage inférieur à trois mois : il relève du visa de court séjour, pas du visa de long séjour valant titre de séjour mention stagiaire. La convention visée par la préfecture et la carte stagiaire concernent les séjours de plus de trois mois pour un stage ou une formation.' },
      { q: 'Quel montant de ressources faut-il prouver pour un stage en entreprise ?', a: `Au moins ${eF(RE)} par mois pendant tout le séjour, soit ${eF(ent6)} pour un stage de six mois, la durée maximale en entreprise. Pour une formation continue, le minimum monte à ${eF(RF, 2)} par mois, le Smic brut en vigueur. À l’hôpital, il correspond à la gratification prévue. Le mini-simulateur de la page fait le total selon la durée.` },
      { q: 'Qui fait viser la convention et que se passe-t-il sans réponse ?', a: `L’entreprise, l’organisme de formation ou l’hôpital d’accueil envoie la convention à la préfecture par lettre recommandée avec avis de réception, au moins deux mois avant le début du stage. Sans réponse dans les 30 jours, la validation est refusée : une convention envoyée le ${dF(ENVOI)} serait refusée tacitement le ${dF(silenceConvention)}. Les Canadiens sont dispensés de cette validation.` },
      { q: 'Comment prolonger un stage au-delà de la durée initiale ?', a: `L’organisme d’accueil fait valider un avenant à la convention ; cette fois, le silence de l’administration pendant 15 jours vaut acceptation. Vous demandez ensuite une carte de séjour temporaire stagiaire en préfecture et payez ${eF(carte)} en timbres. Le stage ne se prolonge qu’une seule fois et ne peut pas dépasser ${S.duree_max_mois} mois au total.` },
      { q: 'Quelles règles pour un stage dans un hôpital français ?', a: 'Le stage hospitalier s’inscrit dans une convention de coopération internationale hospitalière et doit déboucher sur la reconnaissance d’un niveau de qualification professionnelle. La convention lie le stagiaire, l’hôpital public ou privé à but non lucratif et l’organisme de coopération sanitaire. La durée initiale est de six mois au plus, et les ressources exigées correspondent au montant de la gratification versée.' },
      { q: 'Le stagiaire étranger peut-il être payé comme un salarié ?', a: 'Non. La fiche officielle répète pour chaque cadre que la convention de stage ne peut pas donner le statut de salarié. Si l’entreprise veut vous embaucher, il faut changer de titre : un contrat de travail, avec l’autorisation de travail demandée par l’employeur, relève de la carte salarié ou, selon le salaire et le diplôme, de la carte talent.' },
    ],
    body: (h) => `
<h2>Trois cadres de stage, trois niveaux de ressources</h2>
<p>La fiche de Service-Public.fr distingue trois situations, qui ne se confondent pas avec le statut d’étudiant inscrit en France. Le choix du cadre fixe la durée possible et le montant minimal de ressources.</p>
${h.table(['Cadre', 'Convention entre', 'Durée initiale maximale', 'Ressources par mois'], [
  ['Entreprise', 'vous, l’établissement de formation à l’étranger, l’entreprise d’accueil', '6 mois', h.eur(RE)],
  ['Formation continue', 'vous, votre employeur étranger, l’organisme de formation ou l’entreprise partenaire', '12 mois', h.eur(RF, 2)],
  ['Hôpital', 'vous, l’hôpital, l’organisme de coopération sanitaire', '6 mois', 'montant de la gratification'],
], 'Stagiaire étranger : les trois cadres (fiche F17312)', ['l', 'l', 'r', 'r'])}
<p>Le minimum de la formation continue est le Smic brut mensuel, ${h.src('sp_F2300', 'revalorisé le 1er juin 2026')}. Pour un an de formation continue, il faut donc justifier de ${h.eur(fc12, 2)} ; pour une durée totale portée à ${h.num(S.duree_max_mois)} mois, de ${h.eur(fc18, 2)}. Les ressources se prouvent par tout moyen : bourse, rémunération versée par l’employeur étranger, attestation bancaire. Le titre est prévu à ${h.ext(LF_L426_23, 'l’article L426-23 du CESEDA')} et précisé aux ${h.ext(LF_R426, 'articles R426-16 à R426-22')}.</p>
<h2>Le budget selon la durée du stage</h2>
<p>Le tableau applique les minimums mensuels de la fiche à des durées courantes. En entreprise, la durée est plafonnée à six mois : au-delà, la ligne n’a pas de sens. En formation continue, douze mois de durée initiale, puis une prolongation possible jusqu’à ${h.num(S.duree_max_mois)} mois au total. Ces montants sont des minimums de ressources à justifier, pas des frais à payer : ils montrent à la préfecture et au consulat que vous pourrez vivre en France pendant le stage.</p>
${h.table(['Durée', 'Stage en entreprise', 'Formation continue'], [
  ['4 mois', h.eur(RE * 4), h.eur(RF * 4, 2)],
  ['6 mois', h.eur(ent6), h.eur(RF * 6, 2)],
  ['12 mois', 'au-delà du maximum', h.eur(fc12, 2)],
  [`${h.num(S.duree_max_mois)} mois`, 'au-delà du maximum', h.eur(fc18, 2)],
], 'Ressources minimales à justifier sur la durée du séjour', ['l', 'r', 'r'])}
<h2>Le calendrier : la convention d’abord</h2>
<p>Rien ne se fait sans la convention de stage tripartite visée par l’administration. L’organisme d’accueil l’envoie à la préfecture par lettre recommandée avec avis de réception au moins deux mois avant le début du stage, ou un mois si le stage relève d’un programme de coopération européen ou intergouvernemental (cette réduction ne vaut pas pour la formation continue). Pour un stage qui commence le ${h.date(DEBUT)}, l’envoi doit partir avant le ${h.date(viserAvant)}, ou avant le ${h.date(viserAvantEuropeen)} dans un programme européen. Attention au silence : sans réponse dans les 30 jours, ou 15 jours pour un programme européen, la validation est réputée refusée. Il vaut donc mieux envoyer tôt et relancer.</p>
<ol>
<li>Convention signée, visée par la préfecture, transmise au stagiaire avant le départ.</li>
<li>Demande de visa de long séjour valant titre de séjour mention stagiaire au consulat, avec passeport, convention visée, justificatif de ressources et justificatif d’hébergement en France.</li>
<li>Arrivée : le VLS-TS dispense de carte pendant sa validité ; l’OFII peut vous convoquer, notamment pour une visite médicale. Le visa se valide en ligne dans les trois mois, ce que calcule ${h.a('validation-vls-ts', 'le simulateur de validation du VLS-TS')}.</li>
</ol>
<h2>Prolonger le stage : l’avenant puis la carte stagiaire</h2>
<p>Pour aller au-delà de la durée initiale, l’organisme d’accueil fait valider un avenant à la convention. La règle du silence s’inverse : sans réponse de l’administration dans les 15 jours, l’avenant est accepté. Pour un avenant envoyé le ${h.date(ENVOI)}, l’accord tacite serait acquis le ${h.date(silenceAvenant)}. Vous demandez alors, en préfecture et le plus souvent sur rendez-vous, une carte de séjour temporaire mention stagiaire, avec le visa qui arrive à son terme, le passeport, un justificatif de domicile de moins de six mois, la convention initiale et son avenant et les justificatifs de ressources.</p>
<p>La carte coûte ${h.eur(carte)} en timbres fiscaux au tarif minoré du ${h.src('sp_A18881', 'barème entré en vigueur le 1er mai 2026')}. Les timbres sont demandés à l’accord ou à la remise de la carte : renseignez-vous auprès de votre préfecture avant de les acheter. Le stage ne peut être prolongé qu’une fois et la durée totale ne dépasse jamais ${h.num(S.duree_max_mois)} mois.</p>
<h2>Ce que le titre stagiaire ne permet pas</h2>
<p>La convention ne crée pas de contrat de travail : le stagiaire n’a pas le statut de salarié, et le titre ne permet pas d’exercer un autre emploi. Un passage vers un emploi en France suppose un nouveau titre, salarié ou talent, avec ses propres conditions, et ${h.a('quel-titre-de-sejour', 'l’orientation « quel titre »')} aide à repérer le bon. Les étudiants inscrits dans un établissement français relèvent, eux, du ${h.a('titre-de-sejour-etudiant', 'titre de séjour étudiant')}. Référence : ${h.src('sp_F17312', 'la fiche Stagiaire étranger en France')}. Information générale, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'trainee-residence-permit',
    nav: 'Trainee residence permit',
    card: `Agreement approved by the prefecture, monthly resources of ${eE(RE)} or the minimum wage, VLS-TS then trainee card.`,
    title: 'Trainee Residence Permit 2026: Internship Agreement, Funds',
    description: 'Foreign trainees in France 2026: internship agreement approved by the prefecture, monthly funds required, VLS-TS trainee visa, extension and maximum length.',
    h1: 'Trainee residence permit in France: agreement, resources and extension',
    intro: 'An internship of more than three months in France needs an agreement approved by the prefecture, then a long-stay visa marked stagiaire.',
    resume: `A non-EU national coming to France for more than three months for an internship or training receives a long-stay visa that serves as a residence permit (VLS-TS) marked stagiaire, then, if the internship is extended, a temporary trainee card. There are three frameworks. In a company, as part of a course followed in your country of residence, the internship lasts six months at most and you need resources of ${eE(RE)} a month, ${eE(ent6)} for six months. In continuing education, for an employee of a foreign company, the initial length can reach twelve months and you need ${eE(RF, 2)} a month, the gross minimum wage, which is ${eE(fc12, 2)} over a year. In a hospital, under an international health cooperation agreement, the resources match the stipend paid. In every case, the prefecture must approve the internship agreement (convention de stage) at least two months before the start, and the internship can be extended only once, never beyond ${S.duree_max_mois} months. The trainee card costs ${eE(carte)} in tax stamps. An internship agreement never gives employee status.`,
    faqs: [
      { q: 'Does an internship shorter than three months need a trainee permit?', a: 'No. The official page sets a different procedure for internships under three months: they fall under the short-stay visa, not the long-stay visa marked stagiaire. The prefecture-approved agreement and the trainee card only concern stays of more than three months for an internship or training.' },
      { q: 'How much money must I show for a company internship?', a: `At least ${eE(RE)} a month for the whole stay, ${eE(ent6)} for a six-month internship, the maximum in a company. For continuing education the minimum rises to ${eE(RF, 2)} a month, the gross minimum wage in force. In a hospital it matches the planned stipend. The mini-calculator on this page totals it for your length of stay.` },
      { q: 'Who gets the agreement approved, and what if nobody answers?', a: `The host company, training body or hospital sends the agreement to the prefecture by recorded delivery at least two months before the internship starts. With no answer within 30 days, approval is refused: an agreement sent on ${dE(ENVOI)} would be tacitly refused on ${dE(silenceConvention)}. Canadian nationals do not need this approval.` },
      { q: 'How do I extend an internship beyond its initial length?', a: `The host has an amendment (avenant) to the agreement approved; this time, 15 days of silence from the authorities count as acceptance. You then apply at the prefecture for a temporary trainee card and pay ${eE(carte)} in stamps. The internship can only be extended once and may not exceed ${S.duree_max_mois} months in total.` },
      { q: 'What rules apply to an internship in a French hospital?', a: 'A hospital internship takes place under an international hospital cooperation agreement and must lead to recognition of a professional qualification level. The agreement binds the trainee, the public or non-profit private hospital and the health cooperation body, plus the paying body if different. The initial length is six months at most, and the required resources match the stipend you will receive.' },
      { q: 'Can a foreign trainee be paid as an employee?', a: 'No. For each framework, the official page repeats that an internship agreement cannot give employee status. If the company wants to hire you, you need a different permit: an employment contract, with a work authorisation requested by the employer, falls under the employee card or, depending on salary and degree, the talent card.' },
    ],
    body: (h) => `
<h2>Three internship frameworks, three resource levels</h2>
<p>The Service-Public.fr page sets out three situations, separate from the status of a student enrolled at a French institution. The framework determines how long you can stay and the minimum resources you need.</p>
${h.table(['Framework', 'Agreement between', 'Maximum initial length', 'Resources per month'], [
  ['Company', 'you, your training institution abroad, the host company', '6 months', h.eur(RE)],
  ['Continuing education', 'you, your foreign employer, the training body or partner company', '12 months', h.eur(RF, 2)],
  ['Hospital', 'you, the hospital, the health cooperation body', '6 months', 'amount of the stipend'],
], 'Foreign trainees: the three frameworks (page F17312)', ['l', 'l', 'r', 'r'])}
<p>The continuing-education minimum is the gross monthly minimum wage (Smic), ${h.src('sp_F2300', 'raised on 1 June 2026')}. A year of continuing education therefore requires ${h.eur(fc12, 2)}; a total length of ${h.num(S.duree_max_mois)} months requires ${h.eur(fc18, 2)}. Resources can be shown by any means: a grant, pay from your foreign employer, a bank statement. The permit is set out in ${h.ext(LF_L426_23, 'section L426-23 of the CESEDA')}, the French immigration code, with details in ${h.ext(LF_R426, 'sections R426-16 to R426-22')}.</p>
<h2>Your budget by internship length</h2>
<p>The table applies the official monthly minimums to common lengths. In a company, the internship is capped at six months, so longer rows do not apply. In continuing education, the initial length is twelve months, with one possible extension up to ${h.num(S.duree_max_mois)} months in total. These figures are minimum resources you must be able to show, not fees you pay: they prove to the prefecture and the consulate that you can support yourself in France during the internship. Proof can combine several sources, for example a stipend from the host and savings, as long as the monthly total reaches the minimum.</p>
${h.table(['Length', 'Company internship', 'Continuing education'], [
  ['4 months', h.eur(RE * 4), h.eur(RF * 4, 2)],
  ['6 months', h.eur(ent6), h.eur(RF * 6, 2)],
  ['12 months', 'beyond the maximum', h.eur(fc12, 2)],
  [`${h.num(S.duree_max_mois)} months`, 'beyond the maximum', h.eur(fc18, 2)],
], 'Minimum resources to show over the stay', ['l', 'r', 'r'])}
<h2>The timetable: the agreement comes first</h2>
<p>Nothing happens without a three-party internship agreement approved by the authorities. The host sends it to the prefecture by recorded delivery at least two months before the start, or one month for an internship under a European or intergovernmental cooperation programme (this shorter period does not apply to continuing education). For an internship starting on ${h.date(DEBUT)}, it must be sent before ${h.date(viserAvant)}, or before ${h.date(viserAvantEuropeen)} under a European programme. Beware of silence: with no answer within 30 days, or 15 days for a European programme, approval is deemed refused. Send it early and follow up.</p>
<ol>
<li>Signed agreement, approved by the prefecture and sent to the trainee before departure.</li>
<li>Application at the consulate for a long-stay visa marked stagiaire, with passport, approved agreement, proof of resources and proof of accommodation in France.</li>
<li>Arrival: the VLS-TS replaces a residence card while it is valid; OFII (the French immigration and integration office) may call you in, notably for a medical check. The visa is validated online within three months, which ${h.a('validation-vls-ts', 'the VLS-TS validation calculator')} works out.</li>
</ol>
<h2>Extending the internship: amendment, then trainee card</h2>
<p>To go beyond the initial length, the host has an amendment to the agreement approved. The silence rule is reversed here: with no answer within 15 days, the amendment is accepted. For an amendment sent on ${h.date(ENVOI)}, tacit approval would be reached on ${h.date(silenceAvenant)}. You then apply at the prefecture, usually by appointment, for a temporary residence card marked stagiaire, bringing the expiring visa, your passport, proof of address under six months old, the original agreement and its amendment, and proof of resources.</p>
<p>The card costs ${h.eur(carte)} in tax stamps (timbres fiscaux) at the reduced rate of ${h.src('sp_A18881', 'the schedule in force since 1 May 2026')}. Stamps are requested on approval or when the card is handed over, so check with your prefecture before buying them. The internship can be extended only once, and the total never exceeds ${h.num(S.duree_max_mois)} months.</p>
<h2>What the trainee permit does not allow</h2>
<p>The agreement does not create an employment contract: a trainee is not an employee, and the permit does not allow other paid work. Moving to a job in France requires a new permit, employee or talent, with its own conditions, and ${h.a('quel-titre-de-sejour', 'the "which permit" tool')} helps you find the right one. Students enrolled at a French institution fall under the ${h.a('titre-de-sejour-etudiant', 'student residence permit')} instead. Before you leave, keep in mind that the date of the prefecture’s approval, not the date you sign the agreement, is what unlocks the visa application at the consulate; plan the two-month margin into your start date. Reference: ${h.src('sp_F17312', 'the official page on foreign trainees in France')}. General information, not legal advice.</p>
`,
  },
});
