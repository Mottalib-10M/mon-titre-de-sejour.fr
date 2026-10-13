import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { addMonths } from '../../lib/engine/dates';
import { naturalisation } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

// Fiches F15401 (réfugié, 1er juillet 2026), F2689 (protection subsidiaire, 1er juillet 2026), F35158 (réunification familiale, 22 avril 2026).
const T = P.tarifs;
const carte = coutTitre('refugie', 'premiere').total; // gratuite
const membre = coutTitre('famille_refugie', 'premiere').total; // droit de timbre seul
const famille3 = membre * 3;
const famille5 = membre * 5;
const PS_ANS = P.resident.ps_apatride_ans;
// Exemple : statut reconnu par l'OFPRA le 15 mars 2026 ; protégé subsidiaire dont la carte débute le 1er avril 2026.
const OFPRA = '2026-03-15';
const delivrance = addMonths(OFPRA, 3); // la préfecture a 3 mois pour délivrer la carte de résident (F15401)
const psDebut = '2026-04-01';
const psResident = addMonths(psDebut, 12 * PS_ANS);
const natRefugie = naturalisation({ debut: OFPRA, cas: 'dispense' });
const LF_L424 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771756/';
const LF_L561 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042772546/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'titre-de-sejour-refugie',
  group: 'titres',
  order: 87,
  mini: 'refugie',
  miniHref: 'procedure-regroupement-familial',
  related: ['carte-de-resident', 'procedure-regroupement-familial', 'naturalisation-francaise', 'carte-de-sejour', 'titre-de-sejour'],
  sources: ['sp_F15401', 'sp_F2689', 'sp_F35158'],
  fr: {
    slug: 'titre-de-sejour-refugie',
    nav: 'Titre de séjour du réfugié',
    card: 'Carte de résident gratuite, carte de 4 ans du protégé subsidiaire, réunification familiale et timbres de la famille.',
    title: 'Titre de séjour réfugié 2026 : carte gratuite et famille',
    description: 'Titre de séjour du réfugié 2026 : carte de résident de 10 ans gratuite, carte du protégé subsidiaire, réunification familiale et droit de timbre de la famille.',
    h1: 'Titre de séjour du réfugié et du protégé subsidiaire',
    intro: 'Dès la décision de l’OFPRA ou de la CNDA, le réfugié demande une carte de résident gratuite ; sa famille suit par la réunification familiale.',
    resume: `Le réfugié reconnu par l’OFPRA ou la Cour nationale du droit d’asile reçoit une carte de résident valable 10 ans, qui l’autorise à travailler sans autorisation de travail. Sa délivrance est gratuite : ${eF(carte)}. Il la demande en ligne sur l’ANEF dès réception de la décision, et la préfecture dispose de trois mois à partir de cette décision pour la délivrer : pour un statut accordé le ${dF(OFPRA)}, la carte est due au plus tard le ${dF(delivrance)}. Le bénéficiaire de la protection subsidiaire reçoit, lui, une carte de séjour pluriannuelle de ${PS_ANS} ans au plus, également gratuite, puis peut demander la carte de résident après ${PS_ANS} ans. Chaque membre de la famille paie le droit de timbre de ${eF(membre)} à sa première carte, soit ${eF(famille3)} pour un conjoint et deux enfants majeurs. La famille dont les liens sont antérieurs à la demande d’asile vient par la réunification familiale, sans condition de ressources ni de logement. Aucune durée de résidence n’est exigée du réfugié pour demander la naturalisation.`,
    faqs: [
      { q: 'Combien de temps la préfecture a-t-elle pour délivrer la carte du réfugié ?', a: `La fiche officielle fixe un délai de trois mois à compter de la décision qui accorde le statut de réfugié. Pour une décision du ${dF(OFPRA)}, la carte de résident doit être délivrée au plus tard le ${dF(delivrance)}. Lors du dépôt en ligne sur l’ANEF, une attestation dématérialisée de dépôt est remise immédiatement et sert de preuve en attendant.` },
      { q: 'Quelle différence de titre entre réfugié et protection subsidiaire ?', a: `Le réfugié reçoit d’emblée une carte de résident de 10 ans. Le bénéficiaire de la protection subsidiaire reçoit une carte de séjour pluriannuelle de ${PS_ANS} ans au plus, puis peut demander la carte de résident après ${PS_ANS} ans de résidence régulière avec cette carte, dans les deux mois qui précèdent sa fin. Les deux cartes sont gratuites pour le bénéficiaire et permettent de travailler sans autorisation.` },
      { q: 'Quels membres de la famille obtiennent aussi une carte ?', a: 'Le conjoint, partenaire ou concubin déjà admis au titre de la réunification familiale, le conjoint marié après la demande d’asile si le mariage date d’au moins un an avec une vie commune effective, les enfants dans l’année de leurs 18 ans ou dès 16 ans s’ils veulent travailler, et les parents d’un réfugié encore mineur et non marié.' },
      { q: 'Réunification familiale ou regroupement familial : lequel s’applique ?', a: 'La réunification familiale vaut pour la famille dont les liens existaient avant la demande d’asile et qui a été déclarée à l’OFPRA. Si vous vous êtes marié ou si un enfant est né après la demande de protection, c’est le regroupement familial, avec ses conditions de ressources et de logement, qui s’applique. La réunification peut être engagée dès l’obtention de la protection.' },
      { q: 'Que faire si le consulat refuse le visa de réunification familiale ?', a: 'Un recours préalable devant la Commission de recours contre les décisions de refus de visa (CRRV) est obligatoire, par courrier, dans les 30 jours qui suivent le refus écrit ou le refus implicite né de deux mois sans réponse du consulat. Si la commission rejette le recours, un recours en annulation peut être formé dans les deux mois devant le tribunal administratif de Nantes.' },
      { q: 'Un réfugié doit-il attendre cinq ans pour être naturalisé ?', a: `Non. La fiche sur la naturalisation par décret dispense le réfugié de toute durée minimale de résidence : un réfugié reconnu le ${dF(OFPRA)} peut déposer sa demande dès le ${dF(natRefugie.eligible)}. Les autres conditions restent exigées, dont le niveau ${P.naturalisation.langue} en français, l’examen civique et le timbre de ${eF(T.nationalite)}.` },
    ],
    body: (h) => `
<h2>La carte du réfugié : gratuite et valable 10 ans</h2>
<p>Le statut de réfugié, accordé par l’Office français de protection des réfugiés et apatrides (OFPRA) ou par la Cour nationale du droit d’asile (CNDA), ouvre droit à une carte de résident. Elle autorise à séjourner et à travailler en France, et l’employeur n’a aucune autorisation de travail à demander. Sa délivrance ne coûte rien au bénéficiaire, alors qu’une carte de résident ordinaire revient à ${h.eur(coutTitre('resident', 'premiere').total)} en timbres fiscaux. Le dossier comprend l’attestation d’état civil transmise par l’OFPRA à la préfecture, un justificatif de domicile de moins de six mois ou une déclaration de domiciliation, la décision de l’OFPRA ou de la CNDA et l’engagement signé à respecter les principes de la République. Le régime figure aux ${h.ext(LF_L424, 'articles L424-1 à L424-21 du CESEDA')}.</p>
<p>La demande se fait en ligne sur l’ANEF dès la réception du courrier de reconnaissance. Le dépôt donne immédiatement une attestation dématérialisée. La préfecture a trois mois, à compter de la décision accordant le statut, pour remettre la carte. La carte est remise par la préfecture ou la sous-préfecture du département de résidence, après un message par courriel ou SMS.</p>
<h2>Le protégé subsidiaire : une carte de ${h.num(PS_ANS)} ans, puis la carte de résident</h2>
<p>La protection subsidiaire est accordée à l’étranger qui ne remplit pas les conditions du statut de réfugié mais court un risque d’atteintes graves. Elle donne une carte de séjour pluriannuelle d’une durée maximale de ${h.num(PS_ANS)} ans, gratuite elle aussi, qui permet de travailler comme salarié ou non salarié. Après ${h.num(PS_ANS)} ans de séjour avec cette carte, le bénéficiaire et sa famille peuvent demander la carte de résident, dans les deux mois avant la fin de la carte. Exemple : une carte de protégé subsidiaire débutant le ${h.date(psDebut)} ouvre la carte de résident à partir du ${h.date(psResident)}. ${h.a('carte-de-resident', 'Le simulateur de carte de résident')} applique ce motif.</p>
${h.table(['Statut', 'Titre délivré', 'Durée', 'Coût pour le bénéficiaire', 'Coût par membre de la famille'], [
  ['Réfugié', 'Carte de résident', '10 ans', h.eur(carte), h.eur(membre)],
  ['Protection subsidiaire', 'Carte pluriannuelle', `${h.num(PS_ANS)} ans au plus`, h.eur(carte), h.eur(membre)],
], 'Titres de la protection internationale (fiches F15401 et F2689)', ['l', 'l', 'l', 'r', 'r'])}
<h2>La famille déjà en France ou mariée après la demande</h2>
<p>La préfecture délivre aussi une carte aux proches suivants : le conjoint, concubin ou partenaire d’union civile déjà autorisé à séjourner au titre de la réunification familiale ; le conjoint ou partenaire d’au moins 18 ans dont le mariage ou l’union est postérieur à la demande d’asile, s’il date d’au moins un an avec une communauté de vie effective ; les enfants dans l’année qui suit leurs 18 ans, ou entre 16 et 18 ans s’ils déclarent vouloir travailler ; les parents d’un réfugié encore mineur et non marié. Le membre de famille entré par réunification fournit le certificat médical de l’OFII, au plus tard à la remise du titre ; celui qui n’est pas entré par cette voie justifie d’un an de vie commune.</p>
<p>Chaque personne paie le droit de timbre de ${h.eur(membre)} à la première délivrance : ${h.eur(famille3)} pour trois personnes, ${h.eur(famille5)} pour cinq. Le mini-simulateur en haut de page fait le compte. Le membre de famille d’un réfugié reçoit une carte de résident de 10 ans ; celui d’un protégé subsidiaire, une carte de ${h.num(PS_ANS)} ans portant la mention « membre de la famille d’un bénéficiaire de la protection subsidiaire ».</p>
<h2>La réunification familiale, étape par étape</h2>
<p>La réunification familiale permet de faire venir la famille restée à l’étranger, sans les conditions de ressources et de logement du regroupement familial. Elle suppose que les liens familiaux soient antérieurs à la demande d’asile et que les membres aient été déclarés à l’OFPRA. Sont concernés le conjoint ou partenaire d’au moins 18 ans marié ou lié avant la demande, le concubin avec lequel existait une vie commune stable avant la demande, et les enfants non mariés de 19 ans au plus, l’âge étant apprécié à la date de la demande de réunification. Les règles figurent aux ${h.ext(LF_L561, 'articles L561-2 à L561-5 du CESEDA')}.</p>
<ol>
<li>Les membres de la famille demandent un visa de long séjour au consulat de France du pays où ils vivent, avec les actes d’état civil prouvant les liens, ou à défaut les documents établis par l’OFPRA.</li>
<li>En cas d’accord, une vignette visa est apposée sur leur document de voyage.</li>
<li>Arrivés en France, ils demandent leur titre de séjour sur l’ANEF au plus tôt ${h.num(P.renouvellement.au_plus_tot_mois)} mois et au plus tard ${h.num(P.renouvellement.au_plus_tard_mois)} mois avant la fin du visa.</li>
</ol>
<p>Un refus de visa se conteste d’abord devant la Commission de recours contre les décisions de refus de visa, par courrier, dans les 30 jours. Les mariages ou naissances postérieurs à la demande d’asile relèvent du ${h.a('procedure-regroupement-familial', 'regroupement familial')}. Le détail est sur ${h.src('sp_F35158', 'la fiche Réunification familiale')}.</p>
<h2>Voyager, s’intégrer, devenir français</h2>
<p>Le réfugié ne peut pas utiliser le passeport de son pays. Pour voyager, il demande sur l’ANEF un titre de voyage pour réfugié, biométrique et valable 5 ans, qui indique le ou les pays interdits, en général le pays d’origine ; ce document est payant et son timbre s’achète comme celui d’un titre de séjour. Après la carte et la signature du contrat d’intégration républicaine, l’OFII peut accompagner la recherche d’emploi et de logement. Enfin, aucune durée de résidence n’est exigée du réfugié pour la naturalisation : le ${h.a('naturalisation-francaise', 'simulateur de naturalisation')} le prend en compte. ${h.src('sp_F15401', 'La fiche Réfugié')} et ${h.src('sp_F2689', 'la fiche Protection subsidiaire')} restent la référence. Information générale, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'refugee-residence-permit',
    nav: 'Refugee residence permit',
    card: 'Free resident card, four-year card for subsidiary protection, family reunion and the family’s stamp duty.',
    title: 'Refugee Residence Permit 2026: Free Card and Family Reunion',
    description: 'Refugee residence permit France 2026: free 10-year resident card, the subsidiary-protection card, family reunion visas and the stamp duty for relatives.',
    h1: 'Residence permits for refugees and subsidiary-protection holders',
    intro: 'As soon as OFPRA or the asylum court grants status, a refugee applies for a free resident card; the family follows through family reunion.',
    resume: `A refugee recognised by OFPRA (the French office for refugees and stateless persons) or by the CNDA (the national asylum court) receives a resident card (carte de résident) valid for 10 years, which allows work without any work authorisation. It is free: ${eE(carte)}. You apply online on ANEF, the government portal, as soon as the decision arrives, and the prefecture has three months from that decision to issue the card: for status granted on ${dE(OFPRA)}, the card is due by ${dE(delivrance)} at the latest. A subsidiary-protection holder receives a multi-year card for up to ${PS_ANS} years, also free, and can then apply for the resident card after ${PS_ANS} years. Each family member pays the ${eE(membre)} stamp duty on their first card, ${eE(famille3)} for a spouse and two adult children. Relatives whose family ties predate the asylum claim come through family reunion (réunification familiale), with no income or housing condition. Refugees need no minimum period of residence to apply for naturalisation.`,
    faqs: [
      { q: 'How long does the prefecture have to issue a refugee’s card?', a: `The official page sets three months from the decision granting refugee status. For a decision dated ${dE(OFPRA)}, the resident card must be issued by ${dE(delivrance)} at the latest. When you file online on ANEF, you immediately receive an electronic filing certificate (attestation de dépôt), which serves as proof while you wait.` },
      { q: 'How do the cards for refugees and subsidiary protection differ?', a: `A refugee receives a 10-year resident card straight away. A subsidiary-protection holder receives a multi-year card for up to ${PS_ANS} years and can apply for the resident card after ${PS_ANS} years of lawful residence with it, within the two months before it expires. Both cards are free for the holder and allow work without authorisation.` },
      { q: 'Which relatives already in France also get a card?', a: 'A spouse, partner or cohabitant already admitted through family reunion; a spouse married after the asylum claim if the marriage is at least a year old and the couple lives together; children in the year after they turn 18, or from 16 if they want to work; and the parents of a refugee who is still a minor and unmarried.' },
      { q: 'Family reunion or family reunification: which one applies to me?', a: 'Family reunion (réunification familiale) covers relatives whose ties existed before the asylum claim and who were declared to OFPRA. If you married or had a child after applying for protection, the ordinary family reunification procedure (regroupement familial) applies, with its income and housing conditions. Family reunion can start as soon as protection is granted.' },
      { q: 'What can I do if the consulate refuses the family-reunion visa?', a: 'An appeal to the Commission de recours contre les décisions de refus de visa (CRRV), the visa refusal appeals board, is compulsory first. It is sent by post within 30 days of the written refusal or of the implicit refusal after two months without an answer. If the board rejects it, you can ask the administrative court in Nantes to annul the refusal within two months.' },
      { q: 'Do refugees have to wait five years before naturalisation?', a: `No. The official naturalisation page exempts refugees from any minimum residence period: a refugee recognised on ${dE(OFPRA)} can apply from ${dE(natRefugie.eligible)}. The other conditions still apply, including ${P.naturalisation.langue}-level French, the civic exam and the ${eE(T.nationalite)} stamp.` },
    ],
    body: (h) => `
<h2>The refugee’s card: free and valid for 10 years</h2>
<p>Refugee status, granted by OFPRA or by the CNDA, gives the right to a resident card. It allows you to live and work in France, and an employer does not need to apply for any work authorisation. It costs the holder nothing, whereas an ordinary resident card costs ${h.eur(coutTitre('resident', 'premiere').total)} in tax stamps (timbres fiscaux). The file includes the civil-status certificate that OFPRA sends to the prefecture, proof of address under six months old or a domiciliation certificate, the OFPRA or CNDA decision and the signed commitment to respect the principles of the Republic. The rules are in ${h.ext(LF_L424, 'sections L424-1 to L424-21 of the CESEDA')}, the French immigration code.</p>
<p>The application is made online on ANEF as soon as the recognition letter arrives, and filing immediately produces an electronic certificate. The prefecture has three months from the decision granting status to hand over the card. It is collected from the prefecture or sub-prefecture of the département where you live, once you receive an email or text message.</p>
<h2>Subsidiary protection: a card for up to ${h.num(PS_ANS)} years, then the resident card</h2>
<p>Subsidiary protection (protection subsidiaire) is granted to people who do not meet the refugee definition but face a real risk of serious harm. It gives a multi-year card for up to ${h.num(PS_ANS)} years, also free, allowing salaried or self-employed work. After ${h.num(PS_ANS)} years with this card, the holder and their family can apply for the resident card within the two months before it expires. Example: a subsidiary-protection card starting on ${h.date(psDebut)} opens the resident card from ${h.date(psResident)}. ${h.a('carte-de-resident', 'The resident card calculator')} applies this ground.</p>
${h.table(['Status', 'Card issued', 'Length', 'Cost for the holder', 'Cost per family member'], [
  ['Refugee', 'Resident card', '10 years', h.eur(carte), h.eur(membre)],
  ['Subsidiary protection', 'Multi-year card', `up to ${h.num(PS_ANS)} years`, h.eur(carte), h.eur(membre)],
], 'Permits under international protection (pages F15401 and F2689)', ['l', 'l', 'l', 'r', 'r'])}
<h2>Relatives already in France, or married after the claim</h2>
<p>The prefecture also issues a card to these relatives: a spouse, cohabitant or civil partner already allowed to stay through family reunion; a spouse or partner aged at least 18 whose marriage or partnership came after the asylum claim, if it is at least a year old and the couple really lives together; children in the year after their 18th birthday, or from 16 to 18 if they want to work; and the parents of a refugee who is still a minor and unmarried. A relative who came through family reunion provides the OFII medical certificate by the time the card is handed over; one who did not must show a year of shared life.</p>
<p>Each person pays the ${h.eur(membre)} stamp duty on the first card: ${h.eur(famille3)} for three people, ${h.eur(famille5)} for five. The mini-calculator at the top of the page does the sum. A refugee’s relative receives a 10-year resident card; a subsidiary-protection holder’s relative receives a card of up to ${h.num(PS_ANS)} years marked "family member of a subsidiary-protection beneficiary".</p>
<h2>Family reunion, step by step</h2>
<p>Family reunion lets you bring over family members who stayed abroad, without the income and housing conditions of ordinary family reunification. The family ties must predate the asylum claim, and the relatives must have been declared to OFPRA. It covers a spouse or partner aged at least 18 married or partnered before the claim, a cohabitant with whom you had a stable shared life before the claim, and unmarried children aged 19 or under, age being assessed on the date of the reunion request. The rules are in ${h.ext(LF_L561, 'sections L561-2 to L561-5 of the CESEDA')}.</p>
<ol>
<li>The relatives apply for a long-stay visa at the French consulate in the country where they live, with civil-status records proving the ties, or failing that documents drawn up by OFPRA.</li>
<li>If approved, a visa sticker is placed in their travel document.</li>
<li>Once in France, they apply for their residence permit on ANEF between ${h.num(P.renouvellement.au_plus_tot_mois)} and ${h.num(P.renouvellement.au_plus_tard_mois)} months before the visa ends.</li>
</ol>
<p>A visa refusal is first challenged before the visa appeals board (CRRV), by post, within 30 days. Marriages and births after the asylum claim fall under ${h.a('procedure-regroupement-familial', 'ordinary family reunification')}. The details are on ${h.src('sp_F35158', 'the official family-reunion page')}.</p>
<h2>Travelling, settling in, becoming French</h2>
<p>A refugee cannot use their own country’s passport. To travel, they apply on ANEF for a refugee travel document (titre de voyage pour réfugié), biometric and valid for 5 years, which lists the country or countries you may not visit, usually your country of origin; it carries a fee, paid with a tax stamp bought the same way as for a permit. Once you have your card and have signed the republican integration contract (CIR), OFII can help you look for work and housing. Finally, refugees need no minimum residence period for naturalisation, and ${h.a('naturalisation-francaise', 'the naturalisation calculator')} takes this into account. ${h.src('sp_F15401', 'The official refugee page')} and ${h.src('sp_F2689', 'the subsidiary-protection page')} remain the reference. General information, not legal advice.</p>
`,
  },
});
