import type { Language, SenseAcuity, SenseType } from "./types.ts";

declare const ALLIANCES: Set<"party" | "opposition" | null>;
declare const SAVING_THROW_ATTRIBUTES: {
    readonly fortitude: "con";
    readonly reflex: "dex";
    readonly will: "wis";
};
/** Use the lower end of CRB Table 9-1 ("Size and Reach"), allowing individual attacks to specify otherwise */
declare const SIZE_TO_REACH: {
    readonly tiny: 0;
    readonly sm: 5;
    readonly med: 5;
    readonly lg: 5;
    readonly huge: 10;
    readonly grg: 15;
};
declare const SENSE_TYPES: Set<"darkvision" | "echolocation" | "greater-darkvision" | "infrared-vision" | "lifesense" | "low-light-vision" | "magicsense" | "motion-sense" | "scent" | "see-invisibility" | "spiritsense" | "thoughtsense" | "tremorsense" | "truesight" | "wavesense">;
/** Sense types associated with a particular acuities by definition */
declare const SENSES_WITH_MANDATORY_ACUITIES: {
    [K in SenseType]?: SenseAcuity;
};
declare const SENSES_WITH_UNLIMITED_RANGE: readonly ["darkvision", "greater-darkvision", "low-light-vision", "see-invisibility"];
declare const SENSE_ACUITIES: readonly ["precise", "imprecise", "vague"];
declare const LANGUAGES_BY_RARITY: {
    common: readonly ["draconic", "dwarven", "elven", "fey", "gnomish", "goblin", "halfling", "jotun", "orcish", "sakvroth", "taldane"];
    uncommon: readonly ["adlet", "aklo", "alghollthu", "amurrun", "arboreal", "boggard", "calda", "caligni", "chthonian", "cyclops", "daemonic", "diabolic", "ekujae", "empyrean", "grippli", "hallit", "iruxi", "kelish", "kholo", "kibwani", "kitsune", "lirgeni", "muan", "mwangi", "mzunu", "nagaji", "necril", "ocotan", "osiriani", "petran", "protean", "pyric", "requian", "shadowtongue", "shoanti", "skald", "sphinx", "sussuran", "tang", "tengu", "thalassic", "tien", "utopian", "vanara", "varisian", "vudrani", "xanmba", "wayang", "ysoki"];
    rare: readonly ["akitonian", "anadi", "ancient-osiriani", "androffan", "anugobu", "arcadian", "azlanti", "destrachan", "drooni", "dziriak", "elder-thing", "erutaki", "formian", "garundi", "girtablilu", "goloma", "grioth", "hwan", "iblydan", "ikeshti", "immolis", "jistkan", "jyoti", "kaava", "kashrishi", "kovintal", "lashunta", "mahwek", "migo", "minaten", "minkaian", "munavri", "okaiyan", "orvian", "rasu", "ratajin", "razatlani", "russian", "samsaran", "sasquatch", "senzar", "shae", "shisk", "shobhad", "shoony", "shory", "strix", "surki", "talican", "tanuki", "tekritanin", "thassilonian", "varki", "vishkanyan", "wyrwood", "yaksha", "yithian"];
    secret: readonly ["wildsong"];
};
declare const LANGUAGES: Language[];
declare const LANGUAGE_RARITIES: readonly ["common", "uncommon", "rare", "secret"];
export { ALLIANCES, LANGUAGES, LANGUAGES_BY_RARITY, LANGUAGE_RARITIES, SAVING_THROW_ATTRIBUTES, SENSES_WITH_MANDATORY_ACUITIES, SENSES_WITH_UNLIMITED_RANGE, SENSE_ACUITIES, SENSE_TYPES, SIZE_TO_REACH, };
