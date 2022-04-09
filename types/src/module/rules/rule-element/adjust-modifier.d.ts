import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { DamageType } from "@system/damage";
import { PredicatePF2e } from "@system/predication";
import { RuleElementOptions } from "./";
import { AELikeData, AELikeRuleElement, AELikeSource } from "./ae-like";
declare class AdjustModifierRuleElement extends AELikeRuleElement {
    protected static validActorTypes: ActorType[];
    /** An optional relabeling of the adjusted modifier */
    relabel?: string;
    selectors: string[];
    constructor(data: AdjustModifierSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    protected validateData(): void;
    /** Instead of applying the change directly to a property path, defer it to a synthetic */
    applyAELike(): void;
}
interface AdjustModifierRuleElement extends AELikeRuleElement {
    data: AdjustModifierData;
}
interface AdjustModifierSource extends Exclude<AELikeSource, "path"> {
    relabel?: unknown;
    damageType?: unknown;
    selectors?: unknown;
}
interface AdjustModifierData extends Exclude<AELikeData, "path"> {
    predicate: PredicatePF2e;
    selectors: string[];
    slug: string | null;
    damageType?: DamageType;
}
export { AdjustModifierRuleElement };
