import { KingdomCHG, KingdomGovernment } from "./data.ts";
declare const KINGDOM_ABILITIES: readonly ["culture", "economy", "loyalty", "stability"];
declare const KINGDOM_LEADERSHIP: readonly ["ruler", "counselor", "general", "emissary", "magister", "treasurer", "viceroy", "warden"];
declare const KINGDOM_COMMODITIES: readonly ["food", "lumber", "luxuries", "ore", "stone"];
declare const KINGDOM_ABILITY_LABELS: Record<"culture" | "economy" | "loyalty" | "stability", string>;
declare function getKingdomABCData(): {
    charter: Record<string, KingdomCHG | undefined>;
    heartland: Record<string, KingdomCHG | undefined>;
    government: Record<string, KingdomGovernment | undefined>;
};
export { KINGDOM_ABILITIES, KINGDOM_ABILITY_LABELS, KINGDOM_COMMODITIES, getKingdomABCData, KINGDOM_LEADERSHIP };
