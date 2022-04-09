import { BasePhysicalItemData, BasePhysicalItemSource, PhysicalSystemData, PhysicalSystemSource } from "@item/physical/data";
import { TreasurePF2e } from ".";
declare type TreasureSource = BasePhysicalItemSource<"treasure", TreasureSystemSource>;
declare class TreasureData extends BasePhysicalItemData<TreasurePF2e> {
    static DEFAULT_ICON: ImagePath;
}
interface TreasureData extends Omit<TreasureSource, "effects" | "flags"> {
    type: TreasureSource["type"];
    data: TreasureSystemData;
    readonly _source: TreasureSource;
    isInvested: null;
}
interface TreasureSystemSource extends PhysicalSystemSource {
    denomination: {
        value: "pp" | "gp" | "sp" | "cp";
    };
    value: {
        value: number;
    };
}
declare type TreasureSystemData = TreasureSystemSource & PhysicalSystemData;
export { TreasureData, TreasureSource, TreasureSystemData, TreasureSystemSource };
