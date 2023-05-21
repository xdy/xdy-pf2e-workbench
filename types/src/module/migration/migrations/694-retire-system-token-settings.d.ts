import { MigrationBase } from "../base.ts";
/** Retire system token-hover settings in favor of Foundry's "Default Token Configuration" */
export declare class Migration694RetireSystemTokenSettings extends MigrationBase {
    static version: number;
    migrate(): Promise<void>;
}
