import { ActorPF2e } from "@actor";
import { FeatPF2e, ItemPF2e } from "@item";
import type { AncestrySource, AncestrySystemData } from "@item/ancestry/data.ts";
import type { BackgroundSource, BackgroundSystemData } from "@item/background/data.ts";
import type { ClassSource, ClassSystemData } from "@item/class/data.ts";
import { Rarity } from "@module/data.ts";
/** Abstract base class representing a Pathfinder (A)ncestry, (B)ackground, or (C)lass */
declare abstract class ABCItemPF2e<TParent extends ActorPF2e | null> extends ItemPF2e<TParent> {
    get rarity(): Rarity;
    /** Returns all items that should also be deleted should this item be deleted */
    getLinkedItems(): FeatPF2e<ActorPF2e>[];
    /** Returns items that should also be added when this item is created */
    createGrantedItems(options?: {
        level?: number;
    }): Promise<FeatPF2e<null>[]>;
    protected logAutoChange(path: string, value: string | number): void;
}
interface ABCItemPF2e<TParent extends ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: AncestrySource | BackgroundSource | ClassSource;
    system: AncestrySystemData | BackgroundSystemData | ClassSystemData;
}
export { ABCItemPF2e };
