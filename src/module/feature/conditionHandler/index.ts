import { CombatantPF2e } from "@module/encounter";
import { isFirstGM, shouldIHandleThis } from "../../utils";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { ActorSystemData } from "@actor/data/base";
import BaseUser = foundry.documents.BaseUser;

export async function reduceFrightened(combatant: CombatantPF2e, userId: string) {
    if (combatant && combatant.actor && (userId === game.user.id || shouldIHandleThis(combatant.actor))) {
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

export async function increaseDyingOnZeroHP(
    actor: ActorPF2e,
    update: Record<string, string>,
    hp: number,
    updateHp: number
): Promise<boolean> {
    if (shouldIHandleThis(actor) && hp > 0 && updateHp <= 0) {
        const orcFerocity = actor.itemTypes.feat.find((feat) => feat.slug === "orc-ferocity");
        const orcFerocityUsed: any = actor.itemTypes.effect.find((effect) => effect.slug === "orc-ferocity-used");
        const incredibleFerocity = actor.itemTypes.feat.find((feat) => feat.slug === "incredible-ferocity");
        const undyingFerocity = actor.itemTypes.feat.find((feat) => feat.slug === "undying-ferocity");
        const rampagingFerocity = actor.itemTypes.feat.find((feat) => feat.slug === "rampaging-ferocity");
        const deliberateDeath = actor.itemTypes.feat.find((feat) => feat.slug === "deliberate-death");
        const deliberateDeathUsed: any = actor.itemTypes.effect.find(
            (effect) => effect.slug === "deliberate-death-used"
        );
        const name = `${actor.token?.name ?? actor.name}`;
        let shouldIncreaseWounded = false;
        let dyingCounter = 0;
        let hpNowAboveZero = false;
        const effectsToCreate: any[] = [];

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

        const option = <string>game.settings.get(MODULENAME, "autoGainDyingAtZeroHP");
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
        if (hpNowAboveZero) {
            actor.update(update).then();
        }
        if (effectsToCreate.length > 0) {
            actor.createEmbeddedDocuments("Item", effectsToCreate).then();
        }
        if (shouldIncreaseWounded) {
            actor.increaseCondition("wounded").then();
        }
        if (dyingCounter > 0) {
            actor.increaseCondition("dying", { min: dyingCounter, max: dyingCounter }).then();
        }
        return hpNowAboveZero;
    }
    return updateHp > 0;
}

export async function autoRemoveDyingAtGreaterThanZeroHp(actor: ActorPF2e, hpAboveZero: boolean): Promise<boolean> {
    let dying = actor.getCondition("dying");
    if (dying && !dying.isLocked && hpAboveZero && shouldIHandleThis(actor)) {
        const value = dying?.value || 0;
        if (dying && value > 0 && !dying.isLocked) {
            const option = <string>game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP");
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
    if (unconscious && !unconscious.isLocked && hpRaisedAboveZero && shouldIHandleThis(actor)) {
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
