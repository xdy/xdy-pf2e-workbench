import { ActorType } from "@actor/data/index.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
import type { ArrayField, StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField } from "./data.ts";
/**
 * Rule element to implement fast healing and regeneration.
 * Creates a chat card every round of combat.
 * @category RuleElement
 */
declare class FastHealingRuleElement extends RuleElementPF2e<FastHealingRuleSchema> {
    static validActorTypes: ActorType[];
    static defineSchema(): FastHealingRuleSchema;
    static validateJoint(data: SourceFromSchema<FastHealingRuleSchema>): void;
    /** Send a message with a "healing" (damage) roll at the start of its turn */
    onTurnStart(): Promise<void>;
}
type FastHealingRuleSchema = RuleElementSchema & {
    value: ResolvableValueField<true, false, false>;
    type: StringField<FastHealingType, FastHealingType, false, false, true>;
    details: StringField<string, string, false, true, true>;
    deactivatedBy: ArrayField<StringField<string, string, true, false, false>, string[], string[], false, false, false>;
};
interface FastHealingRuleElement extends RuleElementPF2e<FastHealingRuleSchema>, ModelPropsFromSchema<FastHealingRuleSchema> {
}
type FastHealingType = "fast-healing" | "regeneration";
type FastHealingSource = SourceFromSchema<FastHealingRuleSchema>;
export { FastHealingRuleElement, FastHealingSource, FastHealingType };
