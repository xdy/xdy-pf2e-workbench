import { UserSourcePF2e } from "@module/user/data.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration617FixUserFlags extends MigrationBase {
    static version: number;
    updateUser(source: UserSourcePF2e): Promise<void>;
}
