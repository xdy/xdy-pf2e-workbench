import { EffectAreaSquare } from "@module/canvas/effect-area-square.ts";
import { TokenDocumentPF2e } from "@scene";
import type { TokenPF2e } from "../index.ts";
export declare function getAreaSquares(data: GetAreaSquaresParams): EffectAreaSquare[];
interface GetAreaSquaresParams {
    bounds: PIXI.Rectangle;
    radius: number;
    token: TokenPF2e | TokenDocumentPF2e;
    traits?: string[];
}
export {};
