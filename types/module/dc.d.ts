/**
 * Implementation of Difficulty Classes https://2e.aonprd.com/Rules.aspx?ID=552
 * and variant rule Proficiency Without Level https://2e.aonprd.com/Rules.aspx?ID=1370
 */
import { ProficiencyRank } from "@item/data";
import { Rarity } from "./data";
export declare type NegativeDCAdjustment = "incredibly easy" | "very easy" | "easy" | "normal";
export declare type PositiveDCAdjustment = "normal" | "hard" | "very hard" | "incredibly hard";
export declare type DCAdjustment = NegativeDCAdjustment | PositiveDCAdjustment;
export declare function rarityToDCAdjustment(rarity?: Rarity): PositiveDCAdjustment;
export declare function adjustDC(dc: number, adjustment?: DCAdjustment): number;
export declare function adjustDCByRarity(dc: number, rarity?: Rarity): number;
export interface DCOptions {
    proficiencyWithoutLevel?: boolean;
    rarity?: Rarity;
}
/**
 * Normal Level Based DCs
 * @param level
 * @param proficiencyWithoutLevel
 */
export declare function calculateDC(level: number, { proficiencyWithoutLevel, rarity }?: DCOptions): number;
export declare function calculateSimpleDC(rank: ProficiencyRank, { proficiencyWithoutLevel }?: DCOptions): number;
export declare function calculateSpellDC(spellLevel: number, { proficiencyWithoutLevel }?: DCOptions): number;
/**
 * Used to shift DCs around the adjustment table Rarity increases
 * the adjustment while Lores reduce it.
 * This function determines which adjustment you start from when you
 * create a difficulty scale from incredibly easy to very hard
 *
 * Important: this operation is not associative because
 * of the lower and upper bounds
 */
export declare function combineDCAdjustments(first: DCAdjustment, second: DCAdjustment): DCAdjustment;
/**
 * Given a DC made starting at an adjustment create an array of
 * growing difficulties starting from the adjusted position in
 * the table at https://2e.aonprd.com/Rules.aspx?ID=555
 */
export declare function createDifficultyScale(dc: number, startAt: DCAdjustment): number[];
