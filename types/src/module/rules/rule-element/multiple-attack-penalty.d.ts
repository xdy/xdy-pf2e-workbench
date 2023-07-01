import { RuleElementSource } from "./data.ts";
import { RuleElementOptions, RuleElementPF2e } from "./index.ts";
/**
 * @category RuleElement
 */
export declare class MultipleAttackPenaltyRuleElement extends RuleElementPF2e {
    private selector;
    constructor(data: MAPSource, options: RuleElementOptions);
    beforePrepareData(): void;
}
interface MAPSource extends RuleElementSource {
    selector?: unknown;
}
export {};
