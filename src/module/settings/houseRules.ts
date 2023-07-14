import { MODULENAME } from "../xdy-pf2e-workbench.js";
import { SettingsMenuPF2eWorkbench } from "./menu.js";

export class WorkbenchHouseRulesSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "houseRulesSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            houseRulerI18n: {
                name: `${MODULENAME}.SETTINGS.houseRulerI18n.name`,
                hint: `${MODULENAME}.SETTINGS.houseRulerI18n.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
            },
            housepatcher: {
                name: `${MODULENAME}.SETTINGS.housepatcher.name`,
                hint: `${MODULENAME}.SETTINGS.housepatcher.hint`,
                scope: "world",
                config: true,
                default: "",
                type: String,
            },
        };
    }
}
