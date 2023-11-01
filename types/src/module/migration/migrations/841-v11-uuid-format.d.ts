import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Convert UUIDs to V11 format */
export declare class Migration841V11UUIDFormat extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateJournalEntry(source: foundry.documents.JournalEntrySource): Promise<void>;
}
