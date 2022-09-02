/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/base";
import { EffectPF2e } from "@item";
import { FlattenedCondition } from "../system/conditions";
export declare class EffectsPanel extends Application {
    private get actor();
    /**
     * Debounce and slightly delayed request to re-render this panel. Necessary for situations where it is not possible
     * to properly wait for promises to resolve before refreshing the UI.
     */
    refresh: (force?: boolean | undefined, options?: RenderOptions | undefined) => void;
    static get defaultOptions(): ApplicationOptions & {
        id: string;
        popOut: boolean;
        template: string;
    };
    getData(options?: ApplicationOptions): Promise<EffectsPanelData>;
    activateListeners($html: JQuery): void;
    private static getParentConditionsBreakdown;
    private static getRemainingDurationLabel;
}
interface EffectsPanelData {
    conditions: FlattenedCondition[];
    effects: EffectPF2e[];
    actor: ActorPF2e | null;
}
export {};
