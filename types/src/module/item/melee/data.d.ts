import { BaseItemDataPF2e, BaseItemSourcePF2e, ItemSystemData, ItemSystemSource, ItemTraits } from "@item/data/base";
import type { MeleePF2e } from ".";
export declare type MeleeSource = BaseItemSourcePF2e<"melee", MeleeSystemSource>;
declare type MeleeData = Omit<MeleeSource, "effects" | "flags"> & BaseItemDataPF2e<MeleePF2e, "melee", MeleeSystemData, MeleeSource>;
export interface MeleeDamageRoll {
    damage: string;
    damageType: string;
}
export declare type NPCAttackTrait = keyof ConfigPF2e["PF2E"]["npcAttackTraits"];
export declare type NPCAttackTraits = ItemTraits<NPCAttackTrait>;
export interface MeleeSystemSource extends ItemSystemSource {
    traits: NPCAttackTraits;
    attack: {
        value: string;
    };
    damageRolls: Record<string, MeleeDamageRoll>;
    bonus: {
        value: number;
    };
    attackEffects: {
        value: string[];
    };
    weaponType: {
        value: "melee" | "ranged";
    };
}
export declare type MeleeSystemData = MeleeSystemSource & Omit<ItemSystemData, "traits">;
export { MeleeData };
