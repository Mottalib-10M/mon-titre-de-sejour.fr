import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { orienter } from '../../lib/engine/arbre';
import { coutTitre } from '../../lib/engine/couts';
import { formatMoney } from '../../lib/format';

// Exemples calculés par l'arbre de décision (valeurs par défaut : emploi qualifié, 45 000 €, sans master).
const ingenieur = orienter({ nationalite: 'autre', motif: 'qualifie', salaire: 62000 });
const jeuneDiplome = orienter({ nationalite: 'autre', motif: 'qualifie', salaire: 42000, master: true });
const sansMaster = orienter({ nationalite: 'autre', motif: 'qualifie', salaire: 42000 });
const conjoint = orienter({ nationalite: 'autre', motif: 'conjoint', anneesMariage: 1 });
const famille = orienter({ nationalite: 'autre', motif: 'famille', annees: 1 });
const dans = (o: ReturnType<typeof orienter>, e: string) => o.suite.find((s) => s.etape === e)?.dans ?? 0;
const vlsSal = coutTitre('salarie', 'vls').total, vlsEtu = coutTitre('etudiant', 'vls').total;
const T = P.tarifs, TL = P.talent;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');

export default defineGuide({
  id: 'quel-titre-de-sejour',
  group: 'calculs',
  order: 10,
  tool: 'arbre',
  related: ['cout-titre-de-sejour', 'titre-de-sejour', 'carte-de-sejour', 'passeport-talent', 'carte-de-resident', 'naturalisation-francaise'],
  sources: ['sp_F39', 'sp_F2209', 'sp_F15898', 'sp_F16922', 'sp_F2231', 'sp_F302'],
  fr: {
    slug: 'quel-titre-de-sejour',
    nav: 'Quel titre de séjour ?',
    card: 'Votre nationalité et votre projet : le titre qui correspond, son coût et les étapes suivantes.',
    title: 'Titre de séjour à demander en 2026 : orientation par motif',
    description: 'Quel titre de séjour demander en 2026 selon votre projet : travail, études, conjoint de Français, famille, retraite. Titre, coût en timbres et étapes suivantes.',
    h1: 'Quel titre de séjour pour votre situation ?',
    intro: 'Deux réponses suffisent pour l’orientation ; le salaire, le diplôme et les années en France affinent le résultat.',
    resume: `Un étranger majeur hors Union européenne qui reste plus de trois mois en France doit détenir un visa de long séjour ou un titre de séjour ; un citoyen de l’UE, de l’EEE ou suisse en est dispensé. Le titre dépend du motif du séjour. Pour un emploi qualifié payé au moins ${eF(TL.cbe)} brut par an, c’est la carte bleue européenne ; avec un master français et au moins ${eF(TL.salaire_ref)}, la carte talent salarié qualifié ; en dessous, la carte salarié, après autorisation de travail. Un étudiant arrive avec un VLS-TS validé pour ${eF(vlsEtu)}, un salarié pour ${eF(vlsSal)}. Le conjoint d’un Français obtient une carte vie privée et familiale, puis la carte de résident après ${P.resident.conjoint_francais_ans} ans de mariage. La famille d’un étranger en séjour régulier passe par le regroupement familial, ouvert après ${P.regroupement.sejour_min_mois} mois de séjour du demandeur. Le simulateur applique ces règles et indique dans combien d’années viennent la carte pluriannuelle, la carte de résident et la nationalité.`,
    faqs: [
      { q: 'Le simulateur tient-il compte des Algériens et des Tunisiens ?', a: `Oui, en partie. Pour un Algérien, il signale que l’accord franco-algérien de 1968 remplace les cartes par des certificats de résidence aux règles propres. Pour un conjoint tunisien de Français, il applique la carte de résident après ${P.resident.conjoint_tunisien_ans} an de mariage au lieu de ${P.resident.conjoint_francais_ans}. Les autres accords bilatéraux ne sont pas simulés.` },
      { q: 'Que veut dire « autre piste » dans le résultat ?', a: 'C’est un titre dont les conditions peuvent aussi correspondre à vos réponses : la carte salarié à côté de la carte talent, la carte recherche d’emploi après des études, la carte vie privée et familiale à côté du regroupement familial. Chaque piste a sa propre page sur ce site, avec ses conditions détaillées et son coût.' },
      { q: 'Pourquoi le résultat change-t-il quand je coche le diplôme de master ?', a: `Parce que la carte talent salarié qualifié exige un diplôme français au moins équivalent au master en plus du salaire de ${eF(TL.salaire_ref)}. Sans ce diplôme, un salaire de ${eF(42000)} mène à la carte salarié ; avec, il mène à la carte talent, qui dispense l’employeur d’autorisation de travail. La carte bleue européenne n’exige pas de diplôme français.` },
      { q: 'L’orientation vaut-elle accord de la préfecture ?', a: 'Non. Le simulateur applique les conditions principales publiées sur Service-Public.fr. La préfecture vérifie aussi la réalité de la vie commune, l’ordre public, l’intégration et l’authenticité des pièces. C’est une information générale, pas un conseil juridique ni une décision, et le site est indépendant de l’administration.' },
    ],
    body: (h) => `
<h2>Comment l’arbre de décision lit vos réponses</h2>
<p>La première question trie par nationalité. Un citoyen européen n’a besoin d’aucun titre, comme le rappelle ${h.src('sp_F39', 'la fiche officielle sur les titres exigés au-delà de trois mois')}. Un Algérien relève de certificats de résidence propres. Les autres nationalités passent à la deuxième question, le projet en France, qui choisit le motif de séjour du CESEDA. Les champs suivants affinent ce motif : le salaire et le diplôme pour le travail qualifié, les années de mariage pour le conjoint de Français, les années déjà passées en France pour le regroupement familial et les étapes suivantes.</p>
${h.table(['Situation', 'Titre proposé', 'Étape suivante'], [
  [`Ingénieur, ${h.eur(62000)} brut par an`, 'Carte bleue européenne', `Carte de résident dans ${h.num(dans(ingenieur, 'resident'))} ans`],
  [`Master français, ${h.eur(42000)}`, 'Talent salarié qualifié', `Nationalité dans ${h.num(dans(jeuneDiplome, 'naturalisation'))} ans`],
  [`Sans master, ${h.eur(42000)}`, 'Carte salarié', `Carte de résident dans ${h.num(dans(sansMaster, 'resident'))} ans`],
  ['Marié(e) depuis un an à un Français', 'Vie privée et familiale', `Résident dans ${h.num(dans(conjoint, 'resident'))} ans, nationalité dans ${h.num(dans(conjoint, 'mariage'))}`],
  ['Rejoindre un conjoint en France depuis un an', 'Regroupement familial', famille.principal.pourquoi === 'regroupement_attente' ? 'Attendre les 18 mois du demandeur' : 'Demande possible'],
], 'Résultats de l’arbre de décision pour cinq profils', ['l', 'l', 'l'])}
<h2>Travail : trois seuils, trois titres</h2>
<p>Le salaire décide. À partir de ${h.eur(TL.cbe)} brut annuel, avec trois ans d’études supérieures ou cinq ans d’expérience et un contrat d’au moins ${h.num(TL.cbe_contrat_min_mois)} mois, la carte bleue européenne. À partir de ${h.eur(TL.salaire_ref)}, avec un master obtenu en France, la carte talent salarié qualifié. Ces deux cartes figurent sur ${h.src('sp_F16922', 'la fiche Carte talent')}. En dessous, la carte salarié de ${h.src('sp_F15898', 'la fiche Salarié')} suppose une autorisation de travail demandée par l’employeur.</p>
<h2>Famille, études, ressources propres</h2>
<p>Le conjoint et le parent d’un enfant français relèvent de la carte vie privée et familiale. Le conjoint d’un étranger en séjour régulier passe par le regroupement familial. L’étudiant doit justifier de ${h.eur(P.etudiant.ressources_mensuelles, 2)} par mois (${h.src('sp_F2231', 'fiche Étudiant')}), le visiteur du Smic net, soit ${h.eur(P.visiteur.ressources_mensuelles_net, 2)} par mois (${h.src('sp_F302', 'fiche Visiteur')}). Pour une personne en France sans titre, seule l’admission exceptionnelle au séjour reste envisageable, au cas par cas. Le coût de chaque piste se détaille dans ${h.a('cout-titre-de-sejour', 'le simulateur de coût')}.</p>
`,
  },
  en: {
    slug: 'which-residence-permit-france',
    nav: 'Which residence permit?',
    card: 'Your nationality and plan: the permit that fits, its cost and the next steps.',
    title: 'Residence Permit Options 2026: Which One Fits Your Case',
    description: 'Which French residence permit to apply for in 2026 by plan: work, study, spouse of a French national, family, retirement. Permit, stamp cost and next steps.',
    h1: 'Which residence permit fits your situation?',
    intro: 'Two answers are enough for a first result; salary, degree and years already in France refine it.',
    resume: `A non-EU adult staying in France for more than three months needs a long-stay visa or a residence permit (titre de séjour); EU, EEA and Swiss citizens do not. Which permit depends on the purpose of the stay. For a skilled job paying at least ${eE(TL.cbe)} gross a year, it is the EU Blue Card; with a French master's degree and at least ${eE(TL.salaire_ref)}, the talent card for skilled employees; below those levels, the employee ("salarié") card, after the employer obtains a work authorisation. A student arrives on a VLS-TS visa validated for ${eE(vlsEtu)}, an employee for ${eE(vlsSal)}. A French national's spouse receives a private and family life card, then the resident card after ${P.resident.conjoint_francais_ans} years of marriage. The family of a foreign national living lawfully in France goes through family reunification, which opens once the sponsor has ${P.regroupement.sejour_min_mois} months of residence. The calculator applies these rules and shows how many years remain before the multi-year card, the resident card and citizenship.`,
    faqs: [
      { q: 'Does the tool handle Algerian and Tunisian nationals?', a: `Partly. For Algerians it flags that the 1968 Franco-Algerian agreement replaces the cards with residence certificates under their own rules. For a Tunisian spouse of a French national it applies the resident card after ${P.resident.conjoint_tunisien_ans} year of marriage instead of ${P.resident.conjoint_francais_ans}. Other bilateral agreements are not simulated.` },
      { q: 'What does "alternative" mean in the result?', a: 'It is another permit whose conditions may also match your answers: the employee card next to the talent card, the job-search card after studying, the private and family life card next to family reunification. Each alternative has its own page on this site with detailed conditions and cost.' },
      { q: 'Why does the result change when I tick the master’s degree?', a: `Because the talent card for skilled employees requires a French degree at least equivalent to a master's on top of the ${eE(TL.salaire_ref)} salary. Without it, a ${eE(42000)} salary leads to the employee card; with it, to the talent card, which spares the employer a work authorisation. The EU Blue Card needs no French degree.` },
      { q: 'Is the guidance an approval from the prefecture?', a: 'No. The tool applies the main conditions published on Service-Public.fr. The prefecture also checks that a couple really lives together, public order, integration and the authenticity of documents. This is general information, not legal advice or a decision, and the site is independent of the French administration.' },
    ],
    body: (h) => `
<h2>How the decision tree reads your answers</h2>
<p>The first question sorts by nationality. A European citizen needs no permit at all, as ${h.src('sp_F39', 'the official page on permits required beyond three months')} confirms. An Algerian falls under separate residence certificates. Everyone else moves to the second question, your plan in France, which picks the ground for residence under the CESEDA (the immigration code). The remaining fields refine that ground: salary and degree for skilled work, years of marriage for a French national's spouse, years already spent in France for family reunification and for the later steps.</p>
${h.table(['Situation', 'Permit suggested', 'Next step'], [
  [`Engineer, ${h.eur(62000)} gross a year`, 'EU Blue Card', `Resident card in ${h.num(dans(ingenieur, 'resident'))} years`],
  [`French master's, ${h.eur(42000)}`, 'Talent: skilled employee', `Citizenship in ${h.num(dans(jeuneDiplome, 'naturalisation'))} years`],
  [`No master's, ${h.eur(42000)}`, 'Employee card', `Resident card in ${h.num(dans(sansMaster, 'resident'))} years`],
  ['Married to a French national for a year', 'Private and family life', `Resident in ${h.num(dans(conjoint, 'resident'))} years, citizenship in ${h.num(dans(conjoint, 'mariage'))}`],
  ['Joining a spouse in France for a year', 'Family reunification', famille.principal.pourquoi === 'regroupement_attente' ? 'Wait for the sponsor’s 18 months' : 'Application possible'],
], 'Decision-tree results for five profiles', ['l', 'l', 'l'])}
<h2>Work: three thresholds, three permits</h2>
<p>Salary decides. From ${h.eur(TL.cbe)} gross a year, with three years of higher education or five years of experience and a contract of at least ${h.num(TL.cbe_contrat_min_mois)} months, the EU Blue Card. From ${h.eur(TL.salaire_ref)}, with a master's earned in France, the talent card for skilled employees. Both appear on ${h.src('sp_F16922', 'the official talent card page')}. Below them, the employee card on ${h.src('sp_F15898', 'the employee permit page')} requires a work authorisation obtained by the employer.</p>
<h2>Family, study, own means</h2>
<p>The spouse and the parent of a French child come under the private and family life card (vie privée et familiale). The spouse of a foreign resident goes through family reunification. A student must show ${h.eur(P.etudiant.ressources_mensuelles, 2)} a month (${h.src('sp_F2231', 'student page')}), a visitor the net minimum wage, ${h.eur(P.visiteur.ressources_mensuelles_net, 2)} a month (${h.src('sp_F302', 'visitor page')}). For someone in France without a permit, only exceptional admission remains possible, case by case. The cost of each route is broken down in ${h.a('cout-titre-de-sejour', 'the cost calculator')}.</p>
`,
  },
});
