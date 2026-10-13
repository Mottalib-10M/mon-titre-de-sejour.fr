import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { surfaceMin } from '../../lib/engine/famille';
import { formatNumber } from '../../lib/format';

const RF = P.regroupement;
const S = RF.surface;
const TAILLES = [2, 3, 4, 5, 6, 7, 8, 9, 10];
// Exemples : famille de 5 personnes dans un 3 pièces de 55 m² à Lyon (zone A) ; famille de 7 en zone C.
const a5 = surfaceMin('A', 5), c7 = surfaceMin('C', 7), b3 = surfaceMin('B', 3), a10 = surfaceMin('A', 10);
const nF = (x: number) => formatNumber(x, 0, 'fr'), nE = (x: number) => formatNumber(x, 0, 'en');
const L434 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771996/';
const ZONAGE = 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000029337646/';
const DECENT = 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000217471/';

export default defineGuide({
  id: 'logement-regroupement-familial',
  group: 'famille',
  order: 20,
  tool: 'logement',
  related: ['regroupement-familial', 'procedure-regroupement-familial', 'vie-privee-et-familiale', 'carte-de-resident'],
  sources: ['sp_F11166', 'ceseda_r434'],
  fr: {
    slug: 'logement-regroupement-familial',
    nav: 'Regroupement familial : logement',
    card: 'Surface habitable minimale selon la zone A, B ou C et le nombre de personnes du foyer.',
    title: 'Logement regroupement familial 2026 : surface minimale',
    description: 'Logement et regroupement familial 2026 : surface habitable minimale selon la zone A bis, A, B1, B2 ou C et la taille du foyer, salubrité et visite du maire.',
    h1: 'Logement du regroupement familial : la surface minimale exigée',
    intro: 'Choisissez la zone de votre commune et le nombre de personnes : le simulateur donne la surface habitable à atteindre et l’écart avec votre logement.',
    resume: `Le logement qui accueillera la famille doit être « normal » pour une famille comparable de la même région, salubre et équipé, et atteindre une surface habitable minimale qui dépend de la zone de la commune. Pour un couple ou deux personnes, il faut ${nF(S.base.A)} m² en zones A bis et A, ${nF(S.base.B)} m² en zones B1 et B2 et ${nF(S.base.C)} m² en zone C. On ajoute ${nF(S.par_personne)} m² par personne supplémentaire jusqu’à huit personnes, puis ${nF(S.au_dela_8)} m² par personne au-delà. Une famille de cinq personnes dans une commune de zone A doit donc disposer d’au moins ${nF(a5)} m², une famille de sept personnes en zone C de ${nF(c7)} m², un parent seul avec deux enfants en zone B de ${nF(b3)} m². Le maire vérifie ces conditions, et des agents habilités peuvent visiter le logement. Si vous n’y habitez pas encore, une attestation de mise à disposition (cerfa n° 11437) décrit le logement prévu.`,
    faqs: [
      { q: 'Comment savoir si ma commune est en zone A, B ou C ?', a: 'Le zonage dit A/B/C vient d’un arrêté du 1er août 2014 qui classe chaque commune selon la tension du marché du logement. La fiche officielle du regroupement familial renvoie à un simulateur public qui donne la zone d’une commune. Les grandes métropoles et leurs abords sont en A ou A bis, les villes moyennes souvent en B, le reste du territoire en C.' },
      { q: 'La surface minimale tient-elle compte des enfants déjà en France ?', a: 'Oui. On compte toutes les personnes qui vivront dans le logement après l’arrivée de la famille : vous, votre conjoint, les enfants qui arrivent et ceux qui vivent déjà avec vous. Un enfant présent en France augmente donc la surface exigée de la même façon qu’un enfant qui rejoint le foyer.' },
      { q: 'Peut-on demander le regroupement avant d’avoir le logement ?', a: 'Oui. Vous pouvez joindre une promesse de location, un justificatif d’acquisition future ou l’attestation de mise à disposition d’un logement (cerfa n° 11437), remplie avec le propriétaire ou le vendeur : date de disponibilité, superficie, caractéristiques. Le maire vérifie alors les conditions sur la base de ce document.' },
      { q: 'Que vérifie le maire lors de la visite du logement ?', a: 'Que le logement répond aux conditions minimales de confort et d’habitabilité : surface, salubrité, équipements. Des agents spécialement habilités peuvent se rendre sur place. Le maire donne un avis motivé sur le logement et les ressources dans les deux mois ; sans réponse dans ce délai, son avis est réputé favorable.' },
    ],
    body: (h) => `
<h2>La règle des surfaces</h2>
<p>${h.src('sp_F11166', 'La fiche officielle du regroupement familial')} fixe la surface habitable totale en fonction de la zone géographique, qui reprend le zonage de l’${h.ext(ZONAGE, 'arrêté du 1er août 2014')}. La base vaut pour deux personnes ; chaque personne de plus ajoute ${h.num(S.par_personne)} m² jusqu’à huit, puis ${h.num(S.au_dela_8)} m². Le simulateur applique ce barème au foyer que vous indiquez et compare avec la surface de votre logement. Le texte de fond est au ${h.ext(L434, 'CESEDA, articles L434-1 à L434-12')} et aux ${h.src('ceseda_r434', 'articles R434-1 et suivants')}.</p>
${h.table(['Personnes', 'Zones A bis et A', 'Zones B1 et B2', 'Zone C'], TAILLES.map((n) => [String(n), `${h.num(surfaceMin('A', n))} m²`, `${h.num(surfaceMin('B', n))} m²`, `${h.num(surfaceMin('C', n))} m²`]), 'Surface habitable minimale du logement', ['l', 'r', 'r', 'r'])}
<p>Au-delà de huit personnes, la progression ralentit : une famille de dix personnes en zone A doit disposer de ${h.num(a10)} m². La surface est la surface habitable, celle qui figure sur le bail ou l’acte de vente, et non la surface au sol des pièces annexes.</p>
<h2>Salubrité et preuves</h2>
<p>Le logement doit aussi être décent au sens du ${h.ext(DECENT, 'décret du 30 janvier 2002 sur le logement décent')}. Le dossier comporte, selon votre situation, le bail et la dernière quittance, l’acte de propriété, ou une attestation d’hébergement de la personne qui vous loge avec la durée accordée. Un justificatif de domicile de moins de trois mois est demandé dans tous les cas. Les ressources sont examinées en même temps : voir ${h.a('regroupement-familial', 'le simulateur des ressources')}.</p>
`,
  },
  en: {
    slug: 'family-reunification-housing',
    nav: 'Family reunification: housing',
    card: 'Minimum living area by zone A, B or C and the number of people in the household.',
    title: 'Family Reunification Housing 2026: Minimum Floor Area',
    description: 'Family reunification housing in France 2026: minimum living area by zone A bis, A, B1, B2 or C and household size, fitness for living and the mayor’s visit.',
    h1: 'Family-reunification housing: the minimum floor area',
    intro: 'Choose your town’s zone and the number of people: the calculator gives the living area required and the gap with your home.',
    resume: `The home that will house your family must be "normal" for a comparable family in the same region, fit to live in and equipped, and reach a minimum living area that depends on the town’s zone. For a couple or two people, the requirement is ${nE(S.base.A)} m² in zones A bis and A, ${nE(S.base.B)} m² in zones B1 and B2 and ${nE(S.base.C)} m² in zone C. Add ${nE(S.par_personne)} m² for each extra person up to eight people, then ${nE(S.au_dela_8)} m² for each person beyond. A family of five in a zone A town therefore needs at least ${nE(a5)} m², a family of seven in zone C ${nE(c7)} m², a single parent with two children in zone B ${nE(b3)} m². The mayor checks these conditions and authorised officers may visit the home. If you have not moved in yet, a housing-availability certificate (form cerfa no. 11437) describes the planned home.`,
    faqs: [
      { q: 'How do I know whether my town is in zone A, B or C?', a: 'The A/B/C zoning comes from an order of 1 August 2014 that ranks every town by how tight its housing market is. The official family-reunification page links to a public tool that gives a town’s zone. Large cities and their surroundings are in A or A bis, mid-sized towns often in B, the rest of France in C.' },
      { q: 'Does the minimum area include children already in France?', a: 'Yes. Count everyone who will live in the home after the family arrives: you, your spouse, the children who are coming and those already living with you. A child already in France raises the required area exactly as much as a child joining the household.' },
      { q: 'Can I apply before I have the home?', a: 'Yes. You can attach a rental promise, proof of a future purchase or the housing-availability certificate (cerfa no. 11437) completed with the landlord or seller: availability date, floor area and features. The mayor then checks the conditions against that document.' },
      { q: 'What does the mayor check during the home visit?', a: 'That the home meets minimum standards of comfort and habitability: floor area, sanitation, equipment. Specially authorised officers may come to the property. The mayor gives a reasoned opinion on housing and income within two months; if there is no answer by then, the opinion counts as favourable.' },
    ],
    body: (h) => `
<h2>The floor-area rule</h2>
<p>${h.src('sp_F11166', 'The official family-reunification page')} sets the total living area by geographical zone, using the zoning of the ${h.ext(ZONAGE, 'order of 1 August 2014')}. The base figure is for two people; each additional person adds ${h.num(S.par_personne)} m² up to eight, then ${h.num(S.au_dela_8)} m². The calculator applies this scale to the household you enter and compares it with your home’s area. The underlying rules are in ${h.ext(L434, 'CESEDA (immigration code), articles L434-1 to L434-12')} and ${h.src('ceseda_r434', 'articles R434-1 onwards')}.</p>
${h.table(['People', 'Zones A bis and A', 'Zones B1 and B2', 'Zone C'], TAILLES.map((n) => [String(n), `${h.num(surfaceMin('A', n))} m²`, `${h.num(surfaceMin('B', n))} m²`, `${h.num(surfaceMin('C', n))} m²`]), 'Minimum living area of the home', ['l', 'r', 'r', 'r'])}
<p>Beyond eight people the scale slows down: a family of ten in zone A needs ${h.num(a10)} m². The figure is the living area (surface habitable) stated in the lease or deed of sale, not the floor space of outbuildings or annexes.</p>
<h2>Fitness for living and proof</h2>
<p>The home must also be decent within the meaning of the ${h.ext(DECENT, 'decree of 30 January 2002 on decent housing')}. Depending on your situation, the file includes the lease and latest rent receipt, the title deed, or a statement from the person housing you giving the length of stay allowed. Proof of address less than three months old is always required. Income is examined at the same time: see ${h.a('regroupement-familial', 'the income calculator')}.</p>
`,
  },
});
