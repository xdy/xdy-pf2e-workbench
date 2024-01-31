import { SceneFlagsPF2e } from "./data.ts";
import type { AmbientLightDocumentPF2e, MeasuredTemplateDocumentPF2e, TileDocumentPF2e } from "./index.ts";
import { TokenDocumentPF2e } from "./index.ts";
import type { SceneConfigPF2e } from "./sheet.ts";
declare class ScenePF2e extends Scene {
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
    get hasHexGrid(): boolean;
    /** Whether this scene is "in focus": the active scene, or the viewed scene if only a single GM is logged in */
    get isInFocus(): boolean;
    protected _initialize(options?: Record<string, unknown>): void;
    prepareData(): void;
    /** Toggle Unrestricted Global Vision according to scene darkness level */
    prepareBaseData(): void;
    /** Redraw auras if the scene was activated while being viewed */
    _onUpdate(changed: DeepPartial<this["_source"]>, options: SceneUpdateContext, userId: string): void;
    protected _onDeleteDescendantDocuments(parent: this, collection: string, documents: foundry.abstract.Document[], ids: string[], options: DocumentModificationContext<this>, userId: string): void;
}
interface ScenePF2e extends Scene {
    flags: SceneFlagsPF2e;
    /** Check for auras containing newly-placed or moved tokens (added as a debounced method) */
    checkAuras(): void;
    _sheet: SceneConfigPF2e<this> | null;
    readonly lights: foundry.abstract.EmbeddedCollection<AmbientLightDocumentPF2e<this>>;
    readonly templates: foundry.abstract.EmbeddedCollection<MeasuredTemplateDocumentPF2e<this>>;
    readonly tokens: foundry.abstract.EmbeddedCollection<TokenDocumentPF2e<this>>;
    readonly tiles: foundry.abstract.EmbeddedCollection<TileDocumentPF2e<this>>;
    get sheet(): SceneConfigPF2e<this>;
}
export { ScenePF2e };
