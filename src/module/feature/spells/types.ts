import type { ActorPF2e, SpellcastingEntryPF2e, SpellPF2e } from "foundry-pf2e";

export interface SpellSourceId {
    sourceId?: string;
    _stats?: { compendiumSource?: string };
}

export interface ResolvedSpellTraits {
    traits: string[];
    traditions: string[];
    rarity: string;
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

export function isSuccessOutcome(outcome: LearnOutcome | null | undefined): outcome is "criticalSuccess" | "success" {
    return outcome === "criticalSuccess" || outcome === "success";
}

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
    addSpell(spellData: SpellPF2e | Record<string, unknown>, actor: ActorPF2e, entryId: string): Promise<string | null>;
    afterLearn?(actor: ActorPF2e): Promise<void>;
}

export interface LearnSpellService {
    initiateFromSpellData(
        spell: SpellPF2e,
        actor: ActorPF2e,
        entryId: string,
        entry?: SpellcastingEntryPF2e,
    ): Promise<LearnOutcome | null>;
    addSpellDirectly(spell: SpellPF2e, actor: ActorPF2e, entryId: string, spellName: string): Promise<void>;
    batchLearnSpells(
        spells: BatchLearnSpellEntry[],
        actor: ActorPF2e,
        entryId?: string,
        suppressMessages?: boolean,
    ): Promise<BatchLearnResult>;
}

export interface SpellRollSkill {
    roll(args: {
        dc: { value: number };
        skipDialog?: boolean;
        extraRollOptions?: string[];
        createMessage?: boolean;
        callback?: (roll: unknown, outcome: LearnOutcome | null) => Promise<void>;
    }): Promise<unknown>;
}
