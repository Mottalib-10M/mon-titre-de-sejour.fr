import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { seuilRegroupement, verdictRegroupement } from '../../lib/engine/famille';
import { coutTitre } from '../../lib/engine/couts';
import { formatMoney, displayDate } from '../../lib/format';

// Dates de dépôt comparées : avant et après les deux revalorisations du Smic de 2026.
const DATES = ['2026-03-01', '2026-07-01', '2027-01-15', '2027-06-15'];
const TAILLES = [2, 4, 6];
const RF = P.regroupement;
const S = P.smic.historique;
const SMIC = S[S.length - 1];
// Exemple principal : couple et trois enfants (5 personnes), dépôt le 15 janvier 2027.
const ex = verdictRegroupement({ personnes: 5, depot: '2027-01-15', ressources: 2000 });
// Même foyer, dépôt en juillet 2026 : seuil plus bas.
const exTot = seuilRegroupement(5, '2026-07-01');
// Couple sans enfant, dépôt le 1er mars 2026.
const couple = seuilRegroupement(2, '2026-03-01');
const t150 = coutTitre('regroupement', 'premiere').total;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');
const L434 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771996/';

export default defineGuide({
  id: 'regroupement-familial',
  group: 'famille',
  order: 10,
  tool: 'regroupement',
  related: ['logement-regroupement-familial', 'procedure-regroupement-familial', 'vie-privee-et-familiale', 'cout-titre-de-sejour', 'carte-talent-famille'],
  sources: ['sp_F11166', 'ceseda_r434', 'insee_smic', 'sp_F11168'],
  fr: {
    slug: 'regroupement-familial',
    nav: 'Regroupement familial : ressources',
    card: 'Seuil de ressources calculé sur le Smic des 12 mois avant votre dépôt, selon la taille du foyer.',
    title: 'Regroupement familial 2026 : seuil de ressources calculé',
    description: 'Regroupement familial 2026 : seuil de ressources sur le Smic des 12 mois avant votre dépôt, majoré selon la taille du foyer, ressources exclues et dispenses.',
    h1: 'Regroupement familial : vos ressources suffisent-elles ?',
    intro: 'Indiquez la taille du foyer, la date de dépôt et vos revenus moyens : le seuil se calcule mois par mois sur le Smic réellement en vigueur.',
    resume: `Pour faire venir son conjoint et ses enfants mineurs par le regroupement familial, l’étranger qui réside en France depuis au moins ${RF.sejour_min_mois} mois doit prouver des ressources stables et suffisantes. Le seuil est la moyenne du Smic mensuel brut sur les ${RF.periode_mois} mois qui précèdent la demande pour un foyer de deux ou trois personnes, majorée d’un dixième pour quatre ou cinq personnes et d’un cinquième à partir de six. Comme le Smic a été relevé le ${dF(S[S.length - 2].depuis)} puis le ${dF(SMIC.depuis)}, le seuil dépend de la date de dépôt : pour un couple et trois enfants, il vaut ${eF(exTot.seuil, 2)} pour un dépôt le ${dF('2026-07-01')} et ${eF(ex.seuil, 2)} pour un dépôt le ${dF('2027-01-15')}. Avec ${eF(2000)} de revenus moyens, ce foyer passe de justesse à la première date mais manque le seuil de ${eF(Math.abs(ex.ecart), 2)} à la seconde : déposer plus tard n’est pas toujours plus facile. Les prestations familiales, le RSA et les minima sociaux ne comptent pas ; les bénéficiaires de l’AAH ou de l’ASI sont dispensés de condition de ressources.`,
    faqs: [
      { q: 'Quels revenus comptent pour le seuil du regroupement familial ?', a: 'Les revenus d’un travail salarié ou indépendant, ceux tirés d’un patrimoine, les pensions de retraite, et les revenus du conjoint s’ils continueront de lui être versés après son départ de son pays. Sont exclus les prestations familiales, le RSA, l’Aspa, l’allocation temporaire d’attente, l’ASS et l’allocation équivalent retraite. Le calcul porte sur la moyenne des douze derniers mois.' },
      { q: 'Pourquoi mon seuil est-il plus bas que celui affiché par Service-Public ?', a: `Parce que la fiche officielle cite le Smic actuel, ${eF(SMIC.mensuel, 2)} brut, alors que la règle prend la moyenne des douze mois qui précèdent votre demande. Si ces mois couvrent une période où le Smic était plus bas, en 2025 ou au début de 2026, la moyenne est inférieure. Le simulateur calcule le Smic de chaque mois et en fait la moyenne exacte pour votre date.` },
      { q: 'Qui est dispensé de la condition de ressources ?', a: `Le bénéficiaire de l’allocation aux adultes handicapés ou de l’allocation supplémentaire d’invalidité. Également la personne de plus de ${RF.dispense_age} ans qui réside régulièrement en France depuis au moins ${RF.dispense_residence_ans} ans, est mariée depuis au moins ${RF.dispense_mariage_ans} ans et demande à faire venir son conjoint. Les autres conditions, logement compris, restent exigées dans tous les cas.` },
      { q: 'Combien de personnes compte-t-on dans le foyer ?', a: 'Toutes celles qui vivront dans le logement une fois la famille arrivée : vous, votre conjoint, les enfants qui vous rejoignent et ceux qui vivent déjà avec vous en France. Un couple avec deux enfants forme un foyer de quatre personnes, ce qui fait passer le seuil à la moyenne du Smic majorée d’un dixième.' },
      { q: 'Que se passe-t-il si mes revenus sont juste en dessous du seuil ?', a: `Le maire, qui instruit les ressources, peut émettre un avis défavorable, et le préfet peut refuser la demande. Le simulateur affiche le manque exact : quelques euros sous la moyenne exigée suffisent à fonder un refus. Attendre quelques mois pour que les douze mois couvrent des revenus plus élevés, ou que le conjoint justifie de revenus maintenus, change le calcul. La famille paiera ensuite ${eF(t150)} par titre.` },
    ],
    body: (h) => `
<h2>Comment le seuil est calculé</h2>
<p>La règle vient du ${h.ext(L434, 'CESEDA, articles L434-1 à L434-12')} et des ${h.src('ceseda_r434', 'articles R434-1 et suivants')}, tels que les présente ${h.src('sp_F11166', 'la fiche Regroupement familial de Service-Public.fr')}. Le simulateur prend les douze mois civils qui précèdent le mois de dépôt, attribue à chacun le Smic mensuel brut en vigueur le premier jour du mois d’après ${h.src('insee_smic', 'la série publiée par l’Insee')}, fait la moyenne, puis applique le coefficient de la taille du foyer : 1 pour deux ou trois personnes, 1,1 pour quatre ou cinq, 1,2 à partir de six. Vos ressources moyennes sont comparées à ce seuil, et l’écart s’affiche en euros.</p>
${h.table(['Date de dépôt', '2 ou 3 personnes', '4 ou 5 personnes', '6 personnes et plus'], DATES.map((d) => [h.date(d), ...TAILLES.map((n) => h.eur(seuilRegroupement(n, d).seuil, 2))]), 'Seuil mensuel brut moyen selon la date de dépôt, calculé sur le Smic de chaque mois', ['l', 'r', 'r', 'r'])}
<p>Un couple sans enfant qui dépose le ${h.date('2026-03-01')} doit justifier de ${h.eur(couple.seuil, 2)} en moyenne : les douze mois précédents sont presque tous au Smic de ${h.eur(S[S.length - 3].mensuel, 2)}. À partir de juin 2027, tous les mois de la période sont au Smic actuel et les seuils rejoignent les chiffres affichés par la fiche officielle.</p>
<h2>Ce qui ne compte pas, et les dispenses</h2>
<p>Les prestations familiales, le revenu de solidarité active, l’allocation de solidarité aux personnes âgées, l’allocation temporaire d’attente, l’allocation de solidarité spécifique et l’allocation équivalent retraite sont exclues du calcul. Les revenus du conjoint resté à l’étranger ne comptent que s’ils continueront d’être versés après son arrivée. La condition disparaît pour un bénéficiaire de l’AAH ou de l’ASI ; cochez la case du simulateur. Elle disparaît aussi pour une personne de plus de ${RF.dispense_age} ans, en France depuis ${RF.dispense_residence_ans} ans, mariée depuis ${RF.dispense_mariage_ans} ans, qui fait venir son conjoint.</p>
<h2>Les autres conditions</h2>
<p>Le revenu n’est qu’une des conditions : séjour régulier depuis ${RF.sejour_min_mois} mois avec un titre d’au moins un an, logement assez grand (${h.a('logement-regroupement-familial', 'simulateur de surface')}), respect des principes de la vie familiale en France. La famille doit en principe vivre à l’étranger et venir ensemble. Le déroulé de la demande, de l’OFII au préfet, est sur la page ${h.a('procedure-regroupement-familial', 'Procédure du regroupement familial')}. ${h.src('sp_F11168', 'Une autre fiche officielle')} rappelle que la famille d’un Français, d’un Européen, d’un réfugié ou d’un titulaire de carte talent suit une autre procédure.</p>
`,
  },
  en: {
    slug: 'family-reunification-france',
    nav: 'Family reunification: income',
    card: 'Income threshold worked out on the minimum wage of the 12 months before you apply, by household size.',
    title: 'Family Reunification 2026: Income Threshold, Calculated',
    description: 'Family reunification 2026: income threshold based on the minimum wage of the 12 months before you apply, raised for larger households, with exemptions.',
    h1: 'Family reunification: is your income enough?',
    intro: 'Enter the household size, filing date and average income: the threshold is computed month by month on the minimum wage actually in force.',
    resume: `To bring a spouse and minor children to France through family reunification (regroupement familial), a foreign resident who has lived lawfully in France for at least ${RF.sejour_min_mois} months must show stable and sufficient income. The threshold is the average gross monthly minimum wage (Smic) over the ${RF.periode_mois} months before the application for a household of two or three people, plus one tenth for four or five and one fifth from six. Because the minimum wage went up on ${dE(S[S.length - 2].depuis)} and again on ${dE(SMIC.depuis)}, the threshold depends on the filing date: for a couple with three children it is ${eE(exTot.seuil, 2)} for an application on ${dE('2026-07-01')} and ${eE(ex.seuil, 2)} for one on ${dE('2027-01-15')}. With an average income of ${eE(2000)}, that household only just clears the first date but falls ${eE(Math.abs(ex.ecart), 2)} short at the second: filing later does not always make it easier. Family benefits, RSA and other minimum benefits are left out; people receiving the AAH or ASI disability allowances are exempt from the income condition.`,
    faqs: [
      { q: 'Which income counts towards the family-reunification threshold?', a: 'Earnings from employment or self-employment, income from property or savings, pensions, and your spouse’s income if it will keep being paid after they leave their country. Family benefits, RSA, the Aspa old-age allowance, the temporary waiting allowance, the ASS and the AER are excluded. The test is the average over the last twelve months.' },
      { q: 'Why is my threshold lower than the one on Service-Public?', a: `Because the official page quotes today’s minimum wage, ${eE(SMIC.mensuel, 2)} gross, while the rule uses the average of the twelve months before your application. If those months include a period when the minimum wage was lower, in 2025 or early 2026, the average is lower. The calculator takes each month’s minimum wage and averages them exactly for your date.` },
      { q: 'Who does not have to meet the income condition?', a: `Anyone receiving the AAH (disabled adults allowance) or the ASI (supplementary invalidity allowance). Also a person over ${RF.dispense_age} who has lived lawfully in France for at least ${RF.dispense_residence_ans} years, has been married for at least ${RF.dispense_mariage_ans} years and is bringing over their spouse. The other conditions, including housing, still apply.` },
      { q: 'How many people count in the household?', a: 'Everyone who will live in the home once the family has arrived: you, your spouse, the children joining you and those already living with you in France. A couple with two children is a household of four, which raises the threshold to the average minimum wage plus one tenth.' },
      { q: 'What if my income is just below the threshold?', a: `The mayor, who checks income, may give an unfavourable opinion and the prefect may refuse. The calculator shows the exact shortfall: a few euros under the required average is enough to justify a refusal. Waiting a few months so that the twelve months cover higher earnings, or showing that your spouse’s income will continue, changes the result. Each family member then pays ${eE(t150)} for their permit.` },
    ],
    body: (h) => `
<h2>How the threshold is calculated</h2>
<p>The rule comes from ${h.ext(L434, 'CESEDA (immigration code), articles L434-1 to L434-12')} and ${h.src('ceseda_r434', 'articles R434-1 onwards')}, as set out on ${h.src('sp_F11166', 'the official Service-Public.fr family-reunification page')}. The calculator takes the twelve calendar months before the month you file, gives each one the gross monthly minimum wage in force on its first day according to ${h.src('insee_smic', 'Insee’s minimum-wage series')}, averages them, then applies the household coefficient: 1 for two or three people, 1.1 for four or five, 1.2 from six. Your average income is compared with that figure and the gap is shown in euros.</p>
${h.table(['Filing date', '2 or 3 people', '4 or 5 people', '6 people or more'], DATES.map((d) => [h.date(d), ...TAILLES.map((n) => h.eur(seuilRegroupement(n, d).seuil, 2))]), 'Average gross monthly threshold by filing date, built on each month’s minimum wage', ['l', 'r', 'r', 'r'])}
<p>A couple with no children filing on ${h.date('2026-03-01')} must show ${h.eur(couple.seuil, 2)} on average, since almost all of the previous twelve months were at the ${h.eur(S[S.length - 3].mensuel, 2)} minimum wage. From June 2027, every month in the period is at today’s rate and the thresholds match the figures printed on the official page.</p>
<h2>What does not count, and the exemptions</h2>
<p>Family benefits, the RSA (minimum income), the Aspa old-age allowance, the temporary waiting allowance (ATA), the specific solidarity allowance (ASS) and the AER are excluded. A spouse abroad only adds income that will continue after arrival. The condition is lifted for anyone on the AAH or ASI; tick the box in the calculator. It is also lifted for someone over ${RF.dispense_age}, in France for ${RF.dispense_residence_ans} years and married for ${RF.dispense_mariage_ans} years, who is bringing their spouse.</p>
<h2>The other conditions</h2>
<p>Income is only one test: lawful residence for ${RF.sejour_min_mois} months on a permit of at least one year, a home that is large enough (${h.a('logement-regroupement-familial', 'floor-area calculator')}), and respect for the basic principles of family life in France. The family normally lives abroad and arrives together. The steps, from OFII (the French immigration and integration office) to the prefect, are on ${h.a('procedure-regroupement-familial', 'the family-reunification steps page')}. ${h.src('sp_F11168', 'Another official page')} points out that the family of a French national, an EU citizen, a refugee or a talent-card holder follows a different procedure.</p>
`,
  },
});
