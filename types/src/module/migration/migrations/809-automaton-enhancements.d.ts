import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Add base REs to Automaton anncestry to allow for automation of enhancements */
export declare class Migration809AutomatonEnhancements extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
