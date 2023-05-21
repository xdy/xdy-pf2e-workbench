import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "../index.ts";
/** Remember a token for later referencing */
declare class MarkTokenRuleElement extends RuleElementPF2e {
    #private;
    /** A unique slug to identify the mark as a roll option */
    slug: string;
    /** The uuid of the token */
    tokenUUID: string | null;
    constructor(data: MarkTokenSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    preCreate({ ruleSource, itemSource, pendingItems }: RuleElementPF2e.PreCreateParams): Promise<void>;
    beforePrepareData(): void;
}
interface MarkTokenSource extends RuleElementSource {
    slug?: unknown;
    tokenUUID?: unknown;
}
export { MarkTokenRuleElement };
