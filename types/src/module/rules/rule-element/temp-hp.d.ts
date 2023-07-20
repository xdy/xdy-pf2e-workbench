import { ActorType } from "@actor/data/index.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
import type { BooleanField, SchemaField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField } from "./data.ts";
/**
 * @category RuleElement
 */
declare class TempHPRuleElement extends RuleElementPF2e<TempHPRuleSchema> {
    static validActorTypes: ActorType[];
    static defineSchema(): TempHPRuleSchema;
    onCreate(actorUpdates: Record<string, unknown>): void;
    /** Refresh the actor's temporary hit points at the start of its turn */
    onTurnStart(actorUpdates: Record<string, unknown>): void;
    onDelete(actorUpdates: Record<string, unknown>): void;
    /** Send out a chat message notifying everyone that the actor gained temporary HP */
    broadcast(newQuantity: number, oldQuantity: number): void;
}
interface TempHPRuleElement extends RuleElementPF2e<TempHPRuleSchema>, ModelPropsFromSchema<TempHPRuleSchema> {
}
type TempHPEventsSchema = {
    /** Whether the temporary hit points are immediately applied */
    onCreate: BooleanField<boolean, boolean, false, false, false>;
    /** Whether the temporary hit points renew each round */
    onTurnStart: BooleanField<boolean, boolean, false, false, false>;
};
type TempHPRuleSchema = RuleElementSchema & {
    value: ResolvableValueField<true, false, false>;
    events: SchemaField<TempHPEventsSchema, SourceFromSchema<TempHPEventsSchema>, ModelPropsFromSchema<TempHPEventsSchema>, true, false, true>;
};
export { TempHPRuleElement };
