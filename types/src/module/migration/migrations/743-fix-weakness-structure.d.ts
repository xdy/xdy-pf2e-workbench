import { ActorSourcePF2e } from "@actor/data";
import { MigrationBase } from "../base";
/** Move tracking of roll-option toggles to the rules themselves */
export declare class Migration743FixWeaknessStructure extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
