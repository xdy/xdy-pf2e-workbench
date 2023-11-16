import { MigrationBase } from "../base.ts";
/** Migrate the old "showRollDialogs" setting into the new pair. */
export declare class Migration880SplitShowDialogsSettings extends MigrationBase {
    static version: number;
    migrate(): Promise<void>;
}
