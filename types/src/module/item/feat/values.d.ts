declare const FEAT_CATEGORIES: Set<"class" | "general" | "skill" | "ancestry" | "bonus">;
declare const FEATURE_CATEGORIES: Set<"curse" | "calling" | "ancestryfeature" | "classfeature" | "deityboon" | "pfsboon">;
declare const FEAT_OR_FEATURE_CATEGORIES: Set<SetElement<typeof FEAT_CATEGORIES> | SetElement<typeof FEATURE_CATEGORIES>>;
export { FEATURE_CATEGORIES, FEAT_CATEGORIES, FEAT_OR_FEATURE_CATEGORIES };
