import { ActorSystemData, CreaturePF2e } from "foundry-pf2e";
import { NPC_TYPE } from "../xdy-pf2e-workbench.ts";
import { getModuleSetting } from "../utils.ts";
import * as systems from "../utils/systems.ts";
import { dyingHandlingPreUpdateActorHook } from "../feature/damageHandler/dyingHandling.ts";
import { mystifyNpcItemsByRarity } from "../feature/qolHandler/index.ts";

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
            getModuleSetting<string>("npcMystifyAllPhysicalMagicalItems") === "onZeroHp"
        ) {
            await mystifyNpcItemsByRarity(actor);
        }

        const autoGainDying = getModuleSetting<string>("autoGainDyingAtZeroHP");
        dyingHandlingPreUpdateActorHook(actor, update, currentActorHp, updateHp, autoGainDying);
    }
}
