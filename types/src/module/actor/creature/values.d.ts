declare const ALLIANCES: Set<"party" | "opposition" | null>;
declare const SAVING_THROW_DEFAULT_ATTRIBUTES: {
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
/** Sense types associated with a particular acuities by definition */
declare const SENSES_WITH_MANDATORY_ACUITIES: {
    readonly darkvision: "precise";
    readonly heatsight: "precise";
    readonly greaterDarkvision: "precise";
    readonly lowLightVision: "precise";
    readonly seeInvisibility: "precise";
};
declare const LANGUAGES: readonly ["adlet", "akitonian", "aklo", "alghollthu", "amurrun", "anadi", "ancient-osiriani", "androffan", "anugobu", "arboreal", "arcadian", "azlanti", "boggard", "calda", "caligni", "chthonian", "common", "cyclops", "daemonic", "destrachan", "diabolic", "draconic", "drooni", "dwarven", "dziriak", "ekujae", "elder-thing", "elven", "empyrean", "erutaki", "fey", "formian", "garundi", "girtablilu", "gnomish", "goblin", "goloma", "grioth", "grippli", "halfling", "hallit", "hwan", "iblydan", "ikeshti", "immolis", "iruxi", "jistkan", "jotun", "jyoti", "kaava", "kashrishi", "kelish", "kholo", "kibwani", "kitsune", "kovintal", "lirgeni", "mahwek", "migo", "minaten", "minkaian", "muan", "munavri", "mwangi", "mzunu", "nagaji", "necril", "ocotan", "okaiyan", "orcish", "orvian", "osiriani", "petran", "protean", "pyric", "rasu", "ratajin", "razatlani", "requian", "russian", "sakvroth", "samsaran", "sasquatch", "senzar", "shadowtongue", "shae", "shisk", "shoanti", "shobhad", "shoony", "shory", "skald", "sphinx", "strix", "sussuran", "taldane", "talican", "tekritanin", "tengu", "thalassic", "thassilonian", "tien", "utopian", "vanara", "varisian", "varki", "vishkanyan", "vudrani", "wildsong", "wyrwood", "xanmba", "yithian", "ysoki"];
export { ALLIANCES, LANGUAGES, SAVING_THROW_DEFAULT_ATTRIBUTES, SENSES_WITH_MANDATORY_ACUITIES, SIZE_TO_REACH };
