import { MODULENAME } from "../constants.ts";
import { getModuleSetting } from "../utils.ts";
import { resetLogLevelCache } from "../utils/logging.ts";

import * as systems from "../utils/systems.ts";

interface CampaignFeatSection {
    id: string;
    label: string;
    supported: string[];
    slots: number[];
}

function ensureSection(
    sections: CampaignFeatSection[],
    enabled: boolean,
    id: string,
    label: string,
    supported: string[],
    slots: number[],
): void {
    const exists = sections.find((section) => section.id === id);
    if (enabled && !exists) {
        sections.push({ id, label, supported, slots });
    } else if (!enabled && exists) {
        sections.splice(sections.indexOf(exists), 1);
    }
}

export function readyHook(): void {
    resetLogLevelCache();
    const legacyVariantRuleAncestryParagon = getModuleSetting<boolean>("legacyVariantRuleAncestryParagon");
    const legacyVariantRuleDualClass = getModuleSetting<boolean>("legacyVariantRuleDualClass");

    if (legacyVariantRuleDualClass || legacyVariantRuleAncestryParagon) {
        const campaignFeatSections = systems.getSetting<CampaignFeatSection[]>("campaignFeatSections");
        ensureSection(
            campaignFeatSections,
            legacyVariantRuleAncestryParagon,
            "xdy_ancestryparagon",
            game.i18n.localize(`${MODULENAME}.SETTINGS.legacyVariantRuleAncestryParagon.title`),
            ["ancestry"],
            [1, 3, 7, 11, 15, 19],
        );
        ensureSection(
            campaignFeatSections,
            legacyVariantRuleDualClass,
            "xdy_dualclass",
            game.i18n.localize(`${MODULENAME}.SETTINGS.legacyVariantRuleDualClass.title`),
            ["class"],
            [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        );
        systems.setSetting("campaignFeatSections", campaignFeatSections);
    }

    const campaignFeatSections = systems.getSetting<CampaignFeatSection[]>("campaignFeatSections");
    if (campaignFeatSections) {
        const before = campaignFeatSections.length;
        ensureSection(campaignFeatSections, legacyVariantRuleDualClass, "xdy_dualclass", "", [], []);
        ensureSection(campaignFeatSections, legacyVariantRuleAncestryParagon, "xdy_ancestryparagon", "", [], []);
        if (campaignFeatSections.length !== before) {
            systems.setSetting("campaignFeatSections", campaignFeatSections);
        }
    }
}
