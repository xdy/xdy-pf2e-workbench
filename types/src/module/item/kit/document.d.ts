import { ActorPF2e } from "@actor/index";
import { ItemPF2e, PhysicalItemPF2e } from "@item/index";
import { Price } from "@item/physical/data";
import { UserPF2e } from "@module/user";
import { KitData, KitEntryData } from "./data";
declare class KitPF2e extends ItemPF2e {
    get entries(): KitEntryData[];
    get price(): Price;
    /** Expand a tree of kit entry data into a list of physical items */
    inflate({ entries, containerId, }?: {
        entries?: KitEntryData[];
        containerId?: string | null;
    }): Promise<PhysicalItemPF2e[]>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    /** Inflate this kit and add its items to the provided actor */
    dumpContents({ actor, containerId, }: {
        actor: ActorPF2e;
        containerId?: string | null;
    }): Promise<void>;
}
interface KitPF2e {
    readonly data: KitData;
}
export { KitPF2e };
