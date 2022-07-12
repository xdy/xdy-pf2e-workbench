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
export class SettingsMenuPF2eWorkbench extends FormApplication {
    static readonly namespace: string;

    static override get defaultOptions() {
        const options = super.defaultOptions;
        options.classes.push("settings-menu");

        return mergeObject(options, {
            title: `${MODULENAME}.SETTINGS.${this.namespace}.name`, //lgtm [js/mixed-static-instance-this-access]
            id: `${this.namespace}-settings`,
            template: `modules/xdy-pf2e-workbench/templates/menu.html`,
            width: 650,
            height: "auto",
            closeOnSubmit: true,
        });
    }

    get namespace(): string {
        return (this.constructor as typeof SettingsMenuPF2eWorkbench).namespace;
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

    static registerSettingsAndCreateMenu(icon = "fas fa-robot", restricted = true) {
        game.settings.registerMenu(MODULENAME, this.namespace, {
            //lgtm [js/mixed-static-instance-this-access]
            name: `${MODULENAME}.SETTINGS.${this.namespace}.name`, //lgtm [js/mixed-static-instance-this-access]
            label: `${MODULENAME}.SETTINGS.${this.namespace}.label`, //lgtm [js/mixed-static-instance-this-access]
            hint: `${MODULENAME}.SETTINGS.${this.namespace}.hint`, //lgtm [js/mixed-static-instance-this-access]
            icon: icon,
            type: this,
            restricted: restricted,
        });
        this.registerSettings();
    }

    override getData(): MenuTemplateData {
        const settings = (this.constructor as typeof SettingsMenuPF2eWorkbench).settings;
        const templateData: SettingsTemplateData[] = Object.entries(settings).map(([key, setting]) => {
            const value = game.settings.get(MODULENAME, key);
            return {
                ...setting,
                key,
                value,
                isSelect: !!setting.choices,
                isCheckbox: setting.type === Boolean,
                isText: setting.type === String,
            };
        });
        return mergeObject(super.getData(), {
            settings: templateData,
            instructions: `${MODULENAME}.SETTINGS.${this.namespace}.hint`, //lgtm [js/mixed-static-instance-this-access]
        });
    }

    protected override async _updateObject(_event: Event, data: Record<string, unknown>): Promise<void> {
        const settings = (this.constructor as typeof SettingsMenuPF2eWorkbench).settings;
        for (let key of Object.keys(data)) {
            let datum = data[key];
            if (key.includes(MODULENAME)) {
                //TODO Ugly hack, figure out what's going on. Why does the data have the module name in the key?
                key = key.split(".")[2];
            }
            //"null" check is due to a previous bug that may have left invalid data in text fields
            if (datum === null || datum === "null") {
                datum = "";
            }
            await game.settings.set(MODULENAME, key, datum);
        }
    }
}
