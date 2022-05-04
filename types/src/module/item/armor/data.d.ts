import { BasePhysicalItemData, BasePhysicalItemSource, Investable, PhysicalItemTraits, PhysicalSystemData, PhysicalSystemSource } from "@item/physical/data";
import { ZeroToFour, ZeroToThree } from "@module/data";
import type { LocalizePF2e } from "@module/system/localize";
import type { ArmorPF2e } from ".";
export declare type ArmorSource = BasePhysicalItemSource<"armor", ArmorSystemSource>;
export declare class ArmorData extends BasePhysicalItemData<ArmorPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface ArmorData extends Omit<ArmorSource, "effects" | "flags"> {
    type: ArmorSource["type"];
    data: ArmorSystemData;
    readonly _source: ArmorSource;
}
export declare type ArmorTrait = keyof ConfigPF2e["PF2E"]["armorTraits"];
declare type ArmorTraits = PhysicalItemTraits<ArmorTrait>;
export declare type ArmorCategory = keyof ConfigPF2e["PF2E"]["armorTypes"];
export declare type ArmorGroup = keyof ConfigPF2e["PF2E"]["armorGroups"];
export declare type BaseArmorType = keyof typeof LocalizePF2e.translations.PF2E.Item.Armor.Base;
export declare type ResilientRuneType = "" | "resilient" | "greaterResilient" | "majorResilient";
export interface ArmorSystemSource extends Investable<PhysicalSystemSource> {
    traits: ArmorTraits;
    armor: {
        value: number;
    };
    category: ArmorCategory;
    group: ArmorGroup | null;
    baseItem: BaseArmorType | null;
    strength: {
        value: number;
    };
    dex: {
        value: number;
    };
    check: {
        value: number;
    };
    speed: {
        value: number;
    };
    potencyRune: {
        value: ZeroToFour;
    };
    resiliencyRune: {
        value: ResilientRuneType | "";
    };
    propertyRune1: {
        value: string;
    };
    propertyRune2: {
        value: string;
    };
    propertyRune3: {
        value: string;
    };
    propertyRune4: {
        value: string;
    };
}
interface ArmorSystemData extends Omit<ArmorSystemSource, "temporary" | "usage">, Investable<PhysicalSystemData> {
    baseItem: BaseArmorType;
    traits: ArmorTraits;
    runes: {
        potency: number;
        resilient: ZeroToThree;
        property: string[];
    };
}
export declare const ARMOR_CATEGORIES: readonly ["unarmored", "light", "medium", "heavy"];
export {};
