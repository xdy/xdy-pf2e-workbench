import { MODULENAME } from "../xdy-pf2e-workbench.js";
import * as systems from "../utils/systems.js";

export function readyHook(): void {
    const legacyVariantRuleAncestryParagon = game.settings.get(MODULENAME, "legacyVariantRuleAncestryParagon");
    const legacyVariantRuleDualClass = game.settings.get(MODULENAME, "legacyVariantRuleDualClass");

    // Add campaign feat sections if enabled
    if (legacyVariantRuleDualClass || legacyVariantRuleAncestryParagon) {
        const campaignFeatSections = systems.getSetting<
            {
                id: string;
                label: string;
                supported: string[];
                slots: number[];
            }[]
        >("campaignFeatSections");
        if (legacyVariantRuleAncestryParagon) {
            if (!campaignFeatSections.find((section) => section.id === "xdy_ancestryparagon")) {
                campaignFeatSections.push({
                    id: "xdy_ancestryparagon",
                    label: game.i18n.localize(`${MODULENAME}.SETTINGS.legacyVariantRuleAncestryParagon.title`),
                    supported: ["ancestry"],
                    slots: [1, 3, 7, 11, 15, 19],
                });
            }
        }

        if (legacyVariantRuleDualClass) {
            if (!campaignFeatSections.find((section) => section.id === "xdy_dualclass")) {
                campaignFeatSections.push({
                    id: "xdy_dualclass",
                    label: game.i18n.localize(`${MODULENAME}.SETTINGS.legacyVariantRuleDualClass.title`),
                    supported: ["class"],
                    slots: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                });
            }
        }

        systems.setSetting("campaignFeatSections", campaignFeatSections);
    }

    const campaignFeatSections = systems.getSetting<
        {
            id: string;
            label: string;
            supported: string[];
            slots: number[];
        }[]
    >("campaignFeatSections");
    // ... or remove it if disabled.
    if (
        campaignFeatSections &&
        !legacyVariantRuleDualClass &&
        campaignFeatSections.find((section) => section.id === "xdy_dualclass")
    ) {
        campaignFeatSections.splice(
            campaignFeatSections.findIndex((section) => section.id === "xdy_dualclass"),
            1,
        );
        systems.setSetting("campaignFeatSections", campaignFeatSections);
    }

    if (
        campaignFeatSections &&
        !legacyVariantRuleAncestryParagon &&
        campaignFeatSections.find((section) => section.id === "xdy_ancestryparagon")
    ) {
        campaignFeatSections.splice(
            campaignFeatSections.findIndex((section) => section.id === "xdy_ancestryparagon"),
            1,
        );
        systems.setSetting("campaignFeatSections", campaignFeatSections);
    }
}
