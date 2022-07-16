import { MigrationBase } from "../base";
import { ItemSourcePF2e } from "@item/data";
import { IdentificationData, IdentificationStatus, IdentifiedData } from "@item/physical/data";
declare type MaybeOldData = ItemSourcePF2e & {
    data: ItemSourcePF2e["data"] & {
        identified?: unknown;
        identification: Partial<IdentificationData> & {
            status?: IdentificationStatus;
            identified?: IdentifiedData;
            unidentified?: IdentifiedData;
        };
    };
    "data.-=identified"?: unknown;
    "data.identification.unidentified.-=description"?: unknown;
};
export declare class Migration628UpdateIdentificationData extends MigrationBase {
    static version: number;
    private get defaultData();
    updateItem(itemData: MaybeOldData): Promise<void>;
}
export {};
