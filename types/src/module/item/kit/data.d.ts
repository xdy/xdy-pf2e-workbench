import type { KitPF2e } from "@item";
import { ItemSystemModel, ItemSystemSchema } from "@item/base/data/model.ts";
import type { BaseItemSourcePF2e, ItemSystemSource } from "@item/base/data/system.ts";
import type { ClassTrait } from "@item/class/types.ts";
import { PriceField } from "@item/physical/schema.ts";
import { NullField, RecordField, SlugField } from "@system/schema-data-fields.ts";
import fields = foundry.data.fields;

declare class KitEntriesField extends RecordField<fields.StringField<string, string, true, false, false>, fields.SchemaField<KitEntryValueSchema>, true, false, true, true> {
    /**
     * @param depth The recursion depth of this field:must be between 0 and 2
     */
    constructor(depth?: number);
}
declare class KitSystemData extends ItemSystemModel<KitPF2e, KitSystemSchema> {
    static defineSchema(): KitSystemSchema;
}
interface KitSystemData extends ItemSystemModel<KitPF2e, KitSystemSchema>, Omit<ModelPropsFromSchema<KitSystemSchema>, "description"> {
}
type KitEntryData = NonNullable<KitSystemData["items"][string]>;
type KitEntryValueSchema = {
    uuid: fields.DocumentUUIDField<ItemUUID, true, false, false>;
    img: fields.FilePathField<ImageFilePath, ImageFilePath, true, false, false>;
    quantity: fields.NumberField<number, number, true, false, false>;
    name: fields.StringField<string, string, true, false, false>;
    isContainer: fields.BooleanField<boolean, boolean, true, false, false>;
    items: KitEntriesField | NullField;
};
type KitSystemSchema = Omit<ItemSystemSchema, "traits"> & {
    traits: fields.SchemaField<{
        otherTags: fields.ArrayField<SlugField<true, false, false>, string[], string[], true, false, true>;
        value: fields.ArrayField<fields.StringField<ClassTrait, ClassTrait, true, false, false>, ClassTrait[], ClassTrait[], true, false, true>;
    }>;
    items: KitEntriesField;
    price: PriceField;
};
type KitSystemSource = SourceFromSchema<KitSystemSchema> & {
    level?: never;
    schema?: ItemSystemSource["schema"];
};
type KitSource = BaseItemSourcePF2e<"kit", KitSystemSource>;
export { KitSystemData };
export type { KitEntryData, KitSource };
