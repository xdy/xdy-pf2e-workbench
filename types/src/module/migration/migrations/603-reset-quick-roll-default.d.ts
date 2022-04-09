import { MigrationBase } from "../base";
export declare class Migration603ResetQuickRollDefault extends MigrationBase {
    static version: number;
    updateUser(userData: foundry.data.UserSource): Promise<void>;
}
