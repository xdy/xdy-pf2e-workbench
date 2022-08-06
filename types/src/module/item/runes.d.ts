import { DiceModifierPF2e } from "@actor/modifiers";
import { ArmorPF2e, WeaponPF2e } from "@item";
import { OneToFour, Rarity, ZeroToFour, ZeroToThree } from "@module/data";
import { DamageType } from "@system/damage";
import { DamageDieSize } from "@system/damage/damage";
import { DegreeOfSuccessString } from "@system/degree-of-success";
import { RawPredicate } from "@system/predication";
import type { ResilientRuneType } from "./armor/data";
import type { OtherWeaponTag, StrikingRuneType, WeaponPropertyRuneType, WeaponTrait } from "./weapon/types";
export declare function getPropertySlots(item: WeaponPF2e | ArmorPF2e): ZeroToFour;
export declare function getPropertyRunes(item: WeaponPF2e | ArmorPF2e, slots: number): string[];
export declare function getStrikingDice(itemData: {
    strikingRune: {
        value: StrikingRuneType | null;
    };
}): ZeroToThree;
export declare function getResiliencyBonus(itemData: {
    resiliencyRune: {
        value: ResilientRuneType | null;
    };
}): ZeroToThree;
interface RollNoteData {
    outcome?: DegreeOfSuccessString[];
    predicate?: RawPredicate;
    text: string;
}
export interface WeaponPropertyRuneData {
    attack?: {
        notes?: RollNoteData[];
    };
    damage?: {
        dice?: {
            damageType?: DamageType;
            diceNumber?: number;
            dieSize?: DamageDieSize;
            predicate?: RawPredicate;
        }[];
        notes?: RollNoteData[];
    };
    level: number;
    name: string;
    price: number;
    rarity: Rarity;
    slug: string;
    traits: WeaponTrait[];
    otherTags?: OtherWeaponTag[];
}
export declare const WEAPON_PROPERTY_RUNES: Record<WeaponPropertyRuneType, WeaponPropertyRuneData>;
export declare function getPropertyRuneModifiers(runes: WeaponPropertyRuneType[]): DiceModifierPF2e[];
export interface RuneValuationData {
    level: number;
    price: number;
    rarity: Rarity;
    traits: WeaponTrait[];
    otherTags?: OtherWeaponTag[];
}
interface WeaponValuationData {
    potency: {
        0: null;
    } & Record<OneToFour, RuneValuationData>;
    striking: {
        "": null;
    } & Record<StrikingRuneType, RuneValuationData>;
}
export declare const WEAPON_VALUATION_DATA: WeaponValuationData;
export {};
