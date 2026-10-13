import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { fenetreRenouvellement, pluriannuelleEligible } from '../../lib/engine/dates-sejour';
import { addMonths } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

// Fiche F2208 : carte de résident après 3 ans de carte VPF « parent d’enfant français » (durée absente
// de params : reprise de la fiche, vérifiée le 1er juillet 2026).
const ANS_RESIDENT_PARENT = P.resident.parent_ans; // fiche F2208
// Parcours type : première carte VPF le 1er juin 2025.
const debut = '2025-06-01';
const finCarte = addMonths(debut, 12);
const w = fenetreRenouvellement(finCarte, '2026-01-15');
const pluri = pluriannuelleEligible(debut);
const resident = addMonths(debut, 12 * ANS_RESIDENT_PARENT);
const c1 = coutTitre('vpf_parent', 'premiere').total;
const cr = coutTitre('vpf_parent', 'renouvellement').total;
const cres = coutTitre('resident', 'premiere').total;
const sansVisa = coutTitre('vpf_parent', 'premiere', { sansVisa: true }).total;
const total3 = c1 + cr + cres;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');
const L423 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771692/';
const L413 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771492/';

export default defineGuide({
  id: 'parent-enfant-francais',
  group: 'famille',
  order: 60,
  mini: 'parent',
  miniHref: 'carte-de-resident',
  related: ['carte-de-resident', 'vie-privee-et-familiale', 'conjoint-de-francais', 'renouvellement-titre-de-sejour', 'carte-de-sejour-pluriannuelle'],
  sources: ['sp_F2209', 'sp_F2208', 'sp_A18881'],
  fr: {
    slug: 'parent-enfant-francais',
    nav: 'Parent d’enfant français',
    card: 'Carte vie privée et familiale du parent, preuves de contribution, carte de résident après 3 ans.',
    title: 'Parent d’enfant français 2026 : carte de séjour et résident',
    description: 'Parent d’enfant français 2026 : carte vie privée et familiale, contribution à l’entretien depuis 2 ans, preuves, timbres, carte de résident après 3 ans.',
    h1: 'Parent d’un enfant français : la carte de séjour et ses étapes',
    intro: 'Le droit au séjour du parent repose sur un fait que la préfecture vérifie pièce par pièce : la contribution réelle à l’entretien et à l’éducation de l’enfant.',
    resume: `Le père ou la mère d’un enfant français mineur qui réside en France peut obtenir une carte de séjour « vie privée et familiale », même s’il est en situation irrégulière, à condition de contribuer effectivement à l’entretien et à l’éducation de l’enfant depuis sa naissance ou depuis au moins deux ans, et de ne pas vivre en polygamie. La carte autorise à travailler sans autorisation de travail. Elle coûte ${eF(c1)} en timbres fiscaux à la première délivrance et ${eF(cr)} au renouvellement ; entré sans visa de long séjour, le parent peut devoir ${eF(sansVisa)} avec le visa de régularisation. Après ${ANS_RESIDENT_PARENT} ans de carte à ce titre, la carte de résident de dix ans devient possible, avec le niveau ${P.resident.langue} en français et l’examen civique : pour une première carte obtenue le ${dF(debut)}, à partir du ${dF(resident)}. Sur ces trois étapes, le parent paie ${eF(total3)} de timbres. Si la filiation française vient d’une reconnaissance, le parent français doit lui aussi prouver sa contribution.`,
    faqs: [
      { q: 'Comment prouver la contribution à l’entretien de l’enfant ?', a: 'Par tous moyens, sur une période qui couvre la naissance ou au moins deux ans : versements d’une pension, achats pour l’enfant (alimentation, vêtements, jouets), frais de loisirs ou d’éducation, attestations d’hébergement ou de suivi scolaire. La préfecture regarde la régularité et la durée des preuves plus que leur montant ; des preuves datées et réparties dans le temps pèsent davantage.' },
      { q: 'Le parent sans titre de séjour peut-il demander cette carte ?', a: 'Oui. La fiche officielle précise que la carte temporaire peut être obtenue même en situation irrégulière, si les conditions liées à l’enfant sont remplies. Le visa de régularisation peut alors s’ajouter au prix de la carte. Une obligation de quitter le territoire non respectée, un usage de faux ou des faits graves restent des motifs de refus.' },
      { q: 'Que change une reconnaissance de paternité par le parent français ?', a: 'Quand la filiation à l’égard du parent français résulte d’une reconnaissance, le demandeur doit aussi prouver que ce parent français contribue effectivement à l’entretien et à l’éducation de l’enfant depuis sa naissance ou depuis deux ans, ou produire une décision du juge l’obligeant à s’acquitter de ses obligations. Cette règle vise les reconnaissances de complaisance.' },
      { q: 'Faut-il que l’enfant vive avec le parent étranger ?', a: 'La fiche exige un enfant français mineur résidant en France et la contribution effective du parent, pas une résidence commune. Un parent séparé qui verse une pension et participe à l’éducation peut remplir la condition. La résidence de l’enfant en France se prouve par un certificat de scolarité ou de crèche, par exemple.' },
      { q: 'Combien coûtent les timbres de la carte de parent ?', a: `Le tarif normal s’applique : ${eF(c1)} pour la première carte et ${eF(cr)} pour chaque renouvellement, puis ${eF(cres)} pour la carte de résident. Le parent entré sans visa de long séjour peut devoir en plus le visa de régularisation de ${eF(P.tarifs.visa_regularisation)}. Un renouvellement déposé après la date limite coûte ${eF(P.tarifs.retard_renouvellement)} de plus, sauf force majeure.` },
      { q: 'Quand l’enfant devient majeur, la carte est-elle perdue ?', a: 'La carte temporaire vise le parent d’un enfant mineur : à la majorité de l’enfant, le renouvellement à ce titre n’est plus possible et il faut un autre motif. D’où l’intérêt de demander à temps la carte de résident, accessible après trois ans de carte au titre de parent d’enfant français et valable dix ans.' },
    ],
    body: (h) => `
<h2>Les conditions de la carte de parent d’enfant français</h2>
<p>${h.src('sp_F2209', 'La fiche Service-Public.fr de la carte vie privée et familiale')} pose trois conditions pour ce motif : être le père ou la mère d’un enfant français mineur qui réside en France ; contribuer de façon effective à son entretien et à son éducation depuis sa naissance, ou depuis au moins deux ans ; ne pas vivre en état de polygamie. Le motif est prévu aux ${h.ext(L423, 'articles L423-1 à L423-23 du CESEDA')}. La carte autorise à séjourner et à travailler : l’employeur n’a pas d’autorisation de travail à demander. Elle peut être délivrée à un parent en situation irrégulière, ce qui la distingue de la plupart des titres.</p>
<p>Le motif est personnel : il ne dépend ni d’un mariage, ni d’une vie commune avec l’autre parent. Il dépend de l’enfant (mineur, français, résidant en France) et de votre rôle auprès de lui. La nationalité française de l’enfant se prouve par son passeport, sa carte d’identité ou un certificat de nationalité de moins de six mois ; sa résidence en France par tout moyen, un certificat de scolarité ou de crèche le plus souvent.</p>
<h2>Les preuves de contribution</h2>
<p>C’est le cœur du dossier. La fiche officielle accepte la preuve « par tous moyens » : virements d’une pension alimentaire, tickets et factures d’achats destinés à l’enfant, frais de cantine, de loisirs ou de soins, attestations de l’école, du médecin, de la crèche ou de proches, photos datées. L’important est la période : depuis la naissance pour un enfant de moins de deux ans, ou depuis au moins deux ans. Un dossier qui réunit des pièces de chaque trimestre convainc mieux qu’une liasse de reçus du dernier mois.</p>
<p>Si la filiation à l’égard du parent français vient d’une reconnaissance, une condition s’ajoute : prouver que le parent français contribue lui aussi à l’entretien et à l’éducation depuis la naissance ou depuis deux ans, ou produire la décision du juge qui l’y oblige. La règle vise les reconnaissances de complaisance ; elle ne concerne pas l’enfant dont la filiation française est établie autrement.</p>
<h2>Le coût, année après année</h2>
${h.table(['Étape', 'Date dans l’exemple', 'Timbres'], [
  ['Première carte vie privée et familiale', h.date(debut), h.eur(c1)],
  ['Renouvellement ou carte pluriannuelle', h.date(pluri), h.eur(cr)],
  ['Carte de résident de dix ans', h.date(resident), h.eur(cres)],
], `Parcours type d’un parent d’enfant français, barème du ${h.date(P.tarifs.en_vigueur)}`, ['l', 'r', 'r'])}
<p>Ces montants suivent ${h.src('sp_A18881', 'la hausse des taxes du 1er mai 2026')}. Ils se paient à la remise de chaque titre. Le parent entré en France sans visa de long séjour peut devoir le visa de régularisation, ${h.eur(P.tarifs.visa_regularisation)} dont ${h.eur(P.tarifs.visa_regularisation_non_remboursable)} non remboursables au dépôt. Le renouvellement d’une carte d’un an qui expire le ${h.date(finCarte)} se dépose entre le ${h.date(w.ouverture)} et le ${h.date(w.limite)} ; au-delà, ${h.eur(P.tarifs.retard_renouvellement)} s’ajoutent.</p>
<h2>La deuxième année : la carte pluriannuelle</h2>
<p>Au renouvellement de la première carte d’un an, la règle est de passer à la carte pluriannuelle vie privée et familiale, valable de deux à quatre ans selon la fiche officielle. Pour une première carte pluriannuelle, il faut avoir suivi avec assiduité les formations du contrat d’intégration républicaine, attester du niveau ${P.pluriannuelle.langue} en français et réussir l’examen civique mention carte de séjour pluriannuelle, sauf après ${h.num(P.pluriannuelle.age_exemption)} ans. Sans ces preuves, la préfecture peut délivrer une nouvelle carte d’un an, mais une carte temporaire ne se renouvelle pas plus de trois fois de suite pour le même motif.</p>
<h2>La carte de résident après trois ans</h2>
<p>${h.src('sp_F2208', 'La fiche de la carte de résident')} prévoit une carte de dix ans pour le parent d’un enfant français qui réside en France et qui détient depuis au moins ${ANS_RESIDENT_PARENT} ans une carte vie privée et familiale à ce titre, en remplissant toujours les conditions de cette carte. La condition d’intégration républicaine s’ajoute : engagement à respecter les principes de la République et respect effectif, niveau ${P.resident.langue} en français et réussite à l’examen civique mention carte de résident pour une première carte, sauf après ${h.num(P.pluriannuelle.age_exemption)} ans (${h.ext(L413, 'CESEDA, article L413-7')}). Le préfet tient compte du contrat d’intégration républicaine et consulte le maire de votre domicile.</p>
<!--mini:langue-->
<h2>En cas de refus ou de silence</h2>
<p>Si vous remplissez les conditions et que le préfet envisage un refus, il doit consulter la commission du titre de séjour, devant laquelle vous pouvez être assisté. Sans réponse de la préfecture dans les quatre mois, la demande est implicitement rejetée ; vous disposez alors de deux mois pour un recours gracieux, hiérarchique ou devant le tribunal administratif. Aucune préfecture ne publie de délai moyen de traitement pour ce titre.</p>
<h2>Le dossier sur l’ANEF</h2>
<p>La demande de première carte et de renouvellement se fait en ligne, au plus tôt ${h.num(P.renouvellement.au_plus_tot_mois)} mois et au plus tard ${h.num(P.renouvellement.au_plus_tard_mois)} mois avant la fin du document de séjour en cours. Pièces habituelles : passeport avec visa et cachet d’entrée (ou déclaration sur l’honneur d’entrée régulière), copie intégrale d’acte de naissance, justificatif de nationalité, e-photo, justificatif de domicile de moins de six mois, engagement signé à respecter les principes de la République, acte de naissance de l’enfant avec filiation, preuves de sa nationalité et de sa résidence, preuves de contribution. Le justificatif de paiement des timbres est remis à la remise de la carte. Information, pas un conseil juridique : en cas de refus, une association d’aide aux étrangers ou un avocat peuvent vous aider à contester.</p>
`,
  },
  en: {
    slug: 'parent-of-french-child',
    nav: 'Parent of a French child',
    card: 'The parent’s private and family life card, proof of support, and the resident card after 3 years.',
    title: 'Parent of a French Child 2026: Residence Card and Resident',
    description: 'Parent of a French child 2026: private and family life card, support for the child for at least 2 years, evidence, tax stamps, resident card after 3 years.',
    h1: 'Parent of a French child: the residence card and its steps',
    intro: 'A parent’s right to stay rests on one fact the prefecture checks document by document: real support for the child’s upkeep and upbringing.',
    resume: `The father or mother of a French minor living in France can obtain a "vie privée et familiale" (private and family life) residence card, even without a current permit, provided they genuinely contribute to the child’s upkeep and upbringing since birth or for at least two years, and do not live in polygamy. The card allows work with no work authorisation. It costs ${eE(c1)} in tax stamps (timbres fiscaux) for the first issue and ${eE(cr)} on renewal; a parent who entered without a long-stay visa may owe ${eE(sansVisa)} including the regularisation fee. After ${ANS_RESIDENT_PARENT} years on a card held on this ground, the ten-year resident card becomes possible, with ${P.resident.langue}-level French and the civic exam: for a first card issued on ${dE(debut)}, from ${dE(resident)}. Across these three steps the parent pays ${eE(total3)} in stamps. If the child’s French parentage comes from a recognition, the French parent must also prove they contribute.`,
    faqs: [
      { q: 'How do I prove I support the child?', a: 'By any means, over a period covering the birth or at least two years: maintenance payments, purchases for the child (food, clothes, toys), leisure or school costs, statements on housing or school follow-up. The prefecture looks at how regular and long-standing the evidence is rather than the amounts; dated proof spread over time carries more weight.' },
      { q: 'Can a parent without a residence permit apply for this card?', a: 'Yes. The official page states that the temporary card can be granted even to someone in an irregular situation, if the conditions concerning the child are met. The regularisation fee may then be added to the card price. An ignored order to leave France, forged documents or serious offences remain grounds for refusal.' },
      { q: 'What changes if the French parent recognised the child?', a: 'When the child’s link to the French parent comes from a recognition of paternity or maternity, the applicant must also prove that the French parent genuinely supports the child since birth or for two years, or produce a court decision ordering them to meet their obligations. The rule targets sham recognitions.' },
      { q: 'Does the child have to live with the foreign parent?', a: 'The page requires a French minor living in France and genuine support from the parent, not a shared home. A separated parent who pays maintenance and takes part in raising the child can meet the condition. The child’s residence in France is shown, for example, by a school or nursery certificate.' },
      { q: 'How much does the parent card cost in stamps?', a: `The standard rate applies: ${eE(c1)} for the first card and ${eE(cr)} for each renewal, then ${eE(cres)} for the resident card. A parent who entered without a long-stay visa may also owe the ${eE(P.tarifs.visa_regularisation)} regularisation fee. A renewal filed after the deadline costs ${eE(P.tarifs.retard_renouvellement)} more, unless there is force majeure.` },
      { q: 'Is the card lost when the child turns 18?', a: 'The temporary card is for the parent of a minor: once the child is an adult, renewal on this ground is no longer possible and another ground is needed. That is why it pays to apply in time for the resident card, available after three years on a parent-of-a-French-child card and valid for ten years.' },
    ],
    body: (h) => `
<h2>The conditions for the parent card</h2>
<p>${h.src('sp_F2209', 'The Service-Public.fr page on the private and family life card')} sets three conditions for this ground: being the father or mother of a French minor who lives in France; genuinely contributing to the child’s upkeep and upbringing since birth, or for at least two years; and not living in polygamy. The ground is set out in ${h.ext(L423, 'articles L423-1 to L423-23 of the CESEDA')} (immigration code). The card lets you live and work in France: your employer needs no work authorisation. It can be issued to a parent with no current permit, which sets it apart from most permits.</p>
<p>The ground is personal: it does not depend on marriage or on living with the other parent. It depends on the child (a minor, French, living in France) and on your role in the child’s life. The child’s French nationality is proved by a passport, identity card or nationality certificate less than six months old; residence in France by any means, most often a school or nursery certificate.</p>
<h2>Evidence of support</h2>
<p>This is the heart of the file. The official page accepts proof "by any means": maintenance transfers, receipts for things bought for the child, canteen, leisure or medical costs, statements from the school, doctor, nursery or relatives, dated photos. What matters is the period: since birth for a child under two, or for at least two years. A file with documents from every quarter is more convincing than a pile of receipts from last month.</p>
<p>If the child’s link to the French parent comes from a recognition, there is an extra condition: you must prove that the French parent also supports and raises the child since birth or for two years, or provide the court decision ordering them to. The rule targets sham recognitions; it does not apply when French parentage is established another way.</p>
<h2>The cost, year by year</h2>
${h.table(['Step', 'Date in the example', 'Stamps'], [
  ['First private and family life card', h.date(debut), h.eur(c1)],
  ['Renewal or multi-year card', h.date(pluri), h.eur(cr)],
  ['Ten-year resident card', h.date(resident), h.eur(cres)],
], `Typical route for the parent of a French child, schedule of ${h.date(P.tarifs.en_vigueur)}`, ['l', 'r', 'r'])}
<p>These amounts follow ${h.src('sp_A18881', 'the fee increase of 1 May 2026')}. They are paid when each permit is handed over. A parent who entered France without a long-stay visa may owe the regularisation fee, ${h.eur(P.tarifs.visa_regularisation)}, ${h.eur(P.tarifs.visa_regularisation_non_remboursable)} of it non-refundable at filing. A one-year card ending on ${h.date(finCarte)} is renewed between ${h.date(w.ouverture)} and ${h.date(w.limite)}; after that, ${h.eur(P.tarifs.retard_renouvellement)} is added.</p>
<h2>Year two: the multi-year card</h2>
<p>When the first one-year card is renewed, the norm is to move to the multi-year private and family life card, valid for two to four years according to the official page. A first multi-year card requires regular attendance at the training sessions of the republican integration contract (contrat d’intégration républicaine), ${P.pluriannuelle.langue}-level French and a pass in the civic exam for multi-year cards, unless you are over ${h.num(P.pluriannuelle.age_exemption)}. Without them, the prefecture may issue another one-year card, but a temporary card cannot be renewed more than three times in a row on the same ground. Keeping your evidence of support up to date each year makes these renewals much easier, since the same condition is checked every time.</p>
<h2>The resident card after three years</h2>
<p>${h.src('sp_F2208', 'The resident-card page')} provides a ten-year card for the parent of a French child living in France who has held a private and family life card on that ground for at least ${ANS_RESIDENT_PARENT} years and still meets its conditions. A republican-integration condition comes on top: commitment to and respect for the principles of the Republic, ${P.resident.langue}-level French and a pass in the civic exam for resident cards for a first card, unless you are over ${h.num(P.pluriannuelle.age_exemption)} (${h.ext(L413, 'CESEDA, article L413-7')}). The prefect takes your republican integration contract into account and consults the mayor of your town.</p>
<!--mini:langue-->
<h2>If you are refused or get no answer</h2>
<p>If you meet the conditions and the prefect plans to refuse, the residence-permit committee (commission du titre de séjour) must be consulted, and you can be assisted before it. If the prefecture does not answer within four months, the application is implicitly refused; you then have two months to ask the prefect to reconsider, appeal to the Interior Minister or go to the administrative court. No prefecture publishes an average processing time for this permit.</p>
<h2>The file on ANEF</h2>
<p>First applications and renewals are made online on ANEF, the residence-permit portal, at the earliest ${h.num(P.renouvellement.au_plus_tot_mois)} months and at the latest ${h.num(P.renouvellement.au_plus_tard_mois)} months before your current document ends. Usual documents: passport with visa and entry stamp (or a sworn statement of lawful entry), full birth certificate, proof of nationality, e-photo, proof of address less than six months old, signed commitment to the principles of the Republic, the child’s birth certificate showing parentage, proof of the child’s nationality and residence, and your evidence of support. Proof that the stamps were paid is handed in when you collect the card. This is information, not legal advice: if you are refused, a migrant-support association or a lawyer can help you challenge the decision.</p>
`,
  },
});
