import { RuleElementPF2e } from "./base.ts";
import { RuleElementSchema } from "./index.ts";
import type { BooleanField, StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField } from "./data.ts";
/** Substitute a pre-determined result for a check's D20 roll */
declare class SubstituteRollRuleElement extends RuleElementPF2e<SubstituteRollSchema> {
    static defineSchema(): SubstituteRollSchema;
    beforePrepareData(): void;
}
interface SubstituteRollRuleElement extends RuleElementPF2e<SubstituteRollSchema>, ModelPropsFromSchema<SubstituteRollSchema> {
}
type SubstituteRollSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, true>;
    value: ResolvableValueField<true, false, false>;
    required: BooleanField<boolean, boolean, false, false, true>;
    effectType: StringField<"fortune" | "misfortune", "fortune" | "misfortune", true, false, true>;
};
export { SubstituteRollRuleElement };
