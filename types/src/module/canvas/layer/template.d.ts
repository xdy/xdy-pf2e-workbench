import { MeasuredTemplatePF2e } from "..";
export declare class TemplateLayerPF2e<TMeasuredTemplate extends MeasuredTemplatePF2e = MeasuredTemplatePF2e> extends TemplateLayer<TMeasuredTemplate> {
    protected _onMouseWheel(event: WheelEvent): Promise<import("../../scene").MeasuredTemplateDocumentPF2e | undefined> | undefined;
}
