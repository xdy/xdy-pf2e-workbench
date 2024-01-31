import { ChatMessagePF2e } from "@module/chat-message/index.js";
import { MODULENAME, Phase, phase } from "./xdy-pf2e-workbench.js";
import { ActorFlagsPF2e } from "@actor/data/base.js";

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
    return game.users.activeGM === game.user;
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

export { shouldIHandleThisMessage, degreeOfSuccessWithRerollHandling, isFirstGM, myRandomId, isActuallyDamageRoll };

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
    const currentUser = game.users.current;
    const activePlayers = game.users.players.filter((u) => u.active);
    const assignedUser = activePlayers.find((u) => u.character === actor);
    const anyoneWithPermission = activePlayers.find((u) => actor.canUserModify(u, "update"));
    const updater =
        currentUser?.active && actor.canUserModify(currentUser, "update")
            ? currentUser
            : assignedUser ?? game.users.activeGM ?? anyoneWithPermission ?? null;
    return game.user.id === updater?.id;
}

export function pushNotification(message: any, type: string = "info") {
    game.socket.emit("module." + MODULENAME, { operation: "notification", args: [type, message] });
}

export function unflatten(object) {
    const result = {};
    Object.keys(object).forEach(function (k) {
        setValue(result, k, object[k]);
    });
    return result;
}

export function setValue(object, path, value) {
    const split = path.split(".");
    const top = split.pop();

    split.reduce(function (o, k, i, kk) {
        return (o[k] = o[k] || (isFinite(i + 1 in kk ? kk[i + 1] : top) ? [] : {}));
    }, object)[top] = value;
}

/**
 * Applies patches to a housepatcher object.
 *
 * @param {string} housepatcher - The housepatcher object containing patches.
 * @return {Promise<void>} A promise that resolves when the patches have been applied.
 */
export async function housepatcher(housepatcher) {
    try {
        const patches = JSON.parse(decodeURI(String(housepatcher)));
        let count = 0;

        for (const { uuid, action, data } of patches) {
            const document = await fromUuid(uuid);

            if (document?.compendium) {
                const compendium = document.compendium;

                if (action === "update") {
                    const original: any = document.toObject();
                    const traits = original?.system?.traits?.value;

                    const housepatchedTrait = "xdy-pf2e-housepatched";
                    const cccPatchedTrait = "pf2e-ccc-patched";
                    if (!(traits?.includes(cccPatchedTrait) || traits?.includes(housepatchedTrait))) {
                        const update: any = unflatten(data);
                        update.system = update.system ?? {};
                        update.system.traits = update.system.traits ?? {};
                        update.system.traits.value = update.system.traits.value ?? [];
                        update.system.traits.value.push(housepatchedTrait);

                        const merged = fu.mergeObject(original, update);
                        await document.update(unflatten(merged));
                        count += 1;
                    }
                } else if (action === "unlock") {
                    if (compendium.locked) {
                        await compendium.configure({ locked: false });
                    }
                } else if (action === "lock") {
                    if (!compendium.locked) {
                        await compendium.configure({ locked: true });
                    }
                } else if (action === "delete") {
                    await document.delete();
                    await compendium.getIndex();
                }
            }
        }

        const message = game.i18n.format(`${MODULENAME}.SETTINGS.housepatcher.notification`, { count });
        ui.notifications.info(message);
    } catch (e) {
        ui.notifications.error(game.i18n.format(`${MODULENAME}.SETTINGS.housepatcher.error`));
        game.settings.set(MODULENAME, "housepatcher", "");
    }
}

export function setFlag(doc, flag, value) {
    return doc.setFlag(MODULENAME, flag, value);
}

// Functions copied from C:\Users\jk\foundryvtt\forks\pf2e\build\lib\foundry-utils.ts
// Not sure why I can't use directly.

/**
 * Check if a key is present in a given object in a type safe way
 *
 * @param obj The object to check
 * @param key The key to check
 */
export function objectHasKey<O extends object>(obj: O, key: unknown): key is keyof O {
    return (typeof key === "string" || typeof key === "number") && key in obj;
}
