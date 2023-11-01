import { Rarity } from "@module/data.ts";
import { CoinsPF2e } from "./coins.ts";
import { BulkData } from "./data.ts";
import type { PhysicalItemPF2e } from "./document.ts";
declare function computeLevelRarityPrice(item: PhysicalItemPF2e): {
    level: number;
    rarity: Rarity;
    price: CoinsPF2e;
};
/**
 * Generate a modified item name based on precious materials and runes. Currently only armor and weapon documents
 * have significant implementations.
 */
declare function generateItemName(item: PhysicalItemPF2e): string;
/**  Convert of scattershot bulk data on a physical item into a single object */
declare function organizeBulkData(item: PhysicalItemPF2e): BulkData;
export { coinCompendiumIds } from "./coins.ts";
export { CoinsPF2e, computeLevelRarityPrice, generateItemName, organizeBulkData };
