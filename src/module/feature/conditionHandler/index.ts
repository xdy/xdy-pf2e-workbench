import { CombatantPF2e } from "@module/encounter";
import { isFirstGM, shouldIHandleThis } from "../../utils";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { ActorPF2e, CharacterPF2e } from "@actor";
import { ItemPF2e } from "@item";

export async function reduceFrightened(combatant: CombatantPF2e, userId: string) {
    if (combatant && combatant.actor && (userId === game.user.id || shouldIHandleThis(combatant.actor))) {
        const actors = [combatant.actor];
        actors.push(...getMinions(combatant.actor));
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
                await ChatMessage.create({
                    flavor: game.i18n.format(
                        `${
                            actor.token?.name ?? actor.name
                        } has just used Orc Ferocity and can now use the free action: ${TextEditor.enrichHTML(
                            `@Compendium[pf2e.actionspf2e.FkfWKq9jhhPzKAbb]{Rampaging Ferocity}`,
                            { async: false }
                        )}.`
                    ),
                    speaker: ChatMessage.getSpeaker({ actor: actor }),
                    whisper:
                        game.settings.get("pf2e", "metagame.secretDamage") && !actor?.hasPlayerOwner
                            ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                            : [],
                });
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
                flavor: game.i18n.format(
                    `${
                        actor.token?.name ?? actor.name
                    } can <b>before gaining Dying</b> as a result of another creature's attack or ability, if that creature is within melee reach, make a melee Strike against the triggering creature.<br>Remove 'Deliberate Death Used' effect if it actually can't be used.`
                ),
                speaker: ChatMessage.getSpeaker({ actor: actor }),
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

function getMinions(actor: ActorPF2e): ActorPF2e[] {
    const actors: ActorPF2e[] = [];
    if (actor.isOfType("character")) {
        if ((<CharacterPF2e>actor).familiar) {
            actors.push(<ActorPF2e>(<CharacterPF2e>actor).familiar);
        }
        const eidolons = <ActorPF2e[]>game.scenes.current?.tokens
            ?.filter(() => !game.user.isGM)
            ?.filter((token) => token.canUserModify(game.user, "update"))
            ?.map((token) => token.actor)
            ?.filter((x) => x?.traits.has("eidolon"));
        if (eidolons && eidolons.length > 0) {
            actors.push(...(<ActorPF2e[]>eidolons));
        }
        const animalCompanions = game.scenes.current?.tokens
            ?.filter(() => !isFirstGM())
            ?.filter((token) => token.canUserModify(game.user, "update"))
            ?.map((token) => token.actor)
            ?.filter((chr: CharacterPF2e) => chr?.class?.name === "Animal Companion");
        if (animalCompanions && animalCompanions.length > 0) {
            actors.push(...(<ActorPF2e[]>animalCompanions));
        }
    }
    return actors;
}

export async function giveWoundedWhenDyingRemoved(item: ItemPF2e) {
    const actor = <ActorPF2e>item.parent;
    const bounceBack = actor.items.find((feat) => feat.slug === "bounce-back"); //TODO https://2e.aonprd.com/Feats.aspx?ID=1441
    const bounceBackUsed: any = actor.items.find((effect) => effect.slug === "bounce-back-used") ?? false;

    const numbToDeath = actor.items.find((feat) => feat.slug === "numb-to-death"); //TODO https://2e.aonprd.com/Feats.aspx?ID=1182
    const numbToDeathUsed: any = actor.items.find((effect) => effect.slug === "numb-to-death-used") ?? false;
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

            await ChatMessage.create({
                flavor: game.i18n.format(
                    `${
                        actor.token?.name ?? actor.name
                    } has just triggered Numb To Death and can now heal ${TextEditor.enrichHTML(
                        `[[/r ${actor.level}]] points of damage.`,
                        { async: false }
                    )}.`
                ),
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                whisper:
                    game.settings.get("pf2e", "metagame.secretDamage") && !actor?.hasPlayerOwner
                        ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                        : [],
            });

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

export async function applyEncumbranceBasedOnBulk(item: ItemPF2e) {
    const physicalTypes = ["armor", "backpack", "book", "consumable", "equipment", "treasure", "weapon"];
    if (isFirstGM() && physicalTypes.includes(item.type) && item.actor) {
        if (item.actor.inventory.bulk.isEncumbered) {
            if (!item.actor.hasCondition("encumbered")) {
                await item.actor.increaseCondition("encumbered");
            }
        } else {
            if (item.actor.hasCondition("encumbered")) {
                await item.actor.decreaseCondition("encumbered", { forceRemove: true });
            }
        }
    }
}
