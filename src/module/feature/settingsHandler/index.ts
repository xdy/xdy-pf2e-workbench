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
                const applyToggle = !(
                    game.settings.get(MODULENAME, "autoRollDamageAllow") === "none" ||
                    (game.user?.isGM
                        ? game.settings.get(MODULENAME, "autoRollDamageAllow") === "players"
                        : game.settings.get(MODULENAME, "autoRollDamageAllow") === "gm")
                );

                setFormGroupVisibility(html, `input[name="${settingName}"]`, applyToggle);
                setFormGroupVisibility(html, `select[name="${settingName}"]`, applyToggle);
            }
        }
    }
}
