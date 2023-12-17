import type { BooleanField, StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "./data.ts";
/** Roll Twice and keep either the higher or lower result */
declare class RollTwiceRuleElement extends RuleElementPF2e<RollTwiceRuleSchema> {
    static defineSchema(): RollTwiceRuleSchema;
    beforePrepareData(): void;
    afterRoll({ domains, roll, rollOptions }: RuleElementPF2e.AfterRollParams): Promise<void>;
}
interface RollTwiceRuleElement extends RuleElementPF2e<RollTwiceRuleSchema>, ModelPropsFromRESchema<RollTwiceRuleSchema> {
}
type RollTwiceRuleSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, false>;
    keep: StringField<"higher" | "lower", "higher" | "lower", true, false, false>;
    /** If the hosting item is an effect, remove or expire it after a matching roll is made */
    removeAfterRoll: BooleanField<boolean, boolean, false, false, false>;
};
export { RollTwiceRuleElement };
