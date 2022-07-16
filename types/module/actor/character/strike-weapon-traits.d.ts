import { WeaponPF2e } from "@item";
import { ModifierPF2e } from "@actor/modifiers";
/** Handle weapon traits that introduce modifiers or add other weapon traits */
declare class StrikeWeaponTraits {
    static adjustWeapon(weapon: WeaponPF2e): void;
    static createAttackModifiers(weapon: WeaponPF2e): ModifierPF2e[];
}
export { StrikeWeaponTraits };
