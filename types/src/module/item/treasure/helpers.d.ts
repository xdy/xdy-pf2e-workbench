import type { ActorPF2e } from "@actor";
import type { ItemDataPF2e, PhysicalItemData } from "@item/data";
export declare const DENOMINATIONS: readonly ["cp", "sp", "gp", "pp"];
export interface Coins {
    pp: number;
    gp: number;
    sp: number;
    cp: number;
}
export declare function coinValueInCopper(coins: Coins): number;
/** Convert a `Coins` object into a price string */
export declare function coinsToString({ cp, sp, gp, pp }: Partial<Coins>): string;
export declare function toCoins(denomination: string, value: number): Coins;
export declare function combineCoins(first: Coins, second: Coins): Coins;
/** Converts the price of an item to the Coin structure */
export declare function extractPriceFromItem(itemData: {
    data: {
        price: {
            value: string;
        };
        quantity: number;
    };
}, quantity?: number): Coins;
export declare function multiplyCoinValue(coins: Coins, factor: number): Coins;
/**
 * Sums up all wealth of a character, not just the treasure, but all other equipment
 * @param items
 */
export declare function calculateTotalWealth(items: PhysicalItemData[]): Coins;
/** \brief Sums up the value of all coins in an actor's inventory
 *
 * @param items
 */
export declare function calculateValueOfCurrency(items: ItemDataPF2e[]): Coins;
/**
 * Sums up all treasures in an actor's inventory
 * @param items
 */
export declare function calculateWealth(items: ItemDataPF2e[]): Coins;
export declare const coinCompendiumIds: {
    pp: string;
    gp: string;
    sp: string;
    cp: string;
};
export declare function addCoins(actor: ActorPF2e, { coins, combineStacks, }?: {
    coins?: Coins;
    combineStacks?: boolean;
}): Promise<void>;
export declare function removeCoins(actor: ActorPF2e, { coins, }?: {
    coins?: Coins;
    combineStacks?: boolean;
}): Promise<void>;
export declare function sellAllTreasure(actor: ActorPF2e): Promise<void>;
/**
 * Converts a non-coin treasure in an actor's inventory to coinage
 * @param actor
 * @param itemId
 * @return Resolves after the treasure is removed and coins updated
 */
export declare function sellTreasure(actor: ActorPF2e, itemId: string): Promise<void>;
/**
 * Attempts to remove coins from an actor by total value regardless of cointype
 * @param actor
 * @param coinsToRemove
 * @return Resolves after the treasure is either removed (true) or determined to be insufficient and no change made (false)
 */
export declare function attemptToRemoveCoinsByValue({ actor, coinsToRemove, }: {
    actor: ActorPF2e;
    coinsToRemove: Coins;
}): Promise<boolean>;
