import { MODULENAME } from "../xdy-pf2e-workbench";
import { SettingsMenuPF2eWorkbench } from "./menu";
import { debouncedReload } from "./index";

export class WorkbenchClientAutomationSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "automationClientSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            //NOTE Do NOT rename this without talking to Symon S, his macros for Spellstrike and Eldritch shot parse for workbench and its settings to avoid double rolling damage.
            autoRollDamageForStrike: {
                name: `${MODULENAME}.SETTINGS.autoRollDamageForStrike.name`,
                hint: `${MODULENAME}.SETTINGS.autoRollDamageForStrike.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            autoRollDamageForSpellAttack: {
                name: `${MODULENAME}.SETTINGS.autoRollDamageForSpellAttack.name`,
                hint: `${MODULENAME}.SETTINGS.autoRollDamageForSpellAttack.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            autoRollDamageForSpellNotAnAttack: {
                name: `${MODULENAME}.SETTINGS.autoRollDamageForSpellNotAnAttack.name`,
                hint: `${MODULENAME}.SETTINGS.autoRollDamageForSpellNotAnAttack.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            autoRollDamageNotifyOnSpellCardNotFound: {
                name: `${MODULENAME}.SETTINGS.autoRollDamageNotifyOnSpellCardNotFound.name`,
                hint: `${MODULENAME}.SETTINGS.autoRollDamageNotifyOnSpellCardNotFound.hint`,
                scope: "client",
                config: true,
                default: true,
                type: Boolean,
            },
            applyPersistentDamage: {
                name: `${MODULENAME}.SETTINGS.applyPersistentDamage.name`,
                hint: `${MODULENAME}.SETTINGS.applyPersistentDamage.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            applyPersistentDamageSeparateMessage: {
                name: `${MODULENAME}.SETTINGS.applyPersistentDamageSeparateMessage.name`,
                hint: `${MODULENAME}.SETTINGS.applyPersistentDamageSeparateMessage.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
            },
            applyPersistentHealing: {
                name: `${MODULENAME}.SETTINGS.applyPersistentHealing.name`,
                hint: `${MODULENAME}.SETTINGS.applyPersistentHealing.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            applyPersistentHealingSeparateMessage: {
                name: `${MODULENAME}.SETTINGS.applyPersistentHealingSeparateMessage.name`,
                hint: `${MODULENAME}.SETTINGS.applyPersistentHealingSeparateMessage.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
            },
            giveUnconsciousIfDyingRemovedAt0HP: {
                name: `${MODULENAME}.SETTINGS.giveUnconsciousIfDyingRemovedAt0HP.name`,
                hint: `${MODULENAME}.SETTINGS.giveUnconsciousIfDyingRemovedAt0HP.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            autoRemoveUnconsciousAtGreaterThanZeroHP: {
                name: `${MODULENAME}.SETTINGS.autoRemoveUnconsciousAtGreaterThanZeroHP.name`,
                hint: `${MODULENAME}.SETTINGS.autoRemoveUnconsciousAtGreaterThanZeroHP.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            giveWoundedWhenDyingRemoved: {
                name: `${MODULENAME}.SETTINGS.giveWoundedWhenDyingRemoved.name`,
                hint: `${MODULENAME}.SETTINGS.giveWoundedWhenDyingRemoved.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            autoGainDyingAtZeroHP: {
                name: `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.name`,
                hint: `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.hint`,
                scope: "client",
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
            },
            autoRemoveDyingAtGreaterThanZeroHP: {
                name: `${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.name`,
                hint: `${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.hint`,
                scope: "client",
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
            },
            decreaseFrightenedConditionEachTurn: {
                name: `${MODULENAME}.SETTINGS.decreaseFrightenedConditionEachTurn.name`,
                hint: `${MODULENAME}.SETTINGS.decreaseFrightenedConditionEachTurn.hint`,
                scope: "client",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
        };
    }
}
