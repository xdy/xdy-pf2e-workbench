/**
 * Implementation of Earn Income rules on https://2e.aonprd.com/Skills.aspx?ID=2&General=true
 */
import { ProficiencyRank } from "@item/data";
import { Coins } from "@item/treasure/helpers";
import { DCOptions } from "@module/dc";
import { DegreeIndex, RollBrief } from "@system/degree-of-success";
export declare type TrainedProficiencies = Exclude<ProficiencyRank, "untrained">;
declare type Rewards = {
    [rank in TrainedProficiencies]: Partial<Coins>;
};
declare const earnIncomeTable: {
    0: {
        failure: {
            cp: number;
        };
        rewards: Rewards;
    };
    1: {
        failure: {
            cp: number;
        };
        rewards: Rewards;
    };
    2: {
        failure: {
            cp: number;
        };
        rewards: Rewards;
    };
    3: {
        failure: {
            cp: number;
        };
        rewards: Rewards;
    };
    4: {
        failure: {
            sp: number;
        };
        rewards: Rewards;
    };
    5: {
        failure: {
            sp: number;
        };
        rewards: Rewards;
    };
    6: {
        failure: {
            sp: number;
        };
        rewards: Rewards;
    };
    7: {
        failure: {
            sp: number;
        };
        rewards: Rewards;
    };
    8: {
        failure: {
            sp: number;
        };
        rewards: Rewards;
    };
    9: {
        failure: {
            sp: number;
        };
        rewards: Rewards;
    };
    10: {
        failure: {
            sp: number;
        };
        rewards: Rewards;
    };
    11: {
        failure: {
            sp: number;
        };
        rewards: Rewards;
    };
    12: {
        failure: {
            sp: number;
        };
        rewards: Rewards;
    };
    13: {
        failure: {
            gp: number;
        };
        rewards: Rewards;
    };
    14: {
        failure: {
            gp: number;
            sp: number;
        };
        rewards: Rewards;
    };
    15: {
        failure: {
            gp: number;
        };
        rewards: Rewards;
    };
    16: {
        failure: {
            gp: number;
            sp: number;
        };
        rewards: Rewards;
    };
    17: {
        failure: {
            gp: number;
        };
        rewards: Rewards;
    };
    18: {
        failure: {
            gp: number;
        };
        rewards: Rewards;
    };
    19: {
        failure: {
            gp: number;
        };
        rewards: Rewards;
    };
    20: {
        failure: {
            gp: number;
        };
        rewards: Rewards;
    };
    21: {
        failure: {};
        rewards: Rewards;
    };
};
declare type IncomeLevelMap = typeof earnIncomeTable;
declare type IncomeEarnerLevel = keyof IncomeLevelMap;
declare type IncomeForLevel = IncomeLevelMap[IncomeEarnerLevel];
export declare function getIncomeForLevel(level: number): IncomeForLevel;
export interface EarnIncomeResult {
    rewards: {
        perDay: Partial<Coins>;
        combined: Partial<Coins>;
    };
    degreeOfSuccess: DegreeIndex;
    daysSpentWorking: number;
    level: number;
    dc: number;
    roll: number;
}
export interface PerDayEarnIncomeResult {
    rewards: Partial<Coins>;
    degreeOfSuccess: DegreeIndex;
}
export interface EarnIncomeOptions {
    useLoreAsExperiencedProfessional: boolean;
}
export declare function multiplyIncome(income: Partial<Coins>, factor: number): Partial<Coins>;
/**
 * @param level number between 0 and 20
 * @param days how many days you want to work for
 * @param rollBrief the die result and total modifier of a check roll
 * @param proficiency proficiency in the relevant skill
 * @param earnIncomeOptions feats or items that affect earn income
 * @param dcOptions if dc by level is active
 */
export declare function earnIncome(level: number, days: number, rollBrief: RollBrief, proficiency: TrainedProficiencies, earnIncomeOptions: EarnIncomeOptions, dcOptions: DCOptions): EarnIncomeResult;
export {};
