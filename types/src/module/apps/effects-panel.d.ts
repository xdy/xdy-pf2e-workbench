/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor";
import { AbstractEffectPF2e } from "@item";

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
    getData(options?: ApplicationOptions): Promise<EffectsPanelViewData>;
    activateListeners($html: JQuery): void;
    render(force?: boolean, options?: RenderOptions): this;
}
interface EffectsPanelViewData {
    afflictions: EffectViewData[];
    conditions: EffectViewData[];
    effects: EffectViewData[];
    actor: ActorPF2e | null;
    user: {
        isGM: boolean;
    };
}
interface EffectViewData {
    effect: AbstractEffectPF2e;
    description: string;
    remaining: string | null;
}
export {};
