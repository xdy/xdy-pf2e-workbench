import type { ActorAttributes, ActorDetails, BaseActorSourcePF2e } from "@actor/data/base.ts";
import { ActorSystemModel, ActorSystemSchema } from "@actor/data/model.ts";
import type { ModelPropFromDataField, SourcePropFromDataField } from "types/foundry/common/data/fields.d.ts";
import type { PartyPF2e } from "./document.ts";
import type { KingdomSchema } from "./kingdom/schema.ts";
import fields = foundry.data.fields;

type PartySource = BaseActorSourcePF2e<"party", PartySystemSource>;
declare class PartySystemData extends ActorSystemModel<PartyPF2e, PartySystemSchema> {
    static defineSchema(): PartySystemSchema;
}
interface PartySystemData extends ActorSystemModel<PartyPF2e, PartySystemSchema>, ModelPropsFromSchema<PartySystemSchema> {
    attributes: PartyAttributes;
    details: PartyDetails;
}
type PartySystemSchema = ActorSystemSchema & {
    details: fields.SchemaField<{
        description: fields.HTMLField<string, string, true, false, true>;
        members: fields.ArrayField<fields.SchemaField<{
            uuid: fields.DocumentUUIDField<ActorUUID, true, false, false>;
        }>>;
    }>;
    campaign: fields.SchemaField<KingdomSchema, SourceFromSchema<KingdomSchema>, ModelPropsFromSchema<KingdomSchema>, false, true, true>;
};
interface PartySystemSource extends SourceFromSchema<PartySystemSchema> {
    details: PartyDetailsSource;
    attributes?: never;
    traits?: never;
    schema?: never;
}
interface PartyDetailsSource extends SourcePropFromDataField<PartySystemSchema["details"]> {
    readonly alliance?: never;
    readonly level?: never;
}
interface PartyAttributes extends Omit<ActorAttributes, "initiative" | "ac" | "hp"> {
    immunities: never[];
    weaknesses: never[];
    resistances: never[];
    speed: {
        total: number;
    };
}
interface PartyDetails extends ModelPropFromDataField<PartySystemSchema["details"]>, ActorDetails {
}
type PartyCampaignSource = {
    type: string;
} & Record<string, JSONValue>;
export { PartySystemData };
export type { PartyCampaignSource, PartySource };
