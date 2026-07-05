import { getModuleSetting, housepatcher } from "../utils.ts";

export async function pf2eSystemReadyHook(): Promise<void> {
    const housepatcherSetting = getModuleSetting("housepatcher");
    if (game.user.isGM && housepatcherSetting) {
        await housepatcher(housepatcherSetting);
    }
}
