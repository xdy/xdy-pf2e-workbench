import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove stored `system.identification.identified` properties on physical items */
export declare class Migration786RemoveIdentifiedData extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
