import { MODULENAME } from "../constants.ts";
import { SettingRegistration } from "foundry/client/helpers/client-settings.mts";
import { toggleMenuSettings } from "../feature/settingsHandler/index.ts";
import { getModuleSetting } from "../utils.ts";

function registerSettingsFieldPartials(): void {
    const base = `modules/${MODULENAME}/templates/settings`;
    for (const name of ["checkbox", "select", "number", "range", "text"]) {
        Handlebars.registerPartial(`settings-field-${name}`, `{{> "${base}/field-${name}.hbs"}}`);
    }
}

export { registerSettingsFieldPartials };

export type PartialSettingsData = Omit<SettingRegistration, "scope" | "config">;

interface SettingsTemplateData extends PartialSettingsData {
    key: string;
    value: unknown;
    isFilepicker?: boolean;
    filePicker?: string;
    fieldPartial?: string;
    hasRange?: boolean;
    choices?: Record<string, string>;
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
export interface HideListTemplateData {
    [key: string]: {
        type?: string;
        falsy?: string | boolean;
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
    static readonly hidelist: HideListTemplateData = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(options?: any) {
        const cls = new.target as typeof SettingsMenuPF2eWorkbench;
        super(fu.mergeObject({ id: `${cls.namespace}-settings` }, options ?? {}));
    }

    static override get PARTS(): { content: { template: string }; footer: { template: string } } {
        return {
            content: { template: `modules/${MODULENAME}/templates/menu.hbs` },
            footer: { template: "templates/generic/form-footer.hbs" },
        };
    }

    /** Settings to be registered and also later referenced during user updates */
    protected static get settings(): Record<string, PartialSettingsData> {
        return {};
    }

    override get title(): string {
        return game.i18n.localize(`${MODULENAME}.SETTINGS.${this.namespace}.name`);
    }

    get namespace(): string {
        return (this.constructor as typeof SettingsMenuPF2eWorkbench).namespace;
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
        form.classList.toggle("hidden", !condition);
    }

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
            const hidelist = (this.constructor as typeof SettingsMenuPF2eWorkbench).hidelist;
            const entry = hidelist[key];
            if (entry && datum === (entry.falsy ?? false)) {
                for (const child of entry.list ?? []) {
                    delete data[child];
                    void game.settings.set(MODULENAME, child, false);
                }
            }
        }
    }

    // @ts-expect-error TODO Fix typing
    override async _prepareContext(_options?: object): Promise<MenuTemplateData> {
        const settings = (this.constructor as typeof SettingsMenuPF2eWorkbench).settings;
        const templateData: SettingsTemplateData[] = Object.entries(settings).map(([key, setting]) => {
            const value = getModuleSetting(key);

            if (setting.type === String && (setting as Record<string, unknown>).filePicker) {
                return {
                    ...setting,
                    key,
                    value,
                    choices: undefined,
                    isFilepicker: true,
                    filePicker: (setting as Record<string, unknown>).filePicker as string,
                };
            }

            if (setting.type === Boolean) {
                return { ...setting, key, value, choices: undefined, fieldPartial: "settings-field-checkbox" };
            }
            if (setting.choices) {
                return {
                    ...setting,
                    key,
                    value,
                    fieldPartial: "settings-field-select",
                    choices: setting.choices as Record<string, string>,
                };
            }
            if (setting.type === Number && setting.range) {
                return {
                    ...setting,
                    key,
                    value,
                    choices: undefined,
                    fieldPartial: "settings-field-range",
                    hasRange: true,
                };
            }
            if (setting.type === Number) {
                return { ...setting, key, value, choices: undefined, fieldPartial: "settings-field-number" };
            }
            return { ...setting, key, value, choices: undefined, fieldPartial: "settings-field-text" };
        });
        return {
            settings: templateData,
            buttons: [{ type: "submit", icon: "fa-solid fa-save", label: "SETTINGS.Save" }],
        };
    }

    override async _onRender(context: object, _options: object): Promise<void> {
        toggleMenuSettings(this.element, context as unknown as MenuTemplateData);
        const hidelist = (this.constructor as typeof SettingsMenuPF2eWorkbench).hidelist as HideListTemplateData;
        const formEl = this.element;

        function cascadeVisibility(key: string, forceHidden?: boolean): void {
            const entry = hidelist[key];
            if (!entry?.list) return;
            const parentForm = formEl.querySelector<HTMLElement>(`.form-group:has(.form-fields [name="${key}"])`);
            const parentVisible =
                forceHidden === undefined ? !parentForm || !parentForm.classList.contains("hidden") : !forceHidden;
            const setting = parentVisible && game.settings.get(MODULENAME, key) !== (entry.falsy ?? false);
            for (const child of entry.list) {
                const childForm = formEl.querySelector<HTMLElement>(`.form-group:has(.form-fields [name="${child}"])`);
                SettingsMenuPF2eWorkbench.hideForm(childForm, setting);
                if (setting && hidelist[child]) cascadeVisibility(child);
                if (!setting && hidelist[child]) cascadeVisibility(child, true);
            }
        }

        Object.entries(hidelist).forEach(([k, v]) => {
            cascadeVisibility(k);
            const settingCheckbox = formEl.querySelector<HTMLInputElement | HTMLSelectElement>(
                `.form-fields [name="${k}"]`,
            );
            if (!settingCheckbox) return;
            if (settingCheckbox.dataset.hidelistAttached) return;
            settingCheckbox.dataset.hidelistAttached = "true";
            settingCheckbox.addEventListener("change", (event) => {
                const show =
                    v.type === "select"
                        ? (event.target as HTMLSelectElement).value !== v.falsy
                        : (event.target as HTMLInputElement).checked;
                for (const child of v.list ?? []) {
                    const childForm = formEl.querySelector<HTMLElement>(
                        `.form-group:has(.form-fields [name="${child}"])`,
                    );
                    SettingsMenuPF2eWorkbench.hideForm(childForm, show);
                    if (show && hidelist[child]) cascadeVisibility(child);
                    if (!show && hidelist[child]) cascadeVisibility(child, true);
                }
            });
        });
    }
}
