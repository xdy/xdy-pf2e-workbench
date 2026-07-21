import type { ActorPF2e, ItemPF2e } from "foundry-pf2e";
import { fireAndForget, getModuleSetting } from "../../../utils.ts";
import { I18N } from "../helpers.ts";
import { getSpellDocData, getSpellTraitsAndRank, spellIdentifier } from "../spellData.ts";
import { hasSpontaneousEntry, isSpellAlreadyKnownSync, pickSpellcastingEntryWithDialog } from "../spellActorQueries.ts";
import { LearnSpellHandler } from "./learnSpellHandler.ts";
import { showConfirm } from "../dialogHelper.ts";
import { isLocked } from "../../../utils/locks.ts";
import { DirectEntryTarget } from "./spellAddInterceptHandler.ts";

function getEmbeddedSpell(scroll: ItemPF2e): Record<string, unknown> | null {
    const spell = (scroll.system as { spell?: Record<string, unknown> }).spell;
    if (spell && typeof spell === "object" && (spell as { name?: string }).name) return spell;
    return null;
}

function isScrollWithSpell(item: ItemPF2e): boolean {
    const system = item.system as { category?: string; spell?: unknown };
    return item.type === "consumable" && system.category === "scroll" && !!system.spell;
}

function isMystified(item: ItemPF2e): boolean {
    return (item.system as { identification?: { status?: string } })?.identification?.status === "unidentified";
}

async function destroyScroll(scroll: ItemPF2e): Promise<void> {
    if (!getModuleSetting<boolean>("learnSpellDestroyScroll")) return;
    if (!scroll.actor) return;
    const quantity = (scroll.system as { quantity?: number }).quantity ?? 1;
    await (quantity > 1 ? scroll.update({ "system.quantity": quantity - 1 }) : scroll.delete());
}

async function handleScrollLearn(scroll: ItemPF2e, actor: ActorPF2e): Promise<void> {
    if (isLocked(actor.id)) return;

    if (isMystified(scroll)) {
        ui.notifications.warn(game.i18n.localize(`${I18N}.scrollMystified`));
        return;
    }

    const embedded = getEmbeddedSpell(scroll);
    if (!embedded) return;

    const resolved = getSpellTraitsAndRank(embedded);
    if (!resolved) return;

    const confirmed = await showConfirm("learnFromScrollTitle", "learnFromScrollMessage", {
        spellName: resolved.spellName,
    });
    if (!confirmed) return;

    const entry = await pickSpellcastingEntryWithDialog(actor, resolved.traditions);
    if (!entry) {
        ui.notifications.warn(
            game.i18n.format(`${I18N}.traditionMismatch`, {
                spellName: resolved.spellName,
                traditions: resolved.traditions.join(", "),
            }),
        );
        return;
    }

    const spellData = getSpellDocData(embedded);

    await new LearnSpellHandler(new DirectEntryTarget()).initiateFromSpellData(spellData, actor, entry.id!);
    await destroyScroll(scroll);
}

export function scrollCreateIntercept(item: ItemPF2e, _data: object): void {
    if (!getModuleSetting<boolean>("enableGeneralLearnSpell")) return;
    if (!isScrollWithSpell(item)) return;

    const actor = item.actor as ActorPF2e | null;
    if (!actor || actor.type !== "character") return;

    const embedded = getEmbeddedSpell(item);
    if (embedded) {
        const ident = spellIdentifier(embedded);
        if (ident && isSpellAlreadyKnownSync(actor, ident) && hasSpontaneousEntry(actor)) return;
    }

    const name = item.name;
    const hookId = Hooks.on("createItem", (created: ItemPF2e) => {
        if (created.actor?.id !== actor?.id || created.name !== name || !isScrollWithSpell(created)) return;
        Hooks.off("createItem", hookId);
        fireAndForget(handleScrollLearn(created, actor!), "createItem: scrollLearn");
    });
}
