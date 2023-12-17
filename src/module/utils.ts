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

// Bunch of functions copied from C:\Users\jk\foundryvtt\forks\pf2e\build\lib\foundry-utils.ts

/**
 * From pf2e
 * A helper function which searches through an object to assign a value using a string key
 * This string key supports the notation a.b.c which would target object[a][b][c]
 *
 * @param obj {Object}   The object to update
 * @param key {String}      The string key
 * @param value             The value to be assigned
 *
 * @return A flag for whether or not the object was updated
 */
export function pf2eSetProperty(obj: object, key: string, value: unknown): boolean {
    let target = obj;
    let changed = false;

    // Convert the key to an object reference if it contains dot notation
    if (key.indexOf(".") !== -1) {
        const parts = key.split(".");
        key = parts.pop() ?? "";
        target = parts.reduce((o, i) => {
            if (!Object.prototype.hasOwnProperty.call(o, i)) (o as Record<string, unknown>)[i] = {};
            return (o as Record<string, unknown>)[i] as unknown as Record<string, unknown>;
        }, obj);
    }

    // Update the target
    if ((target as Record<string, unknown>)[key] !== value) {
        changed = true;
        (target as Record<string, unknown>)[key] = value;
    }

    // Return changed status
    return changed;
}

/**
 * From pf2e
 * Quickly clone a simple piece of data, returning a copy which can be mutated safely.
 * This method DOES support recursive data structures containing inner objects or arrays.
 * This method DOES NOT support advanced object types like Set, Map, or other specialized classes.
 * @param original Some sort of data
 * @return The clone of that data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pf2eDeepClone<T>(original: T): T extends Set<any> | Map<any, any> | Collection<any> ? never : T {
    // Simple types
    if (typeof original !== "object" || original === null)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return original as T extends Set<any> | Map<any, any> | Collection<any> ? never : T;

    // Arrays
    if (original instanceof Array)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return original.map(pf2eDeepClone) as unknown as T extends Set<any> | Map<any, any> | Collection<any>
            ? never
            : T;

    // Dates
    if (original instanceof Date)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new Date(original) as unknown as T extends Set<any> | Map<any, any> | Collection<any> ? never : T;

    // Unsupported advanced objects
    if ((original as { constructor: unknown }).constructor !== Object)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return original as T extends Set<any> | Map<any, any> | Collection<any> ? never : T;

    // Other objects
    const clone: Record<string, unknown> = {};
    for (const k of Object.keys(original)) {
        clone[k] = pf2eDeepClone(original[k as keyof typeof original]);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return clone as unknown as T extends Set<any> | Map<any, any> | Collection<any> ? never : T;
}

/** Update a source object by replacing its keys and values with those from a target object. */
export function pf2eMergeObject<T extends object, _U extends object = T>(
    original: object,
    other: object = {},
    {
        insertKeys = true,
        insertValues = true,
        overwrite = true,
        recursive = true,
        inplace = true,
        enforceTypes = false,
        performDeletions = false,
    } = {},
    _d = 0,
): object {
    other = other || {};
    if (!(original instanceof Object) || !(other instanceof Object)) {
        throw new Error("One of original or other are not Objects!");
    }
    const options = { insertKeys, insertValues, overwrite, recursive, inplace, enforceTypes, performDeletions };

    // Special handling at depth 0
    if (_d === 0) {
        if (Object.keys(other).some((k) => /\./.test(k))) other = expandObject(other);
        if (Object.keys(original).some((k) => /\./.test(k))) {
            const expanded = expandObject(original);
            if (inplace) {
                Object.keys(original).forEach((k) => delete (original as Record<string, unknown>)[k]);
                Object.assign(original, expanded);
            } else original = expanded;
        } else if (!inplace) original = foundry.utils.deepClone(original);
    }

    // Iterate over the other object
    for (const k of Object.keys(other)) {
        const v = (other as Record<string, unknown>)[k];
        if (Object.hasOwn(original, k)) _mergeUpdate(original, k, v, options, _d + 1);
        else _mergeInsert(original, k, v, options, _d + 1);
    }
    return original;
}

function expandObject(obj: object, _d = 0) {
    const expanded = {};
    if (_d > 10) throw new Error("Maximum depth exceeded");
    for (const [k, v0] of Object.entries(obj)) {
        let v = v0;
        if (v instanceof Object && !Array.isArray(v)) v = expandObject(v, _d + 1);
        pf2eSetProperty(expanded, k, v);
    }
    return expanded;
}

/** A helper function for merging objects when the target key exists in the original */
function _mergeUpdate(
    original: object,
    k: string,
    v: unknown,
    {
        insertKeys,
        insertValues,
        enforceTypes,
        overwrite,
        recursive,
        performDeletions,
    }: Partial<MergeObjectOptions> = {},
    _d: number,
): object | void {
    const x = (original as Record<string, unknown>)[k];
    const tv = getType(v);
    const tx = getType(x);

    // Recursively merge an inner object
    if (tv === "Object" && tx === "Object" && recursive) {
        return pf2eMergeObject(
            x as object,
            v as object,
            {
                insertKeys,
                insertValues,
                overwrite,
                enforceTypes,
                performDeletions,
                inplace: true,
            },
            _d,
        );
    }

    // Overwrite an existing value
    if (overwrite) {
        if (tx !== "undefined" && tv !== tx && enforceTypes) {
            throw new Error(`Mismatched data types encountered during object merge.`);
        }
        (original as Record<string, unknown>)[k] = v;
    }
}

/**
 * Learn the named type of a token - extending the functionality of typeof to recognize some core Object types
 * @param token     Some passed token
 * @return The named type of the token
 */
function getType(token: unknown): string {
    const tof = typeof token;
    if (typeof token === "object") {
        if (token === null) return "null";
        const cn = token.constructor.name;
        if (["String", "Number", "Boolean", "Array", "Set"].includes(cn)) return cn;
        else if (/^HTML/.test(cn)) return "HTMLElement";
        else return "Object";
    }
    return tof;
}

/** A helper function for merging objects when the target key does not exist in the original */
function _mergeInsert(
    original: object,
    k: string,
    v: unknown,
    {
        insertKeys,
        insertValues,
        performDeletions,
    }: { insertKeys?: boolean; insertValues?: boolean; performDeletions?: boolean } = {},
    _d: number,
): object | void {
    // Delete a key
    if (k.startsWith("-=") && performDeletions) {
        delete (original as Record<string, unknown>)[k.slice(2)];
        return;
    }

    const canInsert = (_d <= 1 && insertKeys) || (_d > 1 && insertValues);
    if (!canInsert) return;

    // Recursively create simple objects
    if (v?.constructor === Object) {
        (original as Record<string, unknown>)[k] = pf2eMergeObject({}, v, {
            insertKeys: true,
            inplace: true,
            performDeletions,
        });
        return;
    }

    // Insert a key
    (original as Record<string, unknown>)[k] = v;
}

/**
 * From foundry
 * A helper function which searches through an object to retrieve a value by a string key.
 * The method also supports arrays if the provided key is an integer index of the array.
 * The string key supports the notation a.b.c which would return object[a][b][c]
 * @param {object} object   The object to traverse
 * @param {string} key      An object property with notation a.b.c
 * @return {*}              The value of the found property
 */
export function foundryGetProperty(object, key) {
    if (!key) return undefined;
    let target = object;
    for (const p of key.split(".")) {
        const t = getType(target);
        if (!(t === "Object" || t === "Array")) return undefined;
        if (p in target) target = target[p];
        else return undefined;
    }
    return target;
}
