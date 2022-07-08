import { CreatureTrait } from "@actor/creature/data";
import { Size } from "@module/data";
import { ABCItemPF2e, FeatPF2e } from "@item";
import { AncestryData } from "./data";
declare class AncestryPF2e extends ABCItemPF2e {
    get traits(): Set<CreatureTrait>;
    get hitPoints(): number;
    get speed(): number;
    get size(): Size;
    /** Include all ancestry features in addition to any with the expected location ID */
    getLinkedFeatures(): Embedded<FeatPF2e>[];
    prepareBaseData(): void;
    /** Prepare a character's data derived from their ancestry */
    prepareActorData(this: Embedded<AncestryPF2e>): void;
}
interface AncestryPF2e {
    readonly data: AncestryData;
}
export { AncestryPF2e };
