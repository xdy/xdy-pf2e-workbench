import type { ActorPF2e, SpellPF2e } from "foundry-pf2e";
import { getActorClassSlugs, getSkillBasedTraditionGrants } from "./featRules.ts";
import { CLASS_DEFINITIONS, type ClassSlug } from "./classDefinitions.ts";

const deitySpellCache = new Map<string, readonly string[]>();

async function resolveClericDeitySpells(actor: ActorPF2e): Promise<readonly string[]> {
    const options = actor.getSelfRollOptions();
    const deitySlug = extractDeitySlug(options);
    if (!deitySlug) return [];

    const cached = deitySpellCache.get(deitySlug);
    if (cached) return cached;

    const deity = await findDeityInPacks(deitySlug);
    if (!deity) return [];

    const spells = (deity as { system?: { spells?: Record<string, string> } }).system?.spells ?? {};
    const slugs: string[] = [];
    for (const uuid of Object.values(spells)) {
        const slug = await resolveSpellSlugFromCompendiumUuid(uuid);
        if (slug) slugs.push(slug);
    }

    deitySpellCache.set(deitySlug, slugs);
    return slugs;
}

function extractDeitySlug(options: string[]): string | null {
    for (const option of options) {
        if (option.startsWith("self:deity:slug:")) return option.slice("self:deity:slug:".length);
    }
    return null;
}

async function findDeityInPacks(slug: string): Promise<foundry.abstract.Document | null> {
    for (const pack of game.packs) {
        if (pack.documentName !== "Item") continue;
        const index = pack.index;
        if (!index) continue;
        for (const entry of index) {
            const typed = entry as { type?: string; system?: { slug?: string }; name?: string };
            if (typed.type !== "deity") continue;
            const entrySlug = typed.system?.slug ?? game.pf2e.system.sluggify(typed.name ?? "");
            if (entrySlug === slug) {
                return (pack as unknown as { getDocument(id: string): Promise<foundry.abstract.Document> }).getDocument(
                    entry._id,
                );
            }
        }
    }
    return null;
}

async function resolveSpellSlugFromCompendiumUuid(uuid: string): Promise<string | null> {
    try {
        const doc = (await fromUuid(uuid)) as { system?: { slug?: string } } | null;
        return doc?.system?.slug ?? null;
    } catch {
        return null;
    }
}

async function getClassForcedTraditionSpells(actor: ActorPF2e, classSlug: string): Promise<readonly string[]> {
    const forced = CLASS_DEFINITIONS[classSlug as ClassSlug]?.forcedTraditionSpells;
    if (forced) return forced;

    if (classSlug === "cleric") return resolveClericDeitySpells(actor);

    return [];
}

export async function getActorForcedTraditionSpells(actor: ActorPF2e): Promise<Set<string>> {
    const spells = new Set<string>();
    for (const slug of getActorClassSlugs(actor)) {
        for (const spell of await getClassForcedTraditionSpells(actor, slug)) {
            spells.add(spell);
        }
    }
    return spells;
}

export function getCrossTraditionGrants(actor: ActorPF2e): Set<string> {
    const granted = new Set<string>();
    for (const t of getSkillBasedTraditionGrants(actor)) {
        granted.add(t);
    }
    return granted;
}

export function expandForCrossTradition(actor: ActorPF2e, traditions: string[]): string[] {
    const crossGrants = getCrossTraditionGrants(actor);
    return [...new Set([...traditions, ...crossGrants])];
}

export function hasCompatibleTraditionCrossTrad(spellTraditions: string[], grants: ReadonlySet<string>): boolean {
    if (grants.size === 0) return false;
    return spellTraditions.some((t) => grants.has(t));
}

function resolveSpellSlug(spell: SpellPF2e): string | null {
    return (spell.system as { slug?: string } | undefined)?.slug ?? null;
}

export async function expandForForcedTradition(
    actor: ActorPF2e,
    spell: SpellPF2e,
    traditions: string[],
): Promise<string[]> {
    const slug = resolveSpellSlug(spell);
    if (!slug) return traditions;

    const forcedSpells = await getActorForcedTraditionSpells(actor);
    if (!forcedSpells.has(slug)) return traditions;

    const expanded = new Set(traditions);
    for (const classSlug of getActorClassSlugs(actor)) {
        const classTrads = CLASS_DEFINITIONS[classSlug as ClassSlug]?.traditions ?? [];
        for (const t of classTrads) expanded.add(t);
    }
    return [...expanded];
}

export async function resolveExpandedTraditions(
    actor: ActorPF2e,
    spell: SpellPF2e,
    baseTraditions: string[],
): Promise<string[]> {
    return expandForForcedTradition(actor, spell, expandForCrossTradition(actor, baseTraditions));
}
