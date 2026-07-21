import type { ActorPF2e, SpellcastingEntryPF2e, SpellPF2e } from "foundry-pf2e";
import type {
    BatchLearnResult,
    BatchLearnSpellEntry,
    BatchLearnSpellResult,
    LearnOutcome,
    ResolvedSpellTraits,
} from "../types.ts";
import { getActorLevel, hasLearnFailureAtCurrentLevel, I18N, OUTCOME_I18N_KEYS } from "../helpers.ts";
import { clearLearnFailure, sanitizeFlagKey, setLearnFailure } from "../flags.ts";
import {
    calculateLearnDc,
    getLearnSpellCostCopper,
    getLearnSpellDcAdjustment,
    getLearnSpellHours,
    getSpellDocData,
    getSpellTraitsAndRank,
    spellIdentifier,
} from "../spellData.ts";
import { performSpellRoll } from "./spellRoll.ts";
import { findKnownSpell, pickSpellcastingEntryForActor } from "../spellActorQueries.ts";
import { createSpellWithLock, postLearnChatMessage } from "../spellChatUtils.ts";
import { executeCostDeduction, formatCostForDisplay } from "../economyHandler.ts";
import { logError } from "../../../utils/logging.ts";

export interface ValidatedLearnInput {
    ident: string | null;
    resolved: ResolvedSpellTraits;
    entry: SpellcastingEntryPF2e;
    finalDc: number;
    costCopper: number;
    hours: number;
}

export function isSuccessOutcome(outcome: LearnOutcome | null | undefined): outcome is "criticalSuccess" | "success" {
    return outcome === "criticalSuccess" || outcome === "success";
}

export function isFailureOutcome(outcome: LearnOutcome | null | undefined): outcome is "failure" | "criticalFailure" {
    return outcome === "failure" || outcome === "criticalFailure";
}

function isAlreadyKnownOutcome(outcome: LearnOutcome | null | undefined): outcome is "alreadyKnown" {
    return outcome === "alreadyKnown";
}

function isSkippedOutcome(outcome: LearnOutcome | null | undefined): outcome is "skipped" {
    return outcome === "skipped";
}

export function computeEffectiveCost(costCopper: number, outcome: LearnOutcome | null | undefined): number {
    if (outcome === "skipped") return 0;
    if (outcome === "criticalSuccess" || outcome === "criticalFailure") return Math.floor(costCopper / 2);
    if (outcome === "failure") return 0;
    return costCopper;
}

function makeBatchResult(
    spell: BatchLearnSpellEntry,
    outcome: LearnOutcome | null,
    costCopper: number,
    hours: number,
    wasAlreadyKnown: boolean,
): BatchLearnSpellResult {
    return {
        uuid: spell.uuid,
        name: spell.name,
        rankKey: spell.rankKey,
        outcome,
        costCopper,
        hours,
        wasAlreadyKnown,
    };
}

interface BatchLearnContext {
    actor: ActorPF2e;
    entryId?: string;
    suppressIndividualMessages?: boolean;
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
            if (isAlreadyKnownOutcome(result.outcome)) alreadyKnownCount++;
            else if (isSkippedOutcome(result.outcome)) skippedCount++;
            else if (isSuccessOutcome(result.outcome)) successCount++;
            else if (isFailureOutcome(result.outcome)) failureCount++;
            if (stopBatch) break;
        } catch (err) {
            logError(`batchLearnSpells: unhandled error processing spell ${spell.name} (${spell.uuid})`, err);
            ui.notifications.warn(
                game.i18n.format(`${I18N}.batchLearnSingleError`, {
                    spellName: spell.name,
                }) || `Failed to process ${spell.name}`,
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
    const spellDoc = (await fromUuid(spell.uuid)) as SpellPF2e | null;
    if (!spellDoc) {
        return { result: makeBatchResult(spell, null, 0, 0, false) };
    }

    const ident = spellIdentifier(spellDoc);
    if (ident && findKnownSpell(ctx.actor, ident) !== null) {
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

export async function resolveAndValidate(
    spellDoc: SpellPF2e,
    actor: ActorPF2e,
    entryId?: string,
    checkCanAttempt = false,
): Promise<ValidatedLearnInput | null> {
    const resolved = getSpellTraitsAndRank(spellDoc);
    if (!resolved) {
        ui.notifications.warn(game.i18n.localize(`${I18N}.learnSpellInvalidRank`));
        return null;
    }

    const ident = spellIdentifier(spellDoc);

    const entry = pickSpellcastingEntryForActor(actor, resolved.traditions, entryId);

    if (!entry) {
        ui.notifications.warn(game.i18n.localize(`${I18N}.learnNoCompatibleEntry`));
        return null;
    }

    if (checkCanAttempt && ident && hasLearnFailureAtCurrentLevel(actor, sanitizeFlagKey(ident))) {
        return null;
    }

    const finalDc = calculateLearnDc(resolved.rankKey, resolved.traits, getLearnSpellDcAdjustment());
    const costCopper = getLearnSpellCostCopper(resolved.rankKey);
    const hours = getLearnSpellHours(resolved.rankKey, actor);

    return { ident, resolved, entry, finalDc, costCopper, hours };
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
): Promise<boolean> {
    const effectiveCost = computeEffectiveCost(ctx.costCopper, outcome);

    const deducted = await executeCostDeduction({
        actor: ctx.actor,
        costCopper: effectiveCost,
        spellName: ctx.spellName,
    });
    if (!deducted && effectiveCost > 0) return false;

    if (isSuccessOutcome(outcome)) {
        if (ctx.ident) await clearLearnFailure(ctx.actor, sanitizeFlagKey(ctx.ident));
        await onSuccess();
    } else if (isFailureOutcome(outcome)) {
        if (ctx.ident) await setLearnFailure(ctx.actor, sanitizeFlagKey(ctx.ident), getActorLevel(ctx.actor));
    }

    if (!suppressMessages && outcome) {
        postLearnChatMessage(ctx.actor, OUTCOME_I18N_KEYS[outcome] ?? "", {
            actor: ctx.actor.name,
            spellName: ctx.spellName,
            cost: formatCostForDisplay(effectiveCost),
            hours: ctx.hours,
        });
    }

    return true;
}

async function processBatchOutcome(
    spell: BatchLearnSpellEntry,
    ctx: BatchLearnContext,
    validated: ValidatedLearnInput,
    spellDoc: SpellPF2e,
    outcome: LearnOutcome | null | undefined,
): Promise<{ result: BatchLearnSpellResult; stopBatch?: boolean }> {
    const success = await processLearnOutcome(
        {
            actor: ctx.actor,
            ident: validated.ident,
            costCopper: validated.costCopper,
            hours: validated.hours,
            spellName: validated.resolved.spellName,
            entryId: validated.entry.id,
        },
        outcome,
        ctx.suppressIndividualMessages ?? false,
        async () => {
            await createSpellWithLock(ctx.actor, getSpellDocData(spellDoc), validated.entry.id);
        },
    );

    const effectiveCost = computeEffectiveCost(validated.costCopper, outcome);
    if (!success) {
        return { result: makeBatchResult(spell, outcome ?? null, 0, validated.hours, false), stopBatch: true };
    }
    return { result: makeBatchResult(spell, outcome ?? null, effectiveCost, validated.hours, false) };
}
