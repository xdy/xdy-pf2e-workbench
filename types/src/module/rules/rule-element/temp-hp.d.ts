import { ActorType } from "@actor/data/index.ts";
import { RuleElementOptions } from "./base.ts";
import { RuleElementData, RuleElementPF2e, RuleElementSource } from "./index.ts";
/**
 * @category RuleElement
 */
declare class TempHPRuleElement extends RuleElementPF2e {
    static validActorTypes: ActorType[];
    constructor(data: TempHPSource, options: RuleElementOptions);
    onCreate(actorUpdates: Record<string, unknown>): void;
    /** Refresh the actor's temporary hit points at the start of its turn */
    onTurnStart(actorUpdates: Record<string, unknown>): void;
    onDelete(actorUpdates: Record<string, unknown>): void;
    /** Send out a chat message notifying everyone that the actor gained temporary HP */
    broadcast(newQuantity: number, oldQuantity: number): void;
}
interface TempHPRuleElement extends RuleElementPF2e {
    data: TempHPData;
}
interface TempHPData extends RuleElementData {
    onCreate: boolean;
    onTurnStart: boolean;
}
interface TempHPSource extends RuleElementSource {
    onCreate?: unknown;
    onTurnStart?: unknown;
}
export { TempHPRuleElement };
