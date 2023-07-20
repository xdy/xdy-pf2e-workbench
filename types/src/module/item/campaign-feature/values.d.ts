import { KingmakerCategory } from "./types.ts";
declare const KINGDOM_CATEGORY_DATA: {
    "kingdom-feat": {
        behavior: "feat";
    };
    "kingdom-feature": {
        behavior: "feature";
    };
    "kingdom-activity": {
        behavior: "activity";
    };
};
declare const KINGMAKER_CATEGORY_TYPES: ("kingdom-feat" | "kingdom-feature" | "kingdom-activity")[];
declare const KINGMAKER_CATEGORIES: Record<KingmakerCategory, string>;
export { KINGMAKER_CATEGORIES, KINGMAKER_CATEGORY_TYPES, KINGDOM_CATEGORY_DATA };
