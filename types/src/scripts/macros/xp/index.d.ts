import { DCOptions } from "@module/dc.ts";
export interface EncounterBudgets {
    trivial: number;
    low: number;
    moderate: number;
    severe: number;
    extreme: number;
}
interface XPCalculation {
    encounterBudgets: EncounterBudgets;
    rating: keyof EncounterBudgets;
    ratingXP: number;
    xpPerPlayer: number;
    totalXP: number;
    partySize: number;
    partyLevel: number;
}
interface HazardBrief {
    level: number;
    isComplex: boolean;
}
declare function calculateXP(partyLevel: number, partySize: number, npcLevels: number[], hazards: HazardBrief[], dcOptions: DCOptions): XPCalculation;
export { xpFromEncounter } from "./dialog.ts";
export { XPCalculation, calculateXP };
