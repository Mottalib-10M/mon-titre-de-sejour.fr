import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre, coutParcours } from '../../lib/engine/couts';
import { fenetreRenouvellement, refusImplicite } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

const T = P.tarifs, V = P.visiteur;
const premiere = coutTitre('visiteur', 'premiere').total;
const vls = coutTitre('visiteur', 'vls').total;
const renouv = coutTitre('visiteur', 'renouvellement').total;
const retard = coutTitre('visiteur', 'renouvellement', { retard: true }).total;
const cinqAns = coutParcours('visiteur', 5).total;
const retraite = coutTitre('retraite', 'premiere').total;
// Exemple : carte visiteur qui expire le 30 juin 2027.
const fin = '2027-06-30';
const w = fenetreRenouvellement(fin, '2027-01-15');
const silence = refusImplicite(w.limite, { mois: P.titres.find((t) => t.id === 'visiteur')!.implicite_mois })!;
// Trois profils de revenus nets mensuels : sous, au niveau, au-dessus du Smic net.
const profils = [1200, 1500, 2400].map((r) => ({ r, ecart: r - V.ressources_mensuelles_net }));
const LF = {
  l426: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771896/',
  l436: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042772036/',
};
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'carte-de-sejour-visiteur',
  group: 'titres',
  order: 70,
  mini: 'visiteur',
  miniHref: 'cout-titre-de-sejour',
  related: ['carte-de-sejour-retraite', 'cout-titre-de-sejour', 'renouvellement-titre-de-sejour', 'visa-long-sejour', 'carte-de-resident'],
  sources: ['sp_F302', 'sp_F2300', 'sp_A18881'],
  fr: {
    slug: 'carte-de-sejour-visiteur',
    nav: 'Carte de séjour visiteur',
    card: 'Vivre en France sans travailler : ressources au niveau du Smic net, assurance maladie, coût et renouvellement.',
    title: 'Carte de séjour visiteur 2026 : ressources, coût, conditions',
    description: 'Carte de séjour visiteur 2026 : ressources au niveau du Smic net, assurance maladie, interdiction de travailler, timbres de la 1re carte et du renouvellement.',
    h1: 'Carte de séjour visiteur : vivre en France de ses propres ressources',
    intro: 'Rentiers, parents venus près de leurs enfants, religieux : la carte visiteur s’adresse à ceux qui s’installent sans exercer d’activité professionnelle.',
    resume: `La carte de séjour temporaire visiteur permet à un étranger non européen de vivre en France plus de 3 mois sans y travailler. Elle repose sur trois conditions : des ressources suffisantes pour toute la durée du séjour, une assurance maladie qui la couvre, et l’engagement de n’exercer aucune activité, salariée ou indépendante. Le minimum fixé par la fiche officielle pour une personne seule est de ${eF(V.ressources_mensuelles_net, 2)} nets par mois, soit le Smic net, et ${eF(V.ressources_annuelles_net, 2)} sur un an. La carte est valable 1 an, renouvelable ; elle coûte ${eF(premiere)} en timbres fiscaux à la première délivrance, après ${eF(vls)} de validation du visa long séjour, puis ${eF(renouv)} à chaque renouvellement, ou ${eF(retard)} si la demande est déposée hors délai. Sur cinq ans, un visiteur paie ainsi ${eF(cinqAns)} de timbres. Les allocations familiales ne comptent pas dans les ressources ; les cautions de proches solvables et le logement sont pris en compte.`,
    faqs: [
      { q: 'Quelles ressources faut-il prouver pour la carte visiteur ?', a: `Au moins ${eF(V.ressources_mensuelles_net, 2)} nets par mois pour une personne seule, sur une année, soit ${eF(V.ressources_annuelles_net, 2)}. Elles peuvent être les vôtres (pensions, rentes, revenus immobiliers) ou celles d’un membre de la famille solvable qui se porte garant. Les allocations familiales sont exclues. Les attestations bancaires et les titres de pension servent de preuves.` },
      { q: 'Peut-on travailler à distance pour un employeur étranger avec une carte visiteur ?', a: 'La fiche officielle exige de ne pas travailler en France, que ce soit comme salarié, commerçant, auto-entrepreneur, artisan ou profession libérale, et le dossier contient une attestation sur l’honneur manuscrite en ce sens. Elle ne traite pas du télétravail pour un employeur étranger ; posez la question à la préfecture avant de déposer, plutôt que de vous fier à un forum.' },
      { q: 'Un partenaire de Pacs peut-il demander la carte visiteur ?', a: 'Oui. La fiche cite parmi les cas typiques le partenaire de Pacs qui a moins d’un an de vie commune, avec le parent à la charge d’enfants installés régulièrement en France et le religieux venu exercer ses fonctions. Les conditions de ressources, d’assurance maladie et d’absence de travail restent les mêmes.' },
      { q: 'La carte visiteur peut-elle devenir pluriannuelle ?', a: 'Non pour le même motif : la carte temporaire visiteur fait partie des titres qui ne débouchent pas sur une carte pluriannuelle visiteur. Elle se renouvelle d’année en année tant que les conditions sont remplies. Après cinq ans de résidence régulière, la carte de résident de longue durée-UE devient une piste, avec ses propres conditions.' },
      { q: 'Un Algérien peut-il obtenir la carte visiteur ?', a: 'Non. Les ressortissants algériens relèvent de l’accord franco-algérien de 1968 et demandent un certificat de résidence d’un an mention visiteur, aux règles propres. Les citoyens européens, eux, n’ont besoin d’aucune carte et peuvent seulement demander, s’ils le souhaitent, une carte de citoyen de l’Union comme inactifs.' },
    ],
    body: (h) => `
<h2>À qui s’adresse la carte visiteur</h2>
<p>La carte visiteur répond à une situation précise : s’installer en France plus de 3 mois sans y exercer d’activité professionnelle. La fiche officielle cite trois profils types, le parent à la charge de ses enfants installés régulièrement en France, le partenaire de Pacs qui a moins d’un an de vie commune, et le religieux (prêtre, imam) venu exercer ses fonctions. Elle convient aussi au rentier ou au retraité qui vit de pensions ou de revenus du patrimoine. Elle ne concerne pas les citoyens européens, qui n’ont pas besoin de titre, ni les Algériens, qui demandent un certificat de résidence d’un an mention visiteur. Le titre est prévu par ${h.ext(LF.l426, 'l’article L426-20 du CESEDA')}.</p>
<p>Un retraité qui a déjà vécu en France sous carte de résident et perçoit une pension d’un régime de base français a souvent intérêt à regarder la ${h.a('carte-de-sejour-retraite', 'carte retraité')}, valable 10 ans et limitée au droit de timbre de ${h.eur(retraite)}, plutôt que la carte visiteur à renouveler chaque année.</p>
<h2>Le seuil de ressources, chiffre par chiffre</h2>
<p>${h.src('sp_F302', 'La fiche officielle de la carte visiteur')} fixe le minimum pour une personne seule à ${h.eur(V.ressources_mensuelles_net, 2)} nets par mois, sur une année. Ce montant est le Smic net mensuel, que ${h.src('sp_F2300', 'la fiche Smic')} donne pour un temps plein depuis la revalorisation du 1er juin 2026. Le justificatif doit couvrir ${h.eur(V.ressources_annuelles_net, 2)} sur l’année : attestations bancaires, titres de pension, cautions de personnes solvables. Les allocations familiales ne comptent pas, car elles sont versées pour l’entretien des enfants ; le logement dont vous disposez est en revanche pris en compte dans l’appréciation globale.</p>
${h.table(['Revenus nets par mois', 'Écart avec le minimum', 'Lecture'], profils.map((p) => [h.eur(p.r), (p.ecart >= 0 ? '+' : '') + h.eur(p.ecart), p.ecart >= 0 ? 'au-dessus du minimum' : 'en dessous : caution ou épargne à prouver']), `Minimum de ${h.eur(V.ressources_mensuelles_net, 2)} nets par mois pour une personne seule`, ['r', 'r', 'l'])}
<p>La fiche ne donne pas de barème pour un couple ou une famille. Si votre conjoint vient avec vous, préparez la preuve de ressources de chacun et demandez à la préfecture comment elle apprécie le foyer ; le simulateur ne fabrique pas de seuil familial qu’aucun texte publié ne fixe.</p>
<h2>Les autres conditions</h2>
<ul>
<li><strong>Assurance maladie</strong> couvrant toute la durée du séjour, avec une attestation.</li>
<li><strong>Aucune activité professionnelle</strong> en France, salariée ou non, avec une attestation sur l’honneur manuscrite.</li>
<li><strong>Certificat médical de l’OFII</strong> (Office français de l’immigration et de l’intégration), remis au moment de la délivrance.</li>
<li><strong>Engagement</strong> signé à respecter les principes de la République.</li>
</ul>
<p>La préfecture peut refuser la carte en cas d’obligation de quitter le territoire non respectée, de faux documents, de délits graves ou de violences contre des élus ou des agents publics.</p>
<h2>Coût et calendrier</h2>
<p>La carte visiteur est au tarif normal du ${h.src('sp_A18881', 'barème du 1er mai 2026')}, défini par ${h.ext(LF.l436, 'les articles L436-1 et suivants du CESEDA')}. La première année, le visa long séjour se valide en ligne avec une taxe de ${h.eur(vls)} ; la première carte coûte ensuite ${h.eur(premiere)}, dont ${h.eur(T.droit_timbre)} de droit de timbre, puis ${h.eur(renouv)} par renouvellement.</p>
${h.table(['Année', 'Démarche', 'Timbres'], [
  ['1', 'Validation du VLS-TS', h.eur(vls)],
  ['2', 'Première carte visiteur', h.eur(premiere)],
  ['3 à 5', 'Renouvellements annuels', h.eur(renouv * 3)],
  ['Total', '', h.eur(cinqAns)],
], 'Parcours d’un visiteur sur cinq ans, sans retard', ['l', 'l', 'r'])}
<p>Le renouvellement se dépose en ligne au plus tôt 4 mois et au plus tard 2 mois avant la fin de la carte. Pour une carte qui expire le ${h.date(fin)}, la fenêtre court du ${h.date(w.ouverture)} au ${h.date(w.limite)} ; au-delà, le droit de ${h.eur(T.retard_renouvellement)} porte la démarche à ${h.eur(retard)}. Une demande déposée le dernier jour et restée sans réponse vaut refus implicite au bout de 4 mois, le ${h.date(silence)}. Aucun délai moyen de préfecture n’est publié.</p>
<h2>Le dossier, pièce par pièce</h2>
<p>La demande se dépose sur le site de l’administration numérique pour les étrangers en France (ANEF), qui délivre aussitôt une attestation de dépôt. Le dossier réunit le visa long séjour ou le titre en cours de validité, la copie intégrale de l’acte de naissance, le passeport, un justificatif de domicile de moins de 6 mois, une e-photo, les justificatifs de ressources couvrant l’année, l’attestation d’assurance maladie et l’attestation sur l’honneur de ne pas travailler. Si une tierce personne vous prend en charge, ajoutez ses justificatifs de ressources, son attestation de prise en charge et sa pièce d’identité. Une personne mariée, originaire d’un pays qui autorise la polygamie, joint une déclaration sur l’honneur de non-polygamie en France.</p>
<h2>En cas de refus</h2>
<p>Un refus écrit est le plus souvent assorti d’une obligation de quitter le territoire, contestable devant le tribunal administratif dans un délai de 48 heures, 15 jours ou 30 jours selon son type. Un refus implicite, né du silence, laisse 2 mois pour un recours gracieux, hiérarchique ou contentieux ; l’avocat n’est pas obligatoire. Conservez l’attestation de dépôt et chaque message reçu sur le portail : ce sont eux qui prouvent la date de votre demande et le contenu du dossier.</p>
<h2>Après plusieurs années</h2>
<p>La carte visiteur ne se transforme pas en carte pluriannuelle visiteur. Elle se renouvelle tant que les ressources, l’assurance et l’absence d’activité sont prouvées. Après cinq ans de résidence régulière et ininterrompue, ${h.a('carte-de-resident', 'la carte de résident')} de longue durée-UE devient envisageable si vos ressources atteignent le Smic. Ce guide informe ; seule la préfecture décide.</p>
`,
  },
  en: {
    slug: 'visitor-residence-permit',
    nav: 'Visitor residence permit',
    card: 'Living in France without working: income at the net minimum wage, health cover, cost and renewal.',
    title: 'Visitor Residence Permit 2026: Income, Cost and Conditions',
    description: 'Visitor residence permit France 2026: income at the net minimum wage, health cover, no work allowed, tax stamps for the first card and for each renewal.',
    h1: 'Visitor residence permit: living in France on your own means',
    intro: 'People living on savings, parents joining their children, religious ministers: the visitor card is for those who settle without a job.',
    resume: `The temporary "visiteur" residence card lets a non-EU national live in France for more than 3 months without working. It rests on three conditions: enough resources for the whole stay, health insurance covering it, and a commitment not to carry out any paid or self-employed activity. The official minimum for a single person is ${eE(V.ressources_mensuelles_net, 2)} net a month, the net minimum wage (Smic net), or ${eE(V.ressources_annuelles_net, 2)} over a year. The card lasts 1 year and is renewable; it costs ${eE(premiere)} in tax stamps for the first card, after ${eE(vls)} to validate the long-stay visa, then ${eE(renouv)} for each renewal, or ${eE(retard)} if filed late. Over five years a visitor therefore pays ${eE(cinqAns)} in stamps. Family allowances do not count as resources; guarantees from solvent relatives and your housing are taken into account.`,
    faqs: [
      { q: 'What income must I show for the visitor card?', a: `At least ${eE(V.ressources_mensuelles_net, 2)} net a month for a single person over a year, ${eE(V.ressources_annuelles_net, 2)} in total. It can be your own (pensions, annuities, rental income) or that of a solvent relative acting as guarantor. Family allowances are excluded. Bank statements and pension certificates serve as proof.` },
      { q: 'Can I work remotely for a foreign employer on a visitor card?', a: 'The official page requires that you do not work in France, whether as an employee, trader, micro-entrepreneur, craftsperson or liberal professional, and the file includes a handwritten sworn statement saying so. It does not address remote work for a foreign employer; ask the prefecture before applying rather than relying on a forum.' },
      { q: 'Can a PACS partner apply for the visitor card?', a: 'Yes. The official page lists, among typical cases, a partner in a PACS (French civil partnership) who has lived with the other partner for less than a year, along with a parent dependent on children settled in France and a religious minister. The income, health cover and no-work conditions stay the same.' },
      { q: 'Can the visitor card become a multi-year card?', a: 'Not on the same ground: the temporary visitor card is one of the permits that does not lead to a multi-year visitor card. It is renewed year after year while the conditions are met. After five years of lawful residence, the EU long-term resident card becomes an option, with its own conditions.' },
      { q: 'Can an Algerian national get the visitor card?', a: 'No. Algerian nationals fall under the 1968 Franco-Algerian agreement and apply for a one-year "visiteur" residence certificate, with its own rules. EU citizens need no card at all and may only request, if they wish, an EU citizen card as non-working residents.' },
    ],
    body: (h) => `
<h2>Who the visitor card is for</h2>
<p>The visitor card fits one situation: settling in France for more than 3 months without any professional activity. The official page gives three typical profiles: a parent dependent on children lawfully settled in France, a PACS partner with less than a year of shared life, and a religious minister (priest, imam) coming to serve. It also suits people living on pensions or investment income. It does not concern EU citizens, who need no permit, or Algerians, who apply for a one-year visitor residence certificate. The permit is set out in ${h.ext(LF.l426, 'section L426-20 of the CESEDA immigration code')}.</p>
<p>A retiree who has already lived in France on a resident card and draws a pension from a basic French scheme should often look at the ${h.a('carte-de-sejour-retraite', 'retiree card')} instead: it lasts 10 years and costs only the ${h.eur(retraite)} stamp duty, against a visitor card renewed every year.</p>
<h2>The income threshold, figure by figure</h2>
<p>${h.src('sp_F302', 'The official visitor card page')} sets the minimum for a single person at ${h.eur(V.ressources_mensuelles_net, 2)} net a month over a year. That is the net monthly minimum wage, which ${h.src('sp_F2300', 'the official minimum-wage page')} gives for full-time work since the increase of 1 June 2026. Your proof must cover ${h.eur(V.ressources_annuelles_net, 2)} for the year: bank statements, pension certificates, guarantees from solvent people. Family allowances do not count, as they are paid for the children's upkeep; the housing you have is, however, part of the overall assessment.</p>
${h.table(['Net income per month', 'Gap with the minimum', 'What it means'], profils.map((p) => [h.eur(p.r), (p.ecart >= 0 ? '+' : '') + h.eur(p.ecart), p.ecart >= 0 ? 'above the minimum' : 'below: show a guarantee or savings']), `Minimum of ${h.eur(V.ressources_mensuelles_net, 2)} net a month for a single person`, ['r', 'r', 'l'])}
<p>The page gives no scale for a couple or a family. If your spouse comes too, prepare proof of each person's resources and ask the prefecture how it assesses the household; the calculator does not invent a family threshold that no published text sets.</p>
<h2>The other conditions</h2>
<ul>
<li><strong>Health insurance</strong> covering the entire stay, with a certificate.</li>
<li><strong>No professional activity</strong> in France, salaried or not, with a handwritten sworn statement.</li>
<li><strong>OFII medical certificate</strong> (from the French immigration and integration office), handed in when the card is issued.</li>
<li><strong>A signed commitment</strong> to respect the principles of the Republic, the contrat d’engagement listed among the documents for a first visitor card.</li>
</ul>
<p>The prefecture may refuse the card if you ignored an order to leave France, used false documents, committed serious offences or used violence against elected officials or public servants.</p>
<h2>Cost and timetable</h2>
<p>The visitor card is at the standard rate of ${h.src('sp_A18881', 'the 1 May 2026 schedule')}, set by ${h.ext(LF.l436, 'sections L436-1 onwards of the CESEDA')}. In year one, the long-stay visa is validated online with a ${h.eur(vls)} tax; the first card then costs ${h.eur(premiere)}, including ${h.eur(T.droit_timbre)} of stamp duty, followed by ${h.eur(renouv)} per renewal.</p>
${h.table(['Year', 'Step', 'Stamps'], [
  ['1', 'VLS-TS validation', h.eur(vls)],
  ['2', 'First visitor card', h.eur(premiere)],
  ['3 to 5', 'Yearly renewals', h.eur(renouv * 3)],
  ['Total', '', h.eur(cinqAns)],
], 'A visitor’s five-year route, with no late filing', ['l', 'l', 'r'])}
<p>The renewal is filed online no earlier than 4 months and no later than 2 months before the card ends. For a card ending on ${h.date(fin)}, the window runs from ${h.date(w.ouverture)} to ${h.date(w.limite)}; after that, the ${h.eur(T.retard_renouvellement)} late fee brings the renewal to ${h.eur(retard)}. An application filed on the last day and left unanswered counts as refused after 4 months, on ${h.date(silence)}. No average prefecture time is published.</p>
<h2>The file, document by document</h2>
<p>You apply on ANEF, the online portal for foreign nationals in France, which issues a filing certificate at once. The file brings together your long-stay visa or current permit, a full copy of your birth certificate, your passport, proof of address under 6 months old, an e-photo code, proof of resources covering the year, the health insurance certificate and the sworn statement that you will not work. If someone else supports you financially, add their proof of income, their signed statement of support and their identity document. A married applicant from a country that allows polygamy also adds a sworn statement of non-polygamy in France. Documents in another language usually need a certified translation, so budget for it early, since translators can take several weeks at busy times of year.</p>
<h2>If you are refused</h2>
<p>A written refusal usually comes with an order to leave France (OQTF), which can be challenged at the administrative court within 48 hours, 15 days or 30 days depending on its type. An implicit refusal, arising from silence, leaves 2 months for an appeal to the prefect, to the minister or to the court; a lawyer is not compulsory. Keep the filing certificate and every message from the portal: they prove when you applied and what you sent, which is what any appeal will be built on.</p>
<h2>After several years</h2>
<p>The visitor card does not turn into a multi-year visitor card. It is renewed as long as income, health cover and the absence of work are proven. After five years of lawful, uninterrupted residence, ${h.a('carte-de-resident', 'the resident card')} for EU long-term residents becomes possible if your income reaches the minimum wage. This guide is information; only the prefecture decides.</p>
`,
  },
});
