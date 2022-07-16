import { ItemPF2e } from "../index";
import type { AncestryData } from "@item/ancestry/data";
import type { BackgroundData } from "@item/background/data";
import type { ClassData } from "@item/class/data";
import { FeatPF2e } from "@item/feat";
import { UserPF2e } from "@module/user";
/** Abstract base class representing a Pathfinder (A)ncestry, (B)ackground, or (C)lass */
export declare abstract class ABCItemPF2e extends ItemPF2e {
    getLinkedFeatures(): Embedded<FeatPF2e>[];
    protected logAutoChange(this: Embedded<ABCItemPF2e>, path: string, value: string | number): void;
    /** Increase HP by amount increased by new ABC item */
    protected _preCreate(data: PreDocumentId<this["data"]["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
export interface ABCItemPF2e {
    readonly data: AncestryData | BackgroundData | ClassData;
}
