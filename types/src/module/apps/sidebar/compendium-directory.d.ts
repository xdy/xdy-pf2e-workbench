/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import MiniSearch from "minisearch";
/** Extend CompendiumDirectory to support a search bar */
export declare class CompendiumDirectoryPF2e extends CompendiumDirectory {
    #private;
    readonly searchEngine: MiniSearch<CompendiumIndexData>;
    constructor(options?: ApplicationOptions);
    /** Include ability to search and drag document search results */
    static get defaultOptions(): ApplicationOptions;
    getData(options?: Partial<ApplicationOptions>): Promise<CompendiumDirectoryDataPF2e>;
    activateListeners($html: JQuery): void;
    /** Add a context menu for content search results */
    protected _contextMenu($html: JQuery): void;
    /** System compendium search */
    protected _onSearchFilter(_event: KeyboardEvent, query: string): void;
    /** Anyone can drag from search results */
    protected _canDragStart(): boolean;
    /** Replicate the functionality of dragging a compendium document from an open `Compendium` */
    protected _onDragStart(event: ElementDragEvent): void;
}
interface CompendiumDirectoryDataPF2e extends CompendiumDirectoryData {
    searchContents: boolean;
}
export {};
