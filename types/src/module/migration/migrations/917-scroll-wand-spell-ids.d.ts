import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Populate `_id` field of spells embedded in old scrolls and wands. */
export declare class Migration917ScrollWandSpellIds extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
