import type { ActorPF2e, ItemPF2e } from "foundry-pf2e";
import { I18N } from "../helpers.ts";
import { getLearnSpellCostCopper, getLearnSpellHours, getSpellTraitsAndRank, spellIdentifier } from "../spellData.ts";
import {
    getEntryDisplayInfo,
    hasCompatibleTradition,
    hasSpontaneousEntry,
    isSpellAlreadyKnownSync,
    pickSpellcastingEntryForActor,
    pickSpellcastingEntryWithDialog,
} from "../spellActorQueries.ts";
import { showLearnSpellDialog } from "../dialogHelper.ts";
import { isLocked, withLock } from "../../../utils/locks.ts";
import { fireAndForget, getModuleSetting } from "../../../utils.ts";
import { LearnSpellHandler } from "./learnSpellHandler.ts";
import type { LearnSpellTarget } from "../types.ts";
import { createSpellWithLock } from "../spellChatUtils.ts";

export class DirectEntryTarget implements LearnSpellTarget {
    async addSpell(
        spellData: Record<string, unknown>,
        actor: ActorPF2e,
        entryId: string,
        _rankKey: string,
        _spellName: string,
    ): Promise<string | null> {
        return createSpellWithLock(actor, spellData, entryId);
    }
}

const learnSpellHandler = new LearnSpellHandler(new DirectEntryTarget());

export function shouldIntercept(item: ItemPF2e): boolean {
    if (item.type !== "spell") return false;
    const actor = item.actor;
    if (!actor || actor.type !== "character") return false;
    return getModuleSetting<boolean>("enableGeneralLearnSpell");
}

export function preCreateItemSpellIntercept(item: ItemPF2e, data: object): false | void {
    if (!shouldIntercept(item)) return;

    const actor = item.actor;
    if (!actor) return;
    if (isLocked(actor.id)) return;

    const rawData = data as Record<string, unknown>;
    const spellName = (rawData as { name?: string }).name ?? "";

    const ident = spellIdentifier(rawData);
    if (ident && isSpellAlreadyKnownSync(actor as ActorPF2e, ident)) {
        if (hasSpontaneousEntry(actor as ActorPF2e)) return;
        ui.notifications.info(game.i18n.format(`${I18N}.alreadyKnown`, { name: spellName }));
        return false;
    }

    fireAndForget(checkAndIntercept(rawData, actor as ActorPF2e, spellName), "preCreateItemHook: spellAddIntercept");

    return false;
}

async function checkAndIntercept(
    rawData: Record<string, unknown>,
    actor: ActorPF2e,
    _spellName: string,
): Promise<void> {
    const resolved = getSpellTraitsAndRank(rawData);
    if (resolved && !hasCompatibleTradition(actor, resolved.traditions)) {
        ui.notifications.warn(
            game.i18n.format(`${I18N}.traditionMismatch`, {
                spellName: resolved.spellName,
                traditions: resolved.traditions.join(", ") || game.i18n.localize(`${I18N}.noTradition`),
            }),
        );
        return;
    }

    await withLock(actor.id, () => intercept(rawData, actor));
}

function getTargetEntryIdFromData(spellData: Record<string, unknown>): string | undefined {
    const system = spellData.system as Record<string, unknown> | undefined;
    const location = system?.location as Record<string, unknown> | undefined;
    return location?.value as string | undefined;
}

async function intercept(spellData: Record<string, unknown>, actor: ActorPF2e): Promise<void> {
    const traits = getSpellTraitsAndRank(spellData);
    const rankKey = traits?.rankKey ?? "cantrip";
    const spellName = (spellData as { name?: string }).name ?? "";
    const traditions = traits?.traditions ?? [];
    const actorEntryId = getTargetEntryIdFromData(spellData);

    const entry = actorEntryId
        ? pickSpellcastingEntryForActor(actor, traditions, actorEntryId)
        : await pickSpellcastingEntryWithDialog(actor, traditions);
    if (!entry) {
        const reason = actorEntryId
            ? game.i18n.format(`${I18N}.traditionMismatch`, {
                  spellName,
                  traditions: traditions.join(", ") || game.i18n.localize(`${I18N}.noTradition`),
              })
            : game.i18n.localize(`${I18N}.learnNoCompatibleEntry`);
        ui.notifications.warn(reason);
        return;
    }

    const entryInfo = getEntryDisplayInfo(entry);
    const costCopper = getLearnSpellCostCopper(rankKey);
    const hours = getLearnSpellHours(rankKey, actor);
    const choice = await showLearnSpellDialog(spellName, costCopper, hours, entryInfo);
    if (!choice) return;

    if (choice === "no") {
        await addSpellWithoutCheck(spellData, actor, spellName, entry.id!);
        return;
    }

    await handleLearnSpell(spellData, actor, entry.id!);
}

async function addSpellWithoutCheck(
    spellData: Record<string, unknown>,
    actor: ActorPF2e,
    spellName: string,
    entryId: string,
): Promise<void> {
    await learnSpellHandler.addSpellDirectly(spellData, actor, entryId, spellName);
}

async function handleLearnSpell(spellData: Record<string, unknown>, actor: ActorPF2e, entryId: string): Promise<void> {
    await learnSpellHandler.initiateFromSpellData(spellData, actor, entryId);
}
