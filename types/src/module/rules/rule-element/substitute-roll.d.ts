import { DataUnionField, PredicateField, StrictBooleanField } from "@system/schema-data-fields.ts";
import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
import fields = foundry.data.fields;

/** Substitute a pre-determined result for a check's D20 roll */
declare class SubstituteRollRuleElement extends RuleElementPF2e<SubstituteRollSchema> {
    constructor(source: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): SubstituteRollSchema;
    beforePrepareData(): void;
    afterRoll(params: RuleElementPF2e.AfterRollParams): Promise<void>;
}
interface SubstituteRollRuleElement extends RuleElementPF2e<SubstituteRollSchema>, ModelPropsFromRESchema<SubstituteRollSchema> {
}
type SubstituteRollSchema = RuleElementSchema & {
    selector: fields.StringField<string, string, true, false, true>;
    value: ResolvableValueField<true, false, false>;
    required: fields.BooleanField<boolean, boolean, false, false, true>;
    effectType: fields.StringField<"fortune" | "misfortune", "fortune" | "misfortune", true, false, true>;
    /**
     * Remove the parent item (must be an effect) after a roll:
     * The value may be a boolean, "if-enabled", or a predicate to be tested against the roll options from the roll.
     */
    removeAfterRoll: DataUnionField<fields.StringField<"if-enabled"> | StrictBooleanField | PredicateField<false, false, false>, false, false, true>;
};
export { SubstituteRollRuleElement };
