import { MeasuredTemplateDocumentPF2e } from "@module/scene/measured-template-document";
import { TemplateLayerPF2e } from ".";
declare class MeasuredTemplatePF2e extends MeasuredTemplate<MeasuredTemplateDocumentPF2e> {
    get type(): MeasuredTemplateType;
    highlightGrid(): void;
}
interface MeasuredTemplatePF2e extends MeasuredTemplate<MeasuredTemplateDocumentPF2e> {
    get layer(): TemplateLayerPF2e<this>;
}
export { MeasuredTemplatePF2e };
