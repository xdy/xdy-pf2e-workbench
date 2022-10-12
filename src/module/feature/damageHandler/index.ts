import { degreeOfSuccessWithRerollHandling, isActuallyDamageRoll, shouldIHandleThisMessage } from "../../utils";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { ChatMessagePF2e } from "@module/chat-message";
import { ActorFlagsPF2e } from "@actor/data/base";
import { SpellPF2e } from "@item";

async function noOrSuccessfulFlatcheck(message: ChatMessagePF2e): Promise<boolean> {
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
    const numberOfMessagesToCheck = 5;
    if (
        shouldIHandleThisMessage(
            message,
            ["all", "players"].includes(<string>game.settings.get(MODULENAME, "autoRollDamageAllow")),
            ["all", "gm"].includes(<string>game.settings.get(MODULENAME, "autoRollDamageAllow"))
        )
    ) {
        const flags = <ActorFlagsPF2e>message.flags.pf2e;
        const originUuid = <string>flags?.origin?.uuid;
        // Exit early if no originUuid is found.
        if (originUuid) {
            const autoRollDamageForStrike = game.settings.get(MODULENAME, "autoRollDamageForStrike");
            const autoRollDamageForSpellAttack = game.settings.get(MODULENAME, "autoRollDamageForSpellAttack");
            const autoRollDamageForSpellNotAnAttack = <boolean>(
                game.settings.get(MODULENAME, "autoRollDamageForSpellNotAnAttack")
            );

            const messageToken = canvas?.scene?.tokens.get(<string>message.speaker.token);
            const actor = messageToken?.actor ? messageToken?.actor : game.actors?.get(<string>message.speaker.actor);
            const rollType = flags.context?.type;

            const origin: any = originUuid ? await fromUuid(originUuid) : null;
            const rollForStrike = rollType === "attack-roll" && autoRollDamageForStrike;

            const fixedTime = Number.isInteger(+(<SpellPF2e>message.item)?.system.time.value);

            // TODO Add something like this to pf2-flat-check, i.e. it shouldn't check if not an attack spell.
            const rollForNonAttackSpell =
                origin !== null &&
                autoRollDamageForSpellNotAnAttack &&
                rollType === undefined &&
                flags.casting !== null &&
                fixedTime &&
                Object.keys((<SpellPF2e>origin).system.damage?.value)?.length !== 0 &&
                !origin?.traits.has("attack");
            const rollForAttackSpell = rollType === "spell-attack-roll" && autoRollDamageForSpellAttack && fixedTime;
            const degreeOfSuccess = degreeOfSuccessWithRerollHandling(message);
            if (actor && (rollForNonAttackSpell || rollForStrike || rollForAttackSpell)) {
                if (
                    rollForNonAttackSpell ||
                    (rollForAttackSpell && (degreeOfSuccess === "success" || degreeOfSuccess === "criticalSuccess"))
                ) {
                    let spellLevel = (<SpellPF2e>origin)?.system.level;
                    let levelFromChatCard = false;
                    const chatLength = game.messages?.contents.length ?? 0;
                    for (let i = 1; i <= Math.min(numberOfMessagesToCheck + 1, chatLength); i++) {
                        const msg = game.messages?.contents[chatLength - i];
                        if (msg && (<ActorFlagsPF2e>msg.flags.pf2e).origin?.uuid === originUuid) {
                            const level = msg.content.match(/data-slot-level="(\d+)"/);
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
                                spell: origin?.name,
                            })
                        );
                    }
                    // Hack to make automatic damageRoll be private if the spell is private. Ain't globals fun?
                    let originalRollMode: any;
                    try {
                        originalRollMode = game.settings.get("core", "rollMode");
                        if (
                            message.type === CONST.CHAT_MESSAGE_TYPES.WHISPER &&
                            originalRollMode !== CONST.DICE_ROLL_MODES.PRIVATE
                        ) {
                            game.settings.set("core", "rollMode", CONST.DICE_ROLL_MODES.PRIVATE);
                        }
                        const rollDamage = await noOrSuccessfulFlatcheck(message); // Can't be inlined
                        if (rollDamage) {
                            // Until spell level flags are added to attack rolls it is the best I could come up with.
                            // fakes the event.closest function that pf2e uses to parse spell level for heightening damage rolls.
                            // @ts-ignore
                            origin?.rollDamage({
                                currentTarget: {
                                    closest: () => {
                                        return { dataset: { spellLvl: spellLevel } };
                                    },
                                },
                            });
                        }
                    } finally {
                        // Make sure to restore original roll mode
                        if (originalRollMode !== CONST.DICE_ROLL_MODES.PRIVATE) {
                            game.settings.set("core", "rollMode", originalRollMode);
                        }
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

export async function persistentDamage(message) {
    if (
        canvas.ready &&
        "persistent" in message.flags &&
        message.speaker.token &&
        message.flavor &&
        message.rolls &&
        shouldIHandleThisMessage(
            message,
            ["all", "players"].includes(<string>game.settings.get(MODULENAME, "applyPersistentAllow")),
            ["all", "gm"].includes(<string>game.settings.get(MODULENAME, "applyPersistentAllow"))
        ) &&
        game.actors
    ) {
        const token = canvas.tokens?.get(message.speaker.token);
        if (token && token.isOwner) {
            const damage = message.rolls.reduce((sum, current) => sum + (current.total || 1), 0);

            await token?.actor?.applyDamage(damage, token, false);
        }
    }
}

export async function persistentHealing(message) {
    if (
        game.settings.get(MODULENAME, "applyPersistentHealing") &&
        canvas.ready &&
        message.flavor &&
        message.rolls &&
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
                ].some((text) => message.flavor?.includes(text))
            ) {
                const healing = message.rolls.reduce((sum, current) => sum + (current.total || 1), 0) * -1;

                await token.actor?.applyDamage(healing, token.actor?.getActiveTokens()[0], false);
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
            return strikes.find((a: { name: string }) => a.name === strikeName[2]);
        } else {
            // If we can't find the strike name, give up.
            return null;
        }
    } else {
        // If we can't find the strike, give up.
        return null;
    }
}
