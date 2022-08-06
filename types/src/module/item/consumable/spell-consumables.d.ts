import { ConsumablePF2e, SpellPF2e } from "@item";
import { ConsumableSource } from "@item/data";
import { DCOptions } from "@module/dc";
declare function isSpellConsumable(itemId: string): boolean;
declare function createConsumableFromSpell(type: "scroll" | "wand", spell: SpellPF2e, heightenedLevel?: number): Promise<ConsumableSource>;
interface TrickMagicItemDifficultyData {
    arc?: number;
    rel?: number;
    occ?: number;
    nat?: number;
}
declare function calculateTrickMagicItemCheckDC(item: ConsumablePF2e, options?: DCOptions): TrickMagicItemDifficultyData;
export { calculateTrickMagicItemCheckDC, createConsumableFromSpell, isSpellConsumable, TrickMagicItemDifficultyData };
