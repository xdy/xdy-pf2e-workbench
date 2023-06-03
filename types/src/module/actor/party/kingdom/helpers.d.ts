import { KingdomAbility, KingdomCHG } from "./data.ts";
/** Resolves boosts using kingmaker rules. Free boosts cannot be the granted ability nor the flaw */
export declare function resolveKingdomBoosts(entry: KingdomCHG, choices: KingdomAbility[]): KingdomAbility[];
/** A less verbose version of R.map */
export declare function mapValuesFromKeys<K extends string | number | symbol, V>(keys: readonly K[], mapping: (key: K) => V): Record<K, V>;
