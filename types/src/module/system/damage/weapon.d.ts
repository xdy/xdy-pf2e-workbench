import { ActorPF2e } from "@actor";
import { DamageDicePF2e, ModifierPF2e } from "@actor/modifiers.ts";
import type { MeleePF2e, WeaponPF2e } from "@item";
import type { NPCAttackDamage } from "@item/melee/data.ts";
import type { WeaponDamage } from "@item/weapon/data.ts";
import { PotencySynthetic } from "@module/rules/synthetics.ts";
import { DamageCategoryUnique, DamageDamageContext, WeaponDamageTemplate } from "./types.ts";
declare class WeaponDamagePF2e {
    #private;
    static fromNPCAttack({ attack, actor, context, }: NPCStrikeCalculateParams): Promise<WeaponDamageTemplate | null>;
    /** Calculates the damage a weapon will deal when striking. Performs side effects, so make sure to pass a clone */
    static calculate({ weapon, actor, damageDice, modifiers, weaponPotency, context, }: WeaponDamageCalculateParams): Promise<WeaponDamageTemplate | null>;
    /** Parse damage formulas from melee items and construct `WeaponDamage` objects out of them */
    static npcDamageToWeaponDamage(instance: NPCAttackDamage): ConvertedNPCDamage;
}
interface ConvertedNPCDamage extends WeaponDamage {
    category: DamageCategoryUnique | null;
}
interface WeaponDamageCalculateParams {
    weapon: WeaponPF2e<ActorPF2e> | MeleePF2e<ActorPF2e>;
    actor: ActorPF2e;
    weaponPotency?: PotencySynthetic | null;
    damageDice?: DamageDicePF2e[];
    modifiers?: ModifierPF2e[];
    context: DamageDamageContext;
}
interface NPCStrikeCalculateParams {
    attack: MeleePF2e<ActorPF2e>;
    actor: ActorPF2e;
    context: DamageDamageContext;
}
export { WeaponDamagePF2e, type ConvertedNPCDamage };
