import type { ActorPF2e, SpellPF2e } from "foundry-pf2e";
import type { ResolvedSpellTraits, SpellSourceId } from "./types.ts";
import { RANK_CANTRIP } from "./helpers.ts";
import { actorHasItemBySlug, getModuleSetting } from "../../utils.ts";
import { getCostDenominationMultiplier } from "./economyHandler.ts";

export function getSpellSourceInfo(spell: SpellPF2e): {
    sourceId?: string;
    compendiumSource?: string;
    slug?: string | null;
} {
    const spellSourceId = spell as unknown as SpellSourceId;
    return {
        sourceId: spellSourceId.sourceId,
        compendiumSource: spellSourceId._stats?.compendiumSource,
        slug: spell.system?.slug,
    };
}

export function spellIdentifier(spell: SpellPF2e): string | null {
    const { sourceId, compendiumSource, slug } = getSpellSourceInfo(spell);
    const resolved = compendiumSource ?? sourceId;
    if (resolved) return `sourceId:${resolved}`;
    if (slug) return `slug:${slug}`;
    return null;
}

const LEARN_SPELL_BASE_DC: Readonly<Record<string, number>> = {
    [RANK_CANTRIP]: 15,
    "1": 15,
    "2": 18,
    "3": 20,
    "4": 23,
    "5": 26,
    "6": 28,
    "7": 31,
    "8": 34,
    "9": 36,
    "10": 41,
};

const RARITY_DC_ADJUSTMENT: Readonly<Record<string, number>> = {
    common: 0,
    uncommon: 2,
    rare: 5,
    unique: 10,
};

export const SPELL_FORMULA_COST: Readonly<Record<string, number>> = {
    [RANK_CANTRIP]: 1,
    "1": 1,
    "2": 3,
    "3": 8,
    "4": 18,
    "5": 35,
    "6": 70,
    "7": 150,
    "8": 325,
    "9": 750,
    "10": 3500,
};

export function calculateLearnDc(rankKey: string, rarity: string, modifier = 0): number {
    const baseDc = LEARN_SPELL_BASE_DC[rankKey] ?? 15;
    const rarityAdj = RARITY_DC_ADJUSTMENT[rarity.toLowerCase()] ?? 0;
    return baseDc + rarityAdj + modifier;
}

export function computeLearnParams(
    rankKey: string,
    rarity: string,
    actor?: ActorPF2e,
): { finalDc: number; costCopper: number; hours: number } {
    return {
        finalDc: calculateLearnDc(rankKey, rarity, getLearnSpellDcAdjustment()),
        costCopper: getLearnSpellCostCopper(rankKey),
        hours: getLearnSpellHours(rankKey, actor),
    };
}
export function getLearnSpellDcAdjustment(): number {
    return getModuleSetting<number>("learnSpellDcAdjustment") ?? 0;
}

export function getLearnSpellCostCopper(rankKey: string): number {
    return (SPELL_FORMULA_COST[rankKey] ?? 1) * 2 * getCostDenominationMultiplier();
}

export function getLearnSpellHours(rankKey: string, actor?: ActorPF2e): number {
    if (actor && actorHasItemBySlug(actor, "magical-shorthand")) return 1 / 6;
    if (rankKey === RANK_CANTRIP) return 1;
    const rank = Number(rankKey);
    return Number.isFinite(rank) && rank > 0 ? rank : 1;
}

export function getSpellTraitsAndRank(spell: SpellPF2e): ResolvedSpellTraits | null {
    const spellLevel = spell.system?.level?.value;
    if (spellLevel === undefined) return null;
    const traits: string[] = spell.system?.traits?.value ?? [];
    const traditions: string[] = spell.system?.traits?.traditions ?? [];
    const rarity: string = spell.system?.traits?.rarity ?? "common";
    const isCantrip = traits.includes(RANK_CANTRIP) || spellLevel <= 0;
    const rankKey = isCantrip ? RANK_CANTRIP : String(spellLevel);
    const spellName = spell.name;
    return { traits, traditions, rarity, rankKey, spellName };
}

type ToObjectable = { toObject(): Record<string, unknown>; uuid?: string };

export function getSpellDocData(spellDoc: SpellPF2e | Record<string, unknown>): Record<string, unknown> {
    if (typeof (spellDoc as ToObjectable).toObject === "function") {
        const obj = (spellDoc as ToObjectable).toObject();
        obj.uuid = (spellDoc as ToObjectable).uuid;
        return obj;
    }
    return spellDoc as Record<string, unknown>;
}

export async function resolveSpellFromUuid(uuid: string): Promise<SpellPF2e | null> {
    const doc = await fromUuid(uuid);
    if (!doc) return null;
    if ((doc as { type?: string }).type !== "spell") return null;
    return doc as SpellPF2e;
}
