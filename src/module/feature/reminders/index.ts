import { isFirstGM, randomID, shouldIHandleThis } from "../../utils";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { TokenDocumentPF2e } from "@scene";
import { CombatantPF2e } from "@module/encounter";
import { ActorFlagsPF2e } from "@actor/data/base";
import { ChatMessagePF2e } from "@module/chat-message";
import { SpellPF2e } from "@item";
import { ActorPF2e, CreaturePF2e } from "@actor";

export async function reminderBreathWeapon(message: ChatMessagePF2e) {
    const content = message.content;
    if (isFirstGM() && content && game.combats && game.combats.active) {
        const token: TokenDocumentPF2e = <
            TokenDocumentPF2e // @ts-ignore
        >canvas?.scene?.tokens.get(<string>message.speaker.token);

        const actors = [token?.actor];
        for (const actor of actors) {
            const prefix = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.prefix`);
            const matcher = `(.*)\\[\\[\\/br 1d([4|6]) \\#(${prefix}(.*?))\\]\\]`;
            const match = content.match(matcher);
            const matchString = match ? `1d${match[2]}` : "";

            if (matchString) {
                const title = content.match(/.*title="(.*?)" width.*/);
                const effect = {
                    type: "effect",
                    name:
                        game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.used`) +
                        (title
                            ? title[1]
                            : game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`)),
                    img: "systems/pf2e/icons/spells/dragon-breath.webp",
                    data: {
                        tokenIcon: { show: true },
                        duration: {
                            value: new Roll(matchString).roll({ async: false }).total + 1,
                            unit: "rounds",
                            sustained: false,
                            expiry: "turn-start",
                        },
                        description: {
                            value: `<h2>Breath Weapon Reminder</h2>`,
                        },
                        source: {
                            value: game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`),
                        },
                        slug: `xdy-breath-weapon-reminder-${randomID()}`,
                    },
                };

                // @ts-ignore
                await actor?.createEmbeddedDocuments("Item", [effect]);
            }
        }
    }
}

export function actionsReminder(combatant: CombatantPF2e, reduction = 0) {
    if (shouldIHandleThis(combatant.actor) && combatant && combatant.actor) {
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
            ChatMessage.create(
                {
                    flavor: actionsMessage,
                    whisper: !combatant.actor?.hasPlayerOwner
                        ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                        : [],
                },
                {}
            ).then();
        }
    }
}

function calculateMaxActions(actor: ActorPF2e) {
    return 3 + (actor.hasCondition("quickened") ? 1 : 0);
}

export async function autoReduceStunned(combatant: CombatantPF2e): Promise<number> {
    let stunReduction = 0;
    if (isFirstGM() && combatant && combatant.actor && combatant.actor.hasCondition("stunned")) {
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

function ignoreDeadEidolon(actor) {
    return actor?.traits.has("eidolon") && game.settings.get(MODULENAME, "reminderCannotAttackIgnoreDeadEidolon");
}

export async function reminderCannotAttack(message: ChatMessagePF2e) {
    if (
        message.actor &&
        shouldIHandleThis(message.actor) &&
        message.flags &&
        game.combats.active &&
        message.user &&
        ["spell-attack-roll", "attack-roll"].includes(<string>(<ActorFlagsPF2e>message.flags.pf2e).context?.type)
    ) {
        let reason = "";

        // @ts-ignore
        const token: TokenDocumentPF2e = <TokenDocumentPF2e>canvas?.scene?.tokens.get(<string>message.speaker.token);

        const actors = [token.actor];
        for (const actor of actors) {
            if ((<CreaturePF2e>actor).isDead && !ignoreDeadEidolon(actor)) {
                reason = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderCannotAttack.dead`);
            } else if ((actor?.hitPoints?.value ?? 0) <= 0 && !ignoreDeadEidolon(actor)) {
                reason = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderCannotAttack.hasNoHp`);
            } else if (game.combats.active?.combatant?.token === token && game.combats.active.combatant.defeated) {
                reason = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderCannotAttack.defeated`);
            } else if (actor?.hasCondition("unconscious")) {
                reason = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderCannotAttack.unconscious`);
            } else if (actor?.hasCondition("petrified")) {
                reason = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderCannotAttack.petrified`);
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
        message.actor &&
        shouldIHandleThis(message.actor) &&
        message.flags &&
        message.user &&
        ["spell-attack-roll", "attack-roll"].includes(<string>(<ActorFlagsPF2e>message.flags.pf2e).context?.type)
    ) {
        const targets = message.user.targets;
        if (!targets || targets.size === 0) {
            ui.notifications.info(game.i18n.localize(`${MODULENAME}.SETTINGS.reminderTargeting.note`));
        }
    }
}

export async function reminderIWR(message: ChatMessagePF2e) {
    if (game.user?.isGM && message.flags && message.user && message.user.targets && message.user.targets.size >= 1) {
        const targets = message.user.targets;
        const output: string[] = [];
        for (const target of targets) {
            let damageTypes: string[] = Object.keys(message.flags?.pf2e?.damageRoll?.types?.valueOf() || {}).flatMap(
                (value, _index) => value
            );
            if (damageTypes.length === 0) {
                const originUUID = message.flags?.pf2e?.origin?.uuid;
                if (originUUID) {
                    const origin: SpellPF2e | null = <SpellPF2e>await fromUuid(<string>originUUID);
                    damageTypes = Object.values(origin.system.damage.value).map((x) => x.type.value);
                }
            }
            if (damageTypes.length > 0) {
                const traits = target.actor?.system.traits;
                // Filter traits that are in damageTypes
                const diTypes = traits?.di?.value
                    ? traits?.di?.value
                          ?.filter((value: string) => {
                              return damageTypes.includes(value);
                          })
                          .map((trait) => {
                              return trait?.charAt(0).toLocaleUpperCase() + trait.slice(1);
                          })
                    : [];
                const dvTypes = traits?.dv
                    ? traits?.dv
                          .filter((trait) => damageTypes.includes(trait.type))
                          .filter((trait) => trait.value)
                          .map(
                              (trait) =>
                                  trait?.type.charAt(0).toLocaleUpperCase() + trait.type?.slice(1) + ":" + trait.value
                          )
                    : [];
                const drTypes = traits?.dr
                    ? traits?.dr
                          .filter((trait) => damageTypes.includes(trait.type))
                          .filter((trait) => trait.value)
                          .map(
                              (trait) =>
                                  trait?.type.charAt(0).toLocaleUpperCase() + trait.type?.slice(1) + ":" + trait.value
                          )
                    : [];

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
                    let caveat = "";
                    if (game.settings.get(MODULENAME, "reminderIWRCaveat")) {
                        caveat = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderIWR.notComplex`);
                    }
                    ChatMessage.create({
                        content:
                            game.i18n.format(`${MODULENAME}.SETTINGS.reminderIWR.is`, {
                                name: target?.actor?.token?.name || "",
                            }) +
                            output +
                            caveat,
                        whisper: ChatMessage.getWhisperRecipients("GM").map((u) => u.id),
                        blind: true,
                    }).then();
                }
            }
        }
    }
}
