declare const FEAT_CATEGORIES: Set<"ancestry" | "bonus" | "class" | "general" | "skill">;
declare const FEATURE_CATEGORIES: Set<"curse" | "ancestryfeature" | "classfeature" | "deityboon" | "pfsboon">;
declare const FEAT_OR_FEATURE_CATEGORIES: Set<SetElement<typeof FEAT_CATEGORIES> | SetElement<typeof FEATURE_CATEGORIES>>;
export { FEAT_OR_FEATURE_CATEGORIES, FEAT_CATEGORIES, FEATURE_CATEGORIES };
