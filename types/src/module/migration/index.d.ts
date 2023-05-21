import { MigrationBase } from "./base.ts";
export { MigrationRunner } from "./runner/index.ts";
export declare class MigrationList {
    private static list;
    static get latestVersion(): number;
    static constructAll(): MigrationBase[];
    static constructFromVersion(version: number | null): MigrationBase[];
    static constructRange(min: number, max?: number): MigrationBase[];
}
