import { RawModifier } from "@actor/modifiers.ts";
import { ZeroToFour } from "@module/data.ts";
import { DataUnionField, RecordField, StrictBooleanField, StrictStringField } from "@system/schema-data-fields.ts";
import type { ArrayField, SchemaField, StringField } from "types/foundry/common/data/fields.d.ts";
import { KingdomAbility } from "./types.ts";
declare const KINGDOM_SETTLEMENT_SCHEMA: {
    name: StringField<string, string, true, false, true>;
    type: StringField<"village" | "town" | "city" | "metropolis", "village" | "town" | "city" | "metropolis", false, false, true>;
    level: foundry.data.fields.NumberField<1, 1, false, false, true>;
    overcrowded: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
    description: StringField<string, string, false, false, true>;
    sort: foundry.data.fields.IntegerSortField<true, false, true>;
    consumption: SchemaField<{
        base: foundry.data.fields.NumberField<number, number, false, false, true>;
        /** Some settlements reduce consumption, this is the number of reductions that may exist */
        reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
        total: foundry.data.fields.NumberField<number, number, false, false, true>;
    }, SourceFromSchema<{
        base: foundry.data.fields.NumberField<number, number, false, false, true>;
        /** Some settlements reduce consumption, this is the number of reductions that may exist */
        reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
        total: foundry.data.fields.NumberField<number, number, false, false, true>;
    }>, ModelPropsFromSchema<{
        base: foundry.data.fields.NumberField<number, number, false, false, true>;
        /** Some settlements reduce consumption, this is the number of reductions that may exist */
        reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
        total: foundry.data.fields.NumberField<number, number, false, false, true>;
    }>, true, false, true>;
    storage: SchemaField<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>, SourceFromSchema<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>>, ModelPropsFromSchema<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>>, true, false, true>;
};
declare const KINGDOM_SCHEMA: {
    type: StringField<"kingmaker", "kingmaker", true, false, true>;
    active: DataUnionField<StrictStringField<"building", "building", false, false, boolean> | StrictBooleanField<boolean, boolean, true>, false, false, boolean>;
    name: StringField<string, string, true, false, true>;
    img: foundry.data.fields.FilePathField<`${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, `${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, true, false, true>;
    capital: StringField<"", "", true, false, true>;
    size: foundry.data.fields.NumberField<number, number, true, false, true>;
    level: foundry.data.fields.NumberField<number, number, true, false, true>;
    xp: SchemaField<{
        value: foundry.data.fields.NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
        max: foundry.data.fields.NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }, SourceFromSchema<{
        value: foundry.data.fields.NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
        max: foundry.data.fields.NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }>, ModelPropsFromSchema<{
        value: foundry.data.fields.NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
        max: foundry.data.fields.NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }>, true, false, true>;
    aspiration: StringField<"fame" | "infamy", "fame" | "infamy", true, false, true>;
    abilities: SchemaField<Record<"culture" | "economy" | "loyalty" | "stability", SchemaField<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        mod: foundry.data.fields.NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: foundry.data.fields.NumberField<number, number, false, false, true>;
    }, SourceFromSchema<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        mod: foundry.data.fields.NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: foundry.data.fields.NumberField<number, number, false, false, true>;
    }>, ModelPropsFromSchema<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        mod: foundry.data.fields.NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: foundry.data.fields.NumberField<number, number, false, false, true>;
    }>, true, false, true>>, SourceFromSchema<Record<"culture" | "economy" | "loyalty" | "stability", SchemaField<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        mod: foundry.data.fields.NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: foundry.data.fields.NumberField<number, number, false, false, true>;
    }, SourceFromSchema<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        mod: foundry.data.fields.NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: foundry.data.fields.NumberField<number, number, false, false, true>;
    }>, ModelPropsFromSchema<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        mod: foundry.data.fields.NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: foundry.data.fields.NumberField<number, number, false, false, true>;
    }>, true, false, true>>>, ModelPropsFromSchema<Record<"culture" | "economy" | "loyalty" | "stability", SchemaField<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        mod: foundry.data.fields.NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: foundry.data.fields.NumberField<number, number, false, false, true>;
    }, SourceFromSchema<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        mod: foundry.data.fields.NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: foundry.data.fields.NumberField<number, number, false, false, true>;
    }>, ModelPropsFromSchema<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        mod: foundry.data.fields.NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: foundry.data.fields.NumberField<number, number, false, false, true>;
    }>, true, false, true>>>, true, false, true>;
    build: SchemaField<{
        /** Determines if the ability scores are manually set or automatically determined. */
        manual: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        charter: SchemaField<{
            flaw: StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            flaw: StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            flaw: StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        heartland: SchemaField<{
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        government: SchemaField<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<`Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, `Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<`Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, `Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<`Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, `Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        skills: SchemaField<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        /** Boost selections made by the user, both during the build process and levelling */
        boosts: SchemaField<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>, SourceFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, ModelPropsFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, true, false, true>;
    }, SourceFromSchema<{
        /** Determines if the ability scores are manually set or automatically determined. */
        manual: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        charter: SchemaField<{
            flaw: StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            flaw: StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            flaw: StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        heartland: SchemaField<{
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        government: SchemaField<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<`Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, `Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<`Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, `Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<`Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, `Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        skills: SchemaField<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        /** Boost selections made by the user, both during the build process and levelling */
        boosts: SchemaField<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>, SourceFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, ModelPropsFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, true, false, true>;
    }>, ModelPropsFromSchema<{
        /** Determines if the ability scores are manually set or automatically determined. */
        manual: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        charter: SchemaField<{
            flaw: StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            flaw: StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            flaw: StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        heartland: SchemaField<{
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        government: SchemaField<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<`Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, `Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<`Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, `Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<`Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, `Compendium.${string}.Item.${string}` | `Compendium.${string}.Actor.${string}` | `Compendium.${string}.Cards.${string}` | `Compendium.${string}.JournalEntry.${string}` | `Compendium.${string}.Macro.${string}` | `Compendium.${string}.Playlist.${string}` | `Compendium.${string}.RollTable.${string}` | `Compendium.${string}.Scene.${string}` | `Compendium.${string}.Adventure.${string}`, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        skills: SchemaField<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: foundry.data.fields.NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        /** Boost selections made by the user, both during the build process and levelling */
        boosts: SchemaField<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>, SourceFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, ModelPropsFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, true, false, true>;
    }>, true, false, true>;
    customModifiers: foundry.data.fields.ObjectField<Record<string, RawModifier[]>, Record<string, RawModifier[]>, true, false, true>;
    leadership: SchemaField<Record<"general" | "ruler" | "counselor" | "emissary" | "magister" | "treasurer" | "viceroy" | "warden", SchemaField<{
        uuid: StringField<string, string, false, true, true>;
        vacant: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        invested: foundry.data.fields.BooleanField<boolean, boolean, false, false, true>;
    }, SourceFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        invested: foundry.data.fields.BooleanField<boolean, boolean, false, false, true>;
    }>, ModelPropsFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        invested: foundry.data.fields.BooleanField<boolean, boolean, false, false, true>;
    }>, true, false, true>>, SourceFromSchema<Record<"general" | "ruler" | "counselor" | "emissary" | "magister" | "treasurer" | "viceroy" | "warden", SchemaField<{
        uuid: StringField<string, string, false, true, true>;
        vacant: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        invested: foundry.data.fields.BooleanField<boolean, boolean, false, false, true>;
    }, SourceFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        invested: foundry.data.fields.BooleanField<boolean, boolean, false, false, true>;
    }>, ModelPropsFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        invested: foundry.data.fields.BooleanField<boolean, boolean, false, false, true>;
    }>, true, false, true>>>, ModelPropsFromSchema<Record<"general" | "ruler" | "counselor" | "emissary" | "magister" | "treasurer" | "viceroy" | "warden", SchemaField<{
        uuid: StringField<string, string, false, true, true>;
        vacant: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        invested: foundry.data.fields.BooleanField<boolean, boolean, false, false, true>;
    }, SourceFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        invested: foundry.data.fields.BooleanField<boolean, boolean, false, false, true>;
    }>, ModelPropsFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        invested: foundry.data.fields.BooleanField<boolean, boolean, false, false, true>;
    }>, true, false, true>>>, true, false, true>;
    resources: SchemaField<{
        dice: SchemaField<{
            number: foundry.data.fields.NumberField<number, number, false, true, true>;
            faces: foundry.data.fields.NumberField<number, number, false, true, true>;
            bonus: foundry.data.fields.NumberField<number, number, true, false, true>;
            penalty: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            number: foundry.data.fields.NumberField<number, number, false, true, true>;
            faces: foundry.data.fields.NumberField<number, number, false, true, true>;
            bonus: foundry.data.fields.NumberField<number, number, true, false, true>;
            penalty: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            number: foundry.data.fields.NumberField<number, number, false, true, true>;
            faces: foundry.data.fields.NumberField<number, number, false, true, true>;
            bonus: foundry.data.fields.NumberField<number, number, true, false, true>;
            penalty: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        fame: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        commodities: SchemaField<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        points: foundry.data.fields.NumberField<number, number, false, false, true>;
        /** Worksites by commodity type, for the commodities that can have work sites */
        workSites: SchemaField<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, true, false, true>;
    }, SourceFromSchema<{
        dice: SchemaField<{
            number: foundry.data.fields.NumberField<number, number, false, true, true>;
            faces: foundry.data.fields.NumberField<number, number, false, true, true>;
            bonus: foundry.data.fields.NumberField<number, number, true, false, true>;
            penalty: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            number: foundry.data.fields.NumberField<number, number, false, true, true>;
            faces: foundry.data.fields.NumberField<number, number, false, true, true>;
            bonus: foundry.data.fields.NumberField<number, number, true, false, true>;
            penalty: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            number: foundry.data.fields.NumberField<number, number, false, true, true>;
            faces: foundry.data.fields.NumberField<number, number, false, true, true>;
            bonus: foundry.data.fields.NumberField<number, number, true, false, true>;
            penalty: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        fame: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        commodities: SchemaField<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        points: foundry.data.fields.NumberField<number, number, false, false, true>;
        /** Worksites by commodity type, for the commodities that can have work sites */
        workSites: SchemaField<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, true, false, true>;
    }>, ModelPropsFromSchema<{
        dice: SchemaField<{
            number: foundry.data.fields.NumberField<number, number, false, true, true>;
            faces: foundry.data.fields.NumberField<number, number, false, true, true>;
            bonus: foundry.data.fields.NumberField<number, number, true, false, true>;
            penalty: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            number: foundry.data.fields.NumberField<number, number, false, true, true>;
            faces: foundry.data.fields.NumberField<number, number, false, true, true>;
            bonus: foundry.data.fields.NumberField<number, number, true, false, true>;
            penalty: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            number: foundry.data.fields.NumberField<number, number, false, true, true>;
            faces: foundry.data.fields.NumberField<number, number, false, true, true>;
            bonus: foundry.data.fields.NumberField<number, number, true, false, true>;
            penalty: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        fame: SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        commodities: SchemaField<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: foundry.data.fields.NumberField<number, number, true, false, true>;
            max: foundry.data.fields.NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        points: foundry.data.fields.NumberField<number, number, false, false, true>;
        /** Worksites by commodity type, for the commodities that can have work sites */
        workSites: SchemaField<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, true, false, true>;
    }>, true, false, true>;
    /** A collection of settlements controlled by this kingdom, and its related data */
    settlements: RecordField<StringField<string, string, true, false, false>, SchemaField<{
        name: StringField<string, string, true, false, true>;
        type: StringField<"village" | "town" | "city" | "metropolis", "village" | "town" | "city" | "metropolis", false, false, true>;
        level: foundry.data.fields.NumberField<1, 1, false, false, true>;
        overcrowded: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        description: StringField<string, string, false, false, true>;
        sort: foundry.data.fields.IntegerSortField<true, false, true>;
        consumption: SchemaField<{
            base: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
            total: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            base: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
            total: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            base: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
            total: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>;
        storage: SchemaField<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>, SourceFromSchema<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>>, ModelPropsFromSchema<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>>, true, false, true>;
    }, SourceFromSchema<{
        name: StringField<string, string, true, false, true>;
        type: StringField<"village" | "town" | "city" | "metropolis", "village" | "town" | "city" | "metropolis", false, false, true>;
        level: foundry.data.fields.NumberField<1, 1, false, false, true>;
        overcrowded: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        description: StringField<string, string, false, false, true>;
        sort: foundry.data.fields.IntegerSortField<true, false, true>;
        consumption: SchemaField<{
            base: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
            total: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            base: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
            total: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            base: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
            total: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>;
        storage: SchemaField<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>, SourceFromSchema<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>>, ModelPropsFromSchema<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>>, true, false, true>;
    }>, ModelPropsFromSchema<{
        name: StringField<string, string, true, false, true>;
        type: StringField<"village" | "town" | "city" | "metropolis", "village" | "town" | "city" | "metropolis", false, false, true>;
        level: foundry.data.fields.NumberField<1, 1, false, false, true>;
        overcrowded: foundry.data.fields.BooleanField<boolean, boolean, true, false, true>;
        description: StringField<string, string, false, false, true>;
        sort: foundry.data.fields.IntegerSortField<true, false, true>;
        consumption: SchemaField<{
            base: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
            total: foundry.data.fields.NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            base: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
            total: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            base: foundry.data.fields.NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: foundry.data.fields.NumberField<number, number, false, false, true>;
            total: foundry.data.fields.NumberField<number, number, false, false, true>;
        }>, true, false, true>;
        storage: SchemaField<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>, SourceFromSchema<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>>, ModelPropsFromSchema<Record<string, foundry.data.fields.NumberField<number, number, false, false, true>>>, true, false, true>;
    }>, true, false, true>, false, false, true, false>;
    consumption: SchemaField<{
        settlement: foundry.data.fields.NumberField<number, number, false, false, true>;
        army: foundry.data.fields.NumberField<number, number, false, false, true>;
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        breakdown: StringField<string, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }, SourceFromSchema<{
        settlement: foundry.data.fields.NumberField<number, number, false, false, true>;
        army: foundry.data.fields.NumberField<number, number, false, false, true>;
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        breakdown: StringField<string, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }>, ModelPropsFromSchema<{
        settlement: foundry.data.fields.NumberField<number, number, false, false, true>;
        army: foundry.data.fields.NumberField<number, number, false, false, true>;
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        breakdown: StringField<string, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }>, true, false, true>;
    unrest: SchemaField<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        anarchyThreshold: foundry.data.fields.NumberField<number, number, false, false, true>;
    }, SourceFromSchema<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        anarchyThreshold: foundry.data.fields.NumberField<number, number, false, false, true>;
    }>, ModelPropsFromSchema<{
        value: foundry.data.fields.NumberField<number, number, false, false, true>;
        anarchyThreshold: foundry.data.fields.NumberField<number, number, false, false, true>;
    }>, true, false, true>;
    event: SchemaField<{
        dc: foundry.data.fields.NumberField<number, number, false, false, true>;
        text: StringField<string, string, false, false, true>;
    }, SourceFromSchema<{
        dc: foundry.data.fields.NumberField<number, number, false, false, true>;
        text: StringField<string, string, false, false, true>;
    }>, ModelPropsFromSchema<{
        dc: foundry.data.fields.NumberField<number, number, false, false, true>;
        text: StringField<string, string, false, false, true>;
    }>, true, false, true>;
    /** Any kingmaker specific module configuration and tweaks. Not used otherwise */
    module: foundry.data.fields.ObjectField<{}, {}, false, false, true>;
};
export { KINGDOM_SCHEMA, KINGDOM_SETTLEMENT_SCHEMA };
