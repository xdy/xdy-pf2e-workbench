import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Add roll options to abilities allowing one to ignore the flat-footed condition from being flanked */
export declare class Migration908TrueGangUp extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
