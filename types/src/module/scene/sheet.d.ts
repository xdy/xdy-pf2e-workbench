/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ScenePF2e } from "./index";

export declare class SceneConfigPF2e extends SceneConfig<ScenePF2e> {
    /** Hide Unrestricted Vision Range settings when rules-based vision is enabled */
    activateListeners($html: JQuery): void;
}
