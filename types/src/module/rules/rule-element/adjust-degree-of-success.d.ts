import type { ActorType, CharacterPF2e, NPCPF2e } from "@actor";
import { DegreeOfSuccessString } from "@system/degree-of-success.ts";
import { RecordField } from "@system/schema-data-fields.ts";
import { ModelPropsFromRESchema } from "./data.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
import fields = foundry.data.fields;

/**
 * @category RuleElement
 */
declare class AdjustDegreeOfSuccessRuleElement extends RuleElementPF2e<AdjustDegreeRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): AdjustDegreeRuleSchema;
    beforePrepareData(): void;
}
interface AdjustDegreeOfSuccessRuleElement extends RuleElementPF2e<AdjustDegreeRuleSchema>, ModelPropsFromRESchema<AdjustDegreeRuleSchema> {
    get actor(): CharacterPF2e | NPCPF2e;
}
declare const degreeAdjustmentAmountString: readonly ["one-degree-better", "one-degree-worse", "two-degrees-better", "two-degrees-worse", "to-critical-failure", "to-failure", "to-success", "to-critical-success"];
type DegreeAdjustmentAmountString = (typeof degreeAdjustmentAmountString)[number];
type AdjustDegreeRuleSchema = RuleElementSchema & {
    selector: fields.StringField<string, string, true, false, false>;
    adjustment: RecordField<fields.StringField<"all" | DegreeOfSuccessString, "all" | DegreeOfSuccessString, true, false, false>, fields.StringField<DegreeAdjustmentAmountString, DegreeAdjustmentAmountString, true, false, false>>;
};
export { AdjustDegreeOfSuccessRuleElement };
