import { ProficiencyRank } from "@item/data";
import { CoinsPF2e } from "@item/physical/helpers";
import { calculateDC } from "@module/dc";
import { DegreeIndex, RollBrief } from "@system/degree-of-success";
/**
 * Implementation of Earn Income rules on https://2e.aonprd.com/Skills.aspx?ID=2&General=true
 */
declare type TrainedProficiency = Exclude<ProficiencyRank, "untrained">;
declare type Rewards = Record<TrainedProficiency, CoinsPF2e>;
declare type IncomeForLevel = {
    failure: CoinsPF2e;
    rewards: Rewards;
};
declare function getIncomeForLevel(level: number): IncomeForLevel;
interface PerDayEarnIncomeResult {
    rewards: CoinsPF2e;
    degreeOfSuccess: DegreeIndex;
}
interface EarnIncomeOptions {
    useLoreAsExperiencedProfessional: boolean;
}
/**
 * @param level number between 0 and 20
 * @param days how many days you want to work for
 * @param rollBrief the die result and total modifier of a check roll
 * @param proficiency proficiency in the relevant skill
 * @param options feats or items that affect earn income
 * @param dcOptions if dc by level is active
 */
declare function earnIncome({ level, days, rollBrief, proficiency, options, dc }: EarnIncomeParams): EarnIncomeResult;
interface EarnIncomeParams {
    level: number;
    days: number;
    rollBrief: RollBrief;
    proficiency: TrainedProficiency;
    options: EarnIncomeOptions;
    dc: number;
}
interface EarnIncomeResult {
    rewards: {
        perDay: CoinsPF2e;
        combined: CoinsPF2e;
    };
    degreeOfSuccess: DegreeIndex;
    daysSpentWorking: number;
    level: number;
    dc: number;
    roll: number;
}
export { EarnIncomeOptions, EarnIncomeResult, PerDayEarnIncomeResult, TrainedProficiency, calculateDC, earnIncome, getIncomeForLevel, };
