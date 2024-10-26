import type { ActorPF2e } from "@actor";
import type { FeatPF2e, HeritagePF2e, ItemPF2e } from "@item";
import type { FeatOrFeatureCategory } from "@item/feat/index.ts";
import type { FeatGroupData, FeatLike, FeatSlot } from "./types.ts";

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
    /** This groups level for the purpose of showing feats. Usually equal to actor level */
    level: number;
    constructor(actor: TActor, data: FeatGroupData, options?: {
        level?: number;
    });
    /** Is this category slotted and without any empty slots */
    get isFull(): boolean;
    /** Assigns a feat to its correct slot during data preparation, returning true if successful */
    assignFeat(feat: TItem): boolean;
    isFeatValid(feat: TItem): boolean;
    /** Adds a new feat to the actor, or reorders an existing one, into the correct slot */
    insertFeat(feat: TItem, slotId?: Maybe<string>): Promise<ItemPF2e<TActor>[]>;
}
interface FeatNotSlot<T extends FeatLike = FeatPF2e> {
    feat: T;
    children: FeatSlot<FeatLike | HeritagePF2e>[];
}
export { FeatGroup };
