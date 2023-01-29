import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "@module/migration/base";
import { TokenDocumentPF2e } from "@module/scene/token-document";
interface CollectionDiff<T extends foundry.data.ActiveEffectSource | ItemSourcePF2e> {
    inserted: T[];
    deleted: string[];
    updated: T[];
}
export declare class MigrationRunnerBase {
    migrations: MigrationBase[];
    static LATEST_SCHEMA_VERSION: number;
    static MINIMUM_SAFE_VERSION: number;
    static RECOMMENDED_SAFE_VERSION: number;
    constructor(migrations?: MigrationBase[]);
    needsMigration(currentVersion: number): boolean;
    diffCollection<T extends foundry.data.ActiveEffectSource>(orig: T[], updated: T[]): CollectionDiff<T>;
    diffCollection<T extends ItemSourcePF2e>(orig: T[], updated: T[]): CollectionDiff<T>;
    diffCollection<T extends foundry.data.ActiveEffectSource | ItemSourcePF2e>(orig: T[], updated: T[]): CollectionDiff<T>;
    getUpdatedActor(actor: ActorSourcePF2e, migrations: MigrationBase[]): Promise<ActorSourcePF2e>;
    getUpdatedItem(item: ItemSourcePF2e, migrations: MigrationBase[]): Promise<ItemSourcePF2e>;
    getUpdatedTable(tableSource: foundry.data.RollTableSource, migrations: MigrationBase[]): Promise<foundry.data.RollTableSource>;
    getUpdatedMacro(macroSource: foundry.data.MacroSource, migrations: MigrationBase[]): Promise<foundry.data.MacroSource>;
    getUpdatedJournalEntry(source: foundry.data.JournalEntrySource, migrations: MigrationBase[]): Promise<foundry.data.JournalEntrySource>;
    getUpdatedToken(token: TokenDocumentPF2e, migrations: MigrationBase[]): Promise<foundry.data.TokenSource>;
    getUpdatedUser(userData: foundry.data.UserSource, migrations: MigrationBase[]): Promise<foundry.data.UserSource>;
    private updateSchemaRecord;
}
export {};
