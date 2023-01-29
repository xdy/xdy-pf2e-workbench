import { AuraData } from "@actor/types";
import { TokenPF2e } from "..";
import { EffectAreaSquare } from "../../effect-area-square";
import { ItemTrait } from "@item/data/base";
import { TokenAuraData } from "@scene/token-document/aura";
/** Visual and statial facilities for auras emanated by a token's actor */
declare class AuraRenderer extends PIXI.Graphics implements TokenAuraData {
    #private;
    /** The token associated with this aura */
    token: TokenPF2e;
    /** The radius of the aura in feet */
    radius: number;
    /** The aura radius from the center in pixels */
    radiusPixels: number;
    /** Traits associated with this aura: used to configure collision detection */
    traits: Set<ItemTrait>;
    /** Border and fill colors in hexadecimal */
    private colors;
    /** Standard line thickness for circle shape and label markers */
    static readonly LINE_THICKNESS = 3;
    constructor(params: AuraRendererParams);
    get bounds(): PIXI.Rectangle;
    /** The center of an aura is the center of its originating token */
    get center(): Point;
    /** ID of `GridHighlight` container for this aura's token */
    private get highlightId();
    /** The squares covered by this aura */
    get squares(): EffectAreaSquare[];
    /**
     * Whether this aura should be rendered to the user:
     * The scene must be active, have an active combat, or a GM must be the only user logged in.
     */
    get shouldRender(): boolean;
    /** Draw the aura's circular emanation */
    draw(): void;
    /** Highlight the affected grid squares of this aura and indicate the radius */
    highlight(): void;
}
interface TokenAuraColors {
    border: number;
    fill: number;
}
interface AuraRendererParams extends Omit<AuraData, "effects" | "traits"> {
    token: TokenPF2e;
    traits: Set<ItemTrait>;
}
export { AuraRenderer, TokenAuraColors };
