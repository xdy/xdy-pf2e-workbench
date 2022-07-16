import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration669NPCAttackEffects extends MigrationBase {
    static version: number;
    updateItem(item: ItemSourcePF2e, actor?: ActorSourcePF2e): Promise<void>;
}
