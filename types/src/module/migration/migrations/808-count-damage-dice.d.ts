import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Have REs counting dice damage via "1 + @weapon.system.runes.striking" instead use "@weapon.system.damage.dice" */
export declare class Migration808CountDamageDice extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
