import type { ActorPF2e } from "@actor/base";
import type { ItemPF2e } from "@item/base";
import { MigrationRunnerBase } from "@module/migration/runner/base";
import { MigrationBase } from "@module/migration/base";
export declare class MigrationRunner extends MigrationRunnerBase {
    needsMigration(): boolean;
    /** Ensure that an actor or item reflects the current data schema before it is created */
    static ensureSchemaVersion(document: ActorPF2e | ItemPF2e, migrations: MigrationBase[]): Promise<void>;
    /** Migrate actor or item documents in batches of 50 */
    private migrateWorldDocuments;
    private migrateWorldItem;
    private migrateWorldActor;
    private migrateWorldJournalEntry;
    private migrateWorldMacro;
    private migrateWorldTable;
    private migrateSceneToken;
    private migrateUser;
    runMigrations(migrations: MigrationBase[]): Promise<void>;
    runMigration(force?: boolean): Promise<void>;
}
