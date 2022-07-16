import { ActorPF2e } from "@actor";
import { PhysicalItemPF2e } from "@item";
import { Coins } from "@item/physical/data";
import { CoinsPF2e } from "@item/physical/helpers";
import { InventoryBulk } from "./bulk";
declare class ActorInventory extends Collection<Embedded<PhysicalItemPF2e>> {
    readonly actor: ActorPF2e;
    constructor(actor: ActorPF2e, entries?: Embedded<PhysicalItemPF2e>[]);
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
