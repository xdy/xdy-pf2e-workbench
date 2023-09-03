import { MODULENAME, updateHooks } from "../xdy-pf2e-workbench.js";
import { SettingsMenuPF2eWorkbench } from "./menu.js";

export class WorkbenchVariantRulesSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "variantRulesSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            abpVariantAllowItemBonuses: {
                name: `${MODULENAME}.SETTINGS.abpVariantAllowItemBonuses.name`,
                hint: `${MODULENAME}.SETTINGS.abpVariantAllowItemBonuses.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
        };
    }
}
