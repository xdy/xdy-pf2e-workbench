/// <reference types="jquery" />
/// <reference types="tooltipster" />
/** Extend CompendiumDirectory to support a search bar */
export declare class CompendiumDirectoryPF2e extends CompendiumDirectory {
    private static readonly contentSelector;
    static get defaultOptions(): ApplicationOptions;
    activateListeners($html: JQuery): void;
    protected _onSearchFilter(_event: KeyboardEvent, query: string): void;
}
