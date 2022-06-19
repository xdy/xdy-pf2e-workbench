import { ItemPF2e } from "@item/base";
import { WeaponRangeIncrement } from "@item/weapon/types";
import { MeleeData, NPCAttackTrait } from "./data";
export declare class MeleePF2e extends ItemPF2e {
    get traits(): Set<NPCAttackTrait>;
    get isMelee(): boolean;
    get isRanged(): boolean;
    get isThrown(): boolean;
    /** The range increment of this attack, or null if a melee attack */
    get rangeIncrement(): WeaponRangeIncrement | null;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    getChatData(this: Embedded<MeleePF2e>, htmlOptions?: EnrichHTMLOptions): Record<string, unknown>;
}
export interface MeleePF2e {
    readonly data: MeleeData;
}
