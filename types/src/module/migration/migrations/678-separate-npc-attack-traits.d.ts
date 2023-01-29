import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove exclusive NPC attack traits from weapons */
export declare class Migration678SeparateNPCAttackTraits extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemWithRarityObject): Promise<void>;
}
type ItemWithRarityObject = ItemSourcePF2e & {
    system: {
        traits?: {
            rarity: string | {
                value: string;
            };
        };
    };
};
export {};
