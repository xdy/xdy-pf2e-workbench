import { AuraData } from "@actor/types";
import { TokenPF2e } from ".";
import { EffectAreaSquare } from "../effect-area-square";
import { ItemTrait } from "@item/data/base";
declare class TokenAura extends PIXI.Graphics {
    #private;
    /** The token associated with this aura */
    token: TokenPF2e;
    /** The radius of the aura in feet */
    radius: number;
    /** Border and fill colors in hexadecimal */
    colors: TokenAuraColors;
    /** Whether the aura includes the creature from which it is emanating */
    includesSelf: boolean;
    /** Traits associated with this aura: used to configure collision detection */
    traits: Set<ItemTrait>;
    /** Standard line thickness for circle shape and label markers */
    static readonly LINE_THICKNESS = 3;
    constructor(params: TokenAuraConstructorParams);
    /** The center of an aura is the center of its originating token */
    get center(): Point;
    /** ID of `GridHighlight` container for this aura's token */
    get highlightId(): string;
    /** The aura radius in pixels */
    get radiusPixels(): number;
    /** The squares covered by this aura */
    get squares(): EffectAreaSquare[];
    /** Draw the aura's circular emanation */
    draw(): void;
    /** Highlight the affected grid squares of this aura and indicate the radius */
    highlight(): void;
    /** Does this aura overlap with (at least part of) a token? */
    containsToken(token: TokenPF2e): boolean;
}
interface TokenAuraColors {
    border: number;
    fill: number;
}
interface TokenAuraConstructorParams extends AuraData {
    token: TokenPF2e;
    includesSelf?: boolean;
}
export { TokenAura, TokenAuraColors };
