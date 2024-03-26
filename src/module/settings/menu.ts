import { MODULENAME } from "../xdy-pf2e-workbench.js";

export type PartialSettingsData = Omit<SettingRegistration, "scope" | "config">;

interface SettingsTemplateData extends PartialSettingsData {
    key: string;
    value: unknown;
}

export interface MenuTemplateData extends FormApplicationData {
    settings: SettingsTemplateData[];
}

/**
 * @var {string} type   The HTMLElement's type (e.g. "input" or "select"). Defaults to "input".
 * @var {string} falsy  The falsy value. Useful for select-type elements. Defaults to false.
 * @var {string[]} list A list with the setting IDs that should be toggled when the setting is changed.
 */
interface HideListTemplateData {
    [key: string]: {
        type?: string;
        falsy?: string;
        list?: string[];
    };
}

/** An adjusted copy of the settings menu from core pf2e meant for the module */
// @ts-ignore
export class SettingsMenuPF2eWorkbench extends FormApplication {
    static readonly namespace: string;

    static override get defaultOptions() {
        const options = super.defaultOptions;
        return fu.mergeObject(options, {
            title: `${MODULENAME}.SETTINGS.${this.namespace}.name`, // lgtm [js/mixed-static-instance-this-access]
            id: `${this.namespace}-settings`, // lgtm [js/mixed-static-instance-this-access]
            template: `modules/xdy-pf2e-workbench/templates/menu.hbs`,
            classes: ["form", "xdy-pf2e-workbench", "settings-menu"],
            width: 780,
            height: 680,
            closeOnSubmit: true,
            resizable: true,
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

    static hideForm(form: HTMLElement, boolean: Boolean): void {
        form.style.display = !boolean ? "none" : "";
    }

    static readonly hidelist: Object = {} as HideListTemplateData;

    // @ts-ignore
    static hook(...args: any): HookCallback<unknown[]> {
        const html = args[1];
        Object.entries(this.hidelist).forEach(([k, v]) => {
            const setting = game.settings.get("xdy-pf2e-workbench", k) !== (v.falsy ?? false);
            const settingCheckbox = html.find(`.form-fields [name="${k}"]`);
            for (const form of v.list) {
                const settingForm = html.find(`.form-group:has(.form-fields [name="${form}"])`)[0];
                this.hideForm(settingForm, setting);
            }
            settingCheckbox.on("change", (event) => {
                for (const form of v.list) {
                    const settingForm = html.find(`.form-group:has(.form-fields [name="${form}"])`)[0];
                    let condition = event.target.checked;
                    switch (v.type) {
                        case "select":
                            condition = event.target.value !== v.falsy;
                            break;
                        case "input":
                        default:
                            break;
                    }
                    this.hideForm(settingForm, condition);
                }
            });
        });
    }

    static setRenderHooks(): void {
        const hook = this.hook;
        if (hook) {
            // @ts-ignore
            Hooks.on(`render${this.name}`, hook.bind(this));
        }
    }

    static registerSettingsAndCreateMenu(icon, restricted = true) {
        game.settings.registerMenu(MODULENAME, this.namespace, {
            name: `${MODULENAME}.SETTINGS.${this.namespace}.name`, // lgtm [js/mixed-static-instance-this-access]
            label: `${MODULENAME}.SETTINGS.${this.namespace}.label`, // lgtm [js/mixed-static-instance-this-access]
            hint: `${MODULENAME}.SETTINGS.${this.namespace}.hint`, // lgtm [js/mixed-static-instance-this-access]
            icon: icon,
            type: this,
            restricted: restricted,
        });
        this.registerSettings();
        this.setRenderHooks();
    }

    override getData(): MenuTemplateData {
        const settings = (this.constructor as typeof SettingsMenuPF2eWorkbench).settings;
        const templateData: SettingsTemplateData[] = Object.entries(settings).map(([key, setting]) => {
            const value = game.settings.get(MODULENAME, key);
            return {
                ...setting,
                key,
                value,
                isCheckbox: setting.type === Boolean,
                isFilepicker: setting.type === String && setting.filePicker,
                isNumber: setting.type === Number,
                isSelect: !!setting.choices,
                isText: setting.type === String && !setting.filePicker,
            };
        });
        return <MenuTemplateData>fu.mergeObject(super.getData(), {
            settings: templateData,
            instructions: `${MODULENAME}.SETTINGS.${this.namespace}.hint`, // lgtm [js/mixed-static-instance-this-access]
        });
    }

    protected override async _updateObject(_event: Event, data: Record<string, unknown>): Promise<void> {
        for (const key of Object.keys(data)) {
            let datum = data[key];
            // "null" check is due to a previous bug that may have left invalid data in text fields
            if (datum === null || datum === "null") {
                datum = "";
            }
            // If statement handles bug in foundry
            if (!["submit", "reset"].includes(key)) {
                await game.settings.set(MODULENAME, key, datum);
            }
        }
    }
}
