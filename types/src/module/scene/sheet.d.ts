/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ScenePF2e } from ".";
export declare class SceneConfigPF2e<TDocument extends ScenePF2e> extends SceneConfig<TDocument> {
    /** Hide Unrestricted Vision Range settings when rules-based vision is enabled */
    activateListeners($html: JQuery): void;
}
