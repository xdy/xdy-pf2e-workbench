import { SaveType } from "@actor/data";
import { AbilityString } from "@actor/data/base";
import { ItemLevelData, ItemSystemData, ItemTraits } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import { MagicTradition } from "@item/spellcasting-entry/data";
import { DamageType } from "@system/damage";
import { OneToTen, ValuesList } from "@module/data";
import type { SpellPF2e } from "@item";
import { MAGIC_SCHOOLS } from "./values";

export declare type SpellSource = BaseNonPhysicalItemSource<"spell", SpellSystemSource>;
export declare class SpellData extends BaseNonPhysicalItemData<SpellPF2e> {
    /** Prepared data */
    isCantrip: boolean;
    isFocusSpell: boolean;
    isRitual: boolean;
    static DEFAULT_ICON: ImagePath;
}
export interface SpellData extends Omit<SpellSource, "effects" | "flags"> {
    type: SpellSource["type"];
    data: SpellSource["data"];
    readonly _source: SpellSource;
}
export declare type MagicSchool = typeof MAGIC_SCHOOLS[number];
export declare type SpellTrait = keyof ConfigPF2e["PF2E"]["spellTraits"] | MagicSchool | MagicTradition;
export declare type SpellTraits = ItemTraits<SpellTrait>;
declare type SpellDamageCategory = keyof ConfigPF2e["PF2E"]["damageCategories"];
export interface SpellDamageType {
    value: DamageType;
    subtype?: "persistent" | "splash";
    categories: SpellDamageCategory[];
}
export interface SpellDamage {
    value: string;
    applyMod?: boolean;
    type: SpellDamageType;
}
export interface SpellSystemSource extends ItemSystemData, ItemLevelData {
    traits: SpellTraits;
    level: {
        value: OneToTen;
    };
    spellType: {
        value: keyof ConfigPF2e["PF2E"]["spellTypes"];
    };
    category: {
        value: keyof ConfigPF2e["PF2E"]["spellCategories"];
    };
    traditions: ValuesList<MagicTradition>;
    school: {
        value: MagicSchool;
    };
    components: {
        focus: boolean;
        material: boolean;
        somatic: boolean;
        verbal: boolean;
    };
    materials: {
        value: string;
    };
    target: {
        value: string;
    };
    range: {
        value: string;
    };
    area: {
        value: keyof ConfigPF2e["PF2E"]["areaSizes"];
        areaType: keyof ConfigPF2e["PF2E"]["areaTypes"];
    };
    time: {
        value: string;
    };
    duration: {
        value: string;
    };
    damage: {
        value: Record<string, SpellDamage>;
    };
    scaling?: {
        interval: number;
        damage: Record<string, string>;
    };
    save: {
        basic: string;
        value: SaveType | "";
        dc?: number;
        str?: string;
    };
    sustained: {
        value: false;
    };
    cost: {
        value: string;
    };
    ability: {
        value: AbilityString;
    };
    location: {
        value: string;
    };
    heightenedLevel?: {
        value: number;
    };
    hasCounteractCheck: {
        value: boolean;
    };
    autoHeightenLevel: {
        value: OneToTen | null;
    };
}
export declare type SpellSystemData = SpellSystemSource;
export {};
