import type { ActorPF2e } from "@actor";
import type { WeaponPF2e } from "@item";
import type { DamageType } from "@system/damage/types.ts";
/** A helper class to handle toggleable weapon traits */
declare class WeaponTraitToggles {
    #private;
    parent: WeaponPF2e;
    constructor(weapon: WeaponPF2e);
    get actor(): ActorPF2e | null;
    get doubleBarrel(): {
        selected: boolean;
    };
    get modular(): {
        options: DamageType[];
        selected: DamageType | null;
    };
    get versatile(): {
        options: DamageType[];
        selected: DamageType | null;
    };
    applyChanges(): void;
    /**
     * Update a modular or versatile weapon to change its damage type
     * @returns A promise indicating whether an update was made
     */
    update({ trait, selected }: ToggleWeaponTraitParams): Promise<boolean>;
}
interface ToggleDoubleBarrelParams {
    trait: "double-barrel";
    selected: boolean;
}
interface ToggleModularVersatileParams {
    trait: "modular" | "versatile";
    selected: DamageType | null;
}
type ToggleWeaponTraitParams = ToggleDoubleBarrelParams | ToggleModularVersatileParams;
export { WeaponTraitToggles };
