/**
 * Rules are implemented as described in https://2e.aonprd.com/Rules.aspx?ID=575
 * including the variant rules for proficiency without level https://2e.aonprd.com/Rules.aspx?ID=1371
 */
import { DCOptions } from "@module/dc";
interface HazardLevel {
    level: number;
    isComplex: boolean;
}
export interface EncounterBudgets {
    trivial: number;
    low: number;
    moderate: number;
    severe: number;
    extreme: number;
}
interface XP {
    encounterBudgets: EncounterBudgets;
    rating: keyof EncounterBudgets;
    ratingXP: number;
    xpPerPlayer: number;
    totalXP: number;
    partySize: number;
    partyLevel: number;
}
export declare function calculateXP(partyLevel: number, partySize: number, npcLevels: number[], hazards: HazardLevel[], dcOptions: DCOptions): XP;
export {};
