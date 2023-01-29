import { FeatPF2e, ItemPF2e } from "@item";
import { FeatType } from "@item/feat/data";
import { CharacterPF2e } from ".";
import { BonusFeat, SlottedFeat } from "./data";
type FeatSlotLevel = number | {
    id: string;
    label: string;
};
interface FeatCategoryOptions {
    id: string;
    label: string;
    featFilter?: string | null;
    supported?: FeatType[];
    slots?: FeatSlotLevel[];
    level?: number;
}
declare class CharacterFeats extends Collection<FeatCategory> {
    private actor;
    /** Feats with no actual category ("bonus feats" in rules text) */
    unorganized: BonusFeat[];
    constructor(actor: CharacterPF2e);
    createCategory(options: FeatCategoryOptions): void;
    private combineGrants;
    /** Inserts a feat into the character. If category is empty string, its a bonus feat */
    insertFeat(feat: FeatPF2e, options: {
        categoryId: string;
        slotId?: string;
    }): Promise<ItemPF2e[]>;
    /** If a drop target is omitted or turns out to be invalid, make a limited attempt to find an eligible slot */
    private findBestLocation;
    assignFeats(): void;
}
interface CharacterFeats {
    get(key: "ancestryfeature"): FeatCategory;
    get(key: "classfeature"): FeatCategory;
    get(key: "ancestry"): FeatCategory;
    get(key: "class"): FeatCategory;
    get(key: "skill"): FeatCategory;
    get(key: "general"): FeatCategory;
    get(key: string): FeatCategory | undefined;
}
declare class FeatCategory {
    id: string;
    label: string;
    feats: (SlottedFeat | BonusFeat)[];
    /** Whether the feats are slotted by level or free-form */
    slotted: boolean;
    /** Will move to sheet data later */
    featFilter: string | null;
    /** Feat Types that are supported */
    supported: FeatType[];
    /** Lookup for the slots themselves */
    slots: Record<string, SlottedFeat>;
    constructor(actor: CharacterPF2e, options: FeatCategoryOptions);
    /** Is this category slotted and without any empty slots */
    get isFull(): boolean;
    isFeatValid(feat: FeatPF2e): boolean;
}
export { CharacterFeats, FeatCategory, FeatCategoryOptions, FeatSlotLevel };
