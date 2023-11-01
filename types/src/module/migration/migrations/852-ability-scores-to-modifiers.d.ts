import { ActorSourcePF2e } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Convert ability scores to attribute modifiers */
export declare class Migration852AbilityScoresToModifiers extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    /** Convert AE-like rule elements (typically on apex items) to increase ability modifiers instead of scores */
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
