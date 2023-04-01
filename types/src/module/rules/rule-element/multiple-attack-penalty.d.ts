import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e } from "./";
import { RuleElementSource } from "./data";
/**
 * @category RuleElement
 */
export declare class MultipleAttackPenaltyRuleElement extends RuleElementPF2e {
    private selector;
    constructor(data: MAPSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface MAPSource extends RuleElementSource {
    selector?: unknown;
}
export {};
