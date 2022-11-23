import { ItemPF2e } from "@item";
/** Check an item prior to its deletion for GrantItem on-delete actions */
declare function processGrantDeletions(item: Embedded<ItemPF2e>, pendingItems: Embedded<ItemPF2e>[]): Promise<void>;
export { processGrantDeletions };
