import { BehaviorType, KingmakerCategory } from "./types.ts";
interface CategoryData {
    behavior: BehaviorType;
    levelLabel?: string;
}
declare const KINGDOM_CATEGORY_DATA: {
    "army-tactic": {
        behavior: "feat";
        levelLabel: string;
    };
    "army-war-action": {
        behavior: "activity";
    };
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
declare const KINGMAKER_CATEGORY_TYPES: ("army-tactic" | "army-war-action" | "kingdom-feat" | "kingdom-feature" | "kingdom-activity")[];
declare const KINGMAKER_CATEGORIES: Record<KingmakerCategory, string>;
export { KINGDOM_CATEGORY_DATA, KINGMAKER_CATEGORIES, KINGMAKER_CATEGORY_TYPES };
export type { CategoryData };
