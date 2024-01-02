import type { UserPF2e } from "@module/user/document.ts";
import type { TokenDocumentPF2e } from "@scene";
import { type TokenLayerPF2e } from "../index.ts";
import { HearingSource } from "../perception/hearing-source.ts";
import { AuraRenderers } from "./aura/index.ts";
import { FlankingHighlightRenderer } from "./flanking-highlight/renderer.ts";
declare class TokenPF2e<TDocument extends TokenDocumentPF2e = TokenDocumentPF2e> extends Token<TDocument> {
    /** Visual representation and proximity-detection facilities for auras */
    readonly auras: AuraRenderers;
    /** Visual rendering of lines from token to flanking buddy tokens on highlight */
    readonly flankingHighlight: FlankingHighlightRenderer;
    /** The token's line hearing source */
    hearing: HearingSource<this>;
    constructor(document: TDocument);
    /** Increase center-to-center point tolerance to be more compliant with 2e rules */
    get isVisible(): boolean;
    /** Is this token currently animating? */
    get isAnimating(): boolean;
    /** Is this token emitting light with a negative value */
    get emitsDarkness(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have low-light vision (inclusive of darkvision)? */
    get hasLowLightVision(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have darkvision vision? */
    get hasDarkvision(): boolean;
    /** Is this token's dimensions linked to its actor's size category? */
    get linkToActorSize(): boolean;
    /** The ID of the highlight layer for this token */
    get highlightId(): string;
    /** Bounds used for mechanics, such as flanking and drawing auras */
    get mechanicalBounds(): PIXI.Rectangle;
    /** Short-circuit calculation for long sight ranges */
    get sightRange(): number;
    isAdjacentTo(token: TokenPF2e): boolean;
    /**
     * Determine whether this token can flank another—given that they have a flanking buddy on the opposite side
     * @param flankee                  The potentially flanked token
     * @param context.reach           An optional reach distance specific to this measurement
     * @param context.ignoreFlankable Optionally ignore flankable (for flanking highlight) */
    canFlank(flankee: TokenPF2e, context?: {
        reach?: number;
        ignoreFlankable?: boolean;
    }): boolean;
    /**
     * Determine whether two potential flankers are on opposite sides of flankee
     * @param flankerA  First of two potential flankers
     * @param flankerB  Second of two potential flankers
     * @param flankee   Potentially flanked token
     */
    protected onOppositeSides(flankerA: TokenPF2e, flankerB: TokenPF2e, flankee: TokenPF2e): boolean;
    /**
     * Determine whether this token is in fact flanking another
     * @param flankee                  The potentially flanked token
     * @param context.reach           An optional reach distance specific to this measurement
     * @param context.ignoreFlankable Optionally ignore flankable (for flanking position indicator) */
    isFlanking(flankee: TokenPF2e, context?: {
        reach?: number;
        ignoreFlankable?: boolean;
    }): boolean;
    /**
     * Find other tokens that are in fact flanking a flankee with this token.
     * Only detects tokens on opposite sides of flankee, does not support Gang Up or Side By Side.
     * @param flankee                  The potentially flanked token
     * @param context.reach           An optional reach distance specific to this measurement
     * @param context.ignoreFlankable Optionally ignore flankable (for flanking position indicator) */
    buddiesFlanking(flankee: TokenPF2e, context?: {
        reach?: number;
        ignoreFlankable?: boolean;
    }): TokenPF2e[];
    /** Reposition aura textures after this token has moved. */
    protected _applyRenderFlags(flags: Record<string, boolean>): void;
    /** Draw auras and flanking highlight lines if certain conditions are met */
    protected _refreshVisibility(): void;
    /**
     * Use border color corresponding with disposition even when the token's actor is player-owned.
     * @see https://github.com/foundryvtt/foundryvtt/issues/9993
     */
    protected _getBorderColor(options?: {
        hover?: boolean;
    }): number | null;
    /** Overrides _drawBar(k) to also draw pf2e variants of normal resource bars (such as temp health) */
    protected _drawBar(number: number, bar: PIXI.Graphics, data: TokenResourceData): void;
    /** Draw auras along with effect icons */
    drawEffects(): Promise<void>;
    /** Emulate a pointer hover ("pointerover") event */
    emitHoverIn(nativeEvent: MouseEvent | PointerEvent): void;
    /** Emulate a pointer hover ("pointerout") event */
    emitHoverOut(nativeEvent: MouseEvent | PointerEvent): void;
    /** If Party Vision is enabled, make all player-owned actors count as vision sources for non-GM users */
    protected _isVisionSource(): boolean;
    /** Include actor overrides in the clone if it is a preview */
    clone(): this;
    /** Emit floaty text from this tokens */
    showFloatyText(params: ShowFloatyEffectParams): Promise<void>;
    /**
     * Measure the distance between this token and another object, in grid distance. We measure between the
     * centre of squares, and if either covers more than one square, we want the minimum distance between
     * any two of the squares.
     */
    distanceTo(target: TokenPF2e, { reach }?: {
        reach?: number | null;
    }): number;
    animate(updateData: Record<string, unknown>, options?: TokenAnimationOptionsPF2e<this>): Promise<void>;
    /** Hearing should be updated whenever vision is */
    updateVisionSource({ defer, deleted }?: {
        defer?: boolean | undefined;
        deleted?: boolean | undefined;
    }): void;
    /** Obscure the token's sprite if a hearing or tremorsense detection filter is applied to it */
    render(renderer: PIXI.Renderer): void;
    protected _destroy(): void;
    /** Players can view an actor's sheet if the actor is lootable. */
    protected _canView(user: UserPF2e, event: PIXI.FederatedPointerEvent): boolean;
    /** Refresh vision and the `EffectsPanel` */
    protected _onControl(options?: {
        releaseOthers?: boolean;
        pan?: boolean;
    }): void;
    /** Refresh vision and the `EffectsPanel` */
    protected _onRelease(options?: Record<string, unknown>): void;
    /** Handle system-specific status effects (upstream handles invisible and blinded) */
    _onApplyStatusEffect(statusId: string, active: boolean): void;
    /** Reset aura renders when token size changes. */
    _onUpdate(changed: DeepPartial<TDocument["_source"]>, options: DocumentModificationContext<TDocument["parent"]>, userId: string): void;
}
interface TokenPF2e<TDocument extends TokenDocumentPF2e = TokenDocumentPF2e> extends Token<TDocument> {
    get layer(): TokenLayerPF2e<this>;
}
type NumericFloatyEffect = {
    name: string;
    value?: number | null;
};
type ShowFloatyEffectParams = number | {
    create: NumericFloatyEffect;
} | {
    update: NumericFloatyEffect;
} | {
    delete: NumericFloatyEffect;
};
interface TokenAnimationOptionsPF2e<TObject extends TokenPF2e = TokenPF2e> extends TokenAnimationOptions<TObject> {
    spin?: boolean;
}
export { TokenPF2e };
export type { ShowFloatyEffectParams, TokenAnimationOptionsPF2e };
