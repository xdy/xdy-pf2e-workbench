import { ActorPF2e } from "@actor";
import { TokenPF2e } from "@module/canvas";
import { ScenePF2e, TokenConfigPF2e } from "@module/scene";
import { TokenDataPF2e } from "./data";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter";
import { PrototypeTokenPF2e } from "@actor/data/base";
import { TokenAura } from "./aura";
declare class TokenDocumentPF2e<TActor extends ActorPF2e = ActorPF2e> extends TokenDocument<TActor> {
    #private;
    /** Has this token gone through at least one cycle of data preparation? */
    private initialized?;
    auras: Map<string, TokenAura>;
    /** Check actor for effects found in `CONFIG.specialStatusEffects` */
    hasStatusEffect(statusId: string): boolean;
    /** Filter trackable attributes for relevance and avoidance of circular references */
    static getTrackedAttributes(data?: Record<string, unknown>, _path?: string[]): TokenAttributes;
    /** This should be in Foundry core, but ... */
    get scene(): this["parent"];
    protected _initialize(): void;
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
    /** Set a TokenData instance's dimensions from actor data. Static so actors can use for their prototypes */
    static prepareSize(token: TokenDocumentPF2e | PrototypeTokenPF2e, actor: ActorPF2e | null): void;
    /** Set a token's initiative on the current encounter, creating a combatant if necessary */
    setInitiative({ initiative, sendMessage, }: {
        initiative: number;
        sendMessage?: boolean;
    }): Promise<void>;
    /** Toggle token hiding if this token's actor is a loot actor */
    protected _onCreate(data: this["_source"], options: DocumentModificationContext<this>, userId: string): void;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext, userId: string): void;
    /** Reinitialize vision if the actor's senses were updated directly */
    _onUpdateBaseActor(update?: Record<string, unknown>, options?: DocumentModificationContext<Actor>): void;
    protected _onDelete(options: DocumentModificationContext<this>, userId: string): void;
    /** Re-render token placeable if REs have ephemerally changed any visuals of this token */
    onActorEmbeddedItemChange(): void;
}
interface TokenDocumentPF2e<TActor extends ActorPF2e = ActorPF2e> extends TokenDocument<TActor> {
    readonly data: TokenDataPF2e<this>;
    readonly _object: TokenPF2e | null;
    get object(): TokenPF2e;
    readonly parent: ScenePF2e | null;
    get combatant(): CombatantPF2e<EncounterPF2e> | null;
    _sheet: TokenConfigPF2e<this> | null;
    get sheet(): TokenConfigPF2e<this>;
    overlayEffect: ImageFilePath;
}
export { TokenDocumentPF2e };
