/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
interface FormInputData extends Omit<SettingConfig, "config" | "namespace" | "scope"> {
    value: unknown;
    isSelect: boolean;
    isCheckbox: boolean;
    isDateTime: boolean;
}
interface TemplateData extends FormApplicationData {
    settings: FormInputData[];
}
interface UpdateData {
    dateTheme: string;
    timeConvention: boolean;
    playersCanView: boolean;
    syncDarkness: boolean;
    syncDarknessScene: boolean;
    worldCreatedOn: string;
    showClockButton: boolean;
}
export declare class WorldClockSettings extends FormApplication {
    static get defaultOptions(): FormApplicationOptions;
    getData(): Promise<TemplateData>;
    /** Register World Clock settings */
    static registerSettings(): void;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, data: Record<string, unknown> & UpdateData): Promise<void>;
    /** Settings to be registered and also later referenced during user updates */
    private static get settings();
}
export {};
