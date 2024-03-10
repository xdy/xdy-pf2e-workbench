import type { ActorType } from "@actor/types.ts";
import type { BooleanField, SchemaField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
/**
 * @category RuleElement
 */
declare class TempHPRuleElement extends RuleElementPF2e<TempHPRuleSchema> {
    static validActorTypes: ActorType[];
    static defineSchema(): TempHPRuleSchema;
    onCreate(actorUpdates: Record<string, unknown>): void;
    /** Refresh the actor's temporary hit points at the start of its turn */
    onUpdateEncounter(data: {
        event: "initiative-roll" | "turn-start";
        actorUpdates: Record<string, unknown>;
    }): Promise<void>;
    onDelete(actorUpdates: Record<string, unknown>): void;
    /** Send out a chat message notifying everyone that the actor gained temporary HP */
    broadcast(newQuantity: number, oldQuantity: number): void;
}
interface TempHPRuleElement extends RuleElementPF2e<TempHPRuleSchema>, ModelPropsFromRESchema<TempHPRuleSchema> {
}
type TempHPEventsSchema = {
    /** Whether the temporary hit points are immediately applied */
    onCreate: BooleanField<boolean, boolean, false, false, false>;
    /** Whether the temporary hit points renew each round */
    onTurnStart: BooleanField<boolean, boolean, false, false, false>;
};
type TempHPRuleSchema = RuleElementSchema & {
    /** The quantity of temporary hit points to add */
    value: ResolvableValueField<true, false, false>;
    /** World events in which temporary HP is added or renewed */
    events: SchemaField<TempHPEventsSchema, SourceFromSchema<TempHPEventsSchema>, ModelPropsFromSchema<TempHPEventsSchema>, true, false, true>;
};
export { TempHPRuleElement };
