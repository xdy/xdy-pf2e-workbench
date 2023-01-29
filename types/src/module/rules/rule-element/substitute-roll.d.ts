import { ItemPF2e } from "@item";
import { RuleElementSource } from ".";
import { RuleElementOptions, RuleElementPF2e } from "./base";
/** Substitute a pre-determined result for a check's D20 roll */
declare class SubstituteRollRuleElement extends RuleElementPF2e {
    #private;
    selector: string;
    /** Whether this substitution is required for matching rolls */
    required: boolean;
    /** The effect type of this substitution */
    effectType: "fortune" | "misfortune";
    constructor(data: SubstituteRollSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface SubstituteRollRuleElement extends RuleElementPF2e {
    slug: string;
}
interface SubstituteRollSource extends RuleElementSource {
    selector?: unknown;
    required?: unknown;
    effectType?: unknown;
}
export { SubstituteRollRuleElement };
