import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
import { MigrationBase } from "@module/migration/base.ts";
import { ScenePF2e } from "@scene/document.ts";
import { TokenDocumentPF2e } from "@scene/token-document/document.ts";
interface CollectionDiff<T extends foundry.documents.ActiveEffectSource | ItemSourcePF2e> {
    inserted: T[];
    deleted: string[];
    updated: T[];
}
export declare class MigrationRunnerBase {
    #private;
    migrations: MigrationBase[];
    static LATEST_SCHEMA_VERSION: number;
    static MINIMUM_SAFE_VERSION: number;
    static RECOMMENDED_SAFE_VERSION: number;
    constructor(migrations?: MigrationBase[]);
    needsMigration(currentVersion: number): boolean;
    diffCollection(orig: ItemSourcePF2e[], updated: ItemSourcePF2e[]): CollectionDiff<ItemSourcePF2e>;
    getUpdatedActor(actor: ActorSourcePF2e, migrations: MigrationBase[]): Promise<ActorSourcePF2e>;
    getUpdatedItem(item: ItemSourcePF2e, migrations: MigrationBase[]): Promise<ItemSourcePF2e>;
    getUpdatedTable(tableSource: foundry.documents.RollTableSource, migrations: MigrationBase[]): Promise<foundry.documents.RollTableSource>;
    getUpdatedMacro(macroSource: foundry.documents.MacroSource, migrations: MigrationBase[]): Promise<foundry.documents.MacroSource>;
    getUpdatedJournalEntry(source: foundry.documents.JournalEntrySource, migrations: MigrationBase[]): Promise<foundry.documents.JournalEntrySource>;
    getUpdatedToken(token: TokenDocumentPF2e<ScenePF2e>, migrations: MigrationBase[]): Promise<foundry.documents.TokenSource>;
    getUpdatedUser(userData: foundry.documents.UserSource, migrations: MigrationBase[]): Promise<foundry.documents.UserSource>;
}
export {};
