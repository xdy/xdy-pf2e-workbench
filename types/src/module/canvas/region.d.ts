import type { RegionDocumentPF2e } from "@scene/region-document/document.ts";
/** Add support for drag/drop repositioning of regions. */
declare class RegionPF2e extends Region<RegionDocumentPF2e> {
    static RENDER_FLAGS: {
        refreshPosition: {};
        redraw: {
            propagate: ["refresh"];
        };
        refresh: {
            propagate: ["refreshState", "refreshBorder"];
            alias: boolean;
        };
        refreshState: {};
        refreshBorder: {};
    };
    protected _canDrag(user: User, event: PIXI.FederatedPointerEvent): boolean;
    getSnappedPosition(position?: Point): Point;
    protected _onDragLeftMove(event: PlaceablesLayerPointerEvent<this>): void;
    /** Save the coordinates of the new drop location. */
    protected _onDragLeftDrop(event: PlaceablesLayerPointerEvent<this>): Promise<void | RegionDocumentPF2e[]>;
}
export { RegionPF2e };
