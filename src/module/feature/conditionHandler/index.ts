import { CombatantPF2e } from "@module/encounter";
import { isFirstGM, shouldIHandleThis } from "../../utils";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { ActorPF2e } from "@actor";
import { ItemPF2e, WeaponPF2e } from "@item";

export async function reduceFrightened(combatant: CombatantPF2e, userId: string) {
    if (combatant && combatant.actor && (userId === game.user.id || shouldIHandleThis(combatant.actor))) {
        const actors = [combatant.actor];
        actors.push(...getMinionAndEidolons(combatant.actor));
        for (const actor of actors) {
            const minimumFrightened = <number>actor?.getFlag(MODULENAME, "condition.frightened.min") ?? 0;
            const currentFrightened = actor?.getCondition("frightened")?.value ?? 0;
            if (currentFrightened - 1 >= minimumFrightened) {
                await actor.decreaseCondition("frightened");
            }
        }
    }
}

export async function increaseDyingOnZeroHP(
    actor: ActorPF2e,
    update: Record<string, string>,
    hp: number
): Promise<boolean> {
    if (shouldIHandleThis(actor) && hp > 0 && getProperty(update, "system.attributes.hp.value") <= 0) {
        const orcFerocity = actor.items.find((feat) => feat.slug === "orc-ferocity");
        const orcFerocityUsed: any = actor.items.find((effect) => effect.slug === "orc-ferocity-used");
        const incredibleFerocity = actor.items.find((feat) => feat.slug === "incredible-ferocity");
        const undyingFerocity = actor.items.find((feat) => feat.slug === "undying-ferocity");
        const rampagingFerocity = actor.items.find((feat) => feat.slug === "rampaging-ferocity");
        const deliberateDeath = actor.items.find((feat) => feat.slug === "deliberate-death");
        const deliberateDeathUsed: any = actor.items.find((effect) => effect.slug === "deliberate-death-used");
        const name = `${actor.token?.name ?? actor.name}`;

        if (orcFerocity && (!orcFerocityUsed || orcFerocityUsed.isExpired)) {
            setProperty(update, "system.attributes.hp.value", 1);
            if (undyingFerocity) {
                setProperty(update, "system.attributes.hp.temp", Math.max(actor.level, actor.hitPoints?.temp ?? 0));
            }
            await actor.increaseCondition("wounded");

            const effect: any = {
                type: "effect",
                name: game.i18n.localize(`${MODULENAME}.effects.orcFerocityUsed`),
                img: "systems/pf2e/icons/default-icons/alternatives/ancestries/orc.svg",
                data: {
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
            await actor.createEmbeddedDocuments("Item", [effect]);

            if (rampagingFerocity) {
                ChatMessage.create({
                    flavor: game.i18n.format(`$MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.orcFerocityMessage`, {
                        name: name,
                    }),
                    speaker: ChatMessage.getSpeaker({ actor: <any>actor }),
                    whisper:
                        game.settings.get("pf2e", "metagame.secretDamage") && !actor?.hasPlayerOwner
                            ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                            : [],
                }).then();
            }

            await actor.update(update);
            return false;
        }

        if (deliberateDeath && (!deliberateDeathUsed || deliberateDeathUsed.isExpired)) {
            const effect: any = {
                type: "effect",
                name: game.i18n.localize(`${MODULENAME}.effects.deliberateDeathUsed`),
                img: "icons/skills/melee/strike-dagger-skull-white.webp",
                data: {
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
            await actor.createEmbeddedDocuments("Item", [effect]);

            await ChatMessage.create({
                flaver: game.i18n.format(`$MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.orcFerocityMessage`, {
                    name: name,
                }),
                speaker: ChatMessage.getSpeaker({ actor: <any>actor }),
                whisper:
                    game.settings.get("pf2e", "metagame.secretDamage") && !actor?.hasPlayerOwner
                        ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                        : [],
            });
        }

        let value = 1;
        const option = <string>game.settings.get(MODULENAME, "autoGainDyingAtZeroHP");
        if (option.endsWith("ForCharacters") ? ["character", "familiar"].includes(actor.type) : true) {
            if (option?.startsWith("addWoundedLevel")) {
                value = (actor.getCondition("wounded")?.value ?? 0) + 1;
            }
            for (let i = 0; i < Math.max(1, value); i++) {
                await actor.increaseCondition("dying");
            }
        }
    }
    return true;
}

export async function removeDyingOnZeroHP(
    actor: ActorPF2e,
    update: Record<string, string>,
    hp: number
): Promise<boolean> {
    if (shouldIHandleThis(actor) && hp <= 0 && getProperty(update, "system.attributes.hp.value") > 0) {
        const value = actor.getCondition("dying")?.value || 0;
        const option = <string>game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP");
        if (option.endsWith("ForCharacters") ? ["character", "familiar"].includes(actor.type) : true) {
            for (let i = 0; i < Math.max(1, value); i++) {
                await actor.decreaseCondition("dying");
            }
        }
    }
    return true;
}

export async function autoRemoveUnconsciousAtGreaterThanZeroHP(
    actor: ActorPF2e,
    update: Record<string, string>,
    hp: number
): Promise<void> {
    if (
        shouldIHandleThis(actor) &&
        hp <= 0 &&
        getProperty(update, "system.attributes.hp.value") > 0 &&
        actor.hasCondition("unconscious")
    ) {
        await actor.decreaseCondition("unconscious", { forceRemove: true });
    }
}

function getMinionAndEidolons(actor: ActorPF2e): ActorPF2e[] {
    const actors: ActorPF2e[] = [];
    if (actor.isOfType("character")) {
        const minionsAndEidolons = <ActorPF2e[]>game.scenes.current?.tokens
            ?.filter(() => !game.user.isGM)
            ?.filter((token) => token.canUserModify(game.user, "update"))
            ?.map((token) => token.actor)
            ?.filter((x) => x?.traits.has("eidolon") || x?.traits.has("minion"));
        if (minionsAndEidolons && minionsAndEidolons.length > 0) {
            actors.push(...(<ActorPF2e[]>minionsAndEidolons));
        }
    }
    return actors;
}

export async function giveWoundedWhenDyingRemoved(item: ItemPF2e) {
    const actor = <ActorPF2e>item.parent;
    const bounceBack = actor.items.find((feat) => feat.slug === "bounce-back"); // TODO https://2e.aonprd.com/Feats.aspx?ID=1441
    const bounceBackUsed: any = actor.items.find((effect) => effect.slug === "bounce-back-used") ?? false;

    const numbToDeath = actor.items.find((feat) => feat.slug === "numb-to-death"); // TODO https://2e.aonprd.com/Feats.aspx?ID=1182
    const numbToDeathUsed: any = actor.items.find((effect) => effect.slug === "numb-to-death-used") ?? false;
    const name = `${actor.token?.name ?? actor.name}`;

    if (item.slug === "dying" && isFirstGM()) {
        if (numbToDeath && (!numbToDeathUsed || bounceBackUsed.isExpired)) {
            const effect: any = {
                type: "effect",
                name: game.i18n.localize(`${MODULENAME}.effects.numbToDeathUsed`),
                img: "icons/magic/death/hand-dirt-undead-zombie.webp",
                data: {
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
                flavor: game.i18n.format(`$MODULENAME}.SETTINGS.giveWoundedWhenDyingRemoved.numbToDeathMessage`, {
                    name: name,
                }),
                speaker: ChatMessage.getSpeaker({ actor: <any>actor }),
                whisper:
                    game.settings.get("pf2e", "metagame.secretDamage") && !actor?.hasPlayerOwner
                        ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                        : [],
            }).then();

            await actor.createEmbeddedDocuments("Item", [effect]);
        } else if (bounceBack && (!bounceBackUsed || bounceBackUsed.isExpired)) {
            const effect: any = {
                type: "effect",
                name: game.i18n.localize(`${MODULENAME}.effects.bounceBackUsed`),
                img: "icons/magic/life/ankh-gold-blue.webp",
                data: {
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
        actor.system.attributes?.hp?.value === 0 &&
        !actor.hasCondition("unconscious")
    ) {
        if (!actor.hasCondition("unconscious")) {
            await item.parent?.toggleCondition("unconscious");
        }
    }
}

export function applyEncumbranceBasedOnBulk(item: ItemPF2e) {
    const physicalTypes = ["armor", "backpack", "book", "consumable", "equipment", "treasure", "weapon"];
    if (isFirstGM() && physicalTypes.includes(item.type) && item.actor) {
        if (item.actor.inventory.bulk.isEncumbered) {
            if (!item.actor.hasCondition("encumbered")) {
                item.actor.increaseCondition("encumbered").then();
            }
        } else {
            if (item.actor.hasCondition("encumbered")) {
                item.actor.decreaseCondition("encumbered", { forceRemove: true }).then();
            }
        }
    }
}

export function applyClumsyIfWieldingLargerWeapon(item: ItemPF2e, _update: DocumentUpdateData) {
    if (isFirstGM() && ["weapon"].includes(item.type) && item.actor) {
        const actorSize = item.actor.system.traits.size;
        const weaponSize = (<WeaponPF2e>item).system.size;
        if (actorSize.isSmallerThan(weaponSize, { smallIsMedium: true })) {
            const heldInHands = ((<WeaponPF2e>_update).system.equipped.handsHeld ?? 0) > 0;
            if ((<WeaponPF2e>item).isEquipped && (heldInHands ?? true)) {
                if (!item.actor.hasCondition("clumsy")) {
                    item.actor.increaseCondition("clumsy", { min: 1, max: 1 }).then();
                }
            } else {
                if ((item.actor.getCondition("clumsy")?.value ?? 0) === 1) {
                    item.actor.decreaseCondition("clumsy").then();
                }
            }
        }
    }
}
