import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { fenetreRenouvellement } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

// Valeurs par défaut du calculateur : carte salarié qui expire le 31 mars 2027.
const RN = P.renouvellement, T = P.tarifs;
const w = fenetreRenouvellement('2027-03-31', '2026-10-13');
const w2 = fenetreRenouvellement('2026-12-15', '2026-10-13');
const sal = coutTitre('salarie', 'renouvellement').total, salRetard = coutTitre('salarie', 'renouvellement', { retard: true }).total;
const etu = coutTitre('etudiant', 'renouvellement').total;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'renouvellement-titre-de-sejour',
  group: 'demarches',
  order: 10,
  tool: 'renouvellement',
  related: ['anef-titre-de-sejour', 'recepisse-titre-de-sejour', 'carte-de-sejour-pluriannuelle', 'timbre-fiscal-titre-de-sejour', 'delai-titre-de-sejour'],
  sources: ['sp_F2209', 'sp_F35799', 'sp_F15898', 'sp_F15763', 'sp_F36206'],
  fr: {
    slug: 'renouvellement-titre-de-sejour',
    nav: 'Renouvellement du titre de séjour',
    card: 'Date limite de dépôt, jours restants, timbre dans les délais ou en retard, fin du récépissé.',
    title: 'Renouvellement titre de séjour 2026 : date limite et retard',
    description: `Renouvellement de titre de séjour 2026 : dépôt de ${RN.au_plus_tot_mois} à ${RN.au_plus_tard_mois} mois avant la fin, jours restants, timbre dans les délais ou majoré de ${eF(T.retard_renouvellement)} en retard, récépissé.`,
    h1: 'Renouvellement du titre de séjour : votre calendrier',
    intro: 'Entrez la date de fin de votre carte : le simulateur donne la date limite de dépôt, le nombre de jours restants et le prix du timbre.',
    resume: `Un titre de séjour se renouvelle sur le portail ANEF au plus tôt ${RN.au_plus_tot_mois} mois et au plus tard ${RN.au_plus_tard_mois} mois avant sa date de fin ; quand le dépôt se fait encore en préfecture, c’est dans les ${RN.au_plus_tard_mois} mois qui précèdent l’expiration. Une carte qui expire le 31 mars 2027 se renouvelle entre le ${dF(w.ouverture)} et le ${dF(w.limite)}. Dans les délais, le renouvellement d’une carte salarié coûte ${eF(sal)} en timbres fiscaux, celui d’une carte étudiant ${eF(etu)}. Déposé après la date limite, sauf force majeure ou visa en cours de validité, il est majoré d’un droit de visa de régularisation de ${eF(T.retard_renouvellement)} : ${eF(salRetard)} pour la carte salarié. Pendant l’examen, un récépissé de ${RN.recepisse_mois} mois, ou une attestation de prolongation d’instruction sur l’ANEF, prend le relais à partir du lendemain de l’expiration et prolonge les droits de l’ancien titre. Le renouvellement de la première carte d’un an est aussi le moment de demander la carte pluriannuelle.`,
    faqs: [
      { q: 'Peut-on déposer un renouvellement plus de 4 mois avant la fin de la carte ?', a: `Non sur l’ANEF : la fenêtre s’ouvre ${RN.au_plus_tot_mois} mois avant la date de fin. Avant, le téléservice n’accepte pas la demande. Pour une carte qui expire le 15 décembre 2026, la fenêtre a ouvert le ${dF(w2.ouverture)} et se ferme le ${dF(w2.limite)}. Le simulateur indique « trop tôt » tant que la date d’ouverture n’est pas atteinte.` },
      { q: 'Que se passe-t-il si l’on dépose entre la date limite et l’expiration ?', a: `La demande est recevable, mais hors délai : un droit de visa de régularisation de ${eF(T.retard_renouvellement)} s’ajoute au timbre, sauf cas de force majeure ou visa en cours de validité. Les fiches officielles de chaque titre le rappellent. Mieux vaut déposer même en retard que laisser la carte expirer sans demande.` },
      { q: 'Le récépissé de renouvellement permet-il de continuer à travailler ?', a: 'Oui quand l’ancienne carte vous autorisait à travailler : le récépissé délivré en renouvellement proroge les droits attachés au titre précédent. Sur l’ANEF, l’attestation de prolongation d’instruction joue ce rôle si le dossier a été déposé complet et dans les délais. L’attestation de simple dépôt, elle, ne prouve pas la régularité du séjour.' },
      { q: 'La carte salarié se renouvelle-t-elle aussi sur l’ANEF ?', a: `La fiche officielle de la carte pluriannuelle prévoit un dépôt en préfecture ou en sous-préfecture pour la carte salarié et entrepreneur, dans les ${RN.au_plus_tard_mois} mois qui précèdent la fin de la carte temporaire. Vérifiez sur le site de votre préfecture la procédure en vigueur, qui évolue avec l’ouverture de l’ANEF à de nouveaux titres.` },
    ],
    body: (h) => `
<h2>La fenêtre de dépôt, date par date</h2>
<p>Le simulateur recule de ${h.num(RN.au_plus_tot_mois)} mois puis de ${h.num(RN.au_plus_tard_mois)} mois à partir de la date de fin de votre titre, de quantième à quantième : un 31 devient le dernier jour d’un mois plus court. Il compare ensuite ces dates au jour du calcul et affiche l’une des quatre phases : trop tôt, fenêtre ouverte, hors délai avec majoration, titre expiré. La règle figure sur ${h.src('sp_F2209', 'la fiche Carte vie privée et familiale')} et sur ${h.src('sp_F35799', 'la fiche Carte de séjour pluriannuelle')}.</p>
${h.table(['Carte expirant le', 'Dépôt dès le', 'Au plus tard le', 'Récépissé jusqu’au'], [
  [h.date('2026-12-15'), h.date(w2.ouverture), h.date(w2.limite), h.date(w2.recepisseFin)],
  [h.date('2027-03-31'), h.date(w.ouverture), h.date(w.limite), h.date(w.recepisseFin)],
  [h.date('2027-08-31'), h.date(fenetreRenouvellement('2027-08-31', '2026-10-13').ouverture), h.date(fenetreRenouvellement('2027-08-31', '2026-10-13').limite), h.date(fenetreRenouvellement('2027-08-31', '2026-10-13').recepisseFin)],
], 'Fenêtres de renouvellement calculées par le moteur', ['l', 'r', 'r', 'r'])}
<h2>Le prix du retard</h2>
<p>Dans les délais, le timbre d’un renouvellement vaut ${h.eur(T.normal.renouvellement)} au tarif normal et ${h.eur(T.minore.renouvellement)} au tarif minoré. Hors délai, ${h.src('sp_F15898', 'la fiche Carte salarié')} ajoute un droit de visa de régularisation de ${h.eur(T.retard_renouvellement)}. Le droit est dû sauf force majeure ou présentation d’un visa valide.</p>
<h2>Pendant l’examen du dossier</h2>
<p>En préfecture, ${h.src('sp_F15763', 'le récépissé de renouvellement')} est valable ${h.num(RN.recepisse_mois)} mois à partir du lendemain de la fin de la carte et peut être renouvelé. Sur l’ANEF, ${h.src('sp_F36206', 'l’attestation de prolongation d’instruction')} est valable ${h.num(RN.recepisse_mois)} mois au plus et renouvelée tant qu’aucune décision n’est prise. ${h.a('recepisse-titre-de-sejour', 'La page Récépissé')} détaille ce que ces documents permettent. Information générale, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'residence-permit-renewal',
    nav: 'Residence permit renewal',
    card: 'Filing deadline, days left, stamp on time or late, end of the receipt.',
    title: 'Residence Permit Renewal 2026: Filing Deadline and Late Fee',
    description: `Residence permit renewal in France 2026: file ${RN.au_plus_tot_mois} to ${RN.au_plus_tard_mois} months before expiry, days left, stamp on time or plus a ${eE(T.retard_renouvellement)} late fee, and the receipt’s cover period.`,
    h1: 'Renewing a French residence permit: your timetable',
    intro: 'Enter your card’s expiry date: the calculator gives the filing deadline, the days left and the stamp price.',
    resume: `A French residence permit (titre de séjour) is renewed on the ANEF online portal no earlier than ${RN.au_plus_tot_mois} months and no later than ${RN.au_plus_tard_mois} months before it expires; where renewals still go through the prefecture, the application is made in the ${RN.au_plus_tard_mois} months before expiry. A card ending on 31 March 2027 is renewed between ${dE(w.ouverture)} and ${dE(w.limite)}. On time, renewing an employee card costs ${eE(sal)} in tax stamps and a student card ${eE(etu)}. Filed after the deadline, unless there is force majeure or a valid visa, it carries an extra ${eE(T.retard_renouvellement)} regularisation fee: ${eE(salRetard)} for the employee card. While the file is examined, a ${RN.recepisse_mois}-month receipt (récépissé), or an ANEF certificate extending the examination, takes over from the day after expiry and keeps the rights of the old permit. Renewing the first one-year card is also when to ask for the multi-year card.`,
    faqs: [
      { q: 'Can I file a renewal more than 4 months before my card ends?', a: `Not on ANEF: the window opens ${RN.au_plus_tot_mois} months before the expiry date, and the portal refuses earlier applications. For a card ending on 15 December 2026, the window opened on ${dE(w2.ouverture)} and closes on ${dE(w2.limite)}. The calculator shows "too early" until the opening date is reached.` },
      { q: 'What happens if I file between the deadline and the expiry date?', a: `The application is accepted but late: a ${eE(T.retard_renouvellement)} regularisation fee is added to the stamp, unless there is force majeure or a valid visa. Each permit's official page says so. Filing late is still far better than letting the card expire with no application at all.` },
      { q: 'Can I keep working on a renewal receipt?', a: 'Yes, if your old card allowed you to work: a receipt issued for a renewal extends the rights attached to the previous permit. On ANEF, the certificate extending the examination (attestation de prolongation d’instruction) plays that role if the file was complete and on time. The mere filing certificate does not prove lawful residence.' },
      { q: 'Is the employee card also renewed on ANEF?', a: `The official multi-year card page states that employee and self-employed cards are filed at the prefecture or sub-prefecture in the ${RN.au_plus_tard_mois} months before the temporary card ends. Check your prefecture's website for the current procedure, which changes as ANEF opens to more permits.` },
    ],
    body: (h) => `
<h2>The filing window, date by date</h2>
<p>The calculator counts back ${h.num(RN.au_plus_tot_mois)} months and then ${h.num(RN.au_plus_tard_mois)} months from your permit's expiry date, day-of-month to day-of-month: a 31st becomes the last day of a shorter month. It then compares those dates with the day of the calculation and shows one of four phases: too early, window open, late with surcharge, permit expired. The rule appears on ${h.src('sp_F2209', 'the private and family life card page')} and on ${h.src('sp_F35799', 'the multi-year card page')}.</p>
${h.table(['Card ending on', 'File from', 'File by', 'Receipt until'], [
  [h.date('2026-12-15'), h.date(w2.ouverture), h.date(w2.limite), h.date(w2.recepisseFin)],
  [h.date('2027-03-31'), h.date(w.ouverture), h.date(w.limite), h.date(w.recepisseFin)],
  [h.date('2027-08-31'), h.date(fenetreRenouvellement('2027-08-31', '2026-10-13').ouverture), h.date(fenetreRenouvellement('2027-08-31', '2026-10-13').limite), h.date(fenetreRenouvellement('2027-08-31', '2026-10-13').recepisseFin)],
], 'Renewal windows worked out by the engine', ['l', 'r', 'r', 'r'])}
<h2>What being late costs</h2>
<p>On time, a renewal stamp is ${h.eur(T.normal.renouvellement)} at the standard rate and ${h.eur(T.minore.renouvellement)} at the reduced rate. Late, ${h.src('sp_F15898', 'the employee card page')} adds a ${h.eur(T.retard_renouvellement)} regularisation visa fee, due unless there is force majeure or a valid visa.</p>
<h2>While the file is examined</h2>
<p>At the prefecture, ${h.src('sp_F15763', 'the renewal receipt')} is valid for ${h.num(RN.recepisse_mois)} months from the day after the card ends and can be renewed. On ANEF, ${h.src('sp_F36206', 'the certificate extending the examination')} lasts ${h.num(RN.recepisse_mois)} months at most and is renewed until a decision is made. ${h.a('recepisse-titre-de-sejour', 'The receipt page')} explains what these documents allow. General information, not legal advice.</p>
`,
  },
});
