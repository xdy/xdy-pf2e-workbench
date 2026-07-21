import type { ActorPF2e, SpellPF2e } from "foundry-pf2e";
import type { BatchLearnResult, BatchLearnSpellEntry, LearnOutcome, LearnSpellTarget } from "../types.ts";
import { clearLearnFailure, sanitizeFlagKey } from "../flags.ts";
import { getSpellDocData, getSpellTraitsAndRank, spellIdentifier } from "../spellData.ts";
import { postLearnChatMessage } from "../spellChatUtils.ts";
import { promptOverrideLearnFailure } from "../dialogHelper.ts";
import { performSpellRoll } from "./spellRoll.ts";
import { executeBatchLearn, processLearnOutcome, resolveAndValidate, type ValidatedLearnInput } from "./batchLearn.ts";

export class LearnSpellHandler {
    #target: LearnSpellTarget;

    constructor(target: LearnSpellTarget) {
        this.#target = target;
    }

    async initiateFromSpellData(spellData: Record<string, unknown>, actor: ActorPF2e, entryId: string): Promise<void> {
        const resolved = getSpellTraitsAndRank(spellData);
        if (!resolved) return;

        await this.#initiateCore(spellData, actor, entryId, false, async () => {
            const ident = spellIdentifier(spellData);
            if (ident) {
                const { allowed } = await promptOverrideLearnFailure(actor, ident, resolved.spellName);
                return allowed;
            }
            return true;
        });
    }

    async addSpellDirectly(
        spellData: Record<string, unknown>,
        actor: ActorPF2e,
        entryId: string,
        spellName: string,
    ): Promise<void> {
        const ident = spellIdentifier(spellData);
        const { allowed, didOverride } = ident
            ? await promptOverrideLearnFailure(actor, ident, spellName)
            : { allowed: true, didOverride: false };
        if (!allowed) return;

        await this.#target.addSpell(spellData, actor, entryId, "", spellName);
        postLearnChatMessage(actor, "learnSpellSkipped", { actor: actor.name, spellName });
        if (didOverride && ident) {
            await clearLearnFailure(actor, sanitizeFlagKey(ident));
            postLearnChatMessage(actor, "learnFailureOverridden", { actor: actor.name, spellName });
        }
    }

    async batchLearnSpells(
        spells: BatchLearnSpellEntry[],
        actor: ActorPF2e,
        entryId?: string,
        suppressIndividualMessages?: boolean,
    ): Promise<BatchLearnResult> {
        return executeBatchLearn(spells, {
            actor,
            entryId,
            suppressIndividualMessages,
        });
    }

    async #initiateCore(
        spell: SpellPF2e | Record<string, unknown>,
        actor: ActorPF2e,
        entryId: string,
        checkCanAttempt: boolean,
        preRollFn?: (validated: ValidatedLearnInput) => Promise<boolean>,
    ): Promise<void> {
        const validated = await resolveAndValidate(spell as SpellPF2e, actor, entryId, checkCanAttempt);
        if (!validated) return;

        if (preRollFn) {
            const shouldContinue = await preRollFn(validated);
            if (!shouldContinue) return;
        }

        const target = this.#target;
        await performSpellRoll(
            actor,
            validated.entry,
            validated.finalDc,
            async (outcome: LearnOutcome | null | undefined) => {
                await processLearnOutcome(
                    {
                        actor,
                        ident: validated.ident,
                        costCopper: validated.costCopper,
                        hours: validated.hours,
                        spellName: validated.resolved.spellName,
                        entryId: validated.entry.id,
                    },
                    outcome,
                    false,
                    async () => {
                        const clone = getSpellDocData(spell);
                        await target.addSpell(
                            clone,
                            actor,
                            validated.entry.id,
                            validated.resolved.rankKey,
                            validated.resolved.spellName,
                        );
                    },
                );
            },
        );
    }
}
