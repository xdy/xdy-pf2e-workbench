export declare class GhostTemplate extends MeasuredTemplate {
    moveTime: number;
    private _onMouseMove;
    private _onLeftClick;
    _onMouseWheel: (event: WheelEvent) => void;
    destroy(options?: boolean | PIXI.IDestroyOptions): void;
    drawPreview(): Promise<void>;
    activatePreviewListeners(): void;
}
