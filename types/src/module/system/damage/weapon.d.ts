import { CharacterPF2e, HazardPF2e, NPCPF2e } from "@actor";
import { TraitViewData } from "@actor/data/base";
import { DamageDicePF2e, ModifierPF2e } from "@actor/modifiers";
import { MeleePF2e, WeaponPF2e } from "@item";
import { NPCAttackDamage } from "@item/melee/data";
import { WeaponDamage } from "@item/weapon/data";
import { PotencySynthetic } from "@module/rules/synthetics";
import { DamageCategoryUnique, DamageRollContext, WeaponDamageTemplate } from "./types";
declare class WeaponDamagePF2e {
    #private;
    static fromNPCAttack({ attack, actor, actionTraits, proficiencyRank, context, }: NPCStrikeCalculateParams): Promise<WeaponDamageTemplate | null>;
    static calculate({ weapon, actor, damageDice, modifiers, actionTraits, proficiencyRank, weaponPotency, context, }: WeaponDamageCalculateParams): Promise<WeaponDamageTemplate | null>;
    /** Parse damage formulas from melee items and construct `WeaponDamage` objects out of them */
    static npcDamageToWeaponDamage(instance: NPCAttackDamage): ConvertedNPCDamage;
}
interface ConvertedNPCDamage extends WeaponDamage {
    category: DamageCategoryUnique | null;
}
interface WeaponDamageCalculateParams {
    weapon: WeaponPF2e | MeleePF2e;
    actor: CharacterPF2e | NPCPF2e | HazardPF2e;
    actionTraits: TraitViewData[];
    proficiencyRank: number;
    weaponPotency?: PotencySynthetic | null;
    damageDice?: DamageDicePF2e[];
    modifiers?: ModifierPF2e[];
    context: DamageRollContext;
}
interface NPCStrikeCalculateParams {
    attack: MeleePF2e;
    actor: NPCPF2e | HazardPF2e;
    actionTraits: TraitViewData[];
    proficiencyRank: number;
    context: DamageRollContext;
}
export { ConvertedNPCDamage, WeaponDamagePF2e };
