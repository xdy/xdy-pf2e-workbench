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
    rating: ThreatRating;
    ratingXP: number;
    xpPerPlayer: number;
    totalXP: number;
    partySize: number;
    partyLevel: number;
}
type ThreatRating = keyof EncounterBudgets;
interface HazardBrief {
    level: number;
    isComplex: boolean;
}
declare function calculateXP(partyLevel: number, partySize: number, npcLevels: number[], hazards: HazardBrief[], dcOptions: DCOptions): XPCalculation;
export { xpFromEncounter } from "./dialog.ts";
export { calculateXP };
export type { ThreatRating, XPCalculation };
