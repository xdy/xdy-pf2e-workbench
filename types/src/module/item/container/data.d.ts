import { EquipmentTrait } from "@item/equipment/data";
import { BasePhysicalItemData, BasePhysicalItemSource, Investable, PhysicalItemTraits, PhysicalSystemData, PhysicalSystemSource } from "@item/physical/data";
import { ContainerPF2e } from ".";
declare type ContainerSource = BasePhysicalItemSource<"backpack", ContainerSystemSource>;
declare type ContainerData = Omit<ContainerSource, "system" | "effects" | "flags"> & BasePhysicalItemData<ContainerPF2e, "backpack", ContainerSystemData, ContainerSource>;
declare type ContainerTraits = PhysicalItemTraits<EquipmentTrait>;
interface ContainerSystemSource extends Investable<PhysicalSystemSource> {
    traits: ContainerTraits;
    stowing: boolean;
    bulkCapacity: {
        value: string | null;
    };
    collapsed: boolean;
}
declare type ContainerSystemData = Omit<ContainerSystemSource, "price"> & PhysicalSystemData;
export { ContainerData, ContainerSource };
