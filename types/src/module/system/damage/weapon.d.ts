import { CharacterPF2e, HazardPF2e, NPCPF2e } from "@actor";
import { TraitViewData } from "@actor/data/base";
import { MeleePF2e, WeaponPF2e } from "@item";
import { MeleeDamageRoll } from "@item/melee/data";
import { WeaponDamage } from "@item/weapon/data";
import { PotencySynthetic } from "@module/rules/synthetics";
import { WeaponDamageTemplate } from "./types";
declare class WeaponDamagePF2e {
    #private;
    static calculateStrikeNPC(attack: MeleePF2e, actor: NPCPF2e | HazardPF2e, actionTraits?: TraitViewData[], proficiencyRank?: number, options?: Set<string>): WeaponDamageTemplate | null;
    static calculate(weapon: WeaponPF2e | MeleePF2e, actor: CharacterPF2e | NPCPF2e | HazardPF2e, actionTraits: TraitViewData[] | undefined, proficiencyRank: number, options: Set<string>, weaponPotency?: PotencySynthetic | null): WeaponDamageTemplate | null;
    /** Parse damage formulas from melee items and construct `WeaponDamage` objects out of them */
    static npcDamageToWeaponDamage(instance: MeleeDamageRoll): WeaponDamage;
    /** Determine whether the damage source is a strength-based statistic */
    static strengthBasedDamage(weapon: WeaponPF2e | MeleePF2e): boolean;
    /** Determine whether a strike's damage includes the actor's strength modifier */
    static strengthModToDamage(weapon: WeaponPF2e | MeleePF2e): boolean;
}
export { WeaponDamagePF2e };
