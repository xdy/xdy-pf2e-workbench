import { AuraAppearanceData, AuraData } from "@actor/types.ts";
import { ItemTrait } from "@item/base/data/system.ts";
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
    traits: ItemTrait[];
    /** Border, highlight, and texture data */
    appearance: AuraAppearanceData;
    /** Standard line thickness for circle shape and label markers */
    static readonly LINE_THICKNESS = 3;
    border: import("pixi.js").Graphics;
    textureContainer: PIXI.Graphics | null;
    constructor(params: AuraRendererParams);
    get bounds(): PIXI.Rectangle;
    /** ID of `GridHighlight` container for this aura's token */
    get highlightLayer(): GridHighlight | null;
    /** The squares covered by this aura */
    get squares(): EffectAreaSquare[];
    /** Draw the aura's border and texture */
    draw(showBorder: boolean): Promise<void>;
    /** Reposition this aura's texture after the token has moved. */
    repositionTexture(): void;
    /** Highlight the affected grid squares of this aura and indicate the radius */
    highlight(): void;
    destroy(options?: boolean | PIXI.IDestroyOptions): void;
}
interface AuraRendererParams extends Omit<AuraData, "effects" | "traits"> {
    slug: string;
    token: TokenPF2e;
    traits: ItemTrait[];
}
export { AuraRenderer };
