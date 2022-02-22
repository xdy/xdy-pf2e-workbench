/**
 * Entrypoint for xdy-pf2e-workbench.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

//TODO Start using the actual pf2e types
//TODO Make it so holding shift pops up a dialog where one can change the name of the mystified creature
//TODO Add an option to have the 'demystify' button post a message to chat/pop up a dialog with demystification details (e.g. pretty much the recall knowledge macro), with the chat button doing the actual demystification.
//TODO Make the button post a chat message with a properly set up RK roll that players can click, as well as a gm-only button on the message that the gm can use to actually unmystify.

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
    await hooksForEveryone();
    await hooksForGMInit();

    // Register custom sheets (if any)
});

// Setup module
Hooks.once("setup", async () => {
    console.log(`${MODULENAME} | Setting up`);
    // Do anything after initialization but before ready
    hooksForGMSetup();
});

// When ready
Hooks.once("ready", async () => {
    // Do anything once the module is ready
    console.log(`${MODULENAME} | Ready`);
    Hooks.callAll(`${MODULENAME}.moduleReady`);
});

function shouldIHandleThis(message: ChatMessage) {
    const messageUserId = message.data.user;
    const isSenderActive = game.users?.players
        .filter((u) => u.active)
        .filter((u) => !u.isGM)
        .find((u) => u.id === messageUserId);
    const amIMessageSender = messageUserId === game.user?.id;
    const rollAsPlayer = !game.user?.isGM && amIMessageSender;
    const rollAsGM = game.user?.isGM && (amIMessageSender || !isSenderActive);
    return rollAsPlayer || rollAsGM;
}

async function hooksForEveryone() {
    //Hooks for everyone
    if (game.settings.get(MODULENAME, "autoRollDamageForStrike")) {
        Hooks.on("createChatMessage", (message: ChatMessage) => {
            const autorollDamageEnabled = game.settings.get(MODULENAME, "autoRollDamageForStrike");
            const messageActor: Actor = <Actor>game.actors?.get(<string>message.data.speaker.actor);
            if (message.data.type === 5 && autorollDamageEnabled && messageActor && shouldIHandleThis(message)) {
                const messageToken: TokenDocument = <TokenDocument>(
                    canvas?.scene?.tokens.get(<string>message.data.speaker.token)
                );
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
            if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn") && combatant && combatant.actor) {
                //@ts-ignore Only pf2e actor has the hasCondition method and I haven't the type for that, so...
                if (combatant.actor.hasCondition("frightened")) {
                    // @ts-ignore
                    await combatant.actor.decreaseCondition("frightened");
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "applyPersistentDamage")) {
        Hooks.on("createChatMessage", async (message: ChatMessage) => {
            if (
                game.settings.get(MODULENAME, "applyPersistentDamage") &&
                canvas.ready &&
                "persistent" in message.data.flags &&
                message.data.speaker.token &&
                message.data.flavor &&
                message.roll?.total &&
                shouldIHandleThis(message) &&
                game.actors
            ) {
                const token = canvas.tokens?.get(message.data.speaker.token);
                if (token && token.isOwner) {
                    const damage = message.roll.total;

                    // @ts-ignore
                    await token?.actor?.applyDamage(damage, token, false);

                    if (game.settings.get(MODULENAME, "separatePersistentDamageMessage")) {
                        await ChatMessage.create({
                            content: game.i18n.format(`${MODULENAME}.SETTINGS.applyPersistentDamage.wasDamaged`, {
                                damage: damage,
                            }),
                            speaker: message.data.speaker,
                            flavor: $(message.data.flavor).filter("div").text().trim().split("\n")[0],
                            whisper:
                                game.settings.get("pf2e", "metagame.secretDamage") && !token.actor?.hasPlayerOwner
                                    ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                                    : [],
                        });
                    }
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "applyPersistentHealing")) {
        Hooks.on("renderChatMessage", async (message) => {
            if (
                game.settings.get(MODULENAME, "applyPersistentHealing") &&
                canvas.ready &&
                message.data.flavor &&
                message.roll &&
                message.roll.total &&
                game.combats &&
                game.combats.active &&
                game.combats.active.combatant &&
                game.combats.active.combatant.actor &&
                shouldIHandleThis(message)
            ) {
                const token = game.combats.active.combatant.token;
                if (token && token.isOwner) {
                    console.log(message.data.flavor);
                    if (
                        [
                            game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentHealing.FastHealingLabel`),
                            game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentHealing.RegenerationLabel`),
                        ].some((text) => message.data.flavor?.includes(text))
                    ) {
                        const healing = message.roll.total * -1;

                        // @ts-ignore
                        await token.actor.applyDamage(healing, token, false);
                        if (game.settings.get(MODULENAME, "separatePersistentHealingMessage")) {
                            await ChatMessage.create({
                                content: game.i18n.format(`${MODULENAME}.SETTINGS.applyPersistentHealing.wasHealed`, {
                                    healing: Math.abs(healing),
                                }),
                                speaker: { token: game.combats.active.combatant.token?.id },
                                flavor: message.data.flavor.split("\n")[0],
                                whisper:
                                    game.settings.get("pf2e", "metagame.secretDamage") && !token.actor?.hasPlayerOwner
                                        ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                                        : [],
                            });
                        }
                    }
                }
            }
        });
    }
}

async function hooksForGMInit() {
    if (game.settings.get(MODULENAME, "npcMystifier")) {
        Hooks.on("renderTokenHUD", (_app: TokenHUD, html: JQuery, data: any) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
                renderNameHud(data, html);
            }
        });
    }

    if (game.settings.get(MODULENAME, "enableMoveBeforeCurrentCombatant")) {
        Hooks.on("getCombatTrackerEntryContext", (html: JQuery, entryOptions: ContextMenuEntry[]) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "enableMoveBeforeCurrentCombatant")) {
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
            if (
                game.user?.isGM &&
                game.settings.get(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP") &&
                game.combat
            ) {
                const combatant = <Combatant>(
                    game.combat.getCombatantByToken(
                        actor.isToken
                            ? <string>actor.token?.id
                            : <string>canvas?.scene?.data.tokens.find((t) => t.actor?.id === actor.id)?.id
                    )
                );
                if (
                    combatant &&
                    combatant !== game.combat.combatant &&
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
            if (
                game.user?.isGM &&
                game.settings.get(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnStatusDying") &&
                game.combat &&
                tokenDoc.actor &&
                update.actorData
            ) {
                const shouldMove =
                    //@ts-ignore Only pf2e actor has the hasCondition method and I haven't the type for that, so...
                    !tokenDoc.actor.hasCondition("dying") &&
                    update.actorData.items &&
                    update.actorData.items
                        .filter((row: UpdateRow) => row.type === "condition")
                        .filter((row: UpdateRow) => row.data.active)
                        .filter((row: UpdateRow) => row.data.slug === "dying")
                        .find((row: UpdateRow) => row.data.value.value === 1);
                const combatant = <Combatant>game.combat.getCombatantByToken(<string>tokenDoc.id);
                if (combatant && combatant !== game.combat.combatant && shouldMove) {
                    await moveSelectedAheadOfCurrent(combatant);
                }
            }
        });
    }
    if (game.settings.get(MODULENAME, "npcMystifier")) {
        Hooks.on("createToken", async (token: any) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
                tokenCreateMystification(token);
            }
        });
    }

    if (game.settings.get(MODULENAME, "heroPointHandler")) {
        if (game.user?.isGM) {
            await handleTimer(calcRemainingMinutes());
        }
    }
}

function hooksForGMSetup() {
    //GM-only hooks that must run at setup
    if (game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
        Hooks.on("renderChatMessage", (message: ChatMessage, html: JQuery) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
                mangleChatMessage(message, html);
            }
        });
    }

    if (game.settings.get(MODULENAME, "purgeExpiredEffectsOnTimeIncreaseOutOfCombat")) {
        Hooks.on("updateWorldTime", async (_total, diff) => {
            if (
                game.user?.isGM &&
                game.settings.get(MODULENAME, "purgeExpiredEffectsOnTimeIncreaseOutOfCombat") &&
                // @ts-ignore
                !game.combat?.active &&
                diff >= 1
            ) {
                // @ts-ignore
                game.pf2e.effectTracker.removeExpired();
            }
        });
    }

    if (game.settings.get(MODULENAME, "purgeExpiredEffectsEachTurn")) {
        Hooks.on("updateCombat", (combat: Combat) => {
            if (
                game.user?.isGM &&
                game.settings.get(MODULENAME, "purgeExpiredEffectsEachTurn") &&
                combat.combatant &&
                combat.combatant.actor
            ) {
                // @ts-ignore
                game.pf2e.effectTracker.removeExpired(combat.combatant.actor);
            }
        });
    }
}
