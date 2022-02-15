/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

//TODO Start using the actual pf2e types
//TODO Make it so holding shift pops up a dialog where one can change the name
//TODO Add an option to have the 'demystify' button post a message to chat/pop up a dialog that does that, with demystification details (e.g. pretty much the recall knowledge macro), with the chat button doing the actual demystification.
//TODO Make the button post a chat message with a properly set up roll that players can click, as well as a gm-only button on the message that the gm can use to actually unmystify all mystified tokens with the same base actor on that scene. After all, if you've recognized one zombie shambler I figure you would recognize all zombie shamblers.
//TODO Make issues out of the harder of the above todos...

// Import TypeScript modules
import { preloadTemplates } from "./preloadTemplates";
import { registerSettings } from "./settings";
import { mangleChatMessage, renderNameHud, tokenCreateMystification } from "./feature/mystify-token";
import { registerKeybindings } from "./keybinds";
import { getCombatantById, moveSelectedAheadOfCurrent } from "./feature/changeCombatantInitiative";
import { calcRemainingMinutes, handleTimer } from "./feature/heroPointHandler";

export const MODULENAME = "xdy-pf2e-workbench";

declare global {
    interface LenientGlobalVariableTypes {
        game: never;
        canvas: never;
        ui: never;
        i18n: never;
    }
}

// Initialize module
Hooks.once("init", async () => {
    console.log(`${MODULENAME} | Initializing xdy-pf2e-workbench`);

    registerSettings();
    registerKeybindings();

    await preloadTemplates();

    // Register custom sheets (if any)
});

// Setup module
Hooks.once("setup", async () => {
    console.log(`${MODULENAME} | Setting up`);
    // Do anything after initialization but before ready
});

// When ready
Hooks.once("ready", async () => {
    // Do anything once the module is ready
    console.log(`${MODULENAME} | Ready`);
    await hooksForEveryone();
    await hooksForGM();
});

async function hooksForEveryone() {
    //Hooks for everyone
    if (game.settings.get(MODULENAME, "autoRollDamageForStrike")) {
        Hooks.on("createChatMessage", (message: ChatMessage) => {
            const messageActor: Actor = <Actor>game.actors?.get(<string>message.data.speaker.actor);
            const messageToken: TokenDocument = <TokenDocument>(
                canvas?.scene?.tokens.get(<string>message.data.speaker.token)
            );
            const messageUserId = message.data.user;
            const isSenderActive = game.users?.players
                .filter((u) => u.active)
                .filter((u) => !u.isGM)
                .find((u) => u.id === messageUserId);
            const amIMessageSender = messageUserId === game.user?.id;
            const autorollDamageEnabled = game.settings.get(MODULENAME, "autoRollDamageForStrike");
            const rollAsPlayer = !game.user?.isGM && amIMessageSender;
            const rollAsGM = game.user?.isGM && (amIMessageSender || !isSenderActive);
            if (message.data.type === 5 && autorollDamageEnabled && messageActor && (rollAsPlayer || rollAsGM)) {
                const strikeName = message.data.flavor?.match(
                    `(<strong>${game.i18n.localize(
                        `${MODULENAME}.SETTINGS.autoRollDamageForStrike.strike`
                    )}): (.*?)<\\/strong>`
                );
                if (strikeName && strikeName[1] && strikeName[2]) {
                    const degreeOfSuccess = message.data.flavor?.match(`(\\"success\\"|\\"criticalSuccess\\")`);
                    if (degreeOfSuccess && degreeOfSuccess[0]) {
                        // @ts-ignore
                        const actions: any =
                            // @ts-ignore Oof this is ugly. TODO Figure out how to do it properly.
                            messageToken["data"]["document"]["_actor"]["data"]["data"]["actions"] ??
                            // @ts-ignore
                            messageActor?.data.data?.actions;
                        const relevantStrike = actions
                            .filter((a: { type: string }) => a.type === "strike")
                            .find((action: { name: string }) => action.name === strikeName[2]);
                        const rollOptions = messageActor
                            // @ts-ignore
                            ?.getRollOptions(["all", "damage-roll"]);
                        if (degreeOfSuccess[0].includes("success")) {
                            relevantStrike?.damage({
                                options: rollOptions,
                            });
                        } else if (degreeOfSuccess[0].includes("criticalSuccess")) {
                            relevantStrike?.critical({
                                options: rollOptions,
                            });
                        }
                    }
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "autoCollapseItemChatCardContent")) {
        Hooks.on("renderChatMessage", (message: ChatMessage, html: JQuery) => {
            if (game.settings.get(MODULENAME, "autoCollapseItemChatCardContent")) {
                html.find(".card-content").hide();
                html.on("click", "h3", (event: JQuery.ClickEvent) => {
                    const content = event.currentTarget.closest(".chat-message")?.querySelector(".card-content");
                    if (content && content.style) {
                        event.preventDefault();
                        content.style.display = content.style.display === "none" ? "block" : "none";
                        if (content.style.display === "none") {
                            html.find(".card-content").hide();
                        }
                    }
                });
            }
        });
    }

    if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
        Hooks.on("pf2e.endTurn", async (combatant: Combatant, _combat: Combat, _userId: string) => {
            if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
                // @ts-ignore
                if (combatant?.actor && combatant?.actor?.hasCondition("frightened")) {
                    // @ts-ignore
                    await combatant?.actor.decreaseCondition("frightened");
                }
            }
        });
    }
}

async function hooksForGM() {
    //GM-only hooks
    if (!game.user?.isGM) return;

    if (game.settings.get(MODULENAME, "heroPointHandler")) {
        await handleTimer(calcRemainingMinutes());
    }

    if (game.settings.get(MODULENAME, "npcMystifier")) {
        Hooks.on("createToken", async (token: any) => {
            if (game.settings.get(MODULENAME, "npcMystifier")) {
                tokenCreateMystification(token);
            }
        });
    }

    if (game.settings.get(MODULENAME, "npcMystifier")) {
        Hooks.on("renderTokenHUD", (_app: TokenHUD, html: JQuery, data: any) => {
            if (game.settings.get(MODULENAME, "npcMystifier")) {
                renderNameHud(data, html);
            }
        });
    }

    if (game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
        Hooks.on("renderChatMessage", (message: ChatMessage, html: JQuery) => {
            if (game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
                mangleChatMessage(message, html);
            }
        });
    }

    if (game.settings.get(MODULENAME, "purgeExpiredEffectsOnTimeIncreaseOutOfCombat")) {
        Hooks.on("updateWorldTime", async (_total, diff) => {
            if (
                // @ts-ignore
                !game.combat?.active &&
                diff >= 1 &&
                game.settings.get(MODULENAME, "purgeExpiredEffectsOnTimeIncreaseOutOfCombat")
            ) {
                // @ts-ignore
                game.pf2e.effectTracker.removeExpired();
            }
        });
    }

    if (game.settings.get(MODULENAME, "purgeExpiredEffectsEachTurn")) {
        Hooks.on("updateCombat", (combat: Combat) => {
            if (game.settings.get(MODULENAME, "purgeExpiredEffectsEachTurn")) {
                if (combat.combatant?.actor) {
                    // @ts-ignore
                    game.pf2e.effectTracker.removeExpired(combat.combatant.actor);
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "enableMoveBeforeCurrentCombatant")) {
        Hooks.on("getCombatTrackerEntryContext", (html: JQuery, entryOptions: ContextMenuEntry[]) => {
            if (game.settings.get(MODULENAME, "enableMoveBeforeCurrentCombatant")) {
                entryOptions.push({
                    icon: '<i class="fas fa-skull"></i>',
                    name: `${MODULENAME}.SETTINGS.moveBeforeCurrentCombatantContextMenu.name`,
                    callback: async (li: any) => {
                        await moveSelectedAheadOfCurrent(getCombatantById(li.data("combatant-id")));
                    },
                });
            }
        });
    }

    if (game.settings.get(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP")) {
        Hooks.on("preUpdateActor", async (actor: Actor, update: Record<string, string>) => {
            if (game.settings.get(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP")) {
                const combatant = <Combatant>(
                    game?.combat?.getCombatantByToken(
                        actor.isToken
                            ? <string>actor.token?.id
                            : <string>canvas?.scene?.data.tokens.find((t) => t.actor?.id === actor.id)?.id
                    )
                );
                if (
                    combatant &&
                    combatant !== game.combat?.combatant &&
                    // @ts-ignore
                    actor.data.data.attributes.hp.value > 0 &&
                    getProperty(update, "data.attributes.hp.value") <= 0
                ) {
                    await moveSelectedAheadOfCurrent(combatant);
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnStatusDying")) {
        // @ts-ignore Can't be bothered to type preUpdateToken
        Hooks.on("preUpdateToken", async (tokenDoc: TokenDocument, update) => {
            type UpdateRow = { type: string; data: { active: any; slug: string; value: { value: number } } };
            if (game.settings.get(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnStatusDying")) {
                const shouldMove =
                    //@ts-ignore Only pf2e actor has the hasCondition method and I haven't the type for that, so...
                    !tokenDoc?.actor?.hasCondition("dying") &&
                    update.actorData?.items &&
                    update.actorData.items
                        .filter((row: UpdateRow) => row.type === "condition")
                        .filter((row: UpdateRow) => row.data?.active)
                        .filter((row: UpdateRow) => row.data?.slug === "dying")
                        .find((row: UpdateRow) => row.data?.value.value === 1);
                const combatant = <Combatant>game?.combat?.getCombatantByToken(<string>tokenDoc.id);
                if (combatant && combatant !== game.combat?.combatant && shouldMove) {
                    await moveSelectedAheadOfCurrent(combatant);
                }
            }
        });
    }
}
