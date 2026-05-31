import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import * as systems from "../../utils/systems.ts";
import { ChatMessagePF2e } from "foundry-pf2e";
import { autoRollDamage } from "./index.ts";

export const pendingToolbeltDamageInjections = new Map<
    string,
    { targetHelperData: ToolbeltTargetHelperData; createdAt: number }
>();

export const toolbeltTargetHelperCache = new Map<string, { data: ToolbeltTargetHelperData; updatedAt: number }>();
export const toolbeltSaveTracker = new Map<string, ToolbeltSaveTrackerState>();

export function clearToolbeltCaches(): void {
    toolbeltSaveTracker.clear();
    toolbeltTargetHelperCache.clear();
    pendingToolbeltDamageInjections.clear();
}

type LibWrapperApi = { register: (...args: unknown[]) => void };
type ChatMessageWrapper = (
    this: ChatMessagePF2e,
    wrapped: (...args: unknown[]) => Promise<unknown>,
    ...args: unknown[]
) => Promise<unknown>;

function wrapChatMessage(method: string, fn: ChatMessageWrapper): void {
    const api = (globalThis as unknown as { libWrapper?: LibWrapperApi }).libWrapper;
    api?.register(MODULENAME, method, fn, "WRAPPER");
}

let toolbeltWrappersRegistered = false;

export function registerToolbeltWrappers(): void {
    if (toolbeltWrappersRegistered) {
        return;
    }

    if (!(globalThis as unknown as { libWrapper?: LibWrapperApi }).libWrapper) {
        return;
    }

    wrapChatMessage("ChatMessage.prototype.update", function (this, wrapped, changes, ...args) {
        cacheToolbeltTargetHelperData(this.id, readTargetHelperFromUpdate(changes as Record<string, unknown>));
        return wrapped(changes, ...args);
    });

    wrapChatMessage("ChatMessage.prototype.setFlag", function (this, wrapped, scope, key, value, ...args) {
        if (scope === "pf2e-toolbelt" && key === "targetHelper") {
            if (value && typeof value === "object") {
                cacheToolbeltTargetHelperData(this.id, value);
            } else {
                toolbeltTargetHelperCache.delete(this.id);
            }
        }
        return wrapped(scope, key, value, ...args);
    });

    wrapChatMessage("ChatMessage.prototype._preCreate", function (this, wrapped, data, ...args) {
        const originUuid = systems.getFlag<string>(this, "origin.uuid");
        if (this.isDamageRoll && originUuid) {
            const pending = pendingToolbeltDamageInjections.get(originUuid);
            if (pending) {
                this.updateSource({
                    flags: { "pf2e-toolbelt": { targetHelper: pending.targetHelperData } },
                });
                pendingToolbeltDamageInjections.delete(originUuid);
            }
        }
        return wrapped(data, ...args);
    });

    toolbeltWrappersRegistered = true;
}

function readTargetHelperFromUpdate(changes: Record<string, unknown>): unknown {
    const flattened = changes["flags.pf2e-toolbelt.targetHelper"];
    if (flattened !== undefined) {
        return flattened;
    }

    const flags = changes.flags;
    if (!flags || typeof flags !== "object") {
        return undefined;
    }

    const pf2eToolbelt = (flags as Record<string, unknown>)["pf2e-toolbelt"];
    if (!pf2eToolbelt || typeof pf2eToolbelt !== "object") {
        return undefined;
    }

    return (pf2eToolbelt as Record<string, unknown>).targetHelper;
}

function cacheToolbeltTargetHelperData(messageId: string, value: unknown): void {
    if (!value || typeof value !== "object") {
        return;
    }
    toolbeltTargetHelperCache.set(messageId, {
        data: foundry.utils.deepClone(value) as ToolbeltTargetHelperData,
        updatedAt: Date.now(),
    });
}

export function getToolbeltTargetHelperData(message: ChatMessagePF2e): ToolbeltTargetHelperData | null {
    const targetHelper = message.getFlag("pf2e-toolbelt", "targetHelper");
    return targetHelper && typeof targetHelper === "object" ? (targetHelper as ToolbeltTargetHelperData) : null;
}

export function getCachedToolbeltTargetHelperData(messageId: string): ToolbeltTargetHelperData | null {
    return toolbeltTargetHelperCache.get(messageId)?.data ?? null;
}

export function getEffectiveToolbeltTargetHelperData(message: ChatMessagePF2e): ToolbeltTargetHelperData | null {
    const cached = getCachedToolbeltTargetHelperData(message.id);
    const fromFlags = getToolbeltTargetHelperData(message);

    if (!cached && !fromFlags) {
        return null;
    }

    return { ...cached, ...fromFlags };
}

function collectSaveEntries(data: ToolbeltTargetHelperData | null): [string, ToolbeltTargetHelperSaveData][] {
    if (!data?.saveVariants) {
        return [];
    }
    const entries: [string, ToolbeltTargetHelperSaveData][] = [];
    for (const saveVariant of Object.values(data.saveVariants)) {
        if (saveVariant?.saves) {
            entries.push(...Object.entries(saveVariant.saves));
        }
    }
    return entries;
}

export function isToolbeltSaveSuccessOutcome(value: unknown): value is ToolbeltSaveSuccessOutcome {
    return (SAVE_OUTCOMES as readonly unknown[]).includes(value);
}

export function getToolbeltPayloadTargetId(target: { id?: string } | null | undefined): string | null {
    const targetId = target?.id;
    return typeof targetId === "string" && targetId.length > 0 ? targetId : null;
}

function tokenIdFromUuid(uuid: string): string | null {
    const tokenMatch = uuid.match(/Token\.([^.]+)/);
    if (tokenMatch?.[1]) {
        return tokenMatch[1];
    }
    const lastSegment = uuid.split(".").at(-1);
    return lastSegment && lastSegment !== "Token" ? lastSegment : null;
}

export function getToolbeltExpectedTargetIds(data: ToolbeltTargetHelperData | null): Set<string> {
    if (!data?.targets || !Array.isArray(data.targets)) {
        return new Set();
    }

    return new Set(data.targets.map(tokenIdFromUuid).filter((id): id is string => id !== null));
}

export function getToolbeltSavedTargetIds(data: ToolbeltTargetHelperData | null): Set<string> {
    return new Set(collectSaveEntries(data).map(([targetId]) => targetId));
}

export function getToolbeltSaveOutcomes(data: ToolbeltTargetHelperData | null): ToolbeltSaveSuccessOutcome[] {
    return collectSaveEntries(data)
        .map(([, saveData]) => saveData?.success)
        .filter(isToolbeltSaveSuccessOutcome);
}

export function isToolbeltBasicSave(data: ToolbeltTargetHelperData | null): boolean {
    if (!data?.saveVariants) {
        return false;
    }
    return Object.values(data.saveVariants).some((sv) => !!sv && Boolean(sv.basic));
}

export function getOrCreateToolbeltTrackerState(
    messageId: string,
    expectedTargetIds: Set<string>,
): ToolbeltSaveTrackerState {
    const existing = toolbeltSaveTracker.get(messageId);
    if (existing) {
        for (const id of expectedTargetIds) existing.expectedTargetIds.add(id);
        existing.updatedAt = Date.now();
        return existing;
    }

    const state: ToolbeltSaveTrackerState = {
        expectedTargetIds,
        savedTargetIds: new Set(),
        saveOutcomes: new Set(),
        hasBasicSave: false,
        completed: false,
        updatedAt: Date.now(),
    };
    toolbeltSaveTracker.set(messageId, state);
    return state;
}

export function shouldRollToolbeltSaveSpellDamage(state: ToolbeltSaveTrackerState): boolean {
    const hasFailure = state.saveOutcomes.has("criticalFailure") || state.saveOutcomes.has("failure");
    if (hasFailure) {
        return true;
    }
    return state.hasBasicSave && state.saveOutcomes.has("success");
}

export function isExperimentalToolbeltSaveIntegrationEnabled(): boolean {
    return Boolean(game.settings.get(MODULENAME, "experimentalToolbeltSaveIntegration"));
}

export function shouldWaitForToolbeltTargetHelper(
    message: ChatMessagePF2e,
    rollForNonAttackSaveSpell: boolean,
    options: AutoRollDamageOptions,
): boolean {
    if (options.ignoreToolbeltTargetHelperWait) {
        return false;
    }

    return (
        isExperimentalToolbeltSaveIntegrationEnabled() &&
        rollForNonAttackSaveSpell &&
        getEffectiveToolbeltTargetHelperData(message)?.type === "spell"
    );
}

export async function handlePf2eToolbeltRollSave(payload: ToolbeltRollSaveHookPayload): Promise<void> {
    if (!isExperimentalToolbeltSaveIntegrationEnabled()) {
        return;
    }

    const hookMessage = payload.message;
    const message = (game.messages.get(hookMessage.id) as ChatMessagePF2e | undefined) ?? hookMessage;
    const toolbeltData = getEffectiveToolbeltTargetHelperData(message);

    if (toolbeltData?.type !== "spell") {
        return;
    }

    const expectedTargetIds = getToolbeltExpectedTargetIds(toolbeltData);
    if (expectedTargetIds.size === 0) {
        return;
    }

    const state = getOrCreateToolbeltTrackerState(message.id, expectedTargetIds);

    if (state.completed) {
        return;
    }

    state.hasBasicSave ||= isToolbeltBasicSave(toolbeltData);
    for (const savedTargetId of getToolbeltSavedTargetIds(toolbeltData)) {
        state.savedTargetIds.add(savedTargetId);
    }
    for (const outcome of getToolbeltSaveOutcomes(toolbeltData)) {
        state.saveOutcomes.add(outcome);
    }
    const payloadTargetId = getToolbeltPayloadTargetId(payload.target);
    if (payloadTargetId) {
        state.savedTargetIds.add(payloadTargetId);
    }
    const payloadSuccessOutcome = isToolbeltSaveSuccessOutcome(payload.data?.success) ? payload.data?.success : null;
    if (payloadSuccessOutcome) {
        state.saveOutcomes.add(payloadSuccessOutcome);
    }
    state.updatedAt = Date.now();

    const toolbeltFlags = message.flags?.["pf2e-toolbelt"];
    const toolbeltFlagsCleared =
        !!toolbeltFlags && typeof toolbeltFlags === "object" && Object.keys(toolbeltFlags).length === 0;
    if (toolbeltFlagsCleared) {
        return;
    }

    const allSaved =
        state.expectedTargetIds.size > 0 && [...state.expectedTargetIds].every((id) => state.savedTargetIds.has(id));
    if (!allSaved) {
        return;
    }

    state.completed = true;

    if (shouldRollToolbeltSaveSpellDamage(state)) {
        // Wait a bit for toolbelt to do it's stuff
        await new Promise((resolve) => setTimeout(resolve, 100));
        await autoRollDamage(message, {
            ignoreToolbeltTargetHelperWait: true,
            forceSaveSpellRoll: true,
            forcedDegreeOfSuccess: "failure",
        });
    }
}

export const SAVE_OUTCOMES = ["criticalFailure", "failure", "success", "criticalSuccess"] as const;
export type ToolbeltSaveSuccessOutcome = (typeof SAVE_OUTCOMES)[number];

export type ToolbeltTargetHelperSaveData = {
    success?: ToolbeltSaveSuccessOutcome;
    [key: string]: unknown;
};

export type ToolbeltTargetHelperSaveVariant = {
    basic?: boolean;
    saves?: Record<string, ToolbeltTargetHelperSaveData>;
    [key: string]: unknown;
};

export type ToolbeltTargetHelperData = {
    type?: string;
    targets?: string[];
    saveVariants?: Record<string, ToolbeltTargetHelperSaveVariant>;
};

export type ToolbeltSaveTrackerState = {
    expectedTargetIds: Set<string>;
    savedTargetIds: Set<string>;
    saveOutcomes: Set<ToolbeltSaveSuccessOutcome>;
    hasBasicSave: boolean;
    completed: boolean;
    updatedAt: number;
};

export type ToolbeltRollSaveHookPayload = {
    message: ChatMessagePF2e;
    target?: { id?: string } | null;
    data?: { success?: unknown } & Record<string, unknown>;
};

export type AutoRollDamageOptions = {
    ignoreToolbeltTargetHelperWait?: boolean;
    forceSaveSpellRoll?: boolean;
    forcedDegreeOfSuccess?: string;
};
