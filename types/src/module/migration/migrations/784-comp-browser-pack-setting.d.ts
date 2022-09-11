import { MigrationBase } from "../base";
/** Migrate Compendium Browser packs selection setting to an object */
export declare class Migration784CompBrowserPackSetting extends MigrationBase {
    static version: number;
    migrate(): Promise<void>;
}
