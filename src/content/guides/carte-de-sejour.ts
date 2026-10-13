import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre, titreById, TITRES } from '../../lib/engine/couts';
import { formatMoney } from '../../lib/format';

const T = P.tarifs;
// Catalogue : durées lues sur chaque fiche (F15898, F2231, F35799, F302, F2710, F35795, F16922, F2209, F2208).
const CAT: Array<{ id: string; fr: string; en: string }> = [
  { id: 'salarie', fr: '1 an, puis pluriannuelle de 4 ans', en: '1 year, then a 4-year multi-year card' },
  { id: 'travailleur_temporaire', fr: '1 an, renouvelable', en: '1 year, renewable' },
  { id: 'etudiant', fr: 'VLS-TS de 4 mois à 1 an, puis durée du cycle (4 ans au plus)', en: 'VLS-TS of 4 months to 1 year, then the course length (4 years at most)' },
  { id: 'visiteur', fr: '1 an, renouvelable', en: '1 year, renewable' },
  { id: 'entrepreneur', fr: '1 an, puis pluriannuelle de 4 ans', en: '1 year, then a 4-year multi-year card' },
  { id: 'talent_salarie', fr: 'durée du contrat, 4 ans au plus', en: 'length of the contract, 4 years at most' },
  { id: 'carte_bleue', fr: 'durée du contrat (+3 mois si moins de 2 ans), 4 ans au plus', en: 'length of the contract (+3 months if under 2 years), 4 years at most' },
  { id: 'vpf_conjoint', fr: '1 an, puis pluriannuelle de 2 ans au plus', en: '1 year, then a multi-year card of up to 2 years' },
  { id: 'retraite', fr: '10 ans', en: '10 years' },
  { id: 'resident', fr: '10 ans', en: '10 years' },
];
const sil = (id: string, l: 'fr' | 'en') => { const t = titreById(id); return t.implicite_mois ? (l === 'fr' ? `${t.implicite_mois} mois` : `${t.implicite_mois} months`) : t.implicite_jours ? (l === 'fr' ? `${t.implicite_jours} jours` : `${t.implicite_jours} days`) : (l === 'fr' ? 'non précisé' : 'not stated'); };
const nTitres = TITRES.length;
const nNormal = TITRES.filter((t) => t.tarif === 'normal').length, nMinore = TITRES.filter((t) => t.tarif === 'minore').length;
const etu = coutTitre('etudiant', 'premiere').total, sal = coutTitre('salarie', 'premiere').total, ret = coutTitre('retraite', 'premiere').total;
const L_L433 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771972/';
const L_L436 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042772036/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');

export default defineGuide({
  id: 'carte-de-sejour',
  group: 'titres',
  order: 20,
  mini: 'cartes',
  miniHref: 'cout-titre-de-sejour',
  related: ['titre-de-sejour', 'cout-titre-de-sejour', 'carte-de-sejour-pluriannuelle', 'carte-de-resident', 'delai-titre-de-sejour', 'quel-titre-de-sejour'],
  sources: ['sp_F15898', 'sp_F2231', 'sp_F302', 'sp_F2710', 'sp_F35795', 'sp_F16922', 'sp_F2209'],
  fr: {
    slug: 'carte-de-sejour',
    nav: 'Cartes de séjour comparées',
    card: 'Chaque carte côte à côte : durée, prix en timbres, silence valant refus.',
    title: 'Carte de séjour 2026 : durée, prix et délai par mention',
    description: 'Carte de séjour 2026 : salarié, étudiant, visiteur, talent, vie privée et familiale, retraité, résident comparées : durée, prix en timbres, délai valant refus.',
    h1: 'Cartes de séjour : chaque mention comparée',
    intro: 'Une carte de séjour porte une mention qui fixe sa durée, son prix et le temps que la préfecture a pour répondre. Le tableau les met côte à côte.',
    resume: `Il n’existe pas une carte de séjour mais une vingtaine, chacune avec sa mention : salarié, étudiant, visiteur, talent, vie privée et familiale, retraité, résident. La mention décide de trois choses. La durée d’abord : un an pour la carte salarié ou visiteur, quatre ans au plus pour la carte talent, dix ans pour la carte retraité ou la carte de résident. Le prix ensuite : sur les ${nTitres} titres de notre simulateur, ${nNormal} sont au tarif normal, soit ${eF(T.normal.premiere)} pour une première carte, ${nMinore} au tarif minoré de ${eF(T.minore.premiere)}, et quelques-uns au seul droit de timbre de ${eF(T.droit_timbre)}. Le délai enfin au terme duquel le silence de la préfecture vaut refus : quatre mois pour la plupart des cartes, 90 jours pour l’étudiant et la carte bleue européenne, trois mois pour le saisonnier. Une carte étudiant coûte ${eF(etu)}, une carte salarié ${eF(sal)}, une carte retraité ${eF(ret)}. Le tableau de cette page compare dix mentions courantes.`,
    faqs: [
      { q: 'Quelle carte de séjour dure le plus longtemps ?', a: 'La carte de résident et la carte retraité, valables 10 ans. Parmi les cartes de séjour proprement dites, la carte pluriannuelle salarié ou entrepreneur atteint 4 ans après une première année, comme la carte talent. Les cartes visiteur, stagiaire, au pair et travailleur temporaire restent d’un an et ne donnent pas de carte pluriannuelle pour le même motif.' },
      { q: 'Une carte de séjour permet-elle toujours de travailler ?', a: 'Non. La carte salarié, la carte talent et la carte vie privée et familiale permettent de travailler, sans autorisation supplémentaire pour les deux dernières. La carte étudiant autorise un travail accessoire limité. La carte visiteur suppose au contraire de vivre de ses ressources sans travailler, et la carte retraité ne donne pas accès à l’emploi.' },
      { q: 'Pourquoi la carte visiteur coûte-t-elle plus cher que la carte étudiant ?', a: `Parce que la loi place la carte étudiant au tarif minoré et la carte visiteur au tarif normal, sans lien avec les revenus. La première délivrance coûte ${eF(etu)} pour l’étudiant et ${eF(coutTitre('visiteur', 'premiere').total)} pour le visiteur. Les montants viennent du barème en vigueur depuis le 1er mai 2026.` },
      { q: 'Que signifie la mention portée sur la carte ?', a: 'Elle indique le motif pour lequel la carte a été délivrée et les droits qui y sont attachés : travailler, étudier, vivre en famille. La mention compte au renouvellement, puisque vous devez continuer à remplir ses conditions, et pour la carte de résident, qui exige d’avoir séjourné avec certaines mentions.' },
    ],
    body: (h) => `
<h2>Le tableau des mentions</h2>
<p>Chaque ligne vient de la fiche officielle de la carte et du barème des timbres du ${h.date(T.en_vigueur)}. La colonne « silence valant refus » donne le délai au terme duquel l’absence de réponse de la préfecture équivaut à un refus, ce qui ouvre le recours ; ce n’est pas un délai moyen de traitement, qu’aucune préfecture ne publie.</p>
${h.table(['Mention', 'Durée', 'Première délivrance', 'Renouvellement', 'Silence valant refus'], CAT.map((c) => [titreById(c.id).label.fr, c.fr, h.eur(coutTitre(c.id, 'premiere').total), h.eur(coutTitre(c.id, 'renouvellement').total), sil(c.id, 'fr')]), 'Durées des fiches Service-Public, timbres en vigueur depuis le 1er mai 2026', ['l', 'l', 'r', 'r', 'r'])}
<h2>Les cartes du travail</h2>
<p>La carte salarié se demande quand l’employeur a obtenu une autorisation de travail ; valable un an, elle mène à une carte pluriannuelle de quatre ans. ${h.src('sp_F15898', 'Sa fiche officielle')} précise qu’un salarié au chômage indemnisé peut recevoir une nouvelle carte d’un an. La carte travailleur temporaire couvre les contrats de moins d’un an. La carte talent regroupe une dizaine de profils, du salarié qualifié au chercheur, et dispense d’autorisation de travail ; ${h.src('sp_F16922', 'la fiche Carte talent')} fixe sa durée à celle du contrat, quatre ans au plus. La carte entrepreneur ou profession libérale suppose une activité qui rapporte au moins le Smic.</p>
<h2>Les cartes des études et de l’inactivité</h2>
<p>L’étudiant commence par un VLS-TS de quatre mois à un an, puis reçoit une carte pluriannuelle pour la durée restante de son cycle, avec des ressources d’au moins ${h.eur(P.etudiant.ressources_mensuelles, 2)} par mois. La carte visiteur s’adresse à qui vit de ses ressources sans travailler, au moins le Smic net, soit ${h.eur(P.visiteur.ressources_mensuelles_net, 2)} par mois ; elle reste annuelle. La carte retraité concerne l’ancien résident qui a une pension française et vit hors de France ; elle vaut dix ans et permet des séjours de moins d’un an sans visa. ${h.src('sp_F302', 'La fiche Carte visiteur')} et ${h.src('sp_F2710', 'la fiche Carte retraité')} détaillent ces conditions.</p>
<h2>Les cartes de la famille</h2>
<p>La carte vie privée et familiale couvre le conjoint ou le parent d’un Français, les liens personnels et familiaux, le jeune majeur, l’étranger malade, la victime de violences. Sa version pluriannuelle dure deux ans au plus pour le conjoint et le parent de Français, quatre ans pour la famille venue par regroupement familial. ${h.src('sp_F2209', 'La fiche Vie privée et familiale')} donne les conditions de chaque cas, et ${h.a('vie-privee-et-familiale', 'notre page dédiée')} chiffre chacun.</p>
<h2>Ce qui est commun à toutes les cartes</h2>
<p>Toutes se paient en timbres fiscaux à la remise, selon ${h.ext(L_L436, 'les articles L436-1 et suivants du CESEDA')}. Toutes se renouvellent entre ${h.num(P.renouvellement.au_plus_tot_mois)} et ${h.num(P.renouvellement.au_plus_tard_mois)} mois avant leur fin, sous peine du droit de ${h.eur(T.retard_renouvellement)}. La carte pluriannuelle, prévue par ${h.ext(L_L433, 'les articles L433-1 et suivants')}, exige depuis 2026 le niveau ${P.pluriannuelle.langue} et l’examen civique. Une carte perdue se remplace par un duplicata au prix d’une première délivrance, après une déclaration de perte ou de vol. Pendant l’examen d’un renouvellement, le récépissé ou l’attestation en ligne prolonge les droits de la carte précédente, y compris celui de travailler quand elle le donnait.</p>
<h2>Les cartes de la protection et des soins</h2>
<p>Trois situations échappent à la taxe et ne paient que le droit de timbre de ${h.eur(T.droit_timbre)} : l’étranger malade dont les soins ne sont pas disponibles dans son pays, le retraité titulaire d’une pension française, la famille d’un réfugié ou d’un protégé subsidiaire. Le réfugié lui-même reçoit une carte de résident de dix ans gratuitement ; le protégé subsidiaire et l’apatride obtiennent d’abord une carte pluriannuelle, puis la carte de résident après ${h.num(P.resident.ps_apatride_ans)} ans. Ces exemptions se lisent sur la fiche de chaque titre ; elles ne dépendent pas des revenus.</p>
<h2>Ce que la carte oblige à garder</h2>
<p>Une carte ne vaut que si sa situation de départ dure. Au renouvellement d’une carte pluriannuelle ou d’une carte de résident, la préfecture peut refuser si vous ne prouvez pas votre résidence habituelle en France : le centre de vos intérêts privés et familiaux, et au moins six mois de présence par année civile. La carte de résident de dix ans cesse d’être valable après plus de trois ans consécutifs hors de France ; la carte de longue durée-UE, après six ans. Changer d’adresse ou d’état civil se déclare sur l’ANEF, faute de quoi le renouvellement se complique. Gardez une copie de chaque carte, récépissé et attestation : ces pièces prouvent plus tard la résidence continue exigée pour la carte de résident ou la naturalisation.</p>
<h2>Comment choisir</h2>
<p>La mention ne se choisit pas comme une option : elle découle de votre situation réelle et des pièces que vous pouvez produire. Si deux motifs sont possibles, par exemple conjoint de Français et salarié, comparez la durée et le prix : la carte vie privée et familiale permet de travailler sans autorisation, la carte talent ouvre droit à la carte talent-famille pour le conjoint. ${h.a('quel-titre-de-sejour', 'Le simulateur « quel titre »')} applique ces règles à vos réponses. Ce comparatif est une information générale, pas un conseil juridique : seule la préfecture décide de la mention qu’elle délivre, au vu de votre dossier complet.</p>
`,
  },
  en: {
    slug: 'residence-card-types',
    nav: 'Residence cards compared',
    card: 'Every card side by side: length, stamp price and silence that counts as refusal.',
    title: 'Residence Card Types France 2026: Length, Price and Timing',
    description: 'French residence card types 2026: employee, student, visitor, talent, family life, retiree and resident cards compared by length, stamp price and refusal delay.',
    h1: 'French residence cards: every type compared',
    intro: 'A French residence card carries a "mention" that sets its length, its price and how long the prefecture has to answer. The table puts them side by side.',
    resume: `France does not have one residence card but about twenty, each carrying its own "mention" (the ground printed on the card): employee, student, visitor, talent, private and family life, retiree, resident. The mention decides three things. First the length: one year for the employee or visitor card, up to four years for the talent card, ten years for the retiree card and the resident card. Then the price: of the ${nTitres} permits in our calculator, ${nNormal} are at the standard rate, ${eE(T.normal.premiere)} for a first card, ${nMinore} at the reduced rate of ${eE(T.minore.premiere)}, and a few carry only the ${eE(T.droit_timbre)} stamp duty. Finally the period after which the prefecture's silence counts as refusal: four months for most cards, 90 days for students and the EU Blue Card, three months for seasonal workers. A student card costs ${eE(etu)}, an employee card ${eE(sal)}, a retiree card ${eE(ret)}. The table on this page compares ten common mentions.`,
    faqs: [
      { q: 'Which French residence card lasts longest?', a: 'The resident card and the retiree card, both valid for 10 years. Among residence cards proper, the employee or self-employed multi-year card reaches 4 years after a first year, like the talent card. Visitor, trainee, au pair and temporary-worker cards stay at one year and give no multi-year card on the same ground.' },
      { q: 'Does every residence card let me work?', a: 'No. The employee, talent and private and family life cards allow work, the last two with no extra authorisation. The student card allows limited part-time work. The visitor card, by contrast, assumes you live on your own means without working, and the retiree card gives no access to employment.' },
      { q: 'Why does a visitor card cost more than a student card?', a: `Because the law puts the student card at the reduced rate and the visitor card at the standard rate, regardless of income. A first issue costs ${eE(etu)} for a student and ${eE(coutTitre('visiteur', 'premiere').total)} for a visitor. Both figures come from the schedule in force since 1 May 2026.` },
      { q: 'What does the mention on the card mean?', a: 'It states the ground on which the card was issued and the rights that go with it: working, studying, family life. It matters at renewal, since you must still meet its conditions, and for the resident card, which requires having lived in France on certain mentions.' },
    ],
    body: (h) => `
<h2>The table of mentions</h2>
<p>Each row comes from the card's official page and the tax-stamp schedule of ${h.date(T.en_vigueur)}. The "silence counts as refusal" column gives the period after which no answer from the prefecture equals a refusal, which opens the right to appeal; it is not an average processing time, which no prefecture publishes.</p>
${h.table(['Mention', 'Length', 'First issue', 'Renewal', 'Silence means refusal after'], CAT.map((c) => [titreById(c.id).label.en, c.en, h.eur(coutTitre(c.id, 'premiere').total), h.eur(coutTitre(c.id, 'renouvellement').total), sil(c.id, 'en')]), 'Lengths from the Service-Public pages, stamps in force since 1 May 2026', ['l', 'l', 'r', 'r', 'r'])}
<h2>Cards for work</h2>
<p>The employee card (salarié) is requested once the employer has obtained a work authorisation; valid for a year, it leads to a four-year multi-year card. ${h.src('sp_F15898', 'Its official page')} adds that an unemployed employee receiving benefits can get a new one-year card. The temporary-worker card covers contracts under a year. The talent card covers about ten profiles, from skilled employee to researcher, and needs no work authorisation; ${h.src('sp_F16922', 'the talent card page')} sets its length at that of the contract, four years at most. The self-employed card (entrepreneur / profession libérale) requires a business earning at least the minimum wage.</p>
<h2>Cards for study and for living without work</h2>
<p>Students start with a VLS-TS of four months to a year, then receive a multi-year card for the rest of their course, with resources of at least ${h.eur(P.etudiant.ressources_mensuelles, 2)} a month. The visitor card is for people living on their own means without working, at least the net minimum wage of ${h.eur(P.visiteur.ressources_mensuelles_net, 2)} a month; it stays annual. The retiree card is for former residents with a French pension who live outside France; it lasts ten years and allows stays under a year without a visa. ${h.src('sp_F302', 'The visitor card page')} and ${h.src('sp_F2710', 'the retiree card page')} give the conditions.</p>
<h2>Cards for family life</h2>
<p>The private and family life card (vie privée et familiale) covers the spouse or parent of a French national, personal and family ties, young adults, people needing medical care and victims of violence. Its multi-year version lasts up to two years for the spouse and parent of a French national, four years for family admitted through reunification. ${h.src('sp_F2209', 'The official family life page')} sets out each case, and ${h.a('vie-privee-et-familiale', 'our dedicated page')} costs each one.</p>
<h2>What every card has in common</h2>
<p>All are paid for in tax stamps on collection, under ${h.ext(L_L436, 'articles L436-1 onwards of the CESEDA')}. All are renewed between ${h.num(P.renouvellement.au_plus_tot_mois)} and ${h.num(P.renouvellement.au_plus_tard_mois)} months before expiry, or the ${h.eur(T.retard_renouvellement)} late fee applies. The multi-year card, provided for in ${h.ext(L_L433, 'articles L433-1 onwards')}, has required ${P.pluriannuelle.langue}-level French and the civic exam since 2026. A lost card is replaced by a duplicate at the first-issue price, after a loss or theft report. While a renewal is being examined, the receipt or online certificate extends the rights of your previous card, including the right to work where the card gave it.</p>
<h2>Cards for protection and medical care</h2>
<p>Three situations are spared the tax and pay only the ${h.eur(T.droit_timbre)} stamp duty: a foreign national needing medical care that is not available at home, a retiree with a French pension, and the family of a refugee or subsidiary-protection holder. The recognised refugee receives a free ten-year resident card; subsidiary-protection holders and stateless people first get a multi-year card, then the resident card after ${h.num(P.resident.ps_apatride_ans)} years. These exemptions are written on each permit's page and do not depend on income.</p>
<h2>What a card requires you to keep up</h2>
<p>A card only holds while the situation behind it lasts. When a multi-year card or a resident card comes up for renewal, the prefecture may refuse if you cannot show that France is your habitual residence: the centre of your private and family life, and at least six months of presence per calendar year. The 10-year resident card stops being valid after more than three consecutive years outside France; the EU long-term resident card after six years. A change of address or civil status must be declared on the ANEF, otherwise renewal becomes harder. Keep copies of every card, receipt and certificate: you will need them to prove continuous residence for the resident card or citizenship.</p>
<h2>How to choose</h2>
<p>A mention is not picked like an option: it follows from your real situation and the documents you can produce. Where two grounds are possible, say spouse of a French national and employee, compare length and price: the family life card lets you work with no authorisation, while the talent card opens the talent-family card to your spouse. ${h.a('quel-titre-de-sejour', 'The which-permit calculator')} applies these rules to your answers. This comparison is general information, not legal advice: only the prefecture decides which mention it issues, on the basis of your complete file.</p>
`,
  },
});
