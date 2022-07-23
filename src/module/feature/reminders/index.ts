import { shouldIHandleThisForClient, shouldIHandleThisMessageForClient } from "../../utils";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { TokenDocumentPF2e } from "@scene";
import { CombatantPF2e } from "@module/encounter";
import { ActorFlagsPF2e } from "@actor/data/base";
import { ChatMessagePF2e } from "../../../../types/src/module/chat-message/index";
import { SpellPF2e } from "@item";
import { ActorPF2e, CreaturePF2e } from "@actor";

export async function reminderBreathWeapon(message: ChatMessagePF2e) {
    if (game.user.isGM && message.data.content && game.combats && game.combats.active) {
        const token: TokenDocumentPF2e = <TokenDocumentPF2e>(
            canvas?.scene?.tokens.get(<string>message.data.speaker.token)
        );

        const actors = [token?.actor];
        for (const actor of actors) {
            const prefix = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.prefix`);
            const postfix = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.postfix`);
            const matcher = `.*${prefix}.*1d([46])${postfix}.*`;
            const match = message.data.content.match(matcher);
            const matchString = match ? `1d${match[1]}` : "";

            if (matchString) {
                const effect = {
                    type: "effect",
                    name: "Breath",
                    img: "systems/pf2e/icons/spells/dragon-breath.webp",
                    data: {
                        tokenIcon: {
                            show: true,
                        },
                        duration: {
                            value: 1,
                            unit: "rounds",
                            sustained: false,
                            expiry: "turn-start",
                        },
                    },
                };

                effect.data.duration.value = new Roll(matchString).roll({ async: false }).total + 1;
                const title = message.data.content.match(/.*title="(.*?)" width.*/);
                effect.name =
                    game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.used`) +
                    (title ? title[1] : game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`));

                // @ts-ignore
                await actor?.createEmbeddedDocuments("Item", [effect]);
            }
        }
    }
}

export async function actionsReminder(combatant: CombatantPF2e, reduction = 0) {
    if (game.user.isGM && combatant && combatant.actor) {
        const showForPC =
            ["all", "players"].includes(<string>game.settings.get(MODULENAME, "actionsReminderAllow")) &&
            combatant.actor?.hasPlayerOwner;
        const showForNPC =
            ["all", "gm"].includes(<string>game.settings.get(MODULENAME, "actionsReminderAllow")) &&
            !combatant.actor?.hasPlayerOwner;
        if (
            (showForPC || showForNPC) &&
            (combatant.actor.hasCondition("stunned") ||
                combatant.actor.hasCondition("slowed") ||
                combatant.actor.hasCondition("quickened") ||
                reduction > 0)
        ) {
            const actionsMessage = `${combatant.token?.name} has ${Math.max(
                calculateMaxActions(combatant.actor) -
                    Math.max(
                        combatant.actor.getCondition("stunned")?.value ?? 0,
                        combatant.actor.getCondition("slowed")?.value ?? 0,
                        reduction
                    ),
                0
            )} actions remaining.`;
            await ChatMessage.create(
                {
                    flavor: actionsMessage,
                    whisper: !combatant.actor?.hasPlayerOwner
                        ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                        : [],
                },
                {}
            );
        }
    }
}

function calculateMaxActions(actor: ActorPF2e) {
    return 3 + (actor.hasCondition("quickened") ? 1 : 0);
}

export async function autoReduceStunned(combatant: CombatantPF2e): Promise<number> {
    let stunReduction = 0;
    if (game.user.isGM && combatant && combatant.actor && combatant.actor.hasCondition("stunned")) {
        const stunned = combatant.actor.getCondition("stunned")?.value ?? 0;
        if (stunned) {
            stunReduction = Math.min(stunned, calculateMaxActions(combatant.actor));
            for (let i = 0; i < stunReduction; i++) {
                await combatant.actor?.decreaseCondition("stunned");
            }
        }
    }
    return stunReduction;
}

export async function reminderCannotAttack(message: ChatMessagePF2e) {
    if (
        message.data &&
        message.data.flags &&
        game.combats.active &&
        message.user &&
        ["spell-attack-roll", "attack-roll"].includes(
            <string>(<ActorFlagsPF2e>message.data.flags.pf2e).context?.type
        ) &&
        shouldIHandleThisMessageForClient(message, true, true)
    ) {
        let reason = "";

        const token: TokenDocumentPF2e = <TokenDocumentPF2e>(
            canvas?.scene?.tokens.get(<string>message.data.speaker.token)
        );

        const actors = [token.actor];
        for (const actor of actors) {
            if ((<CreaturePF2e>actor).isDead) {
                reason = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderCannotAttack.dead`);
            } else if ((actor?.hitPoints?.value ?? 0) <= 0) {
                reason = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderCannotAttack.hasNoHp`);
            } else if (game.combats.active?.combatant?.token === token && game.combats.active.combatant.defeated) {
                reason = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderCannotAttack.defeated`);
            } else if (actor?.hasCondition("unconscious")) {
                reason = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderCannotAttack.unconscious`);
            }

            if (reason.length > 0) {
                ui.notifications.info(
                    game.i18n.format(`${MODULENAME}.SETTINGS.reminderCannotAttack.note`, {
                        actorName: actor?.name || "(unknown)",
                        reason: reason,
                    })
                );
            }
        }
    }
}

export async function reminderTargeting(message: ChatMessagePF2e) {
    if (
        message.data &&
        message.data.flags &&
        message.user &&
        ["spell-attack-roll", "attack-roll"].includes(
            <string>(<ActorFlagsPF2e>message.data.flags.pf2e).context?.type
        ) &&
        shouldIHandleThisMessageForClient(message, true, true)
    ) {
        const targets = message.user.targets;
        if (!targets || targets.size === 0) {
            ui.notifications.info(game.i18n.localize(`${MODULENAME}.SETTINGS.reminderTargeting.note`));
        }
    }
}

export async function reminderIWR(message: ChatMessagePF2e) {
    if (
        game.user?.isGM &&
        message.data &&
        message.data.flags &&
        message.user &&
        message.user.targets &&
        message.user.targets.size >= 1
    ) {
        const targets = message.user.targets;
        const output: string[] = [];
        for (const target of targets) {
            let damageTypes: string[] = Object.keys(
                message.data?.flags?.pf2e?.damageRoll?.types?.valueOf() || {}
            ).flatMap((value, _index) => value);
            if (damageTypes.length === 0) {
                const originUUID = message.data?.flags?.pf2e?.origin?.uuid;
                if (originUUID) {
                    const origin: SpellPF2e | null = <SpellPF2e>await fromUuid(<string>originUUID);
                    damageTypes = Object.values(origin.data.data.damage.value).map((x) => x.type.value);
                }
            }
            if (damageTypes.length > 0) {
                const traits = target.actor?.data.data.traits;
                //Filter traits that are in damageTypes
                const diTypes =
                    traits?.di?.value
                        .filter((value: string) => {
                            return damageTypes.includes(value);
                        })
                        .map((trait) => {
                            return trait?.charAt(0).toLocaleUpperCase() + trait.slice(1);
                        }) || [];
                const dvTypes =
                    traits?.dv
                        .filter((trait) => damageTypes.includes(trait.type))
                        .filter((trait) => trait.value)
                        .map(
                            (trait) =>
                                trait?.type.charAt(0).toLocaleUpperCase() + trait.type?.slice(1) + ":" + trait.value
                        ) || [];
                const drTypes =
                    traits?.dr
                        .filter((trait) => damageTypes.includes(trait.type))
                        .filter((trait) => trait.value)
                        .map(
                            (trait) =>
                                trait?.type.charAt(0).toLocaleUpperCase() + trait.type?.slice(1) + ":" + trait.value
                        ) || [];

                if (diTypes.length > 0) {
                    output.push(game.i18n.localize(`${MODULENAME}.SETTINGS.reminderIWR.immuneTo`) + diTypes.join(", "));
                }
                if (dvTypes.length > 0) {
                    output.push(game.i18n.localize(`${MODULENAME}.SETTINGS.reminderIWR.weakTo`) + dvTypes.join(", "));
                }
                if (drTypes.length > 0) {
                    output.push(
                        game.i18n.localize(`${MODULENAME}.SETTINGS.reminderIWR.resistantTo`) + drTypes.join(", ")
                    );
                }
                if (output.length > 0) {
                    await ChatMessage.create({
                        content:
                            game.i18n.format(`${MODULENAME}.SETTINGS.reminderIWR.is`, {
                                name: target?.actor?.token?.name || "",
                            }) +
                            output +
                            "<br><br>NOTE: Complex IWR such as All, Mental, Physical, etc, are not yet supported, check manually if you target might have such.",
                        whisper: ChatMessage.getWhisperRecipients("GM").map((u) => u.id),
                        blind: true,
                    });
                }
            }
        }
    }
}
