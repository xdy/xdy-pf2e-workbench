import { AuraAppearanceData, AuraData } from "@actor/types.ts";
import { ItemTrait } from "@item/data/base.ts";
import { TokenAuraData } from "@scene/token-document/aura/index.ts";
import type { EffectAreaSquare } from "../../effect-area-square.ts";
import type { TokenPF2e } from "../index.ts";
/** Visual rendering of auras emanated by a token's actor */
declare class AuraRenderer extends PIXI.Graphics implements TokenAuraData {
    #private;
    slug: string;
    /** The token associated with this aura */
    token: TokenPF2e;
    /** The radius of the aura in feet */
    radius: number;
    /** The aura radius from the center in pixels */
    radiusPixels: number;
    /** Traits associated with this aura: used to configure collision detection */
    traits: Set<ItemTrait>;
    /** Border, highlight, and texture data */
    appearance: AuraAppearanceData;
    /** Standard line thickness for circle shape and label markers */
    static readonly LINE_THICKNESS = 3;
    border: import("pixi.js").Graphics;
    texture: PIXI.Texture | null;
    constructor(params: AuraRendererParams);
    get bounds(): PIXI.Rectangle;
    /** ID of `GridHighlight` container for this aura's token */
    get highlightLayer(): GridHighlight | null;
    /** The squares covered by this aura */
    get squares(): EffectAreaSquare[];
    /** Whether this aura's parent token is in an active encounter */
    get inEncounter(): boolean;
    /** Draw the aura's border and texture */
    draw(showBorder: boolean): Promise<void>;
    /** Highlight the affected grid squares of this aura and indicate the radius */
    highlight(): void;
}
interface AuraRendererParams extends Omit<AuraData, "effects" | "traits"> {
    slug: string;
    token: TokenPF2e;
    traits: Set<ItemTrait>;
}
export { AuraRenderer };
