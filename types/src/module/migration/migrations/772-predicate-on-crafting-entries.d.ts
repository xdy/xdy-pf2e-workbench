import { ItemSourcePF2e } from "@item/data";
import { PhysicalItemTrait } from "@item/physical/data";
import { RawPredicate } from "@system/predication";
import { MigrationBase } from "../base";
/** Convert crafting entry `requiredTrait` properties to be predicates */
export declare class Migration772PredicateOnCraftingEntries extends MigrationBase {
    static version: number;
    munitionsCrafterPredicate: RawPredicate;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
    generatePredicateFromRequiredTraits(requiredTraits: PhysicalItemTrait[][]): RawPredicate;
}
