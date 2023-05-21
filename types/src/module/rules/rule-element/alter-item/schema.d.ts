import type { ModelPropsFromSchema, StringField } from "types/foundry/common/data/fields.d.ts";
import { AELikeChangeMode } from "../ae-like.ts";
declare const fields: typeof import("types/foundry/common/data/fields.d.ts");
declare class ItemAlterationField extends fields.SchemaField<ItemAlterationSchema, SourceFromSchema<ItemAlterationSchema>, ModelPropsFromSchema<ItemAlterationSchema>, true, false, false> {
    constructor();
}
declare class ItemAlterationValueField extends fields.DataField<string | number | boolean | object | null, string | number | boolean | object | null, true, true, false> {
    constructor();
    protected _cast(value: unknown): unknown;
    protected _validateType(value: unknown): boolean;
}
type AddOverrideUpgrade = Extract<AELikeChangeMode, "add" | "override" | "upgrade">;
type ItemAlterationSchema = {
    mode: StringField<AddOverrideUpgrade, AddOverrideUpgrade, true, false, false>;
    property: StringField<"badge-value" | "rarity", "badge-value" | "rarity", true, false, false>;
    value: ItemAlterationValueField;
};
type ItemAlterationData = ModelPropsFromSchema<ItemAlterationSchema>;
export { ItemAlterationData, ItemAlterationField, ItemAlterationValueField };
