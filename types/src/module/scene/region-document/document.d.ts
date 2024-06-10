import type { ScenePF2e } from "@scene";
declare class RegionDocumentPF2e extends RegionDocument<ScenePF2e | null> {
    /** Set an informal top-left coordinate pair from the coordinates minima of all embedded shapes. */
    get x(): number;
    get y(): number;
    set x(value: number);
    set y(value: number);
}
export { RegionDocumentPF2e };
