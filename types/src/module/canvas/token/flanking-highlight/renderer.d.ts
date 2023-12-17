import { TokenPF2e } from "../index.ts";
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
    /**
     * Whether the flank highlight should be rendered to the user:
     * Canvas must be ready with a scene in focus, the user must own or have selected this token,
     * and the token must not be a preview or animating.
     */
    get shouldRender(): boolean;
    /** To be valid, token must be selected by owner or be user's character */
    get tokenIsSelectedOrOwn(): boolean;
    /** To be valid, this token must not be preview or be animating */
    get tokenIsReady(): boolean;
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
