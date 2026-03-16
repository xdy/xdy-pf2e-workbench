import { PartialSettingsData, SettingsMenuPF2eWorkbench } from "../../settings/menu.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";

export function toggleSettings(_html: HTMLElement) {
    const settings: [string, any][] = Array.from(game.settings.settings.entries());
    settings.forEach((_setting: [string, any]) => {
        // None right now
    });
}

function setFormGroupVisibility(html: HTMLElement, selector: string, visible: boolean) {
    const el = html.querySelector<HTMLElement>(selector)?.closest<HTMLElement>(".form-group");
    if (el) el.style.display = visible ? "" : "none";
}

export function toggleMenuSettings(html: HTMLElement, settings: SettingsMenuPF2eWorkbench) {
    for (const key in settings["settings"]) {
        const settingElement: PartialSettingsData = settings["settings"][key];
        if (settingElement && settingElement["key"]) {
            const settingName = settingElement["key"];

            // // Disable all dependent actionsReminder settings
            // if (settingName !== `actionsReminderAllow` && settingName.startsWith(`actionsReminder`)) {
            //     const applyToggle = !(
            //         game.settings.get(MODULENAME, "actionsReminderAllow") === "none" ||
            //         (game.user?.isGM
            //             ? game.settings.get(MODULENAME, "actionsReminderAllow") === "players"
            //             : game.settings.get(MODULENAME, "actionsReminderAllow") === "gm")
            //     );
            //     html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
            // }
            //
            // // Disable all dependent npcMystifier settings
            // if (settingName !== `npcMystifier` && settingName.startsWith(`npcMystifier`)) {
            //     const valueFunction = !game.settings.get(MODULENAME, "npcMystifier");
            //
            //     html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            //     html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            // }

            if (settingName !== `handleDyingRecoveryRollAllow` && settingName.startsWith("handleDyingRecoveryRoll")) {
                const applyToggle = !(
                    game.settings.get(MODULENAME, "handleDyingRecoveryRollAllow") === "none" ||
                    (game.user?.isGM
                        ? game.settings.get(MODULENAME, "handleDyingRecoveryRollAllow") === "players"
                        : game.settings.get(MODULENAME, "handleDyingRecoveryRollAllow") === "gm")
                );
                setFormGroupVisibility(html, `input[name="${settingName}"]`, applyToggle);
            }
            if (settingName !== `autoRollDamageAllow` && settingName.startsWith(`autoRollDamage`)) {
                // const valueFunction = game.settings.get(MODULENAME, "autoRollDamage") === "none";
                const applyToggle = !(
                    game.settings.get(MODULENAME, "autoRollDamageAllow") === "none" ||
                    (game.user?.isGM
                        ? game.settings.get(MODULENAME, "autoRollDamageAllow") === "players"
                        : game.settings.get(MODULENAME, "autoRollDamageAllow") === "gm")
                );

                setFormGroupVisibility(html, `input[name="${settingName}"]`, applyToggle);
                setFormGroupVisibility(html, `select[name="${settingName}"]`, applyToggle);
            }

            // if (settingName !== `reminderCannotAttack` && settingName.startsWith(`reminderCannotAttack`)) {
            //     const valueFunction = !game.settings.get(MODULENAME, "reminderCannotAttack");
            //
            //     html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            //     html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            // }
            //
            // if (settingName !== `heroPointHandler` && settingName.startsWith(`heroPointHandler`)) {
            //     const valueFunction = !game.settings.get(MODULENAME, "heroPointHandler");
            //
            //     html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            //     html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            // }
            //
            // if (settingName !== `castPrivateSpell` && settingName.startsWith(`castPrivateSpell`)) {
            //     const valueFunction = !game.settings.get(MODULENAME, "castPrivateSpell");
            //
            //     html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            //     html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            // }
            //
            // if (settingName !== `tokenAnimation` && settingName.startsWith(`tokenAnimation`)) {
            //     const valueFunction = !game.settings.get(MODULENAME, "tokenAnimation");
            //
            //     html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            //     html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            // }
        }
    }
}
