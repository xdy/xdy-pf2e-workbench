import { ItemSourcePF2e } from "@item/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove duplicate magic schools localization map */
export declare class Migration621RemoveConfigSpellSchools extends MigrationBase {
    static version: number;
    private KEY_MAP;
    private reassignSchool;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
