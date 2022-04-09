import { ActorPF2e } from "@actor";
import { TokenPF2e } from "@module/canvas";
import { ScenePF2e, TokenConfigPF2e } from "@module/scene";
import { TokenDataPF2e } from "./data";
import { CombatantPF2e } from "@module/encounter";
import { PrototypeTokenDataPF2e } from "@actor/data/base";
export declare class TokenDocumentPF2e<TActor extends ActorPF2e = ActorPF2e> extends TokenDocument<TActor> {
    /** Has this token gone through at least one cycle of data preparation? */
    private initialized?;
    /** Filter trackable attributes for relevance and avoidance of circular references */
    static getTrackedAttributes(data?: Record<string, unknown>, _path?: string[]): TokenAttributes;
    /** This should be in Foundry core, but ... */
    get scene(): ScenePF2e | null;
    protected _initialize(): void;
    /** Is this token emitting light with a negative value */
    get emitsDarkness(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have low-light vision (inclusive of darkvision)? */
    get hasLowLightVision(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have darkvision vision? */
    get hasDarkvision(): boolean;
    /** Is this token's dimensions linked to its actor's size category? */
    get linkToActorSize(): boolean;
    get playersCanSeeName(): boolean;
    /** Refresh this token's properties if it's controlled and the request came from its actor */
    prepareData({ fromActor }?: {
        fromActor?: boolean | undefined;
    }): void;
    /** If rules-based vision is enabled, disable manually configured vision radii */
    prepareBaseData(): void;
    prepareDerivedData(): void;
    /** Set a TokenData instance's dimensions from actor data. Static so actors can use for their prototypes */
    static prepareSize(data: TokenDataPF2e | PrototypeTokenDataPF2e, actor: ActorPF2e | null): void;
    /** Set a token's initiative on the current encounter, creating a combatant if necessary */
    setInitiative({ initiative, sendMessage, }: {
        initiative: number;
        sendMessage?: boolean;
    }): Promise<void>;
    /** Rerun token data preparation and possibly redraw token when the actor's embedded items change */
    onActorItemChange(): void;
    /** Toggle token hiding if this token's actor is a loot actor */
    protected _onCreate(data: this["data"]["_source"], options: DocumentModificationContext<this>, userId: string): void;
    /** Refresh the effects panel and encounter tracker */
    protected _onUpdate(changed: DeepPartial<this["data"]["_source"]>, options: DocumentModificationContext<this>, userId: string): void;
}
export interface TokenDocumentPF2e<TActor extends ActorPF2e = ActorPF2e> extends TokenDocument<TActor> {
    readonly data: TokenDataPF2e<this>;
    readonly _object: TokenPF2e | null;
    get object(): TokenPF2e;
    readonly parent: ScenePF2e | null;
    get combatant(): Embedded<CombatantPF2e> | null;
    _sheet: TokenConfigPF2e | null;
    get sheet(): TokenConfigPF2e;
}
