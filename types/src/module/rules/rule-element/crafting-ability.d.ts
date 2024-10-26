import type { ActorType, CharacterPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { PredicateField, SlugField } from "@system/schema-data-fields.ts";
import type {
    ArrayField,
    BooleanField,
    DocumentUUIDField,
    NumberField,
    SchemaField,
} from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";

/**
 * @category RuleElement
 */
declare class CraftingAbilityRuleElement extends RuleElementPF2e<CraftingAbilityRuleSchema> {
    protected static validActorTypes: ActorType[];
    constructor(data: CraftingAbilityRuleSource, options: RuleElementOptions);
    static defineSchema(): CraftingAbilityRuleSchema;
    beforePrepareData(): void;
}
interface CraftingAbilityRuleElement extends RuleElementPF2e<CraftingAbilityRuleSchema>, ModelPropsFromRESchema<CraftingAbilityRuleSchema> {
    readonly parent: ItemPF2e<CharacterPF2e>;
    slug: string;
    get actor(): CharacterPF2e;
}
type CraftingAbilityRuleSchema = Omit<RuleElementSchema, "slug"> & {
    slug: SlugField<true, false, false>;
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
    prepared: ArrayField<SchemaField<PreparedFormulaSchema>>;
};
type QuantityField = NumberField<number, number, true, false, true>;
type PreparedFormulaSchema = {
    uuid: DocumentUUIDField<ItemUUID, true, false, false>;
    quantity: NumberField<number, number, false, false, false>;
    expended: BooleanField<boolean, boolean, false, false, false>;
    isSignatureItem: BooleanField<boolean, boolean, false, false, false>;
};
type CraftingAbilityRuleData = Omit<SourceFromSchema<CraftingAbilityRuleSchema>, "preparedFormulas"> & {
    prepared: (Partial<SourceFromSchema<PreparedFormulaSchema>> & {
        uuid: string;
    })[];
};
interface CraftingAbilityRuleSource extends RuleElementSource {
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
