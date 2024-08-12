import type { MeasuredTemplatePF2e } from "../measured-template.ts";
export declare class TemplateLayerPF2e<TObject extends MeasuredTemplatePF2e = MeasuredTemplatePF2e> extends TemplateLayer<TObject> {
    #private;
    createPreview(createData: Record<string, unknown>): Promise<TObject>;
    /** Overriden to snap according to the dragged template's type */
    getSnappedPoint(point: Point): Point;
    protected _onDragLeftMove(event: PlaceablesLayerPointerEvent<TObject>): void;
    protected _onMouseWheel(event: WheelEvent): Promise<TObject> | void;
}
