import { ActorPF2e } from "@actor";
import { ConsumablePF2e, MeleePF2e, PhysicalItemPF2e } from "@item";
import { ItemSummaryData } from "@item/data";
import { CoinsPF2e, IdentificationStatus, MystifiedData } from "@item/physical";
import { UserPF2e } from "@module/user";
import { WeaponDamage, WeaponFlags, WeaponMaterialData, WeaponSource, WeaponSystemData } from "./data";
import { BaseWeaponType, OtherWeaponTag, WeaponCategory, WeaponGroup, WeaponRangeIncrement, WeaponReloadTime, WeaponTrait } from "./types";
declare class WeaponPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    /** Given this weapon is an alternative usage, whether it is melee or thrown */
    altUsageType: "melee" | "thrown" | null;
    get isEquipped(): boolean;
    isStackableWith(item: PhysicalItemPF2e<TParent>): boolean;
    get baseType(): BaseWeaponType | null;
    get group(): WeaponGroup | null;
    get category(): WeaponCategory;
    get hands(): "0" | "1" | "1+" | "2";
    /** The range increment of this weapon, or null if a melee weapon */
    get rangeIncrement(): WeaponRangeIncrement | null;
    /** The maximum range of this weapon: `null` if melee, and usually 6 * range increment if ranged */
    get maxRange(): number | null;
    get reload(): WeaponReloadTime | null;
    get isSpecific(): boolean;
    get isMelee(): boolean;
    get isRanged(): boolean;
    get isThrown(): boolean;
    get isOversized(): boolean;
    /** This weapon's damage before modification by creature abilities, effects, etc. */
    get baseDamage(): WeaponDamage;
    /** Does this weapon deal damage? */
    get dealsDamage(): boolean;
    get material(): WeaponMaterialData;
    /** Does this weapon require ammunition in order to make a strike? */
    get requiresAmmo(): boolean;
    get ammo(): ConsumablePF2e<NonNullable<TParent>> | null;
    get otherTags(): Set<OtherWeaponTag>;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    prepareBaseData(): void;
    private prepareMaterialAndRunes;
    /** Set level, price, and rarity according to precious material and runes */
    private prepareLevelAndRarity;
    /** Add the rule elements of this weapon's linked ammunition to its own list */
    prepareSiblingData(): void;
    computeAdjustedPrice(): CoinsPF2e | null;
    private getRunesValuationData;
    private getMaterialValuationData;
    getChatData(this: WeaponPF2e<ActorPF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData>;
    /** Generate a weapon name base on precious-material composition and runes */
    generateMagicName(): string;
    getMystifiedData(status: IdentificationStatus, { source }?: {
        source?: boolean | undefined;
    }): MystifiedData;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    /**
     * Get the "alternative usages" of a weapon: melee (in the case of combination weapons) and thrown (in the case
     * of thrown melee weapons)
     * @param [options.recurse=true] Whether to get the alternative usages of alternative usages
     */
    getAltUsages(options?: {
        recurse?: boolean;
    }): this[];
    clone(data: DocumentUpdateData<this> | undefined, options: Omit<WeaponCloneOptions, "save"> & {
        save: true;
    }): Promise<this>;
    clone(data?: DocumentUpdateData<this>, options?: Omit<WeaponCloneOptions, "save"> & {
        save?: false;
    }): this;
    clone(data?: DocumentUpdateData<this>, options?: WeaponCloneOptions): this | Promise<this>;
    /** Generate a clone of this thrown melee weapon with its thrown usage overlain, or `null` if not applicable */
    private toThrownUsage;
    /** Generate a clone of this combination weapon with its melee usage overlain, or `null` if not applicable */
    private toMeleeUsage;
    /** Generate a melee item from this weapon for use by NPCs */
    toNPCAttacks(this: WeaponPF2e<ActorPF2e>): MeleePF2e<ActorPF2e>[];
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<TParent>, user: UserPF2e): Promise<void>;
    /** Remove links to this weapon from NPC attacks */
    protected _onDelete(options: DocumentModificationContext<TParent>, userId: string): void;
}
interface WeaponPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    flags: WeaponFlags;
    readonly _source: WeaponSource;
    system: WeaponSystemData;
    get traits(): Set<WeaponTrait>;
}
interface WeaponCloneOptions extends DocumentCloneOptions {
    /** If this clone is an alternative usage, the type */
    altUsage?: "melee" | "thrown";
}
export { WeaponPF2e };
