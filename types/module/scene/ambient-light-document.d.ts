import { AmbientLightPF2e } from "@module/canvas";
import { ScenePF2e } from ".";
declare class AmbientLightDocumentPF2e extends AmbientLightDocument {
    /** Is this light actually a source of darkness? */
    get isDarkness(): boolean;
}
interface AmbientLightDocumentPF2e extends AmbientLightDocument {
    readonly data: foundry.data.AmbientLightData<AmbientLightDocumentPF2e>;
    readonly parent: ScenePF2e | null;
    get object(): AmbientLightPF2e;
}
export { AmbientLightDocumentPF2e };
