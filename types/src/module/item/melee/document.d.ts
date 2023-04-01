import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item/base";
import { ItemSummaryData } from "@item/data";
import { WeaponPF2e } from "@item/weapon";
import { BaseWeaponType, WeaponCategory, WeaponGroup, WeaponRangeIncrement } from "@item/weapon/types";
import { ConvertedNPCDamage } from "@system/damage/weapon";
import { MeleeFlags, MeleeSource, MeleeSystemData, NPCAttackTrait } from "./data";
declare class MeleePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    /** Set during data preparation if a linked weapon is found */
    category: WeaponCategory | null;
    group: WeaponGroup | null;
    baseType: BaseWeaponType | null;
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
    get baseDamage(): ConvertedNPCDamage;
    get dealsDamage(): boolean;
    /** Additional effects that are part of this attack */
    get attackEffects(): string[];
    /** The linked inventory weapon, if this melee item was spawned from one */
    get linkedWeapon(): WeaponPF2e<ActorPF2e> | null;
    protected _initialize(): void;
    prepareBaseData(): void;
    /** Set weapon category, group, and base if that information is available */
    prepareSiblingData(): void;
    prepareActorData(): void;
    getRollOptions(prefix?: string): string[];
    getChatData(this: MeleePF2e<ActorPF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData & {
        map2: string;
        map3: string;
    } & Omit<MeleeSystemData, "traits">>;
}
interface MeleePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    flags: MeleeFlags;
    readonly _source: MeleeSource;
    system: MeleeSystemData;
}
export { MeleePF2e };
