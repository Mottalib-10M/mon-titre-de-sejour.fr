import { route, type Locale } from './routes';
import { PAGES, pageById } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  fr: { home: 'Accueil', method: 'Méthode', about: 'À propos', widget: 'Intégrer un simulateur', contact: 'Contact', editorial: 'Charte éditoriale', privacy: 'Confidentialité', terms: 'Mentions légales', cookies: 'Cookies' },
  en: { home: 'Home', method: 'Method', about: 'About', widget: 'Embed a calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
};
export const GROUP_LABEL: Record<Locale, Record<Group, string>> = {
  fr: { calculs: 'Simulateurs', titres: 'Titres de séjour', travail: 'Travail et talent', famille: 'Famille', nationalite: 'Nationalité', demarches: 'Démarches et délais' },
  en: { calculs: 'Calculators', titres: 'Residence permits', travail: 'Work and talent', famille: 'Family', nationalite: 'Citizenship', demarches: 'Procedures and deadlines' },
};
export const GROUP_ORDER: Group[] = ['calculs', 'titres', 'travail', 'famille', 'nationalite', 'demarches'];
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? pageById(id)?.[lang].nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUP_ORDER.map((g) => ({ label: GROUP_LABEL[lang][g], links: inGroup(g, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [...navCategories(lang), { label: lang === 'fr' ? 'Ce site' : 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) }];
export const popularLinks = (_lang: Locale): NavLink[] => [];
