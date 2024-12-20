import { ActorPF2e } from "@actor";
import { KitPF2e, PhysicalItemPF2e } from "@item";
import { ItemSourcePF2e, KitSource, PhysicalItemSource } from "@item/base/data/index.ts";
import { Coins } from "@item/physical/data.ts";
import { CoinsPF2e } from "@item/physical/helpers.ts";
import { DelegatedCollection } from "@util";
import { InventoryBulk } from "./bulk.ts";

declare class ActorInventory<TActor extends ActorPF2e> extends DelegatedCollection<PhysicalItemPF2e<TActor>> {
    actor: TActor;
    bulk: InventoryBulk;
    constructor(actor: TActor, entries?: PhysicalItemPF2e<TActor>[]);
    get coins(): CoinsPF2e;
    get totalWealth(): CoinsPF2e;
    get invested(): {
        value: number;
        max: number;
    } | null;
    /** Find an item already owned by the actor that can stack with the given item */
    findStackableItem(item: PhysicalItemPF2e | ItemSourcePF2e): PhysicalItemPF2e<TActor> | null;
    addCoins(coins: Partial<Coins>, { combineStacks }?: {
        combineStacks?: boolean;
    }): Promise<void>;
    removeCoins(coins: Partial<Coins>, { byValue }?: {
        byValue?: boolean;
    }): Promise<boolean>;
    sellAllTreasure(): Promise<void>;
    /** Deletes all temporary items, skipping those that are associated with a special resource */
    deleteTemporaryItems(operation?: Partial<DatabaseDeleteOperation<TActor>> | undefined): Promise<PhysicalItemPF2e<TActor>[]>;
    /** Adds one or more items to this inventory without removing from its original location */
    add(itemOrItems: PhysicalItemPF2e | KitPF2e | PreCreate<PhysicalItemSource | KitSource> | (PhysicalItemPF2e | KitPF2e | PreCreate<PhysicalItemSource | KitSource>)[], options?: AddItemOptions): Promise<void>;
}
interface AddItemOptions {
    stack?: boolean;
}
export { ActorInventory, InventoryBulk };
