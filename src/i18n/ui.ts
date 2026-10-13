import type { Locale } from './routes';
const fr = {
  updatedOn: 'Mis à jour le', editorialPolicy: 'Charte éditoriale', contactLabel: 'Contact', reviewedBy: 'Vérifié par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d’Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Questions fréquentes', relatedCalculators: 'Pages et simulateurs liés', sourcesTitle: 'Sources officielles', writtenBy: 'Rédigé par',
  asOf: 'Règles en vigueur', lastUpdated: 'vérifiées le', footerValidated: 'Fondé sur le CESEDA, le Code civil, la loi de finances pour 2026 et les fiches de Service-Public.fr relues le 13 octobre 2026', footerBrowser: 'Calcul dans votre navigateur · aucune donnée transmise · gratuit, sans inscription',
  footerDisclaimer: 'Information, pas un conseil juridique. Site indépendant de l’administration, édité par Radif Partners : il n’est lié ni au ministère de l’Intérieur, ni aux préfectures, ni à l’OFII, ni à l’ANEF, ni à un cabinet d’avocats. Seule la préfecture (ou le ministère pour la nationalité) décide de votre dossier. Nous ne collectons aucune coordonnée et ne vendons aucun service.', footerPopular: '', notFound: 'Cette page n’existe pas.',
  readMore: 'Lire la suite',
};
const en: typeof fr = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Frequently asked questions', relatedCalculators: 'Related pages and calculators', sourcesTitle: 'Official sources', writtenBy: 'Written by',
  asOf: 'Rules in force', lastUpdated: 'checked on', footerValidated: 'Based on the French immigration code (CESEDA), the Civil Code, the 2026 Finance Act and the Service-Public.fr pages read on 13 October 2026', footerBrowser: 'Runs in your browser · no data sent · free, no sign-up',
  footerDisclaimer: 'Information, not legal advice. An independent website, not run by the French administration: published by Radif Partners, with no link to the Interior Ministry, the prefectures, OFII, the ANEF portal or any law firm. Only the prefecture (or the ministry, for citizenship) decides on your application. We collect no contact details and sell no service.', footerPopular: '', notFound: 'This page does not exist.',
  readMore: 'Read more',
};
export function t(lang: Locale) { return lang === 'en' ? en : fr; }
