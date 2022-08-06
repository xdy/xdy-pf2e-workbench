import { ChatMessagePF2e } from "@module/chat-message";
import { ActorFlagsPF2e } from "@actor/data/base";
import { ActorPF2e } from "@actor";

export function shouldIHandleThisMessage(message: ChatMessagePF2e, playerCondition = true, gmCondition = true) {
    const userId = message.user.id;
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
    const flags = <ActorFlagsPF2e>message.flags.pf2e;
    let degreeOfSuccess = <string>flags.context?.outcome ?? "";
    if (flags?.context?.isReroll) {
        const match = message.flavor?.match('Result: <span .*? class="(.*?)"');
        if (match && match[1]) {
            degreeOfSuccess = match[1];
        }
    }
    return degreeOfSuccess;
}

export function shouldIHandleThis(actor: ActorPF2e | null) {
    if (!actor) return null;
    const currentUser = game.users.get(game.user.id, { strict: true });
    const activeUsers = game.users.filter((u) => u.active);
    const assignedUser = activeUsers.find((u) => u.character === actor);
    const firstGM = activeUsers.find((u) => u.isGM);
    const anyoneWithPermission = activeUsers.find((u) => actor.canUserModify(u, "update"));
    const updater =
        currentUser.active && actor.canUserModify(currentUser, "update")
            ? currentUser
            : assignedUser ?? firstGM ?? anyoneWithPermission ?? null;
    return game.user.id === updater?.id;
}

export function isFirstGM() {
    return game.user.id === game.users?.find((u) => u.isGM && u.active)?.id;
}
