import { ActorPF2e } from "@actor";
import { PhysicalItemPF2e } from "@item";
import { Bulk } from "@item/physical/bulk.ts";
import { Size } from "@module/data.ts";
export declare class InventoryBulk {
    #private;
    actor: ActorPF2e;
    encumberedAfterAddend: number;
    maxAddend: number;
    constructor(actor: ActorPF2e);
    get encumberedAfter(): number;
    get encumberedAfterBreakdown(): string;
    get max(): number;
    get maxBreakdown(): string;
    get value(): Bulk;
    get encumberedPercentage(): number;
    get maxPercentage(): number;
    get maxPercentageInteger(): number;
    get isEncumbered(): boolean;
    get isOverMax(): boolean;
    get bulk(): number;
    static computeTotalBulk(items: PhysicalItemPF2e[], actorSize: Size): Bulk;
}
