import { ActorPF2e } from "@actor";
import { PhysicalItemPF2e } from "@item";
import { Coins } from "@item/physical/data";
import { CoinsPF2e } from "@item/physical/helpers";
import { InventoryBulk } from "./bulk";
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
}
export { ActorInventory, InventoryBulk };
