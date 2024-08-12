import { MigrationBase } from "../base.ts";
/** Migrate from boolean "enabledRulesUI" to "minimumRulesUI" choices. */
export declare class Migration931ExpandREPermissions extends MigrationBase {
    static version: number;
    migrate(): Promise<void>;
}
