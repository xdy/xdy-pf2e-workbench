import type { ActorType, CharacterPF2e, FamiliarPF2e } from "@actor";
import type { SenseAcuity, SenseType } from "@actor/creature/types.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;

/**
 * @category RuleElement
 */
declare class SenseRuleElement extends RuleElementPF2e<SenseRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): SenseRuleSchema;
    beforePrepareData(): void;
}
interface SenseRuleElement extends RuleElementPF2e<SenseRuleSchema>, ModelPropsFromRESchema<SenseRuleSchema> {
    get actor(): CharacterPF2e | FamiliarPF2e;
}
type SenseRuleSchema = RuleElementSchema & {
    selector: fields.StringField<SenseType, SenseType, true, false, false>;
    force: fields.BooleanField<boolean, boolean, false, false, true>;
    acuity: fields.StringField<SenseAcuity, SenseAcuity, false, false, true>;
    range: ResolvableValueField<false, false, false>;
};
export { SenseRuleElement };
