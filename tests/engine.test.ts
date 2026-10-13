/** Un cas par règle officielle (RECETTE §4) : chaque attendu vient d'une fiche Service-Public datée. */
import { describe, it, expect } from 'vitest';
import { smicAt, moyenneSmic12, SMIC_ACTUEL } from '../src/lib/engine/smic';
import { coutTitre, coutParcours, timbreNationalite, hausse2026, TITRES } from '../src/lib/engine/couts';
import { naturalisation, mariage, residentEligible, absencesOk, pluriannuelleEligible, fenetreRenouvellement, vlsTs, refusImplicite, dixAnsA } from '../src/lib/engine/dates-sejour';
import { seuilRegroupement, verdictRegroupement, surfaceMin, coefFamille, regroupementDes, regroupementImplicite } from '../src/lib/engine/famille';
import { seuilsTalent, carteBleue, receSeuilOk, taxeEmployeur } from '../src/lib/engine/travail';
import { orienter } from '../src/lib/engine/arbre';
import { P } from '../src/lib/engine/params';

describe('Smic (Insee, série 1980-2026)', () => {
  it('12,31 € / 1 867,02 € depuis le 1er juin 2026', () => { expect(smicAt('2026-06-01').mensuel).toBe(1867.02); expect(SMIC_ACTUEL.horaire).toBe(12.31); });
  it('1 823,03 € de janvier à mai 2026, 1 801,80 € en 2025', () => { expect(smicAt('2026-05-31').mensuel).toBe(1823.03); expect(smicAt('2025-07-01').mensuel).toBe(1801.8); });
  it('montants annuel et net de la fiche F2300 cohérents avec le mensuel', () => { expect(Math.abs(P.smic.annuel_brut - 1867.02 * 12)).toBeLessThan(0.1); });
  it('moyenne des 12 mois avant un dépôt en octobre 2026 : 4 mois à 1 801,80, 5 à 1 823,03, 4 à 1 867,02… ', () => {
    const r = moyenneSmic12('2026-10-15');
    expect(r.mois[0].mois).toBe('2025-10-01'); expect(r.mois[11].mois).toBe('2026-09-01');
    const attendu = (3 * 1801.8 + 5 * 1823.03 + 4 * 1867.02) / 12;
    expect(r.moyenne).toBeCloseTo(attendu, 2);
  });
  it('moyenne d\'un dépôt en juin 2027 = 1 867,02 € (12 mois au même Smic)', () => { expect(moyenneSmic12('2027-06-10').moyenne).toBe(1867.02); });
});

describe('Timbres fiscaux au 1er mai 2026 (A18881, fiches des titres)', () => {
  it('salarié : 350 € (300 + 50) puis 250 € (200 + 50)', () => {
    const p = coutTitre('salarie', 'premiere'); expect(p.total).toBe(350); expect(p.lignes).toEqual([{ cle: 'taxe', montant: 300 }, { cle: 'timbre', montant: 50 }]);
    expect(coutTitre('salarie', 'renouvellement').total).toBe(250);
  });
  it('étudiant : tarif minoré 150 € puis 100 €, VLS-TS 100 €', () => { expect(coutTitre('etudiant', 'premiere').total).toBe(150); expect(coutTitre('etudiant', 'renouvellement').total).toBe(100); expect(coutTitre('etudiant', 'vls').total).toBe(100); });
  it('VLS-TS salarié : taxe de 300 € (F15898)', () => { expect(coutTitre('salarie', 'vls').total).toBe(300); });
  it('duplicata : comme une première délivrance (350 € / 150 €)', () => { expect(coutTitre('visiteur', 'duplicata').total).toBe(350); expect(coutTitre('saisonnier', 'duplicata').total).toBe(150); });
  it('retraité, étranger malade, famille de réfugié : droit de timbre de 50 € seul', () => { for (const id of ['retraite', 'etranger_malade', 'famille_refugie']) expect(coutTitre(id, 'premiere').total).toBe(50); });
  it('réfugié statutaire : gratuit (F15401)', () => { expect(coutTitre('refugie', 'premiere').total).toBe(0); });
  it('entrée sans visa : + 300 € de visa de régularisation', () => { expect(coutTitre('vpf_liens', 'premiere', { sansVisa: true }).total).toBe(650); });
  it('renouvellement hors délai : + 180 €', () => { expect(coutTitre('salarie', 'renouvellement', { retard: true }).total).toBe(430); });
  it('carte de résident : pas de VLS-TS possible', () => { expect(coutTitre('resident', 'vls').possible).toBe(false); });
  it('parcours salarié sur 3 ans : VLS-TS 300 + 1re carte 350 + renouvellement 250 = 900 €', () => { expect(coutParcours('salarie', 3).total).toBe(900); });
  it('nationalité : 255 €, 127,50 € en Guyane', () => { expect(timbreNationalite()).toBe(255); expect(timbreNationalite(true)).toBe(127.5); });
  it('hausse : 225 → 350 € (1re délivrance), 75 → 150 € (minoré)', () => { expect(hausse2026('normal', 'premiere')).toEqual({ avant: 225, apres: 350 }); expect(hausse2026('minore', 'premiere')).toEqual({ avant: 75, apres: 150 }); });
  it('chaque titre a une fiche source existante', () => { for (const t of TITRES) expect(P.sources).toHaveProperty(t.fiche); });
});

describe('Naturalisation par décret (F2213)', () => {
  it('5 ans de résidence', () => { expect(naturalisation({ debut: '2021-09-01', cas: 'general' }).eligible).toBe('2026-09-01'); });
  it('2 ans après deux années d\'études supérieures diplômantes', () => { expect(naturalisation({ debut: '2024-09-01', cas: 'diplome' }).eligible).toBe('2026-09-01'); });
  it('réfugié : aucune durée', () => { expect(naturalisation({ debut: '2025-03-10', cas: 'dispense' }).eligible).toBe('2025-03-10'); });
  it('délai légal 18 mois, prolongeable de 3 mois', () => { const r = naturalisation({ debut: '2018-01-01', cas: 'general', recepisse: '2026-02-15' }); expect(r.delaiReponse).toBe('2027-08-15'); expect(r.delaiProlonge).toBe('2027-11-15'); });
  it('12 mois avec 10 ans de résidence habituelle', () => { expect(naturalisation({ debut: '2014-01-01', cas: 'general', recepisse: '2026-02-15', dixAns: dixAnsA('2014-01-01', '2026-02-15') }).delaiReponse).toBe('2027-02-15'); });
  it('dépôt possible dès 17 ans', () => { expect(naturalisation({ debut: '2015-01-01', cas: 'general', naissance: '2010-05-20' }).depotDes).toBe('2027-05-20'); });
});

describe('Nationalité par mariage (F2726, Code civil 21-2)', () => {
  it('4 ans avec 3 ans de résidence continue en France', () => { expect(mariage({ date: '2022-06-18', residence3ans: true }).eligible).toBe('2026-06-18'); });
  it('5 ans sinon, sauf inscription consulaire du conjoint', () => { expect(mariage({ date: '2022-06-18', residence3ans: false }).annees).toBe(5); expect(mariage({ date: '2022-06-18', residence3ans: false, inscritConsulat: true }).annees).toBe(4); });
  it('refus d\'enregistrement : 1 an, 2 ans en cas d\'opposition', () => { const r = mariage({ date: '2020-01-01', residence3ans: true, recepisse: '2026-03-01' }); expect(r.refusAvant).toBe('2027-03-01'); expect(r.refusOppositionAvant).toBe('2028-03-01'); });
});

describe('Cartes de résident et pluriannuelle (F2208, F17359, F35799)', () => {
  it('résident longue durée-UE : 5 ans', () => { expect(residentEligible('2021-11-02', 'residence')).toBe('2026-11-02'); });
  it('conjoint de Français : 3 ans de mariage ; Tunisien : 1 an', () => { expect(residentEligible('2024-04-01', 'conjoint')).toBe('2027-04-01'); expect(residentEligible('2024-04-01', 'conjoint_tunisien')).toBe('2025-04-01'); });
  it('absences : 6 mois consécutifs et 10 mois au total au plus', () => { expect(absencesOk(6, 10)).toBe(true); expect(absencesOk(7, 8)).toBe(false); expect(absencesOk(5, 11)).toBe(false); });
  it('pluriannuelle au renouvellement du premier titre d\'un an', () => { expect(pluriannuelleEligible('2026-01-10')).toBe('2027-01-10'); });
});

describe('Renouvellement et VLS-TS (F2209, F15763, F16162)', () => {
  it('fenêtre : 4 mois à 2 mois avant la fin du titre, récépissé 3 mois', () => {
    const f = fenetreRenouvellement('2027-03-31', '2026-10-13');
    expect(f.ouverture).toBe('2026-11-30'); expect(f.limite).toBe('2027-01-31'); expect(f.recepisseFin).toBe('2027-07-01'); expect(f.phase).toBe('trop_tot');
  });
  it('phases', () => { expect(fenetreRenouvellement('2027-01-15', '2026-10-13').phase).toBe('ouverte'); expect(fenetreRenouvellement('2026-11-20', '2026-10-13').phase).toBe('retard'); expect(fenetreRenouvellement('2026-10-01', '2026-10-13').phase).toBe('expire'); });
  it('VLS-TS : validation dans les 3 mois', () => { const v = vlsTs('2026-09-05', '2027-09-01'); expect(v.validationAvant).toBe('2026-12-05'); expect(v.carteLimite).toBe('2027-07-01'); });
  it('refus implicite : 4 mois ou 90 jours', () => { expect(refusImplicite('2026-10-13', { mois: 4 })).toBe('2027-02-13'); expect(refusImplicite('2026-10-13', { jours: 90 })).toBe('2027-01-11'); expect(refusImplicite('2026-10-13', {})).toBeNull(); });
});

describe('Regroupement familial (F11166)', () => {
  it('coefficients 1 / 1,1 / 1,2', () => { expect(coefFamille(3)).toBe(1); expect(coefFamille(4)).toBe(1.1); expect(coefFamille(6)).toBe(1.2); expect(coefFamille(9)).toBe(1.2); });
  it('fiche F11166 : 1 867,02 / 2 053,72 / 2 240,42 € quand les 12 mois sont au Smic actuel', () => {
    expect(seuilRegroupement(2, '2027-06-15').seuil).toBe(1867.02); expect(seuilRegroupement(4, '2027-06-15').seuil).toBe(2053.72); expect(seuilRegroupement(6, '2027-06-15').seuil).toBe(2240.42);
  });
  it('dépôt en octobre 2026 : seuil sous 1 867,02 € (mois au Smic de 2025)', () => { expect(seuilRegroupement(3, '2026-10-13').seuil).toBeLessThan(1867.02); });
  it('verdict et dispense AAH', () => { expect(verdictRegroupement({ personnes: 4, depot: '2027-06-15', ressources: 2000 }).atteint).toBe(false); expect(verdictRegroupement({ personnes: 4, depot: '2027-06-15', ressources: 2000, aah: true }).atteint).toBe(true); });
  it('surface : zone A 22 m² à 2, 42 m² à 4 ; zone C 88 m² à 8, 98 m² à 10', () => { expect(surfaceMin('A', 2)).toBe(22); expect(surfaceMin('A', 4)).toBe(42); expect(surfaceMin('C', 8)).toBe(88); expect(surfaceMin('C', 10)).toBe(98); expect(surfaceMin('B', 3)).toBe(34); });
  it('18 mois de séjour, 6 mois de silence', () => { expect(regroupementDes('2025-04-01')).toBe('2026-10-01'); expect(regroupementImplicite('2026-10-13')).toBe('2027-04-13'); });
});

describe('Seuils travail (F16922, F17319, F2728)', () => {
  it('39 582 € et 59 373 € (1,5 × salaire de référence)', () => {
    const s = seuilsTalent(45000); expect(s.find((x) => x.voie === 'talent_salarie')!.atteint).toBe(true); expect(s.find((x) => x.voie === 'carte_bleue')!.atteint).toBe(false);
    expect(Math.round(P.talent.salaire_ref * P.talent.cbe_coef)).toBe(P.talent.cbe);
  });
  it('mandataire social = 3 Smic annuels', () => { expect(P.talent.mandataire).toBeCloseTo(3 * P.smic.annuel_brut, 2); });
  it('RECE : 1,5 Smic mensuel, strictement supérieur', () => { expect(P.rece.seuil_mensuel).toBeCloseTo(1.5 * 1867.02, 2); expect(receSeuilOk(2800.53)).toBe(false); expect(receSeuilOk(2801)).toBe(true); });
  it('carte bleue : contrat de 6 mois minimum, durée contrat + 3 mois sous 2 ans, 4 ans au plus', () => { expect(carteBleue(60000, 5).contratOk).toBe(false); expect(carteBleue(60000, 12).dureeMois).toBe(15); expect(carteBleue(60000, 36).dureeMois).toBe(36); expect(carteBleue(60000, 60).dureeMois).toBe(48); });
  it('taxe employeur : 74 / 210 / 300 € en contrat court', () => { expect(taxeEmployeur({ type: 'court', salaireMensuel: 1867.02 })).toBe(74); expect(taxeEmployeur({ type: 'court', salaireMensuel: 2500 })).toBe(210); expect(taxeEmployeur({ type: 'court', salaireMensuel: 3000 })).toBe(300); });
  it('taxe employeur : 55 % du salaire, plafond 2 567,15 €', () => { expect(taxeEmployeur({ type: 'long', salaireMensuel: 3000 })).toBe(1650); expect(taxeEmployeur({ type: 'long', salaireMensuel: 6000 })).toBe(2567.15); expect(taxeEmployeur({ type: 'saisonnier', salaireMensuel: 0, moisSaison: 4 })).toBe(200); });
});

describe('Arbre de décision', () => {
  it('Européen : pas de titre', () => { expect(orienter({ nationalite: 'ue', motif: 'salarie' }).horsTitre).toBe('ue'); });
  it('salaire de 62 000 € : carte bleue européenne', () => { expect(orienter({ nationalite: 'autre', motif: 'qualifie', salaire: 62000 }).principal.titre).toBe('carte_bleue'); });
  it('42 000 € avec master français : talent salarié qualifié', () => { expect(orienter({ nationalite: 'autre', motif: 'qualifie', salaire: 42000, master: true }).principal.titre).toBe('talent_salarie'); });
  it('42 000 € sans master : carte salarié', () => { expect(orienter({ nationalite: 'autre', motif: 'qualifie', salaire: 42000 }).principal.titre).toBe('salarie'); });
  it('conjoint marié depuis 1 an : résident dans 2 ans, nationalité dans 3 ans', () => { const o = orienter({ nationalite: 'autre', motif: 'conjoint', anneesMariage: 1 }); expect(o.principal.titre).toBe('vpf_conjoint'); expect(o.suite.find((s) => s.etape === 'resident')!.dans).toBe(2); expect(o.suite.find((s) => s.etape === 'mariage')!.dans).toBe(3); });
  it('famille : regroupement après 18 mois', () => { expect(orienter({ nationalite: 'autre', motif: 'famille', annees: 1 }).principal.pourquoi).toBe('regroupement_attente'); expect(orienter({ nationalite: 'autre', motif: 'famille', annees: 2 }).principal.pourquoi).toBe('regroupement_ok'); });
  it('Algérien : accord franco-algérien signalé', () => { expect(orienter({ nationalite: 'algerien', motif: 'salarie' }).horsTitre).toBe('algerien'); });
});
