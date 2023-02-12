import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Removed unused traits data structures from items that don't use them */
export declare class Migration820RemoveUnusedTraitsData extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
