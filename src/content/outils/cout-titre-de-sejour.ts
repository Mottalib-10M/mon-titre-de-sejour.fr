import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre, coutParcours, TITRES } from '../../lib/engine/couts';
import { formatMoney, displayDate } from '../../lib/format';

// Valeurs par défaut du calculateur : carte salarié, première délivrance, entrée avec visa, 3 ans.
const T = P.tarifs;
const sal = coutTitre('salarie', 'premiere');
const sal3 = coutParcours('salarie', 3);
const etu4 = coutParcours('etudiant', 4);
const vpfSansVisa = coutTitre('vpf_liens', 'premiere', { sansVisa: true });
const retard = coutTitre('visiteur', 'renouvellement', { retard: true });
const famille = coutTitre('regroupement', 'premiere').total * 3;
const nNormal = TITRES.filter((t) => t.tarif === 'normal').length, nMinore = TITRES.filter((t) => t.tarif === 'minore').length;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'cout-titre-de-sejour',
  group: 'calculs',
  order: 20,
  tool: 'cout',
  preset: 'salarie:premiere',
  related: ['timbre-fiscal-titre-de-sejour', 'renouvellement-titre-de-sejour', 'quel-titre-de-sejour', 'hausse-timbres-titre-de-sejour', 'validation-vls-ts'],
  sources: ['sp_A18881', 'lf2026_art128', 'ceseda_l436', 'sp_F15898', 'sp_F2231'],
  fr: {
    slug: 'cout-titre-de-sejour',
    nav: 'Coût d’un titre de séjour',
    card: 'Taxe, droit de timbre, visa validé et renouvellements : le total par titre et par personne.',
    title: 'Prix titre de séjour 2026 : simulateur du coût en timbres',
    description: 'Prix d’un titre de séjour 2026 : taxe et droit de timbre par titre, validation du VLS-TS, visa de régularisation, retard et renouvellements, total du foyer.',
    h1: 'Prix d’un titre de séjour : le coût total de votre démarche',
    intro: 'Choisissez le titre et la démarche : le simulateur sépare la taxe du droit de timbre et additionne les années de votre parcours.',
    resume: `Le prix d’un titre de séjour se paie en timbres fiscaux à la remise de la carte et dépend de trois choses : le tarif du titre, la démarche et votre parcours. Depuis le ${dF(T.en_vigueur)}, une première délivrance au tarif normal coûte ${eF(T.normal.premiere)} (${eF(T.normal.taxe_premiere)} de taxe et ${eF(T.droit_timbre)} de droit de timbre), un renouvellement ${eF(T.normal.renouvellement)} ; au tarif minoré, ${eF(T.minore.premiere)} puis ${eF(T.minore.renouvellement)}. Une carte salarié coûte donc ${eF(sal.total)} la première fois, et l’arrivée complète d’un salarié sur trois ans, visa validé compris, ${eF(sal3.total)}. Un étudiant qui reste quatre ans paie ${eF(etu4.total)}. Entré sans visa de long séjour, le demandeur d’une carte vie privée et familiale paie ${eF(vpfSansVisa.total)}, visa de régularisation inclus. Un renouvellement de carte visiteur déposé hors délai monte à ${eF(retard.total)}. Le droit de visa payé au consulat avant le départ s’ajoute et varie selon le pays.`,
    faqs: [
      { q: 'Quand paie-t-on les timbres d’un titre de séjour ?', a: 'Au moment de la remise de la carte, une fois la demande acceptée : la préfecture vous prévient par SMS que la carte est prête et indique le montant à régler. Le timbre électronique s’achète en ligne ou chez un buraliste agréé. Pour un VLS-TS, la taxe se paie lors de la validation en ligne, dans les trois mois qui suivent l’arrivée.' },
      { q: 'Pourquoi deux lignes, taxe et droit de timbre ?', a: `Parce que la loi distingue une taxe, qui varie selon le titre et la démarche, et un droit de timbre fixe de ${eF(T.droit_timbre)}. Les sites qui affichent seulement la taxe sous-estiment le prix de ${eF(T.droit_timbre)}. Le total, seul montant à acheter, est celui que donne le simulateur ; pour certains titres il se réduit au droit de timbre.` },
      { q: 'Combien coûte un titre de séjour pour toute une famille ?', a: `Chaque personne majeure reçoit son propre titre et paie ses propres timbres. Trois membres d’une famille venue par regroupement familial paient ${eF(famille)} au total au tarif minoré. Indiquez le nombre de personnes dans le simulateur : il multiplie le coût unitaire. Les enfants mineurs n’ont pas de titre de séjour, sauf document de circulation demandé à part.` },
      { q: 'Le prix dépend-il de la date de dépôt ou de la date de décision ?', a: `De la date de la décision. La hausse du ${dF(T.en_vigueur)} s’applique à toutes les cartes accordées depuis ce jour, même si le dossier avait été déposé avant. Un étudiant qui a déposé en mars 2026 et dont la carte a été accordée en juin paie le nouveau tarif minoré de ${eF(T.minore.premiere)}.` },
      { q: 'Le visa payé au consulat est-il compris ?', a: 'Non. Le droit de visa de long séjour se paie au consulat avant le départ et son montant varie selon le pays : la fiche officielle renvoie aux pages-pays de France-Visas. Le simulateur ne chiffre que ce qui se paie en France, en timbres fiscaux, pour ne pas afficher un montant qui ne serait pas le vôtre.' },
    ],
    body: (h) => `
<h2>Ce que le simulateur additionne</h2>
<p>Il lit le tarif de chaque titre sur sa propre fiche officielle : ${nNormal} des titres proposés sont au tarif normal, ${nMinore} au tarif minoré, les autres au droit de timbre seul ou gratuits. Il ajoute ensuite les montants qui dépendent de votre parcours : la taxe de validation du VLS-TS la première année, le visa de régularisation si vous êtes entré sans visa de long séjour, le droit de ${h.eur(T.retard_renouvellement)} si un renouvellement est déposé après la date limite. La ligne « parcours » suppose l’enchaînement le plus courant : visa validé la première année, première carte la deuxième, puis un renouvellement par an.</p>
${h.table(['Démarche', 'Tarif normal', 'Tarif minoré'], [
  ['Première délivrance ou duplicata', h.eur(T.normal.premiere), h.eur(T.minore.premiere)],
  ['dont taxe', h.eur(T.normal.taxe_premiere), h.eur(T.minore.taxe_premiere)],
  ['Renouvellement', h.eur(T.normal.renouvellement), h.eur(T.minore.renouvellement)],
  ['Validation du VLS-TS', h.eur(T.vls_ts.normal), h.eur(T.vls_ts.minore)],
], `Barème en vigueur depuis le ${h.date(T.en_vigueur)}`, ['l', 'r', 'r'])}
<h2>Les montants qui s’ajoutent selon le parcours</h2>
<p>Le visa de régularisation de ${h.eur(T.visa_regularisation)} concerne la personne entrée en France sans visa de long séjour qui demande une première carte : ${h.eur(T.visa_regularisation_non_remboursable)} sont payés au dépôt et restent acquis même en cas de refus. Le droit de ${h.eur(T.retard_renouvellement)} frappe le renouvellement déposé hors délai, sauf force majeure ou visa en cours de validité. Ces deux montants viennent des fiches de chaque titre, par exemple ${h.src('sp_F15898', 'la fiche Carte de séjour salarié')}, et reposent sur ${h.src('ceseda_l436', 'les articles L436-1 et suivants du CESEDA')}.</p>
<h2>Limites</h2>
<p>Le simulateur ne connaît pas le droit de visa payé au consulat, qui dépend du pays, ni les frais de traduction ou de légalisation des pièces. Les ressortissants algériens relèvent de l’accord franco-algérien, dont certains certificats sont gratuits. ${h.a('timbre-fiscal-titre-de-sejour', 'La page Timbre fiscal')} explique comment acheter le bon timbre.</p>
`,
  },
  en: {
    slug: 'residence-permit-cost',
    nav: 'Residence permit cost',
    card: 'Tax, stamp duty, validated visa and renewals: the total per permit and per person.',
    title: 'Residence Permit Cost France 2026: Tax Stamp Calculator',
    description: 'French residence permit cost 2026: tax and stamp duty per permit, VLS-TS validation, regularisation fee, late filing and renewals, total for the household.',
    h1: 'French residence permit cost: the total for your application',
    intro: 'Choose the permit and the procedure: the calculator separates tax from stamp duty and adds up the years of your route.',
    resume: `A French residence permit (titre de séjour) is paid for in tax stamps (timbres fiscaux) when the card is handed over, and the price depends on three things: the permit's rate, the procedure and your route. Since ${dE(T.en_vigueur)}, a first issue at the standard rate costs ${eE(T.normal.premiere)} (${eE(T.normal.taxe_premiere)} tax plus ${eE(T.droit_timbre)} stamp duty) and a renewal ${eE(T.normal.renouvellement)}; at the reduced rate, ${eE(T.minore.premiere)} and then ${eE(T.minore.renouvellement)}. An employee card therefore costs ${eE(sal.total)} the first time, and an employee's full three-year arrival, visa validation included, ${eE(sal3.total)}. A student staying four years pays ${eE(etu4.total)}. Someone who entered without a long-stay visa and applies for a private and family life card pays ${eE(vpfSansVisa.total)}, regularisation fee included. A visitor-card renewal filed late rises to ${eE(retard.total)}. The visa fee paid at the consulate before departure comes on top and varies by country.`,
    faqs: [
      { q: 'When do I pay the stamps for a residence permit?', a: 'When the card is handed over, once the application is approved: the prefecture tells you by text message that the card is ready and states the amount due. The electronic stamp is bought online or from an approved tobacconist. For a VLS-TS visa, the tax is paid during the online validation, within three months of arrival.' },
      { q: 'Why are there two lines, tax and stamp duty?', a: `Because the law separates a tax, which varies with the permit and the procedure, from a fixed ${eE(T.droit_timbre)} stamp duty. Sites that show only the tax understate the price by ${eE(T.droit_timbre)}. The total, the only amount you buy, is what the calculator shows; for some permits it comes down to the stamp duty alone.` },
      { q: 'How much does a residence permit cost for a whole family?', a: `Each adult receives their own permit and pays their own stamps. Three family members admitted through family reunification pay ${eE(famille)} in total at the reduced rate. Enter the number of people in the calculator and it multiplies the unit cost. Minor children do not hold a residence permit, unless a separate travel document is requested.` },
      { q: 'Does the price follow the filing date or the decision date?', a: `The decision date. The increase of ${dE(T.en_vigueur)} applies to every card granted since that day, even if the file went in earlier. A student who applied in March 2026 and whose card was granted in June pays the new reduced rate of ${eE(T.minore.premiere)}.` },
      { q: 'Is the visa paid at the consulate included?', a: 'No. The long-stay visa fee is paid at the consulate before departure and varies by country: the official page refers to the country pages of France-Visas. The calculator only costs what is paid in France, in tax stamps, so that it never shows an amount that is not yours.' },
    ],
    body: (h) => `
<h2>What the calculator adds up</h2>
<p>It reads each permit's rate on its own official page: ${nNormal} of the permits offered are at the standard rate, ${nMinore} at the reduced rate, the others at stamp duty only or free. It then adds the amounts that depend on your route: the VLS-TS validation tax in the first year, the regularisation visa fee if you entered without a long-stay visa, and the ${h.eur(T.retard_renouvellement)} fee if a renewal is filed after the deadline. The "route" line assumes the most common sequence: visa validated in year one, first card in year two, then one renewal a year.</p>
${h.table(['Procedure', 'Standard rate', 'Reduced rate'], [
  ['First issue or replacement', h.eur(T.normal.premiere), h.eur(T.minore.premiere)],
  ['of which tax', h.eur(T.normal.taxe_premiere), h.eur(T.minore.taxe_premiere)],
  ['Renewal', h.eur(T.normal.renouvellement), h.eur(T.minore.renouvellement)],
  ['VLS-TS validation', h.eur(T.vls_ts.normal), h.eur(T.vls_ts.minore)],
], `Schedule in force since ${h.date(T.en_vigueur)}`, ['l', 'r', 'r'])}
<h2>Amounts added by your route</h2>
<p>The ${h.eur(T.visa_regularisation)} regularisation visa fee applies to someone who entered France without a long-stay visa and asks for a first card: ${h.eur(T.visa_regularisation_non_remboursable)} is paid at filing and kept even if the application fails. The ${h.eur(T.retard_renouvellement)} fee hits a renewal filed late, unless there is force majeure or a valid visa. Both amounts appear on each permit's page, for instance ${h.src('sp_F15898', 'the official employee-card page')}, and rest on ${h.src('ceseda_l436', 'sections L436-1 onwards of the CESEDA immigration code')}.</p>
<h2>Limits</h2>
<p>The calculator does not know the consulate's visa fee, which depends on the country, or the cost of translating and legalising documents. Algerian nationals fall under the Franco-Algerian agreement, under which some certificates are free. ${h.a('timbre-fiscal-titre-de-sejour', 'The tax stamp page')} explains how to buy the right stamp.</p>
`,
  },
});
