import { MODULENAME } from "../xdy-pf2e-workbench";

export type PartialSettingsData = Omit<SettingRegistration, "scope" | "config">;

interface SettingsTemplateData extends PartialSettingsData {
    key: string;
    value: unknown;
}

export interface MenuTemplateData extends FormApplicationData {
    settings: SettingsTemplateData[];
}

/** An adjusted copy of the settings menu from core pf2e meant for the module */
export class SettingsMenuPF2e extends FormApplication {
    static readonly namespace: string;

    static override get defaultOptions() {
        const options = super.defaultOptions;
        options.classes.push("settings-menu");

        return mergeObject(options, {
            title: `${MODULENAME}.SETTINGS.${this.namespace}.name`,
            id: `${this.namespace}-settings`,
            template: `modules/xdy-pf2e-workbench/templates/menu.html`,
            width: 550,
            height: "auto",
            closeOnSubmit: true,
        });
    }

    get namespace(): string {
        return (this.constructor as typeof SettingsMenuPF2e).namespace;
    }

    /** Settings to be registered and also later referenced during user updates */
    protected static get settings(): Record<string, PartialSettingsData> {
        return {};
    }

    static registerSettings(): void {
        const settings = this.settings;
        for (const setting of Object.keys(settings)) {
            game.settings.register(MODULENAME, setting, {
                ...settings[setting],
                config: false,
            });
        }
    }

    static registerSettingsAndCreateMenu() {
        game.settings.registerMenu(MODULENAME, this.namespace, {
            name: `${MODULENAME}.SETTINGS.${this.namespace}.name`,
            label: `${MODULENAME}.SETTINGS.${this.namespace}.label`,
            hint: `${MODULENAME}.SETTINGS.${this.namespace}.hint`,
            icon: "fas fa-robot",
            type: this,
            restricted: true,
        });
        this.registerSettings();
    }

    override getData(): MenuTemplateData {
        const settings = (this.constructor as typeof SettingsMenuPF2e).settings;
        const templateData: SettingsTemplateData[] = Object.entries(settings).map(([key, setting]) => {
            const value = game.settings.get(MODULENAME, key);
            return {
                ...setting,
                key,
                value,
                isSelect: !!setting.choices,
                isCheckbox: setting.type === Boolean,
            };
        });
        return mergeObject(super.getData(), {
            settings: templateData,
            instructions: `${MODULENAME}.SETTINGS.${this.namespace}.hint`,
        });
    }

    protected override async _updateObject(_event: Event, data: Record<string, unknown>): Promise<void> {
        const settings = (this.constructor as typeof SettingsMenuPF2e).settings;
        for (const key of Object.keys(settings)) {
            await game.settings.set(MODULENAME, key, data[key]);
        }
    }
}
