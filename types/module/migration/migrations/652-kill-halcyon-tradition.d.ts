import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Halcyon is not a tradition, as it did nothing it was removed without replacement. */
export declare class Migration652KillHalcyonTradition extends MigrationBase {
    static version: number;
    updateItem(itemData: ItemSourcePF2e, actor?: ActorSourcePF2e): Promise<void>;
}
