/** Libellés partagés par les simulateurs (deux langues). */
import { P } from '../../lib/engine/params';
import { TITRES } from '../../lib/engine/couts';
import { fmt, type L } from './i18n';

export const titreLabel = (id: string, l: L) => TITRES.find((t) => t.id === id)?.label[l] ?? id;
export const titreOptions = (l: L, filtre?: (id: string) => boolean) => TITRES.filter((t) => !filtre || filtre(t.id)).map((t) => ({ value: t.id, label: t.label[l] }));
export const ficheUrl = (key: string) => (P.sources as Record<string, { url: string }>)[key]?.url;

export const LIGNE: Record<string, { fr: string; en: string }> = {
  taxe: { fr: 'Taxe', en: 'Tax' },
  timbre: { fr: 'Droit de timbre', en: 'Stamp duty' },
  vls: { fr: 'Taxe de validation du VLS-TS', en: 'VLS-TS validation tax' },
  regularisation: { fr: 'Visa de régularisation', en: 'Regularisation visa fee' },
  retard: { fr: 'Dépôt hors délai', en: 'Late filing' },
  nationalite: { fr: 'Timbre de nationalité', en: 'Citizenship stamp' },
};

export const OP: Record<string, { fr: string; en: string }> = {
  premiere: { fr: 'Première délivrance', en: 'First issue' },
  renouvellement: { fr: 'Renouvellement', en: 'Renewal' },
  duplicata: { fr: 'Duplicata (perte, vol)', en: 'Replacement (loss, theft)' },
  vls: { fr: 'Validation du VLS-TS', en: 'VLS-TS validation' },
};

export const TARIF: Record<string, { fr: string; en: string }> = {
  normal: { fr: 'Tarif normal', en: 'Standard rate' },
  minore: { fr: 'Tarif minoré', en: 'Reduced rate' },
  timbre_seul: { fr: 'Droit de timbre seul', en: 'Stamp duty only' },
  gratuit: { fr: 'Gratuit', en: 'Free' },
};

/** Raisons affichées par l'arbre de décision (montants tirés des paramètres). */
const fr = fmt('fr'), en = fmt('en');
const e = (x: number) => ({ fr: fr.eur2(x), en: en.eur2(x) });
const CBE = e(P.talent.cbe), TAL = e(P.talent.salaire_ref), SMIC = e(P.smic.historique[P.smic.historique.length - 1].mensuel), ETU = e(P.etudiant.ressources_mensuelles), VIS = e(P.visiteur.ressources_mensuelles_net), INV = e(P.talent.createur_investissement), TIM = e(P.tarifs.droit_timbre);
export const POURQUOI: Record<string, { fr: string; en: string }> = {
  ue_libre: { fr: 'Citoyen de l’UE, de l’EEE ou suisse : aucun titre de séjour n’est obligatoire pour vivre et travailler en France.', en: 'EU, EEA or Swiss citizen: no residence permit is required to live and work in France.' },
  cbe_seuil: { fr: `Salaire au moins égal à ${CBE.fr} brut par an, diplôme de 3 ans d’études supérieures (ou 5 ans d’expérience) et contrat d’au moins 6 mois.`, en: `Salary of at least ${CBE.en} gross a year, a three-year degree (or five years' experience) and a contract of at least six months.` },
  talent_seuil: { fr: `Diplôme français au moins équivalent au master et salaire d’au moins ${TAL.fr} brut par an (contrat de plus de 3 mois).`, en: `A French degree at least equivalent to a master’s and a salary of at least ${TAL.en} gross a year (contract over three months).` },
  sous_seuil_talent: { fr: 'Sous les seuils de la carte talent : carte « salarié », avec une autorisation de travail demandée par l’employeur.', en: 'Below the talent-card thresholds: the “salarié” card, with a work authorisation requested by the employer.' },
  salarie_autorisation: { fr: 'Contrat de travail en France : l’employeur demande l’autorisation de travail, puis vous demandez le visa ou la carte.', en: 'A job in France: the employer applies for the work authorisation, then you apply for the visa or card.' },
  contrat_court: { fr: 'Contrat de moins de 12 mois : carte « travailleur temporaire ».', en: 'Contract under 12 months: the “travailleur temporaire” card.' },
  entreprise_smic: { fr: `Activité viable qui doit procurer au moins le Smic (${SMIC.fr} par mois).`, en: `A viable business expected to bring in at least the minimum wage (${SMIC.en} a month).` },
  talent_createur: { fr: `Projet d’entreprise avec au moins ${INV.fr} d’investissement : carte « talent – porteur de projet ».`, en: `A business project with at least ${INV.en} invested: the “talent – business founder” card.` },
  etudes_ressources: { fr: `Inscription dans un établissement d’enseignement et ressources d’au moins ${ETU.fr} par mois.`, en: `Enrolment in a school or university and resources of at least ${ETU.en} a month.` },
  mobilite: { fr: 'Programme de mobilité de l’Union européenne ou accord entre établissements.', en: 'An EU mobility programme or an agreement between institutions.' },
  apres_diplome: { fr: 'Après le diplôme : carte « recherche d’emploi ou création d’entreprise ».', en: 'After graduating: the job-search or business-creation card.' },
  conjoint_francais: { fr: 'Marié avec un ou une Français(e), communauté de vie effective, mariage transcrit s’il a eu lieu à l’étranger.', en: 'Married to a French national, living together, with the marriage registered in France if it took place abroad.' },
  parent_francais: { fr: 'Parent d’un enfant français mineur résidant en France, et contribution effective à son entretien.', en: 'Parent of a French minor living in France, contributing to the child’s upkeep.' },
  regroupement_ok: { fr: 'Votre conjoint ou parent réside en France depuis au moins 18 mois : la procédure de regroupement familial est ouverte.', en: 'Your spouse or parent has lived in France for at least 18 months: family reunification is open.' },
  regroupement_attente: { fr: 'Le regroupement familial exige 18 mois de séjour régulier du demandeur en France : la demande n’est pas encore possible.', en: 'Family reunification needs 18 months of lawful residence by the sponsor: the application is not yet possible.' },
  liens_familiaux: { fr: 'Liens personnels et familiaux en France (ancienneté, intensité, stabilité).', en: 'Personal and family ties in France (length, closeness, stability).' },
  pension_france: { fr: 'Pension de retraite servie par un régime français et résidence habituelle hors de France.', en: 'A pension from a French scheme while living mainly outside France.' },
  ressources_propres: { fr: `Ressources propres d’au moins le Smic net (${VIS.fr} par mois) et engagement de ne pas travailler.`, en: `Own resources of at least the net minimum wage (${VIS.en} a month) and a commitment not to work.` },
  soins: { fr: 'État de santé qui exige des soins indisponibles dans le pays d’origine (avis médical de l’OFII).', en: 'A health condition needing care that is not available in the home country (OFII medical opinion).' },
  protection: { fr: 'Statut de réfugié accordé par l’OFPRA ou la CNDA : carte de résident de 10 ans, gratuite.', en: 'Refugee status granted by OFPRA or the CNDA: a free 10-year resident card.' },
  famille_protection: { fr: `Conjoint et enfants d’un réfugié ou d’un protégé subsidiaire : droit de timbre de ${TIM.fr}.`, en: `Spouse and children of a refugee or subsidiary-protection holder: ${TIM.en} stamp duty.` },
  sans_titre: { fr: 'Sans titre de séjour : seule l’admission exceptionnelle au séjour (circulaire du 23 janvier 2025) reste possible, au cas par cas.', en: 'Without a permit: only exceptional admission (circular of 23 January 2025) remains, case by case.' },
};

export const ETAPE: Record<string, { fr: string; en: string }> = {
  pluriannuelle: { fr: 'Carte pluriannuelle (A2 et examen civique)', en: 'Multi-year card (A2 French, civic exam)' },
  resident: { fr: 'Carte de résident (B1 et examen civique)', en: 'Resident card (B1 French, civic exam)' },
  naturalisation: { fr: 'Naturalisation par décret (B2)', en: 'Naturalisation by decree (B2 French)' },
  mariage: { fr: 'Nationalité par mariage (B2)', en: 'Citizenship through marriage (B2 French)' },
};
