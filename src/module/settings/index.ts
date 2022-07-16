// Keyboard key controlling whether the actor should be mystified, if this feature is toggled on

import { MODULENAME } from "../xdy-pf2e-workbench";
import { WorkbenchMystificationSettings } from "./mystification";
import { WorkbenchRemindersSettings } from "./reminders";
import { WorkbenchWorldAutomationSettings } from "./automation-world";
import { WorkbenchClientAutomationSettings } from "./automation-client";
import { WorkbenchQolWorldSettings } from "./qol-world";

export { mystifyModifierKey } from "./mystification";

export function debouncedReload() {
    foundry.utils.debounce(() => {
        window.location.reload();
    }, 100);
}

export function registerWorkbenchSettings() {
    console.log(`${MODULENAME} | registerSettings`);

    WorkbenchMystificationSettings.registerSettingsAndCreateMenu("fas fa-eye-slash");
    WorkbenchRemindersSettings.registerSettingsAndCreateMenu("fas fa-bell");
    WorkbenchQolWorldSettings.registerSettingsAndCreateMenu("fas fa-smile");
    WorkbenchWorldAutomationSettings.registerSettingsAndCreateMenu("fas fa-robot");
    WorkbenchClientAutomationSettings.registerSettingsAndCreateMenu("fas fa-magic", false);

    game.settings.register(MODULENAME, "maxHeroPoints", {
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
    });

    game.settings.register(MODULENAME, "abpVariantAllowItemBonuses", {
        name: `${MODULENAME}.SETTINGS.abpVariantAllowItemBonuses.name`,
        hint: `${MODULENAME}.SETTINGS.abpVariantAllowItemBonuses.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOn", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOn.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOn.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnFailAnimation", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnFailAnimation.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnFailAnimation.hint`,
        scope: "world",
        config: true,
        default: "modules/JB2A_DnD5e/Library/Generic/UI/Miss_02_White_200x200.webm",
        type: String,
        filePicker: "video",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnFailSound", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnFailSound.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnFailSound.hint`,
        scope: "world",
        config: true,
        default: "modules/soundfxlibrary/Combat/Single/Melee%20Miss/melee-miss-1.mp3",
        type: String,
        filePicker: "audio",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnCritFailAnimation", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailAnimation.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailAnimation.hint`,
        scope: "world",
        config: true,
        default: "modules/JB2A_DnD5e/Library/Generic/UI/Miss_02_White_200x200.webm",
        type: String,
        filePicker: "video",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnCritFailSound", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailSound.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailSound.hint`,
        scope: "world",
        config: true,
        default: "modules/soundfxlibrary/Combat/Single/Melee%20Miss/melee-miss-1.mp3",
        type: String,
        filePicker: "audio",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnCritSuccessAnimation", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessAnimation.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessAnimation.hint`,
        scope: "world",
        config: true,
        default: "modules/JB2A_DnD5e/Library/Generic/UI/Critical_02_Red_200x200.webm",
        type: String,
        filePicker: "video",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnCritSuccessSound", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessSound.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessSound.hint`,
        scope: "world",
        config: true,
        default: "modules/soundfxlibrary/Combat/Single/Melee%20Hit/melee-hit-13.mp3",
        type: String,
        filePicker: "audio",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnSuccessAnimation", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessAnimation.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessAnimation.hint`,
        scope: "world",
        config: true,
        default: "modules/JB2A_DnD5e/Library/Generic/Impact/Impact_01_Regular_Blue_400x400.webm",
        type: String,
        filePicker: "video",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnSuccessSound", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessSound.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessSound.hint`,
        scope: "world",
        config: true,
        default: "modules/soundfxlibrary/Combat/Single/Melee%20Hit/melee-hit-1.mp3",
        type: String,
        filePicker: "audio",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationMissOffTarget", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationMissOffTarget.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationMissOffTarget.hint`,
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "autoCollapseItemChatCardContent", {
        name: `${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.name`,
        hint: `${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.hint`,
        scope: "client",
        config: true,
        default: "noCollapse",
        type: String,
        choices: {
            noCollapse: game.i18n.localize(`${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.noCollapse`),
            collapsedDefault: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.collapsedDefault`
            ),
            nonCollapsedDefault: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.nonCollapsedDefault`
            ),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "autoExpandDamageRolls", {
        name: `${MODULENAME}.SETTINGS.autoExpandDamageRolls.name`,
        hint: `${MODULENAME}.SETTINGS.autoExpandDamageRolls.hint`,
        scope: "client",
        config: true,
        default: "collapsedDefault",
        type: String,
        choices: {
            collapsedAll: game.i18n.localize(`${MODULENAME}.SETTINGS.autoExpandDamageRolls.collapsedAll`),
            expandedAll: game.i18n.localize(`${MODULENAME}.SETTINGS.autoExpandDamageRolls.expandedAll`),
            expandedNew: game.i18n.localize(`${MODULENAME}.SETTINGS.autoExpandDamageRolls.expandedNew`),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "toggleUndetectedWithVisibilityState", {
        name: `${MODULENAME}.SETTINGS.toggleUndetectedWithVisibilityState.name`,
        hint: `${MODULENAME}.SETTINGS.toggleUndetectedWithVisibilityState.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });
}
