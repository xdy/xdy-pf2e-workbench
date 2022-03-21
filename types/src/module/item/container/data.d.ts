import { EquipmentTrait } from "@item/equipment/data";
import {
    BasePhysicalItemData,
    BasePhysicalItemSource,
    MagicItemSystemData,
    PhysicalItemTraits
} from "@item/physical/data";
import { ContainerPF2e } from "./index";

export declare type ContainerSource = BasePhysicalItemSource<"backpack", ContainerSystemData>;
export declare class ContainerData extends BasePhysicalItemData<ContainerPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface ContainerData extends Omit<ContainerSource, "effects" | "flags"> {
    type: ContainerSource["type"];
    data: ContainerSource["data"];
    readonly _source: ContainerSource;
}
declare type ContainerTraits = PhysicalItemTraits<EquipmentTrait>;
export interface ContainerSystemData extends MagicItemSystemData {
    traits: ContainerTraits;
    stowing: boolean;
    bulkCapacity: {
        value: string | null;
    };
    collapsed: boolean;
}
export {};
