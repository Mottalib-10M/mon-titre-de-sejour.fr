import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutTitre } from '../../lib/engine/couts';
import { addMonths } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

// Fiche F17164 (vérifiée le 1er mai 2026) : carte vie privée et familiale « pour soins », avis du collège de médecins de l'OFII.
const T = P.tarifs;
const avecVisa = coutTitre('etranger_malade', 'premiere').total;
const sansVisa = coutTitre('etranger_malade', 'premiere', { sansVisa: true }).total;
const renouv = coutTitre('etranger_malade', 'renouvellement').total;
const vpfNormal = coutTitre('vpf_liens', 'premiere').total;
// Exemple : demande déposée sur l'ANEF le 2 novembre 2026, certificat mis à disposition le même jour.
const DEPOT = '2026-11-02';
const certifAvant = addMonths(DEPOT, 1);
const certifAsile = addMonths(DEPOT, 3);
const silence = addMonths(DEPOT, 4); // « absence de réponse au bout de 4 mois » (F17164)
const recours = addMonths(silence, P.recours.mois);
const LF_L425 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042771806/';
const LF_L436 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042772036/';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'titre-de-sejour-etranger-malade',
  group: 'titres',
  order: 85,
  mini: 'malade',
  miniHref: 'cout-titre-de-sejour',
  related: ['vie-privee-et-familiale', 'cout-titre-de-sejour', 'delai-titre-de-sejour', 'recepisse-titre-de-sejour', 'admission-exceptionnelle-au-sejour'],
  sources: ['sp_F17164', 'sp_A18881', 'ceseda_l436'],
  fr: {
    slug: 'titre-de-sejour-etranger-malade',
    nav: 'Titre de séjour pour soins',
    card: 'Conditions, certificat médical à l’OFII, avis du collège de médecins et coût réduit au droit de timbre.',
    title: 'Titre de séjour étranger malade 2026 : avis OFII et coût',
    description: 'Titre de séjour pour soins 2026 : conditions, certificat médical à l’OFII sous un mois, avis du collège de médecins, droit de timbre et visa de régularisation.',
    h1: 'Titre de séjour pour étranger malade : la procédure et son coût',
    intro: 'Une carte vie privée et familiale peut être accordée à la personne gravement malade qui ne peut pas se soigner dans son pays : la procédure passe par le service médical de l’OFII.',
    resume: `La carte de séjour temporaire vie privée et familiale « pour soins » s’adresse à l’étranger non européen qui réside habituellement en France, dont l’état exige une prise en charge médicale sans laquelle sa santé deviendrait critique, et qui ne peut pas accéder au traitement adapté dans son pays d’origine. La demande peut être faite même en situation irrégulière. Elle se dépose sur l’ANEF ; le certificat médical rempli par votre médecin doit ensuite parvenir au service médical de l’OFII dans le mois qui suit sa mise à disposition, ou dans les trois mois suivant l’enregistrement de la demande d’asile pour un demandeur d’asile. Un collège de médecins de l’OFII rend un avis simple, qui ne lie pas le préfet. Si la carte est accordée, elle coûte ${eF(avecVisa)} de droit de timbre, contre ${eF(vpfNormal)} pour une carte vie privée et familiale ordinaire ; sans visa de long séjour à l’entrée, le visa de régularisation porte le total à ${eF(sansVisa)}. Sans réponse au bout de quatre mois, la demande est refusée implicitement.`,
    faqs: [
      { q: 'Peut-on demander la carte pour soins sans être en situation régulière ?', a: 'Oui. La fiche officielle le précise : la demande est possible même en séjour irrégulier, à condition de résider habituellement en France et de pouvoir le prouver (visa, récépissé, documents d’une administration, relevés bancaires, courriers). La préfecture peut toutefois refuser si vous n’avez pas exécuté une obligation de quitter le territoire ou si vous représentez une menace pour l’ordre public.' },
      { q: 'Qui remplit le certificat médical et à qui l’envoyer ?', a: 'Le certificat se télécharge dans votre espace personnel ANEF une fois la demande déposée. Vous l’imprimez, votre médecin le remplit, puis vous l’envoyez au service médical de l’OFII, de préférence en recommandé avec accusé de réception. Le délai est d’un mois à partir de sa mise à disposition, de trois mois à partir de l’enregistrement de la demande d’asile si vous êtes demandeur d’asile.' },
      { q: 'L’avis favorable des médecins de l’OFII garantit-il la carte ?', a: 'Non. L’avis du collège de médecins de l’OFII est un avis simple : il éclaire le préfet sans l’obliger. Le préfet garde son pouvoir d’appréciation et peut refuser malgré un avis favorable, ou accorder la carte malgré un avis réservé. En cas de refus écrit ou de silence de quatre mois, un recours devant le juge administratif est possible dans les deux mois.' },
      { q: `Pourquoi la carte pour soins coûte-t-elle seulement ${eF(avecVisa)} ?`, a: `Parce qu’elle n’est soumise qu’au droit de timbre, sans la taxe qui s’applique aux autres cartes : ${eF(avecVisa)} au lieu de ${eF(vpfNormal)}. Le renouvellement coûte aussi ${eF(renouv)}. Le visa de régularisation de ${eF(T.visa_regularisation)} reste dû si vous êtes entré en France sans visa de long séjour, ce qui est fréquent pour ce titre.` },
      { q: 'Que se passe-t-il si l’enfant malade est mineur ?', a: `Le parent d’un enfant mineur gravement malade ne relève pas de cette carte ni de la démarche sur l’ANEF : il demande une autorisation provisoire de séjour. Depuis le 1er mai 2026, sa délivrance et son renouvellement sont soumis à une taxe de ${eF(T.aps)}, selon l’actualité officielle de Service-Public.fr sur la hausse des taxes.` },
    ],
    body: (h) => `
<h2>Les cinq conditions de la carte pour soins</h2>
<p>La fiche de Service-Public.fr énumère des conditions cumulatives. Vous devez être étranger hors Union européenne, résider habituellement en France, avoir un état de santé qui nécessite une prise en charge médicale sans laquelle il deviendrait critique, ne pas pouvoir accéder au traitement approprié dans votre pays d’origine, et ne pas représenter une menace pour l’ordre public. La résidence habituelle se prouve sur au moins un an, par tout document daté : visa, récépissé de demande de titre ou d’asile, courrier d’une préfecture, d’un service social ou d’une école, relevés bancaires avec des mouvements, attestations de proches.</p>
<p>La base légale est la section du CESEDA consacrée aux cartes « vie privée et familiale » délivrées pour d’autres motifs, ${h.ext(LF_L425, 'articles L425-1 à L425-10')}. La préfecture peut refuser la carte si vous n’avez pas respecté une obligation de quitter le territoire, en cas de faux documents, de délits graves ou de violences contre des agents publics.</p>
<h2>Le calendrier de la procédure, étape par étape</h2>
<p>La demande se dépose en ligne sur l’ANEF. Le certificat médical apparaît alors dans votre espace personnel. Exemple : pour un dépôt le ${h.date(DEPOT)}, le certificat rempli doit parvenir à l’OFII avant le ${h.date(certifAvant)}, ou avant le ${h.date(certifAsile)} pour un demandeur d’asile dont la demande a été enregistrée ce jour-là.</p>
${h.table(['Étape', 'Qui', 'Délai fixé par la fiche'], [
  ['Dépôt de la demande', 'Vous, sur l’ANEF', 'Aucun'],
  ['Envoi du certificat médical', 'Votre médecin, puis vous', '1 mois (3 mois si demandeur d’asile)'],
  ['Compléments demandés par le médecin de l’OFII', 'Votre médecin', '15 jours'],
  ['Examens complémentaires', 'Vous, gratuitement', '15 jours pour transmettre les résultats'],
  ['Avis du collège de médecins', 'OFII, puis préfecture', 'Non publié'],
  ['Décision', 'Préfet', 'Silence de 4 mois = refus'],
], 'Procédure de la carte vie privée et familiale pour soins (fiche F17164)', ['l', 'l', 'l'])}
<p>Une fois le rapport du médecin de l’OFII transmis au collège de médecins, la préfecture émet une attestation de prolongation d’instruction, téléchargeable sur l’ANEF : elle couvre votre séjour pendant l’examen. Attention, si vous ne répondez pas aux demandes du médecin de l’OFII, cette attestation ne vous sera pas délivrée. Aucune source officielle ne publie le temps moyen que prend l’avis médical : nous n’en avançons pas.</p>
<h2>Le rôle exact de l’OFII</h2>
<p>Le médecin de l’OFII peut, avec votre accord, demander des informations à votre médecin ou à tout professionnel de santé, vous convoquer pour un examen médical gratuit et prescrire des examens que vous n’avez pas à payer. Il rédige un rapport, que le collège de médecins examine. Le collège peut à son tour demander des compléments sous quinze jours, vous entendre ou vous examiner. Son avis porte sur deux questions médicales : la gravité de votre état et l’accès effectif à un traitement adapté dans votre pays. Il est transmis au préfet, qui reste libre de sa décision : c’est ce que la fiche appelle un avis simple.</p>
<h2>Ce que vous paierez</h2>
<p>Le mini-simulateur en haut de page fait le calcul selon que vous êtes entré avec un visa de long séjour ou non. La carte pour soins n’est soumise qu’au droit de timbre de ${h.eur(avecVisa)}, à la première délivrance comme au renouvellement (${h.eur(renouv)}). La personne entrée sans visa de long séjour paie en plus le visa de régularisation de ${h.eur(T.visa_regularisation)}, soit ${h.eur(sansVisa)} au total ; ${h.eur(T.visa_regularisation_non_remboursable)} de ce montant sont dus dès le dépôt et ne sont pas remboursés en cas de refus. Ces montants appliquent ${h.src('sp_A18881', 'le barème entré en vigueur le 1er mai 2026')} et ${h.ext(LF_L436, 'les articles L436-1 à L436-13 du CESEDA')}.</p>
${h.table(['Situation', 'Première carte', 'Renouvellement'], [
  ['Entré avec un visa de long séjour', h.eur(avecVisa), h.eur(renouv)],
  ['Entré sans visa de long séjour', h.eur(sansVisa), h.eur(renouv)],
  ['Pour comparaison : carte vie privée et familiale ordinaire', h.eur(vpfNormal), h.eur(coutTitre('vpf_liens', 'renouvellement').total)],
], 'Timbres fiscaux, barème du 1er mai 2026', ['l', 'r', 'r'])}
<h2>Renouveler la carte pour soins</h2>
<p>La carte temporaire pour soins se renouvelle tant que les conditions médicales restent remplies : la procédure médicale recommence alors, avec un nouveau certificat et un nouvel avis du collège de médecins. Le renouvellement se dépose dans la fenêtre habituelle, entre ${h.num(P.renouvellement.au_plus_tot_mois)} et ${h.num(P.renouvellement.au_plus_tard_mois)} mois avant la fin de la carte ; ${h.a('renouvellement-titre-de-sejour', 'le calendrier de renouvellement')} donne les dates exactes à partir de la date d’expiration.</p>
<h2>Refus et recours</h2>
<p>Le refus peut être écrit ou résulter du silence : sans réponse quatre mois après la demande, celle-ci est implicitement rejetée. Pour un dépôt le ${h.date(DEPOT)}, ce refus implicite naîtrait le ${h.date(silence)}. Un recours devant le juge administratif est alors possible dans les ${h.num(P.recours.mois)} mois, soit jusqu’au ${h.date(recours)} dans cet exemple. ${h.a('delai-titre-de-sejour', 'Le simulateur de délai')} fait ce calcul pour les autres titres.</p>
<p>Le cas du parent d’un enfant mineur gravement malade est distinct : il ne passe pas par l’ANEF et donne lieu à une autorisation provisoire de séjour, soumise depuis mai 2026 à une taxe de ${h.eur(T.aps)}. Pour la procédure complète, reportez-vous à ${h.src('sp_F17164', 'la fiche officielle sur le titre de séjour de l’étranger malade')}. Ces informations sont générales et ne remplacent pas l’avis d’une association ou d’un avocat pour un dossier médical complexe.</p>
`,
  },
  en: {
    slug: 'medical-residence-permit',
    nav: 'Medical residence permit',
    card: 'Conditions, medical certificate to OFII, the doctors’ panel opinion and a fee cut to stamp duty.',
    title: 'Medical Residence Permit 2026: OFII Opinion and Real Cost',
    description: 'Medical residence permit France 2026: who qualifies, the certificate due at OFII within a month, the doctors’ panel opinion, stamp duty and regularisation fee.',
    h1: 'Residence permit for medical treatment in France: procedure and cost',
    intro: 'A seriously ill foreign national who cannot get treatment at home may be granted a private and family life card; the procedure runs through OFII’s medical service.',
    resume: `The temporary private and family life card "for care" (carte de séjour vie privée et familiale pour soins) is for a non-EU national who lives habitually in France, whose condition needs medical care without which their health would become critical, and who cannot get appropriate treatment in their country of origin. You may apply even if you are in France without valid papers. The application is filed online on ANEF, the government portal; the medical certificate completed by your doctor must then reach the medical service of OFII (the French immigration and integration office) within one month of becoming available, or within three months of registering an asylum claim for asylum seekers. A panel of OFII doctors gives a non-binding opinion to the prefect, who decides. If granted, the card costs ${eE(avecVisa)} in stamp duty, compared with ${eE(vpfNormal)} for an ordinary private and family life card; without a long-stay visa on entry, the regularisation fee brings the total to ${eE(sansVisa)}. With no answer after four months, the application counts as refused.`,
    faqs: [
      { q: 'Can I apply for the medical permit while undocumented?', a: 'Yes. The official page states that the application is possible even without lawful status, as long as you live habitually in France and can prove it with dated papers: a visa, a receipt, letters from public bodies, bank statements, personal correspondence. The prefecture may still refuse if you ignored an order to leave France (OQTF) or are considered a threat to public order.' },
      { q: 'Who fills in the medical certificate, and where does it go?', a: 'The certificate appears in your ANEF personal space once the application is filed. You print it, your doctor completes it, and you post it to OFII’s medical service, ideally by recorded delivery with proof of receipt. The deadline is one month from when it becomes available, or three months from the registration of your asylum claim if you are an asylum seeker.' },
      { q: 'Does a favourable opinion from OFII’s doctors guarantee the card?', a: 'No. The opinion of OFII’s panel of doctors is advisory: it informs the prefect but does not bind them. The prefect can refuse despite a favourable opinion or grant the card despite a reserved one. After a written refusal or four months of silence, you can challenge the decision before the administrative court within two months.' },
      { q: `Why does the medical card cost only ${eE(avecVisa)}?`, a: `Because it carries only the stamp duty, without the tax charged on other cards: ${eE(avecVisa)} instead of ${eE(vpfNormal)}. Renewal also costs ${eE(renouv)}. The ${eE(T.visa_regularisation)} regularisation fee still applies if you entered France without a long-stay visa, which is common for people in this situation.` },
      { q: 'What if the person who is ill is my minor child?', a: `A parent of a seriously ill minor child does not use this card or the ANEF procedure: they apply for a temporary residence authorisation (autorisation provisoire de séjour, APS). Since 1 May 2026, issuing and renewing it carries a ${eE(T.aps)} tax, according to the official Service-Public.fr notice on the fee increase.` },
    ],
    body: (h) => `
<h2>The five conditions for the medical card</h2>
<p>The Service-Public.fr page lists conditions that must all be met. You must be a non-EU national, live habitually in France, have a condition that needs medical care without which it would become critical, be unable to obtain suitable treatment in your country of origin, and not be a threat to public order. Habitual residence is shown over at least one year with any dated document: visa, receipt (récépissé) for a permit or asylum application, letters from a prefecture, social service or school, bank statements showing activity, statements from people who know you.</p>
<p>The legal basis is the part of the CESEDA (French immigration code) on private and family life cards issued on other grounds, ${h.ext(LF_L425, 'sections L425-1 to L425-10')}. The prefecture can refuse if you did not comply with an order to leave France, used false documents, committed serious offences or were violent towards public officials.</p>
<h2>The procedure, step by step</h2>
<p>You apply online on ANEF. The medical certificate then appears in your personal space. Example: for an application filed on ${h.date(DEPOT)}, the completed certificate must reach OFII by ${h.date(certifAvant)}, or by ${h.date(certifAsile)} for an asylum seeker whose claim was registered that day.</p>
${h.table(['Step', 'Who', 'Deadline set by the official page'], [
  ['Filing the application', 'You, on ANEF', 'None'],
  ['Sending the medical certificate', 'Your doctor, then you', '1 month (3 months for asylum seekers)'],
  ['Further information asked by the OFII doctor', 'Your doctor', '15 days'],
  ['Additional tests', 'You, free of charge', '15 days to send results'],
  ['Opinion of the doctors’ panel', 'OFII, then the prefecture', 'Not published'],
  ['Decision', 'Prefect', '4 months of silence = refusal'],
], 'Procedure for the private and family life card for care (page F17164)', ['l', 'l', 'l'])}
<p>Once the OFII doctor’s report reaches the panel, the prefecture issues a certificate extending the examination of your application (attestation de prolongation d’instruction), downloadable on ANEF: it covers your stay while the file is being reviewed. If you ignore the OFII doctor’s requests, you will not receive it. No official source publishes how long the medical opinion usually takes, so we give no figure.</p>
<h2>What OFII actually does</h2>
<p>With your consent, the OFII doctor can ask your doctor or any health professional for information, call you in for a free medical examination and order tests you do not pay for. They write a report that the panel of doctors reviews. The panel can in turn ask for more information within fifteen days, hear you or examine you. Its opinion addresses two medical questions: how serious your condition is and whether suitable treatment is really available in your country. It goes to the prefect, who remains free to decide: the official page calls it a simple, non-binding opinion.</p>
<h2>What you will pay</h2>
<p>The mini-calculator at the top of the page works out the amount depending on whether you entered with a long-stay visa. The medical card carries only the ${h.eur(avecVisa)} stamp duty, for the first card and for each renewal (${h.eur(renouv)}). Someone who entered without a long-stay visa also pays the ${h.eur(T.visa_regularisation)} regularisation fee, ${h.eur(sansVisa)} in total; ${h.eur(T.visa_regularisation_non_remboursable)} of it is due at filing and is not refunded if you are refused. These amounts follow ${h.src('sp_A18881', 'the fee schedule in force since 1 May 2026')} and ${h.ext(LF_L436, 'sections L436-1 to L436-13 of the CESEDA')}.</p>
${h.table(['Situation', 'First card', 'Renewal'], [
  ['Entered with a long-stay visa', h.eur(avecVisa), h.eur(renouv)],
  ['Entered without a long-stay visa', h.eur(sansVisa), h.eur(renouv)],
  ['For comparison: ordinary private and family life card', h.eur(vpfNormal), h.eur(coutTitre('vpf_liens', 'renouvellement').total)],
], 'Tax stamps, schedule of 1 May 2026', ['l', 'r', 'r'])}
<h2>Renewing the medical card</h2>
<p>The temporary medical card is renewed for as long as the medical conditions are still met. Each renewal restarts the medical procedure: a new certificate from your doctor, a new report and a new opinion from OFII’s panel. You file the renewal in the usual window, between ${h.num(P.renouvellement.au_plus_tot_mois)} and ${h.num(P.renouvellement.au_plus_tard_mois)} months before the card expires, and ${h.a('renouvellement-titre-de-sejour', 'the renewal timetable')} gives the exact dates from your expiry date. Filing late adds the ${h.eur(T.retard_renouvellement)} late-filing fee on top of the stamp duty, so it is worth starting as soon as the window opens, especially as your doctor needs time to fill in the certificate and any tests requested by OFII must be done within fifteen days.</p>
<h2>Refusal and appeal</h2>
<p>A refusal can be written or result from silence: with no answer four months after the application, it is implicitly rejected. For an application filed on ${h.date(DEPOT)}, that implicit refusal would arise on ${h.date(silence)}. You can then appeal to the administrative court within ${h.num(P.recours.mois)} months, so until ${h.date(recours)} in this example. ${h.a('delai-titre-de-sejour', 'The waiting-time calculator')} does this sum for other permits.</p>
<p>A parent of a seriously ill minor is a separate case: there is no ANEF filing, and the prefecture issues a temporary residence authorisation, taxed at ${h.eur(T.aps)} since May 2026. For the full procedure, see ${h.src('sp_F17164', 'the official page on residence permits for foreign nationals who are ill')}. This is general information, not legal advice; for a complex medical file, a migrant-support association or a lawyer can help.</p>
`,
  },
});
