import { getModuleSetting } from "../utils.ts";
import { renderNameHud } from "../feature/tokenMystificationHandler/index.ts";

export function renderTokenHUDHook(app: { object?: unknown }, html: HTMLElement, _data: unknown): void {
    if (html && game.user?.isGM && getModuleSetting("npcMystifier")) {
        renderNameHud(app as { object?: unknown }, html);
    }
}
