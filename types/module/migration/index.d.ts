import { MigrationBase } from "./base";
export { MigrationRunner } from "./runner";
export declare class MigrationList {
    private static list;
    static get latestVersion(): number;
    static constructAll(): MigrationBase[];
    static constructFromVersion(version: number | null): MigrationBase[];
    static constructRange(min: number, max?: number): MigrationBase[];
}
