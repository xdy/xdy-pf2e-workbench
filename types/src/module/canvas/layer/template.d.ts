import type { EffectAreaShape } from "@item/spell/types.ts";
import type { MeasuredTemplatePF2e } from "../measured-template.ts";
export declare class TemplateLayerPF2e<TObject extends MeasuredTemplatePF2e = MeasuredTemplatePF2e> extends TemplateLayer<TObject> {
    #private;
    get gridPrecision(): number;
    /** Set a grid-snapping precision appropriate for an effect area type */
    snapFor(areaShape: EffectAreaShape | null): void;
    createPreview(createData: Record<string, unknown>): Promise<TObject>;
    protected _onDragLeftMove(event: PlaceablesLayerPointerEvent<TObject>): void;
    protected _onMouseWheel(event: WheelEvent): Promise<TObject["document"] | undefined> | void;
}
