import { MigrationBase } from "../base.ts";
/** Remove the journal theme setting, changing the default sheet according to the stored setting value */
export declare class Migration726JournalSetting extends MigrationBase {
    static version: number;
    migrate(): Promise<void>;
}
