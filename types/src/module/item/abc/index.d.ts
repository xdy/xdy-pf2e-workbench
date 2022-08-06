import { ItemPF2e } from "../index";
import type { AncestryData } from "@item/ancestry/data";
import type { BackgroundData } from "@item/background/data";
import type { ClassData } from "@item/class/data";
import { FeatPF2e } from "@item/feat";
/** Abstract base class representing a Pathfinder (A)ncestry, (B)ackground, or (C)lass */
export declare abstract class ABCItemPF2e extends ItemPF2e {
    getLinkedFeatures(): Embedded<FeatPF2e>[];
    protected logAutoChange(this: Embedded<ABCItemPF2e>, path: string, value: string | number): void;
}
export interface ABCItemPF2e {
    readonly data: AncestryData | BackgroundData | ClassData;
}
