import type { ActorPF2e } from "@actor";
import { RawItemChatData } from "@item/base/data/index.ts";
import { EquipmentTrait } from "@item/equipment/data.ts";
import { Bulk } from "@item/physical/bulk.ts";
import { PhysicalItemPF2e } from "@item/physical/document.ts";
import type { UserPF2e } from "@module/user/index.ts";
import type { ContainerSource, ContainerSystemData } from "./data.ts";
declare class ContainerPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    static get validTraits(): Record<EquipmentTrait, string>;
    /** This container's contents, reloaded every data preparation cycle */
    contents: Collection<PhysicalItemPF2e<NonNullable<TParent>>>;
    /** Is this an actual stowing container or merely one of the old pouches/quivers/etc.? */
    get stowsItems(): boolean;
    get isCollapsed(): boolean;
    get capacity(): {
        value: Bulk;
        max: Bulk;
    };
    /** The percentage filled of container's bulk capacity: if over 100%, return a value without excess Light units. */
    get percentFull(): number;
    get bulkIgnored(): Bulk;
    get bulk(): Bulk;
    prepareBaseData(): void;
    /** Reload this container's contents following Actor embedded-document preparation */
    prepareSiblingData(this: ContainerPF2e<ActorPF2e>): void;
    /** Move the contents of this container into the next-higher container or otherwise the main actor inventory */
    ejectContents(): Promise<void>;
    getChatData(this: ContainerPF2e<TParent>, htmlOptions?: EnrichmentOptions): Promise<RawItemChatData>;
    /** Coerce changes to container bulk data into validity */
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface ContainerPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ContainerSource;
    system: ContainerSystemData;
    get traits(): Set<EquipmentTrait>;
}
export { ContainerPF2e };
