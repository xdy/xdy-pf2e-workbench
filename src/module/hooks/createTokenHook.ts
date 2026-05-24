import { TokenDocumentPF2e } from "foundry-pf2e";
import { MODULENAME, NPC_TYPE } from "../xdy-pf2e-workbench.js";
import * as systems from "../utils/systems.js";
import { handleAsync } from "../utils.js";
import { tokenCreateMystification } from "../feature/tokenMystificationHandler/index.js";
import { mystifyNpcItems } from "../feature/qolHandler/index.js";

export async function createTokenHook(token: TokenDocumentPF2e, ..._args: unknown[]): Promise<void> {
    if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
        handleAsync(tokenCreateMystification(token), "tokenCreateMystification");
    }

    if (
        game.user?.isGM &&
        systems.getSystemSetting<boolean>("automation", "lootableNPCs") &&
        String(game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems")) === "onScene" &&
        token.actor &&
        token.actor.isOfType(NPC_TYPE) &&
        token.actor.items &&
        token.actor.items.size > 0
    ) {
        await mystifyNpcItems(token.actor);
    }
}
