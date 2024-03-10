import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
/** Check an item prior to its deletion for GrantItem on-delete actions */
declare function processGrantDeletions(item: ItemPF2e<ActorPF2e>, pendingItems: ItemPF2e<ActorPF2e>[]): Promise<void>;
export { processGrantDeletions };
