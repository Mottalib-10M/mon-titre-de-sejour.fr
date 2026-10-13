import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre, coutParcours, titreById } from '../../lib/engine/couts';
import { taxeEmployeur } from '../../lib/engine/travail';
import { fenetreRenouvellement, refusImplicite } from '../../lib/engine/dates-sejour';
import { formatMoney, displayDate } from '../../lib/format';

// Exemple suivi dans la page : technicienne recrutée en CDI à 2 600 € brut par mois, arrivée avec un VLS-TS.
const T = P.tarifs;
const vls = coutTitre('salarie', 'vls').total;
const prem = coutTitre('salarie', 'premiere').total;
const ren = coutTitre('salarie', 'renouvellement').total;
const retard = coutTitre('salarie', 'renouvellement', { retard: true }).total;
const p3 = coutParcours('salarie', 3).total;
const taxe = taxeEmployeur({ type: 'long', salaireMensuel: 2600 });
const taxeCourt = taxeEmployeur({ type: 'court', salaireMensuel: 2600 });
const tt = coutTitre('travailleur_temporaire', 'premiere').total;
const mois = titreById('salarie').implicite_mois!;
const fin = '2027-09-14';
const w = fenetreRenouvellement(fin, '2026-10-13');
const imp = refusImplicite('2027-06-01', { mois })!;
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');
const LF = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771542/';

export default defineGuide({
  id: 'titre-de-sejour-salarie',
  group: 'travail',
  order: 30,
  mini: 'salarie',
  miniHref: 'taxe-employeur-salarie-etranger',
  related: ['autorisation-de-travail', 'taxe-employeur-salarie-etranger', 'carte-de-sejour-pluriannuelle', 'renouvellement-titre-de-sejour', 'passeport-talent'],
  sources: ['sp_F15898', 'sp_F3100', 'sp_A18881', 'sp_F2728'],
  fr: {
    slug: 'titre-de-sejour-salarie',
    nav: 'Titre de séjour salarié',
    card: 'CDI ou CDD, autorisation de travail, VLS-TS, coût sur trois ans et passage à la carte pluriannuelle.',
    title: 'Titre de séjour salarié 2026 : conditions, coût, calendrier',
    description: 'Titre de séjour salarié 2026 : carte salarié en CDI ou travailleur temporaire en CDD, autorisation de travail, VLS-TS, timbres, taxe employeur, renouvellement.',
    h1: 'Titre de séjour salarié : du contrat de travail à la carte de 4 ans',
    intro: 'La carte salarié s’obtient en deux temps : l’employeur obtient l’autorisation de travail, puis vous demandez le visa et la carte.',
    resume: `Un étranger non européen qui vient travailler en France comme salarié reçoit une carte « salarié » s’il est en CDI et une carte « travailleur temporaire » s’il est en CDD. Dans les deux cas, l’employeur doit d’abord obtenir une autorisation de travail, demandée en ligne. Depuis l’étranger, le salarié demande ensuite un visa de long séjour valant titre de séjour (VLS-TS), valide ce visa dans les trois mois de son arrivée en payant ${eF(vls)}, puis dépose sa demande de carte au plus tard deux mois avant la fin du visa. La première carte coûte ${eF(prem)} en timbres fiscaux, le renouvellement ${eF(ren)}, ou ${eF(retard)} s’il est déposé hors délai. Sur trois ans, l’arrivée d’un salarié revient à ${eF(p3)} de timbres pour lui. De son côté, l’employeur paie une taxe : pour une technicienne en CDI à ${eF(2600)} brut par mois, ${eF(taxe, 2)}. Au renouvellement, un salarié toujours en poste qui a le niveau A2 et réussi l’examen civique reçoit une carte pluriannuelle de quatre ans.`,
    faqs: [
      { q: 'Quelle différence entre la carte salarié et la carte travailleur temporaire ?', a: `La carte « salarié » correspond à un CDI et la carte « travailleur temporaire » à un CDD ; les deux sont valables un an la première fois. La seconde se renouvelle pour la durée du CDD restant ou du nouveau CDD, qui peut dépasser un an. Elles coûtent le même prix, ${eF(tt)} en première délivrance, et exigent chacune une autorisation de travail.` },
      { q: 'Peut-on commencer à travailler dès l’arrivée avec un VLS-TS salarié ?', a: `Oui. Le visa de long séjour valant titre de séjour permet de travailler dès l’entrée en France, chez l’employeur qui a obtenu l’autorisation. Il faut en revanche le valider en ligne dans les trois mois et payer la taxe de ${eF(vls)} ; sans validation, le séjour devient irrégulier et vous ne pouvez plus ressortir puis revenir dans l’espace Schengen.` },
      { q: 'Que devient la carte salarié en cas de perte d’emploi ?', a: 'Si vous êtes au chômage et indemnisé par France Travail à l’échéance de la carte, la préfecture délivre une nouvelle carte temporaire salarié d’un an. Il faut alors fournir l’attestation de l’employeur justifiant la rupture et l’avis de situation de France Travail. Si vous n’avez pas retrouvé d’emploi au terme de cette année, la suite dépend de vos droits.' },
      { q: 'Changer d’employeur avec une carte salarié est-il possible ?', a: 'Oui, mais le nouvel employeur doit obtenir sa propre autorisation de travail, car la carte n’autorise que l’emploi pour lequel l’autorisation a été donnée. Au renouvellement, vous fournissez l’autorisation dématérialisée du nouvel employeur et l’attestation du précédent. Passer d’un CDI à un CDD oblige à changer de carte, et inversement.' },
      { q: 'Quand passe-t-on à la carte pluriannuelle de quatre ans ?', a: `Au premier renouvellement, si vous occupez toujours un emploi salarié et remplissez la condition d’intégration : formations du contrat d’intégration républicaine suivies, français au niveau ${P.pluriannuelle.langue} et examen civique réussi pour une première carte pluriannuelle, sauf après 65 ans. La carte pluriannuelle coûte ${eF(ren)} au titre d’un renouvellement.` },
    ],
    body: (h) => `
<h2>Les deux cartes du salarié</h2>
<p>La fiche officielle distingue nettement les deux situations. En CDI, la carte « salarié » ; en CDD, la carte « travailleur temporaire ». Les conditions communes tiennent en trois points : être étranger et vouloir travailler comme salarié, disposer d’une autorisation de travail, et, pour une première admission au séjour, avoir un VLS-TS portant la même mention. La préfecture peut refuser la carte en cas d’obligation de quitter le territoire non respectée, de faux documents, de délits graves ou de violences contre des agents publics. Les règles viennent de ${h.src('sp_F15898', 'la fiche Carte de séjour salarié ou travailleur temporaire')} et des ${h.ext(LF, 'articles L421-1 à L421-4 du CESEDA')}.</p>
<h2>Étape 1 : l’autorisation de travail, côté employeur</h2>
<p>Rien ne commence sans elle. L’employeur la demande sur le téléservice, que le futur salarié soit en France ou à l’étranger. Il doit en principe avoir publié l’offre pendant trois semaines consécutives auprès du service public de l’emploi, sauf métier en tension ou jeune diplômé de master payé au-delà d’une fois et demie le Smic. La rémunération ne peut pas être inférieure au Smic ou au minimum conventionnel. Les critères sont détaillés sur ${h.src('sp_F3100', 'la fiche sur la délivrance des autorisations de travail')} ; ${h.a('autorisation-de-travail', 'notre page Autorisation de travail')} les reprend un par un.</p>
<h2>Étape 2 : visa, validation, carte</h2>
<p>Une fois l’autorisation accordée, l’administration prévient l’employeur, qui prévient le salarié. Celui-ci demande un VLS-TS au consulat. À l’arrivée, il peut travailler tout de suite, mais doit valider son visa en ligne dans les trois mois et payer ${h.eur(vls)}. La demande de carte se dépose ensuite à la préfecture du domicile au plus tard deux mois avant la fin du VLS-TS. Un salarié déjà en France avec un autre titre change de statut : l’employeur demande l’autorisation de travail, puis le salarié dépose sa demande de carte avant la fin de son titre actuel.</p>
<h2>Combien coûte la carte, et à qui</h2>
<p>Le salarié paie ses timbres fiscaux, l’employeur paie la taxe. Les deux montants s’additionnent pour le coût complet d’une embauche, ce que le mini-simulateur en tête de page fait pour vous.</p>
${h.table(['Étape', 'Payé par', 'Montant'], [
  ['Validation du VLS-TS (année 1)', 'salarié', h.eur(vls)],
  ['Première carte (année 2)', 'salarié', h.eur(prem)],
  ['Renouvellement (année 3)', 'salarié', h.eur(ren)],
  [`Taxe employeur, CDI à ${h.eur(2600)} par mois`, 'employeur', h.eur(taxe, 2)],
  [`Taxe employeur, CDD de moins d’un an au même salaire`, 'employeur', h.eur(taxeCourt)],
], `Barème des timbres en vigueur depuis le ${h.date(T.en_vigueur)}`, ['l', 'l', 'r'])}
<p>Le montant des timbres suit ${h.src('sp_A18881', 'la hausse du 1er mai 2026')}. La taxe employeur, elle, est décrite sur ${h.src('sp_F2728', 'la fiche Autorisation de travail')} : ${h.pct(P.taxe_employeur.long_taux, 0)} du salaire mensuel pour un contrat d’un an ou plus, avec un plafond de ${h.eur(P.taxe_employeur.long_plafond, 2)}.</p>
<h2>Les pièces du dossier</h2>
<p>À la fin du VLS-TS, si vous occupez toujours l’emploi qui a justifié le visa, le dossier comprend un justificatif de nationalité, un justificatif de domicile de moins de six mois, le visa arrivant à expiration, trois photos ou le code de la e-photo, l’autorisation de travail du poste, un élément de la déclaration sociale nominative ou une attestation d’activité des douze derniers mois, et l’engagement signé de respecter les principes de la République. Le justificatif de paiement des timbres et le certificat médical de l’OFII se remettent plus tard, à la remise de la carte.</p>
<h2>Les délais qui comptent</h2>
<p>Pour une carte qui expire le ${h.date(fin)}, la fenêtre de renouvellement s’ouvre le ${h.date(w.ouverture)} et se ferme le ${h.date(w.limite)}. Un dépôt plus tardif coûte ${h.eur(retard)} au lieu de ${h.eur(ren)}. Côté réponse, aucune préfecture ne publie de délai moyen. Ce que dit la fiche, c’est qu’une absence de réponse au bout de ${h.num(mois)} mois vaut refus implicite : pour un dépôt le 1er juin 2027, le refus implicite naîtrait le ${h.date(imp)}, et ouvrirait un délai de deux mois pour un recours gracieux, hiérarchique ou devant le tribunal administratif.</p>
<h2>Le renouvellement et la carte pluriannuelle</h2>
<p>À l’échéance de la carte d’un an, trois cas se présentent. Vous êtes toujours en poste : la préfecture délivre une carte pluriannuelle de quatre ans, à condition de remplir la condition d’intégration républicaine (assiduité aux formations du contrat d’intégration, français de niveau ${P.pluriannuelle.langue}, examen civique réussi pour une première carte pluriannuelle). Vous avez changé d’emploi : il faut l’autorisation de travail du nouvel employeur. Vous êtes au chômage indemnisé : une nouvelle carte temporaire d’un an vous est délivrée. ${h.a('carte-de-sejour-pluriannuelle', 'La page Carte pluriannuelle')} calcule la date à partir de laquelle la demander.</p>
<h2>Si vous gagnez plus</h2>
<p>Au-delà de ${h.eur(P.talent.salaire_ref)} brut par an avec un master français, la carte talent salarié qualifié dispense l’employeur de l’autorisation de travail et de la taxe, et dure jusqu’à quatre ans dès la première délivrance. À ${h.eur(P.talent.cbe)}, la carte bleue européenne ouvre la même dispense avec un diplôme étranger. ${h.a('passeport-talent', 'Le simulateur Passeport talent')} compare votre salaire à chaque seuil.</p>
<p>Information, pas un conseil juridique : seule la préfecture apprécie votre dossier. Les ressortissants algériens relèvent de l’accord franco-algérien et suivent d’autres règles.</p>
`,
  },
  en: {
    slug: 'employee-residence-permit',
    nav: 'Employee residence permit',
    card: 'Permanent or fixed-term contract, work authorisation, VLS-TS, three-year cost and the switch to a four-year card.',
    title: 'Employee Residence Permit 2026: Conditions, Cost, Timeline',
    description: 'Employee residence permit in France 2026: salarié card for a CDI, temporary worker card for a CDD, work authorisation, VLS-TS, stamps, employer tax, renewal.',
    h1: 'Employee residence permit: from job offer to a four-year card',
    intro: 'The employee card comes in two stages: the employer obtains the work authorisation, then you apply for the visa and the card.',
    resume: `A non-EU national who comes to France as an employee receives a "salarié" card on a permanent contract (CDI) and a "travailleur temporaire" (temporary worker) card on a fixed-term contract (CDD). Either way, the employer must first obtain a work authorisation, requested online. From abroad, the employee then applies for a long-stay visa that serves as a residence permit (VLS-TS), validates it within three months of arrival by paying ${eE(vls)}, and files the card application at the latest two months before the visa ends. The first card costs ${eE(prem)} in tax stamps (timbres fiscaux), the renewal ${eE(ren)}, or ${eE(retard)} if filed late. Over three years, an employee's arrival comes to ${eE(p3)} in stamps. The employer, for its part, pays a tax: for a technician on a CDI at ${eE(2600)} gross a month, ${eE(taxe, 2)}. At renewal, an employee still in the job who has A2-level French and has passed the civic exam receives a four-year multi-year card.`,
    faqs: [
      { q: 'What is the difference between the salarié and temporary worker cards?', a: `The "salarié" card goes with a permanent contract (CDI) and the "travailleur temporaire" card with a fixed-term contract (CDD); both last one year the first time. The second is renewed for the rest of the CDD or a new CDD, which can exceed a year. Both cost the same, ${eE(tt)} on first issue, and each requires a work authorisation.` },
      { q: 'Can I start work on arrival with an employee VLS-TS?', a: `Yes. The long-stay visa that serves as a permit lets you work from the day you enter France, for the employer that obtained the authorisation. You must still validate it online within three months and pay the ${eE(vls)} tax; without validation your stay becomes irregular and you cannot leave and re-enter the Schengen area.` },
      { q: 'What happens to the employee card if I lose my job?', a: 'If you are unemployed and receiving benefits from France Travail (the public employment service) when the card expires, the prefecture issues a new one-year employee card. You then provide the employer’s certificate confirming the end of the contract and France Travail’s statement of your situation. If you have not found work by the end of that year, what follows depends on your rights.' },
      { q: 'Can I change employer while holding an employee card?', a: 'Yes, but the new employer must obtain its own work authorisation, because the card only covers the job the authorisation was granted for. At renewal you provide the new employer’s online authorisation and the former employer’s certificate. Moving from a CDI to a CDD means switching cards, and the other way round.' },
      { q: 'When do I move to the four-year multi-year card?', a: `At the first renewal, if you still have a salaried job and meet the integration condition: courses of the republican integration contract (CIR) attended, French at level ${P.pluriannuelle.langue} and the civic exam passed for a first multi-year card, unless you are over 65. The multi-year card costs ${eE(ren)}, the renewal rate.` },
    ],
    body: (h) => `
<h2>The two employee cards</h2>
<p>The official page draws a clear line between the two situations. On a CDI, the "salarié" card; on a CDD, the "travailleur temporaire" card. The shared conditions come down to three points: being a foreign national who wants to work as an employee, holding a work authorisation, and, for a first admission, a VLS-TS bearing the same purpose. The prefecture may refuse the card if an order to leave France (OQTF) was ignored, or in cases of forged documents, serious offences or violence against public officials. The rules come from ${h.src('sp_F15898', 'the official employee and temporary worker card page')} (in French) and ${h.ext(LF, 'sections L421-1 to L421-4 of the CESEDA immigration code')}.</p>
<h2>Step 1: the work authorisation, on the employer's side</h2>
<p>Nothing starts without it. The employer applies through the online service, whether the future employee is in France or abroad. As a rule, the job must first have been advertised for three consecutive weeks with the public employment service, unless it is a shortage occupation or the hire is a recent master's graduate paid more than one and a half times the minimum wage. Pay cannot be below the minimum wage (Smic) or the collective-agreement minimum. The criteria are set out on ${h.src('sp_F3100', 'the page on how work authorisations are granted')}; ${h.a('autorisation-de-travail', 'our work authorisation page')} goes through them one by one.</p>
<h2>Step 2: visa, validation, card</h2>
<p>Once the authorisation is granted, the administration informs the employer, who informs the employee. The employee applies for a VLS-TS at the consulate. On arrival they can start work straight away, but must validate the visa online within three months and pay ${h.eur(vls)}. The card application then goes to the prefecture where they live, at the latest two months before the VLS-TS ends. Someone already in France on another permit changes status instead: the employer requests the work authorisation, then the employee files the card application before the current permit ends.</p>
<h2>What the card costs, and who pays</h2>
<p>The employee pays the tax stamps; the employer pays the employer tax. Together they make up the full cost of a hire, which the mini calculator at the top of this page adds up for you.</p>
${h.table(['Step', 'Paid by', 'Amount'], [
  ['VLS-TS validation (year 1)', 'employee', h.eur(vls)],
  ['First card (year 2)', 'employee', h.eur(prem)],
  ['Renewal (year 3)', 'employee', h.eur(ren)],
  [`Employer tax, CDI at ${h.eur(2600)} a month`, 'employer', h.eur(taxe, 2)],
  ['Employer tax, CDD under a year at the same pay', 'employer', h.eur(taxeCourt)],
], `Stamp schedule in force since ${h.date(T.en_vigueur)}`, ['l', 'l', 'r'])}
<p>The stamp amounts follow ${h.src('sp_A18881', 'the fee increase of 1 May 2026')}. The employer tax is described on ${h.src('sp_F2728', 'the work authorisation page')}: ${h.pct(P.taxe_employeur.long_taux, 0)} of monthly pay for a contract of a year or more, capped at ${h.eur(P.taxe_employeur.long_plafond, 2)}.</p>
<h2>Documents for the file</h2>
<p>At the end of the VLS-TS, if you still hold the job the visa was issued for, the file contains proof of nationality, proof of address under six months old, the expiring visa, three photos or the e-photo code, the work authorisation for the post, an extract of the employer's payroll declaration (DSN) or an activity certificate covering the last twelve months, and the signed commitment to respect the principles of the Republic. Proof of stamp payment and the OFII medical certificate are handed in later, when you collect the card.</p>
<h2>Deadlines that matter</h2>
<p>For a card expiring on ${h.date(fin)}, the renewal window opens on ${h.date(w.ouverture)} and closes on ${h.date(w.limite)}. Filing later costs ${h.eur(retard)} instead of ${h.eur(ren)}. As for the answer, no prefecture publishes an average processing time. What the official page does say is that no answer after ${h.num(mois)} months counts as an implicit refusal: for an application filed on 1 June 2027, the implicit refusal would arise on ${h.date(imp)}, opening two months for an appeal to the prefect, the minister or the administrative court.</p>
<h2>Renewal and the multi-year card</h2>
<p>When the one-year card ends, there are three cases. You are still in the job: the prefecture issues a four-year multi-year card, provided you meet the integration condition (attendance at the integration-contract courses, French at level ${P.pluriannuelle.langue}, civic exam passed for a first multi-year card). You have changed jobs: you need the new employer's work authorisation. You are unemployed and receiving benefits: you get a new one-year temporary card. ${h.a('carte-de-sejour-pluriannuelle', 'The multi-year card page')} works out when you can apply.</p>
<h2>If you earn more</h2>
<p>Above ${h.eur(P.talent.salaire_ref)} gross a year with a French master's, the skilled-employee talent card spares the employer both the work authorisation and the tax, and lasts up to four years from the first issue. At ${h.eur(P.talent.cbe)}, the EU Blue Card gives the same exemption with a foreign degree. ${h.a('passeport-talent', 'The talent passport calculator')} compares your salary with each threshold.</p>
<p>Information, not legal advice: only the prefecture assesses your file. Algerian nationals fall under the Franco-Algerian agreement and follow other rules.</p>
`,
  },
});
