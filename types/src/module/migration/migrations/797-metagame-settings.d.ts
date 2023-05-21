import { MigrationBase } from "../base.ts";
/** Migrate all metagame settings from . to _ prefixes, and the visibility ones to booleans */
export declare class Migration797MetagameSetting extends MigrationBase {
    static version: number;
    visibilitySettings: string[];
    settings: string[];
    migrate(): Promise<void>;
}
