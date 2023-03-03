import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Update from khakkara to khakkhara; wind and fire wheel to feng huo lun */
export declare class Migration825KhakkharaFengHuoLun extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
