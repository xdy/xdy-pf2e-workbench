import type { ActorPF2e, CharacterPF2e } from "@actor";
import type { FeatPF2e, HeritagePF2e, ItemPF2e } from "@item";
import { ItemSystemData } from "@item/base/data/system.ts";
import { FeatOrFeatureCategory } from "@item/feat/types.ts";
declare class CharacterFeats<TActor extends CharacterPF2e> extends Collection<FeatGroup<TActor>> {
    #private;
    private actor;
    /** Feats belonging no actual group ("bonus feats" in rules text) */
    bonus: FeatGroup<TActor>;
    constructor(actor: TActor);
    createGroup(options: FeatGroupOptions): this;
    /** Inserts a feat into the character. If groupId is empty string, it's a bonus feat. */
    insertFeat(feat: FeatPF2e, slotData: {
        groupId: string;
        slotId: string | null;
    } | null): Promise<ItemPF2e<TActor>[]>;
    /** Assigns existing feats to their correct spots during data preparation */
    assignToSlots(): void;
}
interface CharacterFeats<TActor extends CharacterPF2e> extends Collection<FeatGroup<TActor>> {
    get(key: "ancestry" | "ancestryfeature" | "class" | "classfeature" | "general" | "skill"): FeatGroup<TActor>;
    get(key: string): FeatGroup<TActor> | undefined;
}
/** Any document that is similar enough to a feat/feature to be used as a feat for the purposes of feat groups */
interface FeatLike<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    category: string;
    group: FeatGroup<NonNullable<TParent>, this> | null;
    isFeat: boolean;
    isFeature: boolean;
    system: ItemSystemData & {
        location: string | null;
    };
}
interface FeatSlot<TItem extends FeatLike | HeritagePF2e = FeatPF2e> {
    id: string;
    label?: Maybe<string>;
    level: number | null;
    feat?: Maybe<TItem>;
    children: FeatSlot<FeatLike | HeritagePF2e>[];
}
interface FeatNotSlot<T extends FeatLike = FeatPF2e> {
    feat: T;
    children: FeatSlot<FeatLike | HeritagePF2e>[];
}
interface FeatSlotCreationData extends Omit<FeatSlot, "children" | "feat" | "level"> {
    level?: Maybe<number>;
}
interface FeatGroupOptions {
    id: string;
    label: string;
    featFilter?: string[];
    supported?: FeatOrFeatureCategory[];
    slots?: (FeatSlotCreationData | string | number)[];
    level?: number;
}
declare class FeatGroup<TActor extends ActorPF2e = ActorPF2e, TItem extends FeatLike = FeatPF2e> {
    #private;
    actor: TActor;
    id: string;
    label: string;
    feats: (FeatSlot<TItem> | FeatNotSlot<TItem>)[];
    /** Whether the feats are slotted by level or free-form */
    slotted: boolean;
    /** Will move to sheet data later */
    featFilter: string[];
    /** Feat Types that are supported */
    supported: FeatOrFeatureCategory[];
    /** Lookup for the slots themselves */
    slots: Record<string, FeatSlot<TItem> | undefined>;
    constructor(actor: TActor, options: FeatGroupOptions);
    /** Is this category slotted and without any empty slots */
    get isFull(): boolean;
    /** Assigns a feat to its correct slot during data preparation, returning true if successful */
    assignFeat(feat: TItem): boolean;
    isFeatValid(feat: TItem): boolean;
    /** Adds a new feat to the actor, or reorders an existing one, into the correct slot */
    insertFeat(feat: TItem, slotId?: Maybe<string>): Promise<ItemPF2e<TActor>[]>;
}
export { CharacterFeats, FeatGroup };
export type { FeatGroupOptions, FeatSlotCreationData };
