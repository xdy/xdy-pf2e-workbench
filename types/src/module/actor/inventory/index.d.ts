import { ActorPF2e } from "@actor";
import { KitPF2e, PhysicalItemPF2e } from "@item";
import { Coins } from "@item/physical/data.ts";
import { CoinsPF2e } from "@item/physical/helpers.ts";
import { InventoryBulk } from "./bulk.ts";
declare class ActorInventory<TActor extends ActorPF2e> extends Collection<PhysicalItemPF2e<TActor>> {
    readonly actor: TActor;
    constructor(actor: TActor, entries?: PhysicalItemPF2e<TActor>[]);
    get coins(): CoinsPF2e;
    get totalWealth(): CoinsPF2e;
    get invested(): {
        value: number;
        max: number;
    } | null;
    get bulk(): InventoryBulk;
    addCoins(coins: Partial<Coins>, { combineStacks }?: {
        combineStacks?: boolean;
    }): Promise<void>;
    removeCoins(coins: Partial<Coins>, { byValue }?: {
        byValue?: boolean;
    }): Promise<boolean>;
    sellAllTreasure(): Promise<void>;
    /** Adds an item to this inventory without removing from its original location */
    add(item: PhysicalItemPF2e | KitPF2e, options?: AddItemOptions): Promise<void>;
}
interface AddItemOptions {
    stack?: boolean;
}
export { ActorInventory, InventoryBulk };
