import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { RuleElementOptions } from "./";
import { AELikeData, AELikeRuleElement, AELikeSource } from "./ae-like";
/** Adjust the value of a modifier, change its damage type (in case of damage modifiers) or suppress it entirely */
declare class AdjustModifierRuleElement extends AELikeRuleElement {
    protected static validActorTypes: ActorType[];
    /** An optional relabeling of the adjusted modifier */
    relabel?: string;
    selectors: string[];
    damageType: string | null;
    suppress: boolean;
    constructor(data: AdjustModifierSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    protected validateData(): void;
    /** Instead of applying the change directly to a property path, defer it to a synthetic */
    applyAELike(): void;
}
interface AdjustModifierRuleElement extends AELikeRuleElement {
    data: AELikeData;
}
interface AdjustModifierSource extends Exclude<AELikeSource, "path"> {
    selector?: unknown;
    selectors?: unknown;
    relabel?: unknown;
    damageType?: unknown;
    suppress?: unknown;
}
export { AdjustModifierRuleElement };
