/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { EffectPF2e } from "@item";
import { AfflictionPF2e } from "@item/affliction";
import { FlattenedCondition } from "../system/conditions";
export declare class EffectsPanel extends Application {
    #private;
    private get token();
    private get actor();
    /**
     * Debounce and slightly delayed request to re-render this panel. Necessary for situations where it is not possible
     * to properly wait for promises to resolve before refreshing the UI.
     */
    refresh: (force?: boolean | undefined, options?: RenderOptions | undefined) => void;
    static get defaultOptions(): ApplicationOptions;
    getData(options?: ApplicationOptions): Promise<EffectsPanelData>;
    activateListeners($html: JQuery): void;
}
interface EffectsDescriptionData {
    afflictions: String[];
    conditions: String[];
    effects: String[];
}
interface EffectsPanelData {
    afflictions: AfflictionPF2e[];
    conditions: FlattenedCondition[];
    descriptions: EffectsDescriptionData;
    effects: EffectPF2e[];
    actor: ActorPF2e | null;
    user: {
        isGM: boolean;
    };
}
export {};
