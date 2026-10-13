import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { residentEligible, absencesOk } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

const R = P.resident, T = P.tarifs;
const SMIC = P.smic.historique[P.smic.historique.length - 1].mensuel;
// Trois profils : salariée arrivée le 3 janvier 2021, absences 4 + 3 mois ; étudiant devenu salarié, une absence de 7 mois ; réfugié dont l'asile a été déposé le 15 mars 2021.
const a = residentEligible('2021-01-03', 'residence');
const okA = absencesOk(4, 7), okB = absencesOk(7, 7), okC = absencesOk(5, 11);
const refug = residentEligible('2021-03-15', 'residence');
const prem = coutTitre('resident_ue', 'premiere').total;
const avecTitre = coutTitre('resident_ue', 'renouvellement').total;
const L_L433 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771992/';
const L_L421 = 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049052704/2024-01-28';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');
const ouiF = (b: boolean) => (b ? 'oui' : 'non'), ouiE = (b: boolean) => (b ? 'yes' : 'no');

export default defineGuide({
  id: 'carte-resident-longue-duree-ue',
  group: 'titres',
  order: 50,
  mini: 'absences',
  miniHref: 'carte-de-resident',
  related: ['carte-de-resident', 'carte-bleue-europeenne', 'niveau-de-francais-exige', 'examen-civique', 'renouvellement-titre-de-sejour'],
  sources: ['sp_F17359', 'sp_F11201', 'sp_F34501', 'sp_F39530'],
  fr: {
    slug: 'carte-resident-longue-duree-ue',
    nav: 'Résident longue durée-UE',
    card: 'Cinq ans sans interruption : absences tolérées, ressources au Smic, B1 et examen civique.',
    title: 'Carte résident longue durée-UE 2026 : 5 ans et absences',
    description: 'Carte de résident longue durée-UE 2026 : 5 ans de séjour régulier, absences de 6 mois d’affilée et 10 au total, ressources au Smic, B1, examen civique, prix.',
    h1: 'Carte de résident longue durée-UE : vos cinq ans comptent-ils ?',
    intro: 'Cinq ans de séjour régulier ne suffisent pas s’ils ont été trop souvent interrompus. Vérifiez vos absences, puis les autres conditions.',
    resume: `La carte de résident mention « résident de longue durée-UE » est la carte de dix ans des étrangers installés depuis au moins ${R.residence_ans} ans en France, sans lien familial particulier. La durée se compte avec les titres admis : VLS-TS, cartes salarié, visiteur, entrepreneur, vie privée et familiale, talent, résident ; les années d’études n’y figurent pas. Le séjour doit être ininterrompu, mais des absences sont tolérées : ${R.absence_consecutive_mois} mois d’affilée au plus et ${R.absences_total_mois} mois au total sur les cinq ans. Il faut aussi des ressources stables d’au moins le Smic, ${eF(SMIC, 2)} brut par mois, hors prestations familiales, RSA et ASS, une assurance maladie, le niveau ${R.langue} en français et l’examen civique avant 65 ans. Arrivée le 3 janvier 2021, une salariée remplit la durée le ${dF(a)}. La carte coûte ${eF(prem)} en première délivrance, ${eF(avecTitre)} si vous avez déjà un titre en cours de validité. Elle permet en plus de s’installer plus de trois mois dans un autre pays de l’Union sans visa de long séjour.`,
    faqs: [
      { q: 'Les années passées comme étudiant comptent-elles pour la carte longue durée-UE ?', a: 'Non dans le cas général : la carte étudiant ne figure pas dans la liste des titres admis par la fiche officielle. Seuls comptent le VLS-TS, les cartes visiteur, salarié, entrepreneur, vie privée et familiale (sauf protection subsidiaire et quelques cas pénaux), talent hors salarié en mission, et la carte de résident. Un ancien étudiant commence donc ses cinq ans à son premier titre de travail.' },
      { q: 'Un réfugié compte-t-il ses cinq ans depuis la décision de l’OFPRA ?', a: `Non, depuis le dépôt de sa demande d’asile : la fiche officielle le précise pour le réfugié et le bénéficiaire de la protection subsidiaire. Une demande déposée le 15 mars 2021 ouvre la condition de durée le ${dF(refug)}, même si le statut a été reconnu plus tard. Le réfugié peut aussi recevoir directement une carte de résident gratuite.` },
      { q: 'L’AAH dispense-t-elle de la condition de ressources ?', a: 'Oui, si l’allocation aux adultes handicapés est versée pour un taux d’incapacité d’au moins 80 %, ou si vous percevez l’allocation supplémentaire d’invalidité. Dans les autres cas, toutes vos ressources propres comptent, mais les prestations familiales, l’allocation de logement, le RSA et l’ASS sont exclues du calcul.' },
      { q: 'La carte longue durée-UE se perd-elle plus vite que la carte de résident ?', a: 'Non, plus lentement. La carte de résident ordinaire cesse d’être valable après trois ans consécutifs hors de France. La carte longue durée-UE se perd après plus de trois ans consécutifs hors de l’Union européenne, après six ans consécutifs hors de France, ou si vous obtenez le même statut dans un autre pays européen.' },
      { q: 'Peut-on demander la carte longue durée-UE en dehors d’un renouvellement ?', a: 'Oui. La demande peut accompagner le renouvellement de votre carte actuelle, sur l’ANEF ou en préfecture selon votre titre, ou être faite à tout moment auprès de la préfecture dès que les conditions sont remplies. Dans le second cas, consultez le site de votre préfecture pour les modalités pratiques de dépôt.' },
    ],
    body: (h) => `
<h2>Le calcul des absences, cas par cas</h2>
<p>La règle tient en deux plafonds qui s’appliquent ensemble : aucune absence de plus de ${h.num(R.absence_consecutive_mois)} mois d’affilée, et pas plus de ${h.num(R.absences_total_mois)} mois au total sur la période de cinq ans. Une absence tolérée ne remet pas le compteur à zéro : elle est même comptée dans les cinq ans. Le mini-simulateur ci-dessus applique ces deux plafonds à vos chiffres ; le tableau montre trois profils.</p>
${h.table(['Profil', 'Plus longue absence', 'Total sur 5 ans', 'Séjour ininterrompu'], [
  ['Salariée, deux séjours familiaux', '4 mois', '7 mois', ouiF(okA)],
  ['Ingénieur en mission à l’étranger', '7 mois', '7 mois', ouiF(okB)],
  ['Visiteur, nombreux voyages courts', '5 mois', '11 mois', ouiF(okC)],
], 'Plafonds de la fiche F17359 (vérifiée le 1er juin 2026)', ['l', 'r', 'r', 'r'])}
<p>Dans le deuxième cas, une seule absence de sept mois suffit à rompre la continuité, alors que le total reste modéré. Dans le troisième, aucune absence n’est longue, mais leur somme dépasse le plafond. La préfecture apprécie ces durées sur pièces : tampons du passeport, attestations d’employeur, relevés. Gardez-les dès votre arrivée.</p>
<h2>Les titres qui comptent</h2>
<p>${h.src('sp_F17359', 'La fiche officielle de la carte longue durée-UE')} énumère les titres pris en compte : visa de long séjour valant titre de séjour, carte visiteur, carte vie privée et familiale (hors protection subsidiaire et deux cas liés à une procédure pénale), carte salarié, carte entrepreneur ou profession libérale, carte talent sauf salarié en mission, carte de résident. La carte étudiant n’y figure pas. Pour le réfugié et le protégé subsidiaire, les cinq ans partent du dépôt de la demande d’asile.</p>
<p>Une voie raccourcie existe pour la carte bleue européenne : deux ans en France avec cette carte suffisent si vous aviez auparavant séjourné régulièrement au moins trois ans en France ou dans un autre pays de l’Union, avec une carte bleue, une carte de chercheur, un titre pour emploi hautement qualifié ou une protection internationale. Les absences admises sur cette période sont plus larges : douze mois d’affilée et dix-huit mois au total. Cette règle relève de ${h.ext(L_L421, 'l’article L421-12 du CESEDA')}.</p>
<h2>Ressources, assurance, intégration</h2>
<p>Les ressources doivent être stables, suffisantes et régulières, au moins égales au Smic, soit ${h.eur(SMIC, 2)} brut par mois depuis le ${h.date(P.smic.historique[P.smic.historique.length - 1].depuis)}. Toutes vos ressources propres comptent ; la prestation d’accueil du jeune enfant, les allocations familiales, le complément familial, l’allocation de logement, l’AEEH, l’ASF, l’ARS, l’AJPP, le RSA et l’ASS sont exclus. L’AAH versée pour un taux d’incapacité d’au moins 80 % et l’ASI dispensent de la condition. Une assurance maladie est exigée.</p>
<p>L’intégration se juge sur l’engagement à respecter les principes de la République, leur respect effectif, le niveau ${R.langue} en français et la réussite à l’examen civique mention « carte de résident » ; après 65 ans, seuls les deux premiers critères restent. Le préfet consulte le maire de votre commune. ${h.src('sp_F34501', 'La fiche sur le niveau de français')} liste les tests et diplômes admis.</p>
<h2>Longue durée-UE ou carte de résident ordinaire ?</h2>
<p>Les deux cartes durent dix ans, coûtent le même prix et demandent le même niveau de français. Elles ne visent pas les mêmes personnes. La carte de résident ordinaire suppose un lien particulier : conjoint ou parent de Français, famille venue par regroupement auprès d’un résident, protection internationale. La carte longue durée-UE récompense la seule durée de séjour, contre des ressources au Smic. Elle offre en échange deux avantages : la mobilité vers un autre pays de l’Union et une caducité plus lente en cas de séjour à l’étranger. Si vous remplissez les deux, comparez votre projet de vie : une mobilité européenne plaide pour la longue durée-UE. ${h.a('carte-de-resident', 'Le simulateur de carte de résident')} calcule la date pour chaque motif.</p>
<h2>Déposer, payer, garder la carte</h2>
<p>La demande peut accompagner le renouvellement de votre carte : en préfecture dans les deux mois avant sa fin, ou sur l’ANEF entre ${h.num(P.renouvellement.au_plus_tot_mois)} et ${h.num(P.renouvellement.au_plus_tard_mois)} mois avant. Elle peut aussi être faite à tout moment en préfecture. La première délivrance coûte ${h.eur(prem)} ; si vous détenez déjà un titre en cours de validité, ${h.eur(avecTitre)}. Un dépôt hors délai ajoute ${h.eur(T.retard_renouvellement)}. Sans réponse en quatre mois, la demande est implicitement refusée ; le recours est ouvert pendant deux mois.</p>
<p>La carte vaut dix ans et se renouvelle au même prix que le second tarif, ou se transforme en carte de résident permanent. Elle devient caduque après plus de trois ans consécutifs hors de l’Union, six ans consécutifs hors de France, ou si vous obtenez le même statut ailleurs en Europe. Son atout propre : elle permet de séjourner plus de trois mois dans un autre pays de l’Union sans visa de long séjour, en y demandant ensuite un titre selon le motif de votre installation. Le cadre légal est ${h.ext(L_L433, 'l’article L433-7 du CESEDA')}. Cette page est une information générale, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'eu-long-term-resident-card',
    nav: 'EU long-term resident',
    card: 'Five uninterrupted years: allowed absences, minimum-wage income, B1 French and civic exam.',
    title: 'EU Long-Term Resident Card 2026: 5 Years and Absences',
    description: 'EU long-term resident card in France 2026: 5 years of lawful stay, absences of 6 months in a row and 10 in total, minimum-wage income, B1, civic exam, price.',
    h1: 'EU long-term resident card: do your five years count?',
    intro: 'Five years of lawful stay are not enough if they were broken too often. Check your absences first, then the other conditions.',
    resume: `The resident card marked "résident de longue durée-UE" is the ten-year card for foreign nationals settled in France for at least ${R.residence_ans} years without a particular family tie. The period is counted with accepted permits only: VLS-TS, employee, visitor, self-employed, private and family life, talent and resident cards; years on a student card are not on the list. The stay must be uninterrupted, but some absences are allowed: no more than ${R.absence_consecutive_mois} months in a row and ${R.absences_total_mois} months in total over the five years. You also need stable income of at least the minimum wage, ${eE(SMIC, 2)} gross a month, excluding family benefits, RSA and ASS, health cover, ${R.langue}-level French and the civic exam before 65. An employee who arrived on 3 January 2021 meets the period on ${dE(a)}. The card costs ${eE(prem)} on first issue, ${eE(avecTitre)} if you already hold a valid permit. On top of that, it lets you settle for more than three months in another EU country without a long-stay visa.`,
    faqs: [
      { q: 'Do years on a student card count towards the EU long-term card?', a: 'Not as a rule: the student card is not on the official list of accepted permits. Only the VLS-TS, visitor, employee, self-employed, private and family life cards (except subsidiary protection and a few criminal-case grounds), talent cards other than intra-group assignees, and the resident card count. A former student therefore starts the five years with their first work permit.' },
      { q: 'Does a refugee count the five years from the OFPRA decision?', a: `No, from the date the asylum application was filed: the official page says so for refugees and subsidiary-protection holders. An application filed on 15 March 2021 meets the length condition on ${dE(refug)}, even if status was granted later. A refugee can also receive a free resident card directly.` },
      { q: 'Does AAH disability benefit remove the income condition?', a: 'Yes, if the adult disability allowance (AAH) is paid for an incapacity rate of at least 80 per cent, or if you receive the additional invalidity allowance (ASI). Otherwise all your own income counts, but family benefits, housing benefit, RSA and ASS are left out of the calculation.' },
      { q: 'Is the EU long-term card lost faster than the ordinary resident card?', a: 'No, more slowly. The ordinary resident card stops being valid after three consecutive years outside France. The EU long-term card lapses after more than three consecutive years outside the EU, after six consecutive years outside France, or if you obtain the same status in another European country.' },
      { q: 'Can I apply for the EU long-term card outside a renewal?', a: 'Yes. You can apply when renewing your current card, on the ANEF portal or at the prefecture depending on your permit, or at any time at the prefecture once you meet the conditions. In the second case, check your prefecture’s website for how to file in practice.' },
    ],
    body: (h) => `
<h2>Counting absences, case by case</h2>
<p>The rule is two limits applied together: no single absence longer than ${h.num(R.absence_consecutive_mois)} months, and no more than ${h.num(R.absences_total_mois)} months in total over the five years. An allowed absence does not reset the clock; it even counts within the five years. The mini-calculator above applies both limits to your figures; the table shows three profiles.</p>
${h.table(['Profile', 'Longest absence', 'Total over 5 years', 'Uninterrupted stay'], [
  ['Employee, two family trips', '4 months', '7 months', ouiE(okA)],
  ['Engineer on a posting abroad', '7 months', '7 months', ouiE(okB)],
  ['Visitor, many short trips', '5 months', '11 months', ouiE(okC)],
], 'Limits from Service-Public page F17359 (checked 1 June 2026)', ['l', 'r', 'r', 'r'])}
<p>In the second case, one seven-month absence is enough to break continuity even though the total is moderate. In the third, no absence is long but together they exceed the limit. The prefecture weighs these periods on evidence: passport stamps, employer letters, statements. Keep them from the day you arrive.</p>
<h2>Which permits count</h2>
<p>${h.src('sp_F17359', 'The official EU long-term card page')} lists the permits taken into account: long-stay visa serving as a permit, visitor card, private and family life card (except subsidiary protection and two cases linked to criminal proceedings), employee card, self-employed card, talent card except intra-group assignees, and resident card. The student card is not on the list. For refugees and subsidiary-protection holders, the five years start when the asylum application was filed.</p>
<p>A shortcut exists for EU Blue Card holders: two years in France on that card are enough if you had previously lived lawfully for at least three years in France or another EU country with a Blue Card, a researcher card, a highly-qualified employment permit or international protection. The absences allowed over that period are wider: twelve months in a row and eighteen months in total. This rule sits in ${h.ext(L_L421, 'article L421-12 of the CESEDA')}.</p>
<h2>Income, health cover, integration</h2>
<p>Income must be stable, sufficient and regular, at least equal to the minimum wage (Smic), ${h.eur(SMIC, 2)} gross a month since ${h.date(P.smic.historique[P.smic.historique.length - 1].depuis)}. All your own income counts; the young-child benefit (PAJE), family allowances, the family supplement, housing benefit, AEEH, ASF, ARS, AJPP, RSA and ASS are excluded. AAH paid for an incapacity of at least 80 per cent and ASI remove the condition. Health cover is required.</p>
<p>Integration is judged on your commitment to the principles of the Republic, actually respecting them, ${R.langue}-level French and a pass in the civic exam ("carte de résident" version); after 65 only the first two criteria remain. The prefect consults the mayor of your town. ${h.src('sp_F34501', 'The page on French-language requirements')} lists the accepted tests and diplomas.</p>
<h2>EU long-term card or ordinary resident card?</h2>
<p>Both cards last ten years, cost the same and require the same French level. They are not aimed at the same people. The ordinary resident card assumes a particular tie: spouse or parent of a French national, family admitted through reunification with a resident, international protection. The EU long-term card rewards length of residence alone, in exchange for minimum-wage income. It brings two advantages in return: mobility to another EU country and a slower lapse if you live abroad for a while. If you qualify for both, think about your plans: a likely move within Europe argues for the EU long-term card. ${h.a('carte-de-resident', 'The resident-card calculator')} gives the date for each ground.</p>
<h2>A worked example</h2>
<p>Take an engineer who arrived on 3 January 2021 on a VLS-TS, then held employee cards. Five years of lawful residence are reached on ${h.date(a)}. Over that period she spent three months abroad in 2023 and four months in 2025, seven months in all, the longest being four: both limits are respected. Her salary is well above the minimum wage, she holds a B1 certificate and has passed the civic exam. She can apply when her current card comes up for renewal, paying ${h.eur(avecTitre)} because she already holds a valid permit, or ask at the prefecture as soon as the date is reached.</p>
<h2>Filing, paying, keeping the card</h2>
<p>You can apply when your card is renewed: at the prefecture in the two months before it ends, or on the ANEF portal between ${h.num(P.renouvellement.au_plus_tot_mois)} and ${h.num(P.renouvellement.au_plus_tard_mois)} months before. You can also apply at any time at the prefecture. First issue costs ${h.eur(prem)}; if you already hold a valid permit, ${h.eur(avecTitre)}. Filing late adds ${h.eur(T.retard_renouvellement)}. With no answer in four months, the application counts as refused; you then have two months to appeal.</p>
<p>The card lasts ten years and is renewed at the second rate, or turned into a permanent resident card. It lapses after more than three consecutive years outside the EU, six consecutive years outside France, or if you gain the same status elsewhere in Europe. Its particular advantage: it lets you stay more than three months in another EU country without a long-stay visa, then apply there for a permit matching your reason for moving. The legal basis is ${h.ext(L_L433, 'article L433-7 of the CESEDA')}. This page is general information, not legal advice.</p>
`,
  },
});
