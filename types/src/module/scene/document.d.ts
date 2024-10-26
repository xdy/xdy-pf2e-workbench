import { SceneFlagsPF2e } from "./data.ts";
import type {
    AmbientLightDocumentPF2e,
    MeasuredTemplateDocumentPF2e,
    RegionDocumentPF2e,
    TileDocumentPF2e,
} from "./index.ts";
import { TokenDocumentPF2e } from "./index.ts";
import type { SceneConfigPF2e } from "./sheet.ts";

declare class ScenePF2e extends Scene {
    #private;
    /** Has this document completed `DataModel` initialization? */
    initialized: boolean;
    /** Is the rules-based vision setting enabled? */
    get rulesBasedVision(): boolean;
    get hearingRange(): number | null;
    /** Is this scene's darkness value synced to the world time? */
    get darknessSyncedToTime(): boolean;
    get lightLevel(): number;
    get isBright(): boolean;
    get isDimlyLit(): boolean;
    get isDark(): boolean;
    /** Whether this scene is "in focus": the active scene, or the viewed scene if only a single GM is logged in */
    get isInFocus(): boolean;
    protected _initialize(options?: Record<string, unknown>): void;
    /**
     * Prevent double data preparation of child documents.
     * @removeme in V13
     */
    prepareData(): void;
    /** Toggle Unrestricted Global Vision according to scene darkness level */
    prepareBaseData(): void;
    _onUpdate(changed: DeepPartial<this["_source"]>, operation: SceneUpdateOperation, userId: string): void;
    protected _onUpdateDescendantDocuments(parent: this, collection: string, documents: ClientDocument[], changes: object[], options: DatabaseUpdateOperation<this>, userId: string): void;
    protected _onDeleteDescendantDocuments(parent: this, collection: string, documents: foundry.abstract.Document[], ids: string[], operation: DatabaseDeleteOperation<this>, userId: string): void;
}
interface ScenePF2e extends Scene {
    flags: SceneFlagsPF2e;
    /** Check for auras containing newly-placed or moved tokens (added as a debounced method) */
    checkAuras(): void;
    readonly lights: foundry.abstract.EmbeddedCollection<AmbientLightDocumentPF2e<this>>;
    readonly regions: foundry.abstract.EmbeddedCollection<RegionDocumentPF2e<this>>;
    readonly templates: foundry.abstract.EmbeddedCollection<MeasuredTemplateDocumentPF2e<this>>;
    readonly tiles: foundry.abstract.EmbeddedCollection<TileDocumentPF2e<this>>;
    readonly tokens: foundry.abstract.EmbeddedCollection<TokenDocumentPF2e<this>>;
    get sheet(): SceneConfigPF2e<this>;
}
export { ScenePF2e };
