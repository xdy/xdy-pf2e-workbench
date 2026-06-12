import { MODULENAME, updateHooks } from "../xdy-pf2e-workbench.js";
import { SettingsMenuPF2eWorkbench } from "./menu.js";
import { SettingRegistration } from "foundry/client/helpers/client-settings.mts";

export class WorkbenchCanvasFeaturesSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "canvasFeaturesSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            canvasPointer: {
                name: `${MODULENAME}.SETTINGS.canvasPointer.name`,
                hint: `${MODULENAME}.SETTINGS.canvasPointer.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
            },
            canvasPointerIcon: {
                name: `${MODULENAME}.SETTINGS.canvasPointerIcon.name`,
                hint: `${MODULENAME}.SETTINGS.canvasPointerIcon.hint`,
                scope: "world",
                config: true,
                default: "fa-regular fa-hand-point-down",
                type: String,
            },
            canvasPointerBroadcastInterval: {
                name: `${MODULENAME}.SETTINGS.canvasPointerBroadcastInterval.name`,
                hint: `${MODULENAME}.SETTINGS.canvasPointerBroadcastInterval.hint`,
                scope: "world",
                config: true,
                default: 10,
                type: Number,
                // @ts-expect-error TODO Fix typing
                range: { min: 1, max: 1000, step: 1 },
            },
            canvasPointerPingMode: {
                name: `${MODULENAME}.SETTINGS.canvasPointerPingMode.name`,
                hint: `${MODULENAME}.SETTINGS.canvasPointerPingMode.hint`,
                scope: "world",
                config: true,
                default: "none",
                type: String,
                choices: {
                    none: game.i18n.localize(`${MODULENAME}.SETTINGS.canvasPointerPingMode.none`),
                    visual: game.i18n.localize(`${MODULENAME}.SETTINGS.canvasPointerPingMode.visual`),
                    sound: game.i18n.localize(`${MODULENAME}.SETTINGS.canvasPointerPingMode.sound`),
                    visualAndSound: game.i18n.localize(`${MODULENAME}.SETTINGS.canvasPointerPingMode.visualAndSound`),
                },
            },
            canvasPointerPingSound: {
                name: `${MODULENAME}.SETTINGS.canvasPointerPingSound.name`,
                hint: `${MODULENAME}.SETTINGS.canvasPointerPingSound.hint`,
                scope: "world",
                config: true,
                default: "",
                type: String,
                // @ts-expect-error - filePicker property not yet in foundry-pf2e types
                filePicker: "audio",
            },
            canvasPointerPingVolume: {
                name: `${MODULENAME}.SETTINGS.canvasPointerPingVolume.name`,
                hint: `${MODULENAME}.SETTINGS.canvasPointerPingVolume.hint`,
                scope: "client",
                config: true,
                default: 0.2,
                type: Number,
                // @ts-expect-error TODO Fix typing
                range: { min: 0, max: 1, step: 0.1 },
            },
            tokenAnimation: {
                name: `${MODULENAME}.SETTINGS.tokenAnimation.name`,
                hint: `${MODULENAME}.SETTINGS.tokenAnimation.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            tokenAnimationSpeed: {
                name: `${MODULENAME}.SETTINGS.tokenAnimationSpeed.name`,
                hint: `${MODULENAME}.SETTINGS.tokenAnimationSpeed.hint`,
                scope: "world",
                config: true,
                default: 6,
                type: Number,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            customPauseImage: {
                name: `${MODULENAME}.SETTINGS.customPauseImage.name`,
                hint: `${MODULENAME}.SETTINGS.customPauseImage.hint`,
                scope: "world",
                config: true,
                default: "",
                type: String,
                // @ts-expect-error - filePicker property not yet in foundry-pf2e types
                filePicker: "imagevideo",
                onChange: () => updateHooks(),
            },
            customPauseText: {
                name: `${MODULENAME}.SETTINGS.customPauseText.name`,
                hint: `${MODULENAME}.SETTINGS.customPauseText.hint`,
                scope: "world",
                config: true,
                default: "",
                type: String,
                onChange: () => updateHooks(),
            },
            pauseImageNoSpin: {
                name: `${MODULENAME}.SETTINGS.pauseImageNoSpin.name`,
                hint: `${MODULENAME}.SETTINGS.pauseImageNoSpin.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
            },
        };
    }
}
