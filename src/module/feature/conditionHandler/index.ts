import { ActorPF2e } from "@actor";
import { isFirstGM, shouldIHandleThis } from "../../utils.js";
import { CombatantPF2e } from "@module/encounter/index.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { ActorSystemData } from "@actor/data/base.js";
import { handleDying } from "../../hooks.js";
import { CreaturePF2e } from "@actor/creature/document.js";
import { ChatMessagePF2e } from "@module/chat-message/document.js";
import { ItemPF2e } from "@item/base/document.js";
import BaseUser = foundry.documents.BaseUser;

export async function reduceFrightened(combatant: CombatantPF2e, userId: string) {
    if (!combatant || !combatant.actor || (userId !== game.user.id && !shouldIHandleThis(combatant.actor))) {
        return;
    }

    const actors: ActorPF2e[] = [combatant.actor, ...getMinionAndEidolons(combatant.actor)];

    for (const actor of actors) {
        const minimumFrightened = <number>(actor?.getFlag(MODULENAME, "condition.frightened.min") ?? 0);
        const frightened = actor.getCondition("frightened");
        const currentFrightened = frightened?.value ?? 0;

        if (frightened && currentFrightened > 0 && !frightened.isLocked) {
            const reduceBy = actor.itemTypes.feat.some((feat) => feat.slug === "dwarven-doughtiness") ? 2 : 1;

            for (let i = 0; i < reduceBy && currentFrightened - i > minimumFrightened; i++) {
                await actor.decreaseCondition("frightened");
            }
        }
    }
}

function getRelevantMessages(actor: ActorPF2e): ChatMessagePF2e[] {
    const relevant = game.messages.contents.slice(-Math.min(10, game.messages.size));
    return game.settings.get(MODULENAME, "autoGainDyingIgnoresTargeting")
        ? relevant
        : relevant.filter((message) => message.target?.actor.id === actor.id);
}

function filterMessagesByContextType(messages: ChatMessagePF2e[], contextType: string): ChatMessagePF2e[] {
    return messages.filter((message) => message.flags.pf2e.context?.type === contextType);
}

function filterMessagesByStrikeDamaging(messages: ChatMessagePF2e[]): ChatMessagePF2e[] {
    return messages.filter((message) => message.flags.pf2e.strike?.damaging);
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
        const lastDamageRoll = relevant.findLast((message) => message.flags.pf2e.context?.type === "damage-roll");
        const totalDamage = lastDamageRoll?.rolls?.[0]?.total ?? 0;
        return (totalDamage >= hp.value && lastDamageRoll?.item?.system?.traits?.value?.includes("nonlethal")) ?? false;
    }
    return false;
}

function filterMessagesByCriticalSuccess(messages: ChatMessagePF2e[]): ChatMessagePF2e[] {
    return messages.filter((message) => message.flags.pf2e.context?.outcome === "criticalSuccess");
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
        setProperty(update, "system.attributes.hp.value", 1);
        if (undyingFerocity) {
            setProperty(update, "system.attributes.hp.temp", Math.max(actor.level, actor.hitPoints?.temp ?? 0));
        }

        shouldIncreaseWounded = true;

        const effect: any = {
            type: "effect",
            name: game.i18n.localize(`${MODULENAME}.effects.orcFerocityUsed`),
            img: "systems/pf2e/icons/default-icons/alternatives/ancestries/orc.svg",
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
            ChatMessage.create({
                flavor: game.i18n.format(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.orcFerocityMessage`, {
                    name: name,
                }),
                speaker: ChatMessage.getSpeaker({ actor: <any>actor }),
                whisper:
                    game.settings.get("pf2e", "metagame_secretDamage") && !actor?.hasPlayerOwner
                        ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                        : [],
            }).then();
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

        ChatMessage.create({
            flavor: game.i18n.format(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.deliberateDeathMessage`, {
                name: name,
            }),
            speaker: ChatMessage.getSpeaker({ actor: <any>actor }),
            whisper:
                game.settings.get("pf2e", "metagame_secretDamage") && !actor?.hasPlayerOwner
                    ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                    : [],
        }).then();
    }
}

export async function handleDyingOnZeroHP(
    actor: CreaturePF2e,
    update: Record<string, string>,
    hp: number,
    updateHp: number,
): Promise<boolean> {
    if (!shouldIHandleThis(actor) || hp <= 0 || updateHp > 0) {
        return updateHp > 0;
    }

    const name = `${actor.token?.name ?? actor.name}`;
    let shouldIncreaseWounded = false;
    let dyingCounter = 0;
    let hpNowAboveZero = false;
    const effectsToCreate: any[] = [];
    const dyingOption = String(game.settings.get(MODULENAME, "autoGainDyingAtZeroHP"));
    const nonlethalOption = String(game.settings.get(MODULENAME, "nonLethalIsNotLethal"));

    const __ret = handleOrcFerocity(actor, update, effectsToCreate, name, shouldIncreaseWounded, hpNowAboveZero);
    shouldIncreaseWounded = __ret.shouldIncreaseWounded;
    hpNowAboveZero = __ret.hpNowAboveZero;

    handleDeliberateDeath(actor, effectsToCreate, name);

    if (
        !hpNowAboveZero &&
        (dyingOption.endsWith("ForCharacters") ? ["character", "familiar"].includes(actor.type) : true)
    ) {
        if (dyingOption?.startsWith("addWoundedLevel")) {
            dyingCounter = (actor.getCondition("wounded")?.value ?? 0) + 1;
        } else {
            dyingCounter = 1;
        }
    }

    if (checkIfLatestDamageMessageIsCriticalHitByEnemy(actor, dyingOption)) {
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

    handleDying(dyingCounter, 0, actor, effectsToCreate);

    if (effectsToCreate.length > 0) {
        await actor.createEmbeddedDocuments("Item", effectsToCreate);
    }

    return hpNowAboveZero;
}

export async function autoRemoveDyingAtGreaterThanZeroHp(actor: ActorPF2e, hpAboveZero: boolean): Promise<boolean> {
    let dying = actor.getCondition("dying");
    if (shouldIHandleThis(actor) && dying && !dying.isLocked && hpAboveZero) {
        const value = dying?.value || 0;
        if (dying && value > 0 && !dying.isLocked) {
            const option = String(game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP"));
            if (option.endsWith("ForCharacters") ? ["character", "familiar"].includes(actor.type) : true) {
                for (let i = 0; i < Math.max(1, value); i++) {
                    dying = actor.getCondition("dying");
                    if (dying && !dying.isLocked) {
                        await actor.decreaseCondition("dying");
                    }
                }
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

function getMinionAndEidolons(actor: ActorPF2e): ActorPF2e[] {
    const actors: ActorPF2e[] = [];
    if (actor.isOfType("character")) {
        // @ts-ignore
        const minionsAndEidolons = <ActorPF2e[]>game.scenes.current?.tokens
            ?.filter(() => !game.user.isGM)
            ?.filter((token) => token.canUserModify(<BaseUser>game.user, "update"))
            ?.map((token) => token.actor)
            ?.filter((x) => x?.traits.has("eidolon") || x?.traits.has("minion"));
        if (minionsAndEidolons && minionsAndEidolons.length > 0) {
            actors.push(...(<ActorPF2e[]>minionsAndEidolons));
        }
    }
    return actors;
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
            bounceBack = items.find((feat) => feat.slug === "bounce-back"); // TODO https://2e.aonprd.com/Feats.aspx?ID=1441
            bounceBackUsed = actor.itemTypes.effect.find((effect) => effect.slug === "bounce-back-used") ?? false;

            numbToDeath = items.find((feat) => feat.slug === "numb-to-death"); // TODO https://2e.aonprd.com/Feats.aspx?ID=1182
            numbToDeathUsed = actor.itemTypes.effect.find((effect) => effect.slug === "numb-to-death-used") ?? false;
        }
        const name = `${actor.token?.name ?? actor.name}`;

        if (numbToDeath && (!numbToDeathUsed || bounceBackUsed.isExpired)) {
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

            ChatMessage.create({
                flavor: game.i18n.format(`${MODULENAME}.SETTINGS.giveWoundedWhenDyingRemoved.numbToDeathMessage`, {
                    name: name,
                }),
                speaker: ChatMessage.getSpeaker({ token: <any>actor.token }),
                whisper:
                    game.settings.get("pf2e", "metagame_secretDamage") && !actor?.hasPlayerOwner
                        ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                        : [],
            }).then();

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
