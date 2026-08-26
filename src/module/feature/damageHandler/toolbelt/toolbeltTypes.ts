import type { ChatMessagePF2e } from "foundry-pf2e";

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
