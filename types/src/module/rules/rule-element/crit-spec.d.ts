import { ActorType } from "@actor/data";
import { BooleanField, ModelPropsFromSchema, StringField } from "types/foundry/common/data/fields.mjs";
import { RuleElementPF2e, RuleElementSchema } from ".";
/** Substitute a pre-determined result for a check's D20 roll */
declare class CritSpecRuleElement extends RuleElementPF2e<CritSpecRuleSchema> {
    #private;
    static validActorTypes: ActorType[];
    static defineSchema(): CritSpecRuleSchema;
    beforePrepareData(): void;
}
interface CritSpecRuleElement extends RuleElementPF2e<CritSpecRuleSchema>, ModelPropsFromSchema<CritSpecRuleSchema> {
}
type CritSpecRuleSchema = RuleElementSchema & {
    /** Whether this critical specialization note substitutes for the standard one of a given weapon group */
    alternate: BooleanField;
    /** Alternative note text: if not provided, the standard one for a given weapon group is used */
    text: StringField<string, string, false, false, false>;
};
export { CritSpecRuleElement };
