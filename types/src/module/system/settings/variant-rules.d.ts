/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { SettingsTemplateData } from "./menu.ts";

export declare class VariantRulesSettings extends FormApplication {
    static get defaultOptions(): FormApplicationOptions;
    getData(): Promise<Record<string, SettingsTemplateData>>;
    static registerSettings(): void;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, data: Record<string, unknown>): Promise<void>;
}
