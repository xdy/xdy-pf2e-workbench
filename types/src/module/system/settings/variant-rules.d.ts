/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
export declare class VariantRulesSettings extends FormApplication {
    static get defaultOptions(): FormApplicationOptions;
    getData(): Promise<Record<string, {
        value: unknown;
        setting: SettingRegistration;
    }>>;
    static registerSettings(): void;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, data: Record<string, unknown>): Promise<void>;
}
