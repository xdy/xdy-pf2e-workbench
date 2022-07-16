import { BasePhysicalItemData, BasePhysicalItemSource, PhysicalSystemData, PhysicalSystemSource } from "@item/physical/data";
import { TreasurePF2e } from ".";
declare type TreasureSource = BasePhysicalItemSource<"treasure", TreasureSystemSource>;
declare type TreasureData = Omit<TreasureSource, "data" | "effects" | "flags"> & BasePhysicalItemData<TreasurePF2e, "treasure", TreasureSystemData, TreasureSource>;
declare type TreasureSystemSource = PhysicalSystemSource;
declare type TreasureSystemData = PhysicalSystemData & {
    equipped: {
        invested?: never;
    };
};
export { TreasureData, TreasureSource, TreasureSystemData, TreasureSystemSource };
