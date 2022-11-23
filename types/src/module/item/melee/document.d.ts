import { ItemPF2e } from "@item/base";
import { ItemSummaryData } from "@item/data";
import { WeaponDamage } from "@item/weapon/data";
import { WeaponRangeIncrement } from "@item/weapon/types";
import { MeleeData, MeleeSystemData, NPCAttackTrait } from "./data";
declare class MeleePF2e extends ItemPF2e {
    get traits(): Set<NPCAttackTrait>;
    get isMelee(): boolean;
    get isRanged(): boolean;
    get isThrown(): boolean;
    /** The ability score this attack is based on: determines which of the Clumsy and Enfeebled conditions apply */
    get ability(): "str" | "dex";
    get attackModifier(): number;
    get reach(): number | null;
    /** The range increment of this attack, or null if a melee attack */
    get rangeIncrement(): WeaponRangeIncrement | null;
    /** Get the maximum range of the attack */
    get maxRange(): number | null;
    /** The first of this attack's damage instances */
    get baseDamage(): WeaponDamage;
    get dealsDamage(): boolean;
    /** Additional effects that are part of this attack */
    get attackEffects(): string[];
    prepareBaseData(): void;
    prepareActorData(): void;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    getChatData(this: Embedded<MeleePF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData & {
        map2: string;
        map3: string;
    } & Omit<MeleeSystemData, "traits">>;
}
interface MeleePF2e {
    readonly data: MeleeData;
}
export { MeleePF2e };
