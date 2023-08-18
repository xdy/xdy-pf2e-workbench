import { ActorPF2e, CharacterPF2e } from "@actor";
import { CreatureTrait } from "@actor/creature/types.ts";
import { AttributeString } from "@actor/types.ts";
import { ABCItemPF2e, FeatPF2e } from "@item";
import { Size } from "@module/data.ts";
import { AncestrySource, AncestrySystemData } from "./data.ts";
declare class AncestryPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ABCItemPF2e<TParent> {
    get traits(): Set<CreatureTrait>;
    get rarity(): string;
    get hitPoints(): number;
    get speed(): number;
    get size(): Size;
    /** Returns all boosts enforced by this ancestry normally */
    get lockedBoosts(): AttributeString[];
    /** Returns all flaws enforced by this ancestry normally */
    get lockedFlaws(): AttributeString[];
    /** Include all ancestry features in addition to any with the expected location ID */
    getLinkedItems(): FeatPF2e<ActorPF2e>[];
    prepareBaseData(): void;
    /** Prepare a character's data derived from their ancestry */
    prepareActorData(this: AncestryPF2e<CharacterPF2e>): void;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
}
interface AncestryPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ABCItemPF2e<TParent> {
    readonly _source: AncestrySource;
    system: AncestrySystemData;
}
export { AncestryPF2e };
