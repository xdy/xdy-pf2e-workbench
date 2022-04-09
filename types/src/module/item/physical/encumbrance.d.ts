import { Size } from "@module/data";
import { Bulk } from "./bulk";
/**
 * @category Other
 */
export declare class InventoryWeight {
    combinedBulk: Bulk;
    encumberedAt: number;
    limit: number;
    constructor(combinedBulk: Bulk, encumberedAt: number, limit: number);
    get encumberedPercentage(): number;
    get limitPercentage(): number;
    get limitPercentageMax100(): number;
    get isEncumbered(): boolean;
    get isOverLimit(): boolean;
    get bulk(): number;
}
/**
 * @param strengthModifier
 * @param bonusBulkLimit increased maximum bulk
 * @param bonusBulkEncumbrance increased bulk until you are encumbered
 * @param combinedBulk
 * @param actorSize
 */
export declare function calculateEncumbrance(strengthModifier: number, bonusBulkEncumbrance: number, bonusBulkLimit: number, combinedBulk: Bulk, _actorSize?: Size): InventoryWeight;
