import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove older AE-like REs that set properties in an actor's prototype token  */
export declare class Migration792RemoveTokenAELikes extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
