import { EnfolderedSummaryData } from "./index";
interface DataParameters {
    id: string;
    name: string;
    type: CompendiumDocumentType;
    parent?: PackFolderPF2e | null;
    expanded?: boolean;
}
export declare class PackFolderPF2e extends Array<EnfolderedSummaryData> {
    id: string;
    /** The localized name of this folder */
    name: string;
    /** The compendium entity type */
    type: CompendiumDocumentType;
    /** Whether the sidebar view of the folder is expanded or collapsed */
    expanded: boolean;
    /** The parent of this folder, if any */
    parent: PackFolderPF2e | null;
    /** Subfolders of this folder */
    subfolders: PackFolderPF2e[];
    constructor(items: EnfolderedSummaryData[] | undefined, { id, name, type, parent, expanded }: DataParameters);
    /** Is the folder visible to non-GMs? */
    get private(): boolean;
    /** Is the folder visible to the current user? */
    get visible(): boolean;
    push(summaryData: EnfolderedSummaryData): number;
}
export {};
