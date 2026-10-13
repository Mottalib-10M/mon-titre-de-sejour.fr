import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { vlsTs } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

// Valeurs par défaut du calculateur : étudiant arrivé le 5 septembre 2026, visa jusqu'au 1er septembre 2027.
const v = vlsTs('2026-09-05', '2027-09-01');
const v2 = vlsTs('2026-11-20', '2027-11-19');
const T = P.tarifs, RN = P.renouvellement;
const etu = coutTitre('etudiant', 'vls').total, sal = coutTitre('salarie', 'vls').total, conj = coutTitre('vpf_conjoint', 'vls').total;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'validation-vls-ts',
  group: 'demarches',
  order: 20,
  tool: 'vls',
  related: ['visa-long-sejour', 'titre-de-sejour-etudiant', 'cout-titre-de-sejour', 'renouvellement-titre-de-sejour', 'timbre-fiscal-titre-de-sejour'],
  sources: ['sp_F16162', 'sp_F15898', 'sp_F2231', 'sp_F33071', 'sp_A18881'],
  fr: {
    slug: 'validation-vls-ts',
    nav: 'Validation du VLS-TS',
    card: 'Date limite de validation, taxe selon le motif, fenêtre pour demander la première carte.',
    title: 'Validation VLS-TS 2026 : date limite, taxe et première carte',
    description: `Validation du VLS-TS en 2026 : à faire en ligne dans les ${RN.vls_ts_validation_mois} mois suivant l’arrivée, taxe de ${eF(T.vls_ts.normal)} ou ${eF(T.vls_ts.minore)} selon le motif, date pour demander la première carte.`,
    h1: 'Valider son VLS-TS : date limite et taxe',
    intro: 'Indiquez le motif du visa, la date d’arrivée et la fin du visa : le simulateur donne la date limite de validation et le calendrier de la carte.',
    resume: `Le visa de long séjour valant titre de séjour (VLS-TS), valable de 4 à 12 mois, dispense de passer en préfecture à l’arrivée, à une condition : le valider en ligne dans les ${RN.vls_ts_validation_mois} mois qui suivent l’entrée en France et payer la taxe. Depuis le ${dF(T.en_vigueur)}, elle vaut ${eF(T.vls_ts.normal)} au tarif normal, par exemple pour un salarié ou un conjoint de Français, et ${eF(T.vls_ts.minore)} au tarif minoré, pour un étudiant, un jeune au pair ou un saisonnier ; elle s’ajoute au droit de visa payé au consulat. Un étudiant arrivé le 5 septembre 2026 doit valider avant le ${dF(v.validationAvant)}. Sans validation, le séjour devient irrégulier et le visa ne permet plus de revenir dans l’espace Schengen après un voyage. Pour rester au-delà du visa, la demande de première carte se dépose au plus tard ${RN.au_plus_tard_mois} mois avant sa fin : le ${dF(v.carteLimite)} pour un visa qui expire le 1er septembre 2027.`,
    faqs: [
      { q: 'Tous les visas de long séjour doivent-ils être validés ?', a: 'Non, seulement le VLS-TS, qui vaut titre de séjour. Le visa portant la mention « carte de séjour à solliciter dans les 2 mois suivant l’arrivée » impose au contraire de demander une carte en préfecture dans ces deux mois. Le visa temporaire de moins d’un an n’ouvre ni validation ni carte : à sa fin, il faut repartir.' },
      { q: 'Peut-on voyager avant d’avoir validé son VLS-TS ?', a: 'La fiche officielle indique que la validation en ligne permet d’être en séjour régulier et de franchir à nouveau la frontière de l’espace Schengen. Un départ avant validation expose donc à des difficultés au retour. Validez dès l’arrivée, l’opération se fait en ligne avec un timbre électronique acheté sur le site officiel ou chez un buraliste.' },
      { q: 'Quelle taxe pour valider un VLS-TS de conjoint de Français ?', a: `Le tarif normal, soit ${eF(conj)} depuis le ${dF(T.en_vigueur)}. Le VLS-TS de conjoint est délivré sans condition de ressources, sauf mariage frauduleux, annulé ou menace pour l’ordre public. La deuxième année, la carte vie privée et familiale se demande en renouvellement de ce visa.` },
    ],
    body: (h) => `
<h2>Ce que calcule le simulateur</h2>
<p>Il ajoute ${h.num(RN.vls_ts_validation_mois)} mois à votre date d’arrivée pour la date limite de validation, lit la taxe correspondant au motif du visa, puis recule de ${h.num(RN.au_plus_tot_mois)} et ${h.num(RN.au_plus_tard_mois)} mois depuis la fin du visa pour la fenêtre de demande de la première carte. Ces règles viennent de ${h.src('sp_F16162', 'la fiche Visa de long séjour')} et de ${h.src('sp_F2231', 'la fiche Étudiant')}.</p>
${h.table(['Motif du VLS-TS', 'Taxe de validation', 'Première carte ensuite'], [
  ['Étudiant', h.eur(etu), h.eur(coutTitre('etudiant', 'premiere').total)],
  ['Salarié', h.eur(sal), h.eur(coutTitre('salarie', 'premiere').total)],
  ['Conjoint de Français', h.eur(conj), h.eur(coutTitre('vpf_conjoint', 'premiere').total)],
  ['Jeune au pair', h.eur(coutTitre('au_pair', 'vls').total), h.eur(coutTitre('au_pair', 'premiere').total)],
], `Barème en vigueur depuis le ${h.date(T.en_vigueur)}`, ['l', 'r', 'r'])}
<h2>Deux calendriers types</h2>
<p>Arrivé le 5 septembre 2026 avec un visa jusqu’au 1er septembre 2027 : validation avant le ${h.date(v.validationAvant)}, demande de carte entre le ${h.date(v.carteOuverture)} et le ${h.date(v.carteLimite)}. Arrivé le 20 novembre 2026 avec un visa d’un an : validation avant le ${h.date(v2.validationAvant)}, carte entre le ${h.date(v2.carteOuverture)} et le ${h.date(v2.carteLimite)}.</p>
<h2>À la fin du visa</h2>
<p>Pour rester en France après la fin du VLS-TS, il faut demander une carte de séjour, en préfecture ou sur le site de l’ANEF selon le motif ; la page de chaque titre précise le lieu et le délai. Le passeport, lui, devait être valable au moins trois mois après la fin du visa au moment de la demande au consulat : vérifiez sa date avant de déposer la carte.</p>
<p>La taxe se paie par timbre électronique, selon ${h.src('sp_F33071', 'la fiche Achat du timbre fiscal')} ; ${h.src('sp_F15898', 'la fiche Salarié')} en donne le montant pour un salarié. Le droit de visa du consulat, variable selon le pays, n’est pas compris. Information générale, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'vls-ts-validation',
    nav: 'VLS-TS validation',
    card: 'Validation deadline, tax by purpose of stay, window to apply for the first card.',
    title: 'VLS-TS Validation 2026: Deadline, Tax and Your First Card',
    description: `Validating a VLS-TS visa in France in 2026: online within ${RN.vls_ts_validation_mois} months of arrival, a ${eE(T.vls_ts.normal)} or ${eE(T.vls_ts.minore)} tax by purpose, and the dates to apply for your first card.`,
    h1: 'Validating your VLS-TS: deadline and tax',
    intro: 'Enter the visa purpose, your arrival date and the visa end date: the calculator gives the validation deadline and the card timetable.',
    resume: `The long-stay visa that serves as a residence permit (VLS-TS, visa de long séjour valant titre de séjour), valid for 4 to 12 months, spares you a prefecture visit on arrival on one condition: you validate it online within ${RN.vls_ts_validation_mois} months of entering France and pay the tax. Since ${dE(T.en_vigueur)} it costs ${eE(T.vls_ts.normal)} at the standard rate, for instance for an employee or a French national's spouse, and ${eE(T.vls_ts.minore)} at the reduced rate, for a student, an au pair or a seasonal worker; it comes on top of the visa fee paid at the consulate. A student who arrived on 5 September 2026 must validate by ${dE(v.validationAvant)}. Without validation your stay becomes irregular and the visa no longer lets you back into the Schengen area after a trip. To stay beyond the visa, the first-card application goes in no later than ${RN.au_plus_tard_mois} months before it ends: ${dE(v.carteLimite)} for a visa expiring on 1 September 2027.`,
    faqs: [
      { q: 'Does every long-stay visa need validating?', a: 'No, only the VLS-TS, which serves as a residence permit. A visa marked "carte de séjour à solliciter dans les 2 mois suivant l’arrivée" instead requires you to apply for a card at the prefecture within two months. A temporary visa of under a year leads to neither validation nor card: when it ends, you leave.' },
      { q: 'Can I travel before validating my VLS-TS?', a: 'The official page states that online validation is what makes your stay lawful and lets you cross the Schengen border again. Leaving before validating can therefore cause problems on your way back. Validate as soon as you arrive; it is done online with an electronic stamp bought on the official site or at a tobacconist.' },
      { q: 'Which tax applies to a spouse’s VLS-TS?', a: `The standard rate, ${eE(conj)} since ${dE(T.en_vigueur)}. A spouse's VLS-TS is issued with no income condition, unless the marriage is fraudulent or annulled or there is a threat to public order. In the second year, the private and family life card is requested as a renewal of that visa.` },
    ],
    body: (h) => `
<h2>What the calculator works out</h2>
<p>It adds ${h.num(RN.vls_ts_validation_mois)} months to your arrival date for the validation deadline, reads the tax for the visa's purpose, then counts back ${h.num(RN.au_plus_tot_mois)} and ${h.num(RN.au_plus_tard_mois)} months from the visa's end for the first-card window. The rules come from ${h.src('sp_F16162', 'the official long-stay visa page')} and ${h.src('sp_F2231', 'the student page')}.</p>
${h.table(['VLS-TS purpose', 'Validation tax', 'First card afterwards'], [
  ['Student', h.eur(etu), h.eur(coutTitre('etudiant', 'premiere').total)],
  ['Employee', h.eur(sal), h.eur(coutTitre('salarie', 'premiere').total)],
  ['Spouse of a French national', h.eur(conj), h.eur(coutTitre('vpf_conjoint', 'premiere').total)],
  ['Au pair', h.eur(coutTitre('au_pair', 'vls').total), h.eur(coutTitre('au_pair', 'premiere').total)],
], `Schedule in force since ${h.date(T.en_vigueur)}`, ['l', 'r', 'r'])}
<h2>Two sample timetables</h2>
<p>Arrived on 5 September 2026 with a visa until 1 September 2027: validate by ${h.date(v.validationAvant)}, apply for the card between ${h.date(v.carteOuverture)} and ${h.date(v.carteLimite)}. Arrived on 20 November 2026 with a one-year visa: validate by ${h.date(v2.validationAvant)}, card between ${h.date(v2.carteOuverture)} and ${h.date(v2.carteLimite)}.</p>
<h2>When the visa ends</h2>
<p>To stay in France after the VLS-TS ends, you must apply for a residence card, either at the prefecture or on the ANEF portal depending on the purpose of your stay; each permit's page states where and when. Your passport had to be valid for at least three months beyond the visa when you applied at the consulate, so check its expiry date before filing for the card. If the validation deadline has already passed, do not wait: your stay is no longer lawful, and an association or a lawyer can tell you what can still be done.</p>
<p>The tax is paid with an electronic stamp, as ${h.src('sp_F33071', 'the official stamp-purchase page')} explains; ${h.src('sp_F15898', 'the employee page')} gives the employee amount. The consulate's visa fee, which varies by country, is not included. General information, not legal advice.</p>
`,
  },
});
