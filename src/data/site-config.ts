/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://mon-titre-de-sejour.fr";
export const SITE_NAMES: Record<string, string> = {"fr": "Mon Titre de Séjour", "en": "Mon Titre de Séjour"};
export const LANG_TAGS: Record<string, string> = {"fr": "fr-FR", "en": "en-FR"};
export const OG_LOCALES: Record<string, string> = {"fr": "fr_FR", "en": "en_GB"};
export const LOCALE_TAG = 'fr-FR';
/** Une locale par langue (RECETTE §4) : « 1 234 € » en français, « €1,234 » en anglais. */
export const LOCALE_BY_LANG: Record<string, string> = { fr: 'fr-FR', en: 'en-GB' };
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-13';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"fr": "Éditeur de simulateurs sur le droit au séjour et la nationalité en France", "en": "Publisher of calculators on French residence permits and citizenship"};
export const AUTHOR_DESC: Record<string, string> = {"fr": "Radif Partners transforme les fiches de Service-Public.fr et les articles du CESEDA et du Code civil en calculs : timbres fiscaux du barème du 1er mai 2026, seuil du regroupement familial sur le Smic mois par mois, dates d'éligibilité à la carte de résident et à la nationalité, fenêtre de renouvellement. Chaque montant porte la date de la fiche officielle relue ; aucun délai de préfecture n'est publié faute de source officielle.", "en": "Radif Partners turns the official Service-Public.fr guidance and the articles of the French immigration code (CESEDA) and Civil Code into calculations: stamp duties under the 1 May 2026 schedule, the family-reunification income threshold built month by month on the minimum wage, eligibility dates for the resident card and citizenship, and the renewal window. Every amount carries the date of the official page it was read on; no prefecture waiting times are published, because no official source exists."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"fr": ["Titres de séjour (CESEDA)", "Timbres fiscaux des étrangers", "Naturalisation française", "Regroupement familial", "Passeport talent et carte bleue européenne"], "en": ["French residence permits (CESEDA)", "Residence permit stamp duties", "French naturalisation", "Family reunification in France", "Talent passport and EU Blue Card"]};
export const CONTACT_EMAIL = "contact@mon-titre-de-sejour.fr";
export const THEME_COLOR = '#1F3A5F';
export const LOGO_SYMBOL = 'TS';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau, aucun cookie, Clarity chargé en mode sans cookie (consentv2 denied).
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
export const GA4_ID = 'G-ZY9LHYK8T6';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'yx9suo85zi';
export const INDEXNOW_KEY = '8c3e1f7a92b64d0e9a5c27f4b1d6e083';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',
  legalForm: '',
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "TVA",
  vatNumber: '',
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
