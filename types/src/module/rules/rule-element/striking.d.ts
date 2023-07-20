import { ActorType } from "@actor/data/index.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField } from "./data.ts";
declare class StrikingRuleElement extends RuleElementPF2e<StrikingRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): StrikingRuleSchema;
    beforePrepareData(): void;
}
interface StrikingRuleElement extends RuleElementPF2e<StrikingRuleSchema>, ModelPropsFromSchema<StrikingRuleSchema> {
}
type StrikingRuleSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, false>;
    value: ResolvableValueField<false, false, false>;
};
export { StrikingRuleElement };
