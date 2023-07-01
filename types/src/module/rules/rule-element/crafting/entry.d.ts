import { CharacterPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "../index.ts";
import type { ArrayField, BooleanField, NumberField, SchemaField, StringField } from "types/foundry/common/data/fields.d.ts";
import { PredicateField } from "@system/schema-data-fields.ts";
import { ResolvableValueField } from "../data.ts";
/**
 * @category RuleElement
 */
declare class CraftingEntryRuleElement extends RuleElementPF2e<CraftingEntryRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): CraftingEntryRuleSchema;
    constructor(data: CraftingEntryRuleSource, options: RuleElementOptions);
    beforePrepareData(): void;
}
interface CraftingEntryRuleElement extends RuleElementPF2e<CraftingEntryRuleSchema>, ModelPropsFromSchema<CraftingEntryRuleSchema> {
    get actor(): CharacterPF2e;
}
type CraftingEntryRuleSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, false>;
    isAlchemical: BooleanField<boolean, boolean, false, false, false>;
    isDailyPrep: BooleanField<boolean, boolean, false, false, false>;
    isPrepared: BooleanField<boolean, boolean, false, false, false>;
    maxItemLevel: ResolvableValueField<false, false, true>;
    maxSlots: NumberField<number, number, false, false, false>;
    craftableItems: PredicateField<false, false, false>;
    preparedFormulas: ArrayField<SchemaField<PreparedFormulaSchema>>;
};
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
    isAlchemical?: unknown;
    isDailyPrep?: unknown;
    isPrepared?: unknown;
    maxItemLevel?: unknown;
    maxSlots?: unknown;
    craftableItems?: unknown;
    preparedFormulas?: unknown;
}
export { CraftingEntryRuleData, CraftingEntryRuleElement, CraftingEntryRuleSource };
