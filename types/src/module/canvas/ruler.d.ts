import type { UserPF2e } from "@module/user/document.ts";
import type { TokenPF2e } from "./token/object.ts";

declare class RulerPF2e<TToken extends TokenPF2e | null = TokenPF2e | null> extends Ruler<TToken, UserPF2e> {
    #private;
    static get canMeasure(): boolean;
    static get hasModuleConflict(): boolean;
    /** Whether drag measurement is currently in progress */
    isDragMeasuring: boolean;
    /** Whether drag measurement is enabled */
    get dragMeasurement(): boolean;
    get isMeasuring(): boolean;
    /** Add a waypoint at the currently-drawn destination. */
    saveWaypoint(): void;
    startDragMeasurement(event: TokenPointerEvent<NonNullable<TToken>>): void;
    /**
     * @param exactDestination?: The coordinates of the dragged token preview, if any
     */
    finishDragMeasurement(event: TokenPointerEvent<NonNullable<TToken>>, exactDestination?: Point | null): Promise<boolean | void>;
    /** Acquire the token's footprint for drag measurement. */
    measure(destination: Point, options?: {
        snap?: boolean;
        force?: boolean;
    }): void | RulerMeasurementSegment[];
    /** Allow GMs to move tokens through walls when drag-measuring. */
    protected _canMove(token: TToken): boolean;
    /** Prevent inclusion of a token when using the ruler tool. */
    protected _startMeasurement(origin: Point, options?: {
        snap?: boolean;
        token?: TToken | null;
    }): void;
    /** Calculate cost as an addend to distance due to difficult terrain. */
    protected _getCostFunction(): GridMeasurePathCostFunction | undefined;
    protected _getMeasurementOrigin(point: Point, options?: {
        snap?: boolean;
    }): Point;
    protected _getMeasurementDestination(point: Point, options?: {
        snap?: boolean;
    }): Point;
    /** Widen the ruler when measuring with larger tokens. */
    protected _highlightMeasurementSegment(segment: RulerMeasurementSegment): void;
    protected _animateSegment(token: TToken, segment: RulerMeasurementSegment, destination: Point): Promise<unknown>;
    /** If measuring with a token, broadcast if the token is not hidden and only during encounters. */
    protected _broadcastMeasurement(): void;
    protected _endMeasurement(): void;
    /** Prevent behavior from keybind modifiers if token drag measurement is enabled. */
    _onMouseUp(event: PlaceablesLayerPointerEvent<NonNullable<TToken>>): void;
    /** Prevent behavior from movement keys (typically Space) if token drag measurement is enabled. */
    _onMoveKeyDown(context: KeyboardEventContext): void;
    onDragMeasureMove(event: TokenPointerEvent<NonNullable<TToken>>): void;
    onDragLeftCancel(event?: TokenPointerEvent<NonNullable<TToken>>): void;
}
export { RulerPF2e };
