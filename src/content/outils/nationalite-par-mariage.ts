import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { mariage } from '../../lib/engine/dates-sejour';
import { timbreNationalite } from '../../lib/engine/couts';
import { formatMoney, displayDate } from '../../lib/format';

// Valeurs par défaut du calculateur : mariage du 9 juillet 2022, 3 ans en France, récépissé du 1er décembre 2026.
const M = P.mariage;
const def = mariage({ date: '2022-07-09', residence3ans: true, recepisse: '2026-12-01' });
const etr = mariage({ date: '2022-07-09', residence3ans: false });
const cons = mariage({ date: '2022-07-09', residence3ans: false, inscritConsulat: true });
const LF = 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070721/LEGISCTA000006165440';
const eF = (x: number, d = 0) => formatMoney(x, d, 'fr'), eE = (x: number, d = 0) => formatMoney(x, d, 'en');
const dF = (s: string) => displayDate(s, 'fr-FR'), dE = (s: string) => displayDate(s, 'en-GB');

export default defineGuide({
  id: 'nationalite-par-mariage',
  group: 'nationalite',
  order: 20,
  tool: 'mariage',
  related: ['conjoint-de-francais', 'naturalisation-francaise', 'niveau-de-francais-exige', 'carte-de-resident', 'dossier-naturalisation'],
  sources: ['sp_F2726', 'cciv_21_1', 'sp_F11926', 'decret_93_1362'],
  fr: {
    slug: 'nationalite-par-mariage',
    nav: 'Nationalité par mariage',
    card: 'Quatre ou cinq ans de mariage selon votre résidence : la date de la déclaration et le délai de refus.',
    title: 'Nationalité par mariage 2026 : date de déclaration, 4 ans',
    description: 'Nationalité française par mariage 2026 : 4 ans de mariage, 5 ans sans 3 ans de résidence en France, niveau B2, timbre et un an pour refuser l’enregistrement.',
    h1: 'Nationalité par mariage : quand faire la déclaration',
    intro: 'Entrez la date du mariage et votre résidence depuis : le simulateur donne le jour à partir duquel la déclaration est recevable et le délai de refus.',
    resume: `Le conjoint étranger d’un Français peut devenir français par une simple déclaration, sans décret, après ${M.duree_ans} ans de mariage à la date de la déclaration. Cette durée passe à ${M.duree_longue_ans} ans si, depuis le mariage, il n’a pas résidé en France de façon ininterrompue pendant au moins ${M.residence_continue_ans} ans, sauf si son conjoint français était inscrit au registre des Français établis hors de France pendant leur vie commune à l’étranger. Pour un mariage du 9 juillet 2022, la déclaration est recevable le ${dF(def.eligible)} après trois ans en France, le ${dF(etr.eligible)} sinon. L’enfant commun ne raccourcit pas ce délai, contrairement à ce qu’affirment certains sites. Il faut aussi une communauté de vie affective et matérielle continue, un mariage transcrit s’il a été célébré à l’étranger, le niveau ${P.naturalisation.langue} en français et un timbre de ${eF(timbreNationalite())}. Après l’entretien, le ministère a ${M.refus_ans} an pour refuser l’enregistrement, ${M.refus_opposition_ans} ans s’il engage une opposition.`,
    faqs: [
      { q: 'Avoir un enfant avec son conjoint français raccourcit-il les quatre ans ?', a: `Non. La fiche officielle ne prévoit que deux durées, ${M.duree_ans} ou ${M.duree_longue_ans} ans, selon la résidence en France depuis le mariage et l’inscription consulaire du conjoint. Un enfant commun ne figure pas parmi les conditions. Les actes de naissance des enfants servent seulement à prouver la communauté de vie et à rendre français, le cas échéant, les enfants mineurs.` },
      { q: 'Que vérifie l’entretien de la déclaration par mariage ?', a: 'Vous êtes convoqués tous les deux. L’agent vérifie la réalité de votre communauté de vie et votre assimilation à la société française, contrôle les originaux de vos pièces d’identité et vous fait signer une attestation sur l’honneur que la vie commune n’a pas cessé depuis le mariage. Le récépissé remis à la fin de l’entretien fait courir le délai de refus.' },
      { q: 'Faut-il passer l’examen civique pour la nationalité par mariage ?', a: `Non. L’examen civique ne concerne que les procédures par décret, naturalisation et réintégration. La déclaration par mariage exige en revanche le même niveau ${P.naturalisation.langue} en français, à l’oral et à l’écrit, prouvé par un diplôme français ou un test TCF ou TEF de moins de deux ans. Une dispense existe seulement si votre santé ou un handicap rend l’évaluation impossible.` },
      { q: 'Que se passe-t-il si la déclaration n’est pas refusée dans le délai ?', a: `Le ministère doit refuser l’enregistrement dans un délai d’${M.refus_ans} an à partir du récépissé, ${M.refus_opposition_ans} ans en cas d’opposition pour indignité ou défaut d’assimilation. Si les conditions sont remplies, la déclaration est enregistrée et la préfecture vous en remet un exemplaire. Pour un récépissé du 1er décembre 2026, le refus doit intervenir avant le ${dF(def.refusAvant!)}.` },
    ],
    body: (h) => `
<h2>Ce que calcule le simulateur</h2>
<p>Il ajoute à la date du mariage ${h.num(M.duree_ans)} ans si vous avez vécu au moins ${h.num(M.residence_continue_ans)} ans sans interruption en France depuis le mariage, ou si votre conjoint était inscrit au registre consulaire pendant votre vie commune à l’étranger ; ${h.num(M.duree_longue_ans)} ans dans les autres cas. Avec la date du récépissé remis après l’entretien, il donne la date limite à laquelle le ministère peut refuser l’enregistrement. Ces règles viennent de ${h.src('sp_F2726', 'la fiche Déclaration de nationalité française par mariage')} et des ${h.ext(LF, 'articles 21-1 à 21-6 du Code civil')}.</p>
${h.table(['Situation depuis le mariage du 9 juillet 2022', 'Durée exigée', 'Déclaration recevable'], [
  ['Trois ans ou plus en France', `${h.num(M.duree_ans)} ans`, h.date(def.eligible)],
  ['Moins de trois ans en France, conjoint non inscrit au consulat', `${h.num(M.duree_longue_ans)} ans`, h.date(etr.eligible)],
  ['Moins de trois ans en France, conjoint inscrit au consulat', `${h.num(M.duree_ans)} ans`, h.date(cons.eligible)],
], undefined, ['l', 'r', 'r'])}
<h2>Les conditions qui ne se calculent pas</h2>
<p>Votre conjoint devait être français le jour du mariage et l’être resté. Le mariage célébré à l’étranger doit être transcrit sur les registres de l’état civil français. Vous devez avoir un titre de séjour valide au dépôt (sauf Européen ou Suisse) et ne pas être sous le coup d’une expulsion. Une condamnation à six mois de prison ferme ou plus empêche la déclaration. La déclaration se dépose à la plateforme de naturalisation de votre domicile, au guichet ou par courrier selon les plateformes, avec le formulaire cerfa 15277 signé par les deux époux.</p>
<h2>Décret ou déclaration ?</h2>
<p>Si vous résidez en France depuis plus de ${h.num(P.naturalisation.residence_ans)} ans, la ${h.a('naturalisation-francaise', 'naturalisation par décret')} peut être possible avant les quatre ans de mariage, mais elle est discrétionnaire et demande l’examen civique. La déclaration, elle, est enregistrée dès que les conditions légales sont remplies. Information, pas un conseil juridique.</p>
`,
  },
  en: {
    slug: 'citizenship-by-marriage',
    nav: 'Citizenship through marriage',
    card: 'Four or five years of marriage depending on residence: your declaration date and the refusal deadline.',
    title: 'Citizenship by Marriage France 2026: 4 or 5 Years, Your Date',
    description: 'Citizenship by marriage in France 2026: four years married, five without three years here, B2 French, the stamp and one year for the ministry to refuse it.',
    h1: 'Citizenship through marriage: when you can make the declaration',
    intro: 'Enter your wedding date and where you have lived since: the calculator shows when the declaration becomes admissible and the refusal deadline.',
    resume: `The foreign spouse of a French national can become French by declaration (déclaration de nationalité), with no decree, after ${M.duree_ans} years of marriage on the day of the declaration. That becomes ${M.duree_longue_ans} years if, since the wedding, the spouse has not lived in France without interruption for at least ${M.residence_continue_ans} years, unless the French partner was registered with the consulate (registre des Français établis hors de France) while the couple lived abroad. For a wedding on 9 July 2022, the declaration is admissible on ${dE(def.eligible)} after three years in France, otherwise on ${dE(etr.eligible)}. Having a child together does not shorten this, whatever some websites claim. You also need a continuous shared life, emotional and material, a marriage registered in France if it took place abroad, ${P.naturalisation.langue}-level French and a ${eE(timbreNationalite())} tax stamp. After the interview, the ministry has ${M.refus_ans} year to refuse registration, ${M.refus_opposition_ans} years if it lodges an objection.`,
    faqs: [
      { q: 'Does having a child with my French spouse shorten the four years?', a: `No. The official guidance sets only two periods, ${M.duree_ans} or ${M.duree_longue_ans} years, depending on residence in France since the wedding and the spouse’s consular registration. A child together is not one of the conditions. Children’s birth certificates only help prove your shared life and, where relevant, make minor children French along with you.` },
      { q: 'What is checked at the marriage-declaration interview?', a: 'You are both called in. The officer checks that you genuinely live together and that you are assimilated into French society, inspects your original identity documents and has you sign a sworn statement that your shared life has not stopped since the wedding. The receipt (récépissé) handed over at the end starts the refusal deadline.' },
      { q: 'Is the civic exam required for citizenship by marriage?', a: `No. The civic exam only applies to the decree procedures, naturalisation and reinstatement. The marriage declaration does require the same ${P.naturalisation.langue} French level, spoken and written, proved by a French diploma or a TCF or TEF test less than two years old. An exemption exists only when health or a disability makes assessment impossible.` },
      { q: 'What happens if the declaration is not refused in time?', a: `The ministry must refuse registration within ${M.refus_ans} year of the receipt, or ${M.refus_opposition_ans} years if it objects on grounds of unworthiness or lack of assimilation. If the conditions are met, the declaration is registered and the prefecture gives you a copy. For a receipt dated 1 December 2026, any refusal must come before ${dE(def.refusAvant!)}.` },
    ],
    body: (h) => `
<h2>What the calculator works out</h2>
<p>It adds ${h.num(M.duree_ans)} years to the wedding date if you have lived at least ${h.num(M.residence_continue_ans)} years without interruption in France since the wedding, or if your spouse was registered with the consulate while you lived abroad together; ${h.num(M.duree_longue_ans)} years otherwise. With the date of the receipt issued after the interview, it gives the last date on which the ministry may refuse registration. The rules come from ${h.src('sp_F2726', 'the official page on the declaration by marriage')} and ${h.ext(LF, 'articles 21-1 to 21-6 of the Civil Code')}.</p>
${h.table(['Situation since the wedding of 9 July 2022', 'Period required', 'Declaration admissible'], [
  ['Three years or more in France', `${h.num(M.duree_ans)} years`, h.date(def.eligible)],
  ['Under three years in France, spouse not registered abroad', `${h.num(M.duree_longue_ans)} years`, h.date(etr.eligible)],
  ['Under three years in France, spouse registered with the consulate', `${h.num(M.duree_ans)} years`, h.date(cons.eligible)],
], undefined, ['l', 'r', 'r'])}
<h2>Conditions no calculator can check</h2>
<p>Your spouse must have been French on the wedding day and still be French. A marriage celebrated abroad must be entered in the French civil registers (transcription). You need a valid residence permit when you file (EU and Swiss nationals excepted) and must not be subject to an expulsion order. A prison sentence of six months or more without suspension bars the declaration. The file goes to the naturalisation platform for your home address, in person or by post depending on the platform, with form cerfa 15277 signed by both spouses.</p>
<h2>Decree or declaration?</h2>
<p>If you have lived in France for more than ${h.num(P.naturalisation.residence_ans)} years, ${h.a('naturalisation-francaise', 'naturalisation by decree')} may be possible before the four years of marriage, but it is discretionary and requires the civic exam. The declaration is registered once the legal conditions are met. This is information, not legal advice.</p>
`,
  },
});
