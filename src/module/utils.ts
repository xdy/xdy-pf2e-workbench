import { ChatMessagePF2e } from "@module/chat-message";
import { ActorFlagsPF2e } from "@actor/data/base";

/**
 * Should only be used for optins with *client* settings.
 * Note that this method *always* defers to a player if one is logged in. I.e. if a GM does something for a logged in player, client automation will not work. E.g. Wounded is not removed if pc is healed.
 * @param clientdocument
 * @param playerCondition
 * @param gmCondition
 */
export function shouldIHandleThisForClient(clientdocument: ClientDocument, playerCondition = true, gmCondition = true) {
    const activePlayerExists =
        clientdocument.hasPlayerOwner &&
        game.users?.players
            .filter((u) => u.active)
            .filter((u) => !u.isGM)
            .filter((u) => clientdocument.canUserModify(u, "update")).length > 0;

    const canModify = clientdocument.canUserModify(game.user, "update");
    const b = !game.user?.isGM && playerCondition && activePlayerExists && canModify;
    if (b) {
        return true;
    } else if (game.user?.isGM && gmCondition && (!activePlayerExists || !playerCondition)) {
        return true;
    } else {
        return false;
    }
}

export function shouldIHandleThisMessageForClient(
    message: ChatMessagePF2e,
    playerCondition: boolean,
    gmCondition: boolean
) {
    const userId = message.data.user;
    const amIMessageSender = userId === game.user?.id;
    if (!game.user?.isGM && playerCondition && amIMessageSender) {
        return true;
    } else if (game.user?.isGM && gmCondition && amIMessageSender) {
        return true;
    }
}

export function nth(n) {
    return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
}

export function degreeOfSuccessWithRerollHandling(message: ChatMessagePF2e): string {
    const flags = <ActorFlagsPF2e>message.data.flags.pf2e;
    let degreeOfSuccess = <string>flags.context?.outcome ?? "";
    if (flags?.context?.isReroll) {
        const match = message.data.flavor?.match('Result: <span .*? class="(.*?)"');
        if (match && match[1]) {
            degreeOfSuccess = match[1];
        }
    }
    return degreeOfSuccess;
}
