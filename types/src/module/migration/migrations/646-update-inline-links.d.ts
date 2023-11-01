import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration646UpdateInlineLinks extends MigrationBase {
    static version: number;
    private updateCheckAttributes;
    updateActor(actorData: ActorSourcePF2e): Promise<void>;
    updateItem(itemData: ItemSourcePF2e): Promise<void>;
}
