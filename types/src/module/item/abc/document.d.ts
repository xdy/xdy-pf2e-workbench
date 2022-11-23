import { ItemPF2e, FeatPF2e } from "@item";
import type { AncestryData } from "@item/ancestry/data";
import type { BackgroundData } from "@item/background/data";
import type { ClassData } from "@item/class/data";
import { FeatSource } from "@item/data";
/** Abstract base class representing a Pathfinder (A)ncestry, (B)ackground, or (C)lass */
declare abstract class ABCItemPF2e extends ItemPF2e {
    getLinkedFeatures(): Embedded<FeatPF2e>[];
    protected logAutoChange(this: Embedded<ABCItemPF2e>, path: string, value: string | number): void;
    /** Pulls the features that should be granted by this ABC */
    getFeatures(options?: {
        level?: number;
    }): Promise<FeatSource[]>;
}
interface ABCItemPF2e {
    readonly data: AncestryData | BackgroundData | ClassData;
}
export { ABCItemPF2e };
