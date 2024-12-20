import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;

/**
 * @category RuleElement
 */
declare class MultipleAttackPenaltyRuleElement extends RuleElementPF2e<MAPRuleSchema> {
    static defineSchema(): MAPRuleSchema;
    beforePrepareData(): void;
}
interface MultipleAttackPenaltyRuleElement extends RuleElementPF2e<MAPRuleSchema>, ModelPropsFromRESchema<MAPRuleSchema> {
}
type MAPRuleSchema = RuleElementSchema & {
    selector: fields.StringField<string, string, true, false, false>;
    value: ResolvableValueField<true, false, false>;
};
export { MultipleAttackPenaltyRuleElement };
