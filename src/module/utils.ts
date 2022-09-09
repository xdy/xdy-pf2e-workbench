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
    return false;
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

export function randomID() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(Array(16).keys())
        .map(() => letters[Math.floor(Math.random() * letters.length)])
        .join("");
}

// Webpack yells at me if I use the system sluggify. Not up to yelling back at it right now. Everything below this is from: https://github.com/xdy-forks/pf2e/blob/af99fccbf93fd8316f5aeeccdfab3646090a62bd/src/util/misc.ts

const wordCharacter = String.raw`[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Join_Control}]`;
const nonWordCharacter = String.raw`[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Join_Control}]`;
const nonWordCharacterRE = new RegExp(nonWordCharacter, "gu");

const wordBoundary = String.raw`(?:${wordCharacter})(?=${nonWordCharacter})|(?:${nonWordCharacter})(?=${wordCharacter})`;
const nonWordBoundary = String.raw`(?:${wordCharacter})(?=${wordCharacter})`;
const lowerCaseLetter = String.raw`\p{Lowercase_Letter}`;
const upperCaseLetter = String.raw`\p{Uppercase_Letter}`;
const lowerCaseThenUpperCaseRE = new RegExp(`(${lowerCaseLetter})(${upperCaseLetter}${nonWordBoundary})`, "gu");

const nonWordCharacterHyphenOrSpaceRE = /[^-\p{White_Space}\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Join_Control}]/gu;
const upperOrWordBoundariedLowerRE = new RegExp(`${upperCaseLetter}|(?:${wordBoundary})${lowerCaseLetter}`, "gu");

/**
 * The system's sluggification algorithm for labels and other terms.
 * @param [camel=null] The sluggification style to use: null is default, and there are otherwise two camel options.
 */
export function sluggify(str: string, { camel = null }: { camel?: "dromedary" | "bactrian" | null } = {}): string {
    switch (camel) {
        case null:
            return str
                .replace(lowerCaseThenUpperCaseRE, "$1-$2")
                .toLowerCase()
                .replace(/['’]/g, "")
                .replace(nonWordCharacterRE, " ")
                .trim()
                .replace(/[-\s]+/g, "-");
        case "bactrian": {
            const dromedary = sluggify(str, { camel: "dromedary" });
            return dromedary.charAt(0).toUpperCase() + dromedary.slice(1);
        }
        case "dromedary":
            return str
                .replace(nonWordCharacterHyphenOrSpaceRE, "")
                .replace(/[-_]+/g, " ")
                .replace(upperOrWordBoundariedLowerRE, (part, index) =>
                    index === 0 ? part.toLowerCase() : part.toUpperCase()
                )
                .replace(/\s+/g, "");
        default:
            throw Error("I don't think that's a real camel.");
    }
}
