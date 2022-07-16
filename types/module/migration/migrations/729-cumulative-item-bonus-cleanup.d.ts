import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Clean up after bug overhauling cumulative item bonuses */
export declare class Migration729CumulativeItemBonusCleanup extends MigrationBase {
    #private;
    static version: number;
    private isExplorersClothing;
    private isStanceEffectOrAnimalSkinFeat;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
