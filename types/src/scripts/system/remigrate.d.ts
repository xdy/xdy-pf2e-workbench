/** For use in worlds to rerun select migrations */
export declare function remigrate(schemaVersions: number | {
    from: number;
    to?: number;
}): Promise<void>;
