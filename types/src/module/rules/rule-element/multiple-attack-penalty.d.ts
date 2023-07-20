import { ResolvableValueField, RuleElementSchema } from "./data.ts";
import { RuleElementPF2e } from "./index.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
/**
 * @category RuleElement
 */
declare class MultipleAttackPenaltyRuleElement extends RuleElementPF2e<MAPRuleSchema> {
    static defineSchema(): MAPRuleSchema;
    beforePrepareData(): void;
}
interface MultipleAttackPenaltyRuleElement extends RuleElementPF2e<MAPRuleSchema>, ModelPropsFromSchema<MAPRuleSchema> {
}
type MAPRuleSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, false>;
    value: ResolvableValueField<true, false, false>;
};
export { MultipleAttackPenaltyRuleElement };
