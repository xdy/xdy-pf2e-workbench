import { KingdomAbility, KingdomCHG, KingdomGovernment, KingdomSkill } from "./data.ts";
declare const KINGDOM_ABILITIES: readonly ["culture", "economy", "loyalty", "stability"];
declare const KINGDOM_LEADERSHIP: readonly ["ruler", "counselor", "general", "emissary", "magister", "treasurer", "viceroy", "warden"];
declare const KINGDOM_COMMODITIES: readonly ["food", "lumber", "luxuries", "ore", "stone"];
declare const KINGDOM_ABILITY_LABELS: Record<"culture" | "economy" | "loyalty" | "stability", string>;
declare const KINGDOM_SKILLS: readonly ["agriculture", "arts", "boating", "defense", "engineering", "exploration", "folklore", "industry", "intrigue", "magic", "politics", "scholarship", "statecraft", "trade", "warfare", "wilderness"];
declare const KINGDOM_SKILL_LABELS: Record<"magic" | "exploration" | "agriculture" | "arts" | "boating" | "defense" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", string>;
declare const KINGDOM_SKILL_ABILITIES: Record<KingdomSkill, KingdomAbility>;
declare const CONTROL_DC_BY_LEVEL: number[];
declare function getKingdomABCData(): {
    charter: Record<string, KingdomCHG | undefined>;
    heartland: Record<string, KingdomCHG | undefined>;
    government: Record<string, KingdomGovernment | undefined>;
};
export { CONTROL_DC_BY_LEVEL, KINGDOM_ABILITIES, KINGDOM_ABILITY_LABELS, KINGDOM_COMMODITIES, KINGDOM_SKILLS, KINGDOM_SKILL_ABILITIES, KINGDOM_SKILL_LABELS, getKingdomABCData, KINGDOM_LEADERSHIP, };
