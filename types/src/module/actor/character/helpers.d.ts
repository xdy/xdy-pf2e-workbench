import { WeaponPF2e } from "@item";
import { ModifierPF2e } from "@actor/modifiers";
import { CharacterPF2e } from ".";
/** Handle weapon traits that introduce modifiers or add other weapon traits */
declare class StrikeWeaponTraits {
    static adjustWeapon(weapon: WeaponPF2e): void;
    static createAttackModifiers(weapon: Embedded<WeaponPF2e>, domains: string[]): ModifierPF2e[];
}
/** Create a penalty for attempting to Force Open without a crowbar or equivalent tool */
declare function createForceOpenPenalty(actor: CharacterPF2e, domains: string[]): ModifierPF2e;
export { createForceOpenPenalty, StrikeWeaponTraits };
