import type { LearnFailureEntry, LearnFailures } from "./types.ts";
import { MODULENAME } from "../../constants.ts";
import { logError } from "../../utils/logging.ts";

const FLAG_LEARN_FAILURES = "learnSpellFailures";

export function sanitizeFlagKey(identifier: string): string {
    return identifier.replace(/\./g, "!");
}

async function getLearnFailures(actor: foundry.abstract.Document): Promise<LearnFailures> {
    return (actor.getFlag(MODULENAME, FLAG_LEARN_FAILURES) as LearnFailures) ?? {};
}

export async function setLearnFailure(
    actor: foundry.abstract.Document,
    identifier: string,
    level: number,
): Promise<void> {
    const failures = await getLearnFailures(actor);
    failures[sanitizeFlagKey(identifier)] = { level, timestamp: game.time.worldTime };
    try {
        await actor.setFlag(MODULENAME, FLAG_LEARN_FAILURES, failures);
    } catch (err) {
        logError("setLearnFailure: setFlag failed", err);
    }
}

export async function clearLearnFailure(actor: foundry.abstract.Document, identifier: string): Promise<void> {
    const failures = await getLearnFailures(actor);
    delete failures[sanitizeFlagKey(identifier)];
    try {
        if (Object.keys(failures).length === 0) {
            await actor.unsetFlag(MODULENAME, FLAG_LEARN_FAILURES);
        } else {
            await actor.setFlag(MODULENAME, FLAG_LEARN_FAILURES, failures);
        }
    } catch (err) {
        logError("clearLearnFailure: flag write failed", err);
    }
}

export function getLearnFailureEntry(
    actor: foundry.abstract.Document,
    identifier: string,
): LearnFailureEntry | undefined {
    const failures = (actor.getFlag(MODULENAME, FLAG_LEARN_FAILURES) as LearnFailures) ?? {};
    return failures[sanitizeFlagKey(identifier)];
}

export function getLearnFailureLevel(actor: foundry.abstract.Document, identifier: string): number | undefined {
    return getLearnFailureEntry(actor, identifier)?.level;
}
