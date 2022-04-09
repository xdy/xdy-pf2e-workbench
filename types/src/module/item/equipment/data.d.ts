import { BasePhysicalItemData, BasePhysicalItemSource, Investable, PhysicalItemTraits, PhysicalSystemData, PhysicalSystemSource } from "@item/physical/data";
import type { EquipmentPF2e } from ".";
export declare type EquipmentSource = BasePhysicalItemSource<"equipment", EquipmentSystemSource>;
export declare class EquipmentData extends BasePhysicalItemData<EquipmentPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface EquipmentData extends Omit<EquipmentSource, "effects" | "flags"> {
    type: EquipmentSource["type"];
    data: EquipmentSystemData;
    readonly _source: EquipmentSource;
}
export declare type EquipmentTrait = keyof ConfigPF2e["PF2E"]["equipmentTraits"];
export declare type EquipmentTraits = PhysicalItemTraits<EquipmentTrait>;
export interface EquipmentSystemSource extends Investable<PhysicalSystemSource> {
    traits: EquipmentTraits;
}
export declare type EquipmentSystemData = EquipmentSystemSource & PhysicalSystemData;
