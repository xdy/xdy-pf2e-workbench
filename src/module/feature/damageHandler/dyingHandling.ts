import {
    getActorFromMessage,
    handleAsync,
    isFirstGM,
    logDebug,
    shouldIHandleThis,
    shouldIHandleThisMessage,
} from "../../utils.js";
import { CHARACTER_TYPE, MODULENAME, NPC_TYPE } from "../../xdy-pf2e-workbench.js";
import { ActorPF2e, ActorSystemData, ChatMessagePF2e, ItemPF2e } from "foundry-pf2e";
import { moveOnZeroHP } from "../initiativeHandler/index.js";
import * as systems from "../../utils/systems.ts";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function dyingHandlingPreUpdateActorHook(
    actor: any,
    update: Record<string, string>,
    currentActorHp: number,
    updateHp: number,
    autoGainDying: string,
): void {
    const automaticMove = String(game.settings.get(MODULENAME, "enableAutomaticMove"));
    const automoveIfZeroHP =
        game.combat &&
        ((automaticMove === "reaching0HPCharactersOnly" && actor.type === CHARACTER_TYPE) ||
            (automaticMove === "reaching0HP" && [CHARACTER_TYPE, NPC_TYPE].includes(actor.type)));
    const autoRemoveDying = String(game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP"));
    const autoRemoveUnconscious = String(game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP"));

    const isHealed = currentActorHp <= 0 && updateHp > 0;

    if (autoGainDying && !autoGainDying.startsWith("no")) {
        handleAsync(
            (async () => {
                const hpRaisedAbove0 = await handleDyingOnZeroHP(
                    actor,
                    fu.deepClone(update),
                    currentActorHp,
                    updateHp,
                    autoGainDying,
                );
                logDebug("Workbench increaseDyingOnZeroHP complete");
                if (hpRaisedAbove0 || isHealed) {
                    if (autoRemoveDying && !autoRemoveDying.startsWith("no")) {
                        await delay(250);
                        await autoRemoveDyingAtGreaterThanZeroHp(actor, true, autoRemoveDying);
                        logDebug("Workbench autoRemoveDyingAtGreaterThanZeroHP complete");
                    }
                    if (autoRemoveUnconscious) {
                        await autoRemoveUnconsciousAtGreaterThanZeroHP(actor, true);
                    }
                } else if (automoveIfZeroHP && currentActorHp > 0 && updateHp <= 0) {
                    moveOnZeroHP(actor);
                }
            })(),
            "dyingHandlingPreUpdateActorHook",
        );
    } else {
        if (isHealed) {
            handleAsync(
                (async () => {
                    if (autoRemoveDying && !autoRemoveDying.startsWith("no")) {
                        await autoRemoveDyingAtGreaterThanZeroHp(actor, true, autoRemoveDying);
                    }
                    if (autoRemoveUnconscious) {
                        await autoRemoveUnconsciousAtGreaterThanZeroHP(actor, true);
                    }
                })(),
                "dyingHandlingPreUpdateActorHook (hp restored)",
            );
        } else if (automoveIfZeroHP && currentActorHp > 0 && updateHp <= 0) {
            moveOnZeroHP(actor);
        }
    }
}

export async function itemHandlingItemHook(item: ItemPF2e): Promise<void> {
    if (isFirstGM() && item.slug === "dying" && item.parent) {
        handleAsync(handleDying(0, 0, <ActorPF2e>item.parent, false), "itemHandlingItemHook handleDying");
    }

    const giveWounded = game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved");
    const giveUnconscious = game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP");
    if (giveWounded) {
        await giveWoundedWhenDyingRemoved(item);
        logDebug("Workbench giveWoundedWhenDyingRemoved complete");
    }
    if (giveUnconscious) {
        await giveUnconsciousIfDyingRemovedAt0HP(item);
        logDebug("Workbench giveUnconsciousIfDyingRemovedAt0HP complete");
    }
}

export function handleDyingRecoveryRoll(message: ChatMessagePF2e, enabled: boolean): void {
    const flavor = message.flavor;
    const token = message.token;
    if (
        enabled &&
        shouldIHandleThisMessage(
            message,
            ["all", "players"].includes(String(game.settings.get(MODULENAME, "handleDyingRecoveryRollAllow"))),
            ["all", "gm"].includes(String(game.settings.get(MODULENAME, "handleDyingRecoveryRollAllow"))),
        ) &&
        (flavor.includes(game.i18n.localize("PF2E.Recovery.critFailure")) ||
            flavor.includes(game.i18n.localize("PF2E.Recovery.critSuccess")) ||
            flavor.includes(game.i18n.localize("PF2E.Recovery.failure")) ||
            flavor.includes(game.i18n.localize("PF2E.Recovery.success"))) &&
        message.id === game.messages.contents.pop()?.id &&
        token &&
        token.actor &&
        token.isOwner
    ) {
        const outcome = systems.getFlag(message, "context.outcome") ?? "";

        const actor = getActorFromMessage(message);

        const originalDyingCounter = token.actor?.getCondition("dying")?.value ?? 0;
        let dyingCounter = 0;
        let outcomeString = "";
        switch (outcome) {
            case "criticalFailure":
                dyingCounter = dyingCounter + 2;
                outcomeString = game.i18n.localize("PF2E.CritFailure");
                break;
            case "criticalSuccess":
                dyingCounter = dyingCounter - 2;
                outcomeString = game.i18n.localize("PF2E.CritSuccess");
                break;
            case "failure":
                dyingCounter = dyingCounter + 1;
                outcomeString = game.i18n.localize("PF2E.Failure");
                break;
            case "success":
                outcomeString = game.i18n.localize("PF2E.Success");
                dyingCounter = dyingCounter - 1;
                break;
        }
        if (originalDyingCounter > 0 || dyingCounter !== 0) {
            handleAsync(handleDying(dyingCounter, originalDyingCounter, actor), "handleDyingRecoveryRoll handleDying");

            const total = message.rolls.reduce((total, roll) => total + roll.total, 0);
            handleAsync(
                ChatMessage.create({
                    flavor: game.i18n.format(`${MODULENAME}.SETTINGS.handleDyingRecoveryRoll.handled`, {
                        outcome: outcomeString,
                        defeated: token.combatant?.defeated
                            ? game.i18n.format(`${MODULENAME}.SETTINGS.handleDyingRecoveryRoll.defeated`, {
                                  name: token.actor?.name ?? "???",
                              })
                            : "",
                        roll: total,
                    }),
                    speaker: message.speaker,
                }),
                "handleDyingRecoveryRoll ChatMessage",
            );
            handleAsync(message.delete({ render: false }), "handleDyingRecoveryRoll delete");
        }
    }
}

export async function handleDying(
    dyingCounter: number,
    originalDyingCounter: number,
    actor: ActorPF2e,
    isDefeated = actor.combatant?.defeated,
): Promise<void> {
    // @ts-expect-error TODO Is this the right place to look for it?
    const dyingMax = actor.system.attributes.dying?.max;
    const shouldDie = originalDyingCounter + dyingCounter >= (dyingMax ?? 4) && !isDefeated;
    const shouldBecomeDying = originalDyingCounter + dyingCounter > 0 && !isDefeated;
    if (shouldDie) {
        await actor.increaseCondition("dying", {
            max: dyingMax ?? 4,
            value: dyingMax ?? 4,
        });
        await actor.combatant?.toggleDefeated();
        await actor.unsetFlag(MODULENAME, "dyingLastApplied");
        logDebug("dyingLastApplied cleared because dead");
    } else if (shouldBecomeDying) {
        await actor.increaseCondition("dying", {
            max: dyingMax ?? 4,
            value: Math.min(dyingCounter, dyingMax ?? 4),
        });
        const dying = actor.getCondition("dying");
        if (dying) {
            logDebug(`dyingCounter was ${originalDyingCounter} is ${dying.value}`);
            const now = Date.now();
            await actor.setFlag(MODULENAME, "dyingLastApplied", now);
            logDebug(`dyingLastApplied set to ${now}, dyingCounter was ${originalDyingCounter} is ${dying.value}`);
        }
    } else {
        const dyingCondition = actor.getCondition("dying");
        if (dyingCondition) {
            await actor.decreaseCondition("dying", { forceRemove: true });
            await actor.unsetFlag(MODULENAME, "dyingLastApplied");
            logDebug("dyingLastApplied cleared because not dying");
        } else {
            await actor.unsetFlag(MODULENAME, "dyingLastApplied");
            logDebug("handleDying (clear flag, dying already removed)");
        }
    }
}

export async function autoRemoveDyingAtGreaterThanZeroHp(
    actor: ActorPF2e,
    hpAboveZero: boolean,
    autoRemoveDying: string,
): Promise<boolean> {
    const dying = actor.getCondition("dying");
    if (shouldIHandleThis(actor) && dying && !dying.isLocked && hpAboveZero) {
        const value = dying?.value || 0;
        if (dying && value > 0 && !dying.isLocked) {
            if (autoRemoveDying.endsWith("ForCharacters") ? ["character", "familiar"].includes(actor.type) : true) {
                await handleDying(0, 0, actor);
            }
        }
    }
    return true;
}

export async function autoRemoveUnconsciousAtGreaterThanZeroHP(
    actor: ActorPF2e,
    hpRaisedAboveZero: boolean,
): Promise<void> {
    const unconscious = actor.getCondition("unconscious");
    if (shouldIHandleThis(actor) && hpRaisedAboveZero && unconscious && !unconscious.isLocked) {
        await actor.decreaseCondition("unconscious", { forceRemove: true });
    }
}

export function getRelevantMessages(actor: ActorPF2e): ChatMessagePF2e[] {
    const relevant = game.messages.contents.slice(-Math.min(10, game.messages.size));
    return game.settings.get(MODULENAME, "autoGainDyingIgnoresTargeting")
        ? relevant
        : relevant.filter((message) => message.target?.actor.id === actor.id);
}

function filterMessagesByContextType(messages: ChatMessagePF2e[], contextType: string): ChatMessagePF2e[] {
    return messages.filter((message) => systems.getFlag(message, "context.type") === contextType);
}

function filterMessagesByStrikeDamaging(messages: ChatMessagePF2e[]): ChatMessagePF2e[] {
    return messages.filter((message) => systems.getFlag(message, "strike.damaging"));
}

function filterMessagesByActorEnemy(messages: ChatMessagePF2e[]): ChatMessagePF2e[] {
    return messages.filter((message) => message.target?.actor && message.actor?.isEnemyOf(message.target?.actor));
}

function findLastMessageWithTotalGreaterOrEqual(
    messages: ChatMessagePF2e[],
    total: number,
): ChatMessagePF2e | undefined {
    return messages.findLast((message) => message.rolls?.[0]?.total >= total);
}

export function checkIfLatestDamageMessageIsCriticalHitByEnemy(actor: ActorPF2e, option: string): boolean {
    const hp = actor.attributes.hp;
    if (
        hp &&
        hp.value &&
        game.messages.contents.length > 0 &&
        (!option.startsWith("no") && option.endsWith("ForCharacters")
            ? ["character", "familiar"].includes(actor.type)
            : true)
    ) {
        const relevant = getRelevantMessages(actor);
        const isDamageRoll = filterMessagesByContextType(relevant, "damage-roll");
        const isDamagingStrike = filterMessagesByStrikeDamaging(isDamageRoll);
        const attackerIsEnemy = filterMessagesByActorEnemy(isDamagingStrike);
        const criticalSuccess = filterMessagesByCriticalSuccess(attackerIsEnemy);
        const bigEnough = findLastMessageWithTotalGreaterOrEqual(criticalSuccess, hp.value);
        const chatMessagePF2e = bigEnough === isDamageRoll?.reverse()[0] ? bigEnough : null;
        return chatMessagePF2e !== null && chatMessagePF2e !== undefined;
    }
    return false;
}

function filterMessagesByCriticalSuccess(messages: ChatMessagePF2e[]): ChatMessagePF2e[] {
    return messages.filter((message) => systems.getFlag(message, "context.outcome") === "criticalSuccess");
}

export function handleOrcFerocity(
    actor: ActorPF2e,
    update: Record<string, string>,
    effectsToCreate: any[],
    name: string,
    shouldIncreaseWounded = true,
    hpNowAboveZero = false,
) {
    const orcFerocity = actor.itemTypes.feat.find((feat) => feat.slug === "orc-ferocity");
    const orcFerocityUsed: any = actor.itemTypes.effect.find((effect) => effect.slug === "orc-ferocity-used");
    const incredibleFerocity = actor.itemTypes.feat.find((feat) => feat.slug === "incredible-ferocity");
    const undyingFerocity = actor.itemTypes.feat.find((feat) => feat.slug === "undying-ferocity");
    const rampagingFerocity = actor.itemTypes.feat.find((feat) => feat.slug === "rampaging-ferocity");
    if (orcFerocity && (!orcFerocityUsed || orcFerocityUsed.isExpired)) {
        fu.setProperty(update, "system.attributes.hp.value", 1);
        if (undyingFerocity) {
            fu.setProperty(update, "system.attributes.hp.temp", Math.max(actor.level, actor.hitPoints?.temp ?? 0));
        }

        shouldIncreaseWounded = true;

        const effect: any = {
            type: "effect",
            name: game.i18n.localize(`${MODULENAME}.effects.orcFerocityUsed`),
            img: `systems/${game.system.id}/icons/default-icons/alternatives/ancestries/orc.svg`,
            system: {
                slug: "orc-ferocity-used",
                tokenIcon: {
                    show: false,
                },
                duration: {
                    value: incredibleFerocity ? 1 : 24,
                    unit: "hours",
                    sustained: false,
                    expiry: "turn-start",
                },
            },
        };
        effectsToCreate.push(effect);

        if (rampagingFerocity) {
            handleAsync(
                ChatMessage.create({
                    flavor: game.i18n.format(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.orcFerocityMessage`, {
                        name: name,
                    }),
                    speaker: ChatMessage.getSpeaker({ actor: <any>actor }),
                    whisper:
                        systems.getSystemSetting<boolean>("metagame", "secretDamage") && !actor?.hasPlayerOwner
                            ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                            : [],
                }),
                "handleOrcFerocity ChatMessage",
            );
        }

        hpNowAboveZero = true;
    }
    return { shouldIncreaseWounded, hpNowAboveZero };
}

export function handleDeliberateDeath(actor: ActorPF2e, effectsToCreate: any[], name: string) {
    const deliberateDeath = actor.itemTypes.feat.find((feat) => feat.slug === "deliberate-death");
    const deliberateDeathUsed: any = actor.itemTypes.effect.find((effect) => effect.slug === "deliberate-death-used");
    if (deliberateDeath && (!deliberateDeathUsed || deliberateDeathUsed.isExpired)) {
        const effect: any = {
            type: "effect",
            name: game.i18n.localize(`${MODULENAME}.effects.deliberateDeathUsed`),
            img: "icons/skills/melee/strike-dagger-skull-white.webp",
            system: {
                slug: "deliberate-death-used",
                tokenIcon: {
                    show: false,
                },
                duration: {
                    value: 24,
                    unit: "hours",
                    sustained: false,
                    expiry: "turn-start",
                },
            },
        };
        effectsToCreate.push(effect);

        handleAsync(
            ChatMessage.create({
                flavor: game.i18n.format(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.deliberateDeathMessage`, {
                    name: name,
                }),
                speaker: ChatMessage.getSpeaker({ actor: <any>actor }),
                whisper:
                    systems.getSystemSetting<boolean>("metagame", "secretDamage") && !actor?.hasPlayerOwner
                        ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                        : [],
            }),
            "handleDeliberateDeath ChatMessage",
        );
    }
}

export async function handleDyingOnZeroHP(
    actor: any,
    update: Record<string, string>,
    hp: number,
    updateHp: number,
    autogainDying: string,
): Promise<boolean> {
    if (!shouldIHandleThis(actor) || hp <= 0 || updateHp > 0) {
        return updateHp > 0;
    }

    const name = `${actor.token?.name ?? actor.name}`;
    let shouldIncreaseWounded = false;
    let dyingCounter = 0;
    let hpNowAboveZero = false;
    const effectsToCreate: any[] = [];
    const nonlethalOption = String(game.settings.get(MODULENAME, "nonLethalIsNotLethal"));

    const __ret = handleOrcFerocity(actor, update, effectsToCreate, name, shouldIncreaseWounded, hpNowAboveZero);
    shouldIncreaseWounded = __ret.shouldIncreaseWounded;
    hpNowAboveZero = __ret.hpNowAboveZero;

    handleDeliberateDeath(actor, effectsToCreate, name);

    if (
        !hpNowAboveZero &&
        (autogainDying.endsWith("ForCharacters") ? ["character", "familiar"].includes(actor.type) : true)
    ) {
        if (autogainDying?.startsWith("addWoundedLevel")) {
            dyingCounter = (actor.getCondition("wounded")?.value ?? 0) + 1;
        } else {
            dyingCounter = 1;
        }
    }

    if (checkIfLatestDamageMessageIsCriticalHitByEnemy(actor, autogainDying)) {
        dyingCounter += 1;
    }

    if (hpNowAboveZero) {
        await actor.update(update);
    }

    if (shouldIncreaseWounded) {
        await actor.increaseCondition("wounded");
    }

    if (
        String(game.settings.get(MODULENAME, "nonLethalIsNotLethal")).endsWith("ForCharacters")
            ? ["character", "familiar"].includes(actor.type)
            : true
    ) {
        if (!hpNowAboveZero && checkIfLatestDamageMessageIsNonlethal(actor, nonlethalOption)) {
            if (!actor.hasCondition("unconscious")) {
                await actor.toggleCondition("unconscious");
            }
            dyingCounter = 0;
        }
    }

    handleAsync(handleDying(dyingCounter, 0, actor), "handleDyingOnZeroHP handleDying");

    if (effectsToCreate.length > 0) {
        await actor.createEmbeddedDocuments("Item", effectsToCreate);
    }

    return hpNowAboveZero;
}

export async function giveWoundedWhenDyingRemoved(item: ItemPF2e) {
    const actor = item.parent;
    if (isFirstGM() && item.slug === "dying" && actor) {
        const items: any = actor.items;
        let bounceBack: any = false,
            bounceBackUsed: any = false,
            numbToDeath: any = false,
            numbToDeathUsed: any = false;
        if (items) {
            bounceBack = items.find((feat: { slug: string }) => feat.slug === "bounce-back"); // TODO https://2e.aonprd.com/Feats.aspx?ID=1441
            bounceBackUsed = actor.itemTypes.effect.find((effect) => effect.slug === "bounce-back-used") ?? false;

            numbToDeath = items.find((feat: { slug: string }) => feat.slug === "numb-to-death"); // TODO https://2e.aonprd.com/Feats.aspx?ID=1182
            numbToDeathUsed = actor.itemTypes.effect.find((effect) => effect.slug === "numb-to-death-used") ?? false;
        }
        const name = `${actor.token?.name ?? actor.name}`;

        if (numbToDeath && (!numbToDeathUsed || numbToDeathUsed.isExpired)) {
            const effect: any = {
                type: "effect",
                name: game.i18n.localize(`${MODULENAME}.effects.numbToDeathUsed`),
                img: "icons/magic/death/hand-dirt-undead-zombie.webp",
                system: {
                    slug: "numb-to-death-used",
                    tokenIcon: {
                        show: false,
                    },
                    duration: {
                        value: 24,
                        unit: "hours",
                        sustained: false,
                        expiry: "turn-start",
                    },
                },
            };

            handleAsync(
                ChatMessage.create({
                    flavor: game.i18n.format(`${MODULENAME}.SETTINGS.giveWoundedWhenDyingRemoved.numbToDeathMessage`, {
                        name: name,
                    }),
                    speaker: ChatMessage.getSpeaker({ token: <any>actor.token }),
                    whisper:
                        systems.getSystemSetting<boolean>("metagame", "secretDamage") && !actor?.hasPlayerOwner
                            ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                            : [],
                }),
                "giveWoundedWhenDyingRemoved ChatMessage",
            );

            await actor.createEmbeddedDocuments("Item", [effect]);
        } else if (bounceBack && (!bounceBackUsed || bounceBackUsed.isExpired)) {
            const effect: any = {
                type: "effect",
                name: game.i18n.localize(`${MODULENAME}.effects.bounceBackUsed`),
                img: "icons/magic/life/ankh-gold-blue.webp",
                system: {
                    slug: "bounce-back-used",
                    tokenIcon: {
                        show: false,
                    },
                    duration: {
                        value: 24,
                        unit: "hours",
                        sustained: false,
                        expiry: "turn-start",
                    },
                },
            };

            await actor.createEmbeddedDocuments("Item", [effect]);
        } else {
            await item.parent?.increaseCondition("wounded");
        }
    }
}

export async function giveUnconsciousIfDyingRemovedAt0HP(item: ItemPF2e) {
    const actor = <ActorPF2e>item.parent;
    if (
        isFirstGM() &&
        item.slug === "dying" &&
        game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP") &&
        (<ActorSystemData>actor.system).attributes?.hp?.value === 0 &&
        !actor.hasCondition("unconscious")
    ) {
        if (!actor.hasCondition("unconscious")) {
            await item.parent?.toggleCondition("unconscious");
        }
    }
}

export function dyingHandlingCreateChatMessageHook(message: ChatMessagePF2e) {
    const autoGainDying = String(game.settings.get(MODULENAME, "autoGainDyingIfTakingDamageWhenAlreadyDying"));
    if (autoGainDying && !autoGainDying.startsWith("no")) {
        const actor = message.actor;
        if (actor && shouldIHandleThis(actor)) {
            if (message.content?.includes("damage-taken")) {
                const now = Date.now();
                const flag = <number>actor.getFlag(MODULENAME, "dyingLastApplied") || now;
                logDebug(`dyingLastApplied is ${flag}, now is ${now}`);
                // Ignore this if it occurs within last few seconds of the last time we applied dying
                const notTooSoon = !flag?.between(now - 4000, now);
                if (notTooSoon) {
                    const originalDyingCounter = actor?.getCondition("dying")?.value ?? 0;
                    let dyingCounter = 0;
                    if (!autoGainDying.startsWith("no") && originalDyingCounter > 0) {
                        const wasCritical = checkIfLatestDamageMessageIsCriticalHitByEnemy(actor, autoGainDying);

                        if (
                            autoGainDying.endsWith("ForCharacters")
                                ? ["character", "familiar"].includes(actor.type)
                                : true
                        ) {
                            dyingCounter = dyingCounter + 1;

                            if (wasCritical) {
                                dyingCounter = dyingCounter + 1;
                            }
                        }
                        logDebug(
                            `Before handleDying dyingLastApplied is ${flag}, now is ${now}, dyingCounter was ${originalDyingCounter} will increase by ${dyingCounter}`,
                        );

                        handleAsync(
                            handleDying(dyingCounter, originalDyingCounter, actor),
                            "dyingHandlingCreateChatMessageHook handleDying",
                        );
                    }
                }
            }
        }
    }
}

export function checkIfLatestDamageMessageIsNonlethal(actor: ActorPF2e, option: string): boolean {
    const hp = actor.attributes.hp;
    if (
        hp &&
        hp.value &&
        game.messages.contents.length > 0 &&
        !option.startsWith("no") &&
        (option.endsWith("ForCharacters") ? ["character", "familiar"].includes(actor.type) : true)
    ) {
        const relevant = getRelevantMessages(actor);
        const lastDamageRoll = relevant.findLast(
            (message) => systems.getFlag(message, "context.type") === "damage-roll",
        );
        const totalDamage = lastDamageRoll?.rolls?.[0]?.total ?? 0;
        const isNonlethal = lastDamageRoll
            ? (systems.getFlag<string[]>(lastDamageRoll, "context.options") ?? []).includes("nonlethal")
            : false;
        return (totalDamage >= hp.value && isNonlethal) ?? false;
    }
    return false;
}
