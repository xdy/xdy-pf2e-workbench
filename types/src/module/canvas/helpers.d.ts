import type { TokenPF2e } from "./index.ts";
/**
 * Measure the minimum distance between two rectangles
 * @param r0      The origin rectangle
 * @param r1      The destination rectangle
 * @param [reach] If this is a reach measurement, the origin actor's reach
 */
declare function measureDistanceCuboid(r0: PIXI.Rectangle, r1: PIXI.Rectangle, { reach, token, target, }?: {
    reach?: number | null;
    token?: TokenPF2e | null;
    target?: TokenPF2e | null;
}): number;
/**
 * Measure distance using Pathfinder 2e grid-counting rules
 * @param p0 The origin point
 * @param p1 The destination point
 */
declare function measureDistance(p0: Point, p1: Point): number;
/** Get a grid square at an arbitrary point. */
declare function squareAtPoint(point: Point): PIXI.Rectangle;
export { measureDistance, measureDistanceCuboid, squareAtPoint };
