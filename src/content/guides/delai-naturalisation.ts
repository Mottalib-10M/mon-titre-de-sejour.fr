import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { naturalisation, mariage, dixAnsA } from '../../lib/engine/dates-sejour';
import { addMonths } from '../../lib/engine/dates';
import { displayDate } from '../../lib/format';

const N = P.naturalisation, M = P.mariage;
// Trois demandeurs dont le récépissé date du 2 novembre 2026.
const REC = '2026-11-02';
const a = naturalisation({ debut: '2020-06-15', cas: 'general', recepisse: REC, dixAns: dixAnsA('2020-06-15', REC) });
const b = naturalisation({ debut: '2016-03-01', cas: 'general', recepisse: REC, dixAns: dixAnsA('2016-03-01', REC) });
const c = naturalisation({ debut: '2016-12-01', cas: 'general', recepisse: REC, dixAns: dixAnsA('2016-12-01', REC) });
// Recours après un refus notifié le 1er mars 2028 : 2 mois pour le recours administratif, 4 mois de silence, 2 mois pour le tribunal.
const REFUS = '2028-03-01';
const recoursAdm = addMonths(REFUS, 2);
const silenceRecours = addMonths(recoursAdm, 4);
const tribunal = addMonths(silenceRecours, 2);
const mar = mariage({ date: '2021-05-08', residence3ans: true, recepisse: REC });
const transmission = addMonths(REC, 6);
const LF_DECRET = 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000699753';
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'delai-naturalisation',
  group: 'nationalite',
  order: 40,
  mini: 'delainat',
  miniHref: 'naturalisation-francaise',
  related: ['naturalisation-francaise', 'dossier-naturalisation', 'nationalite-par-mariage', 'delai-titre-de-sejour', 'examen-civique'],
  sources: ['sp_F2213', 'sp_F2726', 'sp_F15868', 'decret_93_1362'],
  fr: {
    slug: 'delai-naturalisation',
    nav: 'Délai de naturalisation',
    card: '18 mois, 12 mois après dix ans, 3 mois de prolongation : le délai légal compté depuis votre récépissé.',
    title: 'Délai de naturalisation 2026 : 18 mois, 12 mois ou prolongé',
    description: 'Délai de naturalisation 2026 : le maximum légal (18 mois, 12 après dix ans de résidence, 3 mois de prolongation), point de départ, recours, sans donnée locale.',
    h1: 'Délai de naturalisation : le délai légal, compté depuis le récépissé',
    intro: 'Entrez le mois de votre récépissé : la date limite de réponse se calcule, contrairement aux délais « par préfecture » qu’aucune source officielle ne publie.',
    resume: `Le seul délai de naturalisation qui existe officiellement est le délai légal de réponse : l’administration a ${N.delai_mois} mois au maximum à partir de la délivrance du récépissé pour répondre à une demande de naturalisation ou de réintégration. Ce délai est ramené à ${N.delai_10ans_mois} mois si vous justifiez d’une résidence habituelle en France d’au moins dix ans à la date de remise du récépissé. Il peut être prolongé une fois de ${N.prolongation_mois} mois, par une décision motivée. Pour un récépissé du 2 novembre 2026, la réponse est due avant le ${dF(a.delaiReponse!)}, ou le ${dF(a.delaiProlonge!)} en cas de prolongation ; avec dix ans de résidence, avant le ${dF(b.delaiReponse!)}. Le récépissé n’est remis qu’une fois le dossier complet : le temps passé à réunir les pièces ne compte pas. Les tableaux de délais « par préfecture » qui circulent viennent de forums et se contredisent ; aucune préfecture ni aucune plateforme de naturalisation ne publie de délai moyen. Pour la déclaration par mariage, le délai est différent : ${M.refus_ans} an pour refuser l’enregistrement, ${M.refus_opposition_ans} ans en cas d’opposition.`,
    faqs: [
      { q: 'À partir de quel jour le délai de dix-huit mois commence-t-il ?', a: 'Du jour où le récépissé vous est remis, c’est-à-dire quand vous avez fourni tous les documents demandés. Le dépôt en ligne lui-même ne déclenche rien tant qu’il manque une pièce. C’est pourquoi un dossier complet dès l’envoi raccourcit le parcours : chaque document réclamé ensuite repousse la date du récépissé.' },
      { q: 'Comment savoir si l’on a droit au délai de douze mois ?', a: `Comptez dix ans de résidence habituelle en France à la date de remise du récépissé. Installée le 1er mars 2016, une personne dont le récépissé date du 2 novembre 2026 a droit à ${N.delai_10ans_mois} mois ; installée le 1er décembre 2016, elle n’a que neuf ans et onze mois et reste à ${N.delai_mois} mois. La différence se joue parfois à quelques semaines.` },
      { q: 'La prolongation de trois mois peut-elle être répétée ?', a: `Non. La fiche officielle prévoit une seule prolongation, de ${N.prolongation_mois} mois, et l’administration doit motiver sa décision, c’est-à-dire expliquer pourquoi elle a besoin de plus de temps. Au total, un dossier ordinaire ne peut donc pas dépasser ${N.delai_mois + N.prolongation_mois} mois après le récépissé, ${N.delai_10ans_mois + N.prolongation_mois} mois avec dix ans de résidence.` },
      { q: 'Pourquoi ne trouve-t-on aucun délai officiel par préfecture ?', a: 'Parce qu’aucune administration ne les publie. Les chiffres « Paris 18 à 28 mois » ou « Île-de-France 24 à 36 mois » que l’on lit en ligne sont des estimations tirées de témoignages, parfois contradictoires sur une même page. Nous préférons calculer le seul délai certain, le délai légal, plutôt que d’afficher une moyenne inventée.' },
      { q: 'Combien de temps pour contester un refus de naturalisation ?', a: `Deux mois après la notification pour le recours administratif obligatoire auprès du ministre ; sans réponse quatre mois après sa réception, deux mois de plus pour saisir le tribunal administratif de Nantes. Pour un refus notifié le 1er mars 2028, le recours administratif doit partir avant le ${dF(recoursAdm)}.` },
    ],
    body: (h) => `
<h2>Le délai que fixe la loi</h2>
<p>${h.src('sp_F2213', 'La fiche Naturalisation française par décret')}, vérifiée le 16 juillet 2026, est explicite : l’administration a ${h.num(N.delai_mois)} mois au maximum à partir de la délivrance du récépissé pour répondre. Le délai est réduit à ${h.num(N.delai_10ans_mois)} mois quand vous justifiez d’une résidence habituelle en France depuis au moins dix ans à la date de remise du récépissé. Il peut être prolongé une fois de ${h.num(N.prolongation_mois)} mois, par une décision motivée. Ces règles valent pour la naturalisation comme pour la réintégration dans la nationalité française, et la procédure est organisée par le ${h.ext(LF_DECRET, 'décret n° 93-1362 du 30 décembre 1993')}.</p>
${h.table(['Demandeur (récépissé du 2 novembre 2026)', 'Résidence au récépissé', 'Réponse due avant', 'Avec prolongation'], [
  ['Installé le 15 juin 2020', 'moins de 10 ans', h.date(a.delaiReponse!), h.date(a.delaiProlonge!)],
  ['Installé le 1er mars 2016', '10 ans ou plus', h.date(b.delaiReponse!), h.date(b.delaiProlonge!)],
  ['Installé le 1er décembre 2016', 'moins de 10 ans', h.date(c.delaiReponse!), h.date(c.delaiProlonge!)],
], 'Délais calculés avec le moteur du site', ['l', 'l', 'r', 'r'])}
<p>Le troisième cas montre l’effet de seuil : à un mois près, le délai passe de ${h.num(N.delai_10ans_mois)} à ${h.num(N.delai_mois)} mois. Si vous approchez des dix ans, il peut être utile de le savoir avant de choisir la date de dépôt ; ${h.a('naturalisation-francaise', 'le simulateur de naturalisation')} fait la comparaison à partir de vos dates.</p>
<h2>Ce qui se passe avant le récépissé</h2>
<p>Le délai ne court pas tant que le dossier est incomplet. Après l’envoi en ligne, le service instructeur peut demander des pièces complémentaires ou des formalités et fixe un délai pour les fournir. Si vous ne respectez pas ce délai, le dossier peut être classé sans suite : il n’est pas examiné, et il faudra recommencer. Le récépissé n’est délivré que lorsque tout a été fourni. La meilleure façon d’avancer la date limite de réponse est donc d’envoyer d’emblée ${h.a('dossier-naturalisation', 'un dossier complet')}, traductions et bordereau fiscal compris.</p>
<h2>Pendant l’instruction</h2>
<p>Entre le récépissé et la décision ont lieu l’entretien d’assimilation en préfecture, si la demande est recevable, et une enquête sur votre comportement civique et votre passé judiciaire. Si vous déposez en ligne, vous suivez chaque étape sur votre espace personnel et recevez un courriel à chaque changement. Tout changement de situation (adresse, mariage, emploi) se déclare au fil de l’eau ; il ne fait pas repartir le délai légal, mais un dossier qui ne correspond plus à votre situation peut être ajourné.</p>
<p>La fiche officielle ne dit pas ce qui se passe si l’administration dépasse le délai sans répondre ; nous ne l’affirmons donc pas. Ce que l’on sait, c’est que la réponse peut être un accord, un rejet ou un ajournement (report avec un délai à respecter avant une nouvelle demande).</p>
<h2>Après la décision : décret, cérémonie, recours</h2>
<p>En cas d’accord, le décret est publié au Journal officiel et prend effet à la date de sa signature. ${h.src('sp_F15868', 'La fiche sur la cérémonie d’accueil')} indique que celle-ci est en principe organisée dans les six mois suivant la publication du décret. Le décret reste susceptible de retrait pendant deux ans si les conditions n’étaient pas remplies.</p>
<p>En cas de refus, les délais sont stricts. Pour un refus notifié le ${h.date(REFUS)} :</p>
${h.table(['Étape', 'Délai', 'Date limite'], [
  ['Recours administratif obligatoire auprès du ministre', '2 mois après la notification', h.date(recoursAdm)],
  ['Silence du ministre valant rejet (recours envoyé le dernier jour)', '4 mois après réception', h.date(silenceRecours)],
  ['Recours devant le tribunal administratif de Nantes', '2 mois après le rejet', h.date(tribunal)],
], undefined, ['l', 'l', 'r'])}
<h2>La déclaration par mariage suit d’autres délais</h2>
<p>Pour le conjoint d’un Français, il n’y a pas de décret mais un enregistrement. D’après ${h.src('sp_F2726', 'la fiche Déclaration de nationalité par mariage')}, si une condition manque, la plateforme transmet le dossier au ministère avec un avis motivé dans les six mois qui suivent la souscription, soit avant le ${h.date(transmission)} pour une déclaration souscrite le 2 novembre 2026. Le ministère a ${h.num(M.refus_ans)} an à partir du récépissé remis après l’entretien pour refuser l’enregistrement, ${h.num(M.refus_opposition_ans)} ans en cas d’opposition : jusqu’au ${h.date(mar.refusAvant!)} ou au ${h.date(mar.refusOppositionAvant!)} dans cet exemple. Voir ${h.a('nationalite-par-mariage', 'le calcul de la déclaration par mariage')}.</p>
<h2>Un calendrier complet, de bout en bout</h2>
<p>Prenons une personne installée le 15 juin 2020 qui reçoit son récépissé le 2 novembre 2026. L’administration doit lui répondre avant le ${h.date(a.delaiReponse!)}. Si elle prolonge l’instruction par une décision motivée, la limite recule au ${h.date(a.delaiProlonge!)}. Si la réponse est positive, le décret paraît au Journal officiel et la cérémonie suit en principe dans les six mois. Si elle est négative, le calendrier des recours ci-dessus s’enclenche à partir de la notification. Chaque étape a donc une date calculable ; seule la durée réelle d’instruction, à l’intérieur de ces bornes, reste inconnue.</p>
<h2>Ce que nous ne publions pas</h2>
<p>Pas de délai moyen par département, pas de taux d’acceptation, pas de « délai réel constaté » : aucune source officielle ne les fonde, et les chiffres en ligne varient du simple au double selon le site. Information, pas un conseil juridique ; site indépendant de l’administration. Pour suivre un dossier déposé par courrier, seule la sous-direction de l’accès à la nationalité française peut vous renseigner.</p>
`,
  },
  en: {
    slug: 'naturalisation-processing-time',
    nav: 'Naturalisation processing time',
    card: '18 months, 12 after ten years, a 3-month extension: the legal deadline counted from your receipt.',
    title: 'Naturalisation Processing Time 2026: 18 or 12 Months',
    description: 'Naturalisation processing time in France 2026: the legal limit (18 months, 12 after ten years, a 3-month extension), when it starts, appeals, no local averages.',
    h1: 'Naturalisation processing time: the legal deadline from your receipt',
    intro: 'Enter the month of your receipt: the response deadline can be calculated, unlike the per-prefecture waiting times no official source publishes.',
    resume: `The only official naturalisation processing time in France is the legal response deadline: the administration has at most ${N.delai_mois} months from the date it issues your receipt (récépissé) to answer an application for naturalisation or reinstatement. The deadline falls to ${N.delai_10ans_mois} months if you show at least ten years of habitual residence in France on the day the receipt is issued. It can be extended once, by ${N.prolongation_mois} months, through a reasoned decision. For a receipt dated 2 November 2026, the answer is due by ${dE(a.delaiReponse!)}, or ${dE(a.delaiProlonge!)} with the extension; with ten years of residence, by ${dE(b.delaiReponse!)}. The receipt is only issued once your file is complete, so the time spent gathering documents does not count. The "per prefecture" timetables circulating online come from forums and contradict each other; no prefecture or naturalisation platform publishes an average. Citizenship through marriage follows other rules: ${M.refus_ans} year to refuse registration, ${M.refus_opposition_ans} years if the Government objects.`,
    faqs: [
      { q: 'On which day does the eighteen-month clock start?', a: 'On the day the receipt is handed to you, meaning once you have supplied every document requested. Filing online starts nothing while a document is missing. That is why a complete file at the outset shortens the route: each document requested afterwards pushes back the receipt date.' },
      { q: 'How do I know whether the twelve-month deadline applies?', a: `Count ten years of habitual residence in France on the day the receipt is issued. Someone settled since 1 March 2016 whose receipt is dated 2 November 2026 qualifies for ${N.delai_10ans_mois} months; settled on 1 December 2016, they have nine years and eleven months and stay at ${N.delai_mois} months. A few weeks can make the difference.` },
      { q: 'Can the three-month extension be renewed?', a: `No. The official guidance allows a single extension of ${N.prolongation_mois} months, and the administration must give reasons for needing more time. An ordinary file therefore cannot go beyond ${N.delai_mois + N.prolongation_mois} months after the receipt, or ${N.delai_10ans_mois + N.prolongation_mois} months with ten years of residence.` },
      { q: 'Why is there no official waiting time per prefecture?', a: 'Because no authority publishes one. Figures such as "Paris 18 to 28 months" or "Île-de-France 24 to 36 months" found online are estimates gathered from testimonials, sometimes contradicting each other on the same page. We prefer to calculate the one certain period, the legal deadline, rather than display an invented average.' },
      { q: 'How long do I have to challenge a naturalisation refusal?', a: `Two months from notification for the compulsory administrative appeal to the minister; if there is no answer four months after it is received, two more months to bring the case before the administrative court in Nantes. For a refusal notified on 1 March 2028, the administrative appeal must be sent before ${dE(recoursAdm)}.` },
    ],
    body: (h) => `
<h2>The deadline the law sets</h2>
<p>${h.src('sp_F2213', 'The official naturalisation-by-decree page')}, checked on 16 July 2026, is explicit: the administration has at most ${h.num(N.delai_mois)} months from the date it issues the receipt to answer. The period is cut to ${h.num(N.delai_10ans_mois)} months if you have lived habitually in France for at least ten years on the day the receipt is issued. It can be extended once by ${h.num(N.prolongation_mois)} months, with a reasoned decision. The same applies to naturalisation and to reinstatement (réintégration) in French nationality, under ${h.ext(LF_DECRET, 'decree no. 93-1362 of 30 December 1993')}.</p>
${h.table(['Applicant (receipt dated 2 November 2026)', 'Residence on the receipt date', 'Answer due by', 'With extension'], [
  ['Settled on 15 June 2020', 'under 10 years', h.date(a.delaiReponse!), h.date(a.delaiProlonge!)],
  ['Settled on 1 March 2016', '10 years or more', h.date(b.delaiReponse!), h.date(b.delaiProlonge!)],
  ['Settled on 1 December 2016', 'under 10 years', h.date(c.delaiReponse!), h.date(c.delaiProlonge!)],
], 'Deadlines worked out with the site’s engine', ['l', 'l', 'r', 'r'])}
<p>The third case shows the threshold effect: one month either way switches the deadline between ${h.num(N.delai_10ans_mois)} and ${h.num(N.delai_mois)} months. If you are close to ten years, it can be worth knowing before you pick a filing date; ${h.a('naturalisation-francaise', 'the naturalisation calculator')} compares both from your own dates.</p>
<h2>What happens before the receipt</h2>
<p>The clock does not run while the file is incomplete. After you file online, the case officer may ask for further documents or formalities and sets a deadline to provide them. Miss it and the file can be closed without examination (classé sans suite), so you start again. The receipt is issued only once everything is in. The surest way to bring the response deadline forward is to send ${h.a('dossier-naturalisation', 'a complete file')} from the start, translations and tax statement included.</p>
<h2>During the examination</h2>
<p>Between the receipt and the decision come the assimilation interview at the prefecture, if the application is admissible, and checks on your civic conduct and criminal record. If you filed online, you follow every step in your personal account and receive an email at each change. Any change of situation (address, marriage, job) is declared as it happens; it does not restart the legal deadline, but a file that no longer reflects your situation can be postponed.</p>
<p>The official page does not say what happens if the administration lets the deadline pass without answering, so we do not claim anything. What is known is that the answer can be approval, rejection or postponement (ajournement), with a period to wait before applying again.</p>
<h2>After the decision: decree, ceremony, appeals</h2>
<p>If approved, the decree is published in the Official Journal and takes effect on the date it is signed. ${h.src('sp_F15868', 'The official page on the welcome ceremony')} says the ceremony is in principle held within six months of the decree’s publication. The decree can still be withdrawn for two years if the conditions were not met.</p>
<p>If refused, the deadlines are strict. For a refusal notified on ${h.date(REFUS)}:</p>
${h.table(['Step', 'Period', 'Deadline'], [
  ['Compulsory administrative appeal to the minister', '2 months after notification', h.date(recoursAdm)],
  ['Minister’s silence counts as rejection (appeal sent on the last day)', '4 months after receipt', h.date(silenceRecours)],
  ['Appeal to the administrative court in Nantes', '2 months after the rejection', h.date(tribunal)],
], undefined, ['l', 'l', 'r'])}
<h2>Citizenship through marriage runs on different deadlines</h2>
<p>For the spouse of a French national there is no decree, only registration. According to ${h.src('sp_F2726', 'the official page on the declaration by marriage')}, if a condition is missing, the platform sends the file to the ministry with a reasoned opinion within six months of the declaration, so before ${h.date(transmission)} for a declaration made on 2 November 2026. The ministry has ${h.num(M.refus_ans)} year from the receipt given after the interview to refuse registration, ${h.num(M.refus_opposition_ans)} years if it objects: until ${h.date(mar.refusAvant!)} or ${h.date(mar.refusOppositionAvant!)} in this example. See ${h.a('nationalite-par-mariage', 'the marriage-declaration calculator')}.</p>
<h2>A complete timetable, end to end</h2>
<p>Take someone settled in France since 15 June 2020 who receives the receipt on 2 November 2026. The administration must answer by ${h.date(a.delaiReponse!)}. If it extends the examination with a reasoned decision, the limit moves to ${h.date(a.delaiProlonge!)}. If the answer is yes, the decree appears in the Official Journal and the ceremony follows, in principle, within six months; you can then apply for a French identity card and passport. If the answer is no, the appeal timetable above starts from the day of notification, and every step after that also has a date you can work out in advance. In other words, each stage of the route has a calculable limit; only the actual time the platform takes inside those limits remains unknown, and it varies from one file to the next. Planning a move, a job change or a trip abroad around these limits is therefore possible, as long as you keep declaring any change of situation in your online account.</p>
<h2>What we do not publish</h2>
<p>No average per département, no approval rate, no "actual observed time": no official source supports them, and online figures vary twofold from one site to the next. This is information, not legal advice, from a site independent of the administration. To follow a file sent by post, only the sub-directorate for access to French nationality (sous-direction de l’accès à la nationalité française) can tell you where it stands.</p>
`,
  },
});
