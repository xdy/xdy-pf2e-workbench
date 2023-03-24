import { MODULENAME } from "../xdy-pf2e-workbench";
import { WorkbenchMystificationSettings } from "./mystification";
import { WorkbenchRemindersSettings } from "./reminders";
import { WorkbenchWorldAutomationSettings } from "./automation-world";
import { WorkbenchClientAutomationSettings } from "./automation-client";
import { WorkbenchQolWorldSettings } from "./qol-world";
import { WorkbenchVariantRulesSettings } from "./variantRules";

export { mystifyModifierKey, mystifyRandomPropertyType } from "./mystification";

export function debouncedReload() {
    // @ts-ignore
    foundry.utils.debouncedReload();
}

export function registerWorkbenchSettings() {
    console.log(`${MODULENAME} | registerSettings`);

    WorkbenchMystificationSettings.registerSettingsAndCreateMenu("fas fa-eye-slash");
    WorkbenchRemindersSettings.registerSettingsAndCreateMenu("fas fa-bell");
    WorkbenchQolWorldSettings.registerSettingsAndCreateMenu("fas fa-smile");
    WorkbenchWorldAutomationSettings.registerSettingsAndCreateMenu("fas fa-robot");
    WorkbenchClientAutomationSettings.registerSettingsAndCreateMenu("fas fa-magic", false);
    WorkbenchVariantRulesSettings.registerSettingsAndCreateMenu("fas fa-alt");

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
        requiresReload: true,
    });

    game.settings.register(MODULENAME, "autoCollapseItemActionChatCardContent", {
        name: `${MODULENAME}.SETTINGS.autoCollapseItemActionChatCardContent.name`,
        hint: `${MODULENAME}.SETTINGS.autoCollapseItemActionChatCardContent.hint`,
        scope: "client",
        config: true,
        default: "noCollapse",
        type: String,
        choices: {
            noCollapse: game.i18n.localize(`${MODULENAME}.SETTINGS.autoCollapseItemActionChatCardContent.noCollapse`),
            collapsedDefault: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoCollapseItemActionChatCardContent.collapsedDefault`
            ),
            nonCollapsedDefault: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoCollapseItemActionChatCardContent.nonCollapsedDefault`
            ),
        },
        onChange: () => debouncedReload(),
        requiresReload: true,
    });

    game.settings.register(MODULENAME, "autoCollapseItemAttackChatCardContent", {
        name: `${MODULENAME}.SETTINGS.autoCollapseItemAttackChatCardContent.name`,
        hint: `${MODULENAME}.SETTINGS.autoCollapseItemAttackChatCardContent.hint`,
        scope: "client",
        config: true,
        default: "noCollapse",
        type: String,
        choices: {
            noCollapse: game.i18n.localize(`${MODULENAME}.SETTINGS.autoCollapseItemAttackChatCardContent.noCollapse`),
            collapsedDefault: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoCollapseItemAttackChatCardContent.collapsedDefault`
            ),
            nonCollapsedDefault: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoCollapseItemAttackChatCardContent.nonCollapsedDefault`
            ),
        },
        onChange: () => debouncedReload(),
        requiresReload: true,
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
            expandedNewest: game.i18n.localize(`${MODULENAME}.SETTINGS.autoExpandDamageRolls.expandedNewest`),
        },
        onChange: () => debouncedReload(),
        requiresReload: true,
    });

    game.settings.register(MODULENAME, "skillActions", {
        name: `${MODULENAME}.skillActions.Settings.Position.name`,
        hint: `${MODULENAME}.skillActions.Settings.Position.hint`,
        scope: "client",
        config: true,
        default: "disabled",
        type: String,
        choices: {
            disabled: game.i18n.localize(`${MODULENAME}.skillActions.Settings.Position.disabled`),
            bottom: game.i18n.localize(`${MODULENAME}.skillActions.Settings.Position.bottom`),
            top: game.i18n.localize(`${MODULENAME}.skillActions.Settings.Position.top`),
        },
        onChange: () => debouncedReload(),
        requiresReload: true,
    });

    game.settings.register(MODULENAME, "skillActionsIconStyle", {
        name: `${MODULENAME}.skillActions.Settings.IconStyle.name`,
        hint: `${MODULENAME}.skillActions.Settings.IconStyle.hint`,
        scope: "client",
        config: true,
        default: "skillIcon",
        type: String,
        choices: {
            actionCostIcon: game.i18n.localize(`${MODULENAME}.skillActions.Settings.IconStyle.actionCostIcon`),
            skillIcon: game.i18n.localize(`${MODULENAME}.skillActions.Settings.IconStyle.skillIcon`),
        },
    });

    game.settings.register(MODULENAME, "skillActionsDescription", {
        name: `${MODULENAME}.skillActions.Settings.Description.name`,
        hint: `${MODULENAME}.skillActions.Settings.Description.hint`,
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "basicActionMacroShowBestBonus", {
        name: `${MODULENAME}.macros.basicActionMacros.settings.showBestBonus.name`,
        hint: `${MODULENAME}.macros.basicActionMacros.settings.showBestBonus.hint`,
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    // game.settings.register(MODULENAME, "skillActionsHideDuplicates", {
    //     name: `${MODULENAME}.skillActionsHideDuplicates.Settings.hideDuplicates.name`,
    //     hint: `${MODULENAME}.skillActionsHideDuplicates.Settings.hideDuplicates.hint`,
    //     scope: "client",
    //     config: true,
    //     default: "hideActions",
    //     type: String,
    //     choices: {
    //         doNotHide: game.i18n.localize(`${MODULENAME}.skillActionsHideDuplicates.Settings.hideDuplicates.doNotHide`),
    //         hideActions: game.i18n.localize(
    //             `${MODULENAME}.skillActionsHideDuplicates.Settings.hideDuplicates.hideActions`
    //         ),
    //         hideSkillActions: game.i18n.localize(
    //             `${MODULENAME}.skillActionsHideDuplicates.Settings.hideDuplicates.hideSkillActions`
    //         ),
    //     },
    //     onChange: () => debouncedReload(),
    // });

    game.settings.register(MODULENAME, "customPauseImage", {
        name: `${MODULENAME}.SETTINGS.customPauseImage.name`,
        hint: `${MODULENAME}.SETTINGS.customPauseImage.hint`,
        scope: "world",
        config: true,
        default: "",
        type: String,
        filePicker: "image",
    });

    game.settings.register(MODULENAME, "customPauseText", {
        name: `${MODULENAME}.SETTINGS.customPauseText.name`,
        hint: `${MODULENAME}.SETTINGS.customPauseText.hint`,
        scope: "world",
        config: true,
        default: "",
        type: String,
    });

    game.settings.register(MODULENAME, "customPauseRelocation", {
        name: `${MODULENAME}.SETTINGS.customPauseRelocation.name`,
        hint: `${MODULENAME}.SETTINGS.customPauseRelocation.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "workbenchVersion", {
        name: `${MODULENAME}.SETTINGS.workbenchVersion.name`,
        hint: `${MODULENAME}.SETTINGS.workbenchVersion.hint`,
        scope: "world",
        config: true,
        default: "3.34.0",
        type: String,
        onChange: () => debouncedReload(),
        requiresReload: true,
    });
}
