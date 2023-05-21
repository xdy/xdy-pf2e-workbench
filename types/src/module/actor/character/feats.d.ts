import { FeatPF2e, ItemPF2e } from "@item";
import { FeatCategory } from "@item/feat/types.ts";
import { CharacterPF2e } from "./document.ts";
import { BonusFeat, SlottedFeat } from "./data.ts";
import { ActorPF2e } from "@actor";
type FeatSlotLevel = number | {
    id: string;
    label: string;
};
interface FeatGroupOptions {
    id: string;
    label: string;
    featFilter?: string[];
    supported?: FeatCategory[];
    slots?: FeatSlotLevel[];
    level?: number;
}
declare class CharacterFeats<TActor extends CharacterPF2e> extends Collection<FeatGroup<TActor>> {
    private actor;
    /** Feats with no actual category ("bonus feats" in rules text) */
    unorganized: FeatGroup<TActor>;
    constructor(actor: TActor);
    createGroup(options: FeatGroupOptions): void;
    /** Inserts a feat into the character. If category is empty string, its a bonus feat */
    insertFeat(feat: FeatPF2e, options: {
        categoryId: string;
        slotId?: string;
    }): Promise<ItemPF2e<TActor>[]>;
    /** If a drop target is omitted or turns out to be invalid, make a limited attempt to find an eligible slot */
    private findBestLocation;
    /** Assigns existing feats to their correct spots during data preparation */
    assignFeats(): void;
}
interface CharacterFeats<TActor extends CharacterPF2e> extends Collection<FeatGroup<TActor>> {
    get(key: "ancestry" | "ancestryfeature" | "class" | "classfeature" | "general" | "skill"): FeatGroup<TActor>;
    get(key: string): FeatGroup<TActor> | undefined;
}
declare class FeatGroup<TActor extends ActorPF2e = ActorPF2e> {
    private actor;
    id: string;
    label: string;
    feats: (SlottedFeat | BonusFeat)[];
    /** Whether the feats are slotted by level or free-form */
    slotted: boolean;
    /** Will move to sheet data later */
    featFilter: string[];
    /** Feat Types that are supported */
    supported: FeatCategory[];
    /** Lookup for the slots themselves */
    slots: Record<string, SlottedFeat | undefined>;
    constructor(actor: TActor, options: FeatGroupOptions);
    /** Assigns a feat to its correct slot during data preparation, returning true if successful */
    assignFeat(feat: FeatPF2e): boolean;
    /** Is this category slotted and without any empty slots */
    get isFull(): boolean;
    isFeatValid(feat: FeatPF2e): boolean;
    /** Adds a new feat to the actor, or reorders an existing one, into the correct slot */
    insertFeat(feat: FeatPF2e, { slotId }?: {
        slotId?: string | null;
    }): Promise<ItemPF2e<TActor>[]>;
}
export { CharacterFeats, FeatGroup, FeatGroupOptions, FeatSlotLevel };
