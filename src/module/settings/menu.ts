import { MODULENAME } from "../xdy-pf2e-workbench.js";
import { SettingRegistration } from "foundry/client/helpers/client-settings.mts";
import { toggleMenuSettings } from "../feature/settingsHandler/index.js";

export type PartialSettingsData = Omit<SettingRegistration, "scope" | "config">;

interface SettingsTemplateData extends PartialSettingsData {
    key: string;
    value: unknown;
}

// Note, this type is not quite the same as MenuTemplateData from the pf2e settings menu
export interface MenuTemplateData {
    settings: SettingsTemplateData[];
    buttons: object[];
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
export class SettingsMenuPF2eWorkbench extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.api.ApplicationV2,
) {
    static readonly namespace: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static override DEFAULT_OPTIONS: Record<string, any> = {
        tag: "form",
        window: {
            contentClasses: ["form", "xdy-pf2e-workbench", "settings-menu", "standard-form"],
            resizable: true,
        },
        position: { width: 780, height: 680 },
        form: {
            handler: SettingsMenuPF2eWorkbench.formHandler,
            closeOnSubmit: true,
        },
    };

    static override get PARTS() {
        return {
            content: { template: `modules/${MODULENAME}/templates/menu.hbs` },
            footer: { template: "templates/generic/form-footer.hbs" },
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(options?: any) {
        const cls = new.target as typeof SettingsMenuPF2eWorkbench;
        super(fu.mergeObject({ id: `${cls.namespace}-settings` }, options ?? {}));
    }

    override get title(): string {
        return game.i18n.localize(`${MODULENAME}.SETTINGS.${this.namespace}.name`);
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
            const spreadElements = { ...settings[setting] };
            game.settings.register(MODULENAME, setting, {
                ...spreadElements,
                config: false,
            });
        }
    }

    static hideForm(form: HTMLElement | null | undefined, condition: boolean): void {
        if (form === null || form === undefined) {
            return;
        }
        form.style.display = !condition ? "none" : "";
    }

    static readonly hidelist: object = {} as HideListTemplateData;

    static registerSettingsAndCreateMenu(icon: string, restricted = true): void {
        game.settings.registerMenu(MODULENAME, this.namespace, {
            name: `${MODULENAME}.SETTINGS.${this.namespace}.name`, // lgtm [js/mixed-static-instance-this-access]
            label: `${MODULENAME}.SETTINGS.${this.namespace}.label`, // lgtm [js/mixed-static-instance-this-access]
            hint: `${MODULENAME}.SETTINGS.${this.namespace}.hint`, // lgtm [js/mixed-static-instance-this-access]
            icon: icon,
            // @ts-expect-error TODO Fix typing
            type: this,
            restricted: restricted,
        });
        this.registerSettings();
    }

    // @ts-expect-error TODO Fix typing
    override async _prepareContext(_options?: object): Promise<MenuTemplateData> {
        const settings = (this.constructor as typeof SettingsMenuPF2eWorkbench).settings;
        const templateData: SettingsTemplateData[] = Object.entries(settings).map(([key, setting]) => {
            const value = game.settings.get(MODULENAME, key);
            return {
                ...setting,
                key,
                value,
                isCheckbox: setting.type === Boolean,
                // @ts-expect-error filePicker is not typed in SettingRegistration
                isFilepicker: setting.type === String && setting.filePicker,
                isNumber: setting.type === Number,
                isSelect: !!setting.choices,
                // @ts-expect-error filePicker is not typed in SettingRegistration
                isText: setting.type === String && !setting.filePicker,
            };
        });
        return {
            settings: templateData,
            buttons: [{ type: "submit", icon: "fa-solid fa-save", label: "SETTINGS.Save" }],
        };
    }

    // @ts-expect-error TODO Fix typing
    override _onRender(_context: object, _options: object): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toggleMenuSettings(this.element, _context as any);
        const hidelist = (this.constructor as typeof SettingsMenuPF2eWorkbench).hidelist as HideListTemplateData;
        Object.entries(hidelist).forEach(([k, v]) => {
            const setting = game.settings.get("xdy-pf2e-workbench", k) !== (v.falsy ?? false);
            const settingCheckbox = this.element.querySelector<HTMLInputElement | HTMLSelectElement>(
                `.form-fields [name="${k}"]`,
            );
            for (const form of v.list ?? []) {
                const settingForm = this.element.querySelector<HTMLElement>(
                    `.form-group:has(.form-fields [name="${form}"])`,
                );
                SettingsMenuPF2eWorkbench.hideForm(settingForm, setting);
            }
            settingCheckbox?.addEventListener("change", (event) => {
                for (const form of v.list ?? []) {
                    const settingForm = this.element.querySelector<HTMLElement>(
                        `.form-group:has(.form-fields [name="${form}"])`,
                    );
                    let condition = (event.target as HTMLInputElement).checked;
                    switch (v.type) {
                        case "select":
                            condition = (event.target as HTMLSelectElement).value !== v.falsy;
                            break;
                        case "input":
                        default:
                            break;
                    }
                    SettingsMenuPF2eWorkbench.hideForm(settingForm, condition);
                }
            });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async formHandler(_event: Event, _form: HTMLFormElement, formData: any): Promise<void> {
        const data = foundry.utils.expandObject(formData.object) as Record<string, unknown>;
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
