import { ActorPF2e } from "@actor";
import { PrototypeTokenPF2e } from "@actor/data/base.ts";
import { TokenPF2e } from "@module/canvas/index.ts";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter/index.ts";
import { ScenePF2e, TokenConfigPF2e } from "@scene/index.ts";
import { ActorDeltaPF2e } from "./actor-delta.ts";
import { TokenAura } from "./aura/index.ts";
import { TokenFlagsPF2e } from "./data.ts";
declare class TokenDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends TokenDocument<TParent> {
    #private;
    /** Has this token gone through at least one cycle of data preparation? */
    private constructed;
    auras: Map<string, TokenAura>;
    /** Returns if the token is in combat, though some actors have different conditions */
    get inCombat(): boolean;
    /** Check actor for effects found in `CONFIG.specialStatusEffects` */
    hasStatusEffect(statusId: string): boolean;
    /** Filter trackable attributes for relevance and avoidance of circular references */
    static getTrackedAttributes(data?: Record<string, unknown>, _path?: string[]): TrackedAttributesDescription;
    /** This should be in Foundry core, but ... */
    get scene(): this["parent"];
    protected _initialize(options?: Record<string, unknown>): void;
    /** Is this token emitting light with a negative value */
    get emitsDarkness(): boolean;
    get rulesBasedVision(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have low-light vision (inclusive of darkvision)? */
    get hasLowLightVision(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have darkvision vision? */
    get hasDarkvision(): boolean;
    /** Is this token's dimensions linked to its actor's size category? */
    get linkToActorSize(): boolean;
    /** Is this token's scale locked at 1 or (for small creatures) 0.8? */
    get autoscale(): boolean;
    get playersCanSeeName(): boolean;
    /** The pixel-coordinate definition of this token's space */
    get bounds(): PIXI.Rectangle;
    /** The pixel-coordinate pair constituting this token's center */
    get center(): Point;
    /** If rules-based vision is enabled, disable manually configured vision radii */
    prepareBaseData(): void;
    /** Reset sight defaults if using rules-based vision */
    protected _prepareDetectionModes(): void;
    prepareDerivedData(): void;
    /** Synchronize the token image with the actor image if the token does not currently have an image */
    static assignDefaultImage(token: TokenDocumentPF2e | PrototypeTokenPF2e<ActorPF2e>): void;
    /** Set a TokenData instance's dimensions from actor data. Static so actors can use for their prototypes */
    static prepareSize(token: TokenDocumentPF2e | PrototypeTokenPF2e<ActorPF2e>): void;
    /** Set a token's initiative on the current encounter, creating a combatant if necessary */
    setInitiative({ initiative, sendMessage, }: {
        initiative: number;
        sendMessage?: boolean;
    }): Promise<void>;
    /** Toggle token hiding if this token's actor is a loot actor */
    protected _onCreate(data: this["_source"], options: DocumentModificationContext<TParent>, userId: string): void;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<TParent>, userId: string): void;
    /** Reinitialize vision if the actor's senses were updated directly */
    protected _onRelatedUpdate(update?: Record<string, unknown>, options?: DocumentModificationContext<null>): void;
    protected _onDelete(options: DocumentModificationContext<TParent>, userId: string): void;
}
interface TokenDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends TokenDocument<TParent> {
    flags: TokenFlagsPF2e;
    get actor(): ActorPF2e<this | null> | null;
    get combatant(): CombatantPF2e<EncounterPF2e, this> | null;
    get object(): TokenPF2e<this> | null;
    get sheet(): TokenConfigPF2e<this>;
    delta: ActorDeltaPF2e<this> | null;
}
export { TokenDocumentPF2e };
