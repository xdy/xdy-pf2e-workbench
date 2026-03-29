import { ActorPF2e, ChatMessagePF2e } from "foundry-pf2e";
import { MODULENAME, Phase, phase } from "./xdy-pf2e-workbench.js";
import BaseUser from "foundry/common/documents/user.mjs";
import * as systems from "./utils/systems.ts";

function shouldIHandleThisMessage(message: ChatMessagePF2e, playerCondition = true, gmCondition = true): boolean {
    const amIMessageSender = message.author?.id === game.user?.id;
    if (!game.user?.isGM && playerCondition && amIMessageSender) {
        return true;
    } else if (game.user?.isGM && gmCondition && amIMessageSender) {
        return true;
    }
    return false;
}

// TODO Can this be reworked to not parse the message?
function degreeOfSuccessWithRerollHandling(message: ChatMessagePF2e): string {
    const context = systems.getFlag<Record<string, unknown>>(message, "context");
    let degreeOfSuccess = <string>context?.outcome ?? "";
    if (context?.isReroll) {
        const match = message.flavor?.match('Result: <span .*? class="(.*?)"');
        if (match && match[1]) {
            degreeOfSuccess = match[1];
        }
    }
    return degreeOfSuccess;
}

function isFirstGM(): boolean {
    return game.users.activeGM === game.user;
}

function myRandomId(): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(Array(16).keys())
        .map(() => letters[Math.floor(Math.random() * letters.length)])
        .join("");
}

function isActuallyDamageRoll(message: ChatMessagePF2e): boolean {
    // TODO Anything using this should probably hook into Hooks.call(`pf2e.damageRoll`, rollData) instead...
    const isPhysicalDamageroll =
        message.rolls?.length !== 0 &&
        (message.item?.type ?? "") &&
        ["ancestry", "effect", "feat", "melee", "weapon"].includes(message.item?.type ?? "") &&
        (!message.isRoll || message.isDamageRoll);
    const isSpellDamageRoll = message.item?.type === "spell" && message.isDamageRoll;
    return (
        isPhysicalDamageroll || isSpellDamageRoll
        // TODO (message.flags["xdy-pf2e-workbench"].autoRollDamage.actuallyCasting ?? true) && //TODO Add this (and setting the flag) to support not rolling damage when the chat button is clicked. For now, meh.
    );
}

export { shouldIHandleThisMessage, degreeOfSuccessWithRerollHandling, isFirstGM, myRandomId, isActuallyDamageRoll };

export function logTrace(...args: unknown[]): void {
    log(0, ...args);
}

export function logDebug(...args: unknown[]): void {
    log(1, ...args);
}

export function logInfo(...args: unknown[]): void {
    log(2, ...args);
}

export function logWarn(...args: unknown[]): void {
    log(3, ...args);
}

export function logError(...args: unknown[]): void {
    log(4, ...args);
}

function log(logLevel = 2, ...args: unknown[]): void {
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

export function debounce(callback: (...args: unknown[]) => void, wait: number): (...args: unknown[]) => void {
    let timeout: NodeJS.Timeout | undefined;
    return (...args: unknown[]): void => {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
}

export function shouldIHandleThis(actor: ActorPF2e | null): boolean | null {
    if (!actor) return null;
    const currentUser = game.users.current;
    const activePlayers = game.users.players.filter((u) => u.active);
    const assignedUser = activePlayers.find((u) => u.character === actor);
    const anyoneWithPermission = activePlayers.find((u) => actor.canUserModify(u, "update"));
    const updater =
        currentUser?.active && actor.canUserModify(currentUser, "update")
            ? currentUser
            : (assignedUser ?? game.users.activeGM ?? anyoneWithPermission ?? null);
    return game.user.id === updater?.id;
}

export function pushNotification(message: string, type: string = "info"): void {
    game.socket.emit("module." + MODULENAME, { operation: "notification", args: [type, message] });
}

export function unflatten(object: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    Object.keys(object).forEach(function (k) {
        setValue(result, k, object[k]);
    });
    return result;
}

export function setValue(object: Record<string, unknown>, path: string, value: unknown): void {
    const split = path.split(".");
    const top = split.pop();

    if (top !== undefined) {
        split.reduce(function (o, k, i, kk) {
            return (o[k] = o[k] || (isFinite(i + 1 in kk ? Number(kk[i + 1]) : Number(top)) ? [] : {}));
        }, object)[top] = value;
    }
}

/**
 * Applies patches to a housepatcher object.
 *
 * @param {string} housepatcher - The housepatcher object containing patches.
 * @return {Promise<void>} A promise that resolves when the patches have been applied.
 */
export async function housepatcher(housepatcher: unknown): Promise<void> {
    try {
        const patches = JSON.parse(decodeURI(String(housepatcher)));
        let count = 0;

        for (const { uuid, action, data } of patches) {
            const document = await fromUuid(uuid);
            if (document?.inCompendium) {
                // @ts-expect-error  I think Document#get compendium is missing from the types
                const compendium: CompendiumCollection = document.compendium;

                if (action === "update") {
                    const original: Record<string, unknown> = document.toObject();
                    const system = original?.system as Record<string, unknown> | undefined;
                    const traitsObj = system?.traits as Record<string, unknown> | undefined;
                    const traits = traitsObj?.value as string[] | undefined;

                    const housepatchedTrait = "xdy-pf2e-housepatched";
                    const cccPatchedTrait = "pf2e-ccc-patched";
                    if (!(traits?.includes(cccPatchedTrait) || traits?.includes(housepatchedTrait))) {
                        const update = unflatten(data) as Record<string, unknown>;
                        const updateSystem = (update.system ??= {}) as Record<string, unknown>;
                        const updateTraits = (updateSystem.traits ??= {}) as Record<string, unknown>;
                        const updateValue = (updateTraits.value ??= []) as string[];
                        updateValue.push(housepatchedTrait);

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
    } catch {
        ui.notifications.error(game.i18n.format(`${MODULENAME}.SETTINGS.housepatcher.error`));
        game.settings.set(MODULENAME, "housepatcher", "");
    }
}

export function minionsInCurrentScene(actor: ActorPF2e): ActorPF2e[] {
    return actor.isOfType("character") ? <ActorPF2e[]>game.scenes.current?.tokens
              ?.filter(() => !game.user.isGM)
              ?.filter((token) => token.canUserModify(<BaseUser>(<unknown>game.user), "update"))
              ?.map((token) => token.actor)
              ?.filter((x) => x?.traits.has("minion")) : [];
}

export function setFlag(doc: foundry.abstract.Document, flag: string, value: unknown): Promise<unknown> {
    return doc.setFlag(MODULENAME, flag, value);
}

/**
 * Retrieves the list of party members that are characters
 *
 * @return {Array<Actor>} The list of hero actors.
 */
export function heroes(): ActorPF2e[] {
    return (
        game.actors?.party?.members
            .filter((actor) => actor?.isOfType("character"))
            .filter((actor) => !actor?.system.traits?.value.toString().includes("minion"))
            .filter((actor) => !actor?.system.traits?.value.toString().includes("eidolon")) || []
    );
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
