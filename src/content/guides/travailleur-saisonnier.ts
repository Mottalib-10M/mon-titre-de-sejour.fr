import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre, titreById, hausse2026 } from '../../lib/engine/couts';
import { taxeEmployeur } from '../../lib/engine/travail';
import { addMonths } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

// Fiche F21516 (vérifiée le 1er mai 2026) : carte pluriannuelle « travailleur saisonnier » ; taxe employeur : fiche F2728.
const T = P.tarifs;
const premiere = coutTitre('saisonnier', 'premiere').total;
const renouv = coutTitre('saisonnier', 'renouvellement').total;
const retard = coutTitre('saisonnier', 'renouvellement', { retard: true }).total;
const salarieCarte = coutTitre('salarie', 'premiere').total;
const h1 = hausse2026('minore', 'premiere');
const SIL = titreById('saisonnier').implicite_mois ?? 0;
const PAR_MOIS = P.taxe_employeur.saisonnier_par_mois;
// Trois saisons de durées différentes sur la durée de la carte.
const SAISONS = [4, 6, 5].map((m) => ({ m, taxe: taxeEmployeur({ type: 'saisonnier', salaireMensuel: 0, moisSaison: m }) }));
const taxe3 = SAISONS.reduce((s, x) => s + x.taxe, 0);
// Exemple : visa saisonnier de 3 mois entré le 1er avril 2027.
const ENTREE = '2027-04-01';
const finVisa = addMonths(ENTREE, 3);
const ouvreCarte = addMonths(finVisa, -2);
const DEPOT = '2027-02-15';
const silence = addMonths(DEPOT, SIL);
const LF_L421_34 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771642/';
const LF_L436 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042772036/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');

export default defineGuide({
  id: 'travailleur-saisonnier',
  group: 'travail',
  order: 80,
  mini: 'saisonnier',
  miniHref: 'taxe-employeur-salarie-etranger',
  related: ['taxe-employeur-salarie-etranger', 'autorisation-de-travail', 'titre-de-sejour-salarie', 'renouvellement-titre-de-sejour', 'cout-titre-de-sejour'],
  sources: ['sp_F21516', 'sp_F2728', 'sp_A18881'],
  fr: {
    slug: 'travailleur-saisonnier',
    nav: 'Carte travailleur saisonnier',
    card: 'Six mois par an au plus, carte de trois ans, timbres au tarif minoré et taxe employeur par mois de saison.',
    title: 'Travailleur saisonnier 2026 : carte de 3 ans, timbre, taxe',
    description: 'Carte travailleur saisonnier 2026 : six mois de travail par an au plus, carte de trois ans, timbres au tarif minoré, taxe employeur par mois de saison, délais.',
    h1: 'Carte de séjour travailleur saisonnier : conditions, coût et taxe',
    intro: 'Pour les travaux saisonniers, la France délivre une carte pluriannuelle de trois ans au plus, qui autorise à séjourner seulement pendant les périodes de saison.',
    resume: `La carte de séjour pluriannuelle « travailleur saisonnier » concerne l’étranger non européen qui vient en France pour des travaux saisonniers ne dépassant pas six mois cumulés par an et qui garde son domicile habituel à l’étranger. Elle est valable trois ans au plus, se renouvelle, mais ne permet pas de faire venir sa famille. L’employeur demande d’abord en ligne l’autorisation de travail ; le consulat délivre ensuite un visa de trois mois mention travailleur saisonnier, avec un contrat saisonnier d’au moins trois mois visé par l’administration. La carte se demande sur l’ANEF dans les deux mois avant la fin de ce visa. Elle coûte ${eF(premiere)} en timbres fiscaux (taxe de ${eF(T.minore.taxe_premiere)} et droit de timbre de ${eF(T.droit_timbre)}), contre ${eF(h1.avant)} avant le 1er mai 2026, puis ${eF(renouv)} au renouvellement. De son côté, l’employeur paie une taxe de ${eF(PAR_MOIS)} par mois de saison : ${eF(SAISONS[0].taxe)} pour une saison de quatre mois, ${eF(taxe3)} pour trois saisons de quatre, six et cinq mois. Sans réponse au bout de ${SIL} mois, la demande est refusée.`,
    faqs: [
      { q: 'Combien de mois par an peut-on travailler avec la carte saisonnier ?', a: 'Six mois cumulés par an au plus. La carte n’autorise à séjourner en France que pendant les périodes qu’elle fixe, et vous devez vous engager à garder votre domicile habituel à l’étranger. Au renouvellement, la préfecture demande la preuve que la limite de six mois par an a été respectée, par exemple les cachets du passeport ou les bulletins de salaire des trois années.' },
      { q: 'Peut-on venir avec sa famille en tant que saisonnier ?', a: 'Non. La fiche officielle est explicite : la carte travailleur saisonnier ne permet pas de faire venir votre famille en France et n’ouvre pas le regroupement familial pour votre conjoint ou vos enfants. C’est cohérent avec la condition de domicile habituel maintenu à l’étranger : le séjour en France est limité aux périodes de saison.' },
      { q: 'Quel contrat faut-il pour obtenir le visa saisonnier ?', a: 'Un contrat de travail saisonnier d’au moins trois mois, visé par l’administration, et l’autorisation de travail obtenue en ligne par l’employeur. L’administration notifie sa décision à l’employeur, transmet l’autorisation à l’OFII puis au consulat, qui délivre un visa de trois mois mention travailleur saisonnier. Votre demande de visa doit comporter cette autorisation.' },
      { q: 'Combien l’employeur paie-t-il pour un saisonnier étranger ?', a: `La taxe employeur vaut ${eF(PAR_MOIS)} par mois d’activité salariée, complet ou incomplet, et elle est due pour chaque contrat saisonnier. Une saison de six mois coûte donc ${eF(SAISONS[1].taxe)}. Pour les saisonniers agricoles, la taxe est due dès le premier jour, alors que pour les autres contrats elle ne vise que les autorisations de plus de trois mois.` },
      { q: 'Que coûte un renouvellement de la carte saisonnier déposé en retard ?', a: `Le renouvellement coûte ${eF(renouv)} s’il est déposé sur l’ANEF entre ${P.renouvellement.au_plus_tot_mois} et ${P.renouvellement.au_plus_tard_mois} mois avant la fin du titre. Hors délai, sauf force majeure ou visa valide, le droit de visa de régularisation de ${eF(T.retard_renouvellement)} s’ajoute : ${eF(retard)} au total. En attendant la carte, une attestation dématérialisée vous autorise à travailler.` },
    ],
    body: (h) => `
<h2>Qui peut obtenir la carte travailleur saisonnier</h2>
<p>La carte s’adresse à l’étranger non européen qui vient faire en France des travaux saisonniers ne dépassant pas une durée cumulée de six mois par an : vendanges, récoltes, saison touristique. Deux documents sont indispensables : un visa valable trois mois portant la mention travailleur saisonnier et un contrat de travail saisonnier d’au moins trois mois visé par l’administration. Vous vous engagez par écrit à maintenir votre résidence habituelle hors de France, et vous ne pouvez séjourner en France que pendant les périodes indiquées sur la carte. Les ressortissants algériens relèvent de règles différentes. La carte est prévue à ${h.ext(LF_L421_34, 'l’article L421-34 du CESEDA')}.</p>
<h2>Le parcours, de l’autorisation de travail à la carte</h2>
<ol>
<li><strong>L’employeur</strong> dépose en ligne la demande d’autorisation de travail avant votre arrivée : lettre motivant le recrutement, copie de votre passeport, preuves des recherches d’un candidat déjà présent sur le marché du travail, justificatifs de votre qualification, et, sauf transmission dans les douze derniers mois, Kbis ou carte d’artisan et dernier bordereau de cotisations sociales.</li>
<li><strong>L’administration</strong> notifie sa décision à l’employeur et, en cas d’accord, transmet l’autorisation à l’OFII puis au consulat de France compétent.</li>
<li><strong>Vous</strong> demandez le visa de trois mois mention travailleur saisonnier, en y joignant l’autorisation de travail.</li>
<li><strong>En France</strong>, vous demandez la carte sur l’ANEF dans les deux mois avant la fin du visa, avec l’engagement de résidence à l’étranger et l’engagement à respecter les principes de la République ; le certificat médical de l’OFII et le timbre se remettent à la délivrance.</li>
</ol>
<p>Exemple : entré le ${h.date(ENTREE)} avec un visa de trois mois qui prend fin le ${h.date(finVisa)}, vous déposez la demande de carte à partir du ${h.date(ouvreCarte)}. Le dépôt sur l’ANEF donne aussitôt une attestation dématérialisée de dépôt.</p>
<h2>Ce que paie le saisonnier, ce que paie l’employeur</h2>
<p>La carte saisonnier est au tarif minoré du barème du 1er mai 2026 : ${h.eur(premiere)} à la première délivrance, contre ${h.eur(salarieCarte)} pour une carte salarié ordinaire, puis ${h.eur(renouv)} à chaque renouvellement. La taxe employeur, elle, est calculée par mois de saison, ce que montre le mini-simulateur en haut de page. Elle se déclare avec la TVA, selon le régime d’imposition de l’employeur.</p>
${h.table(['Saison', 'Mois de travail', 'Taxe employeur'], [
  ...SAISONS.map((x, i) => [`Saison ${i + 1}`, h.num(x.m), h.eur(x.taxe)] as [string, string, string]),
  ['Total sur trois saisons', h.num(SAISONS.reduce((s, x) => s + x.m, 0)), h.eur(taxe3)],
], `Taxe employeur de ${h.eur(PAR_MOIS)} par mois d’activité, complet ou incomplet (fiche F2728)`, ['l', 'r', 'r'])}
<p>Un mois commencé compte comme un mois entier : une saison de quatre mois et demi est taxée comme une saison de cinq mois. Pour les saisonniers agricoles, la taxe est due dès le premier jour. Le détail figure sur ${h.src('sp_F2728', 'la fiche Autorisation de travail')} ; la taxe repose sur ${h.ext(LF_L436, 'les articles L436-1 à L436-13 du CESEDA')}. ${h.a('taxe-employeur-salarie-etranger', 'Le simulateur de taxe employeur')} compare avec les autres contrats.</p>
<h2>Les pièces à rassembler pour la demande de carte</h2>
<p>La fiche officielle liste un dossier court, mais chaque pièce compte. Justificatif d’entrée régulière (le visa de long séjour), passeport avec les pages d’état civil, de validité et de cachets, copie intégrale d’acte de naissance si vous n’avez jamais eu de carte de séjour, déclaration sur l’honneur de non-polygamie si vous êtes marié et ressortissant d’un pays qui l’autorise, justificatif de domicile de moins de six mois, autorisation de travail dématérialisée de l’employeur, engagement écrit de maintenir votre résidence habituelle hors de France et contrat d’engagement à respecter les principes de la République. Le justificatif de paiement du timbre et le certificat médical de l’OFII se remettent seulement au moment de la délivrance : inutile d’acheter le timbre avant que la carte soit accordée.</p>
<h2>Renouveler la carte</h2>
<p>La carte est valable trois ans au plus. Le renouvellement se demande sur l’ANEF, au plus tôt ${h.num(P.renouvellement.au_plus_tot_mois)} mois et au plus tard ${h.num(P.renouvellement.au_plus_tard_mois)} mois avant la fin du titre. Il faut prouver que vous avez respecté la durée cumulée de six mois par an pendant la carte précédente : cachets sur le passeport, bulletins de salaire des trois années. En attendant la fabrication de la nouvelle carte, une attestation dématérialisée vous autorise à travailler. Le timbre est de ${h.eur(renouv)}, ou ${h.eur(retard)} en cas de dépôt hors délai. ${h.a('renouvellement-titre-de-sejour', 'Le calendrier de renouvellement')} donne les dates à partir de l’échéance.</p>
<h2>Refus et silence de la préfecture</h2>
<p>Un refus écrit est en général assorti d’une obligation de quitter le territoire français, contestable devant le tribunal administratif dans un délai de 48 heures, 15 jours ou 30 jours selon le type d’obligation. Le silence vaut refus au bout de ${h.num(SIL)} mois : pour une demande déposée le ${h.date(DEPOT)}, le refus implicite naîtrait le ${h.date(silence)}, et un recours administratif ou contentieux serait possible dans les ${h.num(P.recours.mois)} mois suivants. Aucune préfecture ne publie de délai moyen de traitement. Référence : ${h.src('sp_F21516', 'la fiche Carte de séjour pluriannuelle travailleur saisonnier')}. Information générale, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'seasonal-worker-permit',
    nav: 'Seasonal worker permit',
    card: 'Six months a year at most, a three-year card, reduced-rate stamps and an employer tax per month of season.',
    title: 'Seasonal Worker Permit 2026: Three-Year Card, Stamps and Tax',
    description: 'Seasonal worker permit France 2026: six months of work a year at most, a three-year card, reduced-rate stamps, the employer tax per season month, deadlines.',
    h1: 'Seasonal worker residence card: conditions, cost and employer tax',
    intro: 'For seasonal work, France issues a multi-year card valid for up to three years, which lets you stay only during the seasons it covers.',
    resume: `The multi-year "travailleur saisonnier" (seasonal worker) card is for a non-EU national who comes to France for seasonal work of no more than six months in total per year and keeps their usual home abroad. It is valid for up to three years and can be renewed, but it does not let you bring your family. The employer first applies online for a work authorisation; the consulate then issues a three-month visa marked travailleur saisonnier, with a seasonal contract of at least three months approved by the authorities. You apply for the card on ANEF, the government portal, within the two months before that visa ends. It costs ${eE(premiere)} in tax stamps (timbres fiscaux: ${eE(T.minore.taxe_premiere)} tax plus ${eE(T.droit_timbre)} stamp duty), up from ${eE(h1.avant)} before 1 May 2026, then ${eE(renouv)} on renewal. The employer, for its part, pays a tax of ${eE(PAR_MOIS)} per month of season: ${eE(SAISONS[0].taxe)} for a four-month season, ${eE(taxe3)} for three seasons of four, six and five months. With no answer after ${SIL} months, the application counts as refused.`,
    faqs: [
      { q: 'How many months a year can I work on the seasonal card?', a: 'Six months in total per year at most. The card only allows you to stay in France during the periods it states, and you must commit to keeping your usual home abroad. On renewal, the prefecture asks for proof that you kept within six months a year, such as passport stamps or payslips from the three years of the card.' },
      { q: 'Can a seasonal worker bring their family to France?', a: 'No. The official page is explicit: the seasonal worker card does not let you bring your family to France and does not open family reunification for your spouse or children. That matches the condition of keeping your usual home abroad: your stay in France is limited to the seasons you work.' },
      { q: 'What contract do I need for the seasonal visa?', a: 'A seasonal employment contract of at least three months, approved by the authorities, and the work authorisation your employer obtains online. The authorities notify the employer, then pass the authorisation to OFII (the French immigration and integration office) and the consulate, which issues a three-month seasonal worker visa. Your visa application must include that authorisation.' },
      { q: 'How much does an employer pay to hire a foreign seasonal worker?', a: `The employer tax is ${eE(PAR_MOIS)} per month of salaried work, full or partial, and it is due for each seasonal contract. A six-month season therefore costs ${eE(SAISONS[1].taxe)}. For agricultural seasonal workers the tax is due from the first day, while for other contracts it only applies to authorisations of more than three months.` },
      { q: 'What does a late renewal of the seasonal card cost?', a: `Renewal costs ${eE(renouv)} if filed on ANEF between ${P.renouvellement.au_plus_tot_mois} and ${P.renouvellement.au_plus_tard_mois} months before the card expires. If late, unless there is force majeure or a valid visa, the ${eE(T.retard_renouvellement)} regularisation fee is added: ${eE(retard)} in total. While the new card is being made, an electronic certificate allows you to keep working.` },
    ],
    body: (h) => `
<h2>Who can get the seasonal worker card</h2>
<p>The card is for non-EU nationals coming to France for seasonal work totalling no more than six months a year: grape harvests, crop picking, the tourist season. Two documents are essential: a three-month visa marked travailleur saisonnier and a seasonal employment contract of at least three months approved by the authorities. You commit in writing to keeping your usual residence outside France, and you may only stay in France during the periods shown on the card. Algerian nationals follow different rules. The card is provided for in ${h.ext(LF_L421_34, 'section L421-34 of the CESEDA')}, the French immigration code.</p>
<h2>From work authorisation to card</h2>
<ol>
<li><strong>The employer</strong> applies online for the work authorisation before you arrive: a letter explaining the recruitment, a copy of your passport, proof of efforts to hire someone already on the French job market, evidence of your skills, and, unless sent in the last twelve months, the company registration extract or craft card and the latest social-contribution statement.</li>
<li><strong>The authorities</strong> notify the employer and, if approved, pass the authorisation to OFII and then to the relevant French consulate.</li>
<li><strong>You</strong> apply for the three-month seasonal worker visa, attaching the work authorisation.</li>
<li><strong>In France</strong>, you apply for the card on ANEF within the two months before the visa ends, with your commitment to live abroad and the signed commitment to respect the principles of the Republic; the OFII medical certificate and the stamp are handed in when the card is issued.</li>
</ol>
<p>Example: arriving on ${h.date(ENTREE)} with a three-month visa ending on ${h.date(finVisa)}, you file the card application from ${h.date(ouvreCarte)}. Filing on ANEF immediately produces an electronic filing certificate.</p>
<h2>What the worker pays, what the employer pays</h2>
<p>The seasonal card is at the reduced rate of the 1 May 2026 schedule: ${h.eur(premiere)} for the first card, compared with ${h.eur(salarieCarte)} for an ordinary employee card, then ${h.eur(renouv)} for each renewal. The employer tax is worked out per month of season, which the mini-calculator at the top of the page shows. It is declared with the employer’s VAT return, under its usual VAT regime.</p>
${h.table(['Season', 'Months worked', 'Employer tax'], [
  ...SAISONS.map((x, i) => [`Season ${i + 1}`, h.num(x.m), h.eur(x.taxe)] as [string, string, string]),
  ['Total over three seasons', h.num(SAISONS.reduce((s, x) => s + x.m, 0)), h.eur(taxe3)],
], `Employer tax of ${h.eur(PAR_MOIS)} per month of work, full or partial (page F2728)`, ['l', 'r', 'r'])}
<p>A month started counts as a whole month: a four-and-a-half-month season is taxed like a five-month one. For agricultural seasonal workers the tax is due from day one. The details are on ${h.src('sp_F2728', 'the official work authorisation page')}; the tax rests on ${h.ext(LF_L436, 'sections L436-1 to L436-13 of the CESEDA')}. ${h.a('taxe-employeur-salarie-etranger', 'The employer tax calculator')} compares with other contracts.</p>
<h2>The documents to gather for the card application</h2>
<p>The official page lists a short file, but every item matters. Proof of lawful entry (your long-stay visa); your passport, with the civil-status, validity and stamp pages; a full copy of your birth certificate if you have never held a French residence card; a sworn statement that you are not in a polygamous marriage in France, if you are married and your country allows polygamy; proof of address under six months old; the employer’s electronic work authorisation; your written commitment to keep your usual home outside France; and the signed contract committing you to respect the principles of the Republic. Proof of stamp payment and the OFII medical certificate are only handed in when the card is issued, so there is no need to buy the stamp before the card is granted. If you buy one and do not use it, you can ask for a refund online. Keep copies of everything, including the electronic filing certificate ANEF gives you, because you will need them again for the renewal three years later.</p>
<h2>Renewing the card</h2>
<p>The card lasts up to three years. Renewal is requested on ANEF no earlier than ${h.num(P.renouvellement.au_plus_tot_mois)} months and no later than ${h.num(P.renouvellement.au_plus_tard_mois)} months before the card ends. You must prove that you kept within six months a year during the previous card: passport stamps, payslips from the three years. While the new card is being produced, an electronic certificate lets you work. The stamp costs ${h.eur(renouv)}, or ${h.eur(retard)} if you file late. ${h.a('renouvellement-titre-de-sejour', 'The renewal timetable')} gives the dates from your expiry date.</p>
<h2>Refusal and prefecture silence</h2>
<p>A written refusal usually comes with an order to leave France (OQTF), which can be challenged before the administrative court within 48 hours, 15 days or 30 days depending on the type of order. Silence counts as refusal after ${h.num(SIL)} months: for an application filed on ${h.date(DEPOT)}, the implicit refusal would arise on ${h.date(silence)}, and an administrative or court appeal would be possible within the following ${h.num(P.recours.mois)} months. No prefecture publishes average processing times. Reference: ${h.src('sp_F21516', 'the official seasonal worker card page')}. General information, not legal advice.</p>
`,
  },
});
