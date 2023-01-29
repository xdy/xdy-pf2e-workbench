import { CreatureTrait } from "@actor/creature/data";
import { Size } from "@module/data";
import { ABCItemPF2e, FeatPF2e } from "@item";
import { AncestryData } from "./data";
import { AbilityString } from "@actor/types";
declare class AncestryPF2e extends ABCItemPF2e {
    get traits(): Set<CreatureTrait>;
    get hitPoints(): number;
    get speed(): number;
    get size(): Size;
    /** Returns all boosts enforced by this ancestry normally */
    get lockedBoosts(): AbilityString[];
    /** Include all ancestry features in addition to any with the expected location ID */
    getLinkedItems(): Embedded<FeatPF2e>[];
    prepareBaseData(): void;
    /** Prepare a character's data derived from their ancestry */
    prepareActorData(this: Embedded<AncestryPF2e>): void;
}
interface AncestryPF2e {
    readonly data: AncestryData;
}
export { AncestryPF2e };
