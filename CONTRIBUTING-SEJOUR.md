# Ajouter ou étoffer une page de SimulSéjour (fr-sejour)

Notice pour les agents qui prolongent le site (titres de séjour, nationalité, visas ; fr + en). À lire avec `~/Documents/GitHub/RECETTE-SITE.md` §0, §3, §6, §7, §9.3, §11, §21, §26.

## Principe : une page = un fichier

- `src/content/outils/<id>.ts` : page outil (`tool:`), un calculateur complet s'affiche en tête ; au moins 560 mots au total (corps + résumé + FAQ) par langue, 3 à 8 questions.
- `src/content/guides/<id>.ts` : guide, avec un mini-simulateur (`mini:`, fichier `src/lib/minis/<kind>.ts`) ; au moins 1 250 mots au total par langue, 4 à 8 questions.
- Chaque fichier porte `fr` et `en` : slug, nav, card, title (50 à 60 caractères, terme-clé en tête, « 2026 » dedans, jamais le pays ni « French » en tête), description (150 à 160, « 2026 »), h1, intro (une phrase), resume (UN paragraphe ≥ 120 mots avec les chiffres), faqs (réponses de 40 à 90 mots), body(h).
- Le cœur (routes, menus, sitemap, hreflang, schémas, cartes « pages associées ») lit ces fichiers : ne modifiez aucun fichier du cœur pour ajouter une page. Modèle : `src/content/outils/cout-titre-de-sejour.ts`.
- Liste fermée des pages : `tests/planned-ids.json`. Un lien `h.a(id, texte)` vers une page prévue est valide.
- Contrôle d'une page : `PAGE_FILES=<id> npx vitest run tests/pages.test.ts`.

## Les données (jamais de montant en dur)

| Fichier | Contenu | Origine |
|---|---|---|
| `src/data/params-2026.json` | Barème des timbres du 1er mai 2026, Smic (série), seuils talent, regroupement familial, durées, délais légaux, 70 sources datées | Fiches Service-Public relues le 2026-10-13, Insee, arrêtés cités |
| `research/service-public/F*.md` | Texte structuré de 62 fiches Service-Public (Licence ouverte Etalab 2.0), date de vérification en tête | `curl` + conversion le 2026-10-13 |
| `research/service-public/_index.json` | Titre, date et liste « Textes de loi et références » (articles CESEDA, Code civil, arrêtés, liens Légifrance) de chaque fiche | idem |

Moteurs testés (`tests/engine.test.ts`, 54 cas) : `src/lib/engine/couts.ts` (timbres par titre et démarche, parcours), `smic.ts` (Smic à une date, moyenne des 12 mois), `famille.ts` (seuil et logement du regroupement familial), `dates-sejour.ts` (naturalisation, mariage, carte de résident, pluriannuelle, renouvellement, VLS-TS, refus implicite), `travail.ts` (seuils talent, carte bleue, RECE, taxe employeur), `arbre.ts` (orientation « quel titre »).

Dans une page, calculez les exemples avec ces fonctions et écrivez-les avec `formatMoney`/`displayDate` ou les helpers `h.eur`, `h.num`, `h.date`, `h.table`, `h.src(clé)`, `h.ext(url, texte)`, `h.a(id, texte)`. Un montant en euros vient toujours de `P` ou d'un moteur. Une durée réglementaire (« 5 ans », « 3 mois ») vient de `P` quand elle y figure.

## Règles propres au site

- **Aucun délai de préfecture.** Aucune source officielle ne publie de délai moyen : on le dit, et on calcule seulement les délais légaux (silence valant refus, délai de réponse en nationalité).
- **Pas de conseil individuel ni de renvoi commercial** : ni avocat nommé, ni plateforme de rendez-vous, ni école de langue. On peut citer l'OFII, la préfecture, les points d'accès au droit, les associations d'aide aux étrangers en général.
- **Avertissement** : « information, pas un conseil juridique ; site indépendant de l'administration » (pied de page de chaque page ; à reprendre dans le corps quand le sujet s'y prête).
- **Légifrance** répond 403 aux robots : on cite l'article tel que la fiche Service-Public le référence, avec le lien Légifrance de `_index.json` (via `h.ext`).
- **Anglais** : pour un étranger qui vit en France ; chaque terme français gardé et expliqué à sa première apparition (titre de séjour, récépissé, préfecture, timbre fiscal…). Même faits, autre texte : jamais une traduction mot à mot.
- **Français** : pas de tiret cadratin ; espaces insécables gérées au build.
- **Unicité** : aucune question de FAQ partagée entre deux pages ; pas deux pages à plus de 30 % de texte commun (`check-unique.py`).
- **Algériens** : accord franco-algérien de 1968, règles propres ; on le signale.

## Contrôles (tous à 0)

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/fr-sejour
export NODE_PATH=$(npm root -g):$PWD/node_modules
npm run build && npx vitest run
python3 scripts/check-seo.py . ; python3 scripts/check-trame.py . ; python3 scripts/check-unique.py dist
python3 scripts/check-simulateurs.py . ; python3 scripts/check-hreflang.py . ; python3 scripts/check-anglais.py .
python3 scripts/check-regles.py . ; python3 scripts/check-portefeuille.py . ; python3 scripts/check-cookies.py . ; python3 scripts/check-snippets.py .
node scripts/check-legal.mjs . ; node scripts/check-sources.mjs . ; node scripts/check-contraste.mjs dist ; node scripts/check-saisie.mjs dist --max=60
node scripts/check-nombres.mjs dist ; node scripts/typo-nbsp.mjs dist --check ; node scripts/check-url-propre.mjs dist ; node scripts/check-premier-ecran.mjs .
node scripts/check-layout.mjs dist
```

Serveur local : port 4571 (`npm run preview`). Arrêt : `lsof -ti tcp:4571 | xargs kill`.

## Mise à jour annuelle

1. **Loi de finances** : relire l'actualité Service-Public sur les taxes des étrangers et `params-2026.json > tarifs` ; garder l'ancien barème dans `tarifs.anciens`.
2. **Smic** : ajouter chaque revalorisation dans `smic.historique` (série Insee 1375188) ; le seuil du regroupement familial suit seul.
3. **Salaire de référence** (passeport talent, carte bleue) : nouvel arrêté annuel, `talent.salaire_ref` et `talent.cbe`.
4. Relire chaque fiche citée (`research/service-public/_index.json`), mettre `retrieved_at` à jour, relancer `npx vitest run`.

## Ce qu'on ne fait pas

Pas de dépôt GitHub, pas de push, pas de DNS sans validation de l'éditeur. Ne pas toucher `_trame` ni la RECETTE. Aucune identité personnelle (éditeur : Radif Partners). Aucun lien vers un autre site du portefeuille. Aucune collecte de coordonnées.
