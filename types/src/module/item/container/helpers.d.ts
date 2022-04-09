import { Bulk, BulkConfig, BulkItem } from "../physical/bulk";
import { PhysicalItemData } from "../data";
import { Size } from "@module/data";
/**
 * Datatype that holds container information for *every* item, even non containers
 * @category Other
 */
declare class ContainerSheetData {
    item: PhysicalItemData;
    heldItems: PhysicalItemData[];
    negateBulk: Bulk;
    heldItemBulk: Bulk;
    isInContainer: boolean;
    formattedHeldItemBulk: string;
    formattedNegateBulk: string;
    formattedCapacity: string;
    capacity: Bulk;
    constructor({ item, heldItems, negateBulk, capacity, heldItemBulk, isInContainer, formattedNegateBulk, formattedHeldItemBulk, formattedCapacity, }: {
        item: PhysicalItemData;
        heldItems: PhysicalItemData[];
        negateBulk: Bulk;
        heldItemBulk: Bulk;
        isInContainer: boolean;
        formattedHeldItemBulk: string;
        formattedNegateBulk: string;
        formattedCapacity: string;
        capacity: Bulk;
    });
    get isContainer(): boolean;
    get isCollapsed(): boolean;
    get isNotInContainer(): boolean;
    _getLightBulkCapacityThreshold(): number;
    get fullPercentage(): number;
    get fullPercentageMax100(): number;
    get isOverLoaded(): boolean;
}
/**
 * Detect if a new container id would produce a cycle
 * @param itemId
 * @param containerId
 * @param items
 * @returns
 */
export declare function isCycle(itemId: string, containerId: string, items: PhysicalItemData[]): boolean;
/**
 * Returns a map where the key is an item id and the value is the container data.
 * Every item has container data, even if it's not a container. The relevant
 * values for non container items are just empty in that case. This is useful
 * in the templates, because you don't have a lot of leeway there
 * @param items all items on the actor
 * @param bulkItemsById all items on the actor transformed into bulk items; used to look up how much bulk a container stores
 * @param bulkConfig used to calculated bulk
 * @param actorSize
 * @return
 */
export declare function getContainerMap({ items, bulkItemsById, bulkConfig, actorSize, }?: {
    items?: PhysicalItemData[];
    bulkItemsById?: Map<string, BulkItem>;
    bulkConfig?: BulkConfig;
    actorSize?: Size;
}): Map<string, ContainerSheetData>;
export {};
