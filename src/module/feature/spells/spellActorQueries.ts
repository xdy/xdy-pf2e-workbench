import type { ActorPF2e, ItemPF2e, SpellcastingEntryPF2e, SpellPF2e } from "foundry-pf2e";
import { spellIdentifier } from "./spellData.ts";
import { getSpellcastingEntries, I18N_LEARN, I18N_SHARED } from "./helpers.ts";
import type { SpellRollSkill } from "./types.ts";
import { getCrossTraditionGrants, hasCompatibleTraditionCrossTrad } from "./traditions.ts";

function* iterateKnownSpells(actor: ActorPF2e): Generator<[ItemPF2e, string]> {
    for (const entry of getSpellcastingEntries(actor)) {
        const spells: ItemPF2e[] = entry.spells?.contents ? [...entry.spells.contents] : [];
        for (const spell of spells) {
            const ident = spellIdentifier(spell as SpellPF2e);
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
    return getSpellcastingEntries(actor).some((entry) => entry.isSpontaneous && !entry.isFocusPool);
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

function entryHasCompatibleTradition(entry: SpellcastingEntryPF2e, traditions: string[]): boolean {
    if (traditions.length === 0) return true;
    const trad = getEntryTradition(entry);
    return trad !== null && traditions.includes(trad);
}

export async function guardEntryTraditionCompatibility(
    entry: SpellcastingEntryPF2e,
    spellName: string,
    traditions: string[],
    actor: ActorPF2e,
): Promise<boolean> {
    if (entryHasCompatibleTradition(entry, traditions)) return true;
    return promptTraditionOverrideAndAnnounce(spellName, traditions, actor);
}

export interface EntryDisplayInfo {
    name: string;
    tradition: string;
    type: string;
}

export function getEntryDisplayInfo(entry: SpellcastingEntryPF2e): EntryDisplayInfo {
    const tradition = getEntryTradition(entry) ?? "";
    if (entry.isFocusPool)
        return { name: entry.name, tradition, type: game.i18n.localize(`${I18N_LEARN}.entryTypeFocus`) };
    if (entry.isSpontaneous)
        return { name: entry.name, tradition, type: game.i18n.localize(`${I18N_LEARN}.entryTypeSpontaneous`) };
    if (entry.isPrepared)
        return { name: entry.name, tradition, type: game.i18n.localize(`${I18N_LEARN}.entryTypePrepared`) };
    return { name: entry.name, tradition, type: game.i18n.localize(`${I18N_LEARN}.entryTypeSpellcasting`) };
}

function getEntriesWithTradition(actor: ActorPF2e): { item: SpellcastingEntryPF2e; tradition: string }[] {
    const entries: { item: SpellcastingEntryPF2e; tradition: string }[] = [];
    for (const entry of getSpellcastingEntries(actor)) {
        if (entry.isEphemeral) continue;
        const trad = getEntryTradition(entry);
        if (!trad) continue;
        entries.push({ item: entry, tradition: trad });
    }
    return entries;
}

function entryMatchesTradition(tradition: string, spellTraditions: string[]): boolean {
    return spellTraditions.length === 0 || spellTraditions.includes(tradition);
}

type PreferredEntryResult = { status: "no-match"; entry: null } | { status: "matched"; entry: SpellcastingEntryPF2e };

function resolvePreferredEntry(
    entries: { item: SpellcastingEntryPF2e; tradition: string }[],
    spellTraditions: string[],
    preferredEntryId?: string,
): PreferredEntryResult {
    if (!preferredEntryId) return { status: "no-match", entry: null };
    const preferred = entries.find((e) => e.item.id === preferredEntryId);
    if (!preferred) return { status: "no-match", entry: null };
    return entryMatchesTradition(preferred.tradition, spellTraditions)
        ? { status: "matched", entry: preferred.item }
        : { status: "no-match", entry: null };
}

export function pickSpellcastingEntryForActor(
    actor: ActorPF2e,
    spellTraditions: string[],
    preferredEntryId?: string,
): SpellcastingEntryPF2e | null {
    const entries = getEntriesWithTradition(actor);
    if (entries.length === 0) return null;
    const preferred = resolvePreferredEntry(entries, spellTraditions, preferredEntryId);
    if (preferred.status === "matched") return preferred.entry;

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
    const preferred = resolvePreferredEntry(entries, spellTraditions, preferredEntryId);
    if (preferred.status === "matched") return preferred.entry;

    const matches = entries.filter((e) => entryMatchesTradition(e.tradition, spellTraditions));
    if (matches.length === 0) return null;
    if (matches.length === 1) return matches[0].item;

    const options = matches.map((m) => ({
        value: m.item.id!,
        label: m.item.name,
    }));
    const selection = await foundry.applications.api.DialogV2.wait({
        window: { title: game.i18n.localize(`${I18N_LEARN}.pickEntryTitle`) },
        content: `${game.i18n.localize(`${I18N_LEARN}.pickEntryMessage`)}`,
        buttons: options.map((opt) => ({
            action: opt.value,
            label: opt.label,
        })),
    });
    if (!selection) return null;
    return matches.find((m) => m.item.id === selection)?.item ?? null;
}

export function guardAlreadyKnown(actor: ActorPF2e, spell: SpellPF2e, spellName: string): boolean {
    const ident = spellIdentifier(spell);
    if (ident && findKnownSpell(actor, ident)) {
        ui.notifications.info(game.i18n.format(`${I18N_SHARED}.alreadyKnown`, { name: spellName }));
        return true;
    }
    return false;
}

export const TRADITION_SKILL: Record<string, string> = {
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

export function notifyTraditionMismatch(spellName: string, traditions: string[]): void {
    ui.notifications.warn(
        game.i18n.format(`${I18N_SHARED}.traditionMismatch`, {
            spellName,
            traditions: traditions.join(", ") || game.i18n.localize(`${I18N_LEARN}.noTradition`),
        }),
    );
}

async function promptTraditionOverrideAndAnnounce(
    spellName: string,
    traditions: string[],
    actor: ActorPF2e,
): Promise<boolean> {
    const traditionList = traditions.join(", ") || game.i18n.localize(`${I18N_LEARN}.noTradition`);
    const choice = await foundry.applications.api.DialogV2.wait({
        window: { title: spellName },
        content: game.i18n.format(`${I18N_SHARED}.traditionMismatchOverride`, {
            spellName,
            traditions: traditionList,
        }),
        buttons: [
            { action: "override", label: game.i18n.localize(`${I18N_SHARED}.learnAnywayYes`) },
            { action: "cancel", label: game.i18n.localize(`${I18N_SHARED}.learnAnywayNo`) },
        ],
        rejectClose: false,
    });
    if (choice === "override") {
        await ChatMessage.create({
            content: game.i18n.format(`${I18N_SHARED}.traditionOverrideChat`, {
                actorName: actor.name,
                spellName,
                traditions: traditionList,
            }),
            speaker: ChatMessage.getSpeaker({ actor }),
        });
        return true;
    }
    return false;
}

export function resolveEntryById(actor: ActorPF2e, entryId: string): SpellcastingEntryPF2e | null {
    for (const entry of getSpellcastingEntries(actor)) {
        if (entry.id === entryId && !entry.isEphemeral) return entry;
    }
    return null;
}

async function resolveEntryForIntercept(
    actor: ActorPF2e,
    traditions: string[],
    specificEntryId?: string,
): Promise<SpellcastingEntryPF2e | null> {
    const entry = specificEntryId
        ? pickSpellcastingEntryForActor(actor, traditions, specificEntryId)
        : await pickSpellcastingEntryWithDialog(actor, traditions);
    if (entry) return entry;
    return null;
}

export async function resolveInterceptEntry(
    actor: ActorPF2e,
    traditions: string[],
    specificEntryId?: string,
): Promise<SpellcastingEntryPF2e | null> {
    return specificEntryId
        ? resolveEntryById(actor, specificEntryId)
        : await resolveEntryForIntercept(actor, traditions);
}

export async function guardTraditionCompatibility(
    actor: ActorPF2e,
    traditions: string[],
    spellName: string,
): Promise<boolean> {
    if (
        !hasCompatibleTradition(actor, traditions) &&
        !hasCompatibleTraditionCrossTrad(traditions, getCrossTraditionGrants(actor))
    ) {
        return await promptTraditionOverrideAndAnnounce(spellName, traditions, actor);
    }
    return true;
}

export function notifyNoCompatibleEntry(): void {
    ui.notifications.warn(game.i18n.localize(`${I18N_SHARED}.learnNoCompatibleEntry`));
}
