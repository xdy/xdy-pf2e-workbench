import { MeasuredTemplateDocumentPF2e } from "@scene/measured-template-document.ts";
import { TemplateLayerPF2e } from "./index.ts";
import { ScenePF2e } from "@scene/index.ts";
declare class MeasuredTemplatePF2e<TDocument extends MeasuredTemplateDocumentPF2e<ScenePF2e | null> = MeasuredTemplateDocumentPF2e<ScenePF2e | null>> extends MeasuredTemplate<TDocument> {
    #private;
    get type(): MeasuredTemplateType;
    highlightGrid(): void;
    drawPreview(): Promise<void>;
    /** Overriden to ensure preview canvas events are removed (if any) on destruction */
    destroy(options?: boolean | PIXI.IDestroyOptions): void;
}
interface MeasuredTemplatePF2e<TDocument extends MeasuredTemplateDocumentPF2e<ScenePF2e | null> = MeasuredTemplateDocumentPF2e<ScenePF2e | null>> extends MeasuredTemplate<TDocument> {
    get layer(): TemplateLayerPF2e<this>;
}
export { MeasuredTemplatePF2e };
