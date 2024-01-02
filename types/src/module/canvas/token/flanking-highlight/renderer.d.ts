import type { TokenPF2e } from "../index.ts";
/** Visual rendering of lines from token to flanking buddies token on highlight */
declare class FlankingHighlightRenderer {
    #private;
    /** The token from which the line is extended */
    token: TokenPF2e;
    /** Text label floating above highlight line */
    labelText: string;
    /** Color for highlight line */
    lineColor: number;
    constructor(token: TokenPF2e);
    /** Get existing layer graphics object or create one if one does not exist */
    get layer(): PIXI.Graphics;
    /** Draw flanking highlight if conditions are met */
    draw(): void;
    /**
     * For a given target, find flanking buddies and draw flanking highlight lines between token and buddies
     * @param target Potentially flanked target
     */
    drawForTarget(target: TokenPF2e): void;
    /**
     * Draw flanking highlight lines between this token and buddies
     * @param buddies Flanking buddy tokens
     */
    drawBuddyLines(buddies: TokenPF2e[]): void;
    /**
     * Draw flanking highlight line between this token and a single buddy.
     * @param buddy Flanking buddy token
     */
    drawBuddyLine(buddy: TokenPF2e): void;
    /**
     * Draw a flanking text label above flanking highlight line
     * @param buddy Flanking buddy token
     */
    drawLabel(buddy: TokenPF2e): void;
    /** Destroys and removes layer graphics, incuding any text children */
    clear(): void;
    /** Alias of `clear` */
    destroy(): void;
}
export { FlankingHighlightRenderer };
