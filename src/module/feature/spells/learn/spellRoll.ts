import type { ActorPF2e, SpellcastingEntryPF2e } from "foundry-pf2e";
import { I18N } from "../helpers.ts";
import { getSkillCheckForEntry } from "../spellActorQueries.ts";
import { logError } from "../../../utils/logging.ts";
import type { LearnOutcome } from "../types.ts";

export interface SpellRollSkill {
    roll(args: {
        dc: { value: number };
        skipDialog?: boolean;
        extraRollOptions?: string[];
        createMessage?: boolean;
        callback?: (roll: unknown, outcome: LearnOutcome | null) => Promise<void>;
    }): Promise<unknown>;
}

type SpellRollCallback = (outcome: LearnOutcome | null) => Promise<void>;

interface SpellRollOptions {
    skipDialog?: boolean;
}

export function performSpellRoll(
    actor: ActorPF2e,
    entry: SpellcastingEntryPF2e,
    finalDc: number,
    callback?: SpellRollCallback,
    options?: SpellRollOptions,
): Promise<LearnOutcome | null> {
    const skill = getSkillCheckForEntry(actor, entry) as SpellRollSkill | null;
    if (!skill?.roll) {
        ui.notifications.warn(game.i18n.localize(`${I18N}.learnNoSkill`));
        return Promise.resolve(null);
    }

    const skipDialog = options?.skipDialog ?? false;

    return new Promise<LearnOutcome | null>((resolve) => {
        void skill.roll({
            dc: { value: finalDc },
            skipDialog,
            extraRollOptions: ["concentrate", "exploration"],
            createMessage: true,
            callback: async (_roll: unknown, outcome: LearnOutcome | null) => {
                try {
                    await callback?.(outcome);
                } catch (err) {
                    logError("performSpellRoll: outcome callback threw", err);
                    ui.notifications.error(game.i18n.localize(`${I18N}.learnSpellFailed`));
                }
                resolve(outcome ?? null);
            },
        });
    });
}
