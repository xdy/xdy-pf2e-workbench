/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor";
import type { AfflictionPF2e, ConditionPF2e, EffectPF2e } from "@item";
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
    afflictions: string[];
    conditions: string[];
    effects: string[];
}
interface EffectsPanelData {
    afflictions: AfflictionPF2e[];
    conditions: ConditionPF2e[];
    descriptions: EffectsDescriptionData;
    effects: EffectPF2e[];
    actor: ActorPF2e | null;
    user: {
        isGM: boolean;
    };
}
export {};
