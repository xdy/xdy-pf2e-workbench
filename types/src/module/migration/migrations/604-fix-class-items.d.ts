import { MigrationBase } from "../base";
export declare class Migration604FixClassItem extends MigrationBase {
    static version: number;
    updateItem(item: any): Promise<void>;
}
