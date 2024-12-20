import { RawModifier } from "@actor/modifiers.ts";
import { ZeroToFour } from "@module/data.ts";
import { DataUnionField, RecordField, StrictBooleanField, StrictStringField } from "@system/schema-data-fields.ts";
import type {
    FameType,
    KingdomAbility,
    KingdomBoostCategory,
    KingdomCommodity,
    KingdomLeadershipRole,
    KingdomSettlementType,
    KingdomSkill,
} from "./types.ts";
import fields = foundry.data.fields;

declare function defineKingdomSchema(): KingdomSchema;
type CHGSchema = {
    id: fields.StringField<string, string, false, false>;
    name: fields.StringField<string, string, true, false>;
    img: fields.StringField<ImageFilePath, ImageFilePath, true, false>;
    description: fields.StringField<string, string, true, false>;
    boosts: fields.ArrayField<fields.StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
};
type CharterSchema = CHGSchema & {
    flaw: fields.StringField<KingdomAbility, KingdomAbility, true, true>;
};
type GovernmentSchema = CHGSchema & {
    skills: fields.ArrayField<fields.StringField<KingdomSkill, KingdomSkill, true, false>>;
    feat: fields.DocumentUUIDField<ItemUUID>;
};
type NullableSchemaField<TSchema extends fields.DataSchema> = fields.SchemaField<TSchema, SourceFromSchema<TSchema>, ModelPropsFromSchema<TSchema>, true, true, true>;
type BuildSchema = {
    /** Determines if the ability scores are manually set or automatically determined. */
    manual: fields.BooleanField;
    charter: NullableSchemaField<CharterSchema>;
    heartland: NullableSchemaField<CHGSchema>;
    government: NullableSchemaField<GovernmentSchema>;
    skills: fields.SchemaField<Record<KingdomSkill, fields.SchemaField<{
        rank: fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
    }>>>;
    /** Boost selections made by the user, both during the build process and levelling */
    boosts: fields.SchemaField<Record<KingdomBoostCategory, fields.ArrayField<fields.StringField<KingdomAbility, KingdomAbility, true, false>>>>;
};
type ResourceSchema = {
    dice: fields.SchemaField<{
        number: fields.NumberField;
        faces: fields.NumberField;
        bonus: fields.NumberField<number, number, true, false, true>;
        penalty: fields.NumberField<number, number, true, false, true>;
    }>;
    fame: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        max: fields.NumberField<number, number, true, false, true>;
    }>;
    commodities: fields.SchemaField<Record<KingdomCommodity, fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        max: fields.NumberField<number, number, true, false, true>;
    }>>>;
    points: fields.NumberField<number, number, false, false, true>;
    /** Worksites by commodity type, for the commodities that can have work sites */
    workSites: fields.SchemaField<Record<KingdomCommodity, fields.SchemaField<{
        /** The number of regular non-resource work sites */
        value: fields.NumberField<number, number, false, false, true>;
        /** The number of worksites that are on resource hexes (these grant double) */
        resource: fields.NumberField<number, number, false, false, true>;
    }>>>;
};
type SettlementSchema = {
    name: fields.StringField<string, string, true, false, true>;
    type: fields.StringField<KingdomSettlementType, KingdomSettlementType, false, false, true>;
    level: fields.NumberField<number, number, true, false, true>;
    overcrowded: fields.BooleanField;
    description: fields.StringField<string, string, false, false, true>;
    sort: fields.IntegerSortField;
    consumption: fields.SchemaField<{
        base: fields.NumberField<number, number, false, false, true>;
        /** Some settlements reduce consumption, this is the number of reductions that may exist */
        reduction: fields.NumberField<number, number, false, false>;
        total: fields.NumberField<number, number, false, false>;
    }>;
    storage: fields.SchemaField<Record<KingdomCommodity, fields.NumberField<number, number, false, false, true>>>;
};
type LeadershipSchema = {
    uuid: fields.DocumentUUIDField<ItemUUID>;
    vacant: fields.BooleanField;
    invested: fields.BooleanField<boolean, boolean, false, false, true>;
};
type RuinSchema = {
    value: fields.NumberField<number, number, true, false, true>;
    max: fields.NumberField<number, number, true, false, true>;
};
type KingdomSchema = {
    type: fields.StringField<"kingmaker", "kingmaker", true, false, true>;
    active: DataUnionField<StrictStringField<"building", "building", false, false, boolean> | StrictBooleanField<boolean, boolean, true>, false, false, boolean>;
    name: fields.StringField<string, string, true, false, true>;
    img: fields.FilePathField<ImageFilePath, ImageFilePath, true, false, true>;
    capital: fields.StringField<string, string, true, false, true>;
    size: fields.NumberField<number, number, true, false, true>;
    level: fields.NumberField<number, number, true, false, true>;
    xp: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        max: fields.NumberField<number, number, true, false, true>;
    }, {
        value: number;
        max: number;
    }, {
        value: number;
        max: number;
    }, true, false, true>;
    aspiration: fields.StringField<FameType, FameType, true, false, true>;
    abilities: fields.SchemaField<{
        [key in KingdomAbility]: fields.SchemaField<{
            value: fields.NumberField<number, number, false, false, true>;
            mod: fields.NumberField<number, number, false, false, true>;
            ruin: fields.SchemaField<RuinSchema>;
            penalty: fields.NumberField<number, number, false, false, true>;
        }>;
    }>;
    build: fields.SchemaField<BuildSchema>;
    customModifiers: fields.ObjectField<Record<string, RawModifier[]>>;
    leadership: fields.SchemaField<Record<KingdomLeadershipRole, fields.SchemaField<LeadershipSchema>>>;
    resources: fields.SchemaField<ResourceSchema>;
    /** A collection of settlements controlled by this kingdom, and its related data */
    settlements: RecordField<fields.StringField<string, string, true, false, false>, fields.SchemaField<SettlementSchema>>;
    consumption: fields.SchemaField<{
        settlement: fields.NumberField<number, number, false, false, true>;
        army: fields.NumberField<number, number, false, false>;
        value: fields.NumberField<number, number, false, false>;
        breakdown: fields.StringField;
    }>;
    unrest: fields.SchemaField<{
        value: fields.NumberField<number, number, false, false, true>;
        anarchyThreshold: fields.NumberField<number, number, false, false, true>;
    }>;
    event: fields.SchemaField<{
        dc: fields.NumberField<number, number, false, false, true>;
        text: fields.StringField<string, string, false, false, true>;
    }>;
    /** Any kingmaker specific module configuration and tweaks. Not used otherwise */
    module: fields.ObjectField<object>;
};
interface KingdomCHG extends ModelPropsFromSchema<CHGSchema> {
    feat?: ItemUUID | null;
    flaw?: KingdomAbility | null;
}
interface KingdomCharter extends KingdomCHG {
    feat?: never;
    flaw: KingdomAbility | null;
}
interface KingdomHeartland extends ModelPropsFromSchema<CHGSchema> {
    feat?: never;
    flaw?: never;
}
interface KingdomGovernment extends ModelPropsFromSchema<GovernmentSchema> {
    skills: KingdomSkill[];
    feat: ItemUUID | null;
    flaw?: never;
}
interface KingdomBuildData extends ModelPropsFromSchema<BuildSchema> {
    charter: KingdomCharter | null;
    heartland: KingdomHeartland | null;
    government: KingdomGovernment | null;
}
interface KingdomData extends ModelPropsFromSchema<KingdomSchema> {
    build: KingdomBuildData;
}
type KingdomAbilityData = KingdomData["abilities"][KingdomAbility];
type KingdomLeadershipData = KingdomData["leadership"][KingdomLeadershipRole];
type KingdomSettlementData = ModelPropsFromSchema<SettlementSchema>;
type KingdomSource = SourceFromSchema<KingdomSchema>;
export { defineKingdomSchema };
export type { KingdomAbilityData, KingdomBuildData, KingdomCHG, KingdomCharter, KingdomData, KingdomGovernment, KingdomHeartland, KingdomLeadershipData, KingdomSchema, KingdomSettlementData, KingdomSource, };
