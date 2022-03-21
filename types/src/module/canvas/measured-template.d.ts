import { MeasuredTemplateDocumentPF2e } from "@module/scene/measured-template-document";
import { Rectangle } from "pixi.js";
import { TemplateLayerPF2e } from "./index";

declare class MeasuredTemplatePF2e extends MeasuredTemplate<MeasuredTemplateDocumentPF2e> {
    get type(): MeasuredTemplateType;
    /** Highlight grid according to Pathfinder 2e effect-area shapes */
    highlightGrid(): void;
    /**
     * Measure the minimum distance between two rectangles
     * @param r0      The origin rectangle
     * @param r1      The destination rectangle
     * @param [reach] If this is a reach measurement, the origin actor's reach
     */
    static measureDistanceRect(r0: Rectangle, r1: Rectangle, { reach }?: {
        reach?: number | null;
    }): number;
    /**
     * Measure distance using Pathfinder 2e grid-counting rules
     * @param p0 The origin point
     * @param p1 The destination point
     */
    static measureDistance(p0: Point, p1: Point): number;
    /**
     * Given the distance in each dimension, measure the distance in grid units
     * @param segment A pair of x/y distances constituting the line segment between two points
     * @param [reach] If this is a reach measurement, the origin actor's reach
     */
    private static measureDistanceOnGrid;
    private measureDistance;
}
interface MeasuredTemplatePF2e extends MeasuredTemplate<MeasuredTemplateDocumentPF2e> {
    get layer(): TemplateLayerPF2e<this>;
}
export { MeasuredTemplatePF2e };
