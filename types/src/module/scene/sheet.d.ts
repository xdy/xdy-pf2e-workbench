/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ScenePF2e } from ".";
export declare class SceneConfigPF2e<TScene extends ScenePF2e> extends SceneConfig<TScene> {
    /** Hide Unrestricted Vision Range settings when rules-based vision is enabled */
    activateListeners($html: JQuery): void;
}
