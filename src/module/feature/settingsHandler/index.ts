import type { MenuTemplateData } from "../../settings/menu.ts";
import { getModuleSetting } from "../../utils.ts";
import { isAllowedFor } from "../../utils/settings.ts";

function setFormGroupVisibility(html: HTMLElement, selector: string, visible: boolean) {
    const el = html.querySelector<HTMLElement>(selector)?.closest<HTMLElement>(".form-group");
    if (el) el.classList.toggle("hidden", !visible);
}

function visibleByRole(allowSettingKey: string): boolean {
    return isAllowedFor(allowSettingKey, game.user?.isGM ? "gm" : "player");
}

export function toggleMenuSettings(html: HTMLElement, settings: MenuTemplateData): void {
    for (const settingElement of settings.settings) {
        if (settingElement) {
            const settingName = settingElement.key;

            if (settingName !== `handleDyingRecoveryRollAllow` && settingName.startsWith("handleDyingRecoveryRoll")) {
                const applyToggle = visibleByRole("handleDyingRecoveryRollAllow");
                setFormGroupVisibility(html, `input[name="${settingName}"]`, applyToggle);
            }
            if (settingName !== `autoRollDamageAllow` && settingName.startsWith(`autoRollDamage`)) {
                const applyToggle = visibleByRole("autoRollDamageAllow");
                setFormGroupVisibility(html, `input[name="${settingName}"]`, applyToggle);
                setFormGroupVisibility(html, `select[name="${settingName}"]`, applyToggle);
            }
        }
    }

    const pingMode = getModuleSetting<string>("canvasPointerPingMode");
    const showSoundSettings = pingMode === "sound" || pingMode === "visualAndSound";
    setFormGroupVisibility(html, `[name="canvasPointerPingSound"]`, showSoundSettings);
    setFormGroupVisibility(html, `[name="canvasPointerPingVolume"]`, showSoundSettings);

    const pingModeSelect = html.querySelector<HTMLSelectElement>(`[name="canvasPointerPingMode"]`);
    if (pingModeSelect && !pingModeSelect.dataset.pingListenerAttached) {
        pingModeSelect.dataset.pingListenerAttached = "true";
        pingModeSelect.addEventListener("change", () => {
            const mode = pingModeSelect.value;
            const showSettings = mode === "sound" || mode === "visualAndSound";
            setFormGroupVisibility(html, `[name="canvasPointerPingSound"]`, showSettings);
            setFormGroupVisibility(html, `[name="canvasPointerPingVolume"]`, showSettings);
        });
    }
}
