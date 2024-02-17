import { minionsInCurrentScene, shouldIHandleThis } from "../../utils.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { CombatantPF2e } from "@module/encounter/index.js";
import { ActorPF2e } from "@actor/base.js";
import { ChatMessagePF2e } from "@module/chat-message/index.js";

export function actionsReminder(combatant: CombatantPF2e, reduction = 0) {
    const actor = combatant.actor;
    if (actor && shouldIHandleThis(actor)) {
        if (shouldShowActionReminder(actor, reduction)) {
            const actionsMessage = `${combatant.token?.name} has ${Math.max(
                calculateMaxActions(actor) -
                    Math.max(
                        actor.getCondition("stunned")?.value ?? 0,
                        actor.getCondition("slowed")?.value ?? 0,
                        reduction,
                    ),
                0,
            )} actions remaining.`;

            ChatMessage.create(
                {
                    flavor: actionsMessage,
                    whisper: !actor?.hasPlayerOwner ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id) : [],
                },
                {},
            ).then();
            ui.notifications.info(actionsMessage);
        }
    }
}

export function shouldShowActionReminder(actor, reduction: number) {
    const reminderAllowSetting = String(game.settings.get(MODULENAME, "actionsReminderAllow"));
    const showForPC = ["all", "players"].includes(reminderAllowSetting) && actor?.hasPlayerOwner;
    const showForNPC = ["all", "gm"].includes(reminderAllowSetting) && !actor?.hasPlayerOwner;
    return (showForPC || showForNPC) && hasConditionOrReduction(actor, reduction);
}

export function hasConditionOrReduction(actor, reduction: number) {
    return actor.hasCondition("stunned", "slowed", "quickened") || reduction > 0;
}

function calculateMaxActions(actor: ActorPF2e) {
    return actor.traits?.has("minion") ? 2 : 3 + (actor.hasCondition("quickened") ? 1 : 0);
}

export async function autoReduceStunned(combatant, userId: string): Promise<number> {
    if (!combatant?.actor || (userId !== game.user.id && !shouldIHandleThis(combatant?.actor))) {
        return 0;
    }

    let stunReduction = 0;
    const actors: ActorPF2e[] = [combatant?.actor, ...minionsInCurrentScene(combatant?.actor)];

    for (const actor of actors) {
        const stunned = actor.getCondition("stunned")?.value ?? 0;
        if (stunned) {
            stunReduction = Math.min(stunned, calculateMaxActions(actor));
            for (let i = 0; i < stunReduction; i++) {
                await actor?.decreaseCondition("stunned");
            }
        }
    }
    return stunReduction;
}

export function reminderTargeting(message: ChatMessagePF2e): boolean {
    const context = message?.flags?.pf2e?.context ?? {};
    const setting = String(game.settings.get(MODULENAME, "reminderTargeting"));

    if (
        message.actor &&
        shouldIHandleThis(message.actor) &&
        message.flags &&
        message.user &&
        ["spell-attack-roll", "attack-roll"].includes(<string>context.type)
    ) {
        const targets = message.user.targets;
        if (!targets || targets.size === 0) {
            const title = context.title;

            if (setting === "reminder") {
                const info = game.i18n.format(`${MODULENAME}.SETTINGS.reminderTargeting.info`, { title });
                ui.notifications.info(info);
            } else if (setting === "mustTarget") {
                const error = game.i18n.format(`${MODULENAME}.SETTINGS.reminderTargeting.error`, { title });
                ui.notifications.error(error);
                return false;
            }
        }
    }
    return true;
}
