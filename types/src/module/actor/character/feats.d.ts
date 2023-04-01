import { FeatPF2e, ItemPF2e } from "@item";
import { FeatCategory } from "@item/feat/types";
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
    supported?: FeatCategory[];
    slots?: FeatSlotLevel[];
    level?: number;
}
declare class CharacterFeats<TActor extends CharacterPF2e> extends Collection<FeatGroup> {
    #private;
    private actor;
    /** Feats with no actual category ("bonus feats" in rules text) */
    unorganized: BonusFeat[];
    constructor(actor: TActor);
    createGroup(options: FeatCategoryOptions): void;
    /** Inserts a feat into the character. If category is empty string, its a bonus feat */
    insertFeat(feat: FeatPF2e, options: {
        categoryId: string;
        slotId?: string;
    }): Promise<ItemPF2e<TActor>[]>;
    /** If a drop target is omitted or turns out to be invalid, make a limited attempt to find an eligible slot */
    private findBestLocation;
    assignFeats(): void;
}
interface CharacterFeats<TActor extends CharacterPF2e> extends Collection<FeatGroup> {
    get(key: "ancestry" | "ancestryfeature" | "class" | "classfeature" | "general" | "skill"): FeatGroup;
    get(key: string): FeatGroup | undefined;
}
declare class FeatGroup {
    id: string;
    label: string;
    feats: (SlottedFeat | BonusFeat)[];
    /** Whether the feats are slotted by level or free-form */
    slotted: boolean;
    /** Will move to sheet data later */
    featFilter: string | null;
    /** Feat Types that are supported */
    supported: FeatCategory[];
    /** Lookup for the slots themselves */
    slots: Record<string, SlottedFeat>;
    constructor(actor: CharacterPF2e, options: FeatCategoryOptions);
    /** Is this category slotted and without any empty slots */
    get isFull(): boolean;
    isFeatValid(feat: FeatPF2e): boolean;
}
export { CharacterFeats, FeatGroup, FeatCategoryOptions, FeatSlotLevel };
