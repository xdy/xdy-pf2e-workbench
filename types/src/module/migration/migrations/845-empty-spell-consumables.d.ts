import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/**  Ensure partial spell consumables (from missed prior migration) are nulled out */
export declare class Migration845EmptySpellConsumables extends MigrationBase {
    static version: number;
    preUpdateItem(source: ItemSourcePF2e): Promise<void>;
}
