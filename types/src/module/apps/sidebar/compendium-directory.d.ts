/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import MiniSearch from "minisearch";

/** Extend CompendiumDirectory to support a search bar */
declare class CompendiumDirectoryPF2e extends CompendiumDirectory {
    #private;
    static readonly STOP_WORDS: Set<string>;
    get searchEngine(): MiniSearch<CompendiumIndexData>;
    /** Include ability to search and drag document search results */
    static get defaultOptions(): ApplicationOptions;
    getData(options?: Partial<ApplicationOptions>): Promise<CompendiumDirectoryDataPF2e>;
    activateListeners($html: JQuery): void;
    protected _getEntryContextOptions(): EntryContextOption[];
    /** Add a context menu for content search results */
    protected _contextMenu($html: JQuery): void;
    /** System compendium search */
    protected _onSearchFilter(event: KeyboardEvent, query: string, rgx: RegExp, listElem: HTMLElement): void;
    /** Anyone can drag from search results */
    protected _canDragStart(): boolean;
    /** Replicate the functionality of dragging a compendium document from an open `Compendium` */
    protected _onDragStart(event: DragEvent): void;
    /** Called by a "ready" hook */
    compileSearchIndex(): void;
}
interface CompendiumDirectoryPF2e extends CompendiumDirectory {
    constructor: typeof CompendiumDirectoryPF2e;
}
interface CompendiumDirectoryDataPF2e extends CompendiumDirectoryData {
    searchContents: boolean;
    isV13: boolean;
}
export { CompendiumDirectoryPF2e };
