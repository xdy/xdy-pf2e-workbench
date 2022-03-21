export declare class GhostTemplate extends MeasuredTemplate {
    moveTime: number;
    private _onMouseMove;
    _onClickRight: (_event: PIXI.InteractionEvent) => void;
    private _onLeftClick;
    _onMouseWheel: (event: WheelEvent) => void;
    drawPreview(): void;
    activatePreviewListeners(): void;
}
