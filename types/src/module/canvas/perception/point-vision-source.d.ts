import type { TokenPF2e } from "../token/index.ts";
/** Subclassed to include hearing detection */
declare class PointVisionSourcePF2e<TObject extends TokenPF2e = TokenPF2e> extends foundry.canvas.sources
    .PointVisionSource<TObject> {
    hearing?: PointSourcePolygon;
    protected _createShapes(): void;
}
export { PointVisionSourcePF2e };
