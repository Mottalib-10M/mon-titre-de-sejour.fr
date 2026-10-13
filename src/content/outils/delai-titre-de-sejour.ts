import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { TITRES, titreById } from '../../lib/engine/couts';
import { refusImplicite, naturalisation } from '../../lib/engine/dates-sejour';
import { regroupementImplicite } from '../../lib/engine/famille';
import { addMonths } from '../../lib/engine/dates';
import { displayDate } from '../../lib/format';

// Valeurs par défaut du calculateur : conjoint de Français, dépôt le 13 octobre 2026.
const DEPOT = '2026-10-13';
const imp = (id: string) => { const t = titreById(id); return refusImplicite(DEPOT, { mois: t.implicite_mois, jours: t.implicite_jours })!; };
const conj = imp('vpf_conjoint'), etu = imp('etudiant'), cbe = imp('carte_bleue'), sais = imp('saisonnier');
const rf = regroupementImplicite(DEPOT);
const nat = naturalisation({ debut: '2018-01-01', cas: 'general', recepisse: DEPOT });
const recoursConj = addMonths(conj, P.recours.mois);
const n4 = TITRES.filter((t) => t.implicite_mois === 4).length, n90 = TITRES.filter((t) => t.implicite_jours === 90).length;
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'delai-titre-de-sejour',
  group: 'demarches',
  order: 40,
  tool: 'delai',
  related: ['renouvellement-titre-de-sejour', 'recepisse-titre-de-sejour', 'delai-naturalisation', 'procedure-regroupement-familial', 'anef-titre-de-sejour'],
  sources: ['sp_F2209', 'sp_F15898', 'sp_F2231', 'sp_F16922', 'sp_F11166', 'sp_F2213'],
  fr: {
    slug: 'delai-titre-de-sejour',
    nav: 'Délai de réponse',
    card: 'Date du refus implicite selon le titre, délai de recours, et pourquoi aucun délai de préfecture n’est publié.',
    title: 'Délai titre de séjour 2026 : refus implicite et recours',
    description: 'Délai de réponse à un titre de séjour en 2026 : date à laquelle le silence vaut refus selon le titre, délai de recours de deux mois, sans délai inventé.',
    h1: 'Délai de réponse d’un titre de séjour : ce que fixe la loi',
    intro: 'Choisissez le titre et la date du dépôt : le simulateur donne le jour où le silence de la préfecture vaut refus.',
    resume: `Aucune préfecture ne publie de délai moyen de traitement des titres de séjour, et les tableaux « par préfecture » qui circulent viennent de forums. Ce que fixe la loi, c’est la durée au terme de laquelle le silence de l’administration vaut refus implicite. Elle est de 4 mois pour la plupart des cartes (${n4} des titres du simulateur), dont la carte vie privée et familiale et la carte salarié, de 90 jours pour la carte étudiant, la carte bleue européenne et la carte salarié détaché ICT, de 3 mois pour le travailleur saisonnier et de 6 mois pour le regroupement familial. Pour un dépôt le ${dF(DEPOT)}, la demande d’un conjoint de Français est implicitement refusée le ${dF(conj)} sans réponse, celle d’un étudiant le ${dF(etu)}. À partir de ce refus, vous disposez de ${P.recours.mois} mois pour un recours gracieux, hiérarchique ou devant le tribunal administratif. En nationalité, le délai de réponse est de ${P.naturalisation.delai_mois} mois après le récépissé.`,
    faqs: [
      { q: 'Un refus implicite empêche-t-il la préfecture de répondre plus tard ?', a: 'Non. Le refus implicite ouvre seulement le droit de contester : la préfecture peut encore accorder le titre après cette date, ce qui arrive souvent. Mais si vous attendez sans former de recours, le délai de deux mois pour contester ce refus implicite court quand même. Gardez la preuve de la date de dépôt, attestation ANEF ou récépissé.' },
      { q: 'Pourquoi ce site ne donne-t-il pas le délai moyen de ma préfecture ?', a: 'Parce qu’aucune source officielle ne le publie. Les délais affichés ailleurs sont des estimations tirées de témoignages, parfois contradictoires sur une même page. Une préfecture peut traiter un renouvellement en quelques semaines et une première demande en plusieurs mois. Nous préférons calculer le seul délai certain : celui que fixe la loi.' },
      { q: 'Quel délai pour contester un refus écrit de titre de séjour ?', a: 'Un refus écrit est motivé et, sauf exception, assorti d’une obligation de quitter le territoire français. Le délai de recours devant le tribunal administratif dépend alors du type d’obligation : 48 heures, 15 jours ou 30 jours, selon la fiche officielle. Ce délai est bien plus court que les deux mois d’un refus implicite : consultez sans attendre une association ou un avocat.' },
    ],
    body: (h) => `
<h2>Le délai de chaque titre</h2>
<p>Le simulateur lit pour chaque titre la durée de silence indiquée sur sa fiche officielle et l’ajoute à la date de dépôt. Quand la fiche ne précise pas cette durée, il l’affiche comme non publiée plutôt que d’en supposer une. Les règles viennent notamment de ${h.src('sp_F2209', 'la fiche Carte vie privée et familiale')}, de ${h.src('sp_F2231', 'la fiche Étudiant')} et de ${h.src('sp_F16922', 'la fiche Carte talent')}.</p>
${h.table(['Demande déposée le ' + h.date(DEPOT), 'Silence', 'Refus implicite le'], [
  ['Conjoint de Français', h.num(titreById('vpf_conjoint').implicite_mois!) + ' mois', h.date(conj)],
  ['Étudiant', h.num(titreById('etudiant').implicite_jours!) + ' jours', h.date(etu)],
  ['Carte bleue européenne', h.num(titreById('carte_bleue').implicite_jours!) + ' jours', h.date(cbe)],
  ['Travailleur saisonnier', h.num(titreById('saisonnier').implicite_mois!) + ' mois', h.date(sais)],
  ['Regroupement familial', h.num(P.regroupement.implicite_mois) + ' mois', h.date(rf)],
  ['Naturalisation (après le récépissé)', h.num(P.naturalisation.delai_mois) + ' mois', h.date(nat.delaiReponse!)],
], 'Dates calculées par le moteur à partir des fiches Service-Public', ['l', 'r', 'r'])}
<h2>Après le refus implicite</h2>
<p>Pour un conjoint de Français ayant déposé le ${h.date(DEPOT)}, le refus implicite naît le ${h.date(conj)} et le recours reste possible jusqu’au ${h.date(recoursConj)}. Le recours peut être gracieux, devant le préfet, hiérarchique, devant le ministre de l’Intérieur, ou contentieux, devant le tribunal administratif. ${h.src('sp_F11166', 'La fiche Regroupement familial')} prévoit un silence de ${h.num(P.regroupement.implicite_mois)} mois, et ${h.src('sp_F2213', 'la fiche Naturalisation')} un délai de réponse compté à partir du récépissé, détaillé dans ${h.a('delai-naturalisation', 'la page Délai de naturalisation')}.</p>
<h2>Ce qui accélère vraiment</h2>
<p>Rien ne raccourcit la file d’attente d’une préfecture, mais un dossier complet évite le retard le plus courant : la demande de pièces manquantes, qui suspend l’examen. Déposer dans la fenêtre compte aussi, car un renouvellement tardif ajoute une majoration et un trou dans vos papiers. Sur ce site, ${h.num(n90)} titres ont un délai de 90 jours. Information générale, pas un conseil juridique : seul le texte de la décision et le tribunal font foi.</p>
`,
  },
  en: {
    slug: 'residence-permit-processing-time',
    nav: 'Response deadline',
    card: 'Implicit refusal date by permit, appeal deadline, and why no prefecture waiting times are published.',
    title: 'Residence Permit Processing Time 2026: Legal Deadlines',
    description: 'French residence permit processing time 2026: the date silence counts as refusal for each permit, the two-month appeal deadline and no invented averages.',
    h1: 'How long the prefecture has to answer: what the law sets',
    intro: 'Choose the permit and the filing date: the calculator gives the day on which the prefecture’s silence counts as a refusal.',
    resume: `No prefecture publishes an average processing time for residence permits, and the "per prefecture" tables found online come from forums. What the law does fix is the period after which the administration's silence counts as an implicit refusal (refus implicite). It is 4 months for most cards (${n4} of the permits in the calculator), including the private and family life card and the employee card, 90 days for the student card, the EU Blue Card and the intra-corporate transferee (ICT) card, 3 months for seasonal workers and 6 months for family reunification. For an application filed on ${dE(DEPOT)}, a French national's spouse is implicitly refused on ${dE(conj)} if no answer comes, a student on ${dE(etu)}. From that refusal you have ${P.recours.mois} months to appeal to the prefect, the minister or the administrative court. For citizenship, the response deadline is ${P.naturalisation.delai_mois} months from the receipt.`,
    faqs: [
      { q: 'Does an implicit refusal stop the prefecture from answering later?', a: 'No. The implicit refusal only opens your right to challenge it: the prefecture can still grant the permit afterwards, and often does. But if you wait without appealing, the two-month period to contest that implicit refusal still runs. Keep proof of your filing date, such as the ANEF certificate or the receipt.' },
      { q: 'Why does this site not show my prefecture’s average time?', a: 'Because no official source publishes one. Times shown elsewhere are estimates drawn from testimonies, sometimes contradicting each other on the same page. A prefecture may handle a renewal in a few weeks and a first application in several months. We would rather calculate the one certain period: the one set by law.' },
      { q: 'How long do I have to challenge a written refusal?', a: 'A written refusal gives reasons and, except in some cases, comes with an order to leave France (OQTF). The deadline to go to the administrative court then depends on the type of order: 48 hours, 15 days or 30 days, according to the official page. That is far shorter than the two months after an implicit refusal: contact an association or a lawyer straight away.' },
    ],
    body: (h) => `
<h2>The period for each permit</h2>
<p>For each permit, the calculator reads the period of silence stated on its official page and adds it to the filing date. When the page states no period, it shows it as not published instead of assuming one. The rules come in particular from ${h.src('sp_F2209', 'the private and family life card page')}, ${h.src('sp_F2231', 'the student page')} and ${h.src('sp_F16922', 'the talent card page')}.</p>
${h.table(['Filed on ' + h.date(DEPOT), 'Silence', 'Implicit refusal on'], [
  ['Spouse of a French national', h.num(titreById('vpf_conjoint').implicite_mois!) + ' months', h.date(conj)],
  ['Student', h.num(titreById('etudiant').implicite_jours!) + ' days', h.date(etu)],
  ['EU Blue Card', h.num(titreById('carte_bleue').implicite_jours!) + ' days', h.date(cbe)],
  ['Seasonal worker', h.num(titreById('saisonnier').implicite_mois!) + ' months', h.date(sais)],
  ['Family reunification', h.num(P.regroupement.implicite_mois) + ' months', h.date(rf)],
  ['Naturalisation (from the receipt)', h.num(P.naturalisation.delai_mois) + ' months', h.date(nat.delaiReponse!)],
], 'Dates worked out by the engine from the Service-Public pages', ['l', 'r', 'r'])}
<h2>After an implicit refusal</h2>
<p>For a French national's spouse who filed on ${h.date(DEPOT)}, the implicit refusal arises on ${h.date(conj)} and an appeal remains possible until ${h.date(recoursConj)}. It can go to the prefect (recours gracieux), to the Interior Minister (recours hiérarchique) or to the administrative court. ${h.src('sp_F11166', 'The family reunification page')} sets a ${h.num(P.regroupement.implicite_mois)}-month silence, and ${h.src('sp_F2213', 'the naturalisation page')} a response deadline counted from the receipt, explained on ${h.a('delai-naturalisation', 'the naturalisation processing time page')}.</p>
<h2>What actually speeds things up</h2>
<p>Nothing on this site can shorten a prefecture's queue, but a complete file avoids the most common delay: a request for missing documents, which pauses the examination. Filing within the window also matters, because a late renewal adds a fee and a gap in your paperwork. On this site, ${h.num(n90)} permits have a 90-day period. General information, not legal advice: only the decision itself and the court are binding.</p>
`,
  },
});
