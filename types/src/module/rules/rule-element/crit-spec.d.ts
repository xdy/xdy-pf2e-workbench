import { ModifierType } from "@actor/modifiers.ts";
import type { ActorType } from "@actor/types.ts";
import { DamageCategoryUnique, DamageType } from "@system/damage/types.ts";
import type { BooleanField, NumberField, SchemaField, StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleValue } from "./data.ts";
/** Substitute a pre-determined result for a check's D20 roll */
declare class CritSpecRuleElement extends RuleElementPF2e<CritSpecRuleSchema> {
    #private;
    static validActorTypes: ActorType[];
    static defineSchema(): CritSpecRuleSchema;
    static validateJoint(data: SourceFromSchema<CritSpecRuleSchema>): void;
    beforePrepareData(): void;
}
interface CritSpecRuleElement extends RuleElementPF2e<CritSpecRuleSchema>, ModelPropsFromRESchema<CritSpecRuleSchema> {
}
type DamageDieFaces = 4 | 6 | 8 | 10 | 12;
type CritSpecRuleSchema = RuleElementSchema & {
    /** Whether this critical specialization note substitutes for the standard one of a given weapon group */
    alternate: BooleanField;
    /** Alternative note text: if not provided, the standard one for a given weapon group is used */
    text: StringField<string, string, false, true, true>;
    /** Alternative damage dice */
    damageDice: SchemaField<{
        number: ResolvableValueField<true, false, false>;
        faces: NumberField<DamageDieFaces, DamageDieFaces, true, false, false>;
        damageType: StringField<DamageType, DamageType, false, true, true>;
        category: StringField<DamageCategoryUnique, DamageCategoryUnique, false, true, true>;
    }, {
        number: RuleValue;
        faces: DamageDieFaces;
        damageType: DamageType | null;
        category: DamageCategoryUnique | null;
    }, {
        number: RuleValue;
        faces: DamageDieFaces;
        damageType: DamageType | null;
        category: DamageCategoryUnique | null;
    }, false, true, true>;
    /** Alternative modifier */
    modifier: SchemaField<{
        type: StringField<ModifierType, ModifierType, true, false, true>;
        damageType: StringField<DamageType, DamageType, false, true, true>;
        category: StringField<DamageCategoryUnique, DamageCategoryUnique, false, true, true>;
        value: ResolvableValueField<true, false, false>;
    }, {
        type: ModifierType;
        damageType: DamageType | null;
        category: DamageCategoryUnique | null;
        value: RuleValue;
    }, {
        type: ModifierType;
        damageType: DamageType | null;
        category: DamageCategoryUnique | null;
        value: RuleValue;
    }, false, true, true>;
};
export { CritSpecRuleElement };
