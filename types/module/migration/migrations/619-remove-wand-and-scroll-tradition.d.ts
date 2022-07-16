import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration619TraditionLowercaseAndRemoveWandScroll extends MigrationBase {
    static version: number;
    updateItem(item: ItemSourcePF2e, actorData?: ActorSourcePF2e): Promise<void>;
}
