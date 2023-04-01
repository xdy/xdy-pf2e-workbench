import { ArrayField, BooleanField, ModelPropsFromSchema, StringField } from "types/foundry/common/data/fields.mjs";
import { RuleElementPF2e, RuleElementSchema } from "./";
import { ItemAlterationField } from "./alter-item";
/** An effect that applies ephemerally during a single action, such as a strike */
declare class EphemeralEffectRuleElement extends RuleElementPF2e<EphemeralEffectSchema> {
    #private;
    static defineSchema(): EphemeralEffectSchema;
    protected _validateModel(data: SourceFromSchema<EphemeralEffectSchema>): void;
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
