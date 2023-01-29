import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** OK, let's not store mystified traits. */
export declare class Migration633DeleteUnidentifiedTraits extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemDataWithIdentification): Promise<void>;
}
type ItemDataWithIdentification = ItemSourcePF2e & {
    "system.-=identification"?: null;
    "system.identification.unidentified.data.-=traits"?: null;
};
export {};
