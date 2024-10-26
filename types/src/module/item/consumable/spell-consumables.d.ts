import { ConsumablePF2e, type SpellPF2e } from "@item";
import { ConsumableSource } from "@item/base/data/index.ts";
import { DCOptions } from "@module/dc.ts";

type SpellConsumableItemType = "cantripDeck5" | "scroll" | "wand";
declare function isSpellConsumable(itemId: string): boolean;
declare function createConsumableFromSpell(spell: SpellPF2e, { type, heightenedLevel, mystified, }: {
    type: SpellConsumableItemType;
    heightenedLevel?: number;
    mystified?: boolean;
}): Promise<ConsumableSource>;
interface TrickMagicItemDifficultyData {
    arcana?: number;
    religion?: number;
    occultism?: number;
    nature?: number;
}
declare function calculateTrickMagicItemCheckDC(item: ConsumablePF2e, options?: DCOptions): TrickMagicItemDifficultyData;
export { calculateTrickMagicItemCheckDC, createConsumableFromSpell, isSpellConsumable };
export type { SpellConsumableItemType, TrickMagicItemDifficultyData };
