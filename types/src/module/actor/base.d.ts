/// <reference types="jquery" />
import { ModeOfBeing } from "@actor/creature/types";
import { ActorAlliance, ActorDimensions, AuraData, SaveType } from "@actor/types";
import { ArmorPF2e, ContainerPF2e, ItemPF2e, PhysicalItemPF2e, type ConditionPF2e } from "@item";
import { ConditionSlug } from "@item/condition/data";
import { ItemSourcePF2e, ItemType, PhysicalItemSource } from "@item/data";
import type { ActiveEffectPF2e } from "@module/active-effect";
import { TokenPF2e } from "@module/canvas";
import { Size } from "@module/data";
import { RuleElementSynthetics } from "@module/rules";
import { RuleElementPF2e } from "@module/rules/rule-element/base";
import { UserPF2e } from "@module/user";
import { TokenDocumentPF2e } from "@scene";
import { Statistic } from "@system/statistic";
import type { CreaturePF2e } from "./creature";
import { VisionLevel } from "./creature/data";
import { ActorDataPF2e, ActorSourcePF2e, ActorType } from "./data";
import { ActorFlagsPF2e, PrototypeTokenPF2e, RollOptionFlags } from "./data/base";
import { ActorInventory } from "./inventory";
import { ActorSheetPF2e } from "./sheet/base";
import { ActorSpellcasting } from "./spellcasting";
/**
 * Extend the base Actor class to implement additional logic specialized for PF2e.
 * @category Actor
 */
declare class ActorPF2e extends Actor<TokenDocumentPF2e, ItemTypeMap> {
    /** Has this actor gone through at least one cycle of data preparation? */
    private initialized?;
    /** A separate collection of owned physical items for convenient access */
    inventory: ActorInventory;
    /** A separate collection of owned spellcasting entries for convenience */
    spellcasting: ActorSpellcasting;
    /** Rule elements drawn from owned items */
    rules: RuleElementPF2e[];
    synthetics: RuleElementSynthetics;
    /** Data from rule elements for auras this actor may be emanating */
    auras: Map<string, AuraData>;
    saves?: {
        [K in SaveType]?: Statistic;
    };
    /** A cached copy of `Actor#itemTypes`, lazily regenerated every data preparation cycle */
    private _itemTypes?;
    constructor(data: PreCreate<ActorSourcePF2e>, context?: ActorConstructorContextPF2e);
    /** Cache the return data before passing it to the caller */
    get itemTypes(): {
        [K in keyof ItemTypeMap]: Embedded<ItemTypeMap[K]>[];
    };
    get allowedItemTypes(): (ItemType | "physical")[];
    /** The compendium source ID of the actor **/
    get sourceId(): ActorUUID | null;
    /** The recorded schema version of this actor, updated after each data migration */
    get schemaVersion(): number | null;
    /** Get an active GM or, failing that, a player who can update this actor */
    get primaryUpdater(): UserPF2e | null;
    /** Shortcut to system-data attributes */
    get attributes(): this["system"]["attributes"];
    get hitPoints(): HitPointsSummary | null;
    get traits(): Set<string>;
    get level(): number;
    get size(): Size;
    /**
     * With the exception of vehicles, actor heights aren't specified. For the purpose of three-dimensional
     * token-distance measurement, however, the system will generally treat actors as cubes.
     */
    get dimensions(): ActorDimensions;
    /**
     * Whether the actor can see, given its token placement in the current scene.
     * A meaningful implementation is found in `CreaturePF2e`.
     */
    get canSee(): boolean;
    /** Whether this actor can execute actions: meaningful implementations are found in `CreaturePF2e`. */
    get canAct(): boolean;
    /** Whether this actor can attack: meaningful implementations are found in `CreaturePF2e` and `HazardPF2e`. */
    get canAttack(): boolean;
    get modeOfBeing(): ModeOfBeing;
    get visionLevel(): VisionLevel;
    get rollOptions(): RollOptionFlags;
    /** Get the actor's held shield. Meaningful implementation in `CreaturePF2e`'s override. */
    get heldShield(): Embedded<ArmorPF2e> | null;
    /** Most actor types can host rule elements */
    get canHostRuleElements(): boolean;
    get alliance(): ActorAlliance;
    /** Add effect icons from effect items and rule elements */
    get temporaryEffects(): TemporaryEffect[];
    /** A means of checking this actor's type without risk of circular import references */
    isOfType(type: "creature"): this is CreaturePF2e;
    isOfType<T extends ActorType>(...types: T[]): this is InstanceType<ConfigPF2e["PF2E"]["Actor"]["documentClasses"][T]>;
    /** Whether this actor is an ally of the provided actor */
    isAllyOf(actor: ActorPF2e): boolean;
    /** Get roll options from this actor's effects, traits, and other properties */
    getSelfRollOptions(prefix?: "self" | "target" | "origin"): string[];
    /** The actor's reach: a meaningful implementation is found in `CreaturePF2e` and `HazardPF2e`. */
    getReach(_options: {
        action?: "interact" | "attack";
    }): number;
    /** Create a clone of this actor to recalculate its statistics with temporary roll options included */
    getContextualClone(rollOptions: string[]): this;
    /** Apply effects from an aura: will later be expanded to handle effects from measured templates */
    applyAreaEffects(aura: AuraData, { origin }: {
        origin: ActorPF2e;
    }): Promise<void>;
    /** Review `removeOnExit` aura effects and remove any that no longer apply */
    checkAreaEffects(): Promise<void>;
    /**
     * As of Foundry 0.8: All subclasses of ActorPF2e need to use this factory method rather than having their own
     * overrides, since Foundry itself will call `ActorPF2e.create` when a new actor is created from the sidebar.
     */
    static createDocuments<A extends ActorPF2e>(this: ConstructorOf<A>, data?: PreCreate<A["_source"]>[], context?: DocumentModificationContext<A>): Promise<A[]>;
    protected _initialize(): void;
    /** Prepare token data derived from this actor, refresh Effects Panel */
    prepareData(): void;
    /** Prepare baseline ephemeral data applicable to all actor types */
    prepareBaseData(): void;
    /** Prepare the physical-item collection on this actor, item-sibling data, and rule elements */
    prepareEmbeddedDocuments(): void;
    /** Prepare data among owned items as well as actor-data preparation performed by items */
    protected prepareDataFromItems(): void;
    protected prepareRuleElements(): RuleElementPF2e[];
    /** Collect all rule element output */
    protected prepareSynthetics(): void;
    /** Set traits as roll options */
    prepareDerivedData(): void;
    /** Set defaults for this actor's prototype token */
    private preparePrototypeToken;
    /** If there is an active encounter, set roll options for it and this actor's participant */
    setEncounterRollOptions(): void;
    /**
     * Roll a Save Check
     * Prompt the user for input regarding Advantage/Disadvantage and any Situational Bonus.
     * @deprecated
     */
    rollSave(event: JQuery.TriggeredEvent, saveType: SaveType): void;
    /**
     * Roll a Attribute Check
     * Prompt the user for input regarding Advantage/Disadvantage and any Situational Bonus
     * @param skill {String}    The skill id
     */
    rollAttribute(event: JQuery.Event, attributeName: string): void;
    /** Toggle the provided roll option (swapping it from true to false or vice versa). */
    toggleRollOption(domain: string, option: string, value?: boolean): Promise<boolean | null>;
    toggleRollOption(domain: string, option: string, itemId: string | null, value?: boolean): Promise<boolean | null>;
    /**
     * Handle how changes to a Token attribute bar are applied to the Actor.
     *
     * If the attribute bar is for hp and the change is in delta form, defer to the applyDamage method. Otherwise, do nothing special
     * @param attribute The attribute path
     * @param value     The target attribute value
     * @param isDelta   Whether the number represents a relative change (true) or an absolute change (false)
     * @param isBar     Whether the new value is part of an attribute bar, or just a direct value
     */
    modifyTokenAttribute(attribute: string, value: number, isDelta?: boolean, isBar?: boolean): Promise<this>;
    /**
     * Apply rolled dice damage to the token or tokens which are currently controlled.
     * This allows for damage to be scaled by a multiplier to account for healing, critical hits, or resistance
     * @param damage The amount of damage inflicted
     * @param token The applicable token for this actor
     * @param shieldBlockRequest Whether the user has toggled the Shield Block button
     */
    applyDamage(damage: number, token: TokenPF2e, shieldBlockRequest?: boolean): Promise<void>;
    isLootableBy(user: UserPF2e): boolean;
    /**
     * Moves an item to another actor's inventory.
     * @param targetActor Instance of actor to be receiving the item.
     * @param item        Instance of the item being transferred.
     * @param quantity    Number of items to move.
     * @param containerId Id of the container that will contain the item.
     * @return The target item, if the transfer is successful, or otherwise `null`.
     */
    transferItemToActor(targetActor: ActorPF2e, item: Embedded<ItemPF2e>, quantity: number, containerId?: string, newStack?: boolean): Promise<Embedded<PhysicalItemPF2e> | null>;
    addToInventory(itemSource: PhysicalItemSource, container?: Embedded<ContainerPF2e>, newStack?: boolean): Promise<Embedded<PhysicalItemPF2e> | null>;
    /** Find an item already owned by the actor that can stack with the to-be-transferred item */
    findStackableItem(actor: ActorPF2e, itemSource: ItemSourcePF2e): Embedded<PhysicalItemPF2e> | null;
    /**
     * Moves an item into the inventory into or out of a container.
     * @param actor       Actor whose inventory should be edited.
     * @param getItem     Lambda returning the item.
     * @param containerId Id of the container that will contain the item.
     */
    stowOrUnstow(item: Embedded<PhysicalItemPF2e>, container?: Embedded<ContainerPF2e>): Promise<void>;
    /** Determine actor updates for applying damage/healing across temporary hit points, stamina, and then hit points */
    private calculateHealthDelta;
    static getActionGraphics(actionType: string, actionCount?: number): {
        imageUrl: ImagePath;
        actionGlyph: string;
    };
    /**
     * Retrieve all roll option from the requested domains. Micro-optimized in an excessively verbose for-loop.
     * @param domains The domains of discourse from which to pull options. Always includes the "all" domain.
     */
    getRollOptions(domains?: string[]): string[];
    /** This allows @actor.level and such to work for roll macros */
    getRollData(): Record<string, unknown>;
    /**
     * Does this actor have the provided condition?
     * @param slug The slug of the queried condition
     */
    hasCondition(slug: ConditionSlug): boolean;
    /** Decrease the value of condition or remove it entirely */
    decreaseCondition(conditionSlug: ConditionSlug | Embedded<ConditionPF2e>, { forceRemove }?: {
        forceRemove: boolean;
    }): Promise<void>;
    /** Increase a valued condition, or create a new one if not present */
    increaseCondition(conditionSlug: ConditionSlug | Embedded<ConditionPF2e>, { min, max }?: {
        min?: number | null;
        max?: number | null;
    }): Promise<void>;
    /** Toggle a condition as present or absent. If a valued condition is toggled on, it will be set to a value of 1. */
    toggleCondition(conditionSlug: ConditionSlug): Promise<void>;
    /** Assess and pre-process this JSON data, ensuring it's importable and fully migrated */
    importFromJSON(json: string): Promise<this>;
    protected _preCreate(data: PreDocumentId<this["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: ActorUpdateContext<this>, user: UserPF2e): Promise<void>;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: ActorUpdateContext<this>, userId: string): void;
    /** Unregister all effects possessed by this actor */
    protected _onDelete(options: DocumentModificationContext<this>, userId: string): void;
    protected _onEmbeddedDocumentChange(embeddedName: "Item" | "ActiveEffect"): void;
}
interface ActorPF2e extends Actor<TokenDocumentPF2e, ItemTypeMap> {
    readonly data: ActorDataPF2e;
    prototypeToken: PrototypeTokenPF2e;
    flags: ActorFlagsPF2e;
    _sheet: ActorSheetPF2e<this> | ActorSheet<this, ItemPF2e> | null;
    get sheet(): ActorSheetPF2e<this> | ActorSheet<this, ItemPF2e>;
    /** See implementation in class */
    createEmbeddedDocuments(embeddedName: "ActiveEffect", data: PreCreate<foundry.data.ActiveEffectSource>[], context?: DocumentModificationContext): Promise<ActiveEffectPF2e[]>;
    createEmbeddedDocuments(embeddedName: "Item", data: PreCreate<ItemSourcePF2e>[], context?: DocumentModificationContext): Promise<ItemPF2e[]>;
    createEmbeddedDocuments(embeddedName: "ActiveEffect" | "Item", data: PreCreate<foundry.data.ActiveEffectSource>[] | PreCreate<ItemSourcePF2e>[], context?: DocumentModificationContext): Promise<ActiveEffectPF2e[] | ItemPF2e[]>;
    /** See implementation in class */
    updateEmbeddedDocuments(embeddedName: "ActiveEffect", updateData: EmbeddedDocumentUpdateData<ActiveEffectPF2e>[], options?: DocumentModificationContext): Promise<ActiveEffectPF2e[]>;
    updateEmbeddedDocuments(embeddedName: "Item", updateData: EmbeddedDocumentUpdateData<ItemPF2e>[], options?: DocumentModificationContext): Promise<ItemPF2e[]>;
    updateEmbeddedDocuments(embeddedName: "ActiveEffect" | "Item", updateData: EmbeddedDocumentUpdateData<ActiveEffectPF2e | ItemPF2e>[], options?: DocumentModificationContext): Promise<ActiveEffectPF2e[] | ItemPF2e[]>;
    getCondition(conditionType: ConditionSlug, { all }: {
        all: true;
    }): Embedded<ConditionPF2e>[];
    getCondition(conditionType: ConditionSlug, { all }: {
        all: false;
    }): Embedded<ConditionPF2e> | null;
    getCondition(conditionType: ConditionSlug): Embedded<ConditionPF2e> | null;
    getCondition(conditionType: ConditionSlug, { all }: {
        all: boolean;
    }): Embedded<ConditionPF2e>[] | Embedded<ConditionPF2e> | null;
}
interface ActorConstructorContextPF2e extends DocumentConstructionContext<ActorPF2e> {
    pf2e?: {
        ready?: boolean;
    };
}
declare type ItemTypeMap = {
    [K in ItemType]: InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][K]>;
};
interface HitPointsSummary {
    value: number;
    max: number;
    temp: number;
    negativeHealing: boolean;
}
interface ActorUpdateContext<T extends ActorPF2e> extends DocumentUpdateContext<T> {
    damageTaken?: number;
}
export { ActorPF2e, HitPointsSummary, ActorUpdateContext };
