import { getTargetEntryIdFromData, hasLearnFailureAtCurrentLevel, I18N_SHARED } from "./helpers.ts";
import type { ActorPF2e, ItemPF2e, SpellcastingEntryPF2e, SpellPF2e } from "foundry-pf2e";
import {
    computeLearnParams,
    getLearnSpellCostCopper,
    getLearnSpellHours,
    getSpellTraitsAndRank,
    spellIdentifier,
} from "./spellData.ts";
import { clearLearnFailure } from "./flags.ts";
import {
    type EntryDisplayInfo,
    getEntryDisplayInfo,
    guardEntryTraditionCompatibility,
    guardTraditionCompatibility,
    hasSpontaneousEntry,
    isSpellAlreadyKnownSync,
    notifyNoCompatibleEntry,
    notifyTraditionMismatch,
    resolveEntryById,
    resolveInterceptEntry,
} from "./spellActorQueries.ts";
import {
    promptBatchOverrideLearnFailure,
    promptOverrideLearnFailure,
    showBatchLearnSpellDialog,
    showLearnSpellDialog,
} from "./learn/learnDialogs.ts";
import { isLocked, withLock } from "../../utils/locks.ts";
import { getModuleSetting } from "../../utils.ts";
import { logError } from "../../utils/logging.ts";
import type { BatchLearnSpellEntry, ResolvedSpellTraits } from "./types.ts";
import { resolveExpandedTraditions } from "./traditions.ts";
import { directEntryLearnHandler } from "./learn/directEntryTarget.ts";

export function shouldIntercept(item: ItemPF2e): boolean {
    if (item.type !== "spell") return false;
    const actor = item.actor;
    if (!actor || actor.type !== "character") return false;
    return getModuleSetting<boolean>("enableGeneralLearnSpell");
}

export function preCreateItemSpellIntercept(item: ItemPF2e, _data: object): false | void {
    try {
        return doPreCreateIntercept(item);
    } catch (err) {
        logError("preCreateItemSpellIntercept: unhandled error", err);
        return;
    }
}

enum PreCreateAction {
    Allow = "allow",
    Block = "block",
    InterceptGeneral = "interceptGeneral",
}

interface PendingSpellIntercept {
    spell: SpellPF2e;
    actor: ActorPF2e;
    traits: ResolvedSpellTraits;
    actorEntryId: string | undefined;
}

interface PendingQueue {
    general: PendingSpellIntercept[];
    timer: ReturnType<typeof setTimeout> | null;
}

const spellAddPending = new Map<string, PendingQueue>();

const DEBOUNCE_MS = 100;

function queueKey(actorId: string, actorEntryId: string | undefined): string {
    return actorEntryId ? `${actorId}::${actorEntryId}` : actorId;
}

function scheduleIntercept(
    spell: SpellPF2e,
    actor: ActorPF2e,
    traits: ResolvedSpellTraits,
    actorEntryId: string | undefined,
    action: PreCreateAction.InterceptGeneral,
): void {
    const key = queueKey(actor.id, actorEntryId);
    const entry = spellAddPending.get(key) ?? { general: [], timer: null };
    spellAddPending.set(key, entry);

    if (action === PreCreateAction.InterceptGeneral) {
        entry.general.push({ spell, actor, traits, actorEntryId });
    }

    if (entry.timer) clearTimeout(entry.timer);
    entry.timer = setTimeout(() => void flushQueue(key), DEBOUNCE_MS);
}

async function flushQueue(key: string): Promise<void> {
    const entry = spellAddPending.get(key);
    if (!entry) return;
    spellAddPending.delete(key);

    if (entry.general.length > 0) {
        await processGroup(entry.general, "general");
    }
}

async function processGroup(entries: PendingSpellIntercept[], kind: "general"): Promise<void> {
    if (entries.length === 1) {
        const { spell, actor, traits, actorEntryId } = entries[0];
        if (kind === "general") {
            await checkAndIntercept(spell, actor, traits, actorEntryId);
        }
        return;
    }

    if (kind === "general") {
        await processGeneralBatch(entries);
    }
}

async function processGeneralBatch(entries: PendingSpellIntercept[]): Promise<void> {
    const actor = entries[0].actor;
    const actorEntryId = entries[0].actorEntryId;

    const validated = await filterAndValidateBatch(entries, actor, actorEntryId);
    if (validated.length === 0) return;

    const resolved = await resolveBatchEntry(actor, validated, actorEntryId);
    if (!resolved) return;

    const { entry } = resolved;
    const unblocked = await filterFailedLearns(validated);
    if (unblocked.length === 0) return;

    const { totalCostCopper, totalHours } = totalBatchCost(unblocked);
    const choice = await showBatchLearnSpellDialog(unblocked.length, totalCostCopper, totalHours);
    if (!choice) return;

    if (choice === "no") {
        await executeDirectAddBatch(unblocked, entry.id);
        return;
    }

    await directEntryLearnHandler.batchLearnSpells(
        toBatchEntries(unblocked),
        actor,
        entry.id,
        getModuleSetting<boolean>("suppressBatchLearnChatMessages"),
    );
}

async function executeDirectAddBatch(entries: PendingSpellIntercept[], entryId: string): Promise<void> {
    for (const e of entries) {
        await directEntryLearnHandler.addSpellDirectly(e.spell, e.actor, entryId, e.traits.spellName);
    }
}

async function filterFailedLearns(entries: PendingSpellIntercept[]): Promise<PendingSpellIntercept[]> {
    const failed: { entry: PendingSpellIntercept; ident: string }[] = [];
    for (const e of entries) {
        const ident = spellIdentifier(e.spell);
        if (ident && hasLearnFailureAtCurrentLevel(e.actor, ident)) {
            failed.push({ entry: e, ident });
        }
    }
    if (failed.length === 0) return entries;

    const actor = entries[0].actor;
    const names = failed.map((f) => f.entry.traits.spellName);
    const proceed = await promptBatchOverrideLearnFailure(actor, names);
    if (!proceed) {
        const failedSet = new Set(failed.map((f) => f.entry));
        return entries.filter((e) => !failedSet.has(e));
    }

    for (const f of failed) {
        await clearLearnFailure(f.entry.actor, f.ident);
    }
    return entries;
}

function totalBatchCost(entries: PendingSpellIntercept[]): { totalCostCopper: number; totalHours: number } {
    const actor = entries[0].actor;
    let totalCostCopper = 0;
    let totalHours = 0;
    for (const e of entries) {
        totalCostCopper += getLearnSpellCostCopper(e.traits.rankKey);
        totalHours += getLearnSpellHours(e.traits.rankKey, actor);
    }
    return { totalCostCopper, totalHours };
}

function toBatchEntries(entries: PendingSpellIntercept[]): BatchLearnSpellEntry[] {
    return entries.map((e) => ({ uuid: e.spell.uuid, name: e.spell.name, rankKey: e.traits.rankKey }));
}

function doPreCreateIntercept(item: ItemPF2e): false | void {
    const actor = item.actor as ActorPF2e;
    if (!actor || isLocked(actor.id) || !shouldIntercept(item)) return;

    const spell = item as SpellPF2e;

    const traits = getSpellTraitsAndRank(spell);
    if (!traits) {
        ui.notifications.warn(game.i18n.localize(`${I18N_SHARED}.learnSpellInvalidRank`));
        return false;
    }

    const actorEntryId = getTargetEntryIdFromData(spell);
    const action = decidePreCreateAction(actor, spell, actorEntryId);

    switch (action) {
        case PreCreateAction.Allow:
            return;
        case PreCreateAction.Block:
            return false;
        case PreCreateAction.InterceptGeneral:
            scheduleIntercept(spell, actor, traits, actorEntryId, action);
            return false;
    }
}

function decidePreCreateAction(actor: ActorPF2e, spell: SpellPF2e, actorEntryId: string | undefined): PreCreateAction {
    const specificEntryGesture = !!actorEntryId;

    if (!specificEntryGesture) {
        const ident = spellIdentifier(spell);
        if (ident && isSpellAlreadyKnownSync(actor, ident)) {
            if (hasSpontaneousEntry(actor)) return PreCreateAction.Allow;
            ui.notifications.info(game.i18n.format(`${I18N_SHARED}.alreadyKnown`, { name: spell.name }));
            return PreCreateAction.Block;
        }
    }

    return PreCreateAction.InterceptGeneral;
}

async function checkAndIntercept(
    spell: SpellPF2e,
    actor: ActorPF2e,
    resolved: ResolvedSpellTraits,
    actorEntryId?: string,
): Promise<void> {
    const expandedTraditions = await resolveExpandedTraditions(actor, spell, resolved.traditions);

    const entry = actorEntryId ? resolveEntryById(actor, actorEntryId) : null;
    if (entry) {
        if (!(await guardEntryTraditionCompatibility(entry, resolved.spellName, expandedTraditions, actor))) return;
    } else if (!(await guardTraditionCompatibility(actor, expandedTraditions, resolved.spellName))) {
        return;
    }

    await withLock(actor.id, () => intercept(spell, actor, resolved, expandedTraditions));
}

async function intercept(
    spell: SpellPF2e,
    actor: ActorPF2e,
    resolved: ResolvedSpellTraits,
    expandedTraditions: string[],
): Promise<void> {
    const prepared = await prepareInterceptLearn(spell, actor, resolved, expandedTraditions);
    if (!prepared) return;

    const { entry, ident, costCopper, hours, spellName } = prepared;

    if (ident && !(await promptOverrideLearnFailure(actor, ident, spellName))) return;
    if (ident) await clearLearnFailure(actor, ident);

    const entryInfo = getEntryDisplayInfo(entry);
    const choice = await showLearnSpellDialog(spellName, costCopper, hours, entryInfo);
    if (!choice) return;

    if (choice === "no") {
        await directEntryLearnHandler.addSpellDirectly(spell, actor, entry.id!, spellName);
        return;
    }

    await directEntryLearnHandler.initiateFromSpellData(spell, actor, entry.id!, entry);
}

async function prepareInterceptLearn(
    spell: SpellPF2e,
    actor: ActorPF2e,
    resolved: ResolvedSpellTraits,
    expandedTraditions: string[],
): Promise<{
    entry: SpellcastingEntryPF2e;
    ident: string | null;
    finalDc: number;
    costCopper: number;
    hours: number;
    spellName: string;
} | null> {
    const resolvedEntryId = getTargetEntryIdFromData(spell);
    const entry = await resolveInterceptEntry(actor, expandedTraditions, resolvedEntryId);

    if (!entry) {
        if (resolvedEntryId) {
            notifyTraditionMismatch(resolved.spellName, resolved.traditions);
        } else {
            notifyNoCompatibleEntry();
        }
        return null;
    }

    const ident = spellIdentifier(spell);
    const { finalDc, costCopper, hours } = computeLearnParams(resolved.rankKey, resolved.rarity, actor);

    return {
        entry,
        ident,
        finalDc,
        costCopper,
        hours,
        spellName: resolved.spellName,
    };
}

async function filterAndValidateBatch(
    entries: PendingSpellIntercept[],
    actor: ActorPF2e,
    actorEntryId?: string,
): Promise<PendingSpellIntercept[]> {
    const valid: PendingSpellIntercept[] = [];
    const knownNames: string[] = [];

    for (const e of entries) {
        const ident = spellIdentifier(e.spell);
        if (ident && isSpellAlreadyKnownSync(actor, ident)) {
            knownNames.push(e.traits.spellName);
            continue;
        }

        const expanded = await resolveExpandedTraditions(actor, e.spell, e.traits.traditions);
        const guardEntry = actorEntryId ? resolveEntryById(actor, actorEntryId) : null;
        if (guardEntry) {
            if (!(await guardEntryTraditionCompatibility(guardEntry, e.traits.spellName, expanded, actor))) continue;
        } else if (!(await guardTraditionCompatibility(actor, expanded, e.traits.spellName))) {
            continue;
        }

        valid.push(e);
    }

    if (knownNames.length > 0 && !hasSpontaneousEntry(actor)) {
        ui.notifications.info(
            game.i18n.format(`${I18N_SHARED}.alreadyKnown`, {
                name: knownNames.join(", "),
            }),
        );
    }

    return valid;
}

async function resolveBatchEntry(
    actor: ActorPF2e,
    entries: PendingSpellIntercept[],
    actorEntryId?: string,
): Promise<{ entry: SpellcastingEntryPF2e; entryInfo: EntryDisplayInfo } | null> {
    const first = entries[0];
    const expanded = await resolveExpandedTraditions(actor, first.spell, first.traits.traditions);
    const entry = await resolveInterceptEntry(actor, expanded, actorEntryId);
    if (!entry) {
        notifyNoCompatibleEntry();
        return null;
    }
    return { entry, entryInfo: getEntryDisplayInfo(entry) };
}
