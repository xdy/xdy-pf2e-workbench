import { ProficiencyRank } from "@item/data/index.ts";
import { Rarity } from "./data.ts";
/**
 * Implementation of Difficulty Classes https://2e.aonprd.com/Rules.aspx?ID=552
 * and variant rule Proficiency Without Level https://2e.aonprd.com/Rules.aspx?ID=1370
 */
type NegativeDCAdjustment = "incredibly-easy" | "very-easy" | "easy" | "normal";
type PositiveDCAdjustment = "normal" | "hard" | "very-hard" | "incredibly-hard";
type DCAdjustment = NegativeDCAdjustment | PositiveDCAdjustment;
declare function rarityToDCAdjustment(rarity?: Rarity): PositiveDCAdjustment;
declare function adjustDC(dc: number, adjustment?: DCAdjustment): number;
declare function adjustDCByRarity(dc: number, rarity?: Rarity): number;
interface DCOptions {
    proficiencyWithoutLevel?: boolean;
    rarity?: Rarity;
}
/**
 * Normal Level Based DCs
 * @param level
 * @param proficiencyWithoutLevel
 */
declare function calculateDC(level: number, { proficiencyWithoutLevel, rarity }?: DCOptions): number;
declare function calculateSimpleDC(rank: ProficiencyRank, { proficiencyWithoutLevel }?: DCOptions): number;
declare function calculateSpellDC(spellLevel: number, { proficiencyWithoutLevel }?: DCOptions): number;
/**
 * Used to shift DCs around the adjustment table Rarity increases
 * the adjustment while Lores reduce it.
 * This function determines which adjustment you start from when you
 * create a difficulty scale from incredibly easy to very hard
 *
 * Important: this operation is not associative because
 * of the lower and upper bounds
 */
declare function combineDCAdjustments(first: DCAdjustment, second: DCAdjustment): DCAdjustment;
/**
 * Given a DC made starting at an adjustment create an array of
 * growing difficulties starting from the adjusted position in
 * the table at https://2e.aonprd.com/Rules.aspx?ID=555
 */
declare function createDifficultyScale(dc: number, startAt: DCAdjustment): number[];
export { DCAdjustment, DCOptions, NegativeDCAdjustment, PositiveDCAdjustment, adjustDC, adjustDCByRarity, calculateDC, calculateSimpleDC, calculateSpellDC, combineDCAdjustments, createDifficultyScale, rarityToDCAdjustment, };
