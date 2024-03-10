import type { ActorType, CharacterPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { PredicateField } from "@system/schema-data-fields.ts";
import type { ArrayField, BooleanField, NumberField, SchemaField, StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e } from "../base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "../data.ts";
/**
 * @category RuleElement
 */
declare class CraftingEntryRuleElement extends RuleElementPF2e<CraftingEntryRuleSchema> {
    protected static validActorTypes: ActorType[];
    constructor(data: CraftingEntryRuleSource, options: RuleElementOptions);
    static defineSchema(): CraftingEntryRuleSchema;
    beforePrepareData(): void;
}
interface CraftingEntryRuleElement extends RuleElementPF2e<CraftingEntryRuleSchema>, ModelPropsFromRESchema<CraftingEntryRuleSchema> {
    readonly parent: ItemPF2e<CharacterPF2e>;
    get actor(): CharacterPF2e;
}
type CraftingEntryRuleSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, false>;
    isAlchemical: BooleanField<boolean, boolean, false, false, true>;
    isDailyPrep: BooleanField<boolean, boolean, false, false, true>;
    isPrepared: BooleanField<boolean, boolean, false, false, true>;
    batchSizes: SchemaField<{
        default: QuantityField;
        other: ArrayField<SchemaField<{
            quantity: QuantityField;
            definition: PredicateField;
        }>>;
    }>;
    maxItemLevel: ResolvableValueField<false, false, true>;
    maxSlots: NumberField<number, number, false, false, false>;
    craftableItems: PredicateField;
    preparedFormulas: ArrayField<SchemaField<PreparedFormulaSchema>>;
};
type QuantityField = NumberField<number, number, true, false, true>;
type PreparedFormulaSchema = {
    itemUUID: StringField<string, string, true, false, false>;
    quantity: NumberField<number, number, false, false, false>;
    sort: NumberField<number, number, false, false, false>;
    expended: BooleanField<boolean, boolean, false, false, false>;
    isSignatureItem: BooleanField<boolean, boolean, false, false, false>;
};
type CraftingEntryRuleData = Omit<SourceFromSchema<CraftingEntryRuleSchema>, "preparedFormulas"> & {
    preparedFormulas: (Partial<SourceFromSchema<PreparedFormulaSchema>> & {
        itemUUID: string;
    })[];
};
interface CraftingEntryRuleSource extends RuleElementSource {
    selector?: unknown;
    name?: unknown;
    batchSizes?: unknown;
    isAlchemical?: unknown;
    isDailyPrep?: unknown;
    isPrepared?: unknown;
    maxItemLevel?: unknown;
    maxSlots?: unknown;
    craftableItems?: unknown;
    preparedFormulas?: unknown;
}
export { CraftingEntryRuleElement };
export type { CraftingEntryRuleData, CraftingEntryRuleSource };
