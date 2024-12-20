import type { ActorType, CharacterPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { PredicateField } from "@system/schema-data-fields.ts";
import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
import fields = foundry.data.fields;

/**
 * @category RuleElement
 */
declare class CraftingAbilityRuleElement extends RuleElementPF2e<CraftingAbilityRuleSchema> {
    protected static validActorTypes: ActorType[];
    constructor(data: CraftingAbilityRuleSource, options: RuleElementOptions);
    static defineSchema(): CraftingAbilityRuleSchema;
    onApplyActiveEffects(): void;
    /** Attach the crafting ability to the feat or ability if not prepared */
    afterPrepareData(): void;
}
interface CraftingAbilityRuleElement extends RuleElementPF2e<CraftingAbilityRuleSchema>, ModelPropsFromRESchema<CraftingAbilityRuleSchema> {
    readonly parent: ItemPF2e<CharacterPF2e>;
    slug: string;
    get actor(): CharacterPF2e;
}
type CraftingAbilityRuleSchema = RuleElementSchema & {
    resource: fields.StringField<string, string, false, true, true>;
    isAlchemical: fields.BooleanField<boolean, boolean, false, false, true>;
    isDailyPrep: fields.BooleanField<boolean, boolean, false, false, true>;
    isPrepared: fields.BooleanField<boolean, boolean, false, false, true>;
    batchSizes: fields.SchemaField<{
        default: fields.NumberField<number, number, false, false, false>;
        other: fields.ArrayField<fields.SchemaField<{
            quantity: fields.NumberField<number, number, true, false, true>;
            definition: PredicateField;
        }>>;
    }>;
    maxItemLevel: ResolvableValueField<false, false, true>;
    maxSlots: ResolvableValueField<false, false, true>;
    craftableItems: PredicateField;
    prepared: fields.ArrayField<fields.SchemaField<PreparedFormulaSchema>>;
};
type PreparedFormulaSchema = {
    uuid: fields.DocumentUUIDField<ItemUUID, true, false, false>;
    quantity: fields.NumberField<number, number, false, false, false>;
    expended: fields.BooleanField<boolean, boolean, false, false, false>;
    isSignatureItem: fields.BooleanField<boolean, boolean, false, false, false>;
};
type CraftingAbilityRuleData = Omit<SourceFromSchema<CraftingAbilityRuleSchema>, "preparedFormulas"> & {
    prepared: (Partial<SourceFromSchema<PreparedFormulaSchema>> & {
        uuid: string;
    })[];
};
interface CraftingAbilityRuleSource extends RuleElementSource {
    resource?: unknown;
    batchSizes?: unknown;
    isAlchemical?: unknown;
    isDailyPrep?: unknown;
    isPrepared?: unknown;
    maxItemLevel?: unknown;
    maxSlots?: unknown;
    craftableItems?: unknown;
    prepared?: unknown;
}
export { CraftingAbilityRuleElement };
export type { CraftingAbilityRuleData, CraftingAbilityRuleSource };
