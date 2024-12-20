import { ItemSystemModel, ItemSystemSchema } from "@item/base/data/model.ts";
import type { ActionType, BaseItemSourcePF2e, FrequencyInterval, ItemSystemSource } from "@item/base/data/system.ts";
import type { OneToThree } from "@module/data.ts";
import { SlugField } from "@system/schema-data-fields.ts";
import type { ModelPropFromDataField } from "types/foundry/common/data/fields.d.ts";
import type { AbilityItemPF2e } from "./document.ts";
import { AbilityTraitToggles } from "./trait-toggles.ts";
import type { AbilityTrait, ActionCategory } from "./types.ts";
import fields = foundry.data.fields;

type AbilitySource = BaseItemSourcePF2e<"action", AbilitySystemSource>;
declare class AbilitySystemData extends ItemSystemModel<AbilityItemPF2e, AbilitySystemSchema> {
    static LOCALIZATION_PREFIXES: string[];
    traits: AbilityTraits;
    frequency: FrequencyData | null;
    selfEffect: SelfEffectReference | null;
    deathNote: boolean;
    static defineSchema(): AbilitySystemSchema;
    prepareBaseData(): void;
}
interface AbilitySystemData extends ItemSystemModel<AbilityItemPF2e, AbilitySystemSchema>, Omit<ModelPropsFromSchema<AbilitySystemSchema>, "description"> {
}
type AbilitySystemSchema = Omit<ItemSystemSchema, "traits"> & {
    traits: fields.SchemaField<{
        otherTags: fields.ArrayField<SlugField<true, false, false>, string[], string[], true, false, true>;
        value: fields.ArrayField<fields.StringField<AbilityTrait, AbilityTrait, true, false, false>, AbilityTrait[], AbilityTrait[], true, false, true>;
        toggles: fields.SchemaField<{
            mindshift: fields.SchemaField<{
                selected: fields.BooleanField;
            }, {
                selected: boolean;
            }, {
                selected: boolean;
            }, false, true, false>;
        }, {
            mindshift: {
                selected: boolean;
            } | null | undefined;
        }, {
            mindshift: {
                selected: boolean;
            } | null;
        }, false, false, false>;
    }>;
    actionType: fields.SchemaField<{
        value: fields.StringField<ActionType, ActionType, true, false, true>;
    }>;
    actions: fields.SchemaField<{
        value: fields.NumberField<OneToThree, OneToThree, true, true, true>;
    }>;
    category: fields.StringField<ActionCategory, ActionCategory, true, true, true>;
    deathNote: fields.BooleanField<boolean, boolean, false, false, false>;
    frequency: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        max: fields.NumberField<number, number, true, false, true>;
        /** Gap between recharges as an ISO8601 duration, or "day" for daily prep. */
        per: fields.StringField<FrequencyInterval, FrequencyInterval, true, false, true>;
    }, {
        value: number;
        max: number;
        per: FrequencyInterval;
    }, {
        value: number;
        max: number;
        per: FrequencyInterval;
    }, false, true, false>;
    /** A self-applied effect for simple actions */
    selfEffect: fields.SchemaField<{
        uuid: fields.DocumentUUIDField<ItemUUID, true, false, false>;
        name: fields.StringField<string, string, true, false, false>;
    }, {
        uuid: ItemUUID;
        name: string;
    }, {
        uuid: ItemUUID;
        name: string;
    }, false, true, false>;
};
type AbilitySystemSource = SourceFromSchema<AbilitySystemSchema> & {
    level?: never;
    schema?: ItemSystemSource["schema"];
};
type FrequencyData = NonNullable<ModelPropFromDataField<AbilitySystemSchema["frequency"]>>;
type AbilityTraitsSource = AbilitySystemSource["traits"];
interface AbilityTraits extends AbilityTraitsSource {
    toggles: AbilityTraitToggles;
}
type SelfEffectReferenceSource = NonNullable<AbilitySystemSource["selfEffect"]>;
interface SelfEffectReference extends SelfEffectReferenceSource {
    img?: Maybe<ImageFilePath>;
}
export { AbilitySystemData };
export type { AbilitySource, AbilitySystemSchema, AbilitySystemSource, SelfEffectReference, SelfEffectReferenceSource };
