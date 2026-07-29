import type { ActorPF2e, ItemPF2e, SpellcastingEntryPF2e, SpellPF2e } from "foundry-pf2e";
import { spellIdentifier } from "./spellData.ts";
import { getSpellcastingEntries, I18N } from "./helpers.ts";
import type { SpellRollSkill } from "./learn/spellRoll.ts";

function* iterateKnownSpells(actor: ActorPF2e): Generator<[ItemPF2e, string]> {
    for (const entry of getSpellcastingEntries(actor)) {
        const spells: ItemPF2e[] = entry.spells?.contents ? [...entry.spells.contents] : [];
        for (const spell of spells) {
            const ident = spellIdentifier(spell as unknown as SpellPF2e);
            if (ident) yield [spell, ident];
        }
    }
}

export function findKnownSpell(actor: ActorPF2e, identifier: string): ItemPF2e | null {
    if (!identifier) return null;
    for (const [spell, ident] of iterateKnownSpells(actor)) {
        if (ident === identifier) return spell;
    }
    return null;
}

export function isSpellAlreadyKnownSync(actor: ActorPF2e, ident: string): boolean {
    return findKnownSpell(actor, ident) !== null;
}

export function hasSpontaneousEntry(actor: ActorPF2e): boolean {
    return getSpellcastingEntries(actor).some((entry) => entry.isSpontaneous);
}

export function getEntryTradition(entry: SpellcastingEntryPF2e): string | null {
    const tradition = entry.tradition ?? entry.system?.tradition?.value;
    return (tradition || null) as string | null;
}

export function hasCompatibleTradition(actor: ActorPF2e, spellTraditions: string[]): boolean {
    if (spellTraditions.length === 0) return true;
    for (const entry of getSpellcastingEntries(actor)) {
        const trad = getEntryTradition(entry);
        if (trad && spellTraditions.includes(trad)) return true;
    }
    return false;
}

export interface EntryDisplayInfo {
    name: string;
    tradition: string;
    type: string;
}

export function getEntryDisplayInfo(entry: SpellcastingEntryPF2e): EntryDisplayInfo {
    const tradition = getEntryTradition(entry) ?? "";
    if (entry.isFocusPool) return { name: entry.name, tradition, type: "focus" };
    if (entry.isSpontaneous) return { name: entry.name, tradition, type: "spontaneous" };
    if (entry.isPrepared) return { name: entry.name, tradition, type: "prepared" };
    return { name: entry.name, tradition, type: "spellcasting" };
}

function getEntriesWithTradition(actor: ActorPF2e): { item: SpellcastingEntryPF2e; tradition: string }[] {
    const entries: { item: SpellcastingEntryPF2e; tradition: string }[] = [];
    for (const entry of getSpellcastingEntries(actor)) {
        const trad = getEntryTradition(entry);
        if (!trad) continue;
        entries.push({ item: entry, tradition: trad });
    }
    return entries;
}

function entryMatchesTradition(tradition: string, spellTraditions: string[]): boolean {
    return spellTraditions.length === 0 || spellTraditions.includes(tradition);
}

export function pickSpellcastingEntryForActor(
    actor: ActorPF2e,
    spellTraditions: string[],
    preferredEntryId?: string,
): SpellcastingEntryPF2e | null {
    const entries = getEntriesWithTradition(actor);
    if (entries.length === 0) return null;
    if (preferredEntryId) {
        const preferred = entries.find((e) => e.item.id === preferredEntryId);
        if (preferred && entryMatchesTradition(preferred.tradition, spellTraditions)) return preferred.item;
        if (preferred) return null;
    }

    const matchTrad = entries.find((e) => entryMatchesTradition(e.tradition, spellTraditions));
    return matchTrad?.item ?? null;
}

export async function pickSpellcastingEntryWithDialog(
    actor: ActorPF2e,
    spellTraditions: string[],
    preferredEntryId?: string,
): Promise<SpellcastingEntryPF2e | null> {
    const entries = getEntriesWithTradition(actor);
    if (entries.length === 0) return null;
    if (preferredEntryId) {
        const preferred = entries.find((e) => e.item.id === preferredEntryId);
        if (preferred && entryMatchesTradition(preferred.tradition, spellTraditions)) return preferred.item;
        if (preferred) return null;
    }

    const matches = entries.filter((e) => entryMatchesTradition(e.tradition, spellTraditions));
    if (matches.length === 0) return null;
    if (matches.length === 1) return matches[0].item;

    const options = matches.map((m) => ({
        value: m.item.id!,
        label: m.item.name,
    }));
    const selection = await foundry.applications.api.DialogV2.wait({
        window: { title: game.i18n.localize(`${I18N}.pickEntryTitle`) },
        content: `<p>${game.i18n.localize(`${I18N}.pickEntryMessage`)}</p>`,
        buttons: options.map((opt) => ({
            action: opt.value,
            label: opt.label,
        })),
    });
    if (!selection) return null;
    return matches.find((m) => m.item.id === selection)?.item ?? null;
}

const TRADITION_SKILL: Record<string, string> = {
    arcane: "arcana",
    divine: "religion",
    occult: "occultism",
    primal: "nature",
};

type ActorWithSkills = ActorPF2e & { skills?: Record<string, unknown> };

export function getSkillCheckForEntry(actor: ActorPF2e, entry: SpellcastingEntryPF2e): SpellRollSkill | null {
    const tradSlug = getEntryTradition(entry) ?? "";
    const skillSlug = TRADITION_SKILL[tradSlug];
    if (!skillSlug) return null;
    return ((actor as ActorWithSkills).skills?.[skillSlug] as SpellRollSkill) ?? null;
}
