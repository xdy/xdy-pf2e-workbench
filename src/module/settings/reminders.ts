import { MODULENAME } from "../xdy-pf2e-workbench";
import { debouncedReload } from "./index";
import { SettingsMenuPF2eWorkbench } from "./menu";

export class WorkbenchRemindersSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "remindersSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            reminderCannotAttack: {
                name: `${MODULENAME}.SETTINGS.reminderCannotAttack.name`,
                hint: `${MODULENAME}.SETTINGS.reminderCannotAttack.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            reminderCannotAttackIgnoreDeadEidolon: {
                name: `${MODULENAME}.SETTINGS.reminderCannotAttackIgnoreDeadEidolon.name`,
                hint: `${MODULENAME}.SETTINGS.reminderCannotAttackIgnoreDeadEidolon.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            reminderIWR: {
                name: `${MODULENAME}.SETTINGS.reminderIWR.name`,
                hint: `${MODULENAME}.SETTINGS.reminderIWR.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            reminderTargeting: {
                name: `${MODULENAME}.SETTINGS.reminderTargeting.name`,
                hint: `${MODULENAME}.SETTINGS.reminderTargeting.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            actionsReminderAllow: {
                name: `${MODULENAME}.SETTINGS.actionsReminderAllow.name`,
                hint: `${MODULENAME}.SETTINGS.actionsReminderAllow.hint`,
                scope: "world",
                config: true,
                default: "none",
                type: String,
                choices: {
                    none: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.none`),
                    all: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.all`),
                    gm: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.gm`),
                    players: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.players`),
                },
                onChange: () => debouncedReload(),
            },
            reminderBreathWeapon: {
                name: `${MODULENAME}.SETTINGS.reminderBreathWeapon.name`,
                hint: `${MODULENAME}.SETTINGS.reminderBreathWeapon.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            heroPointHandler: {
                name: `${MODULENAME}.SETTINGS.heroPointHandler.name`,
                hint: `${MODULENAME}.SETTINGS.heroPointHandler.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            heroPointHandlerStartTimerOnReady: {
                name: `${MODULENAME}.SETTINGS.heroPointHandlerStartTimerOnReady.name`,
                hint: `${MODULENAME}.SETTINGS.heroPointHandlerStartTimerOnReady.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            heroPointHandlerDefaultTimeoutMinutes: {
                name: `${MODULENAME}.SETTINGS.heroPointHandlerDefaultTimeoutMinutes.name`,
                hint: `${MODULENAME}.SETTINGS.heroPointHandlerDefaultTimeoutMinutes.hint`,
                scope: "world",
                config: true,
                default: 60,
                type: Number,
                onChange: () => debouncedReload(),
            },
        };
    }
}
