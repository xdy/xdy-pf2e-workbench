import { EquipmentTrait } from "@item/equipment/data";
import { BasePhysicalItemData, BasePhysicalItemSource, Investable, PhysicalItemTraits, PhysicalSystemData, PhysicalSystemSource } from "@item/physical/data";
import { ContainerPF2e } from ".";
declare type ContainerSource = BasePhysicalItemSource<"backpack", ContainerSystemSource>;
declare class ContainerData extends BasePhysicalItemData<ContainerPF2e> {
    static DEFAULT_ICON: ImagePath;
}
interface ContainerData extends Omit<ContainerSource, "effects" | "flags"> {
    type: ContainerSource["type"];
    data: ContainerSystemData;
    readonly _source: ContainerSource;
}
declare type ContainerTraits = PhysicalItemTraits<EquipmentTrait>;
interface ContainerSystemSource extends Investable<PhysicalSystemSource> {
    traits: ContainerTraits;
    stowing: boolean;
    bulkCapacity: {
        value: string | null;
    };
    collapsed: boolean;
}
declare type ContainerSystemData = ContainerSystemSource & PhysicalSystemData;
export { ContainerData, ContainerSource };
