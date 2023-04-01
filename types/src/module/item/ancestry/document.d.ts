import { ActorPF2e, CharacterPF2e } from "@actor";
import { CreatureTrait } from "@actor/creature/types";
import { AbilityString } from "@actor/types";
import { ABCItemPF2e, FeatPF2e } from "@item";
import { Size } from "@module/data";
import { AncestrySource, AncestrySystemData } from "./data";
declare class AncestryPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ABCItemPF2e<TParent> {
    get traits(): Set<CreatureTrait>;
    get hitPoints(): number;
    get speed(): number;
    get size(): Size;
    /** Returns all boosts enforced by this ancestry normally */
    get lockedBoosts(): AbilityString[];
    /** Include all ancestry features in addition to any with the expected location ID */
    getLinkedItems(): FeatPF2e<ActorPF2e>[];
    prepareBaseData(): void;
    /** Prepare a character's data derived from their ancestry */
    prepareActorData(this: AncestryPF2e<CharacterPF2e>): void;
}
interface AncestryPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ABCItemPF2e<TParent> {
    readonly _source: AncestrySource;
    system: AncestrySystemData;
}
export { AncestryPF2e };
