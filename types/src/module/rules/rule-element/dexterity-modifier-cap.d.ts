import type { ActorType, CharacterPF2e, NPCPF2e } from "@actor";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
/**
 * @category RuleElement
 */
declare class DexterityModifierCapRuleElement extends RuleElementPF2e<DexterityModifierCapRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): DexterityModifierCapRuleSchema;
    beforePrepareData(): void;
}
interface DexterityModifierCapRuleElement extends RuleElementPF2e<DexterityModifierCapRuleSchema>, ModelPropsFromRESchema<DexterityModifierCapRuleSchema> {
    get actor(): CharacterPF2e | NPCPF2e;
}
type DexterityModifierCapRuleSchema = RuleElementSchema & {
    value: ResolvableValueField<true, false, false>;
};
export { DexterityModifierCapRuleElement };
