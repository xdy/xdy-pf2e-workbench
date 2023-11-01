import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove bulwark armor rule elements */
export declare class Migration673RemoveBulwarkREs extends MigrationBase {
    static version: number;
    private hasRuleElement;
    updateItem(item: ItemSourcePF2e): Promise<void>;
}
