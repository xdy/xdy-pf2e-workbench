import { ArrayField, StringField } from "types/foundry/common/data/fields.js";
import { KingdomAbility } from "./data.ts";
declare const KINGDOM_SCHEMA: {
    type: StringField<"kingmaker", "kingmaker", true, false, boolean>;
    capital: StringField<"", "", true, boolean, boolean>;
    size: import("types/foundry/common/data/fields.js").NumberField<1, 1, true, false, true>;
    level: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
    xp: import("types/foundry/common/data/fields.js").SchemaField<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
    }, SourceFromSchema<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
    }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
    }>, true, false, true>;
    active: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, true, false, true>;
    abilities: import("types/foundry/common/data/fields.js").SchemaField<Record<"culture" | "economy" | "loyalty" | "stability", import("types/foundry/common/data/fields.js").SchemaField<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        ruin: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }>, unknown, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
    }, SourceFromSchema<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        ruin: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }>, unknown, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
    }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        ruin: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }>, unknown, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
    }>, true, false, true>>, SourceFromSchema<Record<"culture" | "economy" | "loyalty" | "stability", import("types/foundry/common/data/fields.js").SchemaField<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        ruin: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }>, unknown, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
    }, SourceFromSchema<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        ruin: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }>, unknown, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
    }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        ruin: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }>, unknown, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
    }>, true, false, true>>>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<Record<"culture" | "economy" | "loyalty" | "stability", import("types/foundry/common/data/fields.js").SchemaField<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        ruin: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }>, unknown, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
    }, SourceFromSchema<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        ruin: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }>, unknown, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
    }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
        value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        ruin: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
        }>, unknown, boolean, boolean, boolean>;
        penalty: import("types/foundry/common/data/fields.js").NumberField<number, number, true, false, true>;
    }>, true, false, true>>>, true, false, true>;
    leadership: import("types/foundry/common/data/fields.js").SchemaField<Record<"general" | "ruler" | "counselor" | "emissary" | "magister" | "treasurer" | "viceroy" | "warden", import("types/foundry/common/data/fields.js").SchemaField<{
        img: import("types/foundry/common/data/fields.js").FilePathField<`${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, unknown, boolean, boolean, boolean>;
        name: StringField<string, string, false, boolean, boolean>;
        vacant: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, false, false, true>;
    }, SourceFromSchema<{
        img: import("types/foundry/common/data/fields.js").FilePathField<`${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, unknown, boolean, boolean, boolean>;
        name: StringField<string, string, false, boolean, boolean>;
        vacant: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, false, false, true>;
    }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
        img: import("types/foundry/common/data/fields.js").FilePathField<`${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, unknown, boolean, boolean, boolean>;
        name: StringField<string, string, false, boolean, boolean>;
        vacant: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, false, false, true>;
    }>, true, false, true>>, SourceFromSchema<Record<"general" | "ruler" | "counselor" | "emissary" | "magister" | "treasurer" | "viceroy" | "warden", import("types/foundry/common/data/fields.js").SchemaField<{
        img: import("types/foundry/common/data/fields.js").FilePathField<`${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, unknown, boolean, boolean, boolean>;
        name: StringField<string, string, false, boolean, boolean>;
        vacant: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, false, false, true>;
    }, SourceFromSchema<{
        img: import("types/foundry/common/data/fields.js").FilePathField<`${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, unknown, boolean, boolean, boolean>;
        name: StringField<string, string, false, boolean, boolean>;
        vacant: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, false, false, true>;
    }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
        img: import("types/foundry/common/data/fields.js").FilePathField<`${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, unknown, boolean, boolean, boolean>;
        name: StringField<string, string, false, boolean, boolean>;
        vacant: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, false, false, true>;
    }>, true, false, true>>>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<Record<"general" | "ruler" | "counselor" | "emissary" | "magister" | "treasurer" | "viceroy" | "warden", import("types/foundry/common/data/fields.js").SchemaField<{
        img: import("types/foundry/common/data/fields.js").FilePathField<`${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, unknown, boolean, boolean, boolean>;
        name: StringField<string, string, false, boolean, boolean>;
        vacant: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, false, false, true>;
    }, SourceFromSchema<{
        img: import("types/foundry/common/data/fields.js").FilePathField<`${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, unknown, boolean, boolean, boolean>;
        name: StringField<string, string, false, boolean, boolean>;
        vacant: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, false, false, true>;
    }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
        img: import("types/foundry/common/data/fields.js").FilePathField<`${string}.apng` | `${string}.avif` | `${string}.bmp` | `${string}.gif` | `${string}.jpeg` | `${string}.jpg` | `${string}.png` | `${string}.svg` | `${string}.tiff` | `${string}.webp`, unknown, boolean, boolean, boolean>;
        name: StringField<string, string, false, boolean, boolean>;
        vacant: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, true, false, true>;
        invested: import("types/foundry/common/data/fields.js").BooleanField<boolean, boolean, false, false, true>;
    }>, true, false, true>>>, true, false, true>;
    attributes: import("types/foundry/common/data/fields.js").SchemaField<{
        controlDC: import("types/foundry/common/data/fields.js").SchemaField<{}, SourceFromSchema<{}>, unknown, boolean, boolean, boolean>;
        eventDC: import("types/foundry/common/data/fields.js").SchemaField<{}, SourceFromSchema<{}>, unknown, boolean, boolean, boolean>;
    }, SourceFromSchema<{
        controlDC: import("types/foundry/common/data/fields.js").SchemaField<{}, SourceFromSchema<{}>, unknown, boolean, boolean, boolean>;
        eventDC: import("types/foundry/common/data/fields.js").SchemaField<{}, SourceFromSchema<{}>, unknown, boolean, boolean, boolean>;
    }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
        controlDC: import("types/foundry/common/data/fields.js").SchemaField<{}, SourceFromSchema<{}>, unknown, boolean, boolean, boolean>;
        eventDC: import("types/foundry/common/data/fields.js").SchemaField<{}, SourceFromSchema<{}>, unknown, boolean, boolean, boolean>;
    }>, true, false, true>;
    build: import("types/foundry/common/data/fields.js").SchemaField<{
        charter: import("types/foundry/common/data/fields.js").SchemaField<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }, SourceFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, true, true, true>;
        heartland: import("types/foundry/common/data/fields.js").SchemaField<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }, SourceFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, true, true, true>;
        government: import("types/foundry/common/data/fields.js").SchemaField<{
            skills: ArrayField<StringField<string, string, true, false, boolean>, string[], string[], false, false, true>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }, SourceFromSchema<{
            skills: ArrayField<StringField<string, string, true, false, boolean>, string[], string[], false, false, true>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            skills: ArrayField<StringField<string, string, true, false, boolean>, string[], string[], false, false, true>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, true, true, true>;
        boosts: import("types/foundry/common/data/fields.js").SchemaField<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, boolean>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>, SourceFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, boolean>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, boolean>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, true, false, true>;
    }, SourceFromSchema<{
        charter: import("types/foundry/common/data/fields.js").SchemaField<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }, SourceFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, true, true, true>;
        heartland: import("types/foundry/common/data/fields.js").SchemaField<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }, SourceFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, true, true, true>;
        government: import("types/foundry/common/data/fields.js").SchemaField<{
            skills: ArrayField<StringField<string, string, true, false, boolean>, string[], string[], false, false, true>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }, SourceFromSchema<{
            skills: ArrayField<StringField<string, string, true, false, boolean>, string[], string[], false, false, true>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            skills: ArrayField<StringField<string, string, true, false, boolean>, string[], string[], false, false, true>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, true, true, true>;
        boosts: import("types/foundry/common/data/fields.js").SchemaField<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, boolean>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>, SourceFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, boolean>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, boolean>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, true, false, true>;
    }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
        charter: import("types/foundry/common/data/fields.js").SchemaField<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }, SourceFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, true, true, true>;
        heartland: import("types/foundry/common/data/fields.js").SchemaField<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }, SourceFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, true, true, true>;
        government: import("types/foundry/common/data/fields.js").SchemaField<{
            skills: ArrayField<StringField<string, string, true, false, boolean>, string[], string[], false, false, true>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }, SourceFromSchema<{
            skills: ArrayField<StringField<string, string, true, false, boolean>, string[], string[], false, false, true>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            skills: ArrayField<StringField<string, string, true, false, boolean>, string[], string[], false, false, true>;
            name: StringField<string, string, true, false>;
            img: StringField<ImageFilePath, ImageFilePath, true, false>;
            description: StringField<string, string, true, false>;
            boosts: ArrayField<StringField<KingdomAbility | "free", KingdomAbility | "free", true, false>>;
            flaw: StringField<KingdomAbility, KingdomAbility, true, true>;
        }>, true, true, true>;
        boosts: import("types/foundry/common/data/fields.js").SchemaField<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, boolean>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>, SourceFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, boolean>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<Record<"1" | "5" | "10" | "15" | "20" | "charter" | "heartland" | "government", ArrayField<StringField<"culture" | "economy" | "loyalty" | "stability", "culture" | "economy" | "loyalty" | "stability", true, false, boolean>, ("culture" | "economy" | "loyalty" | "stability")[], ("culture" | "economy" | "loyalty" | "stability")[], false, false, true>>>, true, false, true>;
    }>, true, false, true>;
    resources: import("types/foundry/common/data/fields.js").SchemaField<{
        fame: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>;
        commodities: import("types/foundry/common/data/fields.js").SchemaField<Record<"stone" | "food" | "lumber" | "luxuries" | "ore", import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>>, SourceFromSchema<Record<"stone" | "food" | "lumber" | "luxuries" | "ore", import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>>>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<Record<"stone" | "food" | "lumber" | "luxuries" | "ore", import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>>>, true, false, true>;
    }, SourceFromSchema<{
        fame: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>;
        commodities: import("types/foundry/common/data/fields.js").SchemaField<Record<"stone" | "food" | "lumber" | "luxuries" | "ore", import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>>, SourceFromSchema<Record<"stone" | "food" | "lumber" | "luxuries" | "ore", import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>>>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<Record<"stone" | "food" | "lumber" | "luxuries" | "ore", import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>>>, true, false, true>;
    }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
        fame: import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>;
        commodities: import("types/foundry/common/data/fields.js").SchemaField<Record<"stone" | "food" | "lumber" | "luxuries" | "ore", import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>>, SourceFromSchema<Record<"stone" | "food" | "lumber" | "luxuries" | "ore", import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>>>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<Record<"stone" | "food" | "lumber" | "luxuries" | "ore", import("types/foundry/common/data/fields.js").SchemaField<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }, SourceFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, import("types/foundry/common/data/fields.js").ModelPropsFromSchema<{
            value: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            max: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxBase: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
            maxExtra: import("types/foundry/common/data/fields.js").NumberField<number, unknown, boolean, boolean, boolean>;
        }>, true, false, true>>>, true, false, true>;
    }>, true, false, true>;
};
export { KINGDOM_SCHEMA };
