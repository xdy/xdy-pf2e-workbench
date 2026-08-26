import type { LearnFailureEntry, LearnFailures } from "./types.ts";
import type { ActorPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../constants.ts";
import { getModuleFlag } from "../../utils.ts";
import { logError } from "../../utils/logging.ts";

const FLAG_LEARN_FAILURES = "learnSpellFailures";

function sanitizeFlagKey(identifier: string): string {
    return identifier.replace(/\./g, "!");
}

function getLearnFailures(actor: ActorPF2e): LearnFailures {
    return getModuleFlag<LearnFailures>(actor, FLAG_LEARN_FAILURES, {} as LearnFailures);
}

export async function setLearnFailure(actor: ActorPF2e, identifier: string, level: number): Promise<void> {
    const failures = getLearnFailures(actor);
    failures[sanitizeFlagKey(identifier)] = { level, timestamp: game.time.worldTime };
    try {
        await actor.setFlag(MODULENAME, FLAG_LEARN_FAILURES, failures);
    } catch (err) {
        logError("setLearnFailure: persist failed", err);
    }
}

export async function clearLearnFailure(actor: ActorPF2e, identifier: string): Promise<void> {
    const failures = getLearnFailures(actor);
    delete failures[sanitizeFlagKey(identifier)];
    try {
        if (Object.keys(failures).length === 0) {
            await actor.unsetFlag(MODULENAME, FLAG_LEARN_FAILURES);
        } else {
            await actor.setFlag(MODULENAME, FLAG_LEARN_FAILURES, failures);
        }
    } catch (err) {
        logError("clearLearnFailure: persist failed", err);
    }
}

export function getLearnFailureEntry(actor: ActorPF2e, identifier: string): LearnFailureEntry | undefined {
    return getLearnFailures(actor)[sanitizeFlagKey(identifier)];
}
