import { ChatMessagePF2e, TokenDocumentPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { shouldIHandleThis } from "../../utils.js";
import * as systems from "../../../utils/systems.ts";

function ignoreDeadEidolon(actor) {
    return actor?.traits.has("eidolon") && game.settings.get(MODULENAME, "reminderCannotAttackIgnoreDeadEidolon");
}

export function checkAttackValidity(message: ChatMessagePF2e, cancelAttack: boolean): boolean {
    if (!shouldBeChecked(message)) return true;

    const token = getSpeakerToken(message);

    const reason = getAttackReason(
        token,
        // @ts-ignore TODO Fix
        systems.getFlag(message, "context.options")?.filter((o) => o.startsWith("action:")),
    );

    if (reason) {
        // @ts-ignore TODO FIX
        notifyUser(token, reason, systems.getFlag(message, "context.title"), cancelAttack);
        return false;
    }

    return true;
}

function getSpeakerToken(message: ChatMessagePF2e): TokenDocumentPF2e {
    return <TokenDocumentPF2e>canvas?.scene?.tokens.get(<string>message.speaker.token);
}

function shouldBeChecked(message: ChatMessagePF2e): boolean {
    const context = systems.getFlag(message, "context") ?? {};
    // @ts-ignore TODO FIX
    const traits = context?.traits;

    const flag = <string>systems.getFlag(message, "context.type");
    return (
        message.actor &&
        shouldIHandleThis(message.actor) &&
        message.flags &&
        game.combats.active &&
        message.author &&
        ["spell-attack-roll", "attack-roll", "skill-check"].includes(flag) &&
        traits?.some((t) => t === "attack")
    );
}

function getAttackReason(token: TokenDocumentPF2e, actions: string[]): string {
    const actor = token?.actor;
    if (!actor) return "";
    const conditionReasons = {
        dead: `${MODULENAME}.SETTINGS.reminderCannotAttack.dead`,
        hasNoHp: `${MODULENAME}.SETTINGS.reminderCannotAttack.hasNoHp`,
        defeated: `${MODULENAME}.SETTINGS.reminderCannotAttack.defeated`,
        unconscious: `${MODULENAME}.SETTINGS.reminderCannotAttack.unconscious`,
        petrified: `${MODULENAME}.SETTINGS.reminderCannotAttack.petrified`,
        restrained: `${MODULENAME}.SETTINGS.reminderCannotAttack.restrained`,
    };

    if (actor?.isDead && !ignoreDeadEidolon(actor)) {
        return conditionReasons.dead;
    } else if ((actor?.hitPoints?.value ?? 0) <= 0 && !ignoreDeadEidolon(actor) && actor?.type !== "hazard") {
        return conditionReasons.hasNoHp;
    } else if (game.combats.active?.combatant?.token === token && game.combats.active.combatant.defeated) {
        return conditionReasons.defeated;
    } else if (actor?.hasCondition("unconscious")) {
        return conditionReasons.unconscious;
    } else if (actor?.hasCondition("petrified")) {
        return conditionReasons.petrified;
    } else if (
        actor?.hasCondition("restrained") &&
        !["action:escape", "action:force-open"].some((a) => actions.includes(a))
    ) {
        return conditionReasons.restrained;
    }
    return "";
}

function notifyUser(token: TokenDocumentPF2e, reason: string, title: string, cancelAttack: boolean) {
    const reasonKey = cancelAttack ? "reminderCannotAttack.error" : "reminderCannotAttack.info";
    const actorName = token.actor?.name || "(unknown)";

    ui.notifications[cancelAttack ? "error" : "info"](generateNotificationMessage(title, actorName, reason, reasonKey));
}

function generateNotificationMessage(title: string, actorName: string, reason: string, reasonKey: string): string {
    return game.i18n.format(`${MODULENAME}.SETTINGS.${reasonKey}`, {
        title,
        actorName,
        reason: game.i18n.localize(reason),
    });
}

