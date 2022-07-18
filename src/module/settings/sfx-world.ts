import { MODULENAME } from "../xdy-pf2e-workbench";
import { debouncedReload } from "./index";
import { SettingsMenuPF2eWorkbench } from "./menu";

export class WorkbenchSfxWorldSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "sfxWorldSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        const default_jb2a_path = game.modules.get("jb2a_patreon")?.active
            ? "modules/jb2a_patreon/"
            : "modules/JB2A_DnD5e/";
        return {
            automatedAnimationOn: {
                name: `${MODULENAME}.SETTINGS.automatedAnimationOn.name`,
                hint: `${MODULENAME}.SETTINGS.automatedAnimationOn.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            automatedAnimationOnFailAnimation: {
                name: `${MODULENAME}.SETTINGS.automatedAnimationOnFailAnimation.name`,
                hint: `${MODULENAME}.SETTINGS.automatedAnimationOnFailAnimation.hint`,
                scope: "world",
                config: true,
                default: default_jb2a_path + "Library/Generic/UI/Miss_02_White_200x200.webm",
                type: String,
                filePicker: "video",
                onChange: () => debouncedReload(),
            },
            automatedAnimationOnFailSound: {
                name: `${MODULENAME}.SETTINGS.automatedAnimationOnFailSound.name`,
                hint: `${MODULENAME}.SETTINGS.automatedAnimationOnFailSound.hint`,
                scope: "world",
                config: true,
                default: "modules/soundfxlibrary/Combat/Single/Melee%20Miss/melee-miss-1.mp3",
                type: String,
                filePicker: "audio",
                onChange: () => debouncedReload(),
            },
            automatedAnimationOnCritFailAnimation: {
                name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailAnimation.name`,
                hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailAnimation.hint`,
                scope: "world",
                config: true,
                default: default_jb2a_path + "Library/Generic/UI/Miss_02_White_200x200.webm",
                type: String,
                filePicker: "video",
                onChange: () => debouncedReload(),
            },
            automatedAnimationOnCritFailSound: {
                name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailSound.name`,
                hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailSound.hint`,
                scope: "world",
                config: true,
                default: "modules/soundfxlibrary/Combat/Single/Melee%20Miss/melee-miss-1.mp3",
                type: String,
                filePicker: "audio",
                onChange: () => debouncedReload(),
            },
            automatedAnimationOnCritSuccessAnimation: {
                name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessAnimation.name`,
                hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessAnimation.hint`,
                scope: "world",
                config: true,
                default: default_jb2a_path + "Library/Generic/UI/Critical_02_Red_200x200.webm",
                type: String,
                filePicker: "video",
                onChange: () => debouncedReload(),
            },
            automatedAnimationOnCritSuccessSound: {
                name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessSound.name`,
                hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessSound.hint`,
                scope: "world",
                config: true,
                default: "modules/soundfxlibrary/Combat/Single/Melee%20Hit/melee-hit-13.mp3",
                type: String,
                filePicker: "audio",
                onChange: () => debouncedReload(),
            },
            automatedAnimationOnSuccessAnimation: {
                name: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessAnimation.name`,
                hint: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessAnimation.hint`,
                scope: "world",
                config: true,
                default: default_jb2a_path + "Library/Generic/Impact/Impact_01_Regular_Blue_400x400.webm",
                type: String,
                filePicker: "video",
                onChange: () => debouncedReload(),
            },
            automatedAnimationOnSuccessSound: {
                name: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessSound.name`,
                hint: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessSound.hint`,
                scope: "world",
                config: true,
                default: "modules/soundfxlibrary/Combat/Single/Melee%20Hit/melee-hit-1.mp3",
                type: String,
                filePicker: "audio",
                onChange: () => debouncedReload(),
            },
            automatedAnimationMissOffTarget: {
                name: `${MODULENAME}.SETTINGS.automatedAnimationMissOffTarget.name`,
                hint: `${MODULENAME}.SETTINGS.automatedAnimationMissOffTarget.hint`,
                scope: "world",
                config: true,
                default: true,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
        };
    }
}
