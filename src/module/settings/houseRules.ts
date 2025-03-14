import { MODULENAME, updateHooks } from "../xdy-pf2e-workbench.js";
import { SettingsMenuPF2eWorkbench } from "./menu.js";

export class WorkbenchHouseRulesSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "houseRulesSettings";

    static override get defaultOptions() {
        return fu.mergeObject(super.defaultOptions, {
            height: "fit-content",
        });
    }

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            heroPointRules: {
                name: `${MODULENAME}.SETTINGS.heroPointRules.name`,
                hint: `${MODULENAME}.SETTINGS.heroPointRules.hint`,
                scope: "world",
                default: "no",
                type: String,
                choices: {
                    no: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointRules.no`),
                    keeleysHeroPointRule: game.i18n.localize(
                        `${MODULENAME}.SETTINGS.heroPointRules.keeleysHeroPointRule`,
                    ),
                    useHighestHeroPointRoll: game.i18n.localize(
                        `${MODULENAME}.SETTINGS.heroPointRules.useHighestHeroPointRoll`,
                    ),
                },
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            legacyVariantRuleAncestryParagon: {
                name: `${MODULENAME}.SETTINGS.legacyVariantRuleAncestryParagon.name`,
                hint: `${MODULENAME}.SETTINGS.legacyVariantRuleAncestryParagon.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
            },
            legacyVariantRuleDualClass: {
                name: `${MODULENAME}.SETTINGS.legacyVariantRuleDualClass.name`,
                hint: `${MODULENAME}.SETTINGS.legacyVariantRuleDualClass.hint`,
                scope: "world",
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
