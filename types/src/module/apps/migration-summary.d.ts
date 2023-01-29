/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
/** A summary window that opens after a system migration completes */
export declare class MigrationSummary extends Application<MigrationSummaryOptions> {
    /** Is a remigration currently running? */
    private isRemigrating;
    constructor(options?: Partial<MigrationSummaryOptions>);
    get template(): string;
    static get defaultOptions(): {
        id: string;
        width: number;
        height: string;
        baseApplication: string | null;
        top: number | null;
        left: number | null;
        scale?: number | null | undefined;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean | null;
        classes: string[];
        tabs: TabsOptions[];
        dragDrop: {
            callbacks?: {
                dragover?: Function | undefined;
                dragstart?: Function | undefined;
                drop?: Function | undefined;
            } | undefined;
            dragSelector?: string | undefined;
            dropSelector?: string | undefined;
        }[];
        title: string;
        template: string | null;
        scrollY: string[];
        filters: SearchFilterConfiguration[];
    };
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
