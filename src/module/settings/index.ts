import { MODULENAME, updateHooks } from "../xdy-pf2e-workbench.js";
import { WorkbenchMystificationSettings } from "./mystification.js";
import { WorkbenchRemindersSettings } from "./reminders.js";
import { WorkbenchWorldAutomationSettings } from "./automation-world.js";
import { WorkbenchClientAutomationSettings } from "./automation-client.js";
import { WorkbenchQolWorldSettings } from "./qol-world.js";
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
                `${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.collapsedDefault`,
            ),
            nonCollapsedDefault: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.nonCollapsedDefault`,
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
                `${MODULENAME}.SETTINGS.autoCollapseItemActionChatCardContent.collapsedDefault`,
            ),
            nonCollapsedDefault: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoCollapseItemActionChatCardContent.nonCollapsedDefault`,
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
                `${MODULENAME}.SETTINGS.autoCollapseItemAttackChatCardContent.collapsedDefault`,
            ),
            nonCollapsedDefault: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoCollapseItemAttackChatCardContent.nonCollapsedDefault`,
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

    game.settings.register(MODULENAME, "basicActionMacroShowBestBonus", {
        name: `${MODULENAME}.macros.basicActionMacros.settings.showBestBonus.name`,
        hint: `${MODULENAME}.macros.basicActionMacros.settings.showBestBonus.hint`,
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "bamShowUnusable", {
        name: `${MODULENAME}.macros.basicActionMacros.bamShowUnusable.name`,
        hint: `${MODULENAME}.macros.basicActionMacros.bamShowUnusable.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => updateHooks(),
    });

    game.settings.register(MODULENAME, "bamTabview", {
        name: `${MODULENAME}.macros.basicActionMacros.bamTabview.name`,
        hint: `${MODULENAME}.macros.basicActionMacros.bamTabview.hint`,
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
        onChange: () => updateHooks(),
    });

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
