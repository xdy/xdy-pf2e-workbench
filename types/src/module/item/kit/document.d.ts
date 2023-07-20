import { ActorPF2e } from "@actor";
import { ItemPF2e, PhysicalItemPF2e } from "@item";
import { Price } from "@item/physical/data.ts";
import { UserPF2e } from "@module/user/index.ts";
import { KitEntryData, KitSource, KitSystemData } from "./data.ts";
import { Size } from "@module/data.ts";
declare class KitPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    get entries(): KitEntryData[];
    get price(): Price;
    /** Expand a tree of kit entry data into a list of physical items */
    createGrantedItems(options?: {
        entries?: KitEntryData[];
        containerId?: string;
        size?: Size;
    }): Promise<PhysicalItemPF2e<null>[]>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface KitPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: KitSource;
    system: KitSystemData;
}
export { KitPF2e };
