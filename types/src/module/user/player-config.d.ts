/** Player-specific settings, stored as flags on each world User */
export declare class PlayerConfigPF2e extends FormApplication {
    settings: UserSettingsPF2e;
    constructor();
    static readonly defaultSettings: UserSettingsPF2e;
    static get defaultOptions(): Required<FormApplicationOptions>;
    getData(): PlayerConfigData;
    static activateColorScheme(): void;
    /**
     * Creates a div for the module and button for the Player Configuration
     * @param html the html element where the button will be created
     */
    static hookOnRenderSettings(): void;
    _updateObject(_event: Event, formData: Record<string, unknown> & UserSettingsPF2e): Promise<void>;
}
interface PlayerConfigData extends FormApplicationData, UserSettingsPF2e {
    developMode: boolean;
}
export interface UserSettingsPF2e {
    uiTheme: "blue" | "red" | "original" | "ui";
    showEffectPanel: boolean;
    showRollDialogs: boolean;
    darkvisionFilter: boolean;
}
export {};
