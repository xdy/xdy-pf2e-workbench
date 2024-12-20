import { ModifierType } from "@actor/modifiers.ts";
import { AttributeString } from "@actor/types.ts";
import { DamageCategoryUnique } from "@system/damage/types.ts";
import {
    DataUnionField,
    PredicateField,
    SlugField,
    StrictBooleanField,
    StrictStringField,
} from "@system/schema-data-fields.ts";
import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import {
    ModelPropsFromRESchema,
    ResolvableValueField,
    RuleElementSchema,
    RuleElementSource,
    RuleValue,
} from "./data.ts";
import fields = foundry.data.fields;

/**
 * Apply a constant modifier (or penalty/bonus) to a statistic or usage thereof
 * @category RuleElement
 */
declare class FlatModifierRuleElement extends RuleElementPF2e<FlatModifierSchema> {
    constructor(source: FlatModifierSource, options: RuleElementOptions);
    static validateJoint(data: SourceFromSchema<FlatModifierSchema>): void;
    static defineSchema(): FlatModifierSchema;
    get selectors(): string[];
    beforePrepareData(): void;
    /** Remove this rule element's parent item after a roll */
    afterRoll({ check, rollOptions }: RuleElementPF2e.AfterRollParams): Promise<void>;
}
interface FlatModifierRuleElement extends RuleElementPF2e<FlatModifierSchema>, ModelPropsFromRESchema<FlatModifierSchema> {
    value: RuleValue;
}
type FlatModifierSchema = RuleElementSchema & {
    /** All domains to add a modifier to */
    selector: fields.ArrayField<fields.StringField<string, string, true, false, false>, string[], string[], true, false, false>;
    /** The modifier (or bonus/penalty) type */
    type: fields.StringField<ModifierType, ModifierType, true, false, true>;
    /** If this is an ability modifier, the ability score it modifies */
    ability: fields.StringField<AttributeString, AttributeString, false, false, false>;
    /** Hide this modifier from breakdown tooltips if it is disabled */
    min: fields.NumberField<number, number, false, false, false>;
    max: fields.NumberField<number, number, false, false, false>;
    hideIfDisabled: fields.BooleanField;
    /** Whether to use this bonus/penalty/modifier even if it isn't the greatest magnitude */
    force: fields.BooleanField;
    /** Whether this modifier comes from equipment or an equipment effect */
    fromEquipment: fields.BooleanField;
    /** If a damage modifier, a damage type */
    damageType: fields.StringField<string, string, false, true, false>;
    /** If a damage modifier, a special category */
    damageCategory: fields.StringField<DamageCategoryUnique, DamageCategoryUnique, false, false, false>;
    /** If a damage modifier, whether it applies given the presence or absence of a critically successful attack roll */
    critical: fields.BooleanField<boolean, boolean, false, true, true>;
    /** The numeric value of the modifier */
    value: ResolvableValueField<false, false, false>;
    /** A list of tags associated with this modifier */
    tags: fields.ArrayField<SlugField<true, false, false>, string[], string[], false, false, true>;
    /**
     * Remove the parent item (must be an effect) after a roll:
     * The value may be a boolean, "if-enabled", or a predicate to be tested against the roll options from the roll.
     */
    removeAfterRoll: DataUnionField<StrictStringField<"if-enabled"> | StrictBooleanField | PredicateField<false, false, false>, false, false, true>;
};
interface FlatModifierSource extends RuleElementSource {
    selector?: JSONValue;
    min?: JSONValue;
    max?: JSONValue;
    type?: JSONValue;
    value?: JSONValue;
    ability?: JSONValue;
    force?: JSONValue;
    damageType?: JSONValue;
    damageCategory?: JSONValue;
    critical?: JSONValue;
    hideIfDisabled?: JSONValue;
}
export { FlatModifierRuleElement, type FlatModifierSource };
