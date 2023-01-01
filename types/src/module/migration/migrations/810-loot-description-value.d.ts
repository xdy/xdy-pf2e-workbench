import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Remove value property from loot actor description */
export declare class Migration810LootDescriptionValue extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
