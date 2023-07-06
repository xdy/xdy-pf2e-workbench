import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { ActorFlagsPF2e } from "@actor/data/base.js";
import { degreeOfSuccessWithRerollHandling, isActuallyDamageRoll, shouldIHandleThisMessage } from "../../utils.ts";
import { TokenDocumentPF2e } from "@module/scene/index.js";
import { ScenePF2e } from "@scene/document.js";
import { handleDying } from "../../hooks.js";
import { ChatMessagePF2e } from "@module/chat-message/document.js";

export async function noOrSuccessfulFlatcheck(message: ChatMessagePF2e): Promise<boolean> {
    let rollDamage = true;
    if (game.modules.get("pf2-flat-check")?.active) {
        const actorFlat =
            message.actor?.itemTypes.condition.filter((x) => ["blinded", "dazzled"].includes(x.slug)) ?? [];
        const targetFlat =
            message.target?.actor.itemTypes.condition.filter((x) =>
                ["concealed", "hidden", "invisible", "undetected"].includes(x.slug)
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
            ["all", "gm"].includes(String(game.settings.get(MODULENAME, "autoRollDamageAllow")))
        )
    ) {
        const flags = <ActorFlagsPF2e>message.flags.pf2e;
        const originUuid = <string>flags?.origin?.uuid;
        // Exit early if no originUuid is found.
        if (originUuid) {
            const autoRollDamageForStrike = game.settings.get(MODULENAME, "autoRollDamageForStrike");
            const autoRollDamageForSpellAttack = game.settings.get(MODULENAME, "autoRollDamageForSpellAttack");
            const autoRollDamageForSpellNotAnAttack = Boolean(
                game.settings.get(MODULENAME, "autoRollDamageForSpellNotAnAttack")
            );

            // @ts-ignore
            const messageToken = canvas?.scene?.tokens.get(<string>message.speaker.token);
            const actor = messageToken?.actor ? messageToken?.actor : game.actors?.get(<string>message.speaker.actor);
            const rollType = flags.context?.type;

            const origin: any = originUuid ? await fromUuid(originUuid) : null;
            const rollForStrike = rollType === "attack-roll" && autoRollDamageForStrike;

            // TODO Add something like this to pf2-flat-check, i.e. it shouldn't check if not an attack spell.
            const rollForNonAttackSpell =
                origin !== null &&
                autoRollDamageForSpellNotAnAttack &&
                !origin?.traits?.has("attack") &&
                flags.casting !== null &&
                (Number.isInteger(+(<any>message.item?.system)?.time?.value) ?? true) &&
                Object.keys((<any>origin).system.damage?.value)?.length !== 0;
            const rollForAttackSpell =
                origin?.traits?.has("attack") &&
                autoRollDamageForSpellAttack &&
                (Number.isInteger(+(<any>message.item)?.system?.time?.value) ?? true);
            const degreeOfSuccess = degreeOfSuccessWithRerollHandling(message);
            if (actor && (rollForNonAttackSpell || rollForStrike || rollForAttackSpell)) {
                if (
                    rollForNonAttackSpell ||
                    (rollForAttackSpell && (degreeOfSuccess === "success" || degreeOfSuccess === "criticalSuccess"))
                ) {
                    let castLevel = flags.casting?.level ?? (<any>origin)?.system.level.value;
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
                                    castLevel = parseInt(level[1]);
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
                            })
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
                        currentTarget.dataset.castLevel = castLevel.toString();
                        currentTarget.closest = () => {
                            return { dataset: { castLevel: castLevel } };
                        };
                        // Make automatic damageRoll be private if the spell is private, unless hideNameOfPrivateSpell is set.
                        if (blind && game.settings.get(MODULENAME, "castPrivateSpellHideName")) {
                            blind = false;
                        }
                        origin?.rollDamage({
                            currentTarget: currentTarget,
                            spellLevel: castLevel,
                            ctrlKey: blind,
                        });
                    }
                } else if (rollForStrike) {
                    const rollOptions = actor?.getRollOptions(["all", "damage-roll"]);
                    // @ts-ignore
                    const actions = actor?.system?.actions;
                    const actionIds = originUuid.match(/Item.(\w+)/);
                    if (actions && actionIds && actionIds[1]) {
                        const rollDamage = await noOrSuccessfulFlatcheck(message); // Can't be inlined
                        if (rollDamage) {
                            const action = getActionFromMessage(actions, actionIds, message);
                            if (degreeOfSuccess === "success") {
                                action?.damage({ options: rollOptions });
                            } else if (degreeOfSuccess === "criticalSuccess") {
                                action?.critical({ options: rollOptions });
                            }
                        }
                    }
                }
            }
        }
    }
}

export function handleDyingRecoveryRoll(message: ChatMessagePF2e) {
    if (
        game.settings.get(MODULENAME, "handleDyingRecoveryRoll") &&
        shouldIHandleThisMessage(
            message,
            ["all", "players"].includes(String(game.settings.get(MODULENAME, "handleDyingRecoveryRollAllow"))),
            ["all", "gm"].includes(String(game.settings.get(MODULENAME, "handleDyingRecoveryRollAllow")))
        ) &&
        (message.flavor.includes(game.i18n.localize("PF2E.Recovery.critFailure")) ||
            message.flavor.includes(game.i18n.localize("PF2E.Recovery.critSuccess")) ||
            message.flavor.includes(game.i18n.localize("PF2E.Recovery.failure")) ||
            message.flavor.includes(game.i18n.localize("PF2E.Recovery.success"))) &&
        message.id === game.messages.contents.pop()?.id &&
        message.token &&
        message.token.actor &&
        message.token.isOwner
    ) {
        // @ts-ignore
        const outcome = message.flags.pf2e.context?.outcome ?? "";

        const messageToken = canvas?.scene?.tokens.get(<string>message.speaker.token);
        const actor = messageToken?.actor ? messageToken?.actor : game.actors?.get(<string>message.speaker.actor);

        const token: TokenDocumentPF2e<ScenePF2e> = message.token;
        if (token && token.isOwner) {
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
                handleDying(dyingCounter, originalDyingCounter, actor);

                const total = message.rolls.reduce((total, roll) => total + roll.total, 0);
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
                }).then();
                message.delete({ render: false }).then();
            }
        }
    }
}

export function persistentDamage(message) {
    if (
        shouldIHandleThisMessage(
            message,
            ["all", "players"].includes(String(game.settings.get(MODULENAME, "applyPersistentAllow"))),
            ["all", "gm"].includes(String(game.settings.get(MODULENAME, "applyPersistentAllow")))
        ) &&
        message.flavor.startsWith("<strong>" + game.i18n.localize("PF2E.ConditionTypePersistent")) &&
        message.speaker.token &&
        message.flavor &&
        message.rolls &&
        message.id === game.messages.contents.pop()?.id &&
        game.actors
    ) {
        const token = canvas.tokens?.get(message.speaker.token);
        if (token && token.isOwner) {
            if (message.rolls && message.rolls.length > 0) {
                // Should only be one roll, either way, only use the first.
                token?.actor?.applyDamage({ damage: message.rolls.get(0), token: token.document }).then();
            }
        }
        const actor = token?.actor;
        if (actor && game.settings.get(MODULENAME, "applyPersistentDamageRecoveryRoll")) {
            const condition = actor.conditions
                .filter((condition) => condition.slug === "persistent-damage")
                .find((condition) => message.flavor.includes(condition.name));
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
            ["all", "gm"].includes(String(game.settings.get(MODULENAME, "applyPersistentAllow")))
        ) &&
        game.settings.get(MODULENAME, "applyPersistentHealing") &&
        message.flavor &&
        message.rolls &&
        game.combats &&
        game.combats.active &&
        game.combats.active.combatant &&
        game.combats.active.combatant.actor &&
        message.id === game.messages.contents[game.messages.contents.length - 1].id
    ) {
        const token = game.combats.active.combatant.token;
        if (token && token.isOwner) {
            if (
                [
                    game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentHealing.FastHealingLabel`),
                    game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentHealing.RegenerationLabel`),
                ].some((text) => message.flavor?.includes(text))
            ) {
                const healing = message.rolls.reduce((sum, current) => sum + (current.total || 1), 0) * -1;
                token.actor?.applyDamage({ damage: healing, token: token.actor?.getActiveTokens()[0].document }).then();
            }
        }
    }
}

function getActionFromMessage(actions: any, actionIds: RegExpMatchArray, message: ChatMessagePF2e) {
    const strikes = actions.filter((atk: { type: string }) => {
        return atk?.type === "strike";
    });
    const itemStrikes = strikes.filter((a: { item: { id: any } }) => a.item.id === actionIds[1]);
    if (itemStrikes.length === 1) {
        // Normal case
        return itemStrikes[0];
    } else if (itemStrikes.length > 1) {
        // The strike is most likely based on an RE which means that all actions get the same item id (e.g. animal form), try to regex it out of the message instead
        const strike = game.i18n.localize(`${MODULENAME}.SETTINGS.autoRollDamageForStrike.strike`);
        const s = `<h4 class="action">(.*?)${strike}: (.*?)<`;
        const strikeName = message.flavor?.match(s);
        if (strikeName && strikeName[2]) {
            return strikes.find((a: { label: string }) => a.label === strikeName[2]);
        } else {
            // If we can't find the strike label, give up.
            return null;
        }
    } else {
        // If we can't find the strike, give up.
        return null;
    }
}
