import { ActorFlagsPF2e } from "@actor/data/base.js";
import { MODULENAME, Phase, phase } from "./xdy-pf2e-workbench.js";
import { ChatMessagePF2e } from "@module/chat-message/document.js";

function shouldIHandleThisMessage(message: ChatMessagePF2e, playerCondition = true, gmCondition = true) {
    const userId = message.user.id;
    const amIMessageSender = userId === game.user?.id;
    if (!game.user?.isGM && playerCondition && amIMessageSender) {
        return true;
    } else if (game.user?.isGM && gmCondition && amIMessageSender) {
        return true;
    }
    return false;
}

function nth(n) {
    return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
}

// TODO Can this be reworked to not parse the message?
function degreeOfSuccessWithRerollHandling(message: ChatMessagePF2e): string {
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

function isFirstGM() {
    return game.user.id === game.users?.find((u) => u.isGM && u.active)?.id;
}

function myRandomId() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(Array(16).keys())
        .map(() => letters[Math.floor(Math.random() * letters.length)])
        .join("");
}

function isActuallyDamageRoll(message) {
    // TODO Anything using this should probably hook into Hooks.call(`pf2e.damageRoll`, rollData) instead...
    const isPhysicalDamageroll =
        message.rolls?.length !== 0 &&
        ["ancestry", "effect", "feat", "melee", "weapon"].includes(message.item?.type) &&
        (!message.isRoll || message.isDamageRoll);
    const isSpellDamageRoll = message.item?.type === "spell" && message.isDamageRoll;
    return (
        isPhysicalDamageroll || isSpellDamageRoll
        // TODO (message.flags["xdy-pf2e-workbench"].autoRollDamage.actuallyCasting ?? true) && //TODO Add this (and setting the flag) to support not rolling damage when the chat button is clicked. For now, meh.
    );
}

export {
    shouldIHandleThisMessage,
    nth,
    degreeOfSuccessWithRerollHandling,
    isFirstGM,
    myRandomId,
    isActuallyDamageRoll,
};

export function logTrace(...args) {
    log(0, ...args);
}

export function logDebug(...args) {
    log(1, ...args);
}

export function logInfo(...args) {
    log(2, ...args);
}

export function logWarn(...args) {
    log(3, ...args);
}

export function logError(...args) {
    log(4, ...args);
}

function log(logLevel = 2, ...args) {
    let number = 2;
    if (phase >= Phase.READY) {
        number = Number(game.settings.get(MODULENAME, "logLevel")) ?? 2;
    }

    if (logLevel >= number) {
        switch (logLevel) {
            case 0:
                console.trace(...args);
                break;
            case 1:
                console.debug(...args);
                break;
            case 2:
                console.info(...args);
                break;
            case 3:
                console.warn(...args);
                break;
            case 4:
                console.error(...args);
                break;
            case 5:
                break;
        }
    }
}

export function debounce(callback, wait) {
    let timeout;
    return (...args) => {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
}

export function shouldIHandleThis(actor) {
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
