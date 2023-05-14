import { MODULENAME, updateHooks } from "../xdy-pf2e-workbench.js";
import { SettingsMenuPF2eWorkbench } from "./menu.js";

export class WorkbenchVariantRulesSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "variantRulesSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            maxHeroPoints: {
                name: `${MODULENAME}.SETTINGS.maxHeroPoints.name`,
                hint: `${MODULENAME}.SETTINGS.maxHeroPoints.hint`,
                scope: "world",
                config: true,
                default: 3,
                type: Number,
                // @ts-ignore Shut up typescript, it works.
                range: {
                    min: 0,
                    max: 10,
                    step: 1,
                },
                onChange: () => updateHooks(),
                requiresReload: true,
            },
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
