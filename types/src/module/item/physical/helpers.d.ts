import { Coins, PartialPrice } from "@item/physical/data";
/** Coins class that exposes methods to perform operations on coins without side effects */
declare class CoinsPF2e implements Coins {
    cp: number;
    sp: number;
    gp: number;
    pp: number;
    constructor(data?: Coins | null);
    /** The total value of this coins in copper */
    get copperValue(): number;
    add(coins: Coins): CoinsPF2e;
    scale(factor: number): CoinsPF2e;
    /** Returns a coins data object with all zero value denominations omitted */
    strip(): Coins;
    /** Parses a price string such as "5 gp" and returns a new CoinsPF2e object */
    static fromString(coinString: string, quantity?: number): CoinsPF2e;
    static fromPrice(price: PartialPrice, factor: number): CoinsPF2e;
    /** Creates a new price string such as "5 gp" from this object */
    toString(): string;
}
declare const coinCompendiumIds: {
    pp: string;
    gp: string;
    sp: string;
    cp: string;
};
export { CoinsPF2e, coinCompendiumIds };
