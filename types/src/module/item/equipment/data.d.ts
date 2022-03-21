import {
    BasePhysicalItemData,
    BasePhysicalItemSource,
    MagicItemSystemData,
    PhysicalItemTraits
} from "@item/physical/data";
import type { EquipmentPF2e } from "./index";

export declare type EquipmentSource = BasePhysicalItemSource<"equipment", EquipmentSystemData>;
export declare class EquipmentData extends BasePhysicalItemData<EquipmentPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface EquipmentData extends Omit<EquipmentSource, "effects" | "flags"> {
    type: EquipmentSource["type"];
    data: EquipmentSource["data"];
    readonly _source: EquipmentSource;
}
export declare type EquipmentTrait = keyof ConfigPF2e["PF2E"]["equipmentTraits"];
export declare type EquipmentTraits = PhysicalItemTraits<EquipmentTrait>;
interface EquipmentSystemData extends MagicItemSystemData {
    traits: EquipmentTraits;
}
export {};
