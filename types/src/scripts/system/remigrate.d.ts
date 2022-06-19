/** For use in worlds to rerun select migrations */
export declare function remigrate(versionRange: {
    from: number;
    to?: number;
}): Promise<void>;
