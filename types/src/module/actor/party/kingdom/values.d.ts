import { ModifierAdjustment, RawModifier } from "@actor/modifiers.ts";
import { KingdomCharter, KingdomGovernment, KingdomHeartland } from "./schema.ts";
import { KingdomAbility, KingdomLeadershipRole, KingdomSkill } from "./types.ts";

declare const KINGDOM_ABILITIES: readonly ["culture", "economy", "loyalty", "stability"];
declare const KINGDOM_LEADERSHIP: readonly ["ruler", "counselor", "general", "emissary", "magister", "treasurer", "viceroy", "warden"];
declare const KINGDOM_COMMODITIES: readonly ["food", "luxuries", "lumber", "ore", "stone"];
declare const KINGDOM_SKILLS: readonly ["agriculture", "arts", "boating", "defense", "engineering", "exploration", "folklore", "industry", "intrigue", "magic", "politics", "scholarship", "statecraft", "trade", "warfare", "wilderness"];
declare const KINGDOM_LEADERSHIP_ABILITIES: Record<KingdomLeadershipRole, KingdomAbility>;
declare const KINGDOM_SKILL_ABILITIES: Record<KingdomSkill, KingdomAbility>;
declare const KINGDOM_ABILITY_LABELS: Record<"culture" | "economy" | "loyalty" | "stability", string>;
declare const KINGDOM_COMMODITY_LABELS: Record<"stone" | "food" | "luxuries" | "lumber" | "ore", string>;
/** Ruin label by ability slug */
declare const KINGDOM_RUIN_LABELS: {
    culture: string;
    economy: string;
    stability: string;
    loyalty: string;
};
declare const KINGDOM_SKILL_LABELS: Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", string>;
declare const CONTROL_DC_BY_LEVEL: number[];
declare const KINGDOM_SIZE_DATA: {
    1: {
        faces: number;
        type: "territory";
        controlMod: number;
        storage: number;
    };
    10: {
        faces: number;
        type: "province";
        controlMod: number;
        storage: number;
    };
    25: {
        faces: number;
        type: "state";
        controlMod: number;
        storage: number;
    };
    50: {
        faces: number;
        type: "country";
        controlMod: number;
        storage: number;
    };
    100: {
        faces: number;
        type: "dominion";
        controlMod: number;
        storage: number;
    };
};
declare const KINGDOM_SETTLEMENT_TYPES: readonly ["village", "town", "city", "metropolis"];
declare const KINGDOM_SETTLEMENT_TYPE_LABELS: Record<"village" | "town" | "city" | "metropolis", string>;
declare const KINGDOM_SETTLEMENT_TYPE_DATA: {
    village: {
        blocks: number;
        population: [number, number];
        level: [number, number];
        consumption: number;
        maxItemBonus: number;
        influence: number;
    };
    town: {
        blocks: number;
        population: [number, number];
        level: [number, number];
        consumption: number;
        maxItemBonus: number;
        influence: number;
    };
    city: {
        blocks: number;
        population: [number, number];
        level: [number, number];
        consumption: number;
        maxItemBonus: number;
        influence: number;
    };
    metropolis: {
        blocks: number;
        population: [number, number];
        level: [number, number];
        consumption: number;
        maxItemBonus: number;
        influence: number;
    };
};
type VacancyPenalty = {
    adjustments?: Record<string, ModifierAdjustment[]>;
    modifiers?: Record<string, (RawModifier & {
        slug: string;
    })[]>;
};
declare const VACANCY_PENALTIES: Record<KingdomLeadershipRole, () => VacancyPenalty>;
interface KingdomCHGData {
    charter: Record<string, Omit<KingdomCharter, "id"> | undefined>;
    heartland: Record<string, Omit<KingdomHeartland, "id"> | undefined>;
    government: Record<string, Omit<KingdomGovernment, "id"> | undefined>;
}
/** Returns every single possible charter, heartland, and government */
declare function getKingdomCHGData(): KingdomCHGData;
export { CONTROL_DC_BY_LEVEL, KINGDOM_ABILITIES, KINGDOM_ABILITY_LABELS, KINGDOM_COMMODITIES, KINGDOM_COMMODITY_LABELS, KINGDOM_LEADERSHIP, KINGDOM_LEADERSHIP_ABILITIES, KINGDOM_RUIN_LABELS, KINGDOM_SETTLEMENT_TYPES, KINGDOM_SETTLEMENT_TYPE_DATA, KINGDOM_SETTLEMENT_TYPE_LABELS, KINGDOM_SIZE_DATA, KINGDOM_SKILLS, KINGDOM_SKILL_ABILITIES, KINGDOM_SKILL_LABELS, VACANCY_PENALTIES, getKingdomCHGData, };
export type { KingdomCHGData };
