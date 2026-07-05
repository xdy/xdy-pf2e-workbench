import { TokenDocumentPF2e } from "foundry-pf2e";
import { NPC_TYPE } from "../xdy-pf2e-workbench.ts";

import * as systems from "../utils/systems.ts";
import { fireAndForget, getModuleSetting } from "../utils.ts";
import { tokenCreateMystification } from "../feature/tokenMystificationHandler/index.ts";
import { mystifyNpcItemsByRarity } from "../feature/qolHandler/index.ts";

export async function createTokenHook(token: TokenDocumentPF2e, ..._args: unknown[]): Promise<void> {
    if (game.user?.isGM && getModuleSetting("npcMystifier")) {
        fireAndForget(tokenCreateMystification(token), "tokenCreateMystification");
    }

    if (
        game.user?.isGM &&
        systems.getSystemSetting<boolean>("automation", "lootableNPCs") &&
        getModuleSetting<string>("npcMystifyAllPhysicalMagicalItems") === "onScene" &&
        token.actor &&
        token.actor.isOfType(NPC_TYPE) &&
        token.actor.items &&
        token.actor.items.size > 0
    ) {
        await mystifyNpcItemsByRarity(token.actor);
    }
}
