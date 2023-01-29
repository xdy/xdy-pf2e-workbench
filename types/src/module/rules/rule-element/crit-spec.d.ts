import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from ".";
/** Substitute a pre-determined result for a check's D20 roll */
declare class CritSpecRuleElement extends RuleElementPF2e {
    static validActorTypes: ActorType[];
    /** Whether this critical specialization note substitutes for the standard one of a given weapon group */
    private alternate;
    /** Alternative note text: if not provided, the standard one for a given weapon group is used */
    private text;
    constructor(data: CritSpecSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    private isValid;
    beforePrepareData(): void;
}
interface CritSpecSource extends RuleElementSource {
    alternate?: unknown;
    text?: unknown;
}
export { CritSpecRuleElement };
