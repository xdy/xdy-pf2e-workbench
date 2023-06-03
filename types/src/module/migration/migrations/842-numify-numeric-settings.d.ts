import { MigrationBase } from "../base.ts";
/** Work around upstream issue (as of 11.301) in which settings are no longer checked or coerced for type validity  */
export declare class Migration842NumifyNumericSettings extends MigrationBase {
    static version: number;
    migrate(): Promise<void>;
}
