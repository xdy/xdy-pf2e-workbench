import type { SpellPF2e } from "foundry-pf2e";
import { getSpellSourceInfo, resolveSpellFromUuid } from "./spellData.ts";

const COMPENDIUM_UUID_RE = /^Compendium\./;
const COMPENDIUM_NO_ITEM_RE = /^(Compendium\.[^.]+\.[^.]+)\.([^.]+)$/;
const ACTOR_ITEM_UUID_RE = /^Actor\.([^.]+)\.[Ii]tem\./;
const ACTOR_ITEM_ENTRY_UUID_RE = /^Actor\.([^.]+)\.Item\.([^.]+)\.Item\./;
const WORLD_ITEM_UUID_RE = /^Item\./;

export function isCompendiumUuid(uuid: string): boolean {
    return COMPENDIUM_UUID_RE.test(uuid);
}

function normalizeCompendiumUuid(uuid: string): string {
    const m = uuid.match(COMPENDIUM_NO_ITEM_RE);
    return m ? `${m[1]}.Item.${m[2]}` : uuid;
}

export function isActorSpellUuid(uuid: string): boolean {
    return ACTOR_ITEM_UUID_RE.test(uuid);
}

export function getSpellOrigin(spellDoc: SpellPF2e): { compendiumUuid: string | null; matchesCompendium: boolean } {
    const { sourceId, compendiumSource } = getSpellSourceInfo(spellDoc);
    const compendiumUuid = compendiumSource ?? sourceId ?? null;
    if (compendiumUuid && isCompendiumUuid(compendiumUuid)) {
        return {
            compendiumUuid,
            matchesCompendium: sourceId === compendiumUuid || !sourceId,
        };
    }
    return { compendiumUuid: null, matchesCompendium: false };
}

export function resolveCompendiumOrigin(spell: SpellPF2e): string | null {
    return (
        getSpellOrigin(spell).compendiumUuid ??
        (spell as unknown as { flags?: { core?: { sourceId?: string } } }).flags?.core?.sourceId ??
        null
    );
}

export async function canonicalizeSpellUuid(uuid: string): Promise<string> {
    if (isCompendiumUuid(uuid)) return normalizeCompendiumUuid(uuid);
    if (WORLD_ITEM_UUID_RE.test(uuid)) return uuid;

    const spellDoc = await resolveSpellFromUuid(uuid);
    if (!spellDoc) return uuid;

    const { sourceId, compendiumSource } = getSpellSourceInfo(spellDoc);
    const resolvedUuid = compendiumSource ?? sourceId ?? null;
    if (resolvedUuid && isCompendiumUuid(resolvedUuid)) return resolvedUuid;

    return uuid;
}

export function extractActorIdFromSpellUuid(uuid: string): string | null {
    const match = uuid.match(ACTOR_ITEM_UUID_RE);
    return match ? match[1] : null;
}

export function extractEntryIdFromSpellUuid(uuid: string): string | null {
    const match = uuid.match(ACTOR_ITEM_ENTRY_UUID_RE);
    return match ? match[2] : null;
}

export async function resolveUuidsToDocMap(uuids: string[]): Promise<Map<string, SpellPF2e | null>> {
    const uniqueUuids = [...new Set(uuids)];
    const settled = await Promise.allSettled(uniqueUuids.map((uuid) => resolveSpellFromUuid(uuid)));
    const docMap = new Map<string, SpellPF2e | null>();
    for (let i = 0; i < uniqueUuids.length; i++) {
        const entry = settled[i];
        docMap.set(uniqueUuids[i], entry.status === "fulfilled" ? entry.value : null);
    }
    return docMap;
}

export function spellIconClass(uuid: string): string {
    if (WORLD_ITEM_UUID_RE.test(uuid)) return "fa-globe";
    if (isActorSpellUuid(uuid)) return "fa-user";
    return "fa-hat-wizard";
}
