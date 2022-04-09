import { ItemSystemData, ItemSystemSource, ItemTraits } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import type { MeleePF2e } from ".";
export declare type MeleeSource = BaseNonPhysicalItemSource<"melee", MeleeSystemSource>;
export declare class MeleeData extends BaseNonPhysicalItemData<MeleePF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface MeleeData extends Omit<MeleeSource, "effects" | "flags"> {
    type: MeleeSource["type"];
    data: MeleeSystemData;
    readonly _source: MeleeSource;
}
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
