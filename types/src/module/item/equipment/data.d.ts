import { BasePhysicalItemData, BasePhysicalItemSource, Investable, PhysicalItemTraits, PhysicalSystemData, PhysicalSystemSource } from "@item/physical/data";
import type { EquipmentPF2e } from ".";
declare type EquipmentSource = BasePhysicalItemSource<"equipment", EquipmentSystemSource>;
declare type EquipmentData = Omit<EquipmentSource, "data" | "effects" | "flags"> & BasePhysicalItemData<EquipmentPF2e, "equipment", EquipmentSystemData, EquipmentSource>;
declare type EquipmentTrait = keyof ConfigPF2e["PF2E"]["equipmentTraits"];
declare type EquipmentTraits = PhysicalItemTraits<EquipmentTrait>;
interface EquipmentSystemSource extends Investable<PhysicalSystemSource> {
    traits: EquipmentTraits;
}
declare type EquipmentSystemData = Omit<EquipmentSystemSource, "price"> & PhysicalSystemData;
export { EquipmentData, EquipmentSource, EquipmentTrait, EquipmentTraits, EquipmentSystemData, EquipmentSystemSource };
