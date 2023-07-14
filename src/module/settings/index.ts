import { MODULENAME, updateHooks } from "../xdy-pf2e-workbench.js";
import { WorkbenchMystificationSettings } from "./mystification.js";
import { WorkbenchRemindersSettings } from "./reminders.js";
import { WorkbenchWorldAutomationSettings } from "./automation-world.js";
import { WorkbenchClientAutomationSettings } from "./automation-client.js";
import { WorkbenchQolWorldSettings } from "./qol-world.js";
import { WorkbenchVariantRulesSettings } from "./variantRules.js";
import { logInfo } from "../utils.js";
import { WorkbenchHouseRulesSettings } from "./houseRules.js";

export { mystifyModifierKey, mystifyRandomPropertyType } from "./mystification.js";

export function registerWorkbenchSettings() {
    logInfo(`${MODULENAME} | registerSettings`);

    WorkbenchMystificationSettings.registerSettingsAndCreateMenu("fas fa-eye-slash");
    WorkbenchRemindersSettings.registerSettingsAndCreateMenu("fas fa-bell");
    WorkbenchQolWorldSettings.registerSettingsAndCreateMenu("fas fa-smile");
    WorkbenchWorldAutomationSettings.registerSettingsAndCreateMenu("fas fa-robot");
    WorkbenchClientAutomationSettings.registerSettingsAndCreateMenu("fas fa-magic", false);
    WorkbenchVariantRulesSettings.registerSettingsAndCreateMenu("fas fa-alt");
    WorkbenchHouseRulesSettings.registerSettingsAndCreateMenu("fas fa-house");

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
        onChange: () => updateHooks(),
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
        onChange: () => updateHooks(),
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
        onChange: () => updateHooks(),
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
        onChange: () => updateHooks(),
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
        onChange: () => updateHooks(),
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
        onChange: () => updateHooks(),
    });

    game.settings.register(MODULENAME, "customPauseText", {
        name: `${MODULENAME}.SETTINGS.customPauseText.name`,
        hint: `${MODULENAME}.SETTINGS.customPauseText.hint`,
        scope: "world",
        config: true,
        default: "",
        type: String,
        onChange: () => updateHooks(),
    });

    game.settings.register(MODULENAME, "customPauseRelocation", {
        name: `${MODULENAME}.SETTINGS.customPauseRelocation.name`,
        hint: `${MODULENAME}.SETTINGS.customPauseRelocation.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => updateHooks(),
    });

    game.settings.register(MODULENAME, "logLevel", {
        name: `${MODULENAME}.SETTINGS.logLevel.name`,
        hint: `${MODULENAME}.SETTINGS.logLevel.hint`,
        scope: "client",
        config: true,
        default: 2,
        type: Number,
        choices: {
            0: game.i18n.localize(`${MODULENAME}.SETTINGS.logLevel.trace`),
            1: game.i18n.localize(`${MODULENAME}.SETTINGS.logLevel.debug`),
            2: game.i18n.localize(`${MODULENAME}.SETTINGS.logLevel.info`),
            3: game.i18n.localize(`${MODULENAME}.SETTINGS.logLevel.warn`),
            4: game.i18n.localize(`${MODULENAME}.SETTINGS.logLevel.error`),
            5: game.i18n.localize(`${MODULENAME}.SETTINGS.logLevel.off`),
        },
        onChange: () => updateHooks(),
    });

    game.settings.register(MODULENAME, "bamActionsPerColumn", {
        name: `${MODULENAME}.macros.basicActionMacros.bamActionsPerColumn.name`,
        hint: `${MODULENAME}.macros.basicActionMacros.bamActionsPerColumn.hint`,
        scope: "client",
        config: true,
        default: 14,
        type: Number,
        onChange: () => updateHooks(),
    });

    game.settings.register(MODULENAME, "dirtySortActions", {
        name: `${MODULENAME}.SETTINGS.dirtySortActions.name`,
        hint: `${MODULENAME}.SETTINGS.dirtySortActions.hint`,
        scope: "client",
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
        onChange: () => updateHooks(),
    });
}
