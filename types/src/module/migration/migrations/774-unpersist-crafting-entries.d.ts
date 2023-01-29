import { ActorSourcePF2e } from "@actor/data";
import { ItemSourcePF2e } from "@item/data";
import { PhysicalItemTrait } from "@item/physical/data";
import { PredicateStatement } from "@system/predication";
import { MigrationBase } from "../base";
/** Convert crafting entry `requiredTrait` properties to be predicates */
export declare class Migration774UnpersistCraftingEntries extends MigrationBase {
    static version: number;
    munitionsCrafterPredicate: OldRawPredicate;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
    generatePredicateFromRequiredTraits(requiredTraits: PhysicalItemTrait[][]): OldRawPredicate;
}
interface OldRawPredicate {
    all?: PredicateStatement[];
    any?: PredicateStatement[];
    not?: PredicateStatement[];
}
export {};
