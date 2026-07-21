import type { ActorPF2e, SpellcastingEntryPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../constants.ts";
import { getLearnFailureEntry } from "./flags.ts";
import { actorHasItemBySlug } from "../../utils.ts";

export const I18N = `${MODULENAME}.spellLearn` as const;

export const RANK_CANTRIP = "cantrip";

export const OUTCOME_I18N_KEYS: Record<string, string> = {
    criticalSuccess: "learnResultCriticalSuccess",
    success: "learnResultSuccess",
    failure: "learnResultFailure",
    criticalFailure: "learnResultCriticalFailure",
    skipped: "learnSpellSkipped",
    alreadyKnown: "learnSpellBatchLearnAlreadyKnown",
};

export function getSpellcastingEntries(actor: ActorPF2e): SpellcastingEntryPF2e[] {
    const sc = actor.spellcasting;
    return sc ? ([...sc] as unknown as SpellcastingEntryPF2e[]) : [];
}

export function getActorLevel(actor: ActorPF2e): number {
    return actor.system.details.level.value;
}

export function hasLearnFailureAtCurrentLevel(actor: ActorPF2e, key: string): boolean {
    const entry = getLearnFailureEntry(actor, key);
    if (!entry) return false;
    if (getActorLevel(actor) > entry.level) return false;
    if (actorHasItemBySlug(actor, "magical-shorthand")) {
        const ONE_WEEK_SECONDS = 604800;
        if (game.time.worldTime - entry.timestamp >= ONE_WEEK_SECONDS) return false;
    }
    return true;
}
