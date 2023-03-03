import { ArrayField, BooleanField, ModelPropsFromSchema, SchemaField, StringField } from "types/foundry/common/data/fields.mjs";
import { AELikeChangeMode } from "./ae-like";
import { RuleElementPF2e } from "./base";
import { RuleElementSchema } from "./data";
import { WithItemAlterations } from "./mixins";
/** An effect that applies ephemerally during a single action, such as a strike */
declare class EphemeralEffectRuleElement extends RuleElementPF2e<EphemeralEffectSchema> {
    #private;
    static defineSchema(): EphemeralEffectSchema;
    protected _validateModel(data: SourceFromSchema<EphemeralEffectSchema>): void;
    afterPrepareData(): void;
}
interface EphemeralEffectRuleElement extends RuleElementPF2e<EphemeralEffectSchema>, ModelPropsFromSchema<EphemeralEffectSchema>, WithItemAlterations<EphemeralEffectSchema> {
    alterations: SourceFromSchema<ItemAlterationData>[];
}
type EphemeralEffectSchema = RuleElementSchema & {
    affects: StringField<"target" | "origin", "target" | "origin", true, false, true>;
    selectors: ArrayField<StringField<string, string, true, false, false>>;
    uuid: StringField<string, string, true, false, false>;
    adjustName: BooleanField<boolean, boolean, true, false, true>;
    alterations: ArrayField<SchemaField<ItemAlterationData>>;
};
type AddOverrideUpgrade = Extract<AELikeChangeMode, "add" | "override" | "upgrade">;
type ItemAlterationData = {
    mode: StringField<AddOverrideUpgrade, AddOverrideUpgrade, true, false, false>;
    property: StringField<"badge-value", "badge-value", true, false, false>;
    value: StringField<string, string, true, true, false>;
};
export { EphemeralEffectRuleElement };
