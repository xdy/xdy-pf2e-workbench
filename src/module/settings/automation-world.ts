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
                    reaching0HPCharactersOnly: game.i18n.localize(
                        `${MODULENAME}.SETTINGS.enableAutomaticMove.reaching0HPCharactersOnly`
                    ),
                },
                onChange: () => debouncedReload(),
                requiresReload: true,
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
                requiresReload: true,
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
                requiresReload: true,
            },
            applyClumsyIfWieldingLargerWeapon: {
                name: `${MODULENAME}.SETTINGS.applyClumsyIfWieldingLargerWeapon.name`,
                hint: `${MODULENAME}.SETTINGS.applyClumsyIfWieldingLargerWeapon.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
                requiresReload: true,
            },
            applyEncumbranceBasedOnBulk: {
                name: `${MODULENAME}.SETTINGS.applyEncumbranceBasedOnBulk.name`,
                hint: `${MODULENAME}.SETTINGS.applyEncumbranceBasedOnBulk.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
                requiresReload: true,
            },
            autoReduceStunned: {
                name: `${MODULENAME}.SETTINGS.autoReduceStunned.name`,
                hint: `${MODULENAME}.SETTINGS.autoReduceStunned.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
                requiresReload: true,
            },
            giveUnconsciousIfDyingRemovedAt0HP: {
                name: `${MODULENAME}.SETTINGS.giveUnconsciousIfDyingRemovedAt0HP.name`,
                hint: `${MODULENAME}.SETTINGS.giveUnconsciousIfDyingRemovedAt0HP.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
                requiresReload: true,
            },
            autoRemoveUnconsciousAtGreaterThanZeroHP: {
                name: `${MODULENAME}.SETTINGS.autoRemoveUnconsciousAtGreaterThanZeroHP.name`,
                hint: `${MODULENAME}.SETTINGS.autoRemoveUnconsciousAtGreaterThanZeroHP.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
                requiresReload: true,
            },
            giveWoundedWhenDyingRemoved: {
                name: `${MODULENAME}.SETTINGS.giveWoundedWhenDyingRemoved.name`,
                hint: `${MODULENAME}.SETTINGS.giveWoundedWhenDyingRemoved.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
                requiresReload: true,
            },
            autoGainDyingAtZeroHP: {
                name: `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.name`,
                hint: `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.hint`,
                scope: "world",
                config: true,
                default: "none",
                type: String,
                choices: {
                    none: game.i18n.localize(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.no`),
                    addOne: game.i18n.localize(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.addOne`),
                    addWoundedLevel: game.i18n.localize(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.addWoundedLevel`),
                    addOneForCharacters: game.i18n.localize(
                        `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.addOneForCharacters`
                    ),
                    addWoundedLevelForCharacters: game.i18n.localize(
                        `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.addWoundedLevelForCharacters`
                    ),
                },
                onChange: () => debouncedReload(),
                requiresReload: true,
            },
            autoRemoveDyingAtGreaterThanZeroHP: {
                name: `${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.name`,
                hint: `${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.hint`,
                scope: "world",
                config: true,
                default: "none",
                type: String,
                choices: {
                    none: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.no`),
                    remove: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.removeDying`),
                    removeForCharacters: game.i18n.localize(
                        `${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.removeDyingForCharacters`
                    ),
                },
                onChange: () => debouncedReload(),
                requiresReload: true,
            },
        };
    }
}
