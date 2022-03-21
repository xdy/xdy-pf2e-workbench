import { CreatureTrait } from "@actor/creature/data";
import { Size } from "@module/data";
import { ABCItemPF2e } from "../abc";
import { AncestryData } from "./data";

export declare class AncestryPF2e extends ABCItemPF2e {
    static get schema(): typeof AncestryData;
    get traits(): Set<CreatureTrait>;
    get hitPoints(): number;
    get speed(): number;
    get size(): Size;
    get reach(): number;
    /** Prepare a character's data derived from their ancestry */
    prepareActorData(this: Embedded<AncestryPF2e>): void;
}
export interface AncestryPF2e {
    readonly data: AncestryData;
}
