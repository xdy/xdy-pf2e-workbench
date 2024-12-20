import type { ActorType } from "@actor/types.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;

declare class StrikingRuleElement extends RuleElementPF2e<StrikingRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): StrikingRuleSchema;
    beforePrepareData(): void;
}
interface StrikingRuleElement extends RuleElementPF2e<StrikingRuleSchema>, ModelPropsFromRESchema<StrikingRuleSchema> {
}
type StrikingRuleSchema = RuleElementSchema & {
    selector: fields.StringField<string, string, true, false, false>;
    value: ResolvableValueField<false, false, false>;
};
export { StrikingRuleElement };
