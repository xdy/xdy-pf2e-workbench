import { ZeroToTwo } from "@module/data";
import type { AmbientLightDocumentPF2e, MeasuredTemplateDocumentPF2e, ScenePF2e, TileDocumentPF2e, TokenDocumentPF2e } from ".";
type SceneDataPF2e<T extends ScenePF2e> = foundry.data.SceneData<T, TokenDocumentPF2e, AmbientLightDocumentPF2e, AmbientSoundDocument, DrawingDocument, MeasuredTemplateDocumentPF2e, NoteDocument, TileDocumentPF2e, WallDocument>;
declare enum LightLevels {
    DARKNESS = 0.25,
    BRIGHT_LIGHT = 0.75
}
type LightLevel = ZeroToTwo;
export { SceneDataPF2e, LightLevel, LightLevels };
