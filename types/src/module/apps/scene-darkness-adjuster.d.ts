/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ScenePF2e } from "@scene";
import "nouislider/dist/nouislider.min.css";
export declare class SceneDarknessAdjuster extends Application {
    #private;
    static readonly instance: SceneDarknessAdjuster;
    private scene;
    static get defaultOptions(): ApplicationOptions;
    get template(): string;
    render(force: boolean | undefined, options: RenderOptions & {
        scene: ScenePF2e | null;
    }): Promise<this>;
    activateListeners($html: JQuery): void;
    onLightingRefresh(darkness: number): void;
}
