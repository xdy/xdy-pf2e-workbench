import { Size } from "@module/data";
import { Optional } from "@util";
import { ItemDataPF2e, PhysicalItemData } from "../data";
interface StackDefinition {
    size: number;
    lightBulk: number;
}
declare type StackDefinitions = Record<string, StackDefinition>;
/**
 * hard coded for now but could be made configurable later on.
 * Describes each stack group by how much items belong in a stack
 * and how much bulk a single stack produces. Bulk type has to be
 * included because coins don't add light bulk below 1000, just 1
 * bulk per 1000 coins
 */
export declare const stackDefinitions: StackDefinitions;
export declare class Bulk {
    normal: number;
    light: number;
    constructor({ normal, light }?: {
        normal?: number;
        light?: number;
    });
    get isNegligible(): boolean;
    get isLight(): boolean;
    toLightBulk(): number;
    plus(bulk: Bulk): Bulk;
    minus(bulk: Bulk): Bulk;
    _toSingleNumber(bulk: Bulk): [number, number];
    times(factor: number): Bulk;
    isSmallerThan(bulk: Bulk): boolean;
    isBiggerThan(bulk: Bulk): boolean;
    isEqualTo(bulk: Bulk): boolean;
    isPositive(): boolean;
    toString(): string;
    double(): Bulk;
    halve(): Bulk;
}
/**
 * See https://2e.aonprd.com/Rules.aspx?ID=258 and https://2e.aonprd.com/Rules.aspx?ID=257 are fundamentally
 * at odds with each other and there is no way to implement this RAW
 *
 * RAI:
 * "Because the way that a creature treats Bulk and the Bulk of gear sized for it scale the same way,
 * Tiny or Large (or larger) creatures can usually wear and carry about the same amount of appropriately
 * sized gear as a Medium creature."
 *
 * Looking at table 6-20 the following rules can be deduced:
 * if item size < creature size:
 * for each step until you reach the target size halve bulk
 * 1 bulk halved becomes L bulk
 * L bulk halved becomes negligible bulk
 *
 * if item size > creature size:
 * for each step until you reach the target size double bulk
 * L bulk doubled becomes 1 bulk
 * negligible bulk doubled becomes L bulk unless it's a tiny item, then it stays at negligible bulk
 *
 * ignore everything else
 *
 * @param bulk
 * @param itemSize
 * @param actorSize
 */
export declare function convertBulkToSize(bulk: Bulk, itemSize: Size, actorSize: Size): Bulk;
/** Produces strings like: "-", "L", "2L", "3", "3; L", "4; 3L" to display bulk in the frontend bulk column */
export declare function formatBulk(bulk: Bulk): string;
/**
 * @category Other
 */
export declare class BulkItem {
    id: string;
    bulk: Bulk;
    size: Size;
    quantity: number;
    stackGroup: string | null;
    isEquipped: boolean;
    unequippedBulk?: Bulk;
    equippedBulk?: Bulk;
    holdsItems: BulkItem[];
    negateBulk: Bulk;
    extraDimensionalContainer: boolean;
    constructor({ id, bulk, quantity, stackGroup, isEquipped, unequippedBulk, equippedBulk, holdsItems, negateBulk, extraDimensionalContainer, size, }?: {
        id?: string;
        bulk?: Bulk;
        quantity?: number;
        stackGroup?: string | null;
        isEquipped?: boolean;
        unequippedBulk?: Bulk;
        equippedBulk?: Bulk;
        holdsItems?: BulkItem[];
        negateBulk?: Bulk;
        extraDimensionalContainer?: boolean;
        size?: Size;
    });
    get reducesBulk(): boolean;
}
declare type StackGroupOverflow = Record<string, number>;
declare type BulkAndOverflow = [Bulk, StackGroupOverflow];
export interface BulkConfig {
    ignoreCoinBulk: boolean;
}
export declare const defaultBulkConfig: BulkConfig;
/**
 * Calculates the bulk of all items. Note that we don't validate if an item that is a container
 * contains only the allowed amount.
 * @param items a list of items; items can also be containers and contain items themselves
 * armor or weapons that are placed in a sheathe should be combined in a single container as well
 * @param nestedExtraDimensionalContainer true if you have a bag of holding inside a bag of holding
 * only the first bag of holding reduces bulk, the nested one stops working as per RAW
 * @param bulkConfig
 * @param actorSize
 * @return
 */
export declare function calculateBulk({ items, nestedExtraDimensionalContainer, actorSize, bulkConfig, }?: {
    items?: BulkItem[];
    nestedExtraDimensionalContainer?: boolean;
    actorSize?: Size;
    bulkConfig?: BulkConfig;
}): BulkAndOverflow;
/**
 * Accepted formats:
 * "l", "1", "L", "1; L", "2; 3L", "2;3L"
 * @param weight if not parseable will return null or undefined
 */
export declare function weightToBulk(weight: Optional<string>): Bulk | undefined;
declare type BrokenBulk = Optional<string> | Optional<number>;
/**
 * Needed because some weight is either null, undefined, a number or a string :(
 * @param weight
 */
export declare function normalizeWeight(weight: BrokenBulk): string | undefined;
/**
 * @param item
 * @param nestedItems
 * @return
 */
export declare function toBulkItem(item: PhysicalItemData, nestedItems?: BulkItem[]): BulkItem;
/**
 * Items that reference other others need to be nested into them. If an item has a reference
 * to an id, it should be nested into that container unless the container with that id does
 * not exist.
 *
 * All other items are top level items.
 * @param items
 * @return
 */
export declare function toBulkItems(items: PhysicalItemData[]): BulkItem[];
/**
 * Takes actor data and returns a list of items to calculate bulk with
 * @param actorData
 */
export declare function itemsFromActorData(actorData: {
    items: ItemDataPF2e[];
}): BulkItem[];
/**
 * Carried armor usually has one more bulk when not worn, or 1 bulk if L
 * @param wornBulk
 * @return
 */
export declare function calculateCarriedArmorBulk(wornBulk: BrokenBulk): string;
/**
 * Fix previous borked weight
 * @param brokenWeight
 * @return
 */
export declare function fixWeight(brokenWeight: BrokenBulk): string | null;
/**
 * Walk the bulk items tree and create a Map for quick lookups
 * @param bulkItems first item is always the inventory, so unpack that first
 */
export declare function indexBulkItemsById(bulkItems?: BulkItem[]): Map<string, BulkItem>;
export {};
