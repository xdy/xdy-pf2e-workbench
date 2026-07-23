import { updateHooks } from "../xdy-pf2e-workbench.ts";
import { MODULENAME } from "../constants.ts";
import { SettingsMenuPF2eWorkbench } from "./menu.ts";
import { SettingRegistration } from "foundry/client/helpers/client-settings.mts";

export class WorkbenchHouseRulesSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "houseRulesSettings";

    static override DEFAULT_OPTIONS = fu.mergeObject(super.DEFAULT_OPTIONS, {
        height: "fit-content",
    });

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
                    heroicRerolls: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointRules.heroicRerolls`),
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
                onChange: () => {
                    game.settings.set(
                        "pf2e",
                        "campaignFeatSections",
                        game.settings
                            .get("pf2e", "campaignFeatSections")
                            .filter((section) => section.id !== "xdy_ancestryparagon"),
                    );
                    updateHooks();
                },
            },
            legacyVariantRuleDualClass: {
                name: `${MODULENAME}.SETTINGS.legacyVariantRuleDualClass.name`,
                hint: `${MODULENAME}.SETTINGS.legacyVariantRuleDualClass.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => {
                    game.settings.set(
                        "pf2e",
                        "campaignFeatSections",
                        game.settings
                            .get("pf2e", "campaignFeatSections")
                            .filter((section) => section.id !== "xdy_dualclass"),
                    );
                    updateHooks();
                },
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
