import { KingdomAbility, KingdomCHG } from "./types.ts";
/** Resolves boosts using kingmaker rules. Free boosts cannot be the granted ability nor the flaw */
export declare function resolveKingdomBoosts(entry: KingdomCHG, choices: KingdomAbility[]): KingdomAbility[];
