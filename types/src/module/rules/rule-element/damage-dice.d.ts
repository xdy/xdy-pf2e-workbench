import { DamageDiceOverride } from "@actor/modifiers.ts";
import type { ArrayField, BooleanField, ObjectField, StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
import { RuleElementOptions, RuleElementPF2e } from "./index.ts";
declare class DamageDiceRuleElement extends RuleElementPF2e<DamageDiceRuleSchema> {
    #private;
    static defineSchema(): DamageDiceRuleSchema;
    constructor(data: DamageDiceSource, options: RuleElementOptions);
    beforePrepareData(): void;
}
interface DamageDiceSource extends RuleElementSource {
    selector?: unknown;
    name?: unknown;
    diceNumber?: unknown;
    dieSize?: unknown;
    override?: unknown;
    damageType?: unknown;
    critical?: unknown;
    category?: unknown;
    damageCategory?: unknown;
}
interface DamageDiceRuleElement extends RuleElementPF2e<DamageDiceRuleSchema>, ModelPropsFromSchema<DamageDiceRuleSchema> {
}
type DamageDiceRuleSchema = RuleElementSchema & {
    /** All domains to add a modifier to */
    selector: ArrayField<StringField<string, string, true, false, false>>;
    /** The number of dice to add */
    diceNumber: ResolvableValueField<false, false, false>;
    /** The damage die size */
    dieSize: StringField<string, string, false, true, true>;
    /** The damage type */
    damageType: StringField<string, string, false, true, true>;
    /** True means the dice are added to critical without doubling; false means the dice are never added to
     *  critical damage; omitted means add to normal damage and double on critical damage.
     */
    critical: BooleanField<boolean, boolean, false, true, false>;
    /** The damage category */
    category: StringField<"persistent" | "precision" | "splash", "persistent" | "precision" | "splash", false, false, false>;
    /** Resolvable bracket data */
    brackets: ResolvableValueField<false, true, false>;
    /** Damage dice override data */
    override: ObjectField<DamageDiceOverride, DamageDiceOverride, false, true, false>;
};
export { DamageDiceRuleElement };
