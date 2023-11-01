import { AuraAppearanceData, AuraData, AuraEffectData } from "@actor/types.ts";
import { ItemTrait } from "@item/base/data/system.ts";
import { EffectAreaSquare } from "@module/canvas/effect-area-square.ts";
import type { ScenePF2e, TokenDocumentPF2e } from "@scene";
import type { TokenAuraData } from "./types.ts";
declare class TokenAura implements TokenAuraData {
    #private;
    slug: string;
    token: TokenDocumentPF2e;
    level: number | null;
    /** The radius of the aura in feet */
    radius: number;
    traits: ItemTrait[];
    effects: AuraEffectData[];
    appearance: AuraAppearanceData;
    constructor(params: TokenAuraParams);
    /** The aura radius from the center in pixels */
    get radiusPixels(): number;
    get scene(): ScenePF2e;
    get bounds(): PIXI.Rectangle;
    get center(): Point;
    /** The squares covered by this aura */
    get squares(): EffectAreaSquare[];
    /** Does this aura overlap with (at least part of) a token? */
    containsToken(token: TokenDocumentPF2e): boolean;
    /** Notify tokens' actors if they are inside this aura. */
    notifyActors(): Promise<void>;
}
interface TokenAuraParams extends Omit<AuraData, "effects" | "traits"> {
    slug: string;
    level: number | null;
    radius: number;
    token: TokenDocumentPF2e;
    traits: ItemTrait[];
    effects: AuraEffectData[];
}
export { TokenAura, TokenAuraData };
