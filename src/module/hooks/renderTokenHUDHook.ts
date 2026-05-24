import { TokenDocumentPF2e } from "foundry-pf2e";
import { MODULENAME } from "../xdy-pf2e-workbench.js";
import { renderNameHud } from "../feature/tokenMystificationHandler/index.js";

export function renderTokenHUDHook(_app: TokenDocumentPF2e, html: HTMLElement, data): void {
    if (html && game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
        renderNameHud(data, html);
    }
}
