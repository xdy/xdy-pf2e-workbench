import { ItemPF2e } from "@item";
import { RuleElementSource } from ".";
import { RuleElementOptions, RuleElementPF2e } from "./base";
/** Roll Twice and keep either the higher or lower result */
export declare class RollTwiceRuleElement extends RuleElementPF2e {
    #private;
    selector: string;
    keep: "higher" | "lower";
    /** If the hosting item is an effect, remove or expire it after a matching roll is made */
    removeAfterRoll: boolean;
    constructor(data: RollTwiceSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
    afterRoll({ selectors, roll, rollOptions }: RuleElementPF2e.AfterRollParams): Promise<void>;
}
interface RollTwiceSource extends RuleElementSource {
    selector?: unknown;
    keep?: unknown;
    removeAfterRoll?: unknown;
}
export {};
