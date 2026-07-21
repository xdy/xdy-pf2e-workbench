import type { ActorPF2e, SpellPF2e } from "foundry-pf2e";
import type { ResolvedSpellTraits, SpellSourceIdAccess } from "./types.ts";
import { RANK_CANTRIP } from "./helpers.ts";
import { actorHasItemBySlug, getModuleSetting } from "../../utils.ts";
import { getCostDenominationMultiplier } from "./economyHandler.ts";

function resolveSpellSystem(spell: SpellPF2e | Record<string, unknown>): Record<string, unknown> | undefined {
    return (spell as Record<string, unknown>).system as Record<string, unknown> | undefined;
}

export function spellIdentifier(spell: SpellPF2e | Record<string, unknown>): string | null {
    const access = spell as SpellSourceIdAccess;
    const sourceId: string | undefined = access.sourceId ?? access._stats?.compendiumSource;
    if (sourceId) return `sourceId:${sourceId}`;
    const slug = resolveSpellSystem(spell)?.slug;
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

/** Rarity DC adjustments (GM Core p.52). */
const RARITY_DC_ADJUSTMENT: Readonly<Record<string, number>> = {
    common: 0,
    uncommon: 2,
    rare: 5,
    unique: 10,
};

/**
 * Spell formula base cost per rank, in gp. (Convert to sp/credits for sf2e)
 * Learn a Spell costs are twice this. Use {@link getCostDenominationMultiplier} to convert to copper.
 */
const SPELL_FORMULA_COST: Readonly<Record<string, number>> = {
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

function getLearnSpellBaseDc(rankKey: string): number {
    return LEARN_SPELL_BASE_DC[rankKey] ?? 15;
}

function getRarityDcAdjustment(rarity: string): number {
    return RARITY_DC_ADJUSTMENT[rarity?.toLowerCase()] ?? 0;
}

export function calculateLearnDc(rankKey: string, traits: string[], modifier = 0): number {
    const baseDc = getLearnSpellBaseDc(rankKey);
    const rarity = traits.find((t) => RARITY_DC_ADJUSTMENT[t.toLowerCase()] !== undefined) ?? "common";
    const rarityAdj = getRarityDcAdjustment(rarity);
    return baseDc + rarityAdj + modifier;
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

export function getSpellTraitsAndRank(spell: SpellPF2e | Record<string, unknown>): ResolvedSpellTraits | null {
    const spellSystem = resolveSpellSystem(spell) as
        | {
              level?: { value?: number };
              traits?: { value?: string[]; traditions?: string[] };
          }
        | undefined;
    const spellLevel: number | undefined = spellSystem?.level?.value;
    if (spellLevel === undefined) return null;
    const traits: string[] = spellSystem?.traits?.value ?? [];
    const traditions: string[] = spellSystem?.traits?.traditions ?? [];
    const isCantrip = traits.includes(RANK_CANTRIP) || spellLevel <= 0;
    const rankKey = isCantrip ? RANK_CANTRIP : String(spellLevel);
    const spellName = (spell as { name?: string }).name ?? "";
    return { traits, traditions, rankKey, spellName };
}

export function getSpellDocData(spellDoc: SpellPF2e | Record<string, unknown>): Record<string, unknown> {
    return "toObject" in (spellDoc as unknown as Record<string, unknown>)
        ? (spellDoc as unknown as { toObject: () => Record<string, unknown> }).toObject()
        : (spellDoc as unknown as Record<string, unknown>);
}
