import { ActorPF2e } from "@actor";
import { PhysicalItemPF2e } from "@item";
import { Bulk } from "@item/physical/bulk";
import { Size } from "@module/data";
export declare class InventoryBulk {
    /** The current bulk carried by the actor */
    value: Bulk;
    /** The number of Bulk units the actor is encumbered at */
    encumberedAt: number;
    /** The maximum bulk the actor can carry */
    max: number;
    constructor(actor: ActorPF2e);
    get encumberedPercentage(): number;
    get maxPercentage(): number;
    get maxPercentageInteger(): number;
    get isEncumbered(): boolean;
    get isOverMax(): boolean;
    get bulk(): number;
    static computeTotalBulk(items: PhysicalItemPF2e[], actorSize: Size): Bulk;
    /** Non-stowing containers are not "real" and thus shouldn't split stack groups */
    private static flattenNonStowing;
}
