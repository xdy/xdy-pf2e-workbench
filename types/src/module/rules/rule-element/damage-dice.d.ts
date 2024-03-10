import { DamageDiceOverride } from "@actor/modifiers.ts";
import type { ArrayField, BooleanField, ObjectField, StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
declare class DamageDiceRuleElement extends RuleElementPF2e<DamageDiceRuleSchema> {
    #private;
    constructor(data: DamageDiceSource, options: RuleElementOptions);
    static defineSchema(): DamageDiceRuleSchema;
    beforePrepareData(): void;
}
interface DamageDiceSource extends RuleElementSource {
    selector?: JSONValue;
    name?: JSONValue;
    diceNumber?: JSONValue;
    dieSize?: JSONValue;
    override?: JSONValue;
    value?: JSONValue;
    damageType?: JSONValue;
    critical?: JSONValue;
    category?: JSONValue;
    damageCategory?: JSONValue;
    hideIfDisabled?: JSONValue;
}
interface DamageDiceRuleElement extends RuleElementPF2e<DamageDiceRuleSchema>, ModelPropsFromRESchema<DamageDiceRuleSchema> {
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
    /** Hide this dice change from breakdown tooltips if it is disabled */
    hideIfDisabled: BooleanField<boolean, boolean, false, false, true>;
};
export { DamageDiceRuleElement };
