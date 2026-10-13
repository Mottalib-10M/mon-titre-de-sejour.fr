import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { residentEligible } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

// Valeurs par défaut du simulateur : 5 ans de résidence depuis le 2 novembre 2021, absences 2 et 4 mois.
const R = P.resident, T = P.tarifs;
const ue = residentEligible('2021-11-02', 'residence');
const conj = residentEligible('2024-04-01', 'conjoint');
const tun = residentEligible('2024-04-01', 'conjoint_tunisien');
const rf = residentEligible('2023-09-15', 'regroupement');
const prem = coutTitre('resident', 'premiere').total;
const ren = coutTitre('resident', 'renouvellement').total;
const sansVisa = coutTitre('resident', 'premiere', { sansVisa: true }).total;
const SMIC = P.smic.historique[P.smic.historique.length - 1].mensuel;
const L_R413 = 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049998833';
const L_L433 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771992/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'carte-de-resident',
  group: 'titres',
  order: 40,
  tool: 'resident',
  related: ['carte-resident-longue-duree-ue', 'carte-de-sejour-pluriannuelle', 'conjoint-de-francais', 'niveau-de-francais-exige', 'examen-civique', 'naturalisation-francaise'],
  sources: ['sp_F2208', 'sp_F17359', 'sp_F11201', 'sp_F34501', 'sp_F39530'],
  fr: {
    slug: 'carte-de-resident',
    nav: 'Carte de résident',
    card: 'Date à laquelle la durée exigée est atteinte, absences tolérées, timbres et niveau de français.',
    title: 'Carte de résident 2026 : date d’éligibilité et conditions',
    description: 'Carte de résident de 10 ans en 2026 : 5 ans de résidence ou 3 ans de mariage, absences tolérées, niveau B1, examen civique, timbres fiscaux et date calculée.',
    h1: 'Carte de résident de 10 ans : à partir de quand la demander ?',
    intro: 'Choisissez le motif et la date de départ : le simulateur donne le jour où la condition de durée est remplie et vérifie vos absences.',
    resume: `La carte de résident est valable 10 ans, se renouvelle et permet de travailler sans autorisation. Elle n’est pas automatique : il faut d’abord remplir une condition de durée qui dépend du motif. ${R.residence_ans} ans de résidence régulière et ininterrompue pour la carte de résident de longue durée-UE (absences limitées à ${R.absence_consecutive_mois} mois d’affilée et ${R.absences_total_mois} mois au total), ${R.conjoint_francais_ans} ans de mariage pour le conjoint d’un Français (${R.conjoint_tunisien_ans} an pour un Tunisien), ${R.regroupement_ans} ans de résidence pour le conjoint venu par regroupement familial auprès d’un résident, ${R.ps_apatride_ans} ans de carte pluriannuelle pour un protégé subsidiaire ou un apatride. Arrivé le 2 novembre 2021, un salarié remplit la durée le ${dF(ue)} ; marié le 1er avril 2024, le conjoint d’un Français la remplit le ${dF(conj)}. Depuis le 1er janvier 2026, une première carte exige aussi le niveau ${R.langue} en français et l’examen civique, sauf après 65 ans. La première délivrance coûte ${eF(prem)}, le renouvellement ${eF(ren)}.`,
    faqs: [
      { q: 'La carte de résident se perd-elle en cas de départ à l’étranger ?', a: 'Oui, si vous quittez la France plus de trois ans de suite : la carte de résident de 10 ans cesse alors d’être valable, selon la fiche officielle du 1er juillet 2026. Pour la carte de résident de longue durée-UE, la limite est de six ans hors de France. Au renouvellement, la préfecture vérifie aussi que vous vivez en France au moins six mois par an.' },
      { q: 'Peut-on demander la carte de résident avant d’avoir le niveau B1 ?', a: `Non pour une première carte, si vous avez moins de 65 ans : le niveau ${R.langue} à l’oral et à l’écrit et la réussite à l’examen civique mention « carte de résident » sont exigés depuis le 1er janvier 2026. En attendant, la préfecture délivre ou renouvelle la carte pluriannuelle. Un renouvellement de carte de résident ne demande ni test ni examen.` },
      { q: 'Qu’est-ce que la carte de résident permanent ?', a: 'C’est une carte de 10 ans proposée au renouvellement d’une carte de résident. Elle est systématiquement proposée après deux cartes de résident consécutives, et délivrée à partir de 60 ans si vous demandez le renouvellement. Les conditions d’intégration restent vérifiées, avec le niveau B1 et l’examen civique avant 65 ans.' },
      { q: 'Combien coûte la carte de résident pour un conjoint entré sans visa ?', a: `La première carte coûte ${eF(prem)} en timbres fiscaux. Entré sans visa de long séjour, le conjoint d’un Français paie en plus un visa de régularisation de ${eF(T.visa_regularisation)}, dont ${eF(T.visa_regularisation_non_remboursable)} au dépôt, soit ${eF(sansVisa)} au total. Le réfugié reçoit sa carte de résident gratuitement.` },
    ],
    body: (h) => `
<h2>Ce que calcule le simulateur</h2>
<p>Il ajoute à la date de départ la durée propre au motif choisi : la date du premier titre pour la résidence de cinq ans, la date du mariage pour le conjoint d’un Français. Il compare ensuite vos absences aux plafonds de la carte de longue durée-UE et affiche le prix de la première carte. Le résultat dit à partir de quand la condition de durée est remplie ; il ne préjuge pas des autres conditions, que la préfecture examine sur pièces.</p>
${h.table(['Motif', 'Durée exigée', 'Exemple de départ', 'Condition remplie le'], [
  ['Résidence régulière (longue durée-UE)', `${h.num(R.residence_ans)} ans`, h.date('2021-11-02'), h.date(ue)],
  ['Conjoint de Français', `${h.num(R.conjoint_francais_ans)} ans de mariage`, h.date('2024-04-01'), h.date(conj)],
  ['Conjoint de Français, nationalité tunisienne', `${h.num(R.conjoint_tunisien_ans)} an de mariage`, h.date('2024-04-01'), h.date(tun)],
  ['Famille venue par regroupement auprès d’un résident', `${h.num(R.regroupement_ans)} ans`, h.date('2023-09-15'), h.date(rf)],
], 'Durées tirées des fiches F2208 et F17359 de Service-Public.fr', ['l', 'l', 'r', 'r'])}
<h2>Les conditions qui s’ajoutent à la durée</h2>
<p>La condition d’intégration républicaine porte sur l’engagement à respecter les principes de la République, leur respect effectif, le niveau ${R.langue} et l’examen civique ; le préfet tient compte du contrat d’intégration républicaine et consulte le maire. Pour la carte de longue durée-UE, il faut en plus des ressources stables d’au moins le Smic, soit ${h.eur(SMIC, 2)} brut par mois, hors prestations familiales et RSA, et une assurance maladie. Le niveau de français repose sur ${h.ext(L_R413, 'l’article R413-15 du CESEDA')} ; la carte de longue durée-UE sur ${h.ext(L_L433, 'l’article L433-7')}. ${h.src('sp_F2208', 'La fiche Carte de résident de 10 ans')} détaille chaque motif.</p>
<h2>Déposer au bon moment</h2>
<p>La demande se fait sur l’ANEF au plus tôt ${h.num(P.renouvellement.au_plus_tot_mois)} mois et au plus tard ${h.num(P.renouvellement.au_plus_tard_mois)} mois avant la fin du titre en cours. Un dépôt hors délai ajoute ${h.eur(T.retard_renouvellement)}. Sans réponse au bout de 4 mois, la demande est implicitement refusée et un recours est possible pendant 2 mois. ${h.a('carte-resident-longue-duree-ue', 'La carte de longue durée-UE')} a sa propre page, avec le calcul des absences.</p>
`,
  },
  en: {
    slug: 'ten-year-resident-card',
    nav: 'Resident card',
    card: 'The date the required period is met, allowed absences, stamps and French level.',
    title: 'Resident Card France 2026: Eligibility Date and Rules',
    description: 'French 10-year resident card in 2026: 5 years of residence or 3 years of marriage, allowed absences, B1 French, civic exam, tax stamps and your date calculated.',
    h1: 'The 10-year resident card: when can you apply?',
    intro: 'Pick the ground and the start date: the calculator gives the day the length condition is met and checks your absences.',
    resume: `The carte de résident is valid for 10 years, renewable, and lets you work without any authorisation. It is not automatic: first you must meet a length condition that depends on the ground. ${R.residence_ans} years of lawful, uninterrupted residence for the EU long-term resident card (absences capped at ${R.absence_consecutive_mois} months in a row and ${R.absences_total_mois} months in total), ${R.conjoint_francais_ans} years of marriage for a French national's spouse (${R.conjoint_tunisien_ans} year for Tunisian nationals), ${R.regroupement_ans} years of residence for a spouse admitted through family reunification with a resident, ${R.ps_apatride_ans} years of multi-year cards for subsidiary-protection holders and stateless people. An employee who arrived on 2 November 2021 meets the period on ${dE(ue)}; a French national's spouse married on 1 April 2024 meets it on ${dE(conj)}. Since 1 January 2026, a first card also requires ${R.langue}-level French and the civic exam, unless you are over 65. First issue costs ${eE(prem)}, renewal ${eE(ren)}.`,
    faqs: [
      { q: 'Can I lose the resident card by living abroad?', a: 'Yes, if you leave France for more than three years in a row: the 10-year resident card then stops being valid, according to the official page of 1 July 2026. For the EU long-term resident card, the limit is six years outside France. At renewal, the prefecture also checks that you live in France at least six months a year.' },
      { q: 'Can I apply for the resident card before reaching B1 French?', a: `Not for a first card if you are under 65: ${R.langue}-level spoken and written French and a pass in the civic exam ("carte de résident" version) have been required since 1 January 2026. Meanwhile the prefecture issues or renews the multi-year card. Renewing an existing resident card needs neither test nor exam.` },
      { q: 'What is the permanent resident card?', a: 'It is a 10-year card offered when a resident card is renewed. It is offered automatically after two consecutive resident cards, and issued from age 60 if you ask for renewal. Integration conditions are still checked, including B1 French and the civic exam before 65.' },
      { q: 'What does the resident card cost a spouse who entered without a visa?', a: `The first card costs ${eE(prem)} in tax stamps. A French national's spouse who entered without a long-stay visa also pays a ${eE(T.visa_regularisation)} regularisation fee, ${eE(T.visa_regularisation_non_remboursable)} of it at filing, making ${eE(sansVisa)} in total. A recognised refugee receives the resident card free of charge.` },
    ],
    body: (h) => `
<h2>What the calculator works out</h2>
<p>It adds the period for your ground to the start date: the date of your first permit for the five-year route, the wedding date for a French national's spouse. It then compares your absences with the EU long-term card's limits and shows the price of the first card. The result tells you from when the length condition is met; it says nothing about the other conditions, which the prefecture checks on the documents.</p>
${h.table(['Ground', 'Period required', 'Example start', 'Condition met on'], [
  ['Lawful residence (EU long-term)', `${h.num(R.residence_ans)} years`, h.date('2021-11-02'), h.date(ue)],
  ['Spouse of a French national', `${h.num(R.conjoint_francais_ans)} years of marriage`, h.date('2024-04-01'), h.date(conj)],
  ['Spouse of a French national, Tunisian', `${h.num(R.conjoint_tunisien_ans)} year of marriage`, h.date('2024-04-01'), h.date(tun)],
  ['Family admitted by reunification with a resident', `${h.num(R.regroupement_ans)} years`, h.date('2023-09-15'), h.date(rf)],
], 'Periods taken from Service-Public.fr pages F2208 and F17359', ['l', 'l', 'r', 'r'])}
<h2>Conditions on top of the period</h2>
<p>The "republican integration" condition covers your commitment to the principles of the Republic, actually respecting them, ${R.langue}-level French and the civic exam; the prefect takes the republican integration contract (CIR) into account and consults the mayor. For the EU long-term card you also need stable income of at least the minimum wage, ${h.eur(SMIC, 2)} gross a month, excluding family benefits and RSA, plus health cover. The language rule rests on ${h.ext(L_R413, 'article R413-15 of the CESEDA')}; the EU long-term card on ${h.ext(L_L433, 'article L433-7')}. ${h.src('sp_F2208', 'The official 10-year resident card page')} covers each ground in detail.</p>
<h2>Filing at the right time</h2>
<p>The application goes in on the ANEF portal (the Interior Ministry's online service) at the earliest ${h.num(P.renouvellement.au_plus_tot_mois)} months and at the latest ${h.num(P.renouvellement.au_plus_tard_mois)} months before your current permit ends. Filing late adds ${h.eur(T.retard_renouvellement)}. With no answer after 4 months, the application counts as refused and you have 2 months to appeal. ${h.a('carte-resident-longue-duree-ue', 'The EU long-term resident card')} has its own page, with the absence check.</p>
`,
  },
});
