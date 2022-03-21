/// <reference types="jquery" />
/// <reference types="tooltipster" />
interface FormInputData extends Omit<ClientSettingsData, "scope"> {
    key: string;
    value: unknown;
    isSelect: boolean;
    isCheckbox: boolean;
    isDateTime: boolean;
    scope?: "world" | "client";
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
    getData(): TemplateData;
    /** Register World Clock settings */
    static registerSettings(): void;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, data: Record<string, unknown> & UpdateData): Promise<void>;
    /** Settings to be registered and also later referenced during user updates */
    private static get settings();
}
export {};
