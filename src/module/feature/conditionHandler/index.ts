import { ActorPF2e } from "@actor";
import { isFirstGM } from "../../utils.js";
import { CombatantPF2e } from "@module/encounter/index.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { ItemPF2e } from "@item/base.js";
import { ActorSystemData } from "@actor/data/base.js";
import { handleDying } from "../../hooks.js";
import BaseUser = foundry.documents.BaseUser;

export async function reduceFrightened(combatant: CombatantPF2e, userId: string) {
    if (combatant && combatant.actor && (userId === game.user.id || game.user === combatant.actor?.primaryUpdater)) {
        const actors = [combatant.actor];
        actors.push(...getMinionAndEidolons(combatant.actor));
        for (const actor of actors) {
            const minimumFrightened = <number>actor?.getFlag(MODULENAME, "condition.frightened.min") ?? 0;
            let frightened = actor?.getCondition("frightened");
            const currentFrightened = frightened?.value ?? 0;
            if (frightened && currentFrightened > 0 && !frightened.isLocked) {
                const reduceBy = actor.itemTypes.feat.find((feat) => feat.slug === "dwarven-doughtiness") ? 2 : 1;
                for (let i = 0; i < reduceBy; i++) {
                    frightened = actor?.getCondition("frightened");
                    if (currentFrightened - 1 >= minimumFrightened && frightened && !frightened.isLocked) {
                        await actor.decreaseCondition("frightened");
                    }
                }
            }
        }
    }
}

export function checkIfLatestDamageMessageIsCriticalSuccess(actor: ActorPF2e, option: string): boolean {
    let isCriticalSuccess = false;
    if (
        !option.startsWith("no") && option.endsWith("ForCharacters")
            ? ["character", "familiar"].includes(actor.type)
            : true
    ) {
        const hp = actor.attributes.hp;
        if (hp === undefined || hp.value === undefined) {
            return false;
        }
        const reverse = game.messages.contents.slice(-Math.min(10, game.messages.size)).reverse();
        const rightActor = reverse.filter((message) => message.target?.actor.id === actor.id);
        const isEnemy = rightActor.filter((message) => {
            return message.actor?.isEnemyOf(<ActorPF2e>message.target?.actor);
        });
        const isRoll = isEnemy.filter((message) => message.type === CONST.CHAT_MESSAGE_TYPES.ROLL);
        const isAttack = isRoll
            // @ts-ignore
            .filter((message) => message.flags.pf2e.context?.sourceType === "attack");
        const isDamageRoll = isAttack
            // @ts-ignore
            .filter((message) => message.flags.pf2e.context?.type === "damage-roll");
        const isDamaging = isDamageRoll.filter((message) => message.flags.pf2e.strike?.damaging);
        const greaterThanHP = isDamaging.filter((message) => message.rolls?.[0]?.total >= hp.value);

        isCriticalSuccess =
            greaterThanHP && greaterThanHP.length > 0
                ? greaterThanHP?.[0].flags?.pf2e?.context?.["outcome"] === "criticalSuccess"
                : false;
    }
    return isCriticalSuccess;
}

function checkIfLatestDamageMessageIsNonlethal(actor: ActorPF2e, option: string): boolean {
    let isNonlethal = false;
    if (
        !option.startsWith("no") && option.endsWith("ForCharacters")
            ? ["character", "familiar"].includes(actor.type)
            : true
    ) {
        const hp = actor.attributes.hp;
        if (hp === undefined || hp.value === undefined) {
            return false;
        }
        const reverse = game.messages.contents.slice(-Math.min(10, game.messages.size)).reverse();
        const rightActor = reverse.filter((message) => message.target?.actor.id === actor.id);
        const isRoll = rightActor.filter((message) => message.type === CONST.CHAT_MESSAGE_TYPES.ROLL);
        const isAttack = isRoll
            // @ts-ignore
            .filter((message) => message.flags.pf2e.context?.sourceType === "attack");
        const isDamageRoll = isAttack
            // @ts-ignore
            .filter((message) => message.flags.pf2e.context?.type === "damage-roll");
        const isDamaging = isDamageRoll.filter((message) => message.flags.pf2e.strike?.damaging);
        const greaterThanHP = isDamaging.filter((message) => message.rolls?.[0]?.total >= hp.value);

        isNonlethal =
            greaterThanHP && greaterThanHP.length > 0
                ? greaterThanHP?.[0].item?.system?.traits?.value.includes("nonlethal") ?? false
                : false;
    }
    return isNonlethal;
}

export function handleOrcFerocity(
    actor: ActorPF2e,
    update: Record<string, string>,
    effectsToCreate: any[],
    name: string,
    shouldIncreaseWounded = true,
    hpNowAboveZero = false
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

export async function increaseDyingOnZeroHP(
    actor: ActorPF2e,
    update: Record<string, string>,
    hp: number,
    updateHp: number
): Promise<boolean> {
    if (game.user === actor?.primaryUpdater && hp > 0 && updateHp <= 0) {
        const name = `${actor.token?.name ?? actor.name}`;
        let shouldIncreaseWounded = false;
        let dyingCounter = 0;
        let hpNowAboveZero = false;
        const effectsToCreate: any[] = [];
        const option = String(game.settings.get(MODULENAME, "autoGainDyingAtZeroHP"));

        const __ret = handleOrcFerocity(actor, update, effectsToCreate, name, shouldIncreaseWounded, hpNowAboveZero);
        shouldIncreaseWounded = __ret.shouldIncreaseWounded;
        hpNowAboveZero = __ret.hpNowAboveZero;
        handleDeliberateDeath(actor, effectsToCreate, name);

        if (
            !hpNowAboveZero &&
            (option.endsWith("ForCharacters") ? ["character", "familiar"].includes(actor.type) : true)
        ) {
            if (option?.startsWith("addWoundedLevel")) {
                dyingCounter = (actor.getCondition("wounded")?.value ?? 0) + 1;
            } else {
                dyingCounter = 1;
            }
        }
        if (checkIfLatestDamageMessageIsCriticalSuccess(actor, option)) {
            dyingCounter = dyingCounter + 1;
        }
        if (hpNowAboveZero) {
            actor.update(update).then();
        }
        if (effectsToCreate.length > 0) {
            actor.createEmbeddedDocuments("Item", effectsToCreate).then();
        }
        if (shouldIncreaseWounded) {
            actor.increaseCondition("wounded").then();
        }

        if (
            String(game.settings.get(MODULENAME, "nonLethalIsNotLethal")).endsWith("ForCharacters")
                ? ["character", "familiar"].includes(actor.type)
                : true
        ) {
            if (dyingCounter > 0 && checkIfLatestDamageMessageIsNonlethal(actor, option)) {
                if (!actor.hasCondition("unconscious")) {
                    actor.toggleCondition("unconscious").then();
                }
                dyingCounter = 0;
            }
        }

        handleDying(dyingCounter, 0, actor);
        return hpNowAboveZero;
    }
    return updateHp > 0;
}

export async function autoRemoveDyingAtGreaterThanZeroHp(actor: ActorPF2e, hpAboveZero: boolean): Promise<boolean> {
    let dying = actor.getCondition("dying");
    if (game.user === actor?.primaryUpdater && dying && !dying.isLocked && hpAboveZero) {
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
    hpRaisedAboveZero: boolean
): Promise<void> {
    const unconscious = actor.getCondition("unconscious");
    if (game.user === actor?.primaryUpdater && hpRaisedAboveZero && unconscious && !unconscious.isLocked) {
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

export async function applyEncumbranceBasedOnBulk(item: ItemPF2e) {
    // TODO Not sure if it should be backpack or container, so, adding both
    const physicalTypes = ["armor", "backpack", "container", "book", "consumable", "equipment", "treasure", "weapon"];
    if (isFirstGM() && physicalTypes.includes(item.type) && item.actor) {
        // Sleep 0.25s to handle race condition
        await new Promise((resolve) => setTimeout(resolve, 250));
        if (item.actor.inventory.bulk.isEncumbered) {
            if (!item.actor.hasCondition("encumbered")) {
                await item.actor.toggleCondition("encumbered");
            }
        } else {
            const encumbered = item.actor.getCondition("encumbered");
            if (encumbered && !encumbered.isLocked) {
                await item.actor.toggleCondition("encumbered");
            }
        }
    }
}
