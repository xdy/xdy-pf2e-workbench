import { PhysicalItemPF2e } from "@item";
import { Coins, Price } from "@item/physical/data";
import { Rarity } from "@module/data";
export declare class CraftingFormula implements CraftingFormulaData {
    item: PhysicalItemPF2e;
    /** The difficulty class to craft this item */
    dc: number;
    /** Some items can be created in multiples with a single crafting check */
    batchSize: number;
    /** Whether or not this formula is saved directly on the actor and can be deleted */
    deletable: boolean;
    constructor(item: PhysicalItemPF2e, { dc, batchSize, deletable }?: {
        dc?: number;
        batchSize?: number;
        deletable?: boolean;
    });
    get uuid(): ItemUUID;
    get img(): ImageFilePath;
    get name(): string;
    get level(): number;
    get rarity(): Rarity;
    get price(): Price;
    get cost(): Coins;
    get minimumBatchSize(): number;
    get defaultBatchSize(): number;
    get description(): string;
}
export interface CraftingFormulaData {
    uuid: ItemUUID;
    dc?: number;
    batchSize?: number;
    deletable?: boolean;
}
