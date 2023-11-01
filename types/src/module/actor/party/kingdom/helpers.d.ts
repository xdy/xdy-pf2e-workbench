import { KingdomAbility, KingdomCHG, KingdomCommodity } from "./types.ts";
import type { Kingdom } from "./model.ts";
/** Resolves boosts using kingmaker rules. Free boosts cannot be the granted ability nor the flaw */
export declare function resolveKingdomBoosts(entry: KingdomCHG, choices: KingdomAbility[]): KingdomAbility[];
/** Assemble what will be collected during the kingdom's upkeep phase */
export declare function calculateKingdomCollectionData(kingdom: Kingdom): {
    formula: string;
    commodities: Record<Exclude<KingdomCommodity, "food">, number>;
};
