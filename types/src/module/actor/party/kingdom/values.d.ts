import { KingdomAbility, KingdomCHG, KingdomGovernment, KingdomLeadershipRole, KingdomSkill } from "./types.ts";
import { ModifierAdjustment, RawModifier } from "@actor/modifiers.ts";
declare const KINGDOM_ABILITIES: readonly ["culture", "economy", "loyalty", "stability"];
declare const KINGDOM_ABILITY_LABELS: Record<"culture" | "economy" | "loyalty" | "stability", string>;
/** Ruin label by ability slug */
declare const KINGDOM_RUIN_LABELS: {
    culture: string;
    economy: string;
    stability: string;
    loyalty: string;
};
declare const KINGDOM_LEADERSHIP: readonly ["ruler", "counselor", "general", "emissary", "magister", "treasurer", "viceroy", "warden"];
declare const KINGDOM_LEADERSHIP_ABILITIES: Record<KingdomLeadershipRole, KingdomAbility>;
declare const KINGDOM_COMMODITIES: readonly ["food", "luxuries", "lumber", "ore", "stone"];
declare const KINGDOM_SKILLS: readonly ["agriculture", "arts", "boating", "defense", "engineering", "exploration", "folklore", "industry", "intrigue", "magic", "politics", "scholarship", "statecraft", "trade", "warfare", "wilderness"];
declare const KINGDOM_SKILL_LABELS: Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", string>;
declare const KINGDOM_SKILL_ABILITIES: Record<KingdomSkill, KingdomAbility>;
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
type VacancyPenalty = {
    adjustments?: ModifierAdjustment[];
    modifiers?: Record<string, RawModifier[]>;
};
declare const VACANCY_PENALTIES: Record<KingdomLeadershipRole, () => VacancyPenalty>;
declare function getKingdomABCData(): {
    charter: Record<string, KingdomCHG | undefined>;
    heartland: Record<string, KingdomCHG | undefined>;
    government: Record<string, KingdomGovernment | undefined>;
};
export { CONTROL_DC_BY_LEVEL, KINGDOM_ABILITIES, KINGDOM_ABILITY_LABELS, KINGDOM_COMMODITIES, KINGDOM_SIZE_DATA, KINGDOM_SKILLS, KINGDOM_SKILL_ABILITIES, KINGDOM_SKILL_LABELS, KINGDOM_LEADERSHIP, KINGDOM_LEADERSHIP_ABILITIES, KINGDOM_RUIN_LABELS, VACANCY_PENALTIES, getKingdomABCData, };
