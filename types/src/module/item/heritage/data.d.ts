import { CreatureTraits } from "@item/ancestry/data";
import { ItemSystemData } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import type { HeritagePF2e } from "./document";
export declare type HeritageSource = BaseNonPhysicalItemSource<"heritage", HeritageSystemSource>;
export declare class HeritageData extends BaseNonPhysicalItemData<HeritagePF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface HeritageData extends Omit<HeritageSource, "effects" | "flags"> {
    type: "heritage";
    data: HeritageSystemData;
    readonly _source: HeritageSource;
}
export interface HeritageSystemSource extends ItemSystemData {
    ancestry: {
        name: string;
        uuid: ItemUUID;
    } | null;
    traits: CreatureTraits;
}
export declare type HeritageSystemData = HeritageSystemSource;
