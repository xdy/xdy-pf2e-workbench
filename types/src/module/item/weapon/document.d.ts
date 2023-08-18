import { ActorPF2e } from "@actor";
import { AttributeString } from "@actor/types.ts";
import { ConsumablePF2e, MeleePF2e, PhysicalItemPF2e } from "@item";
import { ItemSummaryData } from "@item/data/index.ts";
import { CoinsPF2e, IdentificationStatus, MystifiedData } from "@item/physical/index.ts";
import { UserPF2e } from "@module/user/index.ts";
import type { WeaponDamage, WeaponFlags, WeaponMaterialData, WeaponSource, WeaponSystemData } from "./data.ts";
import type { BaseWeaponType, OtherWeaponTag, WeaponCategory, WeaponGroup, WeaponRangeIncrement, WeaponReloadTime, WeaponTrait } from "./types.ts";
declare class WeaponPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    /** Given this weapon is an alternative usage, whether it is melee or thrown */
    altUsageType: "melee" | "thrown" | null;
    get isEquipped(): boolean;
    isStackableWith(item: PhysicalItemPF2e<TParent>): boolean;
    get baseType(): BaseWeaponType | null;
    get group(): WeaponGroup | null;
    get category(): WeaponCategory;
    /** The default ability used in attack rolls */
    get defaultAbility(): AttributeString;
    get hands(): "0" | "1" | "1+" | "2";
    /** The range increment of this weapon, or null if a melee weapon */
    get rangeIncrement(): WeaponRangeIncrement | null;
    /** The maximum range of this weapon: `null` if melee, and usually 6 * range increment if ranged */
    get maxRange(): number | null;
    get reload(): WeaponReloadTime | null;
    get isSpecific(): boolean;
    get isMelee(): boolean;
    get isRanged(): boolean;
    /** Whether the weapon in its current usage is thrown: a thrown-only weapon or a thrown usage of a melee weapon */
    get isThrown(): boolean;
    /** Whether the weapon is _can be_ thrown: a thrown-only weapon or one that has a throwable usage */
    get isThrowable(): boolean;
    get isOversized(): boolean;
    /** This weapon's damage before modification by creature abilities, effects, etc. */
    get baseDamage(): WeaponDamage;
    /** Does this weapon deal damage? */
    get dealsDamage(): boolean;
    get material(): WeaponMaterialData;
    /** Does this weapon require ammunition in order to make a strike? */
    get requiresAmmo(): boolean;
    get ammo(): ConsumablePF2e<ActorPF2e> | WeaponPF2e<ActorPF2e> | null;
    get otherTags(): Set<OtherWeaponTag>;
    /** Whether this weapon can serve as ammunition for another weapon */
    isAmmoFor(weapon: WeaponPF2e): boolean;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    prepareBaseData(): void;
    private prepareMaterialAndRunes;
    /** Set level, price, and rarity according to precious material and runes */
    private prepareLevelAndRarity;
    prepareDerivedData(): void;
    /** Add the rule elements of this weapon's linked ammunition to its own list */
    prepareSiblingData(): void;
    computeAdjustedPrice(): CoinsPF2e | null;
    private getRunesValuationData;
    private getMaterialValuationData;
    getChatData(this: WeaponPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<ItemSummaryData>;
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
    /** Consume a unit of ammunition used by this weapon */
    consumeAmmo(): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<TParent>, user: UserPF2e): Promise<boolean | void>;
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
