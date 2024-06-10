import { RuleElementSource } from "@module/rules/index.ts";
import { SlugField } from "@system/schema-data-fields.ts";
import type { ArrayField, BooleanField, NumberField, ObjectField, SchemaField, StringField } from "types/foundry/common/data/fields.d.ts";
import type { ItemPF2e } from "../document.ts";
import { ItemDescriptionData } from "./system.ts";
declare abstract class ItemSystemModel<TParent extends ItemPF2e, TSchema extends ItemSystemSchema> extends foundry.abstract
    .TypeDataModel<TParent, TSchema> {
    static defineSchema(): ItemSystemSchema;
}
interface ItemSystemModel<TParent extends ItemPF2e, TSchema extends ItemSystemSchema> extends foundry.abstract.TypeDataModel<TParent, TSchema> {
    description: ItemDescriptionData;
}
type ItemSystemSchema = {
    description: SchemaField<{
        value: StringField<string, string, true, false, true>;
        gm: StringField<string, string, true, false, true>;
    }>;
    publication: SchemaField<{
        title: StringField<string, string, true, false, true>;
        authors: StringField<string, string, true, false, true>;
        license: StringField<"OGL" | "ORC", "OGL" | "ORC", true, false, true>;
        remaster: BooleanField<boolean, boolean, true, false, true>;
    }>;
    rules: ArrayField<ObjectField<RuleElementSource, RuleElementSource, true, false, false>, RuleElementSource[], RuleElementSource[], true, false, true>;
    slug: SlugField<true, true, true>;
    traits: SchemaField<{
        otherTags: ArrayField<SlugField<true, false, false>, string[], string[], true, false, true>;
    }>;
    _migration: SchemaField<{
        version: NumberField<number, number, true, true, true>;
        previous: SchemaField<{
            foundry: StringField<string, string, true, true, true>;
            system: StringField<string, string, true, true, true>;
            schema: NumberField<number, number, true, true, true>;
        }, {
            foundry: string | null;
            system: string | null;
            schema: number | null;
        }, {
            foundry: string | null;
            system: string | null;
            schema: number | null;
        }, true, true, true>;
    }>;
};
export { ItemSystemModel, type ItemSystemSchema };
