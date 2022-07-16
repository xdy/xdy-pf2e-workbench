import { ZeroToTwo } from "@module/data";
import type { AmbientLightDocumentPF2e, MeasuredTemplateDocumentPF2e, ScenePF2e, TileDocumentPF2e, TokenDocumentPF2e } from ".";
export interface SceneDataPF2e<T extends ScenePF2e> extends foundry.data.SceneData<T, TokenDocumentPF2e, AmbientLightDocumentPF2e, AmbientSoundDocument, DrawingDocument, MeasuredTemplateDocumentPF2e, NoteDocument, TileDocumentPF2e, WallDocument> {
    flags: {
        pf2e: {
            [key: string]: unknown;
            syncDarkness: "enabled" | "disabled" | "default";
        };
        [key: string]: Record<string, unknown>;
    };
}
export declare enum LightLevels {
    DARKNESS = 0.25,
    BRIGHT_LIGHT = 0.75
}
export declare type LightLevel = ZeroToTwo;
