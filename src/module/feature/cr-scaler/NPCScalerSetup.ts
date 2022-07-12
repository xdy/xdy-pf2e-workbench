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

import { scaleNPCToLevel } from "./NPCScaler";
import { NPCPF2e } from "@actor";

export const setupNPCScaler = () => Hooks.on("getActorDirectoryEntryContext", onScaleNPCContextHook);

function onScaleNPCContextHook(html: JQuery, buttons: any[]) {
    if (game.user?.isGM) {
        buttons.unshift({
            name: "Scale to Level",
            icon: '<i class="fas fa-level-up-alt"></i>',
            condition: (li: JQuery<HTMLLIElement>) => {
                const id = li.data("document-id") as string;
                const actor = game.actors?.get(id) as Actor;

                return actor.data.type === "npc";
            },
            callback: async (li: JQuery<HTMLLIElement>) => {
                const id = li.data("document-id") as string;
                const actor = game.actors?.get(id) as NPCPF2e;

                // const oldLevel = actor.data.data.details.level.value;
                const oldLevel = 24;

                const d = new Dialog({
                    title: "Scale NPC",
                    content:
                        `<p>Scale a creature to a range of levels, creating the creature at each level in the range. The min level must be less than or ` +
                        `equal to the max level. To only scale to a single level, set both equal to the desired level.</p>` +
                        `<div class="form-group"><label>Min Level</label><input id="startLevel" type="number" value="${oldLevel}" min="-1" max="24"></div>` +
                        `<div class="form-group"><label>Max Level</label><input id="endLevel" type="number" value="${oldLevel}" min="-1" max="24"></div>`,
                    buttons: {
                        scale: {
                            icon: '<i class="fas fa-level-up-alt"></i>',
                            label: "Scale",
                            callback: async (html: JQuery) => {
                                ui.notifications?.info(`Scaling NPC... please wait.`);
                                const startLevel = parseInt(<string>html.find("#startLevel").val());
                                const endLevel = parseInt(<string>html.find("#endLevel").val());

                                for (let i = startLevel; i <= endLevel; i++) {
                                    await scaleNPCToLevel(actor, i);
                                }
                                ui.notifications?.info(`Scaled ${actor.name} to levels ${startLevel} - ${endLevel}.`);
                            },
                        },
                    },
                    default: "scale",
                });
                d.render(true);
            },
        });
    }
}
