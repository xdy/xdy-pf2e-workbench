import { MeasuredTemplatePF2e } from "./measured-template";
export declare class GhostTemplate extends MeasuredTemplatePF2e {
    #private;
    moveTime: number;
    private _onMouseMove;
    private _onLeftClick;
    _onMouseWheel: (event: WheelEvent) => void;
    destroy(options?: boolean | PIXI.IDestroyOptions): void;
    drawPreview(): Promise<void>;
    activatePreviewListeners(): void;
}
