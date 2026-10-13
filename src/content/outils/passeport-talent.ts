import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { seuilsTalent } from '../../lib/engine/travail';
import { coutTitre } from '../../lib/engine/couts';
import { formatMoney } from '../../lib/format';

// Valeurs par défaut du simulateur (preset « talent ») : 52 000 € brut par an, contrat de 24 mois, master français.
const TL = P.talent;
const ex = seuilsTalent(52000);
const exTalent = ex.find((s) => s.voie === 'talent_salarie')!;
const exCbe = ex.find((s) => s.voie === 'carte_bleue')!;
const bas = seuilsTalent(38000).find((s) => s.voie === 'talent_salarie')!;
const carte = coutTitre('talent_salarie', 'premiere').total;
const famille = coutTitre('talent_famille', 'premiere').total;
const SMIC_AN = P.smic.annuel_brut;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const LF = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771564/';

export default defineGuide({
  id: 'passeport-talent',
  group: 'travail',
  order: 10,
  tool: 'talent',
  preset: 'talent',
  related: ['carte-bleue-europeenne', 'carte-talent-famille', 'changement-de-statut-etudiant-salarie', 'titre-de-sejour-salarie', 'cout-titre-de-sejour'],
  sources: ['sp_F16922', 'arrete_salaire_ref', 'sp_F17319'],
  fr: {
    slug: 'passeport-talent',
    nav: 'Passeport talent : seuils',
    card: 'Salaire minimum de chaque carte talent, comparé à votre contrat, et durée de la carte.',
    title: 'Passeport talent 2026 : salaire minimum de chaque catégorie',
    description: 'Passeport talent 2026 : salaire minimum de la carte talent salarié qualifié, entreprise innovante, mission, mandataire, carte bleue, comparé à votre contrat.',
    h1: 'Passeport talent : votre salaire atteint-il le seuil ?',
    intro: 'Saisissez le salaire brut annuel du contrat : le simulateur le compare au seuil de chaque carte talent et indique l’écart.',
    resume: `Le passeport talent est une carte de séjour pluriannuelle, valable jusqu’à ${TL.duree_max_ans} ans, qui dispense l’employeur de demander une autorisation de travail. Pour les catégories salariées, tout se joue sur le salaire brut annuel inscrit au contrat. La carte talent salarié qualifié exige ${eF(TL.salaire_ref)}, avec un diplôme français au moins équivalent au master et un contrat de plus de ${TL.salarie_contrat_min_mois} mois ; le même montant vaut pour le salarié d’une entreprise innovante et pour le salarié en mission intragroupe. Ce seuil est le salaire brut moyen annuel de référence fixé par l’arrêté du 21 août 2025. La carte bleue européenne demande une fois et demie ce montant, ${eF(TL.cbe)}. Les professions médicales et de la pharmacie ont leur propre seuil, ${eF(TL.praticien, 2)}, et le mandataire social doit percevoir trois Smic annuels, ${eF(TL.mandataire, 2)}. Avec ${eF(52000)} brut par an, un ingénieur diplômé d’un master français dépasse le seuil de ${eF(exTalent.ecart)} mais reste ${eF(-exCbe.ecart)} sous celui de la carte bleue. La carte coûte ${eF(carte)} en timbres fiscaux.`,
    faqs: [
      { q: 'Le seuil du passeport talent se calcule-t-il sur le salaire mensuel ou annuel ?', a: `Sur la rémunération brute annuelle prévue au contrat de travail. Un salaire de ${eF(3300)} brut par mois sur douze mois donne ${eF(3300 * 12)} par an, au-dessus des ${eF(TL.salaire_ref)} de la carte talent salarié qualifié. Le simulateur demande donc un montant annuel ; multipliez votre salaire mensuel par le nombre de mois réellement payés.` },
      { q: 'Faut-il un diplôme français pour la carte talent salarié qualifié ?', a: 'Oui. La fiche officielle exige un diplôme obtenu en France au moins équivalent au master, ou un diplôme de niveau 1 labellisé par la Conférence des grandes écoles. Sans ce diplôme, le salarié en entreprise innovante ou en mission intragroupe peut viser une autre catégorie talent, et la carte bleue européenne accepte un diplôme étranger de trois ans d’études supérieures.' },
      { q: 'Que faire si mon salaire est juste sous le seuil ?', a: `Avec ${eF(38000)} brut par an, il manque ${eF(-bas.ecart)} pour la carte talent salarié qualifié. Il reste la carte de séjour salarié, pour laquelle l’employeur demande une autorisation de travail. Une augmentation inscrite au contrat avant le dépôt change le résultat ; une prime variable non garantie ne compte pas dans la rémunération prévue.` },
      { q: 'Ma famille peut-elle me suivre avec le passeport talent ?', a: `Oui, par la procédure simplifiée « famille accompagnante », sans passer par le regroupement familial. Votre époux ou épouse reçoit une carte talent-famille de la même durée que la vôtre, au prix de ${eF(famille)} en timbres ; vos enfants mineurs n’ont pas besoin de titre. Le conjoint peut travailler avec cette carte.` },
      { q: 'Combien de temps la préfecture a-t-elle pour répondre ?', a: 'Pour la carte talent salarié qualifié, la fiche officielle indique qu’une absence de réponse au bout de 4 mois vaut refus implicite, contre 90 jours pour la carte bleue européenne. Aucune préfecture ne publie de délai moyen : ces durées sont seulement le moment à partir duquel un recours devient possible.' },
    ],
    body: (h) => `
<h2>Les seuils que le simulateur applique</h2>
<p>Le simulateur compare votre salaire brut annuel à chacun des seuils publiés sur ${h.src('sp_F16922', 'la fiche officielle de la carte talent')}. Pour les catégories salariées, la référence est le salaire brut moyen annuel fixé par ${h.src('arrete_salaire_ref', 'l’arrêté du 21 août 2025')}. La carte de recherche d’emploi après un diplôme figure à titre de comparaison, exprimée en montant annuel.</p>
${h.table(['Catégorie talent', 'Seuil brut annuel', 'Autres conditions principales'], [
  ['Salarié qualifié', h.eur(TL.salaire_ref), 'Master français, contrat de plus de 3 mois'],
  ['Salarié d’une entreprise innovante', h.eur(TL.salaire_ref), 'Jeune entreprise innovante, fonctions liées à la R&D'],
  ['Salarié en mission', h.eur(TL.salaire_ref), '3 mois d’ancienneté dans le groupe'],
  ['Carte bleue européenne', h.eur(TL.cbe), 'Diplôme de 3 ans ou 5 ans d’expérience, contrat de 6 mois'],
  ['Professions médicales et pharmacie', h.eur(TL.praticien, 2), '2e échelon des praticiens associés'],
  ['Mandataire social', h.eur(TL.mandataire, 2), 'Trois Smic annuels, 3 mois dans le groupe'],
], 'Seuils de la carte talent (fiche vérifiée le 1er juin 2026)', ['l', 'r', 'l'])}
<h2>Les catégories qui ne dépendent pas d’un salaire</h2>
<p>Le porteur de projet doit justifier d’un projet réel et sérieux, d’un financement d’au moins ${h.eur(TL.createur_investissement)} et de ressources au moins égales au Smic annuel brut, ${h.eur(SMIC_AN, 2)}. L’investisseur doit réaliser en France un investissement direct d’au moins ${h.eur(TL.investisseur)}. L’artiste justifie de ressources d’au moins ${h.eur(TL.artiste_mensuel, 2)} par mois de séjour, dont 51 % tirés de son activité artistique. Le chercheur signe une convention d’accueil avec un organisme agréé, et la personne de renommée nationale ou internationale justifie de ressources au moins égales au Smic annuel. Ces catégories ne se jugent pas sur un salaire : le simulateur ne les chiffre pas.</p>
<h2>Durée, coût et suite du parcours</h2>
<p>La carte est délivrée pour la durée du contrat, dans la limite de ${h.num(TL.duree_max_ans)} ans. Elle coûte ${h.eur(carte)} en timbres fiscaux à la remise. Les conditions viennent des ${h.ext(LF, 'articles L421-7 à L421-25 du CESEDA')}. Pour la carte bleue européenne et ses règles de durée propres, voir ${h.a('carte-bleue-europeenne', 'la page carte bleue européenne')}.</p>
`,
  },
  en: {
    slug: 'talent-passport-france',
    nav: 'Talent passport thresholds',
    card: 'Minimum salary for each talent card, compared with your contract, and card length.',
    title: 'Talent Passport 2026: Minimum Salary for Each Category',
    description: 'Talent passport 2026: minimum salary for the skilled-employee, innovative-company, intra-group, company-officer and EU Blue Card routes, against your offer.',
    h1: 'Talent passport: does your salary clear the threshold?',
    intro: 'Enter the gross annual salary in your contract: the calculator compares it with each talent card threshold and shows the gap.',
    resume: `The talent passport (passeport talent, now called the carte de séjour pluriannuelle « talent ») is a multi-year residence permit, valid for up to ${TL.duree_max_ans} years, that spares your employer the work-authorisation procedure. For the salaried routes, everything turns on the gross annual pay written into your contract. The skilled-employee card requires ${eE(TL.salaire_ref)}, plus a French degree at least equivalent to a master's and a contract longer than ${TL.salarie_contrat_min_mois} months; the same figure applies to staff of an innovative company and to employees on an intra-group assignment. That figure is the reference average gross annual salary set by the order of 21 August 2025. The EU Blue Card asks for one and a half times as much, ${eE(TL.cbe)}. Medical and pharmacy professions have their own threshold, ${eE(TL.praticien, 2)}, and a company officer must earn three annual minimum wages, ${eE(TL.mandataire, 2)}. On ${eE(52000)} gross a year, an engineer with a French master's clears the skilled-employee bar by ${eE(exTalent.ecart)} but sits ${eE(-exCbe.ecart)} below the Blue Card. The card costs ${eE(carte)} in tax stamps.`,
    faqs: [
      { q: 'Is the talent passport threshold based on monthly or annual pay?', a: `On the gross annual pay set out in the employment contract. ${eE(3300)} gross a month over twelve months gives ${eE(3300 * 12)} a year, above the ${eE(TL.salaire_ref)} required for the skilled-employee card. That is why the calculator asks for an annual figure: multiply your monthly pay by the number of months actually paid.` },
      { q: 'Do I need a French degree for the skilled-employee talent card?', a: 'Yes. The official page requires a degree obtained in France at least equivalent to a master’s, or a level-1 degree accredited by the Conférence des grandes écoles. Without one, staff of an innovative company or on an intra-group assignment can aim for another talent route, and the EU Blue Card accepts a foreign degree after three years of higher education.' },
      { q: 'What if my salary is just below the talent threshold?', a: `At ${eE(38000)} gross a year you are ${eE(-bas.ecart)} short of the skilled-employee card. The fallback is the "salarié" employee card, for which the employer applies for a work authorisation. A raise written into the contract before you file changes the result; a variable bonus that is not guaranteed does not count as contractual pay.` },
      { q: 'Can my spouse and children join me on a talent passport?', a: `Yes, through the simplified "accompanying family" procedure, without family reunification. Your spouse receives a talent-family card for the same period as yours, costing ${eE(famille)} in stamps; minor children need no permit. Your spouse may work in France with that card, in any job.` },
      { q: 'How long does the prefecture have to answer a talent card application?', a: 'For the skilled-employee card, the official page states that no answer after 4 months counts as an implicit refusal, against 90 days for the EU Blue Card. No prefecture publishes an average processing time: these periods only mark when an appeal becomes possible.' },
    ],
    body: (h) => `
<h2>The thresholds the calculator applies</h2>
<p>The calculator compares your gross annual salary with each threshold published on ${h.src('sp_F16922', 'the official talent card page')} (in French). For the salaried routes, the benchmark is the reference average gross annual salary set by ${h.src('arrete_salaire_ref', 'the order of 21 August 2025')}. The post-graduation job-search card is shown for comparison, converted to an annual amount.</p>
${h.table(['Talent route', 'Gross annual threshold', 'Other main conditions'], [
  ['Skilled employee', h.eur(TL.salaire_ref), 'French master’s, contract over 3 months'],
  ['Innovative company employee', h.eur(TL.salaire_ref), 'Young innovative company, R&D-related role'],
  ['Employee on assignment', h.eur(TL.salaire_ref), '3 months with the group'],
  ['EU Blue Card', h.eur(TL.cbe), '3-year degree or 5 years’ experience, 6-month contract'],
  ['Medical and pharmacy professions', h.eur(TL.praticien, 2), 'Step 2 of the associate practitioner scale'],
  ['Company officer', h.eur(TL.mandataire, 2), 'Three annual minimum wages, 3 months in the group'],
], 'Talent card thresholds (official page checked 1 June 2026)', ['l', 'r', 'l'])}
<h2>Routes that do not depend on a salary</h2>
<p>A business founder must show a real and serious project, funding of at least ${h.eur(TL.createur_investissement)} and resources at least equal to the gross annual minimum wage, ${h.eur(SMIC_AN, 2)}. An investor must make a direct investment of at least ${h.eur(TL.investisseur)} in France. An artist shows resources of at least ${h.eur(TL.artiste_mensuel, 2)} per month of stay, 51% of it from artistic work. A researcher signs a hosting agreement (convention d'accueil) with an approved body, and a person of national or international renown shows resources at least equal to the annual minimum wage. None of these is judged on a salary, so the calculator does not cost them.</p>
<h2>Length, cost and what comes next</h2>
<p>The card is issued for the length of the contract, up to ${h.num(TL.duree_max_ans)} years. It costs ${h.eur(carte)} in tax stamps (timbres fiscaux) when handed over. The conditions come from ${h.ext(LF, 'sections L421-7 to L421-25 of the CESEDA immigration code')}. For the EU Blue Card and its own length rules, see ${h.a('carte-bleue-europeenne', 'the EU Blue Card page')}.</p>
`,
  },
});
