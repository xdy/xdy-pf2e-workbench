import { PredicatePF2e } from "@system/predication";
import { RuleElementPF2e } from "./";
/**
 * @category RuleElement
 */
export declare class MultipleAttackPenaltyRuleElement extends RuleElementPF2e {
    beforePrepareData(): void;
}
export interface MultipleAttackPenaltyPF2e {
    label: string;
    penalty: number;
    predicate?: PredicatePF2e;
}
