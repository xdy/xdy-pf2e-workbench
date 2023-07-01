import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { RuleElementSource } from "./index.ts";
/** Substitute a pre-determined result for a check's D20 roll */
declare class SubstituteRollRuleElement extends RuleElementPF2e {
    #private;
    selector: string;
    /** Whether this substitution is required for matching rolls */
    required: boolean;
    /** The effect type of this substitution */
    effectType: "fortune" | "misfortune";
    constructor(data: SubstituteRollSource, options: RuleElementOptions);
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
