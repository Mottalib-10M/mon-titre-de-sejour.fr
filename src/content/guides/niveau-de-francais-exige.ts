import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A2 = P.pluriannuelle.langue, B1 = P.resident.langue, B2 = P.naturalisation.langue, AGE = P.pluriannuelle.age_exemption;
const LF_R413 = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070158/LEGISCTA000042800884/';
const LF_TESTS = 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000053164492';

export default defineGuide({
  id: 'niveau-de-francais-exige',
  group: 'nationalite',
  order: 50,
  mini: 'langue',
  miniHref: 'carte-de-resident',
  related: ['carte-de-sejour-pluriannuelle', 'carte-de-resident', 'naturalisation-francaise', 'examen-civique', 'nationalite-par-mariage'],
  sources: ['sp_F11926', 'sp_F34501', 'sp_F17450', 'sp_F39530'],
  fr: {
    slug: 'niveau-de-francais-exige',
    nav: 'Niveau de français exigé',
    card: 'A2 pour la carte pluriannuelle, B1 pour la carte de résident, B2 pour la nationalité : diplômes et tests acceptés.',
    title: 'Niveau de français exigé 2026 : A2, B1 ou B2 selon le titre',
    description: 'Niveau de français exigé 2026 : A2 pour la 1re carte pluriannuelle, B1 pour la carte de résident, B2 pour la nationalité ; diplômes, tests et dispenses admis.',
    h1: 'Niveau de français exigé : A2, B1 ou B2 selon votre démarche',
    intro: 'Choisissez la démarche et indiquez votre âge : le mini-simulateur donne le niveau à prouver et dit si l’examen civique s’ajoute.',
    resume: `Depuis le 1er janvier 2026, le français se prouve à trois niveaux différents selon la démarche. Pour une première carte de séjour pluriannuelle, il faut le niveau ${A2} du cadre européen commun de référence pour les langues (CECRL) ; pour une première carte de résident, de résident de longue durée-UE ou de résident permanent, le niveau ${B1} ; pour la naturalisation et pour la déclaration de nationalité par mariage, le niveau ${B2}, à l’oral et à l’écrit. Les étrangers de ${AGE} ans et plus ne sont pas concernés pour les cartes, mais l’âge ne dispense pas pour la nationalité, sauf pour le réfugié ou apatride de plus de 70 ans résidant en France depuis au moins quinze ans. Le niveau se prouve par un diplôme français (brevet, CAP, BEP, diplôme de niveau 3 ou plus), un diplôme de langue (DELF, DALF, DCL, DUEF, DFP) ou un test TCF ou TEF de moins de deux ans passé dans un centre agréé. Un diplôme délivré à l’étranger, même dans un pays francophone, n’est pas admis pour les cartes. Seule exception générale : un handicap ou un état de santé qui rend l’évaluation impossible, attesté par certificat médical.`,
    faqs: [
      { q: 'Un renouvellement de carte pluriannuelle exige-t-il le niveau A2 ?', a: `Non. L’exigence vise la délivrance d’une première carte pluriannuelle ; les renouvellements ne sont pas concernés, pas plus que pour l’examen civique. Elle ne s’applique pas non plus aux titres non soumis au contrat d’intégration républicaine, ni aux bénéficiaires de la protection subsidiaire, aux apatrides et à leur famille, ni aux personnes de ${AGE} ans et plus.` },
      { q: 'Quels tests de langue le ministère de l’Intérieur reconnaît-il ?', a: 'Pour les cartes de séjour, seuls le TCF de France Éducation international et le TEF de la chambre de commerce et d’industrie de Paris. Les quatre épreuves (expression orale et écrite, compréhension orale et écrite) se passent en présentiel, le même jour, avec contrôle d’identité. L’attestation, valable deux ans, porte la photo du candidat prise avant l’épreuve.' },
      { q: 'Un diplôme obtenu dans un pays francophone suffit-il ?', a: 'Pour les cartes de séjour, non : la fiche officielle précise que les diplômes délivrés par une autorité étrangère, même francophone, ne sont pas admis. Pour la naturalisation, la langue maternelle française d’un ressortissant de pays francophone joue sur la durée de résidence exigée, mais le dossier doit tout de même contenir un diplôme français ou un test reconnu.' },
      { q: 'Le conjoint d’un Français peut-il être dispensé du niveau B2 ?', a: `Seulement si son handicap ou son état de santé rend l’évaluation linguistique impossible, avec un certificat médical. La dispense liée à l’âge, réservée aux réfugiés et apatrides de plus de 70 ans présents depuis quinze ans, ne vaut que pour la naturalisation par décret. Le niveau ${B2} reste donc la règle pour la déclaration par mariage.` },
      { q: 'L’employeur doit-il financer les cours de français ?', a: `Il n’y est pas tenu, mais il peut proposer, dans le plan de développement des compétences, une formation visant le niveau ${A2} au salarié non francophone engagé dans un parcours de formation linguistique. Le salarié peut aussi mobiliser son compte personnel de formation. L’OFII, de son côté, teste le niveau à l’arrivée et prescrit une formation si nécessaire.` },
    ],
    body: (h) => `
<h2>Trois démarches, trois niveaux</h2>
<p>Le mini-simulateur ci-dessus applique la grille suivante, tirée de ${h.src('sp_F34501', 'la fiche Carte de résident et carte de séjour pluriannuelle : comment justifier de votre connaissance du français')} et de ${h.src('sp_F11926', 'la fiche Nationalité française : comment justifier de son niveau en français')}.</p>
${h.table(['Démarche', 'Niveau exigé', 'Dispense d’âge', 'Examen civique'], [
  ['Première carte de séjour pluriannuelle', A2, `${h.num(AGE)} ans et plus`, 'oui (sauf ' + h.num(AGE) + ' ans et plus)'],
  ['Première carte de résident (dont longue durée-UE, permanent)', B1, `${h.num(AGE)} ans et plus`, 'oui (sauf ' + h.num(AGE) + ' ans et plus)'],
  ['Naturalisation ou réintégration par décret', B2, 'réfugié ou apatride de plus de 70 ans, 15 ans de résidence', 'oui'],
  ['Déclaration de nationalité par mariage', B2, 'aucune', 'non'],
  ['Renouvellement d’une carte', 'aucun', '-', 'non'],
], 'Règles en vigueur depuis le 1er janvier 2026')}
<h2>Ce que signifient A2, B1 et B2</h2>
<p>Ce sont des niveaux du cadre européen commun de référence pour les langues du Conseil de l’Europe. Au niveau ${A2}, on comprend des phrases isolées et des expressions courantes sur l’environnement quotidien (informations personnelles, achats, travail), on échange simplement sur des sujets familiers et on décrit avec des moyens simples sa formation et son environnement. Au niveau ${B1}, on comprend l’essentiel d’une discussion en langue claire et standard sur le travail, l’école ou les loisirs, on se débrouille dans la plupart des situations, on raconte un événement et on explique brièvement un projet. Le niveau ${B2}, exigé pour la nationalité à l’oral et à l’écrit, suppose une aisance nettement supérieure.</p>
<h2>Les cartes de séjour : qui est concerné</h2>
<p>Pour la première carte pluriannuelle, le niveau ${A2} concerne les moins de ${h.num(AGE)} ans, sauf trois catégories : les titres qui ne relèvent pas du contrat d’intégration républicaine (CIR), les bénéficiaires de la protection subsidiaire et leur famille, les apatrides et leur famille. Pour la première carte de résident, le niveau ${B1} vise notamment le conjoint de Français, le parent d’enfant français, la famille venue par regroupement familial auprès d’un résident, la carte de résident de longue durée-UE (talent et carte bleue européenne après cinq ans, réfugiés, protection subsidiaire, résidence régulière de cinq ans), et la carte de résident permanent. ${h.a('carte-de-resident', 'La page Carte de résident')} calcule la date à laquelle la condition de durée est remplie ; ${h.a('carte-de-sejour-pluriannuelle', 'celle de la carte pluriannuelle')} donne la fenêtre de dépôt.</p>
<h2>Comment prouver son niveau pour une carte</h2>
<p>Quatre voies sont admises, réglées notamment par ${h.ext(LF_R413, 'l’article R413-15 du CESEDA')} :</p>
<ul>
<li>une <strong>certification linguistique</strong> d’un organisme reconnu par le ministère de l’Intérieur : seuls le TCF de France Éducation international et le TEF de la CCI Paris Île-de-France le sont. Quatre épreuves distinctes, en présentiel, le même jour, avec surveillance et contrôle d’identité ; attestation valable deux ans ;</li>
<li>un <strong>diplôme de langue</strong> du niveau requis ou supérieur : DUEF des centres universitaires d’études françaises, diplôme de français professionnel de la CCI Paris, DELF, DALF ou DELF Pro de France Éducation international, DCL de l’Éducation nationale ;</li>
<li>une <strong>certification professionnelle</strong> de niveau 3 au moins, enregistrée au répertoire national des certifications professionnelles ;</li>
<li>un <strong>diplôme national</strong> de niveau 3 au moins (CAP, BEP, certificat de formation générale) ou le diplôme national du brevet.</li>
</ul>
<p>Les diplômes délivrés par une autorité étrangère ne sont pas admis, même s’ils viennent d’un pays francophone. En cas de handicap ou d’état de santé chronique, des aménagements d’épreuve sont possibles, et une dispense complète si l’évaluation est impossible : le médecin traitant remplit un certificat, que la préfecture peut faire vérifier.</p>
<h2>Comment prouver son niveau pour la nationalité</h2>
<p>Pour la naturalisation comme pour la déclaration par mariage, le dossier contient l’un des documents suivants : le diplôme national du brevet ; un diplôme d’État ou une certification professionnelle de niveau 3 au moins, enregistrée au répertoire national ; un diplôme attestant le niveau ${B2} ; ou l’attestation de réussite au TCF ou au TEF délivrée depuis moins de deux ans (${h.ext(LF_TESTS, 'arrêté du 22 décembre 2025 sur les tests linguistiques')}). Le service instructeur peut demander une nouvelle expertise médicale pour vérifier une dispense pour raison de santé. Le réfugié politique ou apatride de plus de 70 ans qui réside depuis au moins quinze ans en France avec un titre valide est dispensé de produire un diplôme pour la naturalisation.</p>
<h2>Au travail et à l’arrivée</h2>
<p>D’après ${h.src('sp_F17450', 'la fiche sur la connaissance du français par le salarié non européen')}, l’étranger qui s’installe durablement signe en principe un contrat d’intégration républicaine et passe un test oral et écrit organisé par l’OFII ; selon le résultat, il suit une formation linguistique ou en est dispensé. L’employeur peut proposer une formation visant le niveau ${A2} dans son plan de développement des compétences, et le salarié peut utiliser son compte personnel de formation. Partir tôt vers le niveau ${B1} évite de bloquer la carte de résident cinq ans plus tard.</p>
<h2>En pratique</h2>
<p>Vérifiez la date de votre attestation : un test de plus de deux ans n’est plus accepté le jour du dépôt. Pensez aussi à l’ordre des étapes : un TCF passé au niveau ${A2} pour la carte pluriannuelle aura expiré quand viendra la carte de résident, qui demandera un nouveau test au niveau ${B1}. Pour la nationalité, ajoutez l’${h.a('examen-civique', 'examen civique')}, distinct du test de langue. Information, pas un conseil juridique ; seule la préfecture ou le ministère apprécie votre dossier.</p>
`,
  },
  en: {
    slug: 'french-language-requirement',
    nav: 'French language requirement',
    card: 'A2 for the multi-year card, B1 for the resident card, B2 for citizenship: accepted diplomas and tests.',
    title: 'Language Requirement France 2026: A2, B1 or B2 by Permit',
    description: 'Language requirement in France 2026: A2 for a first multi-year card, B1 for the resident card, B2 for citizenship, and the diplomas, tests and exemptions.',
    h1: 'French language requirement: A2, B1 or B2 depending on your application',
    intro: 'Pick the application and enter your age: the mini-calculator gives the level to prove and says whether the civic exam applies too.',
    resume: `Since 1 January 2026, French has to be proved at one of three levels depending on what you apply for. A first multi-year residence card (carte de séjour pluriannuelle) needs level ${A2} of the Common European Framework of Reference for Languages (CEFR); a first resident card, EU long-term resident card or permanent resident card needs ${B1}; naturalisation and citizenship through marriage need ${B2}, spoken and written. People aged ${AGE} or over are exempt for the cards, but age gives no exemption for citizenship, except for a refugee or stateless person over 70 who has lived in France for at least fifteen years. The level is proved with a French diploma (brevet, CAP, BEP, any level-3 qualification or higher), a language diploma (DELF, DALF, DCL, DUEF, DFP) or a TCF or TEF test under two years old taken at an approved centre. A diploma issued abroad, even in a French-speaking country, is not accepted for the cards. The one general exception is a disability or health condition that makes assessment impossible, certified by a doctor.`,
    faqs: [
      { q: 'Does renewing a multi-year card require level A2?', a: `No. The requirement applies when a first multi-year card is issued; renewals are not affected, just as with the civic exam. It also does not apply to permits outside the republican integration contract, to subsidiary-protection holders, stateless people and their families, or to anyone aged ${AGE} or over.` },
      { q: 'Which language tests does the Interior Ministry recognise?', a: 'For residence cards, only the TCF from France Éducation international and the TEF from the Paris Chamber of Commerce and Industry. All four papers (speaking, writing, listening, reading) are taken in person on the same day, with an identity check. The certificate, valid for two years, carries a photo of the candidate taken before the test.' },
      { q: 'Is a diploma from a French-speaking country enough?', a: 'For residence cards, no: the official page states that diplomas issued by a foreign authority, even in a French-speaking country, are not accepted. For naturalisation, French as a mother tongue in a French-speaking country affects the residence period required, but the file must still contain a French diploma or a recognised test.' },
      { q: 'Can a French national’s spouse be exempted from level B2?', a: `Only if a disability or health condition makes language assessment impossible, backed by a medical certificate. The age exemption, reserved for refugees and stateless people over 70 with fifteen years in France, applies only to naturalisation by decree. Level ${B2} therefore remains the rule for the marriage declaration.` },
      { q: 'Does my employer have to pay for French classes?', a: `There is no obligation, but the employer can offer training towards level ${A2} through its skills-development plan to an employee who does not speak French and is on a language-training course. The employee can also use their personal training account (compte personnel de formation). OFII tests your level on arrival and prescribes training if needed.` },
    ],
    body: (h) => `
<h2>Three applications, three levels</h2>
<p>The mini-calculator above applies the grid below, taken from ${h.src('sp_F34501', 'the official page on proving French for the resident and multi-year cards')} and ${h.src('sp_F11926', 'the official page on French for citizenship')}.</p>
${h.table(['Application', 'Level required', 'Age exemption', 'Civic exam'], [
  ['First multi-year residence card', A2, `${h.num(AGE)} and over`, 'yes (except ' + h.num(AGE) + ' and over)'],
  ['First resident card (incl. EU long-term, permanent)', B1, `${h.num(AGE)} and over`, 'yes (except ' + h.num(AGE) + ' and over)'],
  ['Naturalisation or reinstatement by decree', B2, 'refugee or stateless person over 70 with 15 years’ residence', 'yes'],
  ['Citizenship declaration through marriage', B2, 'none', 'no'],
  ['Renewing a card', 'none', '-', 'no'],
], 'Rules in force since 1 January 2026')}
<h2>What A2, B1 and B2 mean</h2>
<p>They are levels of the Council of Europe’s Common European Framework of Reference for Languages. At ${A2}, you understand isolated sentences and everyday expressions about personal details, shopping and work, can handle simple exchanges on familiar topics and describe your background and surroundings in simple terms. At ${B1}, you follow the main points of clear standard speech about work, school or leisure, cope with most everyday situations, can tell a story and briefly explain a plan. ${B2}, required for citizenship in both speaking and writing, means a clearly more fluent command.</p>
<h2>Residence cards: who is affected</h2>
<p>For the first multi-year card, ${A2} applies to people under ${h.num(AGE)}, with three exceptions: permits outside the republican integration contract (contrat d’intégration républicaine, CIR), subsidiary-protection holders and their families, and stateless people and their families. For the first resident card, ${B1} applies in particular to the spouse of a French national, the parent of a French child, family members who came through family reunification with a resident, the EU long-term resident card (talent and EU Blue Card holders after five years, refugees, subsidiary protection, five years of lawful residence) and the permanent resident card. ${h.a('carte-de-resident', 'The resident card page')} works out when your residence period is met; ${h.a('carte-de-sejour-pluriannuelle', 'the multi-year card page')} gives the filing window.</p>
<h2>How to prove your level for a card</h2>
<p>Four routes are accepted, governed in particular by ${h.ext(LF_R413, 'article R413-15 of the CESEDA immigration code')}:</p>
<ul>
<li>a <strong>language certification</strong> from a body recognised by the Interior Ministry: only the TCF (France Éducation international) and the TEF (Paris Île-de-France Chamber of Commerce) qualify. Four separate papers, in person, on one day, supervised and with an identity check; the certificate is valid for two years;</li>
<li>a <strong>French language diploma</strong> at the required level or above: DUEF from the university French-studies centres, the Paris Chamber’s professional French diploma (DFP), DELF, DALF or DELF Pro from France Éducation international, or the national education DCL;</li>
<li>a <strong>vocational certification</strong> at level 3 or above, registered in the national register of vocational certifications (RNCP);</li>
<li>a <strong>national diploma</strong> at level 3 or above (CAP, BEP, certificat de formation générale) or the brevet.</li>
</ul>
<p>Diplomas issued by a foreign authority are not accepted, even from a French-speaking country. With a disability or chronic illness, test arrangements are possible, and a full exemption if assessment is impossible: your GP fills in a medical certificate, which the prefecture can have checked.</p>
<h2>How to prove your level for citizenship</h2>
<p>For naturalisation and for the marriage declaration alike, the file must contain one of these: the brevet; a state diploma or vocational certification at level 3 or above, registered nationally; a diploma showing level ${B2}; or a TCF or TEF pass certificate issued within the last two years (${h.ext(LF_TESTS, 'order of 22 December 2025 on language tests')}). The case officer may order a fresh medical assessment to check a health exemption. A political refugee or stateless person over 70 who has lived in France for at least fifteen years with a valid permit does not have to produce a diploma for naturalisation.</p>
<h2>At work and on arrival</h2>
<p>According to ${h.src('sp_F17450', 'the official page on French for non-EU employees')}, a foreign national settling long term normally signs the republican integration contract and takes a spoken and written test run by OFII (the French immigration and integration office); depending on the result, you follow a language course or are exempted. An employer can offer training towards ${A2} in its skills-development plan, and you can use your personal training account. Working towards ${B1} early avoids being blocked at the resident-card stage five years later.</p>
<h2>In practice</h2>
<p>Check the date on your certificate: a test more than two years old is no longer accepted on the filing day. Plan the order of your steps too: a TCF taken for the multi-year card at ${A2} will have expired by the time you can apply for the resident card, so you will sit a new test at ${B1} then, and another at ${B2} if you later apply for citizenship. Keeping copies of every certificate and diploma in one folder saves time, because the prefecture and the naturalisation platform each ask for the original. For citizenship, add the ${h.a('examen-civique', 'civic exam')}, which is separate from the language test. This is information, not legal advice; only the prefecture or the ministry assesses your file.</p>
`,
  },
});
