import { MODULENAME, updateHooks } from "../xdy-pf2e-workbench";
import { SettingsMenuPF2eWorkbench } from "./menu";

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
                onChange: () => updateHooks(),
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
                onChange: () => updateHooks(),
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
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            applyEncumbranceBasedOnBulk: {
                name: `${MODULENAME}.SETTINGS.applyEncumbranceBasedOnBulk.name`,
                hint: `${MODULENAME}.SETTINGS.applyEncumbranceBasedOnBulk.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            autoReduceStunned: {
                name: `${MODULENAME}.SETTINGS.autoReduceStunned.name`,
                hint: `${MODULENAME}.SETTINGS.autoReduceStunned.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            giveUnconsciousIfDyingRemovedAt0HP: {
                name: `${MODULENAME}.SETTINGS.giveUnconsciousIfDyingRemovedAt0HP.name`,
                hint: `${MODULENAME}.SETTINGS.giveUnconsciousIfDyingRemovedAt0HP.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            autoRemoveUnconsciousAtGreaterThanZeroHP: {
                name: `${MODULENAME}.SETTINGS.autoRemoveUnconsciousAtGreaterThanZeroHP.name`,
                hint: `${MODULENAME}.SETTINGS.autoRemoveUnconsciousAtGreaterThanZeroHP.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            giveWoundedWhenDyingRemoved: {
                name: `${MODULENAME}.SETTINGS.giveWoundedWhenDyingRemoved.name`,
                hint: `${MODULENAME}.SETTINGS.giveWoundedWhenDyingRemoved.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            autoGainDyingAtZeroHP: {
                name: `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.name`,
                hint: `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.hint`,
                scope: "world",
                config: true,
                default: "no",
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
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            autoGainDyingAtZeroHPIfCriticallyHitOneMore: {
                name: `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHPIfCriticallyHitOneMore.name`,
                hint: `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHPIfCriticallyHitOneMore.hint`,
                scope: "world",
                config: true,
                default: "no",
                type: String,
                choices: {
                    none: game.i18n.localize(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHPIfCriticallyHitOneMore.no`),
                    add: game.i18n.localize(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHPIfCriticallyHitOneMore.add`),
                    addForCharacters: game.i18n.localize(
                        `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHPIfCriticallyHitOneMore.addForCharacters`
                    ),
                },
            },
            autoGainDyingIfTakingDamageWhenAlreadyDying: {
                name: `${MODULENAME}.SETTINGS.autoGainDyingIfTakingDamageWhenAlreadyDying.name`,
                hint: `${MODULENAME}.SETTINGS.autoGainDyingIfTakingDamageWhenAlreadyDying.hint`,
                scope: "world",
                config: true,
                default: "no",
                type: String,
                choices: {
                    none: game.i18n.localize(`${MODULENAME}.SETTINGS.autoGainDyingIfTakingDamageWhenAlreadyDying.no`),
                    add: game.i18n.localize(`${MODULENAME}.SETTINGS.autoGainDyingIfTakingDamageWhenAlreadyDying.add`),
                    addForCharacters: game.i18n.localize(
                        `${MODULENAME}.SETTINGS.autoGainDyingIfTakingDamageWhenAlreadyDying.addForCharacters`
                    ),
                },
            },
            autoRemoveDyingAtGreaterThanZeroHP: {
                name: `${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.name`,
                hint: `${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.hint`,
                scope: "world",
                config: true,
                default: "no",
                type: String,
                choices: {
                    none: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.no`),
                    remove: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.removeDying`),
                    removeForCharacters: game.i18n.localize(
                        `${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.removeDyingForCharacters`
                    ),
                },
                onChange: () => updateHooks(),
                requiresReload: true,
            },
        };
    }
}
