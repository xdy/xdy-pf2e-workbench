import type { DamageType } from "@system/damage/types.ts";
import { WeaponPF2e } from "./document.ts";
import { WeaponPropertyRuneType } from "./types.ts";
import { CharacterPF2e } from "@actor";
/** A helper class to handle toggleable weapon traits */
declare class WeaponTraitToggles {
    #private;
    constructor(weapon: WeaponPF2e);
    get modular(): {
        options: DamageType[];
        selection: DamageType | null;
    };
    get versatile(): {
        options: DamageType[];
        selection: DamageType | null;
    };
}
/**
 * Update a modular or versatile weapon to change its damage type
 * @returns A promise indicating whether an update was made
 */
declare function toggleWeaponTrait({ weapon, trait, selection }: ToggleWeaponTraitParams): Promise<boolean>;
interface ToggleWeaponTraitParams {
    weapon: WeaponPF2e<CharacterPF2e>;
    trait: "modular" | "versatile";
    selection: DamageType | null;
}
/** Remove duplicate and lesser versions from an array of property runes */
declare function prunePropertyRunes(runes: WeaponPropertyRuneType[]): WeaponPropertyRuneType[];
export { WeaponTraitToggles, prunePropertyRunes, toggleWeaponTrait };
