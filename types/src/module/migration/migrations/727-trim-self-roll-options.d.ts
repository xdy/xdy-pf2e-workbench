import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";

/** Trim roll options with "self:" prefixes but are unnecessary for targeting */
export declare class Migration727TrimSelfRollOptions extends MigrationBase {
    #private;
    static version: number;
    private trimRollOption;
    private trimPredicates;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
