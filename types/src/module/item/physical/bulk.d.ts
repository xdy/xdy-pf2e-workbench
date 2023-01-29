import { Size } from "@module/data";
import { Optional } from "@util";
interface StackDefinition {
    size: number;
    lightBulk: number;
}
type StackDefinitions = Record<string, StackDefinition | undefined>;
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
    /** Produces strings like: "-", "L", "2L", "3", "3; L", "4; 3L" to display bulk in the frontend bulk column */
    toString(): string;
    double(): Bulk;
    halve(): Bulk;
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
    convertToSize(itemSize: Size, actorSize: Size): Bulk;
}
export declare class BulkItem {
    id: string;
    bulk: Bulk;
    size: Size;
    quantity: number;
    stackGroup: string | null;
    isEquipped: boolean;
    unequippedBulk?: Bulk | null;
    equippedBulk?: Bulk | null;
    holdsItems: BulkItem[];
    negateBulk: Bulk;
    extraDimensionalContainer: boolean;
    constructor({ id, bulk, quantity, stackGroup, isEquipped, unequippedBulk, equippedBulk, holdsItems, negateBulk, extraDimensionalContainer, size, }?: {
        id?: string;
        bulk?: Bulk;
        quantity?: number;
        stackGroup?: string | null;
        isEquipped?: boolean;
        unequippedBulk?: Bulk | null;
        equippedBulk?: Bulk | null;
        holdsItems?: BulkItem[];
        negateBulk?: Bulk;
        extraDimensionalContainer?: boolean;
        size?: Size;
    });
    get reducesBulk(): boolean;
}
/**
 * Accepted formats:
 * "l", "1", "L", "1; L", "2; 3L", "2;3L"
 * @param weight if not parseable will return null or undefined
 */
export declare function weightToBulk(weight: Optional<string | number>): Bulk | null;
type BrokenBulk = Optional<string> | Optional<number>;
/**
 * Needed because some weight is either null, undefined, a number or a string :(
 * @param weight
 */
export declare function normalizeWeight(weight: BrokenBulk): string | undefined;
export {};
