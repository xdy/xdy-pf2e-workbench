import { scaleNPCToLevel } from "../cr-scaler/NPCScaler.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { NPCPF2e } from "foundry-pf2e";

export async function npcScaler() {
    const controlled = canvas.tokens.controlled.flatMap((token) => token.actor ?? []);
    if (controlled.length === 0 && game.user.character) controlled.push(game.user.character);
    const actor = <NPCPF2e>controlled[0];

    const supportedActorTypes = ["npc"];
    if (!actor || !supportedActorTypes.includes(actor.type)) {
        ui.notifications.warn(game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.noActorSelected`));
        return;
    }

    // const oldLevel = actor.system.details.level.value;
    const oldLevel = 24;

    await foundry.applications.api.DialogV2.wait({
        window: {
            title: "Scale NPC",
        },
        content:
            `<p>Scale a creature to a range of levels, creating the creature at each level in the range. The min level must be less than or ` +
            `equal to the max level. To only scale to a single level, set both equal to the desired level.</p>` +
            `<div class="form-group"><label>Min Level</label><input id="startLevel" name="startLevel" type="number" value="${oldLevel}" min="-1" max="24"></div>` +
            `<div class="form-group"><label>Max Level</label><input id="endLevel" name="endLevel" type="number" value="${oldLevel}" min="-1" max="24"></div>`,
        buttons: [
            {
                icon: '<i class="fa-solid fa-level-up-alt"></i>',
                label: "Scale",
                action: "scale",
                default: true,
                callback: async (_event, button, _dialog) => {
                    ui.notifications?.info(`Scaling NPC... please wait.`);
                    const startLevel = parseInt(button?.form?.elements["startLevel"].value);
                    const endLevel = parseInt(button?.form?.elements["endLevel"].value);

                    for (let i = startLevel; i <= endLevel; i++) {
                        await scaleNPCToLevel(actor, i);
                    }
                    ui.notifications?.info(`Scaled ${actor.name} to levels ${startLevel} - ${endLevel}.`);
                },
            },
        ],
    });
}

// npcScaler();
