import { MODULENAME } from "../xdy-pf2e-workbench";
import { SettingsMenuPF2eWorkbench } from "./menu";
import { debouncedReload } from "./index";

export class WorkbenchWorldAutomationSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "automationWorldSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            enableAutomaticMove: {
                name: `${MODULENAME}.SETTINGS.enableAutomaticMove.name`,
                hint: `${MODULENAME}.SETTINGS.enableAutomaticMove.hint`,
                scope: "world",
                config: true,
                default: "noAutomation",
                type: String,
                choices: {
                    noAutomation: game.i18n.localize(`${MODULENAME}.SETTINGS.enableAutomaticMove.noAutomation`),
                    reaching0HP: game.i18n.localize(`${MODULENAME}.SETTINGS.enableAutomaticMove.reaching0HP`),
                },
                onChange: () => debouncedReload(),
            },
            autoRollDamageAllow: {
                name: `${MODULENAME}.SETTINGS.autoRollDamageAllow.name`,
                hint: `${MODULENAME}.SETTINGS.autoRollDamageAllow.hint`,
                scope: "world",
                config: true,
                default: "none",
                type: String,
                choices: {
                    none: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRollDamageAllow.none`),
                    all: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRollDamageAllow.all`),
                    gm: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRollDamageAllow.gm`),
                    players: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRollDamageAllow.players`),
                },
                onChange: () => debouncedReload(),
            },
            applyPersistentAllow: {
                name: `${MODULENAME}.SETTINGS.applyPersistentAllow.name`,
                hint: `${MODULENAME}.SETTINGS.applyPersistentAllow.hint`,
                scope: "world",
                config: true,
                default: "none",
                type: String,
                choices: {
                    none: game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentAllow.none`),
                    all: game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentAllow.all`),
                    gm: game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentAllow.gm`),
                    players: game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentAllow.players`),
                },
                onChange: () => debouncedReload(),
            },
            applyEncumbranceBasedOnBulk: {
                name: `${MODULENAME}.SETTINGS.applyEncumbranceBasedOnBulk.name`,
                hint: `${MODULENAME}.SETTINGS.applyEncumbranceBasedOnBulk.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            autoReduceStunned: {
                name: `${MODULENAME}.SETTINGS.autoReduceStunned.name`,
                hint: `${MODULENAME}.SETTINGS.autoReduceStunned.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
        };
    }
}
