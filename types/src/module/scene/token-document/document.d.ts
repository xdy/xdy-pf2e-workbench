import { ActorPF2e } from "@actor";
import { TokenPF2e } from "@module/canvas";
import { ScenePF2e, TokenConfigPF2e } from "@module/scene";
import { TokenDataPF2e } from "./data";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter";
import { PrototypeTokenDataPF2e } from "@actor/data/base";
import { TokenAura } from "./aura";
import { ActorSourcePF2e } from "@actor/data";
declare class TokenDocumentPF2e<TActor extends ActorPF2e = ActorPF2e> extends TokenDocument<TActor> {
    /** Has this token gone through at least one cycle of data preparation? */
    private initialized?;
    auras: Map<string, TokenAura>;
    /** Filter trackable attributes for relevance and avoidance of circular references */
    static getTrackedAttributes(data?: Record<string, unknown>, _path?: string[]): TokenAttributes;
    /** This should be in Foundry core, but ... */
    get scene(): this["parent"];
    protected _initialize(): void;
    /** Is this token emitting light with a negative value */
    get emitsDarkness(): boolean;
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
    prepareDerivedData(): void;
    /** Set a TokenData instance's dimensions from actor data. Static so actors can use for their prototypes */
    static prepareSize(token: TokenDocumentPF2e | PrototypeTokenDataPF2e, actor: ActorPF2e | null): void;
    /** Set a token's initiative on the current encounter, creating a combatant if necessary */
    setInitiative({ initiative, sendMessage, }: {
        initiative: number;
        sendMessage?: boolean;
    }): Promise<void>;
    /** Rerun token data preparation and possibly redraw token when the actor's embedded items change */
    _onUpdateBaseActor(updates?: DeepPartial<ActorSourcePF2e>, options?: DocumentModificationContext<ActorPF2e>): void;
    /** Toggle token hiding if this token's actor is a loot actor */
    protected _onCreate(data: this["_source"], options: DocumentModificationContext<this>, userId: string): void;
    /** Refresh the effects panel and encounter tracker */
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<this>, userId: string): void;
    /** Check area effects, removing any from this token's actor if the actor has no other tokens in the scene */
    protected _onDelete(options: DocumentModificationContext<this>, userId: string): void;
}
interface TokenDocumentPF2e<TActor extends ActorPF2e = ActorPF2e> extends TokenDocument<TActor> {
    readonly data: TokenDataPF2e<this>;
    readonly _object: TokenPF2e | null;
    get object(): TokenPF2e;
    readonly parent: ScenePF2e | null;
    get combatant(): CombatantPF2e<EncounterPF2e> | null;
    _sheet: TokenConfigPF2e<this> | null;
    get sheet(): TokenConfigPF2e<this>;
    overlayEffect: ImagePath;
}
export { TokenDocumentPF2e };
