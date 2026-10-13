import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre, hausse2026 } from '../../lib/engine/couts';
import { formatMoney, displayDate } from '../../lib/format';

const T = P.tarifs;
// Coût du duplicata pour quelques titres courants (même prix qu'une première délivrance depuis le 1er mai 2026).
const DUP = ['vpf_conjoint', 'salarie', 'etudiant', 'saisonnier', 'retraite', 'famille_refugie', 'refugie'].map((id) => ({ id, c: coutTitre(id, 'duplicata').total, r: coutTitre(id, 'renouvellement').total }));
const d = (id: string) => DUP.find((x) => x.id === id)!.c;
const avant = hausse2026('normal', 'premiere').avant;
const eF = (x: number) => formatMoney(x, 0, 'fr'), eE = (x: number) => formatMoney(x, 0, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');
const L: Record<string, [string, string]> = {
  vpf_conjoint: ['Vie privée et familiale (conjoint de Français)', 'Private and family life (spouse of a French national)'],
  salarie: ['Salarié', 'Employee'], etudiant: ['Étudiant', 'Student'], saisonnier: ['Travailleur saisonnier', 'Seasonal worker'],
  retraite: ['Retraité', 'Retiree'], famille_refugie: ['Famille de réfugié', 'Refugee’s family member'], refugie: ['Réfugié', 'Refugee'],
};

export default defineGuide({
  id: 'duplicata-titre-de-sejour',
  group: 'demarches',
  order: 60,
  mini: 'duplicata',
  miniHref: 'cout-titre-de-sejour',
  related: ['cout-titre-de-sejour', 'timbre-fiscal-titre-de-sejour', 'anef-titre-de-sejour', 'recepisse-titre-de-sejour', 'hausse-timbres-titre-de-sejour'],
  sources: ['sp_F21032', 'sp_A18881', 'lf2026_art128'],
  fr: {
    slug: 'duplicata-titre-de-sejour',
    nav: 'Duplicata (perte, vol)',
    card: 'Carte perdue en France ou à l’étranger : démarche ANEF, pièces, prix du duplicata selon la carte.',
    title: 'Duplicata titre de séjour 2026 : carte perdue et prix',
    description: `Duplicata de titre de séjour 2026 : carte perdue en France ou à l’étranger, demande sur l’ANEF, pièces, prix de ${eF(T.normal.duplicata)} ou ${eF(T.minore.duplicata)} selon la carte, cas gratuits.`,
    h1: 'Titre de séjour perdu : demander un duplicata',
    intro: 'Le duplicata se demande en ligne ; son prix suit celui d’une première délivrance, selon la carte que vous aviez.',
    resume: `Un étranger qui perd sa carte de séjour en France demande un duplicata sur le portail ANEF ; s’il la perd à l’étranger, il déclare d’abord la perte à la police locale et au consulat de France, qui lui délivre un visa de retour après enquête auprès de la préfecture, puis demande le duplicata dès son retour. La demande de duplicata annule définitivement la carte d’origine, même retrouvée ensuite, et le duplicata garde les mêmes dates de validité que la carte perdue. Depuis le ${dF(T.en_vigueur)}, il coûte le prix d’une première délivrance : ${eF(T.normal.duplicata)} au tarif normal, par exemple pour une carte vie privée et familiale ou salarié, ${eF(T.minore.duplicata)} au tarif minoré, pour une carte étudiant, stagiaire, saisonnier, recherche d’emploi, jeune au pair ou regroupement familial. Une carte retraité ou une carte de famille de réfugié coûte ${eF(d('retraite'))}. Le duplicata est gratuit pour une carte de réfugié, de protégé subsidiaire, d’apatride ou de victime de violences conjugales, de traite ou de proxénétisme.`,
    faqs: [
      { q: 'Peut-on utiliser sa carte retrouvée après avoir demandé un duplicata ?', a: 'Non. La demande de duplicata invalide la carte d’origine de façon définitive. Si vous la retrouvez après la demande, elle ne vaut plus rien : il faut aller retirer la nouvelle carte. Avant de lancer la démarche, vérifiez donc vraiment que la carte est perdue, car le duplicata a un coût et ne se rembourse pas une fois la carte annulée.' },
      { q: 'Le duplicata prolonge-t-il la durée de validité de la carte ?', a: 'Non. Le duplicata porte les mêmes dates de validité que le titre perdu. Si votre carte expire dans quelques mois, pensez au renouvellement : la fenêtre de dépôt s’ouvre quatre mois avant la fin du titre, et un renouvellement donne une nouvelle carte avec une nouvelle durée, au prix d’un renouvellement et non d’un duplicata.' },
      { q: 'Comment rentrer en France si la carte est perdue pendant un voyage ?', a: 'Déclarez la perte à la police du pays où vous êtes, puis à l’ambassade ou au consulat de France, et demandez un visa de retour. Le consulat interroge la préfecture qui a délivré votre titre avant de l’accorder. Une fois rentré, déposez la demande de duplicata en ligne. Prévoyez un délai pour l’enquête du consulat.' },
      { q: 'Combien coûte le duplicata d’une carte de résident de dix ans ?', a: `Le tarif normal d’une première délivrance, soit ${eF(coutTitre('resident', 'duplicata').total)} depuis le ${dF(T.en_vigueur)}. La fiche officielle prévoit des exceptions : le tarif minoré pour une carte de résident liée à une rente d’accident du travail, le droit de timbre seul pour un certificat de résidence algérien de dix ans ou une carte de famille de réfugié, et la gratuité pour un réfugié, un protégé subsidiaire ou un apatride.` },
      { q: 'Quelles pièces joindre à la demande de duplicata ?', a: 'Une déclaration sur l’honneur de perte, la photocopie du titre perdu si vous l’avez gardée, les pages utiles du passeport (état civil, validité, cachets d’entrée), un justificatif de domicile de moins de trois mois et le code de votre e-photo. Le justificatif de paiement du timbre se présente le jour de la remise de la nouvelle carte.' },
    ],
    body: (h) => `
<h2>Le prix du duplicata, titre par titre</h2>
<p>Depuis le ${h.date(T.en_vigueur)}, ${h.src('sp_A18881', 'l’actualité officielle sur la hausse des taxes')} aligne le duplicata sur une première délivrance : ${h.eur(T.normal.duplicata)} au tarif normal et ${h.eur(T.minore.duplicata)} au tarif minoré. Avant cette date, la première délivrance coûtait ${h.eur(avant)}. La hausse découle de ${h.src('lf2026_art128', 'l’article 128 de la loi de finances pour 2026')}. ${h.src('sp_F21032', 'La fiche Perte de la carte de séjour')} détaille les cas particuliers.</p>
${h.table(['Carte perdue', 'Duplicata', 'Renouvellement, pour comparaison'], DUP.map((x) => [L[x.id][0], x.c === 0 ? 'gratuit' : h.eur(x.c), x.r === 0 ? 'gratuit' : h.eur(x.r)]), 'Prix en timbres fiscaux calculés par le moteur du site', ['l', 'r', 'r'])}
<p>Le duplicata coûte plus cher qu’un renouvellement au tarif normal : ${h.eur(T.normal.duplicata)} contre ${h.eur(T.normal.renouvellement)}. Le duplicata garde les dates de la carte perdue : si elle expire bientôt, un renouvellement suivra de peu. Le ${h.a('renouvellement-titre-de-sejour', 'calendrier de renouvellement')} indique quand s’ouvre sa fenêtre de dépôt.</p>
<h2>Exemple : une famille qui perd ses cartes</h2>
<p>Un couple et son fils majeur perdent leurs papiers lors d’un déménagement. La mère a une carte vie privée et familiale de conjointe de Français, le père une carte salarié, le fils une carte étudiant. Chaque duplicata se paie séparément : ${h.eur(d('vpf_conjoint'))} pour la mère, ${h.eur(d('salarie'))} pour le père, ${h.eur(d('etudiant'))} pour le fils, soit ${h.eur(d('vpf_conjoint') + d('salarie') + d('etudiant'))} pour le foyer. Chacun dépose sa propre demande sur l’ANEF avec ses pièces, et chaque carte d’origine est annulée dès la demande.</p>
<h2>Pendant l’attente</h2>
<p>Une demande de duplicata ouvre droit, comme un renouvellement, à un document provisoire : la fiche Récépissé cite expressément le duplicata parmi les demandes qui en donnent un. Gardez-le sur vous jusqu’à la remise de la nouvelle carte, car c’est lui qui prouve votre séjour régulier. Le timbre s’achète sur le même service en ligne que pour une première demande ou un renouvellement, ou chez un buraliste agréé ; il se présente au guichet le jour de la remise.</p>
<h2>Perte en France : la démarche en ligne</h2>
<p>La demande se dépose sur le téléservice de l’ANEF. Les pièces à numériser sont les suivantes :</p>
<ul>
<li>une déclaration sur l’honneur de la perte ;</li>
<li>la photocopie du titre perdu, si vous en avez conservé une ;</li>
<li>le passeport, pages de l’état civil, des dates de validité et des cachets d’entrée ;</li>
<li>un justificatif de domicile de moins de trois mois, plus récent que celui d’une demande de carte ordinaire ;</li>
<li>le code de l’e-photo, fourni par le photographe ou la cabine agréée.</li>
</ul>
<p>Le justificatif de paiement de la taxe ou du droit de timbre se remet au moment de la remise de la nouvelle carte. ${h.a('anef-titre-de-sejour', 'La page Dépôt sur l’ANEF')} explique comment numériser les pièces et quelles attestations vous recevrez.</p>
<!--mini:tarif-->
<h2>Perte à l’étranger : d’abord rentrer</h2>
<p>Sans carte, le retour en France n’est pas automatique. La fiche officielle prévoit trois étapes : déclarer la perte aux autorités de police locales, puis à l’ambassade ou au consulat de France ; demander un visa de retour, que le consulat délivre après une enquête auprès de la préfecture qui avait délivré votre titre ; enfin, une fois rentré, demander le duplicata en ligne comme pour une perte en France. Gardez une copie numérique de votre carte et de votre passeport hors de votre téléphone : elle accélère la déclaration au consulat.</p>
<h2>La démarche selon le lieu de la perte</h2>
${h.table(['Étape', 'Perte en France', 'Perte à l’étranger'], [
  ['Déclaration', 'déclaration sur l’honneur jointe à la demande', 'police locale, puis ambassade ou consulat de France'],
  ['Retour en France', 'sans objet', 'visa de retour après enquête auprès de la préfecture'],
  ['Demande de duplicata', 'en ligne sur l’ANEF', 'en ligne sur l’ANEF, dès le retour'],
  ['Effet sur l’ancienne carte', 'annulée définitivement', 'annulée définitivement'],
], 'Démarches décrites par la fiche F21032', ['l', 'l', 'l'])}
<p>Un point pratique découle de ce tableau : à l’étranger, le visa de retour passe avant tout le reste, et son délai dépend de l’enquête du consulat auprès de votre préfecture. Si vous voyagez souvent, conservez une copie numérique de votre carte, de votre passeport et de votre dernier récépissé dans une messagerie ou un espace en ligne accessible depuis n’importe quel appareil.</p>
<h2>Les cas où le duplicata est gratuit ou réduit</h2>
<p>La fiche officielle prévoit un duplicata gratuit pour la carte d’un réfugié, d’un protégé subsidiaire ou d’un apatride, et pour une carte délivrée à une victime de violences conjugales, de traite des êtres humains ou de proxénétisme. Le droit de timbre seul, ${h.eur(T.droit_timbre)}, s’applique à la carte retraité et à la carte de famille de réfugié. Pour un Algérien, certains certificats de résidence d’un an (visiteur, salarié, commerçant, artisan, scientifique, artiste) ont un duplicata à ${h.eur(T.droit_timbre)} selon la même fiche.</p>
<p>Le vol de la carte suit une démarche voisine, décrite sur une fiche distincte de Service-Public.fr. Information générale, pas un conseil juridique ; site indépendant de l’administration.</p>
`,
  },
  en: {
    slug: 'lost-residence-permit',
    nav: 'Replacement (loss, theft)',
    card: 'Card lost in France or abroad: ANEF procedure, documents, replacement price by card.',
    title: 'Lost Residence Permit 2026: Replacement Steps and Price',
    description: `Lost French residence permit in 2026: card lost in France or abroad, replacement request on ANEF, documents, price of ${eE(T.normal.duplicata)} or ${eE(T.minore.duplicata)} by card, and free cases.`,
    h1: 'Lost your residence permit? Getting a replacement',
    intro: 'A replacement (duplicata) is requested online; its price matches a first issue, depending on the card you held.',
    resume: `A foreign national who loses a residence card in France requests a replacement (duplicata) on the ANEF portal; if the card is lost abroad, the loss is first reported to the local police and to the French consulate, which issues a return visa after checking with the prefecture, and the replacement is requested once back in France. Requesting a replacement cancels the original card for good, even if it turns up later, and the replacement keeps the same validity dates as the lost card. Since ${dE(T.en_vigueur)} it costs the price of a first issue: ${eE(T.normal.duplicata)} at the standard rate, for instance for a private and family life or employee card, and ${eE(T.minore.duplicata)} at the reduced rate, for a student, trainee, seasonal-worker, job-search, au pair or family-reunification card. A retiree card or a refugee's family card costs ${eE(d('retraite'))}. A replacement is free for a refugee, subsidiary-protection, stateless-person card, or a card issued to a victim of domestic violence, trafficking or pimping.`,
    faqs: [
      { q: 'Can I use my card if I find it after requesting a replacement?', a: 'No. A replacement request cancels the original card permanently. If you find it afterwards it is no longer valid, and you must collect the new card. Before starting, make sure the card really is lost: the replacement has a cost, and once the original is cancelled there is no going back.' },
      { q: 'Does a replacement extend my card’s validity?', a: 'No. The replacement carries the same validity dates as the lost permit. If your card expires within a few months, think about renewing instead: the filing window opens four months before the end of the permit, and a renewal brings a new card with a new length, at the renewal price rather than the replacement price.' },
      { q: 'How do I get back to France if I lose the card while travelling?', a: 'Report the loss to the police of the country you are in, then to the French embassy or consulate, and ask for a return visa. The consulate checks with the prefecture that issued your permit before granting it. Once back, file the replacement request online. Allow time for the consulate’s check.' },
      { q: 'How much is a replacement ten-year resident card?', a: `The standard first-issue rate, ${eE(coutTitre('resident', 'duplicata').total)} since ${dE(T.en_vigueur)}. The official page lists exceptions: the reduced rate for a resident card linked to a work-accident pension, stamp duty only for an Algerian ten-year residence certificate or a refugee's family card, and no charge at all for a refugee, a subsidiary-protection holder or a stateless person.` },
      { q: 'Which documents go with a replacement request?', a: 'A sworn statement of loss, a photocopy of the lost permit if you kept one, the relevant passport pages (identity, validity, entry stamps), a proof of address under three months old and your e-photo code. Proof of the tax stamp is shown on the day you collect the new card.' },
    ],
    body: (h) => `
<h2>Replacement price, permit by permit</h2>
<p>Since ${h.date(T.en_vigueur)}, ${h.src('sp_A18881', 'the official notice on the fee increase')} aligns the replacement with a first issue: ${h.eur(T.normal.duplicata)} at the standard rate and ${h.eur(T.minore.duplicata)} at the reduced rate. Before that date, a first issue cost ${h.eur(avant)}. The increase stems from ${h.src('lf2026_art128', 'section 128 of the 2026 Finance Act')}. ${h.src('sp_F21032', 'The official page on losing a residence card')} lists the special cases.</p>
${h.table(['Card lost', 'Replacement', 'Renewal, for comparison'], DUP.map((x) => [L[x.id][1], x.c === 0 ? 'free' : h.eur(x.c), x.r === 0 ? 'free' : h.eur(x.r)]), 'Tax-stamp prices worked out by the site’s engine', ['l', 'r', 'r'])}
<p>A replacement costs more than a standard-rate renewal: ${h.eur(T.normal.duplicata)} against ${h.eur(T.normal.renouvellement)}. A replacement keeps the lost card's dates: if it expires soon, a renewal will follow shortly. The ${h.a('renouvellement-titre-de-sejour', 'renewal timetable')} shows when its filing window opens.</p>
<h2>Example: a family that loses its cards</h2>
<p>A couple and their adult son lose their papers during a house move. The mother holds a private and family life card as a French national's spouse, the father an employee card, the son a student card. Each replacement is paid separately: ${h.eur(d('vpf_conjoint'))} for the mother, ${h.eur(d('salarie'))} for the father and ${h.eur(d('etudiant'))} for the son, ${h.eur(d('vpf_conjoint') + d('salarie') + d('etudiant'))} for the household. Each files a separate request on ANEF with their own documents, and each original card is cancelled the moment the request is made.</p>
<h2>While you wait</h2>
<p>A replacement request, like a renewal, entitles you to a temporary document: the official receipt page expressly lists replacements among the requests that produce one. Carry it until you collect the new card, because it is what proves your stay is lawful in the meantime, for instance with an employer. The stamp is bought on the same online service used for first applications and renewals, or from an approved tobacconist (bureau de tabac), and shown at the counter on collection day. Do not buy it too early: like any stamp, it should match the card actually issued. If you are unsure which rate applies to your card, the calculator above reads it from the official schedule, and the text message from the prefecture announcing that the card is ready also states the amount due.</p>
<h2>Lost in France: the online procedure</h2>
<p>The request is filed on the ANEF portal. The documents to upload are:</p>
<ul>
<li>a sworn statement of loss (déclaration sur l'honneur);</li>
<li>a photocopy of the lost permit, if you kept one;</li>
<li>your passport: identity page, validity dates and entry stamps;</li>
<li>a proof of address under three months old, more recent than for an ordinary card application;</li>
<li>the e-photo code from an approved photographer or photo booth.</li>
</ul>
<p>Proof of payment of the tax or stamp duty is handed over when you collect the new card. ${h.a('anef-titre-de-sejour', 'The ANEF filing page')} explains how to scan documents and which certificates you will receive.</p>
<!--mini:tarif-->
<h2>Lost abroad: get back first</h2>
<p>Without your card, getting back into France is not automatic. The official page sets out three steps: report the loss to the local police, then to the French embassy or consulate; ask for a return visa, which the consulate issues after checking with the prefecture that granted your permit; and once back, request the replacement online exactly as for a loss in France. Keep a digital copy of your card and passport somewhere other than your phone: it speeds up the report at the consulate.</p>
<h2>Steps by place of loss</h2>
${h.table(['Step', 'Lost in France', 'Lost abroad'], [
  ['Report', 'sworn statement attached to the request', 'local police, then the French embassy or consulate'],
  ['Getting back to France', 'not needed', 'return visa after a check with the prefecture'],
  ['Replacement request', 'online on ANEF', 'online on ANEF, as soon as you are back'],
  ['Effect on the old card', 'cancelled for good', 'cancelled for good'],
], 'Procedure described on official page F21032', ['l', 'l', 'l'])}
<p>One practical point follows from the table: abroad, the return visa comes before anything else, and its timing depends on the consulate's check with your prefecture. If you travel often, keep scans of your card, passport and latest receipt in an email or cloud folder you can open from any device.</p>
<h2>When the replacement is free or reduced</h2>
<p>The official page makes the replacement free for the card of a refugee, a subsidiary-protection holder or a stateless person, and for a card issued to a victim of domestic violence, human trafficking or pimping. The stamp duty alone, ${h.eur(T.droit_timbre)}, applies to the retiree card and to a refugee's family card. For Algerian nationals, some one-year residence certificates (visitor, employee, trader, craftsperson, scientist, artist) have a ${h.eur(T.droit_timbre)} replacement under the same page.</p>
<p>Theft of a card follows a similar procedure, described on a separate Service-Public.fr page; read that page before filing if your card was stolen rather than lost. General information, not legal advice; an independent site, not run by the French administration.</p>
`,
  },
});
