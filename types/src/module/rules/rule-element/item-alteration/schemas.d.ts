import { ItemPF2e } from "@item";
import type { ItemSourcePF2e, ItemType } from "@item/base/data/index.ts";
import type { DamageType } from "@system/damage/types.ts";
import { SlugField, StrictNumberField } from "@system/schema-data-fields.ts";
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
        mode: StringField<"override" | "upgrade" | "downgrade" | "add" | "remove" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "badge-max": ItemAlterationValidator<{
        itemType: StringField<"effect", ItemType, true, false, false>;
        mode: StringField<"override" | "downgrade", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "badge-value": ItemAlterationValidator<{
        itemType: StringField<"condition" | "effect", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "downgrade" | "add" | "remove" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "bulk-held-or-stowed": ItemAlterationValidator<{
        itemType: StringField<"armor" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: StringField<"1" | "2" | "3" | "4" | "5" | "L" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50", "1" | "2" | "3" | "4" | "5" | "L" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50", true, false, false>;
    }>;
    "bulk-worn": ItemAlterationValidator<{
        itemType: StringField<"armor" | "backpack", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: StringField<"1" | "2" | "3" | "4" | "5" | "L" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50", "1" | "2" | "3" | "4" | "5" | "L" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50", true, false, false>;
    }>;
    category: ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: StringField<"light" | "medium" | "heavy", unknown, true, false, boolean>;
    }>;
    "dex-cap": ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "downgrade" | "add" | "remove" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: StrictNumberField<number, unknown, true, false, boolean>;
    }>;
    "check-penalty": ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "downgrade" | "add" | "remove" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: StrictNumberField<number, unknown, true, false, boolean>;
    }>;
    hardness: ItemAlterationValidator<{
        itemType: StringField<"armor" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "hp-max": ItemAlterationValidator<{
        itemType: StringField<"armor" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "material-type": ItemAlterationValidator<{
        itemType: StringField<"armor" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: StringField<"abysium" | "adamantine" | "darkwood" | "djezet" | "inubrix" | "mithral" | "noqual" | "orichalcum" | "siccatite" | "silver" | "cold-iron" | "dragonhide" | "grisantian-pelt" | "keep-stone" | "peachwood" | "sisterstone" | "sisterstone-dusk" | "sisterstone-scarlet" | "sovereign-steel" | "warpglass", unknown, true, false, boolean>;
    }>;
    "pd-recovery-dc": ItemAlterationValidator<{
        itemType: StringField<"condition", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "downgrade" | "add" | "remove" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "persistent-damage": ItemAlterationValidator<{
        itemType: StringField<"condition", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: import("types/foundry/common/data/fields.d.ts").SchemaField<PersistentDamageValueSchema, SourceFromSchema<PersistentDamageValueSchema>, ModelPropsFromSchema<PersistentDamageValueSchema>, true, false, true>;
    }>;
    rarity: ItemAlterationValidator<{
        itemType: StringField<"armor" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: StringField<"common" | "rare" | "uncommon" | "unique", unknown, true, false, boolean>;
    }>;
    "frequency-max": ItemAlterationValidator<{
        itemType: StringField<"action" | "feat", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: NumberField<number, unknown, true, false, boolean>;
    }>;
    "frequency-per": ItemAlterationValidator<{
        itemType: StringField<"action" | "feat", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "downgrade", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: StringField<string, unknown, true, false, boolean>;
    }>;
    "other-tags": ItemAlterationValidator<{
        itemType: StringField<"armor" | "consumable" | "ancestry" | "class" | "action" | "backpack" | "book" | "equipment" | "treasure" | "weapon" | "affliction" | "background" | "campaignFeature" | "condition" | "deity" | "effect" | "feat" | "heritage" | "kit" | "lore" | "melee" | "spell" | "spellcastingEntry", ItemType, true, false, false>;
        mode: StringField<"add" | "remove" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: SlugField<true, false, boolean>;
    }>;
    "speed-penalty": ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "downgrade" | "add" | "remove" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: StrictNumberField<number, unknown, true, false, boolean>;
    }>;
    strength: ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"override" | "upgrade" | "downgrade" | "add" | "remove" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: StrictNumberField<number, unknown, true, false, boolean>;
    }>;
    traits: ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"add" | "remove" | "subtract", "override" | "upgrade" | "downgrade" | "add" | "remove" | "multiply" | "subtract", true, false, false>;
        value: StringField<"arcane" | "divine" | "occult" | "primal" | "auditory" | "healing" | "holy" | "light" | "magical" | "metal" | "plant" | "unholy" | "water" | "wood" | "air" | "earth" | "fire" | "force" | "adjusted" | "alchemical" | "apex" | "artifact" | "clockwork" | "cursed" | "extradimensional" | "intelligent" | "invested" | "shield-throw-20" | "shield-throw-30" | "aquadynamic" | "aura" | "bulwark" | "comfort" | "companion" | "deflecting-bludgeoning" | "deflecting-physical-ranged" | "deflecting-slashing" | "entrench-melee" | "entrench-ranged" | "flexible" | "focused" | "foldaway" | "harnessed" | "hefty-14" | "hindering" | "inscribed" | "integrated-1d6-b" | "integrated-1d6-p" | "integrated-1d6-s" | "integrated-1d6-s-versatile-p" | "laminar" | "launching-dart" | "noisy" | "ponderous" | "barding" | "deflecting-piercing", "arcane" | "divine" | "occult" | "primal" | "auditory" | "healing" | "holy" | "light" | "magical" | "metal" | "plant" | "unholy" | "water" | "wood" | "air" | "earth" | "fire" | "force" | "adjusted" | "alchemical" | "apex" | "artifact" | "clockwork" | "cursed" | "extradimensional" | "intelligent" | "invested" | "shield-throw-20" | "shield-throw-30" | "aquadynamic" | "aura" | "bulwark" | "comfort" | "companion" | "deflecting-bludgeoning" | "deflecting-physical-ranged" | "deflecting-slashing" | "entrench-melee" | "entrench-ranged" | "flexible" | "focused" | "foldaway" | "harnessed" | "hefty-14" | "hindering" | "inscribed" | "integrated-1d6-b" | "integrated-1d6-p" | "integrated-1d6-s" | "integrated-1d6-s-versatile-p" | "laminar" | "launching-dart" | "noisy" | "ponderous" | "barding" | "deflecting-piercing", true, false, false>;
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
    value: DataField<JSONValue, unknown, true, boolean, boolean>;
};
type PersistentDamageValueSchema = {
    formula: StringField<string, string, true, false, false>;
    damageType: StringField<DamageType, DamageType, true, false, false>;
    dc: NumberField<number, number, true, false, true>;
};
export { ITEM_ALTERATION_VALIDATORS };
