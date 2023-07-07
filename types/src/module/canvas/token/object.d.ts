import { TokenDocumentPF2e } from "@scene/index.ts";
import { TokenLayerPF2e } from "../index.ts";
import { HearingSource } from "../perception/hearing-source.ts";
import { AuraRenderers } from "./aura/index.ts";
import { Renderer } from "pixi.js";
declare class TokenPF2e<TDocument extends TokenDocumentPF2e = TokenDocumentPF2e> extends Token<TDocument> {
    #private;
    /** Visual representation and proximity-detection facilities for auras */
    readonly auras: AuraRenderers;
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
    /** Short-circuit calculation for long sight ranges */
    get sightRange(): number;
    isAdjacentTo(token: TokenPF2e): boolean;
    /**
     * Determine whether this token can flank another—given that they have a flanking buddy on the opposite side
     * @param flankee       The potentially flanked token
     * @param context.reach An optional reach distance specific to this measurement */
    canFlank(flankee: TokenPF2e, context?: {
        reach?: number;
    }): boolean;
    /** Determine whether this token is in fact flanking another */
    isFlanking(flankee: TokenPF2e, { reach }?: {
        reach?: number;
    }): boolean;
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
    /** Add a callback for when a movement animation finishes */
    animate(updateData: Record<string, unknown>, options?: TokenAnimationOptions<this>): Promise<void>;
    /** Hearing should be updated whenever vision is */
    updateVisionSource({ defer, deleted }?: {
        defer?: boolean | undefined;
        deleted?: boolean | undefined;
    }): void;
    /** Obscure the token's sprite if a hearing or tremorsense detection filter is applied to it */
    render(renderer: Renderer): void;
    protected _destroy(): void;
    /** Refresh vision and the `EffectsPanel` */
    protected _onControl(options?: {
        releaseOthers?: boolean;
        pan?: boolean;
    }): void;
    /** Refresh vision and the `EffectsPanel` */
    protected _onRelease(options?: Record<string, unknown>): void;
    protected _onDragLeftStart(event: TokenPointerEvent<this>): void;
    protected _onHoverIn(event: PIXI.FederatedPointerEvent, options?: {
        hoverOutOthers?: boolean;
    }): boolean;
    protected _onHoverOut(event: PIXI.FederatedPointerEvent): boolean;
    /** Destroy auras before removing this token from the canvas */
    _onDelete(options: DocumentModificationContext<TDocument["parent"]>, userId: string): void;
    /** Handle system-specific status effects (upstream handles invisible and blinded) */
    _onApplyStatusEffect(statusId: string, active: boolean): void;
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
export { ShowFloatyEffectParams, TokenPF2e };
