import { isFirstGM, myRandomId, shouldIHandleThis } from "../../utils.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { TokenDocumentPF2e } from "@module/scene/index.js";
import { CombatantPF2e } from "@module/encounter/index.js";
import { ActorPF2e } from "@actor/base.js";
import { ActorFlagsPF2e } from "@actor/data/base.js";
import { ChatMessagePF2e } from "@module/chat-message/document.js";

export async function reminderBreathWeapon(message: ChatMessagePF2e) {
    const content = message.content;
    if (isFirstGM() && content && game.combats && game.combats.active) {
        const token: TokenDocumentPF2e = <
            TokenDocumentPF2e // @ts-ignore
        >canvas?.scene?.tokens.get(<string>message.speaker.token);

        const actor = token?.actor;
        if (actor) {
            const formulaMatch = content.match("1d(4|6) #(rounds|Rounds|recharge|Recharge)");
            const dieSize = formulaMatch ? `1d${formulaMatch[1]}` : "";

            if (dieSize) {
                const title = content.match(/.*title="(.*?)" width.*/);
                const effect = {
                    type: "effect",
                    name:
                        game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.used`) +
                        (title
                            ? title[1]
                            : game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`)),
                    img: "systems/pf2e/icons/spells/dragon-breath.webp",
                    system: {
                        tokenIcon: { show: true },
                        duration: {
                            value: new Roll(dieSize).roll({ async: false }).total + 1,
                            unit: "rounds",
                            sustained: false,
                            expiry: "turn-start",
                        },
                        description: {
                            value: `<h2>${game.i18n.format(`${MODULENAME}.SETTINGS.reminderBreathWeapon.name`)}</h2>`,
                        },
                        source: {
                            value: game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`),
                        },
                        rules: [],
                        slug: `xdy-breath-weapon-reminder-${myRandomId()}`,
                        unidentified: game.settings.get(MODULENAME, "reminderBreathWeaponHidden"),
                        traits: {
                            value: [],
                        },
                        level: {
                            value: actor.level ?? 0,
                        },
                        badge: null,
                        context: null,
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
            ["all", "players"].includes(String(game.settings.get(MODULENAME, "actionsReminderAllow"))) &&
            combatant.actor?.hasPlayerOwner;
        const showForNPC =
            ["all", "gm"].includes(String(game.settings.get(MODULENAME, "actionsReminderAllow"))) &&
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
                        reduction,
                    ),
                0,
            )} actions remaining.`;
            ChatMessage.create(
                {
                    flavor: actionsMessage,
                    whisper: !combatant.actor?.hasPlayerOwner
                        ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                        : [],
                },
                {},
            ).then();
            ui.notifications.info(actionsMessage);
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
            if (actor?.isDead && !ignoreDeadEidolon(actor)) {
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
                    }),
                );
            }
        }
    }
}

export function reminderTargeting(message: ChatMessagePF2e): boolean {
    let result = true;
    if (
        message.actor &&
        shouldIHandleThis(message.actor) &&
        message.flags &&
        message.user &&
        ["spell-attack-roll", "attack-roll"].includes(<string>(<ActorFlagsPF2e>message.flags.pf2e).context?.type)
    ) {
        const targets = message.user.targets;
        if (!targets || targets.size === 0) {
            if (String(game.settings.get(MODULENAME, "reminderTargeting")) === "reminder") {
                ui.notifications.info(game.i18n.localize(`${MODULENAME}.SETTINGS.reminderTargeting.info`));
            } else if (String(game.settings.get(MODULENAME, "reminderTargeting")) === "mustTarget") {
                ui.notifications.error(game.i18n.localize(`${MODULENAME}.SETTINGS.reminderTargeting.error`));
                result = false;
            }
        }
    }
    return result;
}
