import { AuraColors, AuraData } from "@actor/types.ts";
import { ItemTrait } from "@item/data/base.ts";
import { EffectAreaSquare } from "@module/canvas/effect-area-square.ts";
import { ScenePF2e } from "@scene/document.ts";
import { TokenDocumentPF2e } from "../document.ts";
import type { TokenAuraData } from "./types.ts";
declare class TokenAura implements TokenAuraData {
    #private;
    slug: string;
    token: TokenDocumentPF2e;
    level: number | null;
    /** The radius of the aura in feet */
    radius: number;
    traits: Set<ItemTrait>;
    colors: AuraColors | null;
    constructor(args: TokenAuraParams);
    /** The aura radius from the center in pixels */
    get radiusPixels(): number;
    get scene(): ScenePF2e;
    get bounds(): PIXI.Rectangle;
    get center(): Point;
    /** The squares covered by this aura */
    get squares(): EffectAreaSquare[];
    /** Does this aura overlap with (at least part of) a token? */
    containsToken(token: TokenDocumentPF2e): boolean;
    /**
     * Notify tokens' actors if they are inside an aura in this collection
     * @param [specific] A limited list of tokens whose actors will be notified
     */
    notifyActors(specific?: TokenDocumentPF2e[]): Promise<void>;
}
interface TokenAuraParams extends Omit<AuraData, "effects" | "traits"> {
    slug: string;
    level: number | null;
    radius: number;
    token: TokenDocumentPF2e;
    traits: Set<ItemTrait>;
}
export { TokenAura, TokenAuraData };
