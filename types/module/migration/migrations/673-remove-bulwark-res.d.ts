import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove bulwark armor rule elements */
export declare class Migration673RemoveBulwarkREs extends MigrationBase {
    static version: number;
    private hasRuleElement;
    updateItem(item: ItemSourcePF2e): Promise<void>;
}
