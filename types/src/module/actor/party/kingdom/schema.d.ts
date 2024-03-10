import { RawModifier } from "@actor/modifiers.ts";
import { ZeroToFour } from "@module/data.ts";
import { DataUnionField, RecordField, StrictBooleanField, StrictStringField } from "@system/schema-data-fields.ts";
import type { ArrayField, SchemaField, StringField } from "types/foundry/common/data/fields.d.ts";
import { KingdomAbility } from "./types.ts";
declare const KINGDOM_SETTLEMENT_SCHEMA: {
    name: StringField<string, string, true, false, true>;
    type: StringField<"village" | "town" | "city" | "metropolis", "village" | "town" | "city" | "metropolis", false, false, true>;
    level: import("types/foundry/common/data/fields.d.ts").NumberField<1, 1, false, false, true>;
    overcrowded: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
    description: StringField<string, string, false, false, true>;
    sort: import("types/foundry/common/data/fields.d.ts").IntegerSortField<true, false, true>;
    consumption: SchemaField<{
        base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        /** Some settlements reduce consumption, this is the number of reductions that may exist */
        reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }, SourceFromSchema<{
        base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        /** Some settlements reduce consumption, this is the number of reductions that may exist */
        reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }>, ModelPropsFromSchema<{
        base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        /** Some settlements reduce consumption, this is the number of reductions that may exist */
        reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }>, true, false, true>;
    storage: SchemaField<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>, SourceFromSchema<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>>, ModelPropsFromSchema<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>>, true, false, true>;
};
declare const KINGDOM_SCHEMA: {
    type: StringField<"kingmaker", "kingmaker", true, false, true>;
    active: DataUnionField<StrictStringField<"building", "building", false, false, boolean> | StrictBooleanField<boolean, boolean, true>, false, false, boolean>;
    name: StringField<string, string, true, false, true>;
    img: import("types/foundry/common/data/fields.d.ts").FilePathField<`${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, `${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, true, false, true>;
    capital: StringField<"", "", true, false, true>;
    size: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
    level: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
    xp: SchemaField<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
        max: import("types/foundry/common/data/fields.d.ts").NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }, SourceFromSchema<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
        max: import("types/foundry/common/data/fields.d.ts").NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }>, ModelPropsFromSchema<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
        max: import("types/foundry/common/data/fields.d.ts").NumberField<number, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }>, true, false, true>;
    aspiration: StringField<"fame" | "infamy", "fame" | "infamy", true, false, true>;
    abilities: SchemaField<Record<"culture" | "economy" | "loyalty" | "stability", SchemaField<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        mod: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }, SourceFromSchema<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        mod: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }>, ModelPropsFromSchema<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        mod: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }>, true, false, true>>, SourceFromSchema<Record<"culture" | "economy" | "loyalty" | "stability", SchemaField<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        mod: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }, SourceFromSchema<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        mod: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }>, ModelPropsFromSchema<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        mod: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }>, true, false, true>>>, ModelPropsFromSchema<Record<"culture" | "economy" | "loyalty" | "stability", SchemaField<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        mod: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }, SourceFromSchema<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        mod: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }>, ModelPropsFromSchema<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        mod: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        ruin: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, NonNullable<JSONValue>, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }>, true, false, true>>>, true, false, true>;
    build: SchemaField<{
        /** Determines if the ability scores are manually set or automatically determined. */
        manual: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
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
            feat: StringField<CompendiumUUID, CompendiumUUID, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<CompendiumUUID, CompendiumUUID, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<CompendiumUUID, CompendiumUUID, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        skills: SchemaField<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        /** Boost selections made by the user, both during the build process and levelling */
        boosts: SchemaField<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>, SourceFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, ModelPropsFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, true, false, true>;
    }, SourceFromSchema<{
        /** Determines if the ability scores are manually set or automatically determined. */
        manual: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
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
            feat: StringField<CompendiumUUID, CompendiumUUID, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<CompendiumUUID, CompendiumUUID, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<CompendiumUUID, CompendiumUUID, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        skills: SchemaField<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        /** Boost selections made by the user, both during the build process and levelling */
        boosts: SchemaField<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>, SourceFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, ModelPropsFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, true, false, true>;
    }>, ModelPropsFromSchema<{
        /** Determines if the ability scores are manually set or automatically determined. */
        manual: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
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
            feat: StringField<CompendiumUUID, CompendiumUUID, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }, SourceFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<CompendiumUUID, CompendiumUUID, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, ModelPropsFromSchema<{
            skills: ArrayField<StringField<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", "magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", true, false, true>, ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], ("magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness")[], false, false, true>;
            feat: StringField<CompendiumUUID, CompendiumUUID, true, true, true>;
            id: StringField<string, string, false, false>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
        }>, true, true, true>;
        skills: SchemaField<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"magic" | "exploration" | "defense" | "agriculture" | "arts" | "boating" | "engineering" | "folklore" | "industry" | "intrigue" | "politics" | "scholarship" | "statecraft" | "trade" | "warfare" | "wilderness", SchemaField<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }, SourceFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, ModelPropsFromSchema<{
            rank: import("types/foundry/common/data/fields.d.ts").NumberField<ZeroToFour, ZeroToFour, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        /** Boost selections made by the user, both during the build process and levelling */
        boosts: SchemaField<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>, SourceFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, ModelPropsFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, true>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, true, false, true>;
    }>, true, false, true>;
    customModifiers: import("types/foundry/common/data/fields.d.ts").ObjectField<Record<string, RawModifier[]>, Record<string, RawModifier[]>, true, false, true>;
    leadership: SchemaField<Record<"general" | "ruler" | "counselor" | "emissary" | "magister" | "treasurer" | "viceroy" | "warden", SchemaField<{
        uuid: StringField<string, string, false, true, true>;
        vacant: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, false, false, true>;
    }, SourceFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, false, false, true>;
    }>, ModelPropsFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, false, false, true>;
    }>, true, false, true>>, SourceFromSchema<Record<"general" | "ruler" | "counselor" | "emissary" | "magister" | "treasurer" | "viceroy" | "warden", SchemaField<{
        uuid: StringField<string, string, false, true, true>;
        vacant: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, false, false, true>;
    }, SourceFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, false, false, true>;
    }>, ModelPropsFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, false, false, true>;
    }>, true, false, true>>>, ModelPropsFromSchema<Record<"general" | "ruler" | "counselor" | "emissary" | "magister" | "treasurer" | "viceroy" | "warden", SchemaField<{
        uuid: StringField<string, string, false, true, true>;
        vacant: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, false, false, true>;
    }, SourceFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, false, false, true>;
    }>, ModelPropsFromSchema<{
        uuid: StringField<string, string, false, true, true>;
        vacant: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, false, false, true>;
    }>, true, false, true>>>, true, false, true>;
    resources: SchemaField<{
        dice: SchemaField<{
            number: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            faces: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            bonus: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            number: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            faces: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            bonus: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            number: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            faces: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            bonus: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        fame: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        commodities: SchemaField<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        points: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        /** Worksites by commodity type, for the commodities that can have work sites */
        workSites: SchemaField<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, true, false, true>;
    }, SourceFromSchema<{
        dice: SchemaField<{
            number: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            faces: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            bonus: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            number: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            faces: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            bonus: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            number: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            faces: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            bonus: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        fame: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        commodities: SchemaField<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        points: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        /** Worksites by commodity type, for the commodities that can have work sites */
        workSites: SchemaField<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, true, false, true>;
    }>, ModelPropsFromSchema<{
        dice: SchemaField<{
            number: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            faces: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            bonus: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            number: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            faces: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            bonus: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            number: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            faces: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, true, true>;
            bonus: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            penalty: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        fame: SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>;
        commodities: SchemaField<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<"stone" | "food" | "luxuries" | "lumber" | "ore", SchemaField<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, true, false, true>;
        }>, true, false, true>>>, true, false, true>;
        points: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        /** Worksites by commodity type, for the commodities that can have work sites */
        workSites: SchemaField<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>>, SourceFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, ModelPropsFromSchema<Record<string, SchemaField<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            /** The number of regular non-resource work sites */
            value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** The number of worksites that are on resource hexes (these grant double) */
            resource: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>>>, true, false, true>;
    }>, true, false, true>;
    /** A collection of settlements controlled by this kingdom, and its related data */
    settlements: RecordField<StringField<string, string, true, false, false>, SchemaField<{
        name: StringField<string, string, true, false, true>;
        type: StringField<"village" | "town" | "city" | "metropolis", "village" | "town" | "city" | "metropolis", false, false, true>;
        level: import("types/foundry/common/data/fields.d.ts").NumberField<1, 1, false, false, true>;
        overcrowded: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        description: StringField<string, string, false, false, true>;
        sort: import("types/foundry/common/data/fields.d.ts").IntegerSortField<true, false, true>;
        consumption: SchemaField<{
            base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>;
        storage: SchemaField<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>, SourceFromSchema<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>>, ModelPropsFromSchema<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>>, true, false, true>;
    }, SourceFromSchema<{
        name: StringField<string, string, true, false, true>;
        type: StringField<"village" | "town" | "city" | "metropolis", "village" | "town" | "city" | "metropolis", false, false, true>;
        level: import("types/foundry/common/data/fields.d.ts").NumberField<1, 1, false, false, true>;
        overcrowded: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        description: StringField<string, string, false, false, true>;
        sort: import("types/foundry/common/data/fields.d.ts").IntegerSortField<true, false, true>;
        consumption: SchemaField<{
            base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>;
        storage: SchemaField<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>, SourceFromSchema<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>>, ModelPropsFromSchema<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>>, true, false, true>;
    }>, ModelPropsFromSchema<{
        name: StringField<string, string, true, false, true>;
        type: StringField<"village" | "town" | "city" | "metropolis", "village" | "town" | "city" | "metropolis", false, false, true>;
        level: import("types/foundry/common/data/fields.d.ts").NumberField<1, 1, false, false, true>;
        overcrowded: import("types/foundry/common/data/fields.d.ts").BooleanField<boolean, boolean, true, false, true>;
        description: StringField<string, string, false, false, true>;
        sort: import("types/foundry/common/data/fields.d.ts").IntegerSortField<true, false, true>;
        consumption: SchemaField<{
            base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }, SourceFromSchema<{
            base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, ModelPropsFromSchema<{
            base: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            /** Some settlements reduce consumption, this is the number of reductions that may exist */
            reduction: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
            total: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        }>, true, false, true>;
        storage: SchemaField<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>, SourceFromSchema<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>>, ModelPropsFromSchema<Record<string, import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>>>, true, false, true>;
    }>, true, false, true>, false, false, true>;
    consumption: SchemaField<{
        settlement: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        army: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        breakdown: StringField<string, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }, SourceFromSchema<{
        settlement: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        army: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        breakdown: StringField<string, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }>, ModelPropsFromSchema<{
        settlement: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        army: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        breakdown: StringField<string, NonNullable<JSONValue>, boolean, boolean, boolean>;
    }>, true, false, true>;
    unrest: SchemaField<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        anarchyThreshold: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }, SourceFromSchema<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        anarchyThreshold: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }>, ModelPropsFromSchema<{
        value: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        anarchyThreshold: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
    }>, true, false, true>;
    event: SchemaField<{
        dc: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        text: StringField<string, string, false, false, true>;
    }, SourceFromSchema<{
        dc: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        text: StringField<string, string, false, false, true>;
    }>, ModelPropsFromSchema<{
        dc: import("types/foundry/common/data/fields.d.ts").NumberField<number, number, false, false, true>;
        text: StringField<string, string, false, false, true>;
    }>, true, false, true>;
    /** Any kingmaker specific module configuration and tweaks. Not used otherwise */
    module: import("types/foundry/common/data/fields.d.ts").ObjectField<{}, {}, false, false, true>;
};
export { KINGDOM_SCHEMA, KINGDOM_SETTLEMENT_SCHEMA };
