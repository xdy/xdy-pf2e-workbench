import type { ActorPF2e } from "foundry-pf2e";

export interface SpellSourceIdAccess {
    sourceId?: string;
    _stats?: { compendiumSource?: string };
}

export interface ResolvedSpellTraits {
    traits: string[];
    traditions: string[];
    rankKey: string;
    spellName: string;
}

export type DeductionResult = { ok: true; debt: 0 } | { ok: false; debt: number };

export interface LearnFailureEntry {
    level: number;
    timestamp: number;
}

export interface LearnFailures {
    [identifier: string]: LearnFailureEntry;
}

export type LearnOutcome = "criticalSuccess" | "success" | "failure" | "criticalFailure" | "skipped" | "alreadyKnown";

export interface BatchLearnSpellEntry {
    uuid: string;
    name: string;
    rankKey: string;
}

export interface BatchLearnSpellResult {
    uuid: string;
    name: string;
    rankKey: string;
    outcome: LearnOutcome | null;
    costCopper: number;
    hours: number;
    wasAlreadyKnown: boolean;
}

export interface BatchLearnResult {
    spells: BatchLearnSpellResult[];
    totalCostCopper: number;
    totalHours: number;
    successCount: number;
    failureCount: number;
    skippedCount: number;
    alreadyKnownCount: number;
}

export interface LearnSpellTarget {
    addSpell(
        spellData: Record<string, unknown>,
        actor: ActorPF2e,
        entryId: string,
        rankKey: string,
        spellName: string,
    ): Promise<string | null>;
    afterLearn?(actor: ActorPF2e): Promise<void>;
}
