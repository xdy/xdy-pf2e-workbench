import { ActorSystemSource, BaseActorSourcePF2e } from "@actor/data/base.ts";
import { Immunity, ImmunitySource, Resistance, ResistanceSource, Weakness, WeaknessSource } from "@actor/data/iwr.ts";
import { ActorSystemModel, ActorSystemSchema } from "@actor/data/model.ts";
import { InitiativeTraceData } from "@actor/initiative.ts";
import { ActorAlliance } from "@actor/types.ts";
import { Rarity, ValueAndMax } from "@module/data.ts";
import { AutoChangeEntry } from "@module/rules/rule-element/ae-like.ts";
import { PerceptionTraceData } from "@system/statistic/perception.ts";
import { ArmyPF2e } from "./document.ts";
import { ArmyType } from "./types.ts";
import fields = foundry.data.fields;

declare class ArmySystemData extends ActorSystemModel<ArmyPF2e, ArmySystemSchema> {
    static defineSchema(): ArmySystemSchema;
}
interface ArmySystemData extends ActorSystemModel<ArmyPF2e, ArmySystemSchema>, ModelPropsFromSchema<ArmySystemSchema> {
    attributes: ModelPropsFromSchema<ArmyAttributesSchema> & {
        hp: {
            max: number;
            negativeHealing: boolean;
            unrecoverable: number;
            details: string;
        };
        immunities: Immunity[];
        weaknesses: Weakness[];
        resistances: Resistance[];
        flanking: never;
    };
    initiative: InitiativeTraceData;
    details: ModelPropsFromSchema<ArmyDetailsSchema> & {
        alliance: ActorAlliance;
    };
    perception: Pick<PerceptionTraceData, "senses">;
    traits: ModelPropsFromSchema<ArmyTraitsSchema> & {
        size?: never;
    };
    resources: {
        ammunition: ValueAndMax;
        potions: ValueAndMax;
    } & Record<string, never>;
    /** An audit log of automatic, non-modifier changes applied to various actor data nodes */
    autoChanges: Record<string, AutoChangeEntry[] | undefined>;
}
type ArmySystemSchema = Omit<ActorSystemSchema, "attributes" | "traits" | "resources"> & {
    ac: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        potency: fields.NumberField<number, number, true, false, true>;
    }>;
    attributes: fields.SchemaField<ArmyAttributesSchema>;
    details: fields.SchemaField<ArmyDetailsSchema>;
    consumption: fields.NumberField<number, number, true, false, true>;
    scouting: fields.NumberField<number, number, true, false, true>;
    recruitmentDC: fields.NumberField<number, number, true, false, true>;
    saves: fields.SchemaField<{
        maneuver: fields.NumberField<number, number, true, false, true>;
        morale: fields.NumberField<number, number, true, false, true>;
    }>;
    weapons: fields.SchemaField<{
        ranged: fields.SchemaField<ArmyWeaponSchema, SourceFromSchema<ArmyWeaponSchema>, ModelPropsFromSchema<ArmyWeaponSchema>, true, true, true>;
        melee: fields.SchemaField<ArmyWeaponSchema, SourceFromSchema<ArmyWeaponSchema>, ModelPropsFromSchema<ArmyWeaponSchema>, true, true, true>;
    }>;
    resources: fields.SchemaField<{
        /** How often this army can use ranged attacks */
        ammunition: fields.SchemaField<{
            value: fields.NumberField<number, number, true, false, true>;
        }>;
        potions: fields.SchemaField<{
            value: fields.NumberField<number, number, true, false, true>;
        }>;
    }>;
    traits: fields.SchemaField<ArmyTraitsSchema>;
};
type ArmyAttributesSchema = {
    hp: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        temp: fields.NumberField<number, number, true, false, true>;
        max: fields.NumberField<number, number, true, false, true>;
        routThreshold: fields.NumberField<number, number, true, false, true>;
    }>;
};
type ArmyDetailsSchema = {
    level: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
    }>;
};
type ArmyTraitsSchema = {
    value: fields.ArrayField<fields.StringField<string, string, true, false>>;
    rarity: fields.StringField<Rarity, Rarity, true, false>;
    type: fields.StringField<ArmyType, ArmyType, true, false>;
};
type ArmyWeaponSchema = {
    name: fields.StringField<string, string, true, false, false>;
    potency: fields.NumberField<number, number, true, false, true>;
};
type ArmySystemSource = SourceFromSchema<ArmySystemSchema> & {
    attributes: {
        immunities?: ImmunitySource[];
        weaknesses?: WeaknessSource[];
        resistances?: ResistanceSource[];
        flanking: never;
        hp: {
            details: string;
        };
    };
    /** Legacy location of `MigrationRecord` */
    schema?: ActorSystemSource["schema"];
};
type ArmySource = BaseActorSourcePF2e<"army", ArmySystemSource>;
export { ArmySystemData };
export type { ArmySource };
