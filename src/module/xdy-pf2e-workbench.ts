/**
 * Entrypoint for xdy-pf2e-workbench.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

//TODO Start using the actual pf2e types (for now, some types in types/pf2etypes.d.ts)
//TODO Make it so holding shift pops up a dialog where one can change the name of the mystified creature
//TODO Add an option to have the 'demystify' button post a message to chat/pop up a dialog with demystification details (e.g. pretty much the recall knowledge macro), with the chat button doing the actual demystification.
//TODO Make the button post a chat message with a properly set up RK roll that players can click, as well as a gm-only button on the message that the gm can use to actually unmystify.
import { preloadTemplates } from "./preloadTemplates";
import { registerSettings } from "./settings";
import { mangleChatMessage, renderNameHud, tokenCreateMystification } from "./feature/mystify-token";
import { registerKeybindings } from "./keybinds";
import { getCombatantById, moveSelectedAheadOfCurrent } from "./feature/changeCombatantInitiative";
import { calcRemainingMinutes, startTimer } from "./feature/heroPointHandler";
import { CombatantPF2e } from "../../types/src/module/encounter/combatant";
import { ChatMessagePF2e } from "../../types/src/module/chat-message/index";
import { ActorFlagsPF2e } from "../../types/src/module/actor/data/base";
import { SpellPF2e } from "../../types/src/module/item/spell/index";
import { ActorPF2e } from "../../types/src/module/actor/base";
import { EncounterPF2e } from "../../types/src/module/encounter/document";
import { TokenDocumentPF2e } from "../../types/src/module/scene/token-document/document";

export const MODULENAME = "xdy-pf2e-workbench";

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

function shouldIHandleThis(
    userId: string | undefined | null,
    playerCondition = true,
    gmCondition = true,
    extraCondition = false
) {
    const isUserActive = game.users?.players
        .filter((u) => u.active)
        .filter((u) => !u.isGM)
        .find((u) => u.id === userId);
    const rollAsPlayer = !game.user?.isGM && extraCondition && playerCondition;
    const rollAsGM = game.user?.isGM && (extraCondition || !isUserActive) && gmCondition;
    return rollAsPlayer || rollAsGM;
}

function shouldIHandleThisMessage(message: ChatMessagePF2e, playerCondition: boolean, gmCondition: boolean) {
    const userId = message.data.user;
    const amIMessageSender = userId === game.user?.id;
    return shouldIHandleThis(userId, playerCondition, gmCondition, amIMessageSender);
}

function getActionFromMessage(actions: any, actionIds: RegExpMatchArray, message: ChatMessagePF2e) {
    const strikes = actions.filter((a: { type: string }) => a.type === "strike");
    const itemStrikes = strikes.filter((a: { item: { id: any } }) => a.item.id === actionIds[1]);
    if (itemStrikes.length === 1) {
        //Normal case
        return itemStrikes[0];
    } else if (itemStrikes.length > 1) {
        //The strike is most likely based on an RE which means that all actions get the same item id (e.g. animal form), try to regex it out of the message instead
        const strikeName = message.data.flavor?.match(
            `<h4 class="action">${game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoRollDamageForStrike.strike`
            )}: (.*?)<\\/h4>`
        );
        if (strikeName && strikeName[1]) {
            return strikes.find((a: { name: string }) => a.name === strikeName[1]);
        } else {
            //If we can't find the strike name, give up.
            return null;
        }
    } else {
        //If we can't find the strike, give up.
        return null;
    }
}

async function hooksForEveryone() {
    //Hooks for everyone
    if (
        game.settings.get(MODULENAME, "autoRollDamageForStrike") &&
        (game.settings.get(MODULENAME, "autoRollDamageForStrike") ||
            game.settings.get(MODULENAME, "autoRollDamageForSpellAttack"))
    ) {
        Hooks.on("createChatMessage", async (message: ChatMessagePF2e) => {
            const numberOfMessagesToCheck = 5;
            if (
                shouldIHandleThisMessage(
                    message,
                    ["all", "players"].includes(<string>game.settings.get(MODULENAME, "autoRollDamageAllow")),
                    ["all", "gm"].includes(<string>game.settings.get(MODULENAME, "autoRollDamageAllow"))
                )
            ) {
                const autoRollDamageForStrikeEnabled = game.settings.get(MODULENAME, "autoRollDamageForStrike");
                const autoRollDamageForSpellAttackEnabled = game.settings.get(
                    MODULENAME,
                    "autoRollDamageForSpellAttack"
                );
                const messageActor: ActorPF2e = <ActorPF2e>game.actors?.get(<string>message.data.speaker.actor);
                const messageToken: TokenDocumentPF2e = <TokenDocumentPF2e>(
                    canvas?.scene?.tokens.get(<string>message.data.speaker.token)
                );
                const flags = <ActorFlagsPF2e>message.data.flags.pf2e;
                const rollType = flags.context?.type;
                if (
                    messageActor &&
                    messageToken &&
                    ((rollType === "attack-roll" && autoRollDamageForStrikeEnabled) ||
                        (rollType === "spell-attack-roll" && autoRollDamageForSpellAttackEnabled))
                ) {
                    const actionId = <string>flags?.origin?.uuid;
                    const degreeOfSuccess = flags.context?.outcome ?? "";
                    if (rollType === "spell-attack-roll") {
                        if (degreeOfSuccess === "success" || degreeOfSuccess === "criticalSuccess") {
                            const spell = <SpellPF2e>await fromUuid(actionId);
                            let spellLevel = spell.data.data.level;
                            let levelFromChatCard = false;
                            const chatLength = game.messages?.contents.length ?? 0;
                            for (let i = 1; i <= Math.min(numberOfMessagesToCheck + 1, chatLength); i++) {
                                const msg = game.messages?.contents[chatLength - i];
                                if (msg && (<ActorFlagsPF2e>msg.data.flags.pf2e).origin?.uuid === actionId) {
                                    const level = msg.data.content.match(/data-spell-lvl="(\d+)"/);
                                    if (level && level[1]) {
                                        levelFromChatCard = true;
                                        // @ts-ignore Wtf? How to make a number into a OneToTen?
                                        spellLevel = parseInt(level[1]);
                                        break;
                                    }
                                }
                            }
                            if (
                                !levelFromChatCard &&
                                game.settings.get(MODULENAME, "autoRollDamageNotifyOnSpellCardNotFound")
                            ) {
                                ui.notifications.info(
                                    game.i18n.format(`${MODULENAME}.spellCardNotFound`, {
                                        spell: spell.data.name,
                                    })
                                );
                            }

                            //Until spell level flags are added to attack rolls it is the best I could come up with.
                            //fakes the event.closest function that pf2e uses to parse spell level for heightening damage rolls.
                            //@ts-ignore
                            spell.rollDamage({
                                currentTarget: {
                                    closest: () => {
                                        // @ts-ignore Wtf? How to make a number into a OneToTen?
                                        return { dataset: { spellLvl: Math.abs(spellLevel) } };
                                    },
                                },
                            });
                        }
                    } else if (rollType === "attack-roll") {
                        const rollOptions = messageToken.actor?.getRollOptions(["all", "damage-roll"]);
                        const actions: any =
                            // @ts-ignore Oof this is ugly. TODO Figure out how to do it properly.
                            messageToken["data"]["document"]["_actor"]["data"]["data"]["actions"] ??
                            // @ts-ignore
                            messageActor?.data.data?.actions;
                        const actionIds = actionId.match(/Item.(\w+)/);
                        let action: any;
                        if (actionIds && actionIds[1]) {
                            action = getActionFromMessage(actions, actionIds, message);
                            if (degreeOfSuccess === "success") {
                                action?.damage({ options: rollOptions });
                            } else if (degreeOfSuccess === "criticalSuccess") {
                                action?.critical({ options: rollOptions });
                            }
                        }
                    }
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "automatedAnimationOn")) {
        Hooks.on("createChatMessage", async (message: ChatMessagePF2e) => {
            if (game.modules.get("autoanimations") && game.settings.get(MODULENAME, "automatedAnimationOn")) {
                const messageToken: TokenDocument = <TokenDocument>(
                    canvas?.scene?.tokens.get(<string>message.data.speaker.token)
                );
                const flags = <ActorFlagsPF2e>message.data.flags.pf2e;
                const rollType = flags.context?.type;
                if (messageToken && rollType === "attack-roll") {
                    const degreeOfSuccess = flags.context?.outcome ?? "";
                    const pack = game.packs.get("xdy-pf2e-workbench.xdy-pf2e-workbench-items");
                    const item = ((await pack?.getDocuments()) ?? []).find((item: any) => item.data.name === "AA Miss");
                    let animation = "";
                    let sound = "";
                    switch (degreeOfSuccess) {
                        case "criticalSuccess":
                            if (game.settings.get(MODULENAME, "automatedAnimationOnCritSuccessAnimation")) {
                                animation =
                                    <string>game.settings.get(MODULENAME, "automatedAnimationOnCritSuccessAnimation") ||
                                    animation;
                            }
                            if (game.settings.get(MODULENAME, "automatedAnimationOnCritSuccessSound")) {
                                sound =
                                    <string>game.settings.get(MODULENAME, "automatedAnimationOnCritSuccessSound") ||
                                    sound;
                            }
                            break;
                        case "criticalFailure":
                            if (game.settings.get(MODULENAME, "automatedAnimationOnCritFailAnimation")) {
                                animation =
                                    <string>game.settings.get(MODULENAME, "automatedAnimationOnCritFailAnimation") ||
                                    animation;
                            }
                            if (game.settings.get(MODULENAME, "automatedAnimationOnCritFailSound")) {
                                sound =
                                    <string>game.settings.get(MODULENAME, "automatedAnimationOnCritFailSound") || sound;
                            }
                            break;
                        case "failure":
                            if (game.settings.get(MODULENAME, "automatedAnimationOnFailAnimation")) {
                                animation =
                                    <string>game.settings.get(MODULENAME, "automatedAnimationOnFailAnimation") ||
                                    animation;
                            }
                            if (game.settings.get(MODULENAME, "automatedAnimationOnFailSound")) {
                                sound = <string>game.settings.get(MODULENAME, "automatedAnimationOnFailSound") || sound;
                            }
                            break;
                    }
                    if (pack && item && animation && sound && message.user && message.user.targets) {
                        //Needs to be unlocked for some reason. Meh.
                        await pack.configure({ locked: false });
                        await item.setFlag("autoanimations", "options.customPath", animation);
                        await item.setFlag("autoanimations", "audio.a01.file", sound);
                        const from = Array.from(message.user.targets);
                        // @ts-ignore
                        await AutoAnimations.playAnimation(messageToken, from, item, { playOnMiss: true });
                    }
                }
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault" ||
        game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "nonCollapsedDefault"
    ) {
        Hooks.on("renderChatMessage", (message: ChatMessagePF2e, html: JQuery) => {
            if (game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault") {
                html.find(".card-content").hide();
            }
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
        });
    }

    if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
        Hooks.on("pf2e.endTurn", async (combatant: CombatantPF2e, _combat: EncounterPF2e, _userId: string) => {
            if (
                game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn") &&
                combatant &&
                combatant.actor &&
                shouldIHandleThis(combatant.isOwner ? game.user?.id : null)
            ) {
                if (combatant.actor.hasCondition("frightened")) {
                    await combatant.actor.decreaseCondition("frightened");
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "applyPersistentDamage")) {
        Hooks.on("createChatMessage", async (message: ChatMessagePF2e) => {
            if (
                game.settings.get(MODULENAME, "applyPersistentDamage") &&
                canvas.ready &&
                "persistent" in message.data.flags &&
                message.data.speaker.token &&
                message.data.flavor &&
                message.roll?.total &&
                shouldIHandleThisMessage(
                    message,
                    ["all", "players"].includes(<string>game.settings.get(MODULENAME, "applyPersistentAllow")),
                    ["all", "gm"].includes(<string>game.settings.get(MODULENAME, "applyPersistentAllow"))
                ) &&
                game.actors
            ) {
                const token = canvas.tokens?.get(message.data.speaker.token);
                if (token && token.isOwner) {
                    const damage = message.roll.total;

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
        Hooks.on("renderChatMessage", async (message: ChatMessagePF2e) => {
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
                shouldIHandleThisMessage(
                    message,
                    ["all", "players"].includes(<string>game.settings.get(MODULENAME, "applyPersistentAllow")),
                    ["all", "gm"].includes(<string>game.settings.get(MODULENAME, "applyPersistentAllow"))
                )
            ) {
                const token = game.combats.active.combatant.token;
                if (token && token.isOwner) {
                    if (
                        [
                            game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentHealing.FastHealingLabel`),
                            game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentHealing.RegenerationLabel`),
                        ].some((text) => message.data.flavor?.includes(text))
                    ) {
                        const healing = message.roll.total * -1;

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

    Hooks.on("renderSettingsConfig", (_app: any, html: JQuery) => {
        const settings: [string, any][] = Array.from(game.settings.settings.entries());
        settings.forEach((setting: [string, any]) => {
            const settingName = setting[0];
            //TODO Do this in a more elegant way
            //Disable all dependent persistentDamage settings
            if (
                settingName !== `${MODULENAME}.applyPersistentAllow` &&
                setting[0].startsWith(`${MODULENAME}.applyPersistent`)
            ) {
                const applyToggle = !(
                    game.settings.get(MODULENAME, "applyPersistentAllow") === "none" ||
                    (game.user?.isGM
                        ? game.settings.get(MODULENAME, "applyPersistentAllow") === "players"
                        : game.settings.get(MODULENAME, "applyPersistentAllow") === "gm")
                );
                html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
            }
            //Disable all dependent persistentHealing settings
            if (
                settingName !== `${MODULENAME}.applyPersistentAllow` &&
                setting[0].startsWith(`${MODULENAME}.applyPersistent`)
            ) {
                const applyToggle = !(
                    game.settings.get(MODULENAME, "applyPersistentAllow") === "none" ||
                    (game.user?.isGM
                        ? game.settings.get(MODULENAME, "applyPersistentAllow") === "players"
                        : game.settings.get(MODULENAME, "applyPersistentAllow") === "gm")
                );
                // const valueFunction = game.settings.get(MODULENAME, "applyPersistentAllow") === "none";

                html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
            }
            if (
                settingName !== `${MODULENAME}.autoRollDamageAllow` &&
                setting[0].startsWith(`${MODULENAME}.autoRollDamage`)
            ) {
                // const valueFunction = game.settings.get(MODULENAME, "autoRollDamage") === "none";
                const applyToggle = !(
                    game.settings.get(MODULENAME, "autoRollDamageAllow") === "none" ||
                    (game.user?.isGM
                        ? game.settings.get(MODULENAME, "autoRollDamageAllow") === "players"
                        : game.settings.get(MODULENAME, "autoRollDamageAllow") === "gm")
                );

                html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
                html.find(`select[name="${settingName}"]`).parent().parent().toggle(applyToggle);
            }
        });
    });
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
        Hooks.on("getCombatTrackerEntryContext", (html: JQuery, entryOptions: any) => {
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
        Hooks.on("preUpdateActor", async (actor: ActorPF2e, update: Record<string, string>) => {
            if (
                game.user?.isGM &&
                game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP" &&
                game.combat
            ) {
                const combatant = <CombatantPF2e>(
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
        Hooks.on("preUpdateToken", async (tokenDoc: TokenDocumentPF2e, update) => {
            type UpdateRow = { type: string; data: { active: any; slug: string; value: { value: number } } };
            if (
                game.user?.isGM &&
                game.settings.get(MODULENAME, "enableAutomaticMove") === "gettingStatusDying" &&
                game.combat &&
                tokenDoc.actor &&
                update.actorData
            ) {
                const shouldMove =
                    !tokenDoc.actor.hasCondition("dying") &&
                    update.actorData.items &&
                    update.actorData.items
                        .filter((row: UpdateRow) => row.type === "condition")
                        .filter((row: UpdateRow) => row.data.active)
                        .filter((row: UpdateRow) => row.data.slug === "dying")
                        .find((row: UpdateRow) => row.data.value.value === 1);
                const combatant = <CombatantPF2e>game.combat.getCombatantByToken(<string>tokenDoc.id);
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
            await startTimer(calcRemainingMinutes());
        }
    }

    Hooks.on("renderSettingsConfig", (_app: any, html: JQuery) => {
        const settings: [string, any][] = Array.from(game.settings.settings.entries());
        settings.forEach((setting: [string, any]) => {
            const name = setting[0];
            //TODO Do this in a more elegant way
            //Disable all dependent npcMystifier settings
            if (name !== `${MODULENAME}.npcMystifier` && setting[0].startsWith(`${MODULENAME}.npcMystifier`)) {
                const valueFunction = !game.settings.get(MODULENAME, "npcMystifier");

                html.find(`input[name="${name}"]`).parent().parent().toggle(!valueFunction);
                html.find(`select[name="${name}"]`).parent().parent().toggle(!valueFunction);
            }
            if (
                name !== `${MODULENAME}.automatedAnimationOn` &&
                setting[0].startsWith(`${MODULENAME}.automatedAnimationOn`)
            ) {
                const valueFunction = !game.settings.get(MODULENAME, "automatedAnimationOn");

                html.find(`input[name="${name}"]`).parent().parent().toggle(!valueFunction);
                html.find(`select[name="${name}"]`).parent().parent().toggle(!valueFunction);
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
                !game.combat?.active &&
                diff >= 1
            ) {
                game.pf2e.effectTracker.removeExpired();
            }
        });
    }

    if (game.settings.get(MODULENAME, "purgeExpiredEffectsEachTurn")) {
        Hooks.on("updateCombat", (combat: EncounterPF2e) => {
            if (
                game.user?.isGM &&
                game.settings.get(MODULENAME, "purgeExpiredEffectsEachTurn") &&
                combat.combatant &&
                combat.combatant.actor
            ) {
                game.pf2e.effectTracker.removeExpired(combat.combatant.actor);
            }
        });
    }
}
