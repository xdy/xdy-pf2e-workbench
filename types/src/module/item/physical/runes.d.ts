import { DamageDiceParameters, DamageDicePF2e } from "@actor/modifiers";
import { ResistanceType } from "@actor/types";
import { ArmorPF2e, WeaponPF2e } from "@item";
import type { ResilientRuneType } from "@item/armor/types";
import type { OtherWeaponTag, StrikingRuneType, WeaponPropertyRuneType, WeaponTrait } from "@item/weapon/types";
import { OneToFour, Rarity, ZeroToFour, ZeroToThree } from "@module/data";
import { RollNoteSource } from "@module/notes";
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
type RuneDiceProperty = "damageType" | "category" | "diceNumber" | "dieSize" | "predicate" | "critical";
type RuneDiceData = Partial<Pick<DamageDiceParameters, RuneDiceProperty>>;
export interface WeaponPropertyRuneData {
    attack?: {
        notes?: RuneNoteData[];
    };
    damage?: {
        dice?: RuneDiceData[];
        notes?: RuneNoteData[];
        /**
         * A list of resistances this weapon's damage will ignore--not limited to damage from the rune.
         * If `max` is numeric, the resistance ignored will be equal to the lower of the provided maximum and the
         * target's resistance.
         */
        ignoredResistances?: {
            type: ResistanceType;
            max: number | null;
        }[];
    };
    level: number;
    name: string;
    price: number;
    rarity: Rarity;
    slug: string;
    traits: WeaponTrait[];
    otherTags?: OtherWeaponTag[];
}
/** Title and text are mandatory for these notes */
interface RuneNoteData extends Pick<RollNoteSource, "outcome" | "predicate" | "title" | "text"> {
    title: string;
    text: string;
}
export declare const WEAPON_PROPERTY_RUNES: Record<WeaponPropertyRuneType, WeaponPropertyRuneData>;
export declare function getPropertyRuneDice(runes: WeaponPropertyRuneType[]): DamageDicePF2e[];
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
