/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ScenePF2e } from "./index.ts";
export declare class SceneConfigPF2e<TDocument extends ScenePF2e> extends SceneConfig<TDocument> {
    /** Hide Unrestricted Vision Range settings when rules-based vision is enabled */
    activateListeners($html: JQuery): void;
}
