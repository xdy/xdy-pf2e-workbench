import type { ActorPF2e } from "@actor";
import type { AttributeString } from "@actor/types.ts";
import type { ConsumablePF2e, MeleePF2e, ShieldPF2e } from "@item";
import { PhysicalItemPF2e } from "@item";
import type { ItemSourcePF2e, RawItemChatData } from "@item/base/data/index.ts";
import type { NPCAttackTrait } from "@item/melee/types.ts";
import type { PhysicalItemConstructionContext } from "@item/physical/document.ts";
import { IdentificationStatus, MystifiedData } from "@item/physical/index.ts";
import type { RangeData } from "@item/types.ts";
import type { StrikeRuleElement } from "@module/rules/rule-element/strike.ts";
import type { UserPF2e } from "@module/user/document.ts";
import type { WeaponDamage, WeaponFlags, WeaponSource, WeaponSystemData } from "./data.ts";
import type {
    BaseWeaponType,
    OtherWeaponTag,
    WeaponCategory,
    WeaponGroup,
    WeaponReloadTime,
    WeaponTrait,
} from "./types.ts";

declare class WeaponPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    shield?: ShieldPF2e<TParent>;
    /** The rule element that generated this weapon, if applicable */
    rule?: StrikeRuleElement;
    static get validTraits(): Record<NPCAttackTrait, string>;
    constructor(data: PreCreate<ItemSourcePF2e>, context?: WeaponConstructionContext<TParent>);
    /** Given this weapon is an alternative usage, whether it is melee or thrown */
    altUsageType: "melee" | "thrown" | null;
    get isEquipped(): boolean;
    /** Weapons may have "attached" traits instead of "attached" usages. */
    get isAttachable(): boolean;
    get baseType(): BaseWeaponType | null;
    get group(): WeaponGroup | null;
    get category(): WeaponCategory;
    /** The default attribute used in attack rolls */
    get defaultAttribute(): AttributeString;
    get hands(): "0" | "1" | "1+" | "2";
    /** The maximum range of this weapon: `null` if melee, and usually 6 * range increment if ranged */
    get maxRange(): number | null;
    /** A single object containing range increment and maximum */
    get range(): RangeData | null;
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
    /** The number of units of ammunition required to attack with this weapon */
    get ammoRequired(): number;
    get ammo(): ConsumablePF2e<ActorPF2e> | WeaponPF2e<ActorPF2e> | null;
    get otherTags(): Set<OtherWeaponTag>;
    acceptsSubitem(candidate: PhysicalItemPF2e): boolean;
    isStackableWith(item: PhysicalItemPF2e): boolean;
    /** Whether this weapon can serve as ammunition for another weapon */
    isAmmoFor(weapon: WeaponPF2e): boolean;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string, options?: {
        includeGranter?: boolean;
    }): string[];
    prepareBaseData(): void;
    /** Add the rule elements of this weapon's linked ammunition to its own list */
    prepareSiblingData(): void;
    onPrepareSynthetics(): void;
    getChatData(this: WeaponPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<RawItemChatData>;
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
    clone(data: Record<string, unknown> | undefined, context: Omit<WeaponCloneContext, "save"> & {
        save: true;
    }): Promise<this>;
    clone(data?: Record<string, unknown>, context?: Omit<WeaponCloneContext, "save"> & {
        save?: false;
    }): this;
    clone(data?: Record<string, unknown>, context?: WeaponCloneContext): this | Promise<this>;
    /** Generate a clone of this thrown melee weapon with its thrown usage overlain, or `null` if not applicable */
    private toThrownUsage;
    /** Generate a clone of this combination weapon with its melee usage overlain, or `null` if not applicable */
    private toMeleeUsage;
    /** Generate a melee item from this weapon for use by NPCs */
    toNPCAttacks(this: WeaponPF2e<NonNullable<TParent>>, { keepId }?: {
        keepId?: boolean | undefined;
    }): MeleePF2e<NonNullable<TParent>>[];
    /** Consume a unit of ammunition used by this weapon */
    consumeAmmo(): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** Remove links to this weapon from NPC attacks */
    protected _onDelete(operation: DatabaseDeleteOperation<TParent>, userId: string): void;
}
interface WeaponPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    flags: WeaponFlags;
    readonly _source: WeaponSource;
    system: WeaponSystemData;
    get traits(): Set<WeaponTrait>;
}
interface WeaponConstructionContext<TParent extends ActorPF2e | null> extends PhysicalItemConstructionContext<TParent> {
    shield?: ShieldPF2e<TParent>;
}
interface WeaponCloneContext extends DocumentCloneContext {
    /** If this clone is an alternative usage, the type */
    altUsage?: "melee" | "thrown";
}
export { WeaponPF2e };
