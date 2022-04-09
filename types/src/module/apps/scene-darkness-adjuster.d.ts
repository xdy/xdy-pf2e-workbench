/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ScenePF2e } from "@scene";
import { API as Slider } from "nouislider";
import "nouislider/dist/nouislider.min.css";
export declare class SceneDarknessAdjuster extends Application {
    static readonly instance: SceneDarknessAdjuster;
    private scene;
    slider?: Slider;
    static get defaultOptions(): ApplicationOptions;
    get template(): string;
    render(force: boolean | undefined, options: RenderOptions & {
        scene: ScenePF2e | null;
    }): Promise<this>;
    activateListeners($html: JQuery): void;
    onLightingRefresh(darkness: number): void;
}
