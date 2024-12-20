import type { ActorType } from "@actor/types.ts";
import { ModelPropsFromRESchema } from "./data.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
import fields = foundry.data.fields;

declare class ActorTraitsRuleElement extends RuleElementPF2e<ActorTraitsRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    static defineSchema(): ActorTraitsRuleSchema;
    onApplyActiveEffects(): void;
}
type ActorTraitsRuleSchema = RuleElementSchema & {
    add: fields.ArrayField<fields.StringField<string, string, true, false, false>>;
    remove: fields.ArrayField<fields.StringField<string, string, true, false, false>>;
};
interface ActorTraitsRuleElement extends RuleElementPF2e<ActorTraitsRuleSchema>, ModelPropsFromRESchema<ActorTraitsRuleSchema> {
}
export { ActorTraitsRuleElement };
