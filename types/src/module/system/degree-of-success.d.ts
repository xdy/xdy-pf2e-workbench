import { DCSlug } from "@actor/data";
import { ZeroToThree } from "@module/data";
import { PredicatePF2e } from "./predication";
import { RollDataPF2e } from "./rolls";
/** Get the degree of success from a roll and a difficulty class */
declare class DegreeOfSuccess {
    /** The calculated degree of success */
    readonly value: DegreeIndex;
    /** The degree of success prior to adjustment. If there was no adjustment, it is identical to the `value` */
    readonly unadjusted: DegreeIndex;
    /** A degree adjustment, usually from some character ability */
    readonly degreeAdjustment: DegreeAdjustment | null;
    /** The result of a d20 roll */
    readonly dieResult: number;
    /** The total of a roll, including the die result and total modifier */
    readonly rollTotal: number;
    /** The check DC being rolled against */
    readonly dc: CheckDC;
    constructor(roll: Rolled<Roll<RollDataPF2e>> | RollBrief, dc: CheckDC | number);
    static readonly CRITICAL_FAILURE = 0;
    static readonly FAILURE = 1;
    static readonly SUCCESS = 2;
    static readonly CRITICAL_SUCCESS = 3;
    getDegreeAdjustment(value: DegreeIndex, modifiers: CheckDCModifiers): DegreeAdjustment | null;
    private adjustDegreeOfSuccess;
    /**
     * @param degree The current success value
     * @return The new success value
     */
    private adjustDegreeByDieValue;
    private calculateDegreeOfSuccess;
}
declare type CheckDCString = "one-degree-better" | "one-degree-worse" | "two-degrees-better" | "two-degrees-worse";
declare type RollBrief = {
    dieValue: number;
    modifier: number;
};
declare const DEGREE_ADJUSTMENTS: {
    readonly LOWER_BY_TWO: -2;
    readonly LOWER: -1;
    readonly INCREASE: 1;
    readonly INCREASE_BY_TWO: 2;
};
declare type DegreeAdjustment = typeof DEGREE_ADJUSTMENTS[keyof typeof DEGREE_ADJUSTMENTS];
interface CheckDCModifiers {
    all?: CheckDCString;
    criticalFailure?: CheckDCString;
    failure?: CheckDCString;
    success?: CheckDCString;
    criticalSuccess?: CheckDCString;
}
interface DegreeOfSuccessAdjustment {
    modifiers: CheckDCModifiers;
    predicate?: PredicatePF2e;
}
interface CheckDC {
    slug?: DCSlug;
    label?: string;
    modifiers?: CheckDCModifiers;
    scope?: "attack" | "check";
    adjustments?: DegreeOfSuccessAdjustment[];
    value: number;
    visibility?: "none" | "gm" | "owner" | "all";
}
declare type DegreeIndex = ZeroToThree;
declare const DEGREE_OF_SUCCESS_STRINGS: readonly ["criticalFailure", "failure", "success", "criticalSuccess"];
declare type DegreeOfSuccessString = typeof DEGREE_OF_SUCCESS_STRINGS[number];
export { CheckDC, CheckDCModifiers, DegreeIndex, DegreeOfSuccess, DegreeOfSuccessAdjustment, DegreeOfSuccessString, DEGREE_ADJUSTMENTS, DEGREE_OF_SUCCESS_STRINGS, RollBrief, };
