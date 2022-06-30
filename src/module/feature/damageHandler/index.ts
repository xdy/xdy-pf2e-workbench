import { degreeOfSuccessWithRerollHandling, shouldIHandleThisMessage } from "../../utils";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { ActorPF2e } from "@actor";
import { TokenDocumentPF2e } from "@scene";
import { ChatMessagePF2e } from "@module/chat-message";
import { ActorFlagsPF2e } from "@actor/data/base";
import { SpellPF2e } from "@item";

export async function autoRollDamage(message: ChatMessagePF2e) {
    const numberOfMessagesToCheck = 5;
    if (
        shouldIHandleThisMessage(
            message,
            ["all", "players"].includes(<string>game.settings.get(MODULENAME, "autoRollDamageAllow")),
            ["all", "gm"].includes(<string>game.settings.get(MODULENAME, "autoRollDamageAllow"))
        )
    ) {
        const flags = <ActorFlagsPF2e>message.data.flags.pf2e;
        const originUuid = <string>flags?.origin?.uuid;
        //Exit early if no originUuid is found.
        if (originUuid) {
            const autoRollDamageForStrike = game.settings.get(MODULENAME, "autoRollDamageForStrike");
            const autoRollDamageForSpellAttack = game.settings.get(MODULENAME, "autoRollDamageForSpellAttack");
            const autoRollDamageForSpellNotAnAttack = <boolean>(
                game.settings.get(MODULENAME, "autoRollDamageForSpellNotAnAttack")
            );
            const messageActor: ActorPF2e = <ActorPF2e>game.actors?.get(<string>message.data.speaker.actor);
            const messageToken: TokenDocumentPF2e = <TokenDocumentPF2e>(
                canvas?.scene?.tokens.get(<string>message.data.speaker.token)
            );
            const rollType = flags.context?.type;

            const origin: any = originUuid ? await fromUuid(originUuid) : null;
            //Exit early if no origin is found (probably unarmed attack)
            const rollForStrike = rollType === "attack-roll" && autoRollDamageForStrike;
            const rollForNonAttackSpell =
                origin !== null &&
                autoRollDamageForSpellNotAnAttack &&
                rollType === undefined &&
                flags.casting !== null &&
                (<SpellPF2e>origin).data?.data?.damage?.value &&
                Object.keys((<SpellPF2e>origin).data?.data?.damage?.value)?.length !== 0 &&
                !origin?.traits.has("attack");
            const rollForAttackSpell = rollType === "spell-attack-roll" && autoRollDamageForSpellAttack;
            const degreeOfSuccess = degreeOfSuccessWithRerollHandling(message);
            if (messageActor && messageToken && (rollForNonAttackSpell || rollForStrike || rollForAttackSpell)) {
                if (
                    rollForNonAttackSpell ||
                    (rollForAttackSpell && (degreeOfSuccess === "success" || degreeOfSuccess === "criticalSuccess"))
                ) {
                    let spellLevel = (<SpellPF2e>origin)?.data.data.level;
                    let levelFromChatCard = false;
                    const chatLength = game.messages?.contents.length ?? 0;
                    for (let i = 1; i <= Math.min(numberOfMessagesToCheck + 1, chatLength); i++) {
                        const msg = game.messages?.contents[chatLength - i];
                        if (msg && (<ActorFlagsPF2e>msg.data.flags.pf2e).origin?.uuid === originUuid) {
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
                                spell: origin?.data.name,
                            })
                        );
                    }

                    //Until spell level flags are added to attack rolls it is the best I could come up with.
                    //fakes the event.closest function that pf2e uses to parse spell level for heightening damage rolls.
                    //@ts-ignore
                    origin?.rollDamage({
                        currentTarget: {
                            closest: () => {
                                // @ts-ignore Wtf? How to make a number into a OneToTen?
                                return { dataset: { spellLvl: Math.abs(spellLevel) } };
                            },
                        },
                    });
                } else if (rollForStrike) {
                    const rollOptions = messageToken.actor?.getRollOptions(["all", "damage-roll"]);
                    const actions: any =
                        // @ts-ignore Oof this is ugly. TODO Figure out how to do it properly.
                        messageToken["data"]["document"]["_actor"]["data"]["data"]["actions"] ??
                        // @ts-ignore
                        messageActor?.data.data?.actions;
                    const actionIds = originUuid.match(/Item.(\w+)/);
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
    }
}

export async function persistentDamage(message: ChatMessagePF2e) {
    if (
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
}

export async function persistentHealing(message: ChatMessagePF2e) {
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

                await token.actor?.applyDamage(healing, token.actor?.getActiveTokens()[0], false);
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
}

function getActionFromMessage(actions: any, actionIds: RegExpMatchArray, message: ChatMessagePF2e) {
    const strikes = actions.filter((atk: { type: string }) => {
        return atk?.type === "strike";
    });
    const itemStrikes = strikes.filter((a: { item: { id: any } }) => a.item.id === actionIds[1]);
    if (itemStrikes.length === 1) {
        //Normal case
        return itemStrikes[0];
    } else if (itemStrikes.length > 1) {
        //The strike is most likely based on an RE which means that all actions get the same item id (e.g. animal form), try to regex it out of the message instead
        const strike = game.i18n.localize(`${MODULENAME}.SETTINGS.autoRollDamageForStrike.strike`);
        const s = `<h4 class="action">(.*?)${strike}: (.*?)<`;
        const strikeName = message.data.flavor?.match(s);
        if (strikeName && strikeName[2]) {
            return strikes.find((a: { name: string }) => a.name === strikeName[2]);
        } else {
            //If we can't find the strike name, give up.
            return null;
        }
    } else {
        //If we can't find the strike, give up.
        return null;
    }
}
