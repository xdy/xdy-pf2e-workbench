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
            expandedNewest: game.i18n.localize(`${MODULENAME}.SETTINGS.autoExpandDamageRolls.expandedNewest`),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "skillActions", {
        name: `${MODULENAME}.skillActions.Settings.Position.name`,
        hint: `${MODULENAME}.skillActions.Settings.Position.hint`,
        scope: "client",
        config: true,
        default: "disabled",
        type: String,
        choices: {
            bottom: game.i18n.localize(`${MODULENAME}.skillActions.Settings.Position.bottom`),
            disabled: game.i18n.localize(`${MODULENAME}.skillActions.Settings.Position.disabled`),
            top: game.i18n.localize(`${MODULENAME}.skillActions.Settings.Position.top`),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "workbenchVersion", {
        name: `${MODULENAME}.SETTINGS.workbenchVersion.name`,
        hint: `${MODULENAME}.SETTINGS.workbenchVersion.hint`,
        scope: "world",
        config: true,
        default: "3.34.0",
        type: String,
        onChange: () => debouncedReload(),
    });
}
