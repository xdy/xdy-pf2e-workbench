import type { CharacterPF2e, FamiliarPF2e } from "@actor";
import { SenseAcuity, SenseType } from "@actor/creature/sense.ts";
import { ActorType } from "@actor/data/index.ts";
import type { BooleanField, StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
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
    selector: StringField<SenseType, SenseType, true, false, false>;
    force: BooleanField<boolean, boolean, false, false, true>;
    acuity: StringField<SenseAcuity, SenseAcuity, false, false, true>;
    range: ResolvableValueField<false, false, false>;
};
export { SenseRuleElement };
