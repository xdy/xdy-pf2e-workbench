import { ActorAlliance, ActorDimensions, ActorInstances, ApplyDamageParams, AttackItem, AuraData, CheckContext, CheckContextParams, DamageRollContextParams, EmbeddedItemInstances, RollContext, RollContextParams, SaveType } from "@actor/types.ts";
import { AbstractEffectPF2e, ArmorPF2e, ContainerPF2e, ItemPF2e, PhysicalItemPF2e } from "@item";
import { ConditionKey, ConditionSlug, ConditionSource, type ConditionPF2e } from "@item/condition/index.ts";
import { ItemSourcePF2e, ItemType, PhysicalItemSource } from "@item/data/index.ts";
import { EffectSource } from "@item/effect/data.ts";
import type { ActiveEffectPF2e } from "@module/active-effect.ts";
import { TokenPF2e } from "@module/canvas/index.ts";
import { AppliedDamageFlag } from "@module/chat-message/index.ts";
import { Size } from "@module/data.ts";
import { ScenePF2e, TokenDocumentPF2e, UserPF2e } from "@module/documents.ts";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter/index.ts";
import { RuleElementSynthetics } from "@module/rules/index.ts";
import { RuleElementPF2e } from "@module/rules/rule-element/base.ts";
import { DamageType } from "@system/damage/types.ts";
import { ArmorStatistic } from "@system/statistic/armor-class.ts";
import { Statistic, StatisticCheck, StatisticDifficultyClass } from "@system/statistic/index.ts";
import { EnrichmentOptionsPF2e } from "@system/text-editor.ts";
import { ActorConditions } from "./conditions.ts";
import { Abilities, CreatureSkills, VisionLevel } from "./creature/data.ts";
import { GetReachParameters, ModeOfBeing } from "./creature/types.ts";
import { ActorFlagsPF2e, ActorSystemData, PrototypeTokenPF2e, RollOptionFlags, StrikeData } from "./data/base.ts";
import { ActorSourcePF2e, ActorType } from "./data/index.ts";
import { ActorInitiative } from "./initiative.ts";
import { ActorInventory } from "./inventory/index.ts";
import { ActorSheetPF2e } from "./sheet/base.ts";
import { ActorSpellcasting } from "./spellcasting.ts";
/**
 * Extend the base Actor class to implement additional logic specialized for PF2e.
 * @category Actor
 */
declare class ActorPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends Actor<TParent> {
    /** Has this actor completed construction? */
    constructed: boolean;
    /** Handles rolling initiative for the current actor */
    initiative: ActorInitiative | null;
    /** A separate collection of owned physical items for convenient access */
    inventory: ActorInventory<this>;
    armorClass: StatisticDifficultyClass<ArmorStatistic> | null;
    /** A separate collection of owned spellcasting entries for convenience */
    spellcasting: ActorSpellcasting<this>;
    /** Rule elements drawn from owned items */
    rules: RuleElementPF2e[];
    synthetics: RuleElementSynthetics;
    /** Saving throw statistics */
    saves?: {
        [K in SaveType]?: Statistic;
    };
    /** Data from rule elements for auras this actor may be emanating */
    auras: Map<string, AuraData>;
    /** A collection of this actor's conditions */
    conditions: ActorConditions<this>;
    perception?: Statistic;
    /** Skill checks for the actor if supported by the actor type */
    skills?: Partial<CreatureSkills>;
    /** A cached copy of `Actor#itemTypes`, lazily regenerated every data preparation cycle */
    private _itemTypes;
    constructor(data: PreCreate<ActorSourcePF2e>, context?: DocumentConstructionContext<TParent>);
    static getDefaultArtwork(actorData: foundry.documents.ActorSource | PreDocumentId<foundry.documents.ActorSource>): {
        img: ImageFilePath;
        texture: {
            src: ImageFilePath | VideoFilePath;
        };
    };
    /** Cache the return data before passing it to the caller */
    get itemTypes(): EmbeddedItemInstances<this>;
    get allowedItemTypes(): (ItemType | "physical")[];
    /** The compendium source ID of the actor **/
    get sourceId(): ActorUUID | null;
    /** The recorded schema version of this actor, updated after each data migration */
    get schemaVersion(): number | null;
    /** Get an active GM or, failing that, a player who can update this actor */
    get primaryUpdater(): UserPF2e | null;
    get abilities(): Abilities | null;
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
    get isDead(): boolean;
    get modeOfBeing(): ModeOfBeing;
    get visionLevel(): VisionLevel;
    /** Does this creature emit sound? False unless a subclass overrides it */
    get emitsSound(): boolean;
    get rollOptions(): RollOptionFlags;
    /** Get the actor's held shield. Meaningful implementation in `CreaturePF2e`'s override. */
    get heldShield(): ArmorPF2e<this> | null;
    /** The actor's hardness: zero with the exception of some hazards and NPCs */
    get hardness(): number;
    /** Most actor types can host rule elements */
    get canHostRuleElements(): boolean;
    get alliance(): ActorAlliance;
    get combatant(): CombatantPF2e<EncounterPF2e> | null;
    /** Add effect icons from effect items and rule elements */
    get temporaryEffects(): TemporaryEffect[];
    /** A means of checking this actor's type without risk of circular import references */
    isOfType<T extends "creature" | ActorType>(...types: T[]): this is ActorInstances<TParent>[T];
    /** Whether this actor is an ally of the provided actor */
    isAllyOf(actor: ActorPF2e): boolean;
    /** Whether this actor is an enemy of the provided actor */
    isEnemyOf(actor: ActorPF2e): boolean;
    /** Whether this actor is immune to an effect of a certain type */
    isImmuneTo(effect: AbstractEffectPF2e | ConditionSource | EffectSource | ConditionSlug): boolean;
    /** Whether this actor is affected by damage of a certain type despite lack of explicit immunity */
    isAffectedBy(damage: DamageType | ConditionPF2e): boolean;
    /** Get (almost) any statistic by slug: handling expands in `ActorPF2e` subclasses */
    getStatistic(slug: string): Statistic | null;
    /** Get roll options from this actor's effects, traits, and other properties */
    getSelfRollOptions(prefix?: "self" | "target" | "origin"): string[];
    /** The actor's reach: a meaningful implementation is found in `CreaturePF2e` and `HazardPF2e`. */
    getReach(_options: GetReachParameters): number;
    /** Create a clone of this actor to recalculate its statistics with ephemeral effects and roll options included */
    getContextualClone(rollOptions: string[], ephemeralEffects?: (ConditionSource | EffectSource)[]): this;
    /** Apply effects from an aura: will later be expanded to handle effects from measured templates */
    applyAreaEffects(aura: AuraData, origin: {
        actor: ActorPF2e;
        token: TokenDocumentPF2e;
    }): Promise<void>;
    /** Don't allow the user to create in development actor types. */
    static createDialog<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, data?: Record<string, unknown>, context?: {
        parent?: TDocument["parent"];
        pack?: Collection<TDocument> | null;
        types?: (ActorType | "creature")[];
    } & Partial<FormApplicationOptions>): Promise<TDocument | null>;
    /**
     * As of Foundry 0.8: All subclasses of ActorPF2e need to use this factory method rather than having their own
     * overrides, since Foundry itself will call `ActorPF2e.create` when a new actor is created from the sidebar.
     */
    static createDocuments<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, data?: (TDocument | PreCreate<TDocument["_source"]>)[], context?: DocumentModificationContext<TDocument["parent"]>): Promise<TDocument[]>;
    static updateDocuments<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, updates?: DocumentUpdateData<TDocument>[], context?: DocumentUpdateContext<TDocument["parent"]>): Promise<TDocument[]>;
    protected _initialize(options?: Record<string, unknown>): void;
    /** Set module art if available */
    protected _initializeSource(source: Record<string, unknown>, options?: DocumentConstructionContext<TParent>): this["_source"];
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
    protected getRollContext<TStatistic extends StatisticCheck | StrikeData | null, TItem extends AttackItem | null>(params: RollContextParams<TStatistic, TItem>): Promise<RollContext<this, TStatistic, TItem>>;
    /** Calculate attack roll targeting data, including the target's DC. */
    getCheckContext<TStatistic extends StatisticCheck | StrikeData, TItem extends AttackItem | null>(params: CheckContextParams<TStatistic, TItem>): Promise<CheckContext<this, TStatistic, TItem>>;
    /** Acquire additional data for a damage roll. */
    getDamageRollContext<TStatistic extends StatisticCheck | StrikeData | null, TItem extends AttackItem | null>(params: DamageRollContextParams<TStatistic, TItem>): Promise<RollContext<this, TStatistic, TItem>>;
    /** Toggle the provided roll option (swapping it from true to false or vice versa). */
    toggleRollOption(domain: string, option: string, value?: boolean): Promise<boolean | null>;
    toggleRollOption(domain: string, option: string, itemId?: string | null, value?: boolean, suboption?: string | null): Promise<boolean | null>;
    /**
     * Handle how changes to a Token attribute bar are applied to the Actor.
     *
     * If the attribute bar is for hp and the change is in delta form, defer to the applyDamage method. Otherwise, do
     * nothing special.
     * @param attribute The attribute path
     * @param value     The target attribute value
     * @param isDelta   Whether the number represents a relative change (true) or an absolute change (false)
     * @param isBar     Whether the new value is part of an attribute bar, or just a direct value
     */
    modifyTokenAttribute(attribute: string, value: number, isDelta?: boolean, isBar?: boolean): Promise<this>;
    /**
     * Apply rolled dice damage to the token or tokens which are currently controlled.
     * This allows for damage to be scaled by a multiplier to account for healing, critical hits, or resistance
     * @param finalDamage The amount of damage inflicted
     * @param token The applicable token for this actor
     * @param shieldBlockRequest Whether the user has toggled the Shield Block button
     */
    applyDamage({ damage, token, item, rollOptions, skipIWR, shieldBlockRequest, breakdown, notes, }: ApplyDamageParams): Promise<this>;
    /** Revert applied actor damage based on the AppliedDamageFlag stored in a damage chat message */
    undoDamage(appliedDamage: AppliedDamageFlag): Promise<void>;
    isLootableBy(user: UserPF2e): boolean;
    /**
     * Moves an item to another actor's inventory.
     * @param targetActor Instance of actor to be receiving the item.
     * @param item        Instance of the item being transferred.
     * @param quantity    Number of items to move.
     * @param containerId Id of the container that will contain the item.
     * @return The target item, if the transfer is successful, or otherwise `null`.
     */
    transferItemToActor(targetActor: ActorPF2e, item: ItemPF2e<ActorPF2e>, quantity: number, containerId?: string, newStack?: boolean): Promise<PhysicalItemPF2e<ActorPF2e> | null>;
    addToInventory(itemSource: PhysicalItemSource, container?: ContainerPF2e<this>, newStack?: boolean): Promise<PhysicalItemPF2e<this> | null>;
    /** Find an item already owned by the actor that can stack with the to-be-transferred item */
    findStackableItem<TActor extends this>(actor: TActor, itemSource: ItemSourcePF2e): PhysicalItemPF2e<TActor> | null;
    /** Move an item into the inventory into or out of a container */
    stowOrUnstow(item: PhysicalItemPF2e<this>, container?: ContainerPF2e<this>): Promise<void>;
    /** Determine actor updates for applying damage/healing across temporary hit points, stamina, and then hit points */
    private calculateHealthDelta;
    /**
     * Retrieve all roll option from the requested domains. Micro-optimized in an excessively verbose for-loop.
     * @param domains The domains of discourse from which to pull options. Always includes the "all" domain.
     */
    getRollOptions(domains?: string[]): string[];
    /** This allows @actor.level and such to work for macros and inline rolls */
    getRollData(): NonNullable<EnrichmentOptionsPF2e["rollData"]>;
    /** Gets an active condition on the actor or a list of conditions sorted by descending value. */
    getCondition(slugOrKey: ConditionKey, { all }: {
        all: true;
    }): ConditionPF2e<this>[];
    getCondition(slugOrKey: ConditionKey, { all }: {
        all?: false;
    }): ConditionPF2e<this> | null;
    getCondition(slugOrKey: ConditionKey): ConditionPF2e<this> | null;
    getCondition(slugOrKey: ConditionKey, { all }: {
        all?: boolean;
    }): ConditionPF2e<this>[] | ConditionPF2e<this> | null;
    /**
     * Does this actor have any of the provided condition?
     * @param slugs Slug(s) of the queried condition(s)
     */
    hasCondition(...slugs: ConditionSlug[]): boolean;
    /** Decrease the value of condition or remove it entirely */
    decreaseCondition(conditionSlug: ConditionKey | ConditionPF2e<this>, { forceRemove }?: {
        forceRemove: boolean;
    }): Promise<void>;
    /** Increase a valued condition, or create a new one if not present */
    increaseCondition(conditionSlug: ConditionSlug | ConditionPF2e<this>, { min, max, value, }?: {
        min?: number | null;
        max?: number | null;
        value?: number | null;
    }): Promise<ConditionPF2e<this> | null>;
    /** Toggle a condition as present or absent. If a valued condition is toggled on, it will be set to a value of 1. */
    toggleCondition(conditionSlug: ConditionSlug): Promise<void>;
    /** Assess and pre-process this JSON data, ensuring it's importable and fully migrated */
    importFromJSON(json: string): Promise<this>;
    protected _applyDefaultTokenSettings(data: PreDocumentId<this["_source"]>, options?: {
        fromCompendium?: boolean;
    }): DeepPartial<this["_source"]>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: ActorUpdateContext<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: ActorUpdateContext<TParent>, userId: string): void;
    /**
     * Work around upstream issue in which `TokenDocument#_onUpdateBaseActor` is only called for tokens in the viewed
     * scene.
     */
    protected _updateDependentTokens(update?: Record<string, unknown>, options?: DocumentModificationContext<TParent>): void;
    /** Unregister all effects possessed by this actor */
    protected _onDelete(options: DocumentModificationContext<TParent>, userId: string): void;
    protected _onEmbeddedDocumentChange(): void;
}
interface ActorPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends Actor<TParent> {
    flags: ActorFlagsPF2e;
    readonly _source: ActorSourcePF2e;
    readonly effects: foundry.abstract.EmbeddedCollection<ActiveEffectPF2e<this>>;
    readonly items: foundry.abstract.EmbeddedCollection<ItemPF2e<this>>;
    system: ActorSystemData;
    prototypeToken: PrototypeTokenPF2e<this>;
    get sheet(): ActorSheetPF2e<this>;
    update(data: DocumentUpdateData<this>, options?: ActorUpdateContext<TParent>): Promise<this>;
    getActiveTokens(linked: boolean | undefined, document: true): TokenDocumentPF2e<ScenePF2e>[];
    getActiveTokens(linked?: boolean | undefined, document?: false): TokenPF2e<TokenDocumentPF2e<ScenePF2e>>[];
    getActiveTokens(linked?: boolean, document?: boolean): TokenDocumentPF2e<ScenePF2e>[] | TokenPF2e<TokenDocumentPF2e<ScenePF2e>>[];
    _preCreate(data: PreDocumentId<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** See implementation in class */
    createEmbeddedDocuments(embeddedName: "ActiveEffect", data: PreCreate<foundry.documents.ActiveEffectSource>[], context?: DocumentModificationContext<this>): Promise<ActiveEffectPF2e<this>[]>;
    createEmbeddedDocuments(embeddedName: "Item", data: PreCreate<ItemSourcePF2e>[], context?: DocumentModificationContext<this>): Promise<ItemPF2e<this>[]>;
    createEmbeddedDocuments(embeddedName: "ActiveEffect" | "Item", data: PreCreate<foundry.documents.ActiveEffectSource>[] | PreCreate<ItemSourcePF2e>[], context?: DocumentModificationContext<this>): Promise<ActiveEffectPF2e<this>[] | ItemPF2e<this>[]>;
    /** See implementation in class */
    updateEmbeddedDocuments(embeddedName: "ActiveEffect", updateData: EmbeddedDocumentUpdateData<ActiveEffectPF2e<this>>[], options?: DocumentUpdateContext<this>): Promise<ActiveEffectPF2e<this>[]>;
    updateEmbeddedDocuments(embeddedName: "Item", updateData: EmbeddedDocumentUpdateData<ItemPF2e<this>>[], options?: DocumentUpdateContext<this>): Promise<ItemPF2e<this>[]>;
    updateEmbeddedDocuments(embeddedName: "ActiveEffect" | "Item", updateData: EmbeddedDocumentUpdateData<ActiveEffectPF2e<this> | ItemPF2e<this>>[], options?: DocumentUpdateContext<this>): Promise<ActiveEffectPF2e<this>[] | ItemPF2e<this>[]>;
    /** Added as debounced method */
    checkAreaEffects(): void;
}
interface HitPointsSummary {
    value: number;
    max: number;
    temp: number;
    unrecoverable: number;
    negativeHealing: boolean;
}
interface ActorUpdateContext<TParent extends TokenDocumentPF2e | null> extends DocumentUpdateContext<TParent> {
    damageTaken?: number;
    damageUndo?: boolean;
}
/** A `Proxy` to to get Foundry to construct `ActorPF2e` subclasses */
declare const ActorProxyPF2e: typeof ActorPF2e;
export { ActorPF2e, ActorProxyPF2e, ActorUpdateContext, HitPointsSummary };
