/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
/** A summary window that opens after a system migration completes */
export declare class MigrationSummary extends Application<MigrationSummaryOptions> {
    #private;
    constructor(options?: Partial<MigrationSummaryOptions>);
    static get defaultOptions(): ApplicationOptions;
    getData(): Promise<MigrationSummaryData>;
    activateListeners($html: JQuery): void;
}
interface MigrationSummaryOptions extends ApplicationOptions {
    troubleshoot: boolean;
}
interface MigrationSummaryData {
    options: MigrationSummaryOptions;
    systemVersion: string;
    latestSchemaVersion: number;
    actors: {
        successful: number;
        total: number;
    };
    items: {
        successful: number;
        total: number;
    };
    canRemigrate: boolean;
    helpResources: boolean;
    helpResourcesText: string;
}
export {};
