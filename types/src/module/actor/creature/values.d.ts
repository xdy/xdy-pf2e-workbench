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
declare const SENSE_TYPES: Set<"darkvision" | "echolocation" | "greater-darkvision" | "infrared-vision" | "lifesense" | "low-light-vision" | "motion-sense" | "scent" | "see-invisibility" | "spiritsense" | "thoughtsense" | "tremorsense" | "truesight" | "wavesense">;
/** Sense types associated with a particular acuities by definition */
declare const SENSES_WITH_MANDATORY_ACUITIES: {
    [K in SenseType]?: SenseAcuity;
};
declare const SENSES_WITH_UNLIMITED_RANGE: readonly ["darkvision", "greater-darkvision", "low-light-vision", "see-invisibility"];
declare const SENSE_ACUITIES: readonly ["precise", "imprecise", "vague"];
declare const LANGUAGES_BY_RARITY: {
    common: readonly ["draconic", "dwarven", "elven", "fey", "gnomish", "goblin", "halfling", "jotun", "orcish", "sakvroth", "taldane"];
    uncommon: readonly ["adlet", "aklo", "alghollthu", "amurrun", "arboreal", "boggard", "caligni", "chthonian", "cyclops", "daemonic", "diabolic", "empyrean", "grippli", "hallit", "iruxi", "kelish", "kholo", "kitsune", "muan", "mwangi", "nagaji", "necril", "osiriani", "petran", "protean", "pyric", "requian", "shadowtongue", "shoanti", "skald", "sphinx", "sussuran", "tengu", "thalassic", "tien", "utopian", "vanara", "varisian", "vudrani", "ysoki"];
    rare: readonly ["ancient-osiriani", "akitonian", "anadi", "androffan", "anugobu", "arcadian", "azlanti", "calda", "destrachan", "drooni", "dziriak", "ekujae", "elder-thing", "erutaki", "formian", "garundi", "girtablilu", "goloma", "grioth", "hwan", "iblydan", "ikeshti", "immolis", "jistkan", "jyoti", "kaava", "kashrishi", "kibwani", "kovintal", "lirgeni", "mahwek", "migo", "minaten", "minkaian", "munavri", "mzunu", "ocotan", "okaiyan", "orvian", "rasu", "ratajin", "razatlani", "russian", "samsaran", "sasquatch", "senzar", "shae", "shisk", "shobhad", "shoony", "shory", "strix", "talican", "tekritanin", "thassilonian", "varki", "vishkanyan", "wyrwood", "xanmba", "yithian"];
    secret: readonly ["wildsong"];
};
declare const LANGUAGES: Language[];
declare const LANGUAGE_RARITIES: readonly ["common", "uncommon", "rare", "secret"];
export { ALLIANCES, LANGUAGES, LANGUAGES_BY_RARITY, LANGUAGE_RARITIES, SAVING_THROW_ATTRIBUTES, SENSES_WITH_MANDATORY_ACUITIES, SENSES_WITH_UNLIMITED_RANGE, SENSE_ACUITIES, SENSE_TYPES, SIZE_TO_REACH, };
