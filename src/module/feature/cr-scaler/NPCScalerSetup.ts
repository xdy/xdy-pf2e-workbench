/*
 * Copyright 2021 Andrew Cuccinello, 2022 Jonas Karlsson
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { scaleNPCToLevel } from "./NPCScaler.js";
import { ActorDirectoryPF2e } from "foundry-pf2e";
import { ContextMenuEntry } from "foundry/client/applications/ux/context-menu.mts";

function condition(li: HTMLElement): boolean {
    return li.dataset.entryId !== undefined && (game.actors.get(li.dataset.entryId)?.isOfType("npc") ?? false);
}

function callback(li: HTMLElement) {
    const actor = game.actors.get(li.dataset.entryId, { strict: true });
    const oldLevel = actor.level;
    if (!actor.isOfType("npc")) return;

    new foundry.applications.api.DialogV2({
        window: { title: "Scale NPC" },
        content: `
            <p>Scale a creature to a range of levels, creating the creature at each level in the range. The min level must be less than or
            equal to the max level. To only scale to a single level, set both equal to the desired level.</p>
            <div class="form-group"><label>Min Level</label><input id="startLevel" type="number" value="${oldLevel}" min="-1" max="24"></div>
            <div class="form-group"><label>Max Level</label><input id="endLevel" type="number" value="${oldLevel}" min="-1" max="24"></div>`,
        buttons: [
            {
                action: "scale",
                default: true,
                icon: '<i class="fa-solid fa-level-up-alt"></i>',
                label: "Scale",
                callback: async (
                    _event: PointerEvent | SubmitEvent,
                    button: HTMLButtonElement,
                    _dialog: HTMLDialogElement,
                ) => {
                    ui.notifications.info(`Scaling NPC... please wait.`);
                    const elements = button.form?.elements as HTMLFormControlsCollection & {
                        startLevel: HTMLInputElement;
                        endLevel: HTMLInputElement;
                    };
                    const startLevel = parseInt(elements.startLevel.value);
                    const endLevel = parseInt(elements.endLevel.value);

                    for (let i = startLevel; i <= endLevel; i++) {
                        await scaleNPCToLevel(actor, i);
                    }
                    ui.notifications.info(`Scaled ${actor.name} to levels ${startLevel} - ${endLevel}.`);
                },
            },
        ],
    }).render({ force: true });
}

export function onScaleNPCContextHook(_actors: ActorDirectoryPF2e, menuItems: ContextMenuEntry[]) {
    if (!game.user.isGM) return;
    menuItems.push({
        name: "Scale to Level",
        icon: '<i class="fa-solid fa-level-up-alt"></i>',
        condition,
        callback,
    });
}

export function onScaleNPCContextHookV12(_html, buttons: any[]) {
    if (!game.user.isGM) return;
    buttons.push({
        name: "Scale to Level",
        icon: '<i class="fa-solid fa-level-up-alt"></i>',
        condition: (li: JQuery<HTMLLIElement>) => condition(li[0]),
        callback: (li: JQuery<HTMLLIElement>) => callback(li[0]),
    });
}
