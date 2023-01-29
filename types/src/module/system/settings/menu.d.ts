/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
export type PartialSettingsData = Omit<SettingRegistration, "scope" | "config">;
interface SettingsTemplateData extends PartialSettingsData {
    key: string;
    value: unknown;
    isSelect: boolean;
    isCheckbox: boolean;
}
interface MenuTemplateData extends FormApplicationData {
    settings: Record<string, SettingsTemplateData>;
}
declare abstract class SettingsMenuPF2e extends FormApplication {
    static readonly namespace: string;
    cache: Record<string, unknown>;
    static get defaultOptions(): FormApplicationOptions & {
        title: string;
        id: string;
        template: string;
        width: number;
        height: string;
        tabs: {
            navSelector: string;
            contentSelector: string;
        }[];
        closeOnSubmit: boolean;
        submitOnChange: boolean;
    };
    static get prefix(): string;
    get namespace(): string;
    get prefix(): string;
    static readonly SETTINGS: readonly string[];
    /** Settings to be registered and also later referenced during user updates */
    protected static get settings(): Record<string, PartialSettingsData>;
    static registerSettings(): void;
    getData(): Promise<MenuTemplateData>;
    protected _updateObject(event: Event, data: Record<string, unknown>): Promise<void>;
    /** Overriden to add some additional first-render behavior */
    protected _injectHTML($html: JQuery<HTMLElement>): void;
}
interface SettingsMenuPF2e extends FormApplication {
    constructor: typeof SettingsMenuPF2e;
}
declare function settingsToSheetData(settings: Record<string, PartialSettingsData>, cache: Record<string, unknown>, prefix?: string): Record<string, SettingsTemplateData>;
export { MenuTemplateData, SettingsMenuPF2e, SettingsTemplateData, settingsToSheetData };
