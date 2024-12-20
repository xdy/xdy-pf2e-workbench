/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
declare abstract class SettingsMenuPF2e extends FormApplication {
    static readonly namespace: string;
    protected cache: Record<string, unknown> & {
        clear(): void;
    };
    static get defaultOptions(): FormApplicationOptions;
    static readonly SETTINGS: readonly string[];
    /** Settings to be registered and also later referenced during user updates */
    protected static get settings(): Record<string, PartialSettingsData>;
    static registerSettings(): void;
    get namespace(): string;
    getData(): Promise<MenuTemplateData>;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, data: Record<string, unknown>): Promise<void>;
    /** Overriden to add some additional first-render behavior */
    protected _injectHTML($html: JQuery<HTMLElement>): void;
}
interface SettingsMenuPF2e extends FormApplication {
    constructor: typeof SettingsMenuPF2e;
    options: SettingsMenuOptions;
}
interface PartialSettingsData extends Omit<SettingRegistration, "scope" | "config"> {
    prefix?: string;
    tab?: string;
}
interface SettingsTemplateData extends PartialSettingsData {
    key: string;
    value: unknown;
    isSelect: boolean;
    isCheckbox: boolean;
}
interface MenuTemplateData extends FormApplicationData {
    settings: Record<string, SettingsTemplateData>;
}
interface SettingsMenuOptions extends FormApplicationOptions {
    highlightSetting?: string;
}
declare function settingsToSheetData(settings: Record<string, PartialSettingsData>, cache?: Record<string, unknown>): Record<string, SettingsTemplateData>;
export { SettingsMenuPF2e, settingsToSheetData };
export type { MenuTemplateData, PartialSettingsData, SettingsMenuOptions, SettingsTemplateData };
