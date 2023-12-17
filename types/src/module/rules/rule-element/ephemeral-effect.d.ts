import type { ArrayField, BooleanField, EmbeddedDataField, StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "./data.ts";
import { ItemAlteration } from "./item-alteration/alteration.ts";
/** An effect that applies ephemerally during a single action, such as a strike */
declare class EphemeralEffectRuleElement extends RuleElementPF2e<EphemeralEffectSchema> {
    #private;
    static defineSchema(): EphemeralEffectSchema;
    static validateJoint(data: SourceFromSchema<EphemeralEffectSchema>): void;
    afterPrepareData(): void;
}
interface EphemeralEffectRuleElement extends RuleElementPF2e<EphemeralEffectSchema>, ModelPropsFromRESchema<EphemeralEffectSchema> {
}
type EphemeralEffectSchema = RuleElementSchema & {
    affects: StringField<"target" | "origin", "target" | "origin", true, false, true>;
    selectors: ArrayField<StringField<string, string, true, false, false>>;
    uuid: StringField<string, string, true, false, false>;
    adjustName: BooleanField<boolean, boolean, true, false, true>;
    alterations: ArrayField<EmbeddedDataField<ItemAlteration>>;
};
export { EphemeralEffectRuleElement };
