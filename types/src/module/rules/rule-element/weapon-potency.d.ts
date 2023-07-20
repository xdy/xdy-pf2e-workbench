import { ActorType } from "@actor/data/index.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField } from "./data.ts";
/**
 * Copies potency runes from the weapon its attached to, to another weapon based on a predicate.
 * @category RuleElement
 */
declare class WeaponPotencyRuleElement extends RuleElementPF2e<WeaponPotencyRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): WeaponPotencyRuleSchema;
    beforePrepareData(): void;
}
interface WeaponPotencyRuleElement extends RuleElementPF2e<WeaponPotencyRuleSchema>, ModelPropsFromSchema<WeaponPotencyRuleSchema> {
}
type WeaponPotencyRuleSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, false>;
    value: ResolvableValueField<true, false, false>;
};
export { WeaponPotencyRuleElement };
