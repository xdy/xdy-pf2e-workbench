import { CharacterPF2e, FamiliarPF2e } from "@actor";
import { SenseAcuity, SenseType } from "@actor/creature/sense.ts";
import { ActorType } from "@actor/data/index.ts";
import { RuleElementOptions } from "./base.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
import type { BooleanField, StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField, RuleElementSource } from "./data.ts";
/**
 * @category RuleElement
 */
declare class SenseRuleElement extends RuleElementPF2e<SenseRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): SenseRuleSchema;
    constructor(data: SenseRuleElementSource, options: RuleElementOptions);
    beforePrepareData(): void;
}
interface SenseRuleElement extends RuleElementPF2e<SenseRuleSchema>, ModelPropsFromSchema<SenseRuleSchema> {
    get actor(): CharacterPF2e | FamiliarPF2e;
}
type SenseRuleSchema = RuleElementSchema & {
    selector: StringField<SenseType, SenseType, true, false, false>;
    force: BooleanField<boolean, boolean, false, false, true>;
    acuity: StringField<SenseAcuity, SenseAcuity, false, false, true>;
    range: ResolvableValueField<false, false, false>;
};
interface SenseRuleElementSource extends RuleElementSource {
    selector?: SenseType;
}
export { SenseRuleElement };
