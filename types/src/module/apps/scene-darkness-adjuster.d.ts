/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ScenePF2e } from "@scene";
import "nouislider/dist/nouislider.min.css";
export declare class SceneDarknessAdjuster extends Application {
    #private;
    static readonly instance: SceneDarknessAdjuster;
    static get defaultOptions(): ApplicationOptions;
    getData(options?: Partial<ApplicationOptions>): Promise<object>;
    render(force?: boolean, options?: RenderOptions & {
        scenes?: ScenePF2e[];
    }): Promise<this>;
    /** Fade out before closing */
    close(options?: {
        force?: boolean;
    } & Record<string, unknown>): Promise<void>;
    activateListeners($html: JQuery): void;
    onLightingRefresh(darkness: number): void;
}
