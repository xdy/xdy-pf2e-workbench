import type { ActorType, CreaturePF2e } from "@actor";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import type { BooleanField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;

/** Reduce current hit points without applying damage */
declare class LoseHitPointsRuleElement extends RuleElementPF2e<LoseHitPointsRuleSchema> {
    static validActorTypes: ActorType[];
    static defineSchema(): LoseHitPointsRuleSchema;
    onCreate(actorUpdates: Record<string, unknown>): void;
    beforePrepareData(): void;
    preUpdate(changes: DeepPartial<ItemSourcePF2e>): Promise<void>;
}
interface LoseHitPointsRuleElement extends RuleElementPF2e<LoseHitPointsRuleSchema>, ModelPropsFromRESchema<LoseHitPointsRuleSchema> {
    get actor(): CreaturePF2e;
}
type LoseHitPointsRuleSchema = RuleElementSchema & {
    value: ResolvableValueField<true, false, false>;
    /** Whether the lost hit points are recoverable while the parent item is present on the actor */
    recoverable: fields.BooleanField<boolean, boolean, false>;
    /**
     * Lost hitpoints should reevaluate on item update, with the parent actor losing the difference in HP between the
     * new and old values.
     */
    reevaluateOnUpdate: BooleanField<boolean, boolean, false>;
};
export { LoseHitPointsRuleElement };
