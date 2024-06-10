import type { ActorPF2e, CharacterPF2e } from "@actor";
import { CreatureTrait } from "@actor/creature/types.ts";
import { AttributeString } from "@actor/types.ts";
import { ABCItemPF2e, type FeatPF2e } from "@item";
import { Size } from "@module/data.ts";
import type { UserPF2e } from "@module/user/document.ts";
import { AncestrySource, AncestrySystemData } from "./data.ts";
declare class AncestryPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ABCItemPF2e<TParent> {
    static get validTraits(): Record<CreatureTrait, string>;
    get traits(): Set<CreatureTrait>;
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
    /** Ensure certain fields are positive integers. */
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface AncestryPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ABCItemPF2e<TParent> {
    readonly _source: AncestrySource;
    system: AncestrySystemData;
}
export { AncestryPF2e };
