import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { RuleElementPF2e, RuleElementData, RuleElementSource, RuleElementOptions } from ".";
/**
 * Rule element to implement fast healing and regeneration.
 * Creates a chat card every round of combat.
 * @category RuleElement
 */
declare class FastHealingRuleElement extends RuleElementPF2e {
    static validActorTypes: ActorType[];
    constructor(data: FastHealingSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    get details(): string | null;
    /** Refresh the actor's temporary hit points at the start of its turn */
    onTurnStart(): Promise<void>;
}
interface FastHealingRuleElement extends RuleElementPF2e {
    data: FastHealingData;
}
interface FastHealingData extends RuleElementData {
    type: "fast-healing" | "regeneration";
    details?: string;
    deactivatedBy: string[];
}
interface FastHealingSource extends RuleElementSource {
    type?: "fast-healing" | "regeneration";
    details?: string;
    deactivatedBy?: string[];
}
export { FastHealingRuleElement as HealingRuleElement };
