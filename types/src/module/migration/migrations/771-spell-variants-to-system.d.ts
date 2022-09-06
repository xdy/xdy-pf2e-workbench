import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Convert embedded spell variant `data` properties to use `system` */
export declare class Migration771SpellVariantsToSystem extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
