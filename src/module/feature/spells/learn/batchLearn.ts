import type { ActorPF2e, SpellcastingEntryPF2e, SpellPF2e } from "foundry-pf2e";
import type {
    BatchLearnResult,
    BatchLearnSpellEntry,
    BatchLearnSpellResult,
    LearnOutcome,
    LearnSpellTarget,
    ResolvedSpellTraits,
} from "../types.ts";
import { isSuccessOutcome } from "../types.ts";
import { formatLearningTime, getActorLevel, I18N_LEARN, I18N_SHARED, OUTCOME_I18N_KEYS } from "../helpers.ts";
import { clearLearnFailure, setLearnFailure } from "../flags.ts";
import { computeLearnParams, getSpellTraitsAndRank, resolveSpellFromUuid, spellIdentifier } from "../spellData.ts";
import { performSpellRoll } from "../spellRoll.ts";
import { guardAlreadyKnown, isSpellAlreadyKnownSync, pickSpellcastingEntryForActor } from "../spellActorQueries.ts";
import { expandForCrossTradition, expandForForcedTradition } from "../traditions.ts";
import { executeCostDeduction, formatCostForDisplay } from "../economyHandler.ts";
import { postLearnChatMessage } from "../spellChatUtils.ts";
import { logError } from "../../../utils/logging.ts";

export interface ValidatedLearnInput {
    ident: string | null;
    resolved: ResolvedSpellTraits;
    entry: SpellcastingEntryPF2e;
    finalDc: number;
    costCopper: number;
    hours: number;
}

export function computeEffectiveCost(costCopper: number, outcome: LearnOutcome | null | undefined): number {
    if (outcome === "skipped") return 0;
    if (outcome === "criticalSuccess" || outcome === "criticalFailure") return Math.floor(costCopper / 2);
    if (outcome === "failure") return 0;
    return costCopper;
}

function makeBatchResult(
    spell: BatchLearnSpellEntry,
    outcome: LearnOutcome | null | undefined,
    costCopper: number,
    hours: number,
    wasAlreadyKnown: boolean,
): BatchLearnSpellResult {
    return {
        uuid: spell.uuid,
        name: spell.name,
        rankKey: spell.rankKey,
        outcome: outcome ?? null,
        costCopper,
        hours,
        wasAlreadyKnown,
    };
}

interface BatchLearnContext {
    actor: ActorPF2e;
    entryId?: string;
    suppressMessages?: boolean;
    target: LearnSpellTarget;
}

export async function executeBatchLearn(
    spells: BatchLearnSpellEntry[],
    ctx: BatchLearnContext,
): Promise<BatchLearnResult> {
    const results: BatchLearnSpellResult[] = [];
    let totalCostCopper = 0;
    let totalHours = 0;
    let successCount = 0;
    let failureCount = 0;
    let skippedCount = 0;
    let alreadyKnownCount = 0;

    for (const spell of spells) {
        try {
            const { result, stopBatch } = await processSingleBatchSpell(spell, ctx);
            results.push(result);
            if (!stopBatch) {
                totalCostCopper += result.costCopper;
                totalHours += result.hours;
            }
            switch (result.outcome) {
                case "alreadyKnown":
                    alreadyKnownCount++;
                    break;
                case "skipped":
                    skippedCount++;
                    break;
                case "criticalSuccess":
                case "success":
                    successCount++;
                    break;
                case "failure":
                case "criticalFailure":
                    failureCount++;
                    break;
            }
            if (stopBatch) break;
        } catch (err) {
            logError(`batchLearnSpells: unhandled error processing spell ${spell.name} (${spell.uuid})`, err);
            ui.notifications.warn(
                game.i18n.format(`${I18N_LEARN}.batchLearnSingleError`, {
                    spellName: spell.name,
                }),
            );
            results.push(makeBatchResult(spell, null, 0, 0, false));
        }
    }

    return {
        spells: results,
        totalCostCopper,
        totalHours,
        successCount,
        failureCount,
        skippedCount,
        alreadyKnownCount,
    };
}

async function processSingleBatchSpell(
    spell: BatchLearnSpellEntry,
    ctx: BatchLearnContext,
): Promise<{ result: BatchLearnSpellResult; stopBatch?: boolean }> {
    const spellDoc = await resolveSpellFromUuid(spell.uuid);
    if (!spellDoc) {
        return { result: makeBatchResult(spell, null, 0, 0, false) };
    }

    const ident = spellIdentifier(spellDoc);
    if (ident && isSpellAlreadyKnownSync(ctx.actor, ident)) {
        return { result: makeBatchResult(spell, "alreadyKnown", 0, 0, true) };
    }

    const validated = await resolveAndValidate(spellDoc, ctx.actor, ctx.entryId);
    if (!validated) {
        return { result: makeBatchResult(spell, null, 0, 0, false) };
    }

    const outcome = await performSpellRoll(ctx.actor, validated.entry, validated.finalDc, undefined, {
        skipDialog: true,
    });

    return processBatchOutcome(spell, ctx, validated, spellDoc, outcome);
}

async function processBatchOutcome(
    spell: BatchLearnSpellEntry,
    ctx: BatchLearnContext,
    validated: ValidatedLearnInput,
    spellDoc: SpellPF2e,
    outcome: LearnOutcome | null | undefined,
): Promise<{ result: BatchLearnSpellResult; stopBatch?: boolean }> {
    const onSuccess = async () => {
        await ctx.target.addSpell(spellDoc, ctx.actor, validated.entry.id);
    };

    const effectiveCost = await processLearnOutcome(
        {
            actor: ctx.actor,
            ident: validated.ident,
            costCopper: validated.costCopper,
            hours: validated.hours,
            spellName: validated.resolved.spellName,
            entryId: validated.entry.id,
        },
        outcome,
        ctx.suppressMessages ?? false,
        onSuccess,
    );

    if (effectiveCost === null) {
        return { result: makeBatchResult(spell, outcome, 0, validated.hours, false), stopBatch: true };
    }
    return { result: makeBatchResult(spell, outcome, effectiveCost, validated.hours, false) };
}

export async function resolveAndValidate(
    spellDoc: SpellPF2e,
    actor: ActorPF2e,
    entryId?: string,
): Promise<ValidatedLearnInput | null> {
    const resolved = getSpellTraitsAndRank(spellDoc);
    if (!resolved) {
        ui.notifications.warn(game.i18n.localize(`${I18N_SHARED}.learnSpellInvalidRank`));
        return null;
    }

    if (guardAlreadyKnown(actor, spellDoc, resolved.spellName)) return null;

    const ident = spellIdentifier(spellDoc);

    return buildValidatedInput(actor, spellDoc, resolved, ident, entryId);
}

async function buildValidatedInput(
    actor: ActorPF2e,
    spellDoc: SpellPF2e,
    resolved: ResolvedSpellTraits,
    ident: string | null,
    entryId?: string,
): Promise<ValidatedLearnInput | null> {
    const expandedTraditions = await expandForForcedTradition(
        actor,
        spellDoc,
        expandForCrossTradition(actor, resolved.traditions),
    );
    const entry = pickSpellcastingEntryForActor(actor, expandedTraditions, entryId);

    if (!entry) {
        ui.notifications.warn(game.i18n.localize(`${I18N_SHARED}.learnNoCompatibleEntry`));
        return null;
    }

    const { finalDc, costCopper, hours } = computeLearnParams(resolved.rankKey, resolved.rarity, actor);

    return { ident, resolved, entry, finalDc, costCopper, hours };
}

export function learnAttemptGuards(spell: SpellPF2e, actor: ActorPF2e, spellName: string): ResolvedSpellTraits | null {
    const resolved = getSpellTraitsAndRank(spell);
    if (!resolved) {
        ui.notifications.warn(game.i18n.localize(`${I18N_SHARED}.learnSpellInvalidRank`));
        return null;
    }
    if (guardAlreadyKnown(actor, spell, spellName)) return null;
    return resolved;
}

interface LearnOutcomeContext {
    actor: ActorPF2e;
    ident: string | null;
    costCopper: number;
    hours: number;
    spellName: string;
    entryId: string;
}

export async function processLearnOutcome(
    ctx: LearnOutcomeContext,
    outcome: LearnOutcome | null | undefined,
    suppressMessages: boolean,
    onSuccess: () => Promise<void>,
): Promise<number | null> {
    const effectiveCost = computeEffectiveCost(ctx.costCopper, outcome);

    const deducted = await executeCostDeduction({
        actor: ctx.actor,
        costCopper: effectiveCost,
        spellName: ctx.spellName,
    });
    if (!deducted && effectiveCost > 0) return null;

    if (isSuccessOutcome(outcome)) {
        if (ctx.ident) await clearLearnFailure(ctx.actor, ctx.ident);
        await onSuccess();
    } else {
        if (ctx.ident) await setLearnFailure(ctx.actor, ctx.ident, getActorLevel(ctx.actor));
    }

    if (!suppressMessages && outcome) {
        postLearnChatMessage(ctx.actor, `${I18N_SHARED}.${OUTCOME_I18N_KEYS[outcome] ?? ""}`, {
            actor: ctx.actor.name,
            spellName: ctx.spellName,
            cost: formatCostForDisplay(effectiveCost),
            hours: formatLearningTime(ctx.hours),
        });
    }

    return effectiveCost;
}
