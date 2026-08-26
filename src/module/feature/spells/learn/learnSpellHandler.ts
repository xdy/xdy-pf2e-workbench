import type { ActorPF2e, SpellcastingEntryPF2e, SpellPF2e } from "foundry-pf2e";
import type {
    BatchLearnResult,
    BatchLearnSpellEntry,
    LearnOutcome,
    LearnSpellService,
    LearnSpellTarget,
} from "../types.ts";
import { clearLearnFailure } from "../flags.ts";
import { computeLearnParams, getSpellDocData, getSpellTraitsAndRank, spellIdentifier } from "../spellData.ts";
import { hasLearnFailureAtCurrentLevel, I18N_SHARED } from "../helpers.ts";
import { postLearnChatMessage } from "../spellChatUtils.ts";
import { promptOverrideLearnFailure } from "./learnDialogs.ts";
import { performSpellRoll } from "../spellRoll.ts";
import { executeBatchLearn, learnAttemptGuards, processLearnOutcome, resolveAndValidate } from "./batchLearn.ts";

export class LearnSpellHandler implements LearnSpellService {
    readonly #target: LearnSpellTarget;

    constructor(target: LearnSpellTarget) {
        this.#target = target;
    }

    async initiateFromSpellData(
        spell: SpellPF2e,
        actor: ActorPF2e,
        entryId: string,
        entry?: SpellcastingEntryPF2e,
    ): Promise<LearnOutcome | null> {
        const resolved = learnAttemptGuards(spell, actor, spell.name);
        if (!resolved) return null;

        const ident = spellIdentifier(spell);
        if (ident && !(await promptOverrideLearnFailure(actor, ident, spell.name))) return null;

        return entry
            ? this.#initiateWithEntry(spell, actor, resolved, entry)
            : this.#initiateCore(spell, actor, entryId);
    }

    async addSpellDirectly(spell: SpellPF2e, actor: ActorPF2e, entryId: string, spellName: string): Promise<void> {
        const resolved = learnAttemptGuards(spell, actor, spellName);
        if (!resolved) return;

        const ident = spellIdentifier(spell);
        const hadFailure = ident ? hasLearnFailureAtCurrentLevel(actor, ident) : false;
        const allowed = ident ? await promptOverrideLearnFailure(actor, ident, spellName) : true;
        if (!allowed) return;

        await this.#target.addSpell(spell, actor, entryId);
        postLearnChatMessage(actor, `${I18N_SHARED}.learnSpellSkipped`, { actor: actor.name, spellName });
        if (hadFailure) {
            await clearLearnFailure(actor, ident!);
            postLearnChatMessage(actor, `${I18N_SHARED}.learnFailureOverridden`, { actor: actor.name, spellName });
        }
    }

    async batchLearnSpells(
        spells: BatchLearnSpellEntry[],
        actor: ActorPF2e,
        entryId?: string,
        suppressMessages?: boolean,
    ): Promise<BatchLearnResult> {
        return executeBatchLearn(spells, {
            actor,
            entryId,
            suppressMessages,
            target: this.#target,
        });
    }

    async #initiateWithEntry(
        spell: SpellPF2e,
        actor: ActorPF2e,
        resolved: ReturnType<typeof getSpellTraitsAndRank>,
        entry: SpellcastingEntryPF2e,
    ): Promise<LearnOutcome | null> {
        if (!resolved) return null;
        const ident = spellIdentifier(spell);
        const { finalDc, costCopper, hours } = computeLearnParams(resolved.rankKey, resolved.rarity, actor);

        return performSpellRoll(actor, entry, finalDc, async (outcome: LearnOutcome | null | undefined) => {
            await processLearnOutcome(
                {
                    actor,
                    ident,
                    costCopper,
                    hours,
                    spellName: resolved.spellName,
                    entryId: entry.id,
                },
                outcome,
                false,
                async () => {
                    const clone = getSpellDocData(spell);
                    await this.#target.addSpell(clone, actor, entry.id);
                },
            );
        });
    }

    async #initiateCore(spell: SpellPF2e, actor: ActorPF2e, entryId: string): Promise<LearnOutcome | null> {
        const validated = await resolveAndValidate(spell, actor, entryId);
        if (!validated) return null;

        return performSpellRoll(
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
                        await this.#target.addSpell(clone, actor, validated.entry.id);
                    },
                );
            },
        );
    }
}
