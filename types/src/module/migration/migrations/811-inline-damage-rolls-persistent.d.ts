import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Update persistent damage roll links to also be formatted to new standard */
export declare class Migration811InlineDamageRollsPersistent extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateJournalEntry(source: foundry.documents.JournalEntrySource): Promise<void>;
}
