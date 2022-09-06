import type { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/**
 * Makes spells use the category for focus/ritual spells instead
 * of traditions and removes focus/ritual from the spell types.
 */
export declare class Migration626UpdateSpellCategory extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
