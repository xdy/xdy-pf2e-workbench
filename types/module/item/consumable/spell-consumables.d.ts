import { ConsumableData, ConsumableSource } from "@item/data";
import { SpellPF2e } from "@item/spell";
import { DCOptions } from "@module/dc";
export declare function isSpellConsumable(itemId: string): boolean;
export declare function createConsumableFromSpell(type: "scroll" | "wand", spell: SpellPF2e, heightenedLevel?: number): Promise<ConsumableSource>;
export interface TrickMagicItemDifficultyData {
    arc?: number;
    rel?: number;
    occ?: number;
    nat?: number;
}
export declare function calculateTrickMagicItemCheckDC(itemData: ConsumableData, options?: DCOptions): TrickMagicItemDifficultyData;
