import { TokenAuraColors } from "./token/aura";
/** A square (`PIXI.Rectangle`) with additional information about an effect area it's part of */
export declare class EffectAreaSquare extends PIXI.Rectangle {
    /** Whether this square is an active part of the aura or blocked (typically by a wall) */
    active: boolean;
    constructor(x: number, y: number, width: number, height: number, active?: boolean);
    get center(): Point;
    highlight(layer: GridHighlight, colors: TokenAuraColors): void;
}
