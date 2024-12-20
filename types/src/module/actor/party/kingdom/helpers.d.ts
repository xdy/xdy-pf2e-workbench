import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import type { Kingdom } from "./model.ts";
import type { KingdomCHG } from "./schema.ts";
import type { KingdomAbility, KingdomCommodity } from "./types.ts";

/** Resolves boosts using kingmaker rules. Free boosts cannot be the granted ability nor the flaw */
declare function resolveKingdomBoosts(entry: KingdomCHG, choices: KingdomAbility[]): KingdomAbility[];
/** Assemble what will be collected during the kingdom's upkeep phase */
declare function calculateKingdomCollectionData(kingdom: Kingdom): {
    formula: string;
    commodities: Record<Exclude<KingdomCommodity, "food">, number>;
};
declare function importDocuments(actor: ActorPF2e, items: ItemPF2e[], skipDialog: boolean): Promise<void>;
export { calculateKingdomCollectionData, importDocuments, resolveKingdomBoosts };
