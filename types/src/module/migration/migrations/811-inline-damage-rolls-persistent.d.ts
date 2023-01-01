import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Update persistent damage roll links to also be formatted to new standard */
export declare class Migration811InlineDamageRollsPersistent extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateJournalEntry(source: foundry.data.JournalEntrySource): Promise<void>;
}
