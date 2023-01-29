import { ItemPF2e, FeatPF2e } from "@item";
import type { AncestryData } from "@item/ancestry/data";
import type { BackgroundData } from "@item/background/data";
import type { ClassData } from "@item/class/data";
/** Abstract base class representing a Pathfinder (A)ncestry, (B)ackground, or (C)lass */
declare abstract class ABCItemPF2e extends ItemPF2e {
    /** Returns all items that should also be deleted should this item be deleted */
    getLinkedItems(): Embedded<FeatPF2e>[];
    /** Returns items that should also be added when this item is created */
    createGrantedItems(options?: {
        level?: number;
    }): Promise<FeatPF2e[]>;
    protected logAutoChange(this: Embedded<ABCItemPF2e>, path: string, value: string | number): void;
}
interface ABCItemPF2e {
    readonly data: AncestryData | BackgroundData | ClassData;
}
export { ABCItemPF2e };
