import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Ensure `crafting` property in character system data has the correct structure */
export declare class Migration722CraftingSystemData extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
