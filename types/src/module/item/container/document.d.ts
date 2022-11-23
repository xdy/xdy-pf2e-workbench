import { ItemSummaryData } from "@item/data";
import { EquipmentTrait } from "@item/equipment/data";
import { PhysicalItemPF2e } from "@item/physical";
import { Bulk } from "@item/physical/bulk";
import { ContainerData } from "./data";
declare class ContainerPF2e extends PhysicalItemPF2e {
    /** This container's contents, reloaded every data preparation cycle */
    contents: Collection<Embedded<PhysicalItemPF2e>>;
    /** Is this an actual stowing container or merely one of the old pouches/quivers/etc.? */
    get stowsItems(): boolean;
    get isCollapsed(): boolean;
    get capacity(): {
        value: Bulk;
        max: Bulk;
    };
    get capacityPercentage(): number;
    get bulk(): Bulk;
    /** Reload this container's contents following Actor embedded-document preparation */
    prepareSiblingData(this: Embedded<ContainerPF2e>): void;
    /** Move the contents of this container into the next-higher container or otherwise the main actor inventory */
    ejectContents(): Promise<void>;
    getChatData(this: Embedded<ContainerPF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData>;
}
interface ContainerPF2e {
    readonly data: ContainerData;
    get traits(): Set<EquipmentTrait>;
}
export { ContainerPF2e };
