import { TokenDocumentPF2e } from "@module/scene";
import { TokenLayerPF2e } from ".";
export declare class TokenPF2e extends Token<TokenDocumentPF2e> {
    /** Used to track conditions and other token effects by game.pf2e.StatusEffects */
    statusEffectChanged: boolean;
    /** The promise returned by the last call to `Token#draw()` */
    private drawLock?;
    /** Is the user currently controlling this token? */
    get isControlled(): boolean;
    /** Is this token currently moving? */
    get isMoving(): boolean;
    /** Is this token emitting light with a negative value */
    get emitsDarkness(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have low-light vision (inclusive of darkvision)? */
    get hasLowLightVision(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have darkvision vision? */
    get hasDarkvision(): boolean;
    /** Is this token's dimensions linked to its actor's size category? */
    get linkToActorSize(): boolean;
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
    /** Max the brightness emitted by this token's `PointSource` if any controlled token has low-light vision */
    updateSource({ defer, deleted, skipUpdateFog }?: {
        defer?: boolean | undefined;
        deleted?: boolean | undefined;
        skipUpdateFog?: boolean | undefined;
    }): void;
    /** Make the drawing promise accessible to `#redraw` */
    draw(): Promise<this>;
    emitHoverIn(): void;
    emitHoverOut(): void;
    /** If Party Vision is enabled, make all player-owned actors count as vision sources for non-GM users */
    protected _isVisionSource(): boolean;
    /** Include actor overrides in the clone if it is a preview */
    clone(): this;
    /** Emit floaty text from this tokens */
    showFloatyText(params: number | ShowFloatyEffectParams): Promise<void>;
    /**
     * Measure the distance between this token and another object, in grid distance. We measure between the
     * centre of squares, and if either covers more than one square, we want the minimum distance between
     * any two of the squares.
     */
    distanceTo(target: TokenPF2e, { reach }?: {
        reach?: number | null;
    }): number;
    /** Refresh vision and the `EffectsPanel` */
    protected _onControl(options?: {
        releaseOthers?: boolean;
        pan?: boolean;
    }): void;
    /** Refresh vision and the `EffectsPanel` */
    protected _onRelease(options?: Record<string, unknown>): void;
    /** Work around Foundry bug in which unlinked token redrawing performed before data preparation completes */
    protected _onUpdate(changed: DeepPartial<this["data"]["_source"]>, options: DocumentModificationContext<this["document"]>, userId: string): void;
}
interface TokenImage extends PIXI.Sprite {
    src?: VideoPath;
}
export interface TokenPF2e extends Token<TokenDocumentPF2e> {
    get layer(): TokenLayerPF2e<this>;
    icon?: TokenImage;
}
declare type NumericFloatyEffect = {
    name: string;
    value?: number | null;
};
declare type ShowFloatyEffectParams = number | {
    create: NumericFloatyEffect;
} | {
    update: NumericFloatyEffect;
} | {
    delete: NumericFloatyEffect;
};
export {};
