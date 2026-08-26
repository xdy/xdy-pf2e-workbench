import { getSpellSourceInfo, resolveSpellFromUuid } from "./spellData.ts";

const COMPENDIUM_UUID_RE = /^Compendium\./;
const COMPENDIUM_NO_ITEM_RE = /^(Compendium\.[^.]+\.[^.]+)\.([^.]+)$/;
const WORLD_ITEM_UUID_RE = /^Item\./;

export function isCompendiumUuid(uuid: string): boolean {
    return COMPENDIUM_UUID_RE.test(uuid);
}

function normalizeCompendiumUuid(uuid: string): string {
    const m = uuid.match(COMPENDIUM_NO_ITEM_RE);
    return m ? `${m[1]}.Item.${m[2]}` : uuid;
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
