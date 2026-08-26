import { ChatMessagePF2e } from "foundry-pf2e";
import {
    SAVE_OUTCOMES,
    ToolbeltSaveSuccessOutcome,
    ToolbeltSaveTrackerState,
    ToolbeltTargetHelperData,
    ToolbeltTargetHelperSaveData,
} from "./toolbeltTypes.ts";

const pendingToolbeltDamageInjections = new Map<
    string,
    { targetHelperData: ToolbeltTargetHelperData; createdAt: number }
>();

const toolbeltTargetHelperCache = new Map<string, { data: ToolbeltTargetHelperData; updatedAt: number }>();
const toolbeltSaveTracker = new Map<string, ToolbeltSaveTrackerState>();

export function clearToolbeltCaches(): void {
    toolbeltSaveTracker.clear();
    toolbeltTargetHelperCache.clear();
    pendingToolbeltDamageInjections.clear();
}

export function registerPendingInjection(
    originUuid: string,
    data: { targetHelperData: ToolbeltTargetHelperData; createdAt: number },
): void {
    pendingToolbeltDamageInjections.set(originUuid, data);
}

export function consumePendingInjection(
    originUuid: string,
): { targetHelperData: ToolbeltTargetHelperData; createdAt: number } | undefined {
    const pending = pendingToolbeltDamageInjections.get(originUuid);
    if (pending) {
        pendingToolbeltDamageInjections.delete(originUuid);
    }
    return pending;
}

export function schedulePendingInjectionCleanup(originUuid: string, delayMs: number): void {
    setTimeout(() => {
        pendingToolbeltDamageInjections.delete(originUuid);
    }, delayMs);
}

export function cacheToolbeltTargetHelperData(messageId: string, value: unknown): void {
    if (!value || typeof value !== "object") {
        return;
    }
    toolbeltTargetHelperCache.set(messageId, {
        data: foundry.utils.deepClone(value) as ToolbeltTargetHelperData,
        updatedAt: Date.now(),
    });
}

export function deleteCachedToolbeltTargetHelperData(messageId: string): void {
    toolbeltTargetHelperCache.delete(messageId);
}

export function getToolbeltTargetHelperData(message: ChatMessagePF2e): ToolbeltTargetHelperData | null {
    if (!game.modules.get("pf2e-toolbelt")?.active) {
        return null;
    }
    const targetHelper = message.getFlag("pf2e-toolbelt", "targetHelper");
    return targetHelper && typeof targetHelper === "object" ? (targetHelper as ToolbeltTargetHelperData) : null;
}

export function getCachedToolbeltTargetHelperData(messageId: string): ToolbeltTargetHelperData | null {
    return toolbeltTargetHelperCache.get(messageId)?.data ?? null;
}

export function getEffectiveToolbeltTargetHelperData(message: ChatMessagePF2e): ToolbeltTargetHelperData | null {
    return getCachedToolbeltTargetHelperData(message.id) ?? getToolbeltTargetHelperData(message);
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
