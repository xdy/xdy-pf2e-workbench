import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Combine AE-likes altering creature size and TokenSize RuleElements into CreatureSize RuleElements */
export declare class Migration655CreatureTokenSizes extends MigrationBase {
    static version: number;
    private isTokenSizeRE;
    private isActorSizeAELike;
    private isBracketedValue;
    private dimensionToSize;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
