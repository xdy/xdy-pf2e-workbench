import { DataUnionField, PredicateField, StrictBooleanField, StrictStringField } from "@system/schema-data-fields.ts";
import type { BooleanField, StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField, RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./index.ts";
/** Substitute a pre-determined result for a check's D20 roll */
declare class SubstituteRollRuleElement extends RuleElementPF2e<SubstituteRollSchema> {
    constructor(source: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): SubstituteRollSchema;
    beforePrepareData(): void;
    afterRoll(params: RuleElementPF2e.AfterRollParams): Promise<void>;
}
interface SubstituteRollRuleElement extends RuleElementPF2e<SubstituteRollSchema>, ModelPropsFromSchema<SubstituteRollSchema> {
}
type SubstituteRollSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, true>;
    value: ResolvableValueField<true, false, false>;
    required: BooleanField<boolean, boolean, false, false, true>;
    effectType: StringField<"fortune" | "misfortune", "fortune" | "misfortune", true, false, true>;
    /**
     * Remove the parent item (must be an effect) after a roll:
     * The value may be a boolean, "if-enabled", or a predicate to be tested against the roll options from the roll.
     */
    removeAfterRoll: DataUnionField<StrictStringField<"if-enabled"> | StrictBooleanField | PredicateField<false, false, false>, false, false, true>;
};
export { SubstituteRollRuleElement };
