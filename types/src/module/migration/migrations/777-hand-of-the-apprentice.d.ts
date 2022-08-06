import { ItemSourcePF2e } from "@item/data";
import { AELikeSource } from "@module/rules/rule-element/ae-like";
import { MigrationBase } from "../base";
/** Have Hand of the Apprentice feat enlarge focus pool */
export declare class Migration777HandOfTheApprentice extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourceWithAELikes): Promise<void>;
}
declare type ItemSourceWithAELikes = ItemSourcePF2e & {
    system: {
        rules: AELikeSource[];
    };
};
export {};
