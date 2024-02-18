import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import {
    degreeOfSuccessWithRerollHandling,
    isActuallyDamageRoll,
    objectHasKey,
    shouldIHandleThisMessage,
} from "../../utils.ts";
import { ActorFlagsPF2e, RollOptionFlags } from "@actor/data/base.js";
import { ChatMessagePF2e } from "@module/chat-message/index.js";
import { SpellPF2e } from "@item/spell/document.js";

export async function autoRollDamage(message: ChatMessagePF2e) {
    const numberOfMessagesToCheck = 10;
    const settings = {
        autoRollDamageAllow: String(game.settings.get(MODULENAME, "autoRollDamageAllow")),
        autoRollDamageForStrike: game.settings.get(MODULENAME, "autoRollDamageForStrike"),
        autoRollDamageForSpellAttack: game.settings.get(MODULENAME, "autoRollDamageForSpellAttack"),
        autoRollDamageForSpellWhenNotAnAttack: game.settings.get(MODULENAME, "autoRollDamageForSpellWhenNotAnAttack"),
    };

    if (
        shouldIHandleThisMessage(
            message,
            ["all", "players"].includes(settings.autoRollDamageAllow),
            ["all", "gm"].includes(settings.autoRollDamageAllow),
        )
    ) {
        const flags = <ActorFlagsPF2e>message.flags.pf2e;
        const originUuid = <string>flags?.origin?.uuid;

        if (originUuid) {
            const messageToken = canvas?.scene?.tokens.get(<string>message.speaker.token);
            const actor = messageToken?.actor ? messageToken?.actor : game.actors?.get(<string>message.speaker.actor);
            const rollType = flags.context?.type;

            const origin: any = originUuid ? await fromUuid(originUuid) : null;
            const isAttackSpell = origin?.traits?.has("attack") ?? false;
            const isSaveSpell = origin?.system?.defense?.save ?? false;
            const hasFixedTime = Number.isInteger(parseInt(origin?.system?.time?.value)) ?? false;

            const rollForNonSpellAttack = rollType === "attack-roll" && settings.autoRollDamageForStrike;
            const rollForNonAttackSpell =
                origin !== null && !isAttackSpell && flags.casting !== null && hasFixedTime && origin?.system?.damage;

            const rollForNonAttackSaveSpell =
                isSaveSpell &&
                rollForNonAttackSpell &&
                (settings.autoRollDamageForSpellWhenNotAnAttack === "saveSpell" ||
                    settings.autoRollDamageForSpellWhenNotAnAttack === "anySpell");

            const rollForNonAttackNonSaveSpell =
                !isSaveSpell &&
                rollForNonAttackSpell &&
                (settings.autoRollDamageForSpellWhenNotAnAttack === "nonSaveSpell" ||
                    settings.autoRollDamageForSpellWhenNotAnAttack === "anySpell");

            const rollForAttackSpell = isAttackSpell && settings.autoRollDamageForSpellAttack && hasFixedTime;

            const degreeOfSuccess = degreeOfSuccessWithRerollHandling(message);
            const isFailure = ["criticalFailure", "failure"].includes(degreeOfSuccess);
            const isSuccess = ["criticalSuccess", "success"].includes(degreeOfSuccess);
            const context: any = flags.context;
            const isBasicSave = context?.options?.includes("item:defense:basic");
            if (
                actor &&
                (rollForNonAttackNonSaveSpell ||
                    (rollForNonAttackSaveSpell && (isFailure || (isBasicSave && degreeOfSuccess === "success"))) ||
                    (rollForAttackSpell && isSuccess))
            ) {
                await handleSpell(flags, numberOfMessagesToCheck, originUuid, origin, message, degreeOfSuccess);
            } else if (actor && rollForNonSpellAttack && isSuccess) {
                await handleNonSpell(actor, message, degreeOfSuccess);
            }
        }
    }
}

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

export function persistentHealing(message, enabled: boolean) {
    if (
        enabled &&
        shouldIHandleThisMessage(
            message,
            ["all", "players"].includes(String(game.settings.get(MODULENAME, "applyPersistentAllow"))),
            ["all", "gm"].includes(String(game.settings.get(MODULENAME, "applyPersistentAllow"))),
        ) &&
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

async function getCastRankFromChat(numberOfMessagesToCheck: number, originUuid: string): Promise<number> {
    const chatLength = game.messages?.contents.length ?? 0;
    for (let i = 1; i <= Math.min(numberOfMessagesToCheck + 1, chatLength); i++) {
        const spellMessage = game.messages?.contents[chatLength - i];
        if (spellMessage && (<ActorFlagsPF2e>spellMessage.flags.pf2e).origin?.uuid === originUuid) {
            const level = spellMessage.content.match(/data-cast-level="(\d+)"/);
            if (level && level[1]) {
                return parseInt(level[1]);
            }
        }
    }
    return 0;
}

async function handleSpell(
    flags: foundry.documents.ActorFlags & {
        pf2e: { rollOptions: RollOptionFlags; trackedItems: Record<string, string>; [p: string]: unknown };
    },
    numberOfMessagesToCheck: number,
    originUuid: string,
    origin: SpellPF2e,
    message: any,
    degreeOfSuccess: string,
) {
    const castRank = await determineCastRank(origin.name, flags, numberOfMessagesToCheck, originUuid, origin.system);
    let blind = determineBlindStatus(message);
    const rollDamage = await noOrSuccessfulFlatcheck(message);

    if (rollDamage) {
        // Fakes the event.closest function that pf2e uses to parse spell level for heightening damage rolls.
        const target = constructTargetElement(castRank);

        // Make automatic damageRoll be private if the spell is private, unless hideNameOfPrivateSpell is set.
        const shouldHideName = blind && game.settings.get(MODULENAME, "castPrivateSpellHideName");
        if (shouldHideName) {
            blind = false;
        }
        if (message.flags?.pf2e?.origin?.variant?.overlays?.length > 0) {
            const variant = origin.loadVariant({
                castRank,
                // target,
                overlayIds: [message.flags.pf2e.origin.variant.overlays[0]],
            });
            // @ts-ignore
            await variant.rollDamage({
                outcome: degreeOfSuccess,
                target,
                ctrlKey: blind,
            });
        } else {
            // @ts-ignore
            await origin?.rollDamage({
                outcome: degreeOfSuccess,
                target,
                ctrlKey: blind,
            });
        }
    }
}

async function determineCastRank(
    spellName: string,
    flags: any,
    numberOfMessagesToCheck: number,
    originUuid: string,
    system,
): Promise<number> {
    let castRank: number = flags.origin?.castRank ? Number(flags.origin?.castRank) : 0;
    if (castRank === 0) {
        castRank = await getCastRankFromChat(numberOfMessagesToCheck, originUuid);
    }
    if (castRank === 0) {
        if (game.settings.get(MODULENAME, "autoRollDamageNotifyOnSpellCardNotFound")) {
            ui.notifications.info(game.i18n.format(`${MODULENAME}.spellCardNotFound`, { spell: spellName }));
        }
        // Give up and use spell level
        castRank = system.level.value ?? 0;
    }
    return castRank;
}

function determineBlindStatus(message: any): boolean {
    const originalRollMode = game.settings.get("core", "rollMode");
    return (
        ((message?.type === CONST.CHAT_MESSAGE_TYPES.WHISPER ||
            message?.blind ||
            (message?.whisper && message?.whisper.length > 0)) &&
            originalRollMode !== CONST.DICE_ROLL_MODES.PRIVATE) ??
        false
    );
}

function constructTargetElement(castRank: number): HTMLDivElement {
    const target = document.createElement("div");
    target.dataset.castRank = castRank.toString();
    target.closest = () => {
        return { dataset: { castRank: castRank } };
    };
    return target;
}

async function handleNonSpell(actor, message, degreeOfSuccess: string) {
    const options = actor?.getRollOptions(["all", "damage-roll"]);
    const attackOption = options?.find((option) => option.match(/(.*)-attack/));
    const damageOption = attackOption?.replace("-attack", "-damage");

    options?.push(damageOption);

    const checkContext = message.flags.pf2e.context ?? null;

    const mapIncreases =
        checkContext && "mapIncreases" in checkContext && [0, 1, 2].includes(<number>checkContext.mapIncreases)
            ? checkContext.mapIncreases
            : null;
    const altUsage = checkContext && "altUsage" in checkContext ? checkContext.altUsage : null;
    const target = message.target?.token?.object ?? null;
    const actions = actor?.system?.actions;

    if (!actions || actions.length === 0) return;

    const rollDamage = await noOrSuccessfulFlatcheck(message); // Can't be inlined
    if (!rollDamage) return;

    const toRoll = getActionFromMessage(actions, message);

    if (toRoll && toRoll.type === "strike") {
        const method = degreeOfSuccess === "success" ? "damage" : "critical";
        return toRoll[method]?.({ event, altUsage, mapIncreases, checkContext, target, options });
    }

    await handleElementalBlastAttack(actor, message, degreeOfSuccess, checkContext);
}

async function handleElementalBlastAttack(actor, message, degreeOfSuccess, checkContext) {
    const roll = message.rolls.find((r) => r.options?.action === "elemental-blast");
    if (roll && actor.isOfType("character")) {
        const identifier = <string>roll?.options.identifier;
        const [element, damageType, meleeOrRanged, actionCost]: (string | undefined)[] = identifier?.split(".") ?? [];

        if (objectHasKey(CONFIG.PF2E.elementTraits, element) && objectHasKey(CONFIG.PF2E.damageTypes, damageType)) {
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
    return;
}
