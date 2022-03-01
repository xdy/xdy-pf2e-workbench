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
        Hooks.on("createChatMessage", async (message) => {
            //moved this here because it was double handling if included further down
            if (shouldIHandleThis(message)) {
                const autorollDamageEnabled = game.settings.get(MODULENAME, "autoRollDamageForStrike");
                const messageActor = game.actors?.get(message.data.speaker.actor);
                const flags = message.data.flags.pf2e;
                //@ts-ignore
                const rollType = message.data.flags?.pf2e?.context?.type;
                if (
                    rollType === "attack-roll" ||
                    (rollType === "spell-attack-roll" && autorollDamageEnabled && messageActor)
                ) {
                    console.log(message);
                    window.m = message;
                    // message.update()
                    //@ts-ignore
                    const actionId = flags?.origin?.uuid;
                    //@ts-ignore
                    const degreeOfSuccess = flags.context.outcome;
                    if (rollType === "spell-attack-roll") {
                        if (degreeOfSuccess === "success" || degreeOfSuccess === "criticalSuccess") {
                            const spell = await fromUuid(actionId);
                            //@ts-ignore
                            let spellLevel = spell.data.data.level;
                            let levelFromChatCard = false;
                            //@ts-ignore
                            const chatLength = game.messages.contents.length;
                            //check the last 5 messages for the spell info card. skips the last message which is the attach roll
                            //most use cases shouldm't need to search further back than that
                            for (let i = 1; i <= Math.min(6, chatLength); i++) {
                                //@ts-ignore
                                const m = game.messages.contents[chatLength - i];
                                //@ts-ignore
                                if (m.data.flags.pf2e.origin.uuid === actionId) {
                                    const re = m.data.content.match(/data-spell-lvl="(\d+)"/);
                                    if (re) {
                                        levelFromChatCard = true;
                                        spellLevel = re[1];
                                        break;
                                    }
                                }
                            }
                            if (
                                !levelFromChatCard &&
                                game.settings.get(MODULENAME, "notifyOnSpellCardNotFound") &&
                                shouldIHandleThis(message)
                            ) {
                                //@ts-ignore
                                ui.notifications.info(
                                    //@ts-ignore
                                    `The spell card could not be found. Casting ${spell.data.name} at minimum level for that spell.`
                                );
                            }

                            //Until spell level flags are added to attack rolls it is the best I could come up with.
                            //fakes the event.closest function that pf2e uses to parse spell level for heightening damage rolls.
                            //@ts-ignore
                            spell.rollDamage({
                                currentTarget: {
                                    closest: () => {
                                        return { dataset: { spellLvl: Math.abs(spellLevel) } };
                                    },
                                },
                            });
                        }
                    } else if (rollType === "attack-roll") {
                        //@ts-ignore
                        const rollOptions = messageActor?.getRollOptions(["all", "damage-roll"]);
                        // @ts-ignore
                        const actions = messageActor.data.data.actions;
                        const action = actions
                            .filter((a) => a.type === "strike")
                            .find((a) => a.item.id === actionId.match(/Item.(\w+)/)[1]);
                        if (degreeOfSuccess === "success") {
                            action?.damage({ options: rollOptions });
                        } else if (degreeOfSuccess === "criticalSuccess") {
                            action?.critical({ options: rollOptions });
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

                    if (game.settings.get(MODULENAME, "applyPersistentDamageSeparateMessage")) {
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
                        if (game.settings.get(MODULENAME, "applyPersistentHealingSeparateMessage")) {
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

    if (game.settings.get(MODULENAME, "enableAutomaticMove") === "deprecatedManually") {
        Hooks.on("getCombatTrackerEntryContext", (html: JQuery, entryOptions: ContextMenuEntry[]) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "enableAutomaticMove") === "deprecatedManually") {
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

    if (game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP") {
        Hooks.on("preUpdateActor", async (actor: Actor, update: Record<string, string>) => {
            if (
                game.user?.isGM &&
                game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP" &&
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

    if (game.settings.get(MODULENAME, "enableAutomaticMove") === "gettingStatusDying") {
        // @ts-ignore Can't be bothered to type preUpdateToken
        Hooks.on("preUpdateToken", async (tokenDoc: TokenDocument, update) => {
            type UpdateRow = { type: string; data: { active: any; slug: string; value: { value: number } } };
            if (
                game.user?.isGM &&
                game.settings.get(MODULENAME, "enableAutomaticMove") === "gettingStatusDying" &&
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

    Hooks.on("renderSettingsConfig", (_app: any, html: JQuery) => {
        const settings: [string, ClientSettings.CompleteSetting][] = Array.from(game.settings.settings.entries());
        settings.forEach((setting: [string, ClientSettings.CompleteSetting]) => {
            const settingName = setting[0];
            //TODO Do this in a more elegant way
            //Disable all dependent npcMystifier settings
            if (settingName !== `${MODULENAME}.npcMystifier` && setting[0].startsWith(`${MODULENAME}.npcMystifier`)) {
                const valueFunction = !game.settings.get(MODULENAME, "npcMystifier");

                html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
                html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            }
            //Disable all dependent persistentDamage settings
            if (
                settingName !== `${MODULENAME}.applyPersistentDamage` &&
                setting[0].startsWith(`${MODULENAME}.applyPersistentDamage`)
            ) {
                const valueFunction = !game.settings.get(MODULENAME, "applyPersistentDamage");

                html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            }
            //Disable all dependent persistentHealing settings
            if (
                settingName !== `${MODULENAME}.applyPersistentHealing` &&
                setting[0].startsWith(`${MODULENAME}.applyPersistentHealing`)
            ) {
                const valueFunction = !game.settings.get(MODULENAME, "applyPersistentHealing");

                html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            }
        });
    });
}

function hooksForGMSetup() {
    //GM-only hooks that must run at setup
    if (
        game.settings.get(MODULENAME, "npcMystifier") &&
        game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")
    ) {
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
