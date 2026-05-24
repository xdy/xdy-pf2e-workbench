import { MODULENAME } from "../xdy-pf2e-workbench.js";
import { housepatcher } from "../utils.js";

export async function pf2eSystemReadyHook(): Promise<void> {
    const housepatcherSetting = game.settings.get(MODULENAME, "housepatcher");
    if (game.user.isGM && housepatcherSetting) {
        await housepatcher(housepatcherSetting);
    }
}
