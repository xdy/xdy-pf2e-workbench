import type { ActorSourcePF2e } from "@actor/data/index.ts";
import type { ItemSourcePF2e } from "@item/base/data/index.ts";
import type { MigrationBase } from "@module/migration/base.ts";
import type { ScenePF2e, TokenDocumentPF2e } from "@scene";

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
    /** The minimum schema version for the foundry version number */
    static FOUNDRY_SCHEMA_VERSIONS: {
        0.8: number;
        9: number;
        10: number;
        11: number;
        12: number;
    };
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
