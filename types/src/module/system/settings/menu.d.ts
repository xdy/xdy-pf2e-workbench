export declare type PartialSettingsData = Omit<ClientSettingsData, "scope" | "config">;
interface SettingsTemplateData extends PartialSettingsData {
    key: string;
    value: unknown;
}
export interface MenuTemplateData extends FormApplicationData {
    settings: SettingsTemplateData[];
}
export declare abstract class SettingsMenuPF2e extends FormApplication {
    static readonly namespace: string;
    static get defaultOptions(): FormApplicationOptions & {
        title: string;
        id: string;
        template: string;
        width: number;
        height: string;
        closeOnSubmit: boolean;
    };
    get namespace(): string;
    static readonly SETTINGS: ReadonlyArray<string>;
    /** Settings to be registered and also later referenced during user updates */
    protected static get settings(): Record<string, PartialSettingsData>;
    static registerSettings(): void;
    getData(): MenuTemplateData;
    protected _updateObject(_event: Event, data: Record<string, unknown>): Promise<void>;
}
export {};
