import type { ActorPF2e } from "@actor";
import type { FeatPF2e, HeritagePF2e, ItemPF2e } from "@item";
import { FeatOrFeatureCategory } from "@item/feat/types.ts";
import type { FeatBrowserFilterProps, FeatGroupData, FeatLike, FeatSlot } from "./types.ts";

declare class FeatGroup<TActor extends ActorPF2e = ActorPF2e, TItem extends FeatLike = FeatPF2e> {
    #private;
    actor: TActor;
    id: string;
    label: string;
    feats: (FeatSlot<TItem> | FeatNotSlot<TItem>)[];
    /** Whether the feats are slotted by level or free-form */
    slotted: boolean;
    /** Feat Types that are supported */
    supported: FeatOrFeatureCategory[];
    filter: FeatBrowserFilterProps;
    /** Lookup for the slots themselves */
    slots: Record<string, FeatSlot<TItem> | undefined>;
    /** This groups display's limit. Usually equal to actor level */
    limit: number;
    /** This group's level. If slotted, it is equal to the highest leveled slot. */
    level: number;
    customLimit: {
        label: string;
        min: number;
        max: number;
    } | null;
    constructor(actor: TActor, data: FeatGroupData, options?: FeatGroupOptions);
    /** Is this category slotted and without any empty slots */
    get isFull(): boolean;
    /** Assigns a feat to its correct slot during data preparation, returning true if successful */
    assignFeat(feat: TItem): boolean;
    /** Returns true if this feat is a valid type for the group */
    isFeatValid(feat: TItem): boolean;
    /** Adds a new feat to the actor, or reorders an existing one, into the correct slot */
    insertFeat(feat: TItem, slotId?: Maybe<string>): Promise<ItemPF2e<TActor>[]>;
    /** Handles any post assignment post-processing */
    postProcess(): void;
}
interface FeatGroupOptions {
    /** The "rank" to limit visibility to. By default it is actor level */
    limit?: number;
}
interface FeatNotSlot<T extends FeatLike = FeatPF2e> {
    feat: T;
    filter?: never;
    level?: never;
    children: FeatSlot<FeatLike | HeritagePF2e>[];
}
export { FeatGroup };
