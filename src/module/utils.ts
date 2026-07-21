import { ActorPF2e, ChatMessagePF2e, PhysicalItemPF2e } from "foundry-pf2e";
import { MODULENAME } from "./constants.ts";
import BaseUser from "foundry/common/documents/user.mjs";
import * as systems from "./utils/systems.ts";
import { logError } from "./utils/logging.ts";

export function getModuleSetting<T>(key: string): T {
    const value = game.settings.get(MODULENAME, key);
    if (value === undefined || value === null) {
        logError(`${MODULENAME} | Setting "${key}" returned ${value}`);
    }
    return value as T;
}

export function getModuleSettingAsNumber(key: string, fallback = 0): number {
    const raw = game.settings.get(MODULENAME, key);
    if (raw === null || raw === undefined) return fallback;
    const n = Number.parseInt(String(raw));
    return Number.isNaN(n) ? fallback : n;
}

export function actorHasItemBySlug(actor: ActorPF2e, slug: string): boolean {
    for (const item of actor.items) {
        if ((item as unknown as { slug?: string }).slug === slug) return true;
    }
    return false;
}

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

/**
 * Resolves the actor from a chat message's speaker, preferring the token's actor.
 */
function getActorFromMessage(message: ChatMessagePF2e): ActorPF2e | null {
    const messageToken = canvas?.scene?.tokens.get(message.speaker.token as string);
    return messageToken?.actor ?? game.actors?.get(message.speaker.actor as string) ?? null;
}

export function extractHtmlElement(element: unknown): HTMLElement | undefined {
    return element instanceof HTMLElement ? element : (element as ArrayLike<HTMLElement>)[0];
}

export function sendHeldItemChatMessage(
    actor: ActorPF2e,
    items: PhysicalItemPF2e[],
    i18nKey: string,
    context: string,
): void {
    const message = game.i18n.format(i18nKey, {
        name: game?.scenes?.current?.tokens?.find((t) => t.actor?.id === actor.id)?.name ?? actor.name,
        items: items.map((i) => i.name).join(", "),
    });
    fireAndForget(
        ChatMessage.create({
            flavor: message,
            speaker: ChatMessage.getSpeaker({ actor }),
        }),
        context,
    );
}

export {
    shouldIHandleThisMessage,
    degreeOfSuccessWithRerollHandling,
    isFirstGM,
    isActuallyDamageRoll,
    getActorFromMessage,
};

export function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const NOT_MYSTIFIED_VALUE = "999";

export const MAX_ABSOLUTE_LEVEL = 20;

type Result<T> = { ok: true; value: T } | { ok: false };

/**
 * Fire-and-forget a promise with error logging.
 * Use when there is no result or it does not matter.
 */
export function fireAndForget(promise: Promise<unknown>, context: string): void {
    promise.catch((err) => logError(`${MODULENAME} | ${context}:`, err));
}

async function tryWithLogging<T>(fn: () => Promise<T>, context: string): Promise<Result<T>> {
    try {
        return { ok: true, value: await fn() };
    } catch (err) {
        logError(`${MODULENAME} | ${context}:`, err);
        return { ok: false };
    }
}

export async function tryOrDefault<T>(fn: () => Promise<T>, fallback: T, context: string): Promise<T> {
    const result = await tryWithLogging(fn, context);
    return result.ok ? result.value : fallback;
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

export function pushNotification(type: string, message: string): void {
    game.socket.emit("module." + MODULENAME, { operation: "notification", args: [type, message] });
}

function unflatten(object: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(object)) {
        setValue(result, key, object[key]);
    }
    return result;
}

function setValue(object: Record<string, unknown>, path: string, value: unknown): void {
    const split = path.split(".");
    const top = split.pop();

    if (top !== undefined) {
        // @ts-expect-error TODO fix typing
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

export function getModuleFlag<T>(
    doc: { getFlag?: (scope: string, key: string) => unknown } | null | undefined,
    flag: string,
    fallback: T,
): T;
export function getModuleFlag<T>(
    doc: { getFlag?: (scope: string, key: string) => unknown } | null | undefined,
    flag: string,
): T | undefined;
export function getModuleFlag<T>(
    doc: { getFlag?: (scope: string, key: string) => unknown } | null | undefined,
    flag: string,
    fallback?: T,
): T | undefined {
    const raw = doc?.getFlag?.(MODULENAME, flag) as T | undefined;
    return raw !== undefined && raw !== null ? raw : fallback;
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
