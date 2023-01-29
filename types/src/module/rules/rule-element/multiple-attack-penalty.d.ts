import { ItemPF2e } from "@item";
import { RuleElementOptions } from "./";
import { RuleElementPF2e } from "./";
import { RuleElementSource } from "./data";
/**
 * @category RuleElement
 */
export declare class MultipleAttackPenaltyRuleElement extends RuleElementPF2e {
    private selector;
    constructor(data: MAPSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface MAPSource extends RuleElementSource {
    selector?: unknown;
}
export {};
