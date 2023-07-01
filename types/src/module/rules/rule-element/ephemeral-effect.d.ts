import type { ArrayField, BooleanField, StringField } from "types/foundry/common/data/fields.d.ts";
import { ItemAlterationField } from "./alter-item/index.ts";
import { RuleElementPF2e, RuleElementSchema } from "./index.ts";
/** An effect that applies ephemerally during a single action, such as a strike */
declare class EphemeralEffectRuleElement extends RuleElementPF2e<EphemeralEffectSchema> {
    #private;
    static defineSchema(): EphemeralEffectSchema;
    static validateJoint(data: SourceFromSchema<EphemeralEffectSchema>): void;
    afterPrepareData(): void;
}
interface EphemeralEffectRuleElement extends RuleElementPF2e<EphemeralEffectSchema>, ModelPropsFromSchema<EphemeralEffectSchema> {
}
type EphemeralEffectSchema = RuleElementSchema & {
    affects: StringField<"target" | "origin", "target" | "origin", true, false, true>;
    selectors: ArrayField<StringField<string, string, true, false, false>>;
    uuid: StringField<string, string, true, false, false>;
    adjustName: BooleanField<boolean, boolean, true, false, true>;
    alterations: ArrayField<ItemAlterationField>;
};
export { EphemeralEffectRuleElement };
