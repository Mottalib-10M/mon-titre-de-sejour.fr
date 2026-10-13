import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutParcours, coutTitre, hausse2026 } from '../../lib/engine/couts';
import { formatMoney, displayDate } from '../../lib/format';

const T = P.tarifs, A = T.anciens;
const pct = (avant: number, apres: number) => Math.round((apres / avant - 1) * 100);
const hn = hausse2026('normal', 'premiere'), hr = hausse2026('normal', 'renouvellement');
const mn = hausse2026('minore', 'premiere'), mr = hausse2026('minore', 'renouvellement');
// Parcours salarié sur 3 ans : VLS-TS, première carte, renouvellement, avant et après le 1er mai 2026.
const sal3 = coutParcours('salarie', 3).total;
const sal3Avant = A.vls_ts + A.premiere + A.renouvellement;
// Étudiant sur 3 ans au tarif minoré (l'ancienne taxe minorée du VLS-TS n'est pas reprise dans les paramètres).
const etu3 = coutParcours('etudiant', 3).total;
// Famille de trois personnes venue par regroupement familial (tarif minoré, première carte).
const rf3 = coutTitre('regroupement', 'premiere').total * 3, rf3Avant = A.premiere_minore * 3;
// Étudiant qui devient salarié : renouvellement en carte salarié au tarif normal.
const chg = coutTitre('salarie', 'renouvellement').total;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'hausse-timbres-titre-de-sejour',
  group: 'demarches',
  order: 70,
  mini: 'hausse',
  miniHref: 'cout-titre-de-sejour',
  related: ['cout-titre-de-sejour', 'timbre-fiscal-titre-de-sejour', 'renouvellement-titre-de-sejour', 'naturalisation-francaise', 'validation-vls-ts'],
  sources: ['sp_A18881', 'lf2026_art128', 'ceseda_l436', 'sp_F32952'],
  fr: {
    slug: 'hausse-timbres-titre-de-sejour',
    nav: 'Hausse des timbres 2026',
    card: 'Ce qui a changé le 1er mai 2026 : chaque montant avant et après, et le surcoût d’un parcours complet.',
    title: 'Hausse des timbres titre de séjour 2026 : avant et après mai',
    description: 'Hausse des timbres du titre de séjour au 1er mai 2026 : première carte, renouvellement, tarif minoré, VLS-TS, nationalité, régularisation et nouvelle taxe APS.',
    h1: 'Hausse des timbres du 1er mai 2026 : ce que chaque démarche coûte en plus',
    intro: 'Choisissez le tarif et la démarche : le mini-simulateur compare le montant d’avant et celui d’aujourd’hui.',
    resume: `La loi de finances pour 2026 (article 128 de la loi n° 2026-103 du 19 février 2026) a relevé à compter du ${dF(T.en_vigueur)} presque toutes les taxes payées par les étrangers en timbres fiscaux. Une première carte de séjour ou de résident au tarif normal passe de ${eF(hn.avant)} à ${eF(hn.apres)}, soit +${pct(hn.avant, hn.apres)} % ; un renouvellement de ${eF(hr.avant)} à ${eF(hr.apres)}. Au tarif minoré (étudiant, saisonnier, recherche d’emploi, regroupement familial, jeune au pair), la première carte double, de ${eF(mn.avant)} à ${eF(mn.apres)}, et le renouvellement passe de ${eF(mr.avant)} à ${eF(mr.apres)}. La taxe du VLS-TS monte de ${eF(A.vls_ts)} à ${eF(T.vls_ts.normal)}, le visa de régularisation de ${eF(A.visa_regularisation)} à ${eF(T.visa_regularisation)}, et le timbre de naturalisation ou de déclaration de nationalité de ${eF(A.nationalite)} à ${eF(T.nationalite)}, presque cinq fois plus. Une nouvelle taxe de ${eF(T.aps)} frappe l’autorisation provisoire de séjour. Sur trois ans, l’arrivée d’un salarié coûte désormais ${eF(sal3)} en timbres, contre ${eF(sal3Avant)} avant la réforme.`,
    faqs: [
      { q: 'Mon dossier a été déposé avant le 1er mai 2026 : quel tarif vais-je payer ?', a: 'Le timbre s’achète au moment où la demande est acceptée, pour la délivrance de la carte : la préfecture vous prévient par SMS que la carte est disponible et indique le montant à régler. C’est donc le montant en vigueur à cette date qui s’applique, même pour un dossier déposé avant la réforme. Un timbre acheté trop tôt à l’ancien montant ne suffit pas.' },
      { q: 'Pourquoi la naturalisation coûte-t-elle désormais beaucoup plus cher ?', a: `Le timbre des demandes de naturalisation, de réintégration et des déclarations de nationalité est passé de ${eF(A.nationalite)} à ${eF(T.nationalite)} au ${dF(T.en_vigueur)}. En Guyane, il est réduit de moitié par le Code général des impôts et s’élève à ${eF(T.nationalite_guyane, 2)}. Le reste de la procédure reste gratuit : aucun service privé de prise de rendez-vous n’est nécessaire.` },
      { q: 'Qu’est-ce que la nouvelle taxe sur l’autorisation provisoire de séjour ?', a: `Depuis le ${dF(T.en_vigueur)}, la délivrance et le renouvellement d’une autorisation provisoire de séjour, document remis par exemple pour une mission de volontariat ou au parent d’un enfant gravement malade, donnent lieu à une taxe de ${eF(T.aps)}. En sont exemptées les personnes sortant de la prostitution engagées dans un parcours d’insertion et, pour la première délivrance et le premier renouvellement, les bénéficiaires de la protection temporaire.` },
      { q: 'Le duplicata d’une carte perdue a-t-il aussi augmenté ?', a: `Oui. Le duplicata se paie désormais comme une première délivrance : ${eF(T.normal.duplicata)} au tarif normal, ${eF(T.minore.duplicata)} au tarif minoré. L’actualité officielle ne donne pas son ancien montant, nous ne l’affichons donc pas. Conservez votre carte et déclarez rapidement une perte ou un vol pour obtenir le récépissé qui vous couvre.` },
    ],
    body: (h) => `
<h2>Tous les montants, avant et après</h2>
<p>Le tableau reprend les chiffres de ${h.src('sp_A18881', 'l’actualité officielle de Service-Public.fr du 22 avril 2026, mise à jour le 12 mai')}, qui détaille les effets de ${h.src('lf2026_art128', 'l’article 128 de la loi de finances pour 2026')}. Les taxes elles-mêmes sont prévues par ${h.src('ceseda_l436', 'les articles L436-1 et suivants du CESEDA')}.</p>
${h.table(['Démarche', 'Avant le 1er mai 2026', 'Depuis le 1er mai 2026', 'Hausse'], [
  ['Première carte, tarif normal', h.eur(hn.avant), h.eur(hn.apres), `+${h.num(pct(hn.avant, hn.apres))} %`],
  ['Renouvellement, tarif normal', h.eur(hr.avant), h.eur(hr.apres), `+${h.num(pct(hr.avant, hr.apres))} %`],
  ['Première carte, tarif minoré', h.eur(mn.avant), h.eur(mn.apres), `+${h.num(pct(mn.avant, mn.apres))} %`],
  ['Renouvellement, tarif minoré', h.eur(mr.avant), h.eur(mr.apres), `+${h.num(pct(mr.avant, mr.apres))} %`],
  ['Taxe du VLS-TS, tarif normal', h.eur(A.vls_ts), h.eur(T.vls_ts.normal), `+${h.num(pct(A.vls_ts, T.vls_ts.normal))} %`],
  ['Visa de régularisation', h.eur(A.visa_regularisation), h.eur(T.visa_regularisation), `+${h.num(pct(A.visa_regularisation, T.visa_regularisation))} %`],
  ['Naturalisation, déclaration de nationalité', h.eur(A.nationalite), h.eur(T.nationalite), `+${h.num(pct(A.nationalite, T.nationalite))} %`],
  ['Autorisation provisoire de séjour', 'aucune taxe', h.eur(T.aps), 'nouvelle'],
], 'Montants payés en timbres fiscaux', ['l', 'r', 'r', 'r'])}
<p>Deux lignes ne figurent pas dans ce tableau faute d’ancien montant officiel cité : le duplicata, aligné sur la première délivrance (${h.eur(T.normal.duplicata)} ou ${h.eur(T.minore.duplicata)}), et la taxe minorée du VLS-TS, désormais de ${h.eur(T.vls_ts.minore)} (étudiant, saisonnier, regroupement familial, recherche d’emploi ou création d’entreprise). Pour le visa de régularisation, la part due au dépôt et non remboursée en cas de refus est désormais de ${h.eur(T.visa_regularisation_non_remboursable)}.</p>
<h2>Ce que la hausse change sur un parcours complet</h2>
<p>Les montants se cumulent au fil des années. Un salarié arrivé avec un VLS-TS paie la taxe de validation la première année, la première carte la deuxième, puis un renouvellement : ${h.eur(sal3)} sur trois ans aujourd’hui, contre ${h.eur(sal3Avant)} avec l’ancien barème, soit ${h.eur(sal3 - sal3Avant)} de plus par personne. Un étudiant paie ${h.eur(etu3)} sur la même période au tarif minoré. Pour une famille, chaque adulte paie ses propres timbres : la hausse se multiplie par le nombre de cartes.</p>
${h.table(['Parcours sur trois ans', 'Avant', 'Après', 'Écart'], [
  ['Salarié (VLS-TS, 1re carte, renouvellement)', h.eur(sal3Avant), h.eur(sal3), `+${h.eur(sal3 - sal3Avant)}`],
  ['Couple de salariés', h.eur(sal3Avant * 2), h.eur(sal3 * 2), `+${h.eur((sal3 - sal3Avant) * 2)}`],
  ['Naturalisation d’un couple (deux dossiers)', h.eur(A.nationalite * 2), h.eur(T.nationalite * 2), `+${h.eur((T.nationalite - A.nationalite) * 2)}`],
], undefined, ['l', 'r', 'r', 'r'])}
<p>${h.a('cout-titre-de-sejour', 'Le simulateur de coût')} applique le barème actuel à votre titre, à votre démarche et au nombre de personnes ; ${h.a('renouvellement-titre-de-sejour', 'celui du renouvellement')} ajoute le droit de ${h.eur(T.retard_renouvellement)} en cas de dépôt hors délai.</p>
<h2>Qui paie le tarif minoré, et ce qu’il coûte désormais</h2>
<p>L’actualité officielle cite comme exemples de motifs au tarif minoré le travailleur saisonnier, l’étudiant, la carte recherche d’emploi ou création d’entreprise, le regroupement familial et le jeune au pair ; les fiches de chaque titre y ajoutent notamment le stagiaire et certaines cartes vie privée et familiale. C’est ce tarif qui a le plus augmenté en proportion : la première carte a doublé. Une famille de trois personnes venue par regroupement familial paie ${h.eur(rf3)} pour ses trois premières cartes, contre ${h.eur(rf3Avant)} avant le ${h.date(T.en_vigueur)}. Un étudiant qui change de statut pour devenir salarié quitte en même temps le tarif minoré : son renouvellement en carte salarié coûte ${h.eur(chg)}.</p>
<h2>Prévoir le budget d’une installation</h2>
<p>La hausse ne touche pas seulement l’année de l’arrivée. Pour un projet de long terme, les timbres reviennent à chaque étape : validation du visa, première carte, renouvellements, carte pluriannuelle puis carte de résident, enfin nationalité. Additionner ces montants dès le départ évite la mauvaise surprise d’un renouvellement plus cher que prévu, d’autant qu’un dépôt hors délai ajoute ${h.eur(T.retard_renouvellement)}. ${h.a('timbre-fiscal-titre-de-sejour', 'La page Timbre fiscal')} explique comment acheter le bon timbre et où.</p>
<h2>À quel moment le nouveau montant s’applique</h2>
<p>Le timbre d’une carte de séjour s’achète quand la demande est acceptée, pour la délivrance du document : la préfecture vous informe par SMS que la carte est disponible et du montant des taxes à régler. Le montant dû est donc celui en vigueur au moment de la délivrance. Pour la nationalité, le timbre se joint au dossier : depuis le ${h.date(T.en_vigueur)}, il doit être de ${h.eur(T.nationalite)}. D’après ${h.src('sp_F32952', 'la fiche sur le timbre fiscal de nationalité')}, un timbre électronique est valable un an à partir de son achat et peut être remboursé, s’il n’a pas servi, sur demande en ligne dans les dix-huit mois qui suivent l’achat. Un timbre acheté à l’ancien montant et devenu insuffisant se fait donc rembourser, puis on en achète un nouveau.</p>
<h2>Ce qui n’a pas changé</h2>
<p>Le droit de timbre de ${h.eur(T.droit_timbre)} reste la seule somme due pour certains titres : carte retraité, titre pour soins, famille d’un réfugié ou d’un protégé subsidiaire. Le réfugié statutaire reçoit toujours sa carte de résident gratuitement. Le droit de ${h.eur(T.retard_renouvellement)} pour un renouvellement déposé hors délai figure sur les fiches de chaque titre. Le timbre s’achète toujours en ligne sur le site des impôts ou chez un buraliste agréé, sous forme électronique ; aucun intermédiaire n’est nécessaire.</p>
<h2>Les montants à surveiller</h2>
<p>Les taxes des étrangers sont fixées chaque année par la loi de finances. Ce site reprend les montants de l’actualité officielle et des fiches de chaque titre, relues le ${h.date(P.retrieved_at)}, et les modifiera dès la prochaine loi de finances. Les sites qui affichent encore ${h.eur(hn.avant)} pour une première carte ou ${h.eur(A.nationalite)} pour la naturalisation se fondent sur l’ancien barème. Avant de payer, comparez le montant indiqué par la préfecture dans son SMS avec celui de votre titre sur ce site et sur la fiche officielle : en cas d’écart, c’est le montant notifié pour votre carte qui compte, et il vaut la peine de demander pourquoi. Information, pas un conseil juridique ; site indépendant de l’administration.</p>
`,
  },
  en: {
    slug: 'residence-permit-fee-increase',
    nav: 'Fee increase 2026',
    card: 'What changed on 1 May 2026: every amount before and after, and the extra cost of a full route.',
    title: 'Residence Permit Fee Increase 2026: Before and After 1 May',
    description: 'Residence permit fee increase in France from 1 May 2026: first card, renewal, reduced rate, VLS-TS, citizenship, regularisation fee and the new APS tax.',
    h1: 'The 1 May 2026 stamp increase: what each procedure now costs extra',
    intro: 'Choose the rate and the procedure: the mini-calculator compares the old amount with today’s.',
    resume: `The 2026 Finance Act (section 128 of Act no. 2026-103 of 19 February 2026) raised almost every tax that foreign nationals in France pay in tax stamps (timbres fiscaux), with effect from ${dE(T.en_vigueur)}. A first residence or resident card at the standard rate went from ${eE(hn.avant)} to ${eE(hn.apres)}, up ${pct(hn.avant, hn.apres)} %; a renewal from ${eE(hr.avant)} to ${eE(hr.apres)}. At the reduced rate (students, seasonal workers, job seekers after graduating, family reunification, au pairs), the first card doubled from ${eE(mn.avant)} to ${eE(mn.apres)} and a renewal rose from ${eE(mr.avant)} to ${eE(mr.apres)}. The VLS-TS visa tax rose from ${eE(A.vls_ts)} to ${eE(T.vls_ts.normal)}, the regularisation visa fee from ${eE(A.visa_regularisation)} to ${eE(T.visa_regularisation)}, and the stamp for naturalisation or a citizenship declaration from ${eE(A.nationalite)} to ${eE(T.nationalite)}, almost five times as much. A new ${eE(T.aps)} tax now applies to the temporary residence authorisation (autorisation provisoire de séjour). Over three years, an employee’s arrival now costs ${eE(sal3)} in stamps, against ${eE(sal3Avant)} before the reform.`,
    faqs: [
      { q: 'I applied before 1 May 2026: which rate will I pay?', a: 'The stamp is bought once the application is approved, when the card is issued: the prefecture texts you that the card is ready and states the amount due. So the amount in force on that date applies, even for a file lodged before the reform. A stamp bought early at the old amount is not enough.' },
      { q: 'Why does naturalisation now cost so much more?', a: `The stamp for naturalisation, reinstatement and citizenship declarations rose from ${eE(A.nationalite)} to ${eE(T.nationalite)} on ${dE(T.en_vigueur)}. In French Guiana, the General Tax Code halves it to ${eE(T.nationalite_guyane, 2)}. The rest of the procedure remains free: you never need a private appointment-booking service.` },
      { q: 'What is the new tax on the temporary residence authorisation?', a: `Since ${dE(T.en_vigueur)}, issuing or renewing a temporary residence authorisation (APS), granted for example for a volunteer mission or to the parent of a seriously ill child, carries a ${eE(T.aps)} tax. Exempt are people leaving prostitution who follow an integration programme and, for the first issue and first renewal, beneficiaries of temporary protection.` },
      { q: 'Has the price of replacing a lost card gone up too?', a: `Yes. A replacement (duplicata) is now charged like a first issue: ${eE(T.normal.duplicata)} at the standard rate, ${eE(T.minore.duplicata)} at the reduced rate. The official notice does not state the former amount, so we do not show one. Keep your card safe and report a loss or theft quickly to get the receipt that covers you.` },
    ],
    body: (h) => `
<h2>Every amount, before and after</h2>
<p>The table uses the figures in ${h.src('sp_A18881', 'the official Service-Public.fr notice of 22 April 2026, updated on 12 May')}, which sets out the effects of ${h.src('lf2026_art128', 'section 128 of the 2026 Finance Act')}. The taxes themselves are provided for in ${h.src('ceseda_l436', 'sections L436-1 onwards of the CESEDA immigration code')}.</p>
${h.table(['Procedure', 'Before 1 May 2026', 'Since 1 May 2026', 'Increase'], [
  ['First card, standard rate', h.eur(hn.avant), h.eur(hn.apres), `+${h.num(pct(hn.avant, hn.apres))} %`],
  ['Renewal, standard rate', h.eur(hr.avant), h.eur(hr.apres), `+${h.num(pct(hr.avant, hr.apres))} %`],
  ['First card, reduced rate', h.eur(mn.avant), h.eur(mn.apres), `+${h.num(pct(mn.avant, mn.apres))} %`],
  ['Renewal, reduced rate', h.eur(mr.avant), h.eur(mr.apres), `+${h.num(pct(mr.avant, mr.apres))} %`],
  ['VLS-TS tax, standard rate', h.eur(A.vls_ts), h.eur(T.vls_ts.normal), `+${h.num(pct(A.vls_ts, T.vls_ts.normal))} %`],
  ['Regularisation visa fee', h.eur(A.visa_regularisation), h.eur(T.visa_regularisation), `+${h.num(pct(A.visa_regularisation, T.visa_regularisation))} %`],
  ['Naturalisation, citizenship declaration', h.eur(A.nationalite), h.eur(T.nationalite), `+${h.num(pct(A.nationalite, T.nationalite))} %`],
  ['Temporary residence authorisation', 'no tax', h.eur(T.aps), 'new'],
], 'Amounts paid in tax stamps', ['l', 'r', 'r', 'r'])}
<p>Two items are missing from the table because no official former amount is quoted: the replacement card, now aligned with the first issue (${h.eur(T.normal.duplicata)} or ${h.eur(T.minore.duplicata)}), and the reduced VLS-TS tax, now ${h.eur(T.vls_ts.minore)} (students, seasonal workers, family reunification, job search or business creation). For the regularisation fee, the part paid at filing and kept if you are refused is now ${h.eur(T.visa_regularisation_non_remboursable)}.</p>
<h2>What the increase means over a full route</h2>
<p>The amounts add up over the years. An employee arriving on a VLS-TS pays the validation tax in year one, the first card in year two, then a renewal: ${h.eur(sal3)} over three years today, against ${h.eur(sal3Avant)} under the old schedule, ${h.eur(sal3 - sal3Avant)} more per person. A student pays ${h.eur(etu3)} over the same period at the reduced rate. In a family, each adult pays for their own card, so the increase multiplies with the number of cards.</p>
${h.table(['Three-year route', 'Before', 'After', 'Difference'], [
  ['Employee (VLS-TS, first card, renewal)', h.eur(sal3Avant), h.eur(sal3), `+${h.eur(sal3 - sal3Avant)}`],
  ['Couple, both employees', h.eur(sal3Avant * 2), h.eur(sal3 * 2), `+${h.eur((sal3 - sal3Avant) * 2)}`],
  ['Naturalisation of a couple (two files)', h.eur(A.nationalite * 2), h.eur(T.nationalite * 2), `+${h.eur((T.nationalite - A.nationalite) * 2)}`],
], undefined, ['l', 'r', 'r', 'r'])}
<p>${h.a('cout-titre-de-sejour', 'The cost calculator')} applies the current schedule to your permit, procedure and number of people; ${h.a('renouvellement-titre-de-sejour', 'the renewal calculator')} adds the ${h.eur(T.retard_renouvellement)} fee for late filing.</p>
<h2>Who pays the reduced rate, and what it now costs</h2>
<p>The official notice gives as examples of reduced-rate grounds the seasonal worker, the student, the job-search or business-creation card, family reunification and the au pair; each permit’s own page adds others, such as trainees and some private and family life cards. In proportion, this rate rose the most: the first card doubled. A family of three admitted through family reunification pays ${h.eur(rf3)} for its three first cards, against ${h.eur(rf3Avant)} before ${h.date(T.en_vigueur)}. A student who switches to employee status also leaves the reduced rate behind: the renewal as an employee card costs ${h.eur(chg)}.</p>
<h2>Budgeting for a long-term move</h2>
<p>The increase does not only affect the year you arrive. For a long-term plan, stamps come back at every step: visa validation, first card, renewals, the multi-year card, then the resident card and finally citizenship. Adding these amounts up from the outset avoids the surprise of a renewal costing more than expected, especially since late filing adds ${h.eur(T.retard_renouvellement)}. Employers who relocate staff, universities that welcome international students and families planning a reunification all face the same arithmetic, multiplied by the number of people. ${h.a('timbre-fiscal-titre-de-sejour', 'The tax stamp page')} explains how and where to buy the right stamp, and the mini-calculator at the top of this page shows the change for any rate and procedure in one click.</p>
<h2>When the new amount applies</h2>
<p>The stamp for a residence card is bought once the application is approved, for the issue of the document: the prefecture tells you by text message that the card is ready and how much tax is due. What you owe is therefore the amount in force when the card is issued. For citizenship, the stamp goes into the file: since ${h.date(T.en_vigueur)}, it must be ${h.eur(T.nationalite)}. According to ${h.src('sp_F32952', 'the official page on the citizenship stamp')}, an electronic stamp is valid for one year from purchase and, if unused, can be refunded through an online request within eighteen months of purchase. A stamp bought at the old amount that no longer covers the fee can therefore be refunded, and a new one bought.</p>
<h2>What has not changed</h2>
<p>The ${h.eur(T.droit_timbre)} stamp duty remains the only amount due for some permits: the retiree card, the permit for medical treatment, and the family of a refugee or subsidiary-protection holder. A recognised refugee still receives the resident card free of charge. The ${h.eur(T.retard_renouvellement)} fee for a renewal filed late appears on each permit’s official page. Stamps are still bought electronically, online on the tax website or from an approved tobacconist; no intermediary is needed.</p>
<h2>Amounts to keep an eye on</h2>
<p>Taxes paid by foreign nationals are set every year by the Finance Act. This site uses the amounts in the official notice and each permit’s official page, checked on ${h.date(P.retrieved_at)}, and will update them with the next Finance Act. Sites still showing ${h.eur(hn.avant)} for a first card or ${h.eur(A.nationalite)} for naturalisation rely on the old schedule. Before paying, compare the amount the prefecture states in its text message with the figure for your permit on this site and on the official page: if they differ, the prefecture’s figure for your specific card prevails, and it is worth asking why. Note also that the French administration only accepts electronic stamps; paper stamps sold in the past are no longer used for these procedures. This is information, not legal advice, from a site independent of the French administration.</p>
`,
  },
});
