import { PhysicalItemPF2e } from "@item";
import { Coins, Price } from "@item/physical/data.ts";
import { Rarity } from "@module/data.ts";
declare class CraftingFormula implements CraftingFormulaData {
    #private;
    /** The item to craft */
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
    get options(): Set<string>;
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
interface CraftingFormulaData {
    uuid: ItemUUID;
    sort?: number;
    dc?: number;
    batchSize?: number;
    deletable?: boolean;
}
export { CraftingFormula, type CraftingFormulaData };
