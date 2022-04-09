import { ActorPF2e } from "@actor/index";
import { ItemPF2e, PhysicalItemPF2e } from "@item/index";
import { KitData, KitEntryData } from "./data";
export declare class KitPF2e extends ItemPF2e {
    static get schema(): typeof KitData;
    get entries(): KitEntryData[];
    /** Expand a tree of kit entry data into a list of physical items */
    inflate({ entries, containerId, }?: {
        entries?: KitEntryData[];
        containerId?: string | null;
    }): Promise<PhysicalItemPF2e[]>;
    /** Inflate this kit and add its items to the provided actor */
    dumpContents({ actor, containerId, }: {
        actor: ActorPF2e;
        containerId?: string | null;
    }): Promise<void>;
}
export interface KitPF2e {
    readonly data: KitData;
}
