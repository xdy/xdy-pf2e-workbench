import type { MeasuredTemplatePF2e } from "../measured-template.ts";
export declare class TemplateLayerPF2e<TObject extends MeasuredTemplatePF2e = MeasuredTemplatePF2e> extends TemplateLayer<TObject> {
    #private;
    createPreview(createData: Record<string, unknown>): Promise<TObject>;
    protected _onDragLeftMove(event: PlaceablesLayerPointerEvent<TObject>): void;
    protected _onMouseWheel(event: WheelEvent): Promise<TObject["document"] | undefined> | void;
}
