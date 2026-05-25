import { ActorSystemData, CreaturePF2e } from "foundry-pf2e";
import { MODULENAME, NPC_TYPE } from "../xdy-pf2e-workbench.js";
import * as systems from "../utils/systems.js";
import { dyingHandlingPreUpdateActorHook } from "../feature/damageHandler/dyingHandling.js";
import { mystifyNpcItemsByRarity } from "../feature/qolHandler/index.js";

export async function preUpdateActorHook(actor: CreaturePF2e, update: Record<string, string>): Promise<void> {
    const updateHp = fu.getProperty(update, "system.attributes.hp.value");

    // All these are only relevant if hp has changed (it's undefined otherwise)
    if (typeof updateHp === "number") {
        const currentActorHp = (<ActorSystemData>actor.system).attributes.hp?.value || 0;
        if (
            game.user?.isGM &&
            actor?.type === NPC_TYPE &&
            actor?.items?.size > 0 &&
            currentActorHp > 0 &&
            updateHp <= 0 &&
            systems.getSystemSetting<boolean>("automation", "lootableNPCs") &&
            String(game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItems")) === "onZeroHp"
        ) {
            await mystifyNpcItemsByRarity(actor);
        }

        const autoGainDying = String(game.settings.get(MODULENAME, "autoGainDyingAtZeroHP"));
        dyingHandlingPreUpdateActorHook(actor, update, currentActorHp, updateHp, autoGainDying);
    }
}
