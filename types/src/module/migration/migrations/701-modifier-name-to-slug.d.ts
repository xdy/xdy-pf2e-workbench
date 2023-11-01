import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Rename the `name` property on FlatModifier and DamageDice REs to `slug` to better represent its purpose */
export declare class Migration701ModifierNameToSlug extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
