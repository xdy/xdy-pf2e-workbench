import { CharacterPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { AttributeString } from "@actor/types.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField } from "./data.ts";
/**
 * @category RuleElement
 */
declare class FixedProficiencyRuleElement extends RuleElementPF2e<FixedProficiencyRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): FixedProficiencyRuleSchema;
    static validateJoint(data: SourceFromSchema<FixedProficiencyRuleSchema>): void;
    beforePrepareData(): void;
    afterPrepareData(): void;
}
interface FixedProficiencyRuleElement extends RuleElementPF2e<FixedProficiencyRuleSchema>, ModelPropsFromSchema<FixedProficiencyRuleSchema> {
    get actor(): CharacterPF2e;
}
type FixedProficiencyRuleSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, false>;
    value: ResolvableValueField<true, false, false>;
    ability: StringField<AttributeString, AttributeString, true, false, false>;
};
export { FixedProficiencyRuleElement };
