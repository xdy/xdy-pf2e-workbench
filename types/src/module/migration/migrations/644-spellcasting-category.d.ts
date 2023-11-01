import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration644SpellcastingCategory extends MigrationBase {
    static version: number;
    updateItem(item: ItemSourcePF2e, actor?: ActorSourcePF2e): Promise<void>;
}
