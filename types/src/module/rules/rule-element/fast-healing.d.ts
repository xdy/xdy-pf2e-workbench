import { ActorPF2e } from "@actor";
import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { RuleElementData, RuleElementOptions, RuleElementPF2e, RuleElementSource } from ".";
/**
 * Rule element to implement fast healing and regeneration.
 * Creates a chat card every round of combat.
 * @category RuleElement
 */
declare class FastHealingRuleElement extends RuleElementPF2e implements FastHealingData {
    #private;
    static validActorTypes: ActorType[];
    type: "fast-healing" | "regeneration";
    deactivatedBy: string[];
    constructor(data: FastHealingSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    get details(): string | null;
    /** Send a message with a "healing" (damage) roll at the start of its turn */
    onTurnStart(): Promise<void>;
}
interface FastHealingData extends RuleElementData {
    type: "fast-healing" | "regeneration";
    details?: string | null;
    deactivatedBy: string[];
}
interface FastHealingSource extends RuleElementSource {
    type?: unknown;
    details?: unknown;
    deactivatedBy?: unknown;
}
export { FastHealingData, FastHealingRuleElement, FastHealingSource };
