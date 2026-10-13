import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { taxeEmployeur } from '../../lib/engine/travail';
import { addMonths } from '../../lib/engine/dates';
import { formatMoney, displayDate } from '../../lib/format';

// Exemple : demande déposée le 5 novembre 2026 (mini-simulateur : mois de la demande).
const AT = P.autorisation_travail;
const depot = '2026-11-05';
const imp = addMonths(depot, AT.implicite_mois);
const recours = addMonths(imp, AT.recours_mois);
const rece = P.rece.seuil_mensuel;
const smic = P.smic.historique[P.smic.historique.length - 1].mensuel;
const taxe = taxeEmployeur({ type: 'long', salaireMensuel: 2400 });
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');
const LF_TRAV = 'https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006189813/';
const LF_TENSION = 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051643488';

export default defineGuide({
  id: 'autorisation-de-travail',
  group: 'travail',
  order: 25,
  mini: 'autorisation',
  miniHref: 'titre-de-sejour-salarie',
  related: ['titre-de-sejour-salarie', 'taxe-employeur-salarie-etranger', 'changement-de-statut-etudiant-salarie', 'passeport-talent', 'travailleur-saisonnier'],
  sources: ['sp_F2728', 'sp_F3100', 'sp_F34840', 'sp_F16053'],
  fr: {
    slug: 'autorisation-de-travail',
    nav: 'Autorisation de travail',
    card: 'Qui doit la demander, quels titres en dispensent, la règle des trois semaines et les délais légaux.',
    title: 'Autorisation de travail 2026 : qui la demande et quand',
    description: 'Autorisation de travail 2026 : titres qui en dispensent, offre publiée trois semaines, métiers en tension, délai de deux mois valant refus, taxe et recours.',
    h1: 'Autorisation de travail : ce que l’employeur doit obtenir avant d’embaucher',
    intro: 'Elle conditionne la carte salarié, travailleur temporaire ou saisonnier ; beaucoup d’autres titres en dispensent.',
    resume: `L’autorisation de travail est la permission que l’employeur doit obtenir avant d’embaucher un étranger non européen dont le titre ne permet pas déjà de travailler. Elle est obligatoire pour les cartes salarié, travailleur temporaire et travailleur saisonnier, et doit être redemandée pour chaque nouveau contrat. Elle ne l’est pas pour les titulaires d’une carte vie privée et familiale, d’une carte de résident, d’une carte talent ou de la carte de recherche d’emploi. La demande se fait uniquement en ligne. En principe, l’offre doit avoir été publiée pendant ${AT.offre_semaines} semaines consécutives auprès du service public de l’emploi, sauf métier en tension ou jeune diplômé de master payé au moins ${eF(rece, 2)} brut par mois. Le salaire ne peut pas être inférieur au Smic, ${eF(smic, 2)}. Si la préfecture ne répond pas dans les ${AT.implicite_mois} mois, la demande est réputée refusée : pour un dépôt le ${dF(depot)}, le refus implicite naît le ${dF(imp)}. Une fois accordée, elle entraîne la taxe employeur, ${eF(taxe, 2)} pour un CDI à ${eF(2400)} par mois.`,
    faqs: [
      { q: 'Quels titres de séjour dispensent d’autorisation de travail ?', a: 'La carte vie privée et familiale, la carte de résident, la carte de résident longue durée-UE obtenue en France, les cartes talent, la carte de recherche d’emploi ou de création d’entreprise, les cartes des protégés subsidiaires et apatrides, la carte « Article 50 TUE » des Britanniques et la carte ICT pour la mission détachée. L’étudiant travaille sans autorisation dans la limite de 964 heures par an.' },
      { q: 'L’autorisation provisoire de travail existe-t-elle encore ?', a: 'Non. Depuis le 1er avril 2021, l’autorisation provisoire de travail a disparu. L’employeur doit demander une autorisation de travail ordinaire, par le téléservice, dès que le titre de séjour du salarié ne permet pas de travailler. La confirmation de dépôt reçue après la saisie en ligne ne permet pas de commencer à travailler.' },
      { q: 'Combien de temps l’offre d’emploi doit-elle être publiée avant la demande ?', a: `Pendant ${AT.offre_semaines} semaines consécutives, dans les six mois qui précèdent la demande, auprès d’un organisme du service public de l’emploi comme France Travail, sans candidature valable reçue. Cette publication n’est pas exigée pour un métier en tension, ni pour un diplômé de master ou de licence professionnelle dont l’emploi correspond à la formation et atteint ${eF(rece, 2)} par mois.` },
      { q: 'Que faire si la préfecture ne répond pas à la demande d’autorisation ?', a: `Après ${AT.implicite_mois} mois sans réponse, la demande est réputée refusée. Vous disposez alors de ${AT.recours_mois} mois pour former un recours gracieux devant le préfet, hiérarchique devant le ministre de l’intérieur, ou contentieux devant le tribunal administratif ; l’avocat n’est pas obligatoire. Le mini-simulateur calcule ces deux dates à partir du mois de dépôt.` },
      { q: 'Un récépissé permet-il de travailler en attendant la carte ?', a: 'Seulement s’il porte la mention « autorise son titulaire à travailler ». Le récépissé de renouvellement d’une carte qui autorisait le travail le permet. Pour une première demande de carte salarié ou travailleur temporaire, il ne vaut que chez l’employeur qui a obtenu l’autorisation de travail. Certaines attestations de l’ANEF ont le même effet.' },
    ],
    body: (h) => `
<h2>Quand l’autorisation est obligatoire</h2>
<p>La règle part du titre que détient la personne, pas du poste. Avec un VLS-TS ou une carte « salarié » ou « travailleur temporaire », l’autorisation est obligatoire et ne vaut que pour l’emploi qui l’a justifiée : un nouveau contrat exige une nouvelle autorisation. Avec une carte « travailleur saisonnier », même chose, et les travaux saisonniers sont limités à six mois par an. Avec une carte de séjour délivrée par un autre pays de l’Union européenne, on ne peut ni séjourner ni travailler en France : il faut un visa de long séjour, et l’employeur demande l’autorisation selon le visa demandé. Un mineur de 16 à 18 ans a toujours besoin d’une autorisation, y compris en apprentissage. Ces cas figurent sur ${h.src('sp_F2728', 'la fiche Autorisation de travail d’un salarié étranger')}.</p>
<h2>Les titres qui en dispensent</h2>
<p>L’employeur n’a rien à demander quand le salarié détient l’un des titres suivants. Il doit en revanche vérifier l’authenticité du titre auprès de la préfecture du lieu d’embauche au moins deux jours ouvrables avant l’embauche, sauf si la personne est inscrite comme demandeur d’emploi à France Travail ; sans réponse en deux jours ouvrables, la vérification est réputée faite.</p>
${h.table(['Titre détenu', 'Travail salarié'], [
  ['Carte vie privée et familiale, carte de résident', 'libre'],
  ['Carte talent (salarié qualifié, carte bleue, chercheur…)', 'l’activité qui a permis la carte'],
  ['Carte recherche d’emploi ou création d’entreprise', `emploi lié aux études, plus de ${h.eur(rece, 2)} par mois`],
  ['Carte étudiant', '964 heures par an'],
  ['Carte ICT (salarié détaché)', 'la mission de détachement'],
  ['Carte salarié, travailleur temporaire, saisonnier', 'autorisation obligatoire'],
], 'Travail salarié selon le titre de séjour', ['l', 'l'])}
<h2>La demande : en ligne, par l’employeur</h2>
<p>La demande se fait uniquement par le téléservice, que l’étranger soit en France ou à l’étranger, par l’employeur ou par un mandataire. Pour un salarié détaché par une entreprise non établie en France, c’est le donneur d’ordre ou l’entreprise utilisatrice qui la dépose. La démarche n’est pas ouverte à l’étranger présent en France sans titre : il relève de l’admission exceptionnelle au séjour. La demande est instruite par le préfet du département du siège de l’employeur ou, pour un détachement intragroupe, par celui du cocontractant.</p>
<h2>Les critères examinés</h2>
<p>Pour l’emploi : il figure sur la liste des métiers en tension, ou l’offre a été publiée pendant ${h.num(AT.offre_semaines)} semaines consécutives dans les six mois précédents sans candidature valable. La liste nationale a été fixée par ${h.ext(LF_TENSION, 'l’arrêté du 21 mai 2025')} ; des listes propres existent pour la Guadeloupe, la Guyane, la Réunion et la Martinique. Pour l’employeur : il respecte ses obligations sociales, n’a pas été sanctionné pour travail illégal, aide au séjour irrégulier, atteinte à la personne ou faux, et fournit une attestation de versement des cotisations de moins de six mois. Pour la rémunération : au moins le Smic, ${h.eur(smic, 2)} par mois, ou le minimum de la convention collective s’il est plus élevé. La demande peut être refusée si le recrutement est manifestement disproportionné par rapport à l’activité de l’entreprise. Le détail est sur ${h.src('sp_F3100', 'la fiche sur la délivrance des autorisations de travail')} et dans les ${h.ext(LF_TRAV, 'articles L5221-5 à L5221-11 du Code du travail')}.</p>
<h2>Les jeunes diplômés et les étudiants</h2>
<p>Deux exceptions comptent pour les diplômés. Avec la carte de recherche d’emploi, ou avec un master obtenu dans l’année, l’emploi en relation avec la formation et payé au moins ${h.eur(rece, 2)} brut par mois n’a pas à être publié et peut ne pas figurer sur la liste des métiers en tension. Pour l’étudiant qui dépasse 964 heures dans son cursus, l’autorisation devient nécessaire, sauf contrat d’apprentissage validé par l’opérateur de compétences. ${h.a('changement-de-statut-etudiant-salarie', 'La page Changement de statut')} compare votre salaire à ce seuil.</p>
<h2>Après l’accord, et en cas de refus</h2>
<p>Si le salarié vit à l’étranger, l’employeur lui envoie l’autorisation pour qu’il demande son visa au consulat. S’il vit en France avec une carte salarié et que l’autorisation porte sur un CDI, il peut travailler tout de suite ; sur un CDD, il doit d’abord changer de carte et attendre un récépissé l’autorisant à travailler. Le titulaire d’une carte saisonnier ne peut pas changer de statut : il doit repartir demander un visa. En cas de refus notifié ou implicite, au bout de ${h.num(AT.implicite_mois)} mois, le délai de recours est de ${h.num(AT.recours_mois)} mois. Pour une demande déposée le ${h.date(depot)}, le refus implicite naît le ${h.date(imp)} et le recours reste possible jusqu’au ${h.date(recours)}.</p>
<h2>Ce que risque l’employeur sans autorisation</h2>
<p>Employer en connaissance de cause un étranger non autorisé à travailler expose à des sanctions pénales, avec une amende par salarié concerné et jusqu’à cinq ans de prison, et à des sanctions administratives : refus des aides publiques à l’emploi pendant cinq ans au plus, remboursement des aides de l’année précédente, fermeture temporaire de l’établissement, exclusion des contrats administratifs, amende administrative calculée sur le minimum garanti et nettement plus lourde en cas de récidive. La fiche officielle donne les montants ; elle précise aussi qu’une fraude ou une fausse déclaration destinée à obtenir un titre de travail est punie d’un an de prison. La vérification du titre deux jours avant l’embauche est la meilleure protection de l’employeur.</p>
<h2>Deux idées reçues</h2>
<p>L’autorisation provisoire de travail n’existe plus depuis le 1er avril 2021, comme le rappelle ${h.src('sp_F34840', 'la fiche officielle')}. Et la régularisation par le travail d’une personne sans titre ne passe pas par cette procédure, mais par l’admission exceptionnelle au séjour décrite sur ${h.src('sp_F16053', 'la fiche Régularisation par le travail')}, où la préfecture peut exiger sept ans de présence. Information, pas un conseil juridique ; les ressortissants algériens relèvent d’autres règles.</p>
`,
  },
  en: {
    slug: 'work-authorisation-france',
    nav: 'Work authorisation',
    card: 'Who must apply, which permits exempt you, the three-week rule and the legal deadlines.',
    title: 'Work Authorisation France 2026: Who Applies and When',
    description: 'Work authorisation in France 2026: permits that exempt you, the three-week job advert, shortage occupations, two months of silence as refusal, tax, appeals.',
    h1: 'Work authorisation in France: what your employer must obtain first',
    intro: 'It underpins the employee, temporary worker and seasonal worker cards; many other permits do not need it.',
    resume: `A work authorisation (autorisation de travail) is the permission an employer must obtain before hiring a non-EU national whose permit does not already allow work. It is required for the employee ("salarié"), temporary worker and seasonal worker cards, and must be requested again for every new contract. It is not needed by holders of a private and family life card, a resident card, a talent card or the post-graduation job-search card. Applications are made online only. As a rule, the job must have been advertised for ${AT.offre_semaines} consecutive weeks with the public employment service, unless it is a shortage occupation or the hire is a recent master's graduate paid at least ${eE(rece, 2)} gross a month. Pay cannot be below the minimum wage, ${eE(smic, 2)}. If the prefecture does not answer within ${AT.implicite_mois} months, the application counts as refused: for a filing on ${dE(depot)}, the implicit refusal arises on ${dE(imp)}. Once granted, it triggers the employer tax, ${eE(taxe, 2)} for a permanent contract at ${eE(2400)} a month.`,
    faqs: [
      { q: 'Which residence permits let me work without a work authorisation?', a: 'The private and family life card, the resident card, an EU long-term resident card issued in France, the talent cards, the job-search or business-creation card, the cards for subsidiary-protection holders and stateless people, the "Article 50 TEU" card held by British nationals, and the ICT card for the seconded assignment. Students may work without one up to 964 hours a year.' },
      { q: 'Does the provisional work authorisation still exist?', a: 'No. The provisional work authorisation (APT) was abolished on 1 April 2021. The employer must request an ordinary work authorisation through the online service whenever the employee’s permit does not allow work. The filing confirmation received after the online submission does not allow anyone to start work.' },
      { q: 'How long must the job be advertised before the application?', a: `For ${AT.offre_semaines} consecutive weeks within the six months before the application, with a public employment body such as France Travail, with no suitable candidate found. This is not required for a shortage occupation, nor for a master's or professional-degree graduate whose job matches the degree and pays at least ${eE(rece, 2)} a month.` },
      { q: 'What can I do if the prefecture never answers the authorisation request?', a: `After ${AT.implicite_mois} months without an answer, the application counts as refused. You then have ${AT.recours_mois} months to appeal to the prefect, to the Interior Minister or to the administrative court; a lawyer is not compulsory. The mini calculator works out both dates from the month you filed.` },
      { q: 'Can a receipt let me work while I wait for the card?', a: 'Only if it bears the words "autorise son titulaire à travailler" (authorises the holder to work). A renewal receipt for a card that allowed work does. For a first employee or temporary worker card, it only covers the employer that obtained the work authorisation. Some ANEF online certificates have the same effect.' },
    ],
    body: (h) => `
<h2>When an authorisation is required</h2>
<p>The rule depends on the permit the person holds, not on the job. With a VLS-TS visa or a "salarié" or "travailleur temporaire" card, an authorisation is compulsory and covers only the job it was granted for: a new contract needs a new authorisation. The same goes for the seasonal worker card, with seasonal work limited to six months a year. A residence card issued by another EU country gives no right to live or work in France: you need a long-stay visa, and the employer applies according to that visa. Minors aged 16 to 18 always need an authorisation, apprenticeships included. These cases are listed on ${h.src('sp_F2728', 'the official work authorisation page')} (in French).</p>
<h2>Permits that exempt you</h2>
<p>The employer has nothing to request when the employee holds one of the permits below. It must, however, check that the permit is genuine with the prefecture where the hire takes place at least two working days beforehand, unless the person is registered as a jobseeker with France Travail; if there is no reply within two working days, the check counts as done.</p>
${h.table(['Permit held', 'Salaried work'], [
  ['Private and family life card, resident card', 'unrestricted'],
  ['Talent card (skilled employee, Blue Card, researcher…)', 'the activity the card was issued for'],
  ['Job-search or business-creation card', `job linked to studies, above ${h.eur(rece, 2)} a month`],
  ['Student card', '964 hours a year'],
  ['ICT card (seconded employee)', 'the secondment assignment'],
  ['Employee, temporary worker, seasonal card', 'authorisation required'],
], 'Salaried work by residence permit', ['l', 'l'])}
<h2>The application: online, by the employer</h2>
<p>Applications are made only through the online service, whether the person is in France or abroad, by the employer or an agent acting for it. For an employee seconded by a company not established in France, the French client or user company files it. The procedure is not open to someone living in France without a permit: that falls under exceptional admission to residence. The application is handled by the prefect of the département where the employer has its head office or, for an intra-group secondment, where the French counterparty is based.</p>
<h2>What is examined</h2>
<p>The job: it appears on the shortage-occupation list (métiers en tension), or it was advertised for ${h.num(AT.offre_semaines)} consecutive weeks within the previous six months without a suitable candidate. The national list was set by ${h.ext(LF_TENSION, 'the order of 21 May 2025')}; Guadeloupe, French Guiana, Réunion and Martinique have their own. The employer: it meets its social obligations, has no sanctions for illegal work, assisting irregular residence, offences against the person or forgery, and provides a certificate of paid social contributions under six months old. The pay: at least the minimum wage, ${h.eur(smic, 2)} a month, or the collective-agreement minimum if higher. The request can be refused if the hire is clearly out of proportion to the company's business. Details are on ${h.src('sp_F3100', 'the page on how authorisations are granted')} and in ${h.ext(LF_TRAV, 'articles L5221-5 to L5221-11 of the Labour Code')}.</p>
<h2>Recent graduates and students</h2>
<p>Two exceptions matter for graduates. With the job-search card, or a master's obtained within the year, a job related to the degree and paying at least ${h.eur(rece, 2)} gross a month does not have to be advertised and need not be on the shortage list. A student who goes beyond 964 hours as part of the course needs an authorisation, except for an apprenticeship approved by the skills operator (OPCO). ${h.a('changement-de-statut-etudiant-salarie', 'The change-of-status page')} compares your salary with that threshold.</p>
<h2>After approval, and if refused</h2>
<p>If the employee lives abroad, the employer sends the authorisation so they can apply for a visa at the consulate. If they live in France on an employee card and the authorisation covers a permanent contract, they can start at once; for a fixed-term contract, they first switch cards and wait for a receipt that allows work. A seasonal card holder cannot change status and must go back to apply for a visa. After a notified refusal or an implicit one, at ${h.num(AT.implicite_mois)} months, the appeal period is ${h.num(AT.recours_mois)} months. For an application filed on ${h.date(depot)}, the implicit refusal arises on ${h.date(imp)} and an appeal remains possible until ${h.date(recours)}.</p>
<h2>What an employer risks without an authorisation</h2>
<p>Knowingly employing a foreign national who is not allowed to work exposes the employer to criminal penalties, with a fine per worker concerned and up to five years in prison, and to administrative ones: no public employment aid for up to five years, repayment of the previous year's aid, temporary closure of the business, exclusion from public contracts, and an administrative fine based on the guaranteed minimum rate, much higher for a repeat offence. The official page gives the amounts; it also states that fraud or a false declaration aimed at obtaining a work permit is punishable by a year in prison. Checking the permit two days before the hire is the employer's best protection.</p>
<h2>Two common misconceptions</h2>
<p>The provisional work authorisation has not existed since 1 April 2021, as ${h.src('sp_F34840', 'the official page')} points out. And regularising someone without a permit through work does not go through this procedure, but through exceptional admission to residence, described on ${h.src('sp_F16053', 'the regularisation-through-work page')}, where the prefecture may require seven years' presence. Information, not legal advice; Algerian nationals follow other rules.</p>
`,
  },
});
