import { CreaturePF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
import type { BooleanField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField } from "./data.ts";
/** Reduce current hit points without applying damage */
declare class LoseHitPointsRuleElement extends RuleElementPF2e<LoseHitPointsRuleSchema> {
    static validActorTypes: ActorType[];
    static defineSchema(): LoseHitPointsRuleSchema;
    onCreate(actorUpdates: Record<string, unknown>): void;
    beforePrepareData(): void;
    preUpdate(changes: DeepPartial<ItemSourcePF2e>): Promise<void>;
}
interface LoseHitPointsRuleElement extends RuleElementPF2e<LoseHitPointsRuleSchema>, ModelPropsFromSchema<LoseHitPointsRuleSchema> {
    get actor(): CreaturePF2e;
}
type LoseHitPointsRuleSchema = RuleElementSchema & {
    value: ResolvableValueField<true, false, false>;
    /** Whether the lost hit points are recoverable while the parent item is present on the actor */
    recoverable: BooleanField<boolean, boolean, false>;
    /**
     * Lost hitpoints should reevaluate on item update, with the parent actor losing the difference in HP between the
     * new and old values.
     */
    reevaluateOnUpdate: BooleanField<boolean, boolean, false>;
};
export { LoseHitPointsRuleElement };
