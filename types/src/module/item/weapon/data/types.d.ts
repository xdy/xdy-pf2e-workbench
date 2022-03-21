import { ItemFlagsPF2e } from "@item/data/base";
import {
    BasePhysicalItemData,
    BasePhysicalItemSource,
    MagicItemSystemData,
    PhysicalItemTraits,
    PreciousMaterialGrade,
    PreciousMaterialType
} from "@item/physical/data";
import { WEAPON_PROPERTY_RUNES } from "@item/runes";
import { OneToFour, ZeroToThree } from "@module/data";
import { DamageDieSize, DamageType } from "@system/damage";
import type { LocalizePF2e } from "@system/localize";
import type { WeaponPF2e } from "../index";
import { MELEE_WEAPON_GROUPS, RANGED_WEAPON_GROUPS, WEAPON_CATEGORIES, WEAPON_GROUPS, WEAPON_RANGES } from "./values";

export interface WeaponSource extends BasePhysicalItemSource<"weapon", WeaponSystemSource> {
    flags: DeepPartial<WeaponFlags>;
}
export declare class WeaponData extends BasePhysicalItemData<WeaponPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface WeaponData extends Omit<WeaponSource, "effects" | "flags"> {
    type: WeaponSource["type"];
    data: WeaponSystemData;
    flags: WeaponFlags;
    readonly _source: WeaponSource;
}
declare type WeaponFlags = ItemFlagsPF2e & {
    pf2e: {
        comboMeleeUsage: boolean;
    };
};
export declare type WeaponTrait = keyof ConfigPF2e["PF2E"]["weaponTraits"];
interface WeaponSourceTraits extends PhysicalItemTraits<WeaponTrait> {
    otherTags?: OtherWeaponTag[];
}
declare type WeaponTraits = Required<WeaponSourceTraits>;
export declare type WeaponCategory = typeof WEAPON_CATEGORIES[number];
export declare type WeaponGroup = typeof WEAPON_GROUPS[number];
export declare type MeleeWeaponGroup = typeof MELEE_WEAPON_GROUPS[number];
export declare type RangedWeaponGroup = typeof RANGED_WEAPON_GROUPS[number];
export declare type BaseWeaponType = keyof typeof LocalizePF2e.translations.PF2E.Weapon.Base;
export interface WeaponDamage {
    value: string;
    dice: number;
    die: DamageDieSize;
    damageType: DamageType;
    modifier: number;
}
export declare type StrikingRuneType = "striking" | "greaterStriking" | "majorStriking";
export declare type WeaponPropertyRuneType = keyof typeof WEAPON_PROPERTY_RUNES[number];
export declare type WeaponMaterialType = Exclude<PreciousMaterialType, "dragonhide" | "grisantian-pelt">;
export interface WeaponRuneData {
    potency: OneToFour | null;
    striking: StrikingRuneType | null;
    property: Record<OneToFour, WeaponPropertyRuneType | null>;
}
/** A weapon can either be unspecific or specific along with baseline material and runes */
declare type SpecificWeaponData = {
    value: false;
} | {
    value: true;
    price: string;
    material: {
        type: WeaponMaterialType;
        grade: PreciousMaterialGrade;
    };
    runes: Omit<WeaponRuneData, "property">;
};
export interface WeaponPropertyRuneSlot {
    value: WeaponPropertyRuneType | null;
}
export interface WeaponSystemSource extends MagicItemSystemData {
    traits: WeaponSourceTraits;
    category: WeaponCategory;
    group: WeaponGroup | null;
    baseItem: BaseWeaponType | null;
    bonus: {
        value: number;
    };
    damage: WeaponDamage;
    bonusDamage?: {
        value: string;
    };
    splashDamage?: {
        value: string;
    };
    range: WeaponRangeIncrement | null;
    reload: {
        value: string | null;
    };
    usage: {
        value: "worngloves" | "held-in-one-hand" | "held-in-one-plus-hands" | "held-in-two-hands";
    };
    MAP: {
        value: string;
    };
    /** A combination weapon's melee usage */
    meleeUsage?: ComboWeaponMeleeUsage;
    /** Whether the weapon is a "specific magic weapon" */
    specific?: SpecificWeaponData;
    potencyRune: {
        value: OneToFour | null;
    };
    strikingRune: {
        value: StrikingRuneType | null;
    };
    propertyRune1: WeaponPropertyRuneSlot;
    propertyRune2: WeaponPropertyRuneSlot;
    propertyRune3: WeaponPropertyRuneSlot;
    propertyRune4: WeaponPropertyRuneSlot;
    preciousMaterial: {
        value: WeaponMaterialType | null;
    };
    property1: {
        value: string;
        dice: number;
        die: string;
        damageType: string;
        critDice: number;
        critDie: string;
        critDamage: string;
        critDamageType: string;
    };
    selectedAmmoId: string | null;
}
export declare type WeaponRangeIncrement = typeof WEAPON_RANGES[number];
export interface WeaponSystemData extends WeaponSystemSource {
    traits: WeaponTraits;
    runes: {
        potency: number;
        striking: ZeroToThree;
        property: WeaponPropertyRuneType[];
    };
}
export interface ComboWeaponMeleeUsage {
    damage: {
        type: DamageType;
        die: DamageDieSize;
    };
    group: MeleeWeaponGroup;
    traits: WeaponTrait[];
}
export declare type OtherWeaponTag = "crossbow" | "ghost-touch";
export {};
