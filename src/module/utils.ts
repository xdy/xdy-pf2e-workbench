import { ChatMessagePF2e } from "@module/chat-message";
import { ActorFlagsPF2e } from "@actor/data/base";

export function shouldIHandleThis(
    userId: string | undefined | null,
    playerCondition = true,
    gmCondition = true,
    extraCondition = true
) {
    const isUserActive = game.users?.players
        .filter((u) => u.active)
        .filter((u) => !u.isGM)
        .find((u) => u.id === userId);
    const rollAsPlayer = isUserActive && !game.user?.isGM && extraCondition && playerCondition;
    const rollAsGM = game.user?.isGM && extraCondition && !isUserActive && gmCondition;
    return rollAsPlayer || rollAsGM;
}

export function shouldIHandleThisMessage(message: ChatMessagePF2e, playerCondition: boolean, gmCondition: boolean) {
    const userId = message.data.user;
    const amIMessageSender = userId === game.user?.id;
    return shouldIHandleThis(userId, playerCondition, gmCondition, amIMessageSender);
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
