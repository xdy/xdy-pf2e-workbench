import type { CharacterPF2e, NPCPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
import { ResolvableValueField } from "./data.ts";
/**
 * @category RuleElement
 */
declare class DexterityModifierCapRuleElement extends RuleElementPF2e<DexterityModifierCapRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): DexterityModifierCapRuleSchema;
    beforePrepareData(): void;
}
interface DexterityModifierCapRuleElement extends RuleElementPF2e<DexterityModifierCapRuleSchema>, ModelPropsFromSchema<DexterityModifierCapRuleSchema> {
    get actor(): CharacterPF2e | NPCPF2e;
}
type DexterityModifierCapRuleSchema = RuleElementSchema & {
    value: ResolvableValueField<true, false, false>;
};
export { DexterityModifierCapRuleElement };
