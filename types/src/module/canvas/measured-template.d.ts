import { MeasuredTemplateDocumentPF2e } from "@module/scene/measured-template-document";
import { TemplateLayerPF2e } from ".";
declare class MeasuredTemplatePF2e extends MeasuredTemplate<MeasuredTemplateDocumentPF2e> {
    get type(): MeasuredTemplateType;
    /** The highlight layer for this template */
    get highlightId(): string;
    highlightGrid(): void;
}
interface MeasuredTemplatePF2e extends MeasuredTemplate<MeasuredTemplateDocumentPF2e> {
    get layer(): TemplateLayerPF2e<this>;
}
export { MeasuredTemplatePF2e };
