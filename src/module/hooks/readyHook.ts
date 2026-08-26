import { MODULENAME } from "../constants.ts";

import * as systems from "../utils/systems.ts";

interface CampaignFeatSection {
    id: string;
    label: string;
    supported: string[];
    slots: number[];
}

function upsertSection(sections: CampaignFeatSection[], enabled: boolean, section: CampaignFeatSection): boolean {
    const idx = sections.findIndex((s) => s.id === section.id);
    if (enabled && idx === -1) {
        sections.push(section);
        return true;
    } else if (!enabled && idx !== -1) {
        sections.splice(idx, 1);
        return true;
    }
    return false;
}

export function readyHook(): void {
    const legacyVariantRuleAncestryParagon = game.settings.get(
        MODULENAME,
        "legacyVariantRuleAncestryParagon",
    ) as boolean;
    const legacyVariantRuleDualClass = game.settings.get(MODULENAME, "legacyVariantRuleDualClass") as boolean;

    const campaignFeatSections = systems.getSetting<CampaignFeatSection[]>("campaignFeatSections");
    if (!campaignFeatSections) return;

    let changed = false;

    if (
        upsertSection(campaignFeatSections, legacyVariantRuleAncestryParagon, {
            id: "xdy_ancestryparagon",
            label: game.i18n.localize(`${MODULENAME}.SETTINGS.legacyVariantRuleAncestryParagon.title`),
            supported: ["ancestry"],
            slots: [1, 3, 7, 11, 15, 19],
        })
    ) {
        changed = true;
    }

    if (
        upsertSection(campaignFeatSections, legacyVariantRuleDualClass, {
            id: "xdy_dualclass",
            label: game.i18n.localize(`${MODULENAME}.SETTINGS.legacyVariantRuleDualClass.title`),
            supported: ["class"],
            slots: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        })
    ) {
        changed = true;
    }

    if (changed) {
        systems.setSetting("campaignFeatSections", campaignFeatSections);
    }
}
