import type { MeleePF2e } from "@item";
import { ItemSystemModel, ItemSystemSchema } from "@item/base/data/model.ts";
import type {
    BaseItemSourcePF2e,
    ItemFlagsPF2e,
    ItemSystemSource,
    ItemTraitsNoRarity,
} from "@item/base/data/system.ts";
import type { WeaponMaterialData } from "@item/weapon/data.ts";
import type { WeaponPropertyRuneType } from "@item/weapon/types.ts";
import type { DamageCategoryUnique, DamageType } from "@system/damage/types.ts";
import { RecordField, SlugField } from "@system/schema-data-fields.ts";
import type { NPCAttackTrait } from "./types.ts";
import fields = foundry.data.fields;

type MeleeSource = BaseItemSourcePF2e<"melee", MeleeSystemSource> & {
    flags: DeepPartial<MeleeFlags>;
};
type MeleeFlags = ItemFlagsPF2e & {
    pf2e: {
        linkedWeapon?: string;
    };
};
declare class MeleeSystemData extends ItemSystemModel<MeleePF2e, NPCAttackSystemSchema> {
    material: WeaponMaterialData;
    /** Weapon property runes (or rather the effects thereof) added via rule element */
    runes: {
        property: WeaponPropertyRuneType[];
    };
    static defineSchema(): NPCAttackSystemSchema;
}
interface MeleeSystemData extends ItemSystemModel<MeleePF2e, NPCAttackSystemSchema>, Omit<ModelPropsFromSchema<NPCAttackSystemSchema>, "description"> {
}
type NPCAttackSystemSchema = Omit<ItemSystemSchema, "traits"> & {
    traits: fields.SchemaField<{
        otherTags: fields.ArrayField<SlugField<true, false, false>, string[], string[], true, false, true>;
        value: fields.ArrayField<fields.StringField<NPCAttackTrait, NPCAttackTrait, true, false, false>, NPCAttackTrait[], NPCAttackTrait[], true, false, true>;
    }>;
    damageRolls: RecordField<fields.StringField<string, string, true, false, false>, fields.SchemaField<{
        damage: fields.StringField<string, string, true, false, false>;
        damageType: fields.StringField<DamageType, DamageType, true, false, false>;
        category: fields.StringField<DamageCategoryUnique, DamageCategoryUnique, true, true, true>;
    }>, true, false, true, true>;
    /** The base attack modifier for this attack  */
    bonus: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    attackEffects: fields.SchemaField<{
        value: fields.ArrayField<fields.StringField<string, string, true, false, false>>;
    }>;
};
type MeleeSystemSource = SourceFromSchema<NPCAttackSystemSchema> & {
    level?: never;
    schema?: ItemSystemSource["schema"];
};
type NPCAttackDamage = SourceFromSchema<NPCAttackSystemSchema>["damageRolls"]["string"];
type NPCAttackTraits = ItemTraitsNoRarity<NPCAttackTrait>;
export { MeleeSystemData };
export type { MeleeFlags, MeleeSource, MeleeSystemSource, NPCAttackDamage, NPCAttackTraits };
