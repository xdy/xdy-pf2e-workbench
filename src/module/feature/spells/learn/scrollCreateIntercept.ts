import type { ActorPF2e, ItemPF2e, SpellPF2e } from "foundry-pf2e";
import { fireAndForget, getModuleSetting } from "../../../utils.ts";
import { logError } from "../../../utils/logging.ts";
import { I18N_LEARN } from "../helpers.ts";
import { spellIdentifier } from "../spellData.ts";
import { notifyNoCompatibleEntry, pickSpellcastingEntryWithDialog } from "../spellActorQueries.ts";
import { showConfirm } from "../dialogHelper.ts";
import { directEntryLearnHandler } from "./directEntryTarget.ts";
import { isMystified, isScrollWithSpell } from "../itemPredicates.ts";
import type { LearnOutcome } from "../types.ts";
import { isSuccessOutcome } from "../types.ts";
import { promptOverrideLearnFailure } from "./learnDialogs.ts";
import { learnAttemptGuards } from "./batchLearn.ts";

interface ScrollSpellSource {
    name?: string;
    system?: {
        level?: { value?: number };
        traits?: {
            value?: string[];
            traditions?: string[];
            rarity?: string;
        };
        slug?: string | null;
    };
    sourceId?: string;
    _stats?: { compendiumSource?: string };
}

export function getEmbeddedScrollSpell(scroll: ItemPF2e): ScrollSpellSource | null {
    const spell = (scroll.system as { spell?: ScrollSpellSource }).spell;
    if (spell?.name) return spell;
    return null;
}

function shouldDestroyScroll(outcome: LearnOutcome | null): boolean {
    const mode = getModuleSetting<string>("learnSpellDestroyScroll");
    if (mode === "onUse") return true;
    if (mode === "onSuccess") return isSuccessOutcome(outcome);
    return false;
}

async function destroyScroll(scroll: ItemPF2e, outcome: LearnOutcome | null): Promise<void> {
    if (!shouldDestroyScroll(outcome)) return;
    if (!scroll.actor) return;
    const quantity = (scroll.system as { quantity?: number }).quantity ?? 1;
    await (quantity > 1 ? scroll.update({ "system.quantity": quantity - 1 }) : scroll.delete());
}

export async function learnSpellFromScroll(scroll: ItemPF2e, actor: ActorPF2e): Promise<void> {
    if (isMystified(scroll)) return;

    const embedded = getEmbeddedScrollSpell(scroll);
    if (!embedded) return;

    const resolved = learnAttemptGuards(embedded as unknown as SpellPF2e, actor, embedded.name ?? "");
    if (!resolved) return;

    const ident = spellIdentifier(embedded as unknown as SpellPF2e);
    if (ident && !(await promptOverrideLearnFailure(actor, ident, resolved.spellName))) return;

    const confirmed = await showConfirm(`${I18N_LEARN}.learnFromScrollTitle`, `${I18N_LEARN}.learnFromScrollMessage`, {
        spellName: resolved.spellName,
    });
    if (!confirmed) return;

    const entry = await pickSpellcastingEntryWithDialog(actor, resolved.traditions);
    if (!entry) {
        notifyNoCompatibleEntry();
        return;
    }

    const outcome = await directEntryLearnHandler.initiateFromSpellData(
        embedded as unknown as SpellPF2e,
        actor,
        entry.id!,
        entry,
    );
    await destroyScroll(scroll, outcome);
}

export function scrollCreateIntercept(item: ItemPF2e, _data: object): void {
    try {
        if (!getModuleSetting<boolean>("enableGeneralLearnSpell")) return;
        if (!isScrollWithSpell(item)) return;

        const actor = item.actor as ActorPF2e | null;
        if (!actor || actor.type !== "character") return;

        const embedded = getEmbeddedScrollSpell(item);
        if (!embedded) return;
        if (learnAttemptGuards(embedded as unknown as SpellPF2e, actor, embedded.name ?? "") === null) return;

        const sourceId = (item as unknown as { sourceId?: string }).sourceId ?? item.uuid;
        const hookId = Hooks.on("createItem", (created: ItemPF2e) => {
            const createdSourceId = (created as unknown as { sourceId?: string }).sourceId ?? created.uuid;
            if (created.actor?.id !== actor?.id || createdSourceId !== sourceId || !isScrollWithSpell(created)) return;
            Hooks.off("createItem", hookId);
            fireAndForget(learnSpellFromScroll(created, actor!), "createItem: scrollLearn");
        });
    } catch (err) {
        logError("scrollCreateIntercept: unhandled error", err);
    }
}
