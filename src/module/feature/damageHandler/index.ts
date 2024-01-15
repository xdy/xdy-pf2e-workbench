import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import {
    degreeOfSuccessWithRerollHandling,
    isActuallyDamageRoll,
    objectHasKey,
    shouldIHandleThisMessage,
} from "../../utils.ts";
import { ChatMessagePF2e } from "@module/chat-message/document.js";
import { ActorFlagsPF2e } from "@actor/data/base.js";

/**
 * Checks if the given message satisfies the conditions to perform a flat check,
 * and returns whether the damage should be rolled or not.
 *
 * @param {ChatMessagePF2e} message - The chat message to check.
 * @return {Promise<boolean>} - A boolean indicating whether to roll the damage.
 */
export async function noOrSuccessfulFlatcheck(message: ChatMessagePF2e): Promise<boolean> {
    let rollDamage = true;
    if (game.modules.get("pf2-flat-check")?.active) {
        const actorFlat =
            message.actor?.itemTypes.condition.filter((x) => ["blinded", "dazzled"].includes(x.slug)) ?? [];
        const targetFlat =
            message.target?.actor.itemTypes.condition.filter((x) =>
                ["concealed", "hidden", "invisible", "undetected"].includes(x.slug),
            ) ?? [];
        if (actorFlat?.length > 0 || targetFlat?.length > 0) {
            const { token, actor } = message;
            let { item } = message;
            const match = message.flags.pf2e?.origin?.uuid?.match(/Item.(\w+)/);
            if (!item && match && match[1] === "xxPF2ExUNARMEDxx") {
                item = { type: "weapon", data: {} } as any;
            }
            if (token && item && actor) {
                if (
                    // Reverse of the check in the pf2-flat-check module
                    !isActuallyDamageRoll(message)
                ) {
                    await new Promise((resolve) => setTimeout(resolve, 150)); // Sleep to wait for flat check message
                    const array = Array.from(game.messages);
                    const messageIndex = array.findIndex((msg) => msg.id === message.id);
                    if (messageIndex > -1) {
                        rollDamage = !array
                            .slice(messageIndex)
                            .reverse()
                            .find((msg) => {
                                return msg.content.includes("dice-result flat-check-failure");
                            });
                    }
                }
            }
        } else {
            return rollDamage;
        }
    }
    return rollDamage;
}

export async function autoRollDamage(message: ChatMessagePF2e) {
    const numberOfMessagesToCheck = 10;
    if (
        shouldIHandleThisMessage(
            message,
            ["all", "players"].includes(String(game.settings.get(MODULENAME, "autoRollDamageAllow"))),
            ["all", "gm"].includes(String(game.settings.get(MODULENAME, "autoRollDamageAllow"))),
        )
    ) {
        const flags = <ActorFlagsPF2e>message.flags.pf2e;
        const originUuid = <string>flags?.origin?.uuid;
        // Exit early if no originUuid is found.
        if (originUuid) {
            const autoRollDamageForStrike = game.settings.get(MODULENAME, "autoRollDamageForStrike");
            const autoRollDamageForSpellAttack = game.settings.get(MODULENAME, "autoRollDamageForSpellAttack");
            const autoRollDamageForSpellWhenNotAnAttack = game.settings.get(
                MODULENAME,
                "autoRollDamageForSpellWhenNotAnAttack",
            );

            const messageToken = canvas?.scene?.tokens.get(<string>message.speaker.token);
            const actor = messageToken?.actor ? messageToken?.actor : game.actors?.get(<string>message.speaker.actor);
            const rollType = flags.context?.type;

            const origin: any = originUuid ? fromUuidSync(originUuid) : null;
            const rollForNonSpellAttack = rollType === "attack-roll" && autoRollDamageForStrike;

            const isSaveSpell = origin?.system?.defense?.save ?? false;

            const rollForNonAttackSpell =
                origin !== null &&
                !origin?.traits?.has("attack") &&
                flags.casting !== null &&
                (Number.isInteger(+(<any>message.item?.system)?.time?.value) ?? true) &&
                origin?.system?.damage;

            const rollForNonAttackSaveSpell =
                isSaveSpell &&
                rollForNonAttackSpell &&
                (autoRollDamageForSpellWhenNotAnAttack === "saveSpell" ||
                    autoRollDamageForSpellWhenNotAnAttack === "anySpell");
            const rollForNonAttackNonSaveSpell =
                !isSaveSpell &&
                rollForNonAttackSpell &&
                (autoRollDamageForSpellWhenNotAnAttack === "nonSaveSpell" ||
                    autoRollDamageForSpellWhenNotAnAttack === "anySpell");
            const rollForAttackSpell =
                origin?.traits?.has("attack") &&
                autoRollDamageForSpellAttack &&
                (Number.isInteger(+(<any>message.item)?.system?.time?.value) ?? true);
            const degreeOfSuccess = degreeOfSuccessWithRerollHandling(message);
            if (
                degreeOfSuccess.toLowerCase().includes("success") &&
                actor &&
                (rollForNonAttackSpell || rollForNonSpellAttack || rollForAttackSpell)
            ) {
                if (
                    rollForNonAttackSaveSpell ||
                    rollForNonAttackNonSaveSpell ||
                    (rollForAttackSpell && (degreeOfSuccess === "success" || degreeOfSuccess === "criticalSuccess"))
                ) {
                    let castRank = flags.casting?.level ?? (<any>origin)?.system.level.value;
                    // flags.casting?.level isn't always set, unfortunately
                    let levelFromChatCard = flags.casting?.level ?? false;
                    // Try getting from chat as a fallback
                    let spellMessage: any;
                    if (!levelFromChatCard) {
                        const chatLength = game.messages?.contents.length ?? 0;
                        for (let i = 1; i <= Math.min(numberOfMessagesToCheck + 1, chatLength); i++) {
                            spellMessage = game.messages?.contents[chatLength - i];
                            if (spellMessage && (<ActorFlagsPF2e>spellMessage.flags.pf2e).origin?.uuid === originUuid) {
                                const level = spellMessage.content.match(/data-cast-level="(\d+)"/);
                                if (level && level[1]) {
                                    levelFromChatCard = true;
                                    castRank = parseInt(level[1]);
                                    break;
                                }
                            }
                        }
                    }
                    if (
                        !levelFromChatCard &&
                        game.settings.get(MODULENAME, "autoRollDamageNotifyOnSpellCardNotFound")
                    ) {
                        ui.notifications.info(
                            game.i18n.format(`${MODULENAME}.spellCardNotFound`, {
                                spell: origin?.name,
                            }),
                        );
                    }
                    const originalRollMode = game.settings.get("core", "rollMode");
                    let blind =
                        ((message?.type === CONST.CHAT_MESSAGE_TYPES.WHISPER ||
                            message?.blind ||
                            (message?.whisper && message?.whisper.length > 0) ||
                            spellMessage?.type === CONST.CHAT_MESSAGE_TYPES.WHISPER ||
                            spellMessage?.blind ||
                            (spellMessage?.whisper && spellMessage?.whisper.length > 0)) &&
                            originalRollMode !== CONST.DICE_ROLL_MODES.PRIVATE) ??
                        false;
                    const rollDamage = await noOrSuccessfulFlatcheck(message); // Can't be inlined
                    if (rollDamage) {
                        // Fakes the event.closest function that pf2e uses to parse spell level for heightening damage rolls.
                        const currentTarget = document.createElement("div");
                        currentTarget.dataset.castRank = castRank.toString();
                        currentTarget.closest = () => {
                            return { dataset: { castRank: castRank } };
                        };
                        // Make automatic damageRoll be private if the spell is private, unless hideNameOfPrivateSpell is set.
                        if (blind && game.settings.get(MODULENAME, "castPrivateSpellHideName")) {
                            blind = false;
                        }
                        if (message.flags?.pf2e?.origin?.variant?.overlays?.length > 0) {
                            const variant = await origin.loadVariant({
                                castRank,
                                overlayIds: [message.flags.pf2e.origin.variant.overlays[0]],
                            });
                            await variant.rollDamage({
                                currentTarget: currentTarget,
                                spellLevel: castRank,
                                ctrlKey: blind,
                            });
                        } else {
                            await origin?.rollDamage({
                                currentTarget: currentTarget,
                                spellLevel: castRank,
                                ctrlKey: blind,
                            });
                        }
                    }
                } else if (rollForNonSpellAttack) {
                    // TODO Clean up this mess.
                    const options = actor?.getRollOptions(["all", "damage-roll"]);
                    const attackOption = options.find((option) => option.match(/(.*)-attack/));
                    const damageOption = attackOption?.replace("-attack", "-damage");
                    if (damageOption) {
                        options.push(damageOption);
                    }
                    const checkContext = message.flags.pf2e.context ?? null;

                    const mapIncreases =
                        checkContext &&
                        "mapIncreases" in checkContext &&
                        [0, 1, 2].includes(<number>checkContext.mapIncreases)
                            ? checkContext.mapIncreases
                            : null;
                    const altUsage = checkContext && "altUsage" in checkContext ? checkContext.altUsage : null;
                    const target = message.target?.token?.object ?? null;
                    const actions = actor?.system?.actions;
                    if (actions && actions.length > 0) {
                        const rollDamage = await noOrSuccessfulFlatcheck(message); // Can't be inlined
                        if (rollDamage) {
                            const toRoll = getActionFromMessage(actions, message);
                            if (toRoll) {
                                if (toRoll.type === "strike") {
                                    // TODO Handle other things than strikes
                                    const method = degreeOfSuccess === "success" ? "damage" : "critical";
                                    toRoll[method]?.({
                                        event,
                                        altUsage,
                                        mapIncreases,
                                        checkContext,
                                        target,
                                        options,
                                    });
                                }
                            } else {
                                const roll = message.rolls.find((r) => r.options?.action === "elemental-blast");
                                if (roll && actor.isOfType("character")) {
                                    const identifier = <string>roll?.options.identifier;
                                    const [element, damageType, meleeOrRanged, actionCost]: (string | undefined)[] =
                                        identifier?.split(".") ?? [];

                                    if (
                                        objectHasKey(CONFIG.PF2E.elementTraits, element) &&
                                        objectHasKey(CONFIG.PF2E.damageTypes, damageType)
                                    ) {
                                        const params: any = {
                                            element,
                                            damageType,
                                            melee: meleeOrRanged === "melee",
                                            actionCost: Number(actionCost) || 1,
                                            checkContext,
                                            outcome: degreeOfSuccess,
                                            event,
                                        };
                                        await new game.pf2e.ElementalBlast(actor).damage(params);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export function persistentDamage(message) {
    const flavor = message.flavor;
    const persistentFlavor = flavor?.startsWith("<strong>" + game.i18n.localize("PF2E.ConditionTypePersistent"));
    if (
        shouldIHandleThisMessage(
            message,
            ["all", "players"].includes(String(game.settings.get(MODULENAME, "applyPersistentAllow"))),
            ["all", "gm"].includes(String(game.settings.get(MODULENAME, "applyPersistentAllow"))),
        ) &&
        flavor &&
        persistentFlavor &&
        message.speaker.token &&
        message.rolls &&
        message.rolls.length > 0 &&
        message.id === game.messages.contents.pop()?.id &&
        game.actors &&
        (message.getFlag(MODULENAME, "persistentHandled") ?? true)
    ) {
        const token = canvas.tokens?.get(message.speaker.token);
        if (token && token.isOwner) {
            // Should only be one roll, either way, only use the first.
            token?.actor
                ?.applyDamage({
                    damage: message.rolls[0],
                    token: token.document,
                })
                .then(() => message.setFlag(MODULENAME, "persistentHandled", true).then());
        }
        const actor = token?.actor;
        if (actor && game.settings.get(MODULENAME, "applyPersistentDamageRecoveryRoll")) {
            const condition = actor.conditions
                .filter((condition) => condition.slug === "persistent-damage")
                .find((condition) => flavor.includes(condition.name));
            if (condition) {
                // TODO Update the message to remove the recovery roll button, instead include the result in the message (and remove the message the following line creates.)
                condition.rollRecovery().then();
            }
        }
    }
}

export function persistentHealing(message) {
    if (
        shouldIHandleThisMessage(
            message,
            ["all", "players"].includes(String(game.settings.get(MODULENAME, "applyPersistentAllow"))),
            ["all", "gm"].includes(String(game.settings.get(MODULENAME, "applyPersistentAllow"))),
        ) &&
        game.settings.get(MODULENAME, "applyPersistentHealing") &&
        message.flavor &&
        message.rolls &&
        game.combats &&
        game.combats.active &&
        game.combats.active.combatant &&
        game.combats.active.combatant.actor &&
        message.id === game.messages.contents.pop()?.id &&
        (message.getFlag(MODULENAME, "persistentHandled") ?? true)
    ) {
        const token = game.combats.active.combatant.token;
        if (token && token.isOwner) {
            const fastHealingLabel = game.i18n.localize(
                `${MODULENAME}.SETTINGS.applyPersistentHealing.FastHealingLabel`,
            );
            const regenerationLabel = game.i18n.localize(
                `${MODULENAME}.SETTINGS.applyPersistentHealing.RegenerationLabel`,
            );
            if ([fastHealingLabel, regenerationLabel].some((text) => message.flavor?.includes(text))) {
                const healing = message.rolls.reduce((sum, current) => sum + (current.total || 1), 0) * -1;
                token.actor
                    ?.applyDamage({
                        damage: healing,
                        token: token.actor?.getActiveTokens()[0].document,
                    })
                    .then(() => message.setFlag(MODULENAME, "persistentHandled", true).then());
            }
        }
    }
}

function getActionFromMessage(actions, message: ChatMessagePF2e) {
    const attackAbilities = actions
        .filter((atk) => {
            return atk?.system?.traits.value.includes("attack");
        })
        .filter((atk) => {
            return atk.id === message.item?.id;
        });

    const strikes = message.actor?.system?.actions
        ?.filter((atk: { type: string }) => {
            return atk?.type === "strike";
        })
        .filter((atk) => {
            return atk?.item?.id === message.item?.id;
        });

    const allAttacks = attackAbilities.concat(strikes);

    if (allAttacks.length === 1) {
        // Normal case
        return allAttacks[0];
    } else if (allAttacks.length > 1 && strikes && strikes?.length > 1) {
        // The strike is most likely based on an RE which means that all actions get the same item id (e.g. animal form), try to regex it out of the message instead
        const strike = game.i18n.localize(`${MODULENAME}.SETTINGS.autoRollDamageForStrike.strike`);
        const s = `<h4 class="action">(.*?)${strike}: (.*?)<`;
        const strikeName = message.flavor?.match(s);
        if (strikeName && strikeName[2]) {
            return actions
                .filter((atk) => {
                    return atk?.system?.traits.value.includes("attack");
                })
                .find((a: { label: string }) => a.label === strikeName[2]);
        } else {
            // If we can't find the strike label, give up.
            return null;
        }
    } else {
        // If we can't find the strike, give up.
        return null;
    }
}
