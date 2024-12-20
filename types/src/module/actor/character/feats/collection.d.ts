import type { CharacterPF2e } from "@actor";
import type { FeatPF2e, ItemPF2e } from "@item";
import { FeatGroup } from "./group.ts";
import { FeatGroupData } from "./types.ts";

declare class CharacterFeats<TActor extends CharacterPF2e> extends Collection<FeatGroup<TActor>> {
    #private;
    private actor;
    /** Feats belonging no actual group ("bonus feats" in rules text) */
    bonus: FeatGroup<TActor>;
    constructor(actor: TActor);
    createGroup(data: FeatGroupData): FeatGroup;
    /** Inserts a feat into the character. If groupId is empty string, it's a bonus feat. */
    insertFeat(feat: FeatPF2e, slotData: {
        groupId: string;
        slotId: string | null;
    } | null): Promise<ItemPF2e<TActor>[]>;
    /** Assigns existing feats to their correct spots during data preparation */
    assignToSlots(): void;
}
export { CharacterFeats };
