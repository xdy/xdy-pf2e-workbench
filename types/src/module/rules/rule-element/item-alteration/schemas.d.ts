import type { ItemSourcePF2e, ItemType } from "@item/data/index.ts";
import { ItemPF2e } from "@module/documents.ts";
import type { DamageType } from "@system/damage/types.ts";
import type { DataField, DataFieldOptions, NumberField, StringField } from "types/foundry/common/data/fields.d.ts";
import type { AELikeChangeMode } from "../ae-like.ts";
declare const fields: typeof import("types/foundry/common/data/fields.d.ts");
/** A `SchemaField` reappropriated for validation of specific item alterations */
declare class ItemAlterationValidator<TDataSchema extends AlterationSchema> extends fields.SchemaField<TDataSchema> {
    #private;
    operableOnInstances: boolean;
    operableOnSource: boolean;
    constructor(fields: TDataSchema, options?: AlterationFieldOptions<SourceFromSchema<TDataSchema>>);
    /**
     * A type-safe affirmation of full validity of an alteration _and_ its applicable to a particular item
     * Errors will bubble all the way up to the originating parent rule element
     */
    isValid(data: {
        item: ItemPF2e | ItemSourcePF2e;
        alteration: {
            itemType: string;
        };
    }): data is {
        item: ItemOrSource<SourceFromSchema<TDataSchema>["itemType"]>;
        alteration: SourceFromSchema<TDataSchema>;
    };
}
type ItemOrSource<TItemType extends ItemType> = InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][TItemType]> | InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][TItemType]>["_source"];
declare const ITEM_ALTERATION_VALIDATORS: {
    "ac-bonus": ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "add" | "remove" | "subtract" | "downgrade", "override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "badge-max": ItemAlterationValidator<{
        itemType: StringField<"effect", ItemType, true, false, false>;
        mode: StringField<"override" | "downgrade", "override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "badge-value": ItemAlterationValidator<{
        itemType: StringField<"effect" | "condition", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "add" | "remove" | "subtract" | "downgrade", "override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    category: ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", true, false, false>;
        value: StringField<"light" | "medium" | "heavy", unknown, true, false, boolean>;
    }>;
    hardness: ItemAlterationValidator<{
        itemType: StringField<"armor" | "consumable" | "book" | "backpack" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", "override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "hp-max": ItemAlterationValidator<{
        itemType: StringField<"armor" | "consumable" | "book" | "backpack" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", "override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "pd-recovery-dc": ItemAlterationValidator<{
        itemType: StringField<"condition", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "add" | "remove" | "subtract" | "downgrade", "override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "persistent-damage": ItemAlterationValidator<{
        itemType: StringField<"condition", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", true, false, false>;
        value: import("types/foundry/common/data/fields.d.ts").SchemaField<PersistentDamageValueSchema, SourceFromSchema<PersistentDamageValueSchema>, ModelPropsFromSchema<PersistentDamageValueSchema>, true, false, true>;
    }>;
    rarity: ItemAlterationValidator<{
        itemType: StringField<"armor" | "consumable" | "book" | "backpack" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", true, false, false>;
        value: StringField<"rare" | "uncommon" | "unique" | "common", unknown, true, false, boolean>;
    }>;
    "frequency-max": ItemAlterationValidator<{
        itemType: StringField<"action" | "feat", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", "override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "frequency-per": ItemAlterationValidator<{
        itemType: StringField<"action" | "feat", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "downgrade", "override" | "upgrade" | "add" | "remove" | "multiply" | "subtract" | "downgrade", true, false, false>;
        value: StringField<string, unknown, true, false, boolean>;
    }>;
};
interface AlterationFieldOptions<TSourceProp extends SourceFromSchema<AlterationSchema>> extends DataFieldOptions<TSourceProp, true, false, false> {
    validateForItem?: (item: ItemPF2e | ItemSourcePF2e) => asserts item is InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][TSourceProp["itemType"]]> | InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][TSourceProp["itemType"]]>["_source"];
    /** Whether this alteration can be used with an `ItemPF2e` instance */
    operableOnInstances?: boolean;
    /** Whether this alteration can be used with item source data */
    operableOnSource?: boolean;
}
type AlterationSchema = {
    itemType: StringField<ItemType, ItemType, true, false, false>;
    mode: StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    value: DataField<unknown, unknown, true, boolean, boolean>;
};
type PersistentDamageValueSchema = {
    formula: StringField<string, string, true, false, false>;
    damageType: StringField<DamageType, DamageType, true, false, false>;
    dc: NumberField<number, number, true, false, true>;
};
export { ITEM_ALTERATION_VALIDATORS };
