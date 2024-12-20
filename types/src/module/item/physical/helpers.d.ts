import { ActorPF2e } from "@actor";
import type { ContainerPF2e, PhysicalItemPF2e } from "@item";
import { PhysicalItemSource } from "@item/base/data/index.ts";
import { ContainerBulkData } from "@item/container/data.ts";
import { Rarity } from "@module/data.ts";
import { CoinsPF2e } from "./coins.ts";
import { BulkData, EquippedData } from "./data.ts";

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
/** Validate HP changes to a physical item and also adjust current HP when max HP changes */
declare function handleHPChange(item: PhysicalItemPF2e, changed: DeepPartial<PhysicalItemSource>): void;
/** Add and adjust properties on an item's bulk data object */
declare function prepareBulkData<TItem extends PhysicalItemPF2e>(item: TItem): TItem extends ContainerPF2e ? ContainerBulkData : BulkData;
/**
 * Detach a subitem from another physical item, either creating it as a new, independent item or incrementing the
 * quantity of aan existing stack.
 */
declare function detachSubitem(subitem: PhysicalItemPF2e, skipConfirm: boolean): Promise<void>;
/** Clone an item, sizing it appropriately for the actor. For larger PCs, set the price's sensitity to false.  */
declare function sizeItemForActor<TItem extends PhysicalItemPF2e>(item: TItem, actor: ActorPF2e): TItem;
/** Returns the default equip status for this item, called in order to "reset" the equip status */
declare function getDefaultEquipStatus(item: PhysicalItemPF2e): EquippedData;
export { coinCompendiumIds } from "./coins.ts";
export { CoinsPF2e, computeLevelRarityPrice, detachSubitem, generateItemName, getDefaultEquipStatus, handleHPChange, prepareBulkData, sizeItemForActor, };
