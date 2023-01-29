import { SceneDataPF2e } from "./data";
import { SceneConfigPF2e } from "./sheet";
import { AmbientLightDocumentPF2e, MeasuredTemplateDocumentPF2e, TileDocumentPF2e, TokenDocumentPF2e } from ".";
declare class ScenePF2e extends Scene {
    /** A promise to prevent concurrent executions of #checkAuras() */
    auraCheckLock?: Promise<void>;
    /** Is the rules-based vision setting enabled? */
    get rulesBasedVision(): boolean;
    /** Is this scene's darkness value synced to the world time? */
    get darknessSyncedToTime(): boolean;
    get lightLevel(): number;
    get isBright(): boolean;
    get isDimlyLit(): boolean;
    get isDark(): boolean;
    get hasHexGrid(): boolean;
    /** Check for auras containing newly-placed or moved tokens */
    checkAuras(): Promise<void>;
    prepareData(): void;
    /** Toggle Unrestricted Global Vision according to scene darkness level */
    prepareBaseData(): void;
    /** Redraw auras if the scene was activated while being viewed */
    _onUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext, userId: string): void;
}
interface ScenePF2e extends Scene {
    _sheet: SceneConfigPF2e<this> | null;
    readonly lights: foundry.abstract.EmbeddedCollection<AmbientLightDocumentPF2e>;
    readonly templates: foundry.abstract.EmbeddedCollection<MeasuredTemplateDocumentPF2e>;
    readonly tokens: foundry.abstract.EmbeddedCollection<TokenDocumentPF2e>;
    readonly tiles: foundry.abstract.EmbeddedCollection<TileDocumentPF2e>;
    flags: {
        pf2e: {
            [key: string]: unknown;
            syncDarkness: "enabled" | "disabled" | "default";
        };
        [key: string]: Record<string, unknown>;
    };
    readonly data: SceneDataPF2e<this>;
    get sheet(): SceneConfigPF2e<this>;
}
export { ScenePF2e };
