import { ClassicLevel, type DatabaseOptions } from "classic-level";
import { PackEntry } from "./types.ts";
import { JournalEntryPageSource, TableResultSource } from "types/foundry/common/documents/module.js";
import { ItemSourcePF2e } from "@item/data/index.ts";
declare class LevelDatabase extends ClassicLevel<string, DBEntry> {
    #private;
    constructor(location: string, options: LevelDatabaseOptions<DBEntry>);
    createPack(docSources: DBEntry[], folders: DBFolder[]): Promise<void>;
    getEntries(): Promise<{
        packSources: PackEntry[];
        folders: DBFolder[];
    }>;
}
type EmbeddedEntry = ItemSourcePF2e | JournalEntryPageSource | TableResultSource;
type DBEntry = Omit<PackEntry, "pages" | "items" | "results"> & {
    folder?: string | null;
    items?: (EmbeddedEntry | string)[];
    pages?: (EmbeddedEntry | string)[];
    results?: (EmbeddedEntry | string)[];
};
interface DBFolder {
    name: string;
    sorting: string;
    folder: string | null;
    type: CompendiumDocumentType;
    _id: string;
    sort: number;
    color: string | null;
    flags: object;
    _stats: {
        systemId: string | null;
        systemVersion: string | null;
        coreVersion: string | null;
        createdTime: number | null;
        modifiedTime: number | null;
        lastModifiedBy: string | null;
    };
}
interface LevelDatabaseOptions<T> {
    packName: string;
    dbOptions?: DatabaseOptions<string, T>;
}
export { DBFolder, LevelDatabase };
