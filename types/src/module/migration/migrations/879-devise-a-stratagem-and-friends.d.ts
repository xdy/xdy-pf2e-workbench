import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Update rule element on Devise a Stratagem action and related feats. */
export declare class Migration879DeviseAStratagemAndFriends extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
