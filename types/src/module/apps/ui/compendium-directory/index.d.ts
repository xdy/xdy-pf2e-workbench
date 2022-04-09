/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { LocalizePF2e } from "@module/system/localize";
import { PackFolderPF2e } from "./folder";
declare type FolderName = keyof typeof LocalizePF2e.translations.PF2E.CompendiumDirectory.Folders;
interface PackMetadataPF2e<T extends CompendiumDocument = CompendiumDocument> extends CompendiumMetadata<T> {
    folder?: FolderName;
}
interface PackSummaryDataPF2e extends PackSummaryData {
    metadata: PackMetadataPF2e;
}
export declare type EnfolderedSummaryData = Omit<PackSummaryDataPF2e, "metadata"> & {
    metadata: Required<PackMetadataPF2e>;
};
interface PackSummaryPF2e extends PackSummary {
    title?: string;
    folders?: PackFolderPF2e[];
    packs: PackSummaryDataPF2e[];
}
declare type PackSummaryByEntityPF2e = Record<CompendiumDocumentType, PackSummaryPF2e>;
interface PackDirectoryDataPF2e extends CompendiumDirectoryData {
    packs: PackSummaryByEntityPF2e;
}
/** Extend CompendiumDirectory to support a search bar */
export declare class CompendiumDirectoryPF2e extends CompendiumDirectory {
    /** Folders! */
    folders: Map<string, PackFolderPF2e>;
    private static readonly contentSelector;
    static get defaultOptions(): CompendiumDirectoryOptions;
    getData(options?: object): PackDirectoryDataPF2e;
    private setupFolders;
    private findOrCreateFolder;
    activateListeners($html: JQuery): void;
    protected _canDragDrop(): boolean;
    protected _onSearchFilter(_event: KeyboardEvent, query: string): void;
    /**
     * Handle toggling the collapsed or expanded state of a folder within the directory tab
     * @param event The originating click event
     */
    private toggleFolder;
    /** Atro's very special monkey-patched RegExp class method */
    private escape;
}
export {};
