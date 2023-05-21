import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration620RenameToWebp extends MigrationBase {
    static version: number;
    private regexp;
    private renameToWebP;
    private isABCK;
    updateActor(actorData: ActorSourcePF2e): Promise<void>;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
    updateMacro(macroData: foundry.documents.MacroSource): Promise<void>;
    updateTable(tableData: foundry.documents.RollTableSource): Promise<void>;
    updateToken(tokenData: foundry.documents.TokenSource): Promise<void>;
    updateUser(userData: foundry.documents.UserSource): Promise<void>;
}
