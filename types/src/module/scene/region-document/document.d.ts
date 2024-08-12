import type { RegionPF2e } from "@module/canvas/region.ts";
import type { ScenePF2e } from "@scene";
import type { SpecificRegionBehavior } from "@scene/region-behavior/types.ts";
declare class RegionDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends RegionDocument<TParent> {
    /** Set an informal top-left coordinate pair from the coordinates minima of all embedded shapes. */
    get x(): number;
    get y(): number;
    set x(value: number);
    set y(value: number);
}
interface RegionDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends RegionDocument<TParent> {
    readonly behaviors: foundry.abstract.EmbeddedCollection<SpecificRegionBehavior<this>>;
    _object: RegionPF2e<this>;
}
export { RegionDocumentPF2e };
