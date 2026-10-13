/** Petits outils communs aux mini-simulateurs (fichier ignoré par le registre : préfixe « _ »). */
import { formatMoney, formatPercent, formatNumber, displayDate } from '../format';
export type L = 'fr' | 'en';
export const T = <A>(l: L, fr: A, en: A) => (l === 'en' ? en : fr);
export const eur = (x: number, l: L, d = 0) => formatMoney(x, d, l);
export const eur2 = (x: number, l: L) => formatMoney(x, Math.abs(x % 1) > 0.004 ? 2 : 0, l);
export const pct = (x: number, l: L, d = 1) => formatPercent(x, d, l);
export const num = (x: number, l: L, d = 0) => formatNumber(x, d, l);
export const date = (iso: string, l: L) => displayDate(iso, l === 'en' ? 'en-GB' : 'fr-FR');
const MOIS = { fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'], en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
/** « mars 2027 » / « March 2027 » à partir d'une date ISO. */
export const moisAnnee = (iso: string, l: L) => { const [y, m] = iso.split('-').map(Number); return `${MOIS[l][m - 1]} ${y}`; };
export const moisOptions = (l: L) => MOIS[l].map((m, i) => ({ value: String(i + 1), label: m }));
/** Date ISO du 1er du mois à partir d'un mois (1-12) et d'une année. */
export const isoMois = (m: number, y: number) => `${Math.round(y)}-${String(Math.min(12, Math.max(1, Math.round(m)))).padStart(2, '0')}-01`;
export const yn = (l: L) => [{ value: '0', label: T(l, 'Non', 'No') }, { value: '1', label: T(l, 'Oui', 'Yes') }];
