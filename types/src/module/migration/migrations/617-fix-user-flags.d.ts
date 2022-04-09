import { MigrationBase } from "../base";
export declare class Migration617FixUserFlags extends MigrationBase {
    static version: number;
    updateUser(userData: foundry.data.UserSource): Promise<void>;
}
