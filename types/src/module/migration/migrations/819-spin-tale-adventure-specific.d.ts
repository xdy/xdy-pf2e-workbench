import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Replace links to adventure-specific Spin Tale */
export declare class Migration819SpinTaleAdventureSpecific extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
