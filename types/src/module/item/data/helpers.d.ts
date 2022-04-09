import { FeatData, ItemDataPF2e, ItemSourcePF2e, MagicItemData, MagicItemSource, PhysicalItemData, PhysicalItemSource, SpellData, TraitChatData } from ".";
import { ItemSystemData, ItemTraits } from "./base";
export declare function isItemSystemData(data: Record<string, any>): data is ItemSystemData;
/** Checks if the given item data is a physical item with a quantity and other physical fields. */
export declare function isPhysicalData(itemData: ItemSourcePF2e): itemData is PhysicalItemSource;
export declare function isPhysicalData(itemData: ItemDataPF2e): itemData is PhysicalItemData;
export declare function isPhysicalData(itemData: ItemSourcePF2e | ItemDataPF2e): itemData is PhysicalItemSource | PhysicalItemData;
export declare function hasInvestedProperty(itemData: ItemSourcePF2e): itemData is MagicItemSource;
export declare function hasInvestedProperty(itemData: ItemDataPF2e): itemData is MagicItemData;
export declare function hasInvestedProperty(itemData: ItemSourcePF2e | ItemDataPF2e): itemData is MagicItemSource | MagicItemData;
export declare function isLevelItem(item: ItemDataPF2e): item is PhysicalItemData | FeatData | SpellData;
declare type ItemChatData = Omit<ItemDataPF2e["data"], "traits"> & {
    traits: TraitChatData[] | ItemTraits;
};
declare type PhysicalChatData = Omit<PhysicalItemData["data"], "traits"> & {
    traits: TraitChatData[] | ItemTraits;
};
export declare function isItemChatData(data: Record<string, unknown>): data is ItemChatData;
export declare function isPhysicalChatData(data: Record<string, unknown>): data is PhysicalChatData;
export declare function isInventoryItem(type: string): boolean;
export {};
