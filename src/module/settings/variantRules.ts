import { MODULENAME } from "../xdy-pf2e-workbench";
import { debouncedReload } from "./index";
import { SettingsMenuPF2eWorkbench } from "./menu";

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
                onChange: () => debouncedReload(),
                requireReload: true,
            },
            abpVariantAllowItemBonuses: {
                name: `${MODULENAME}.SETTINGS.abpVariantAllowItemBonuses.name`,
                hint: `${MODULENAME}.SETTINGS.abpVariantAllowItemBonuses.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
                requireReload: true,
            },
        };
    }
}
