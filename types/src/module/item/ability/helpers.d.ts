import type { AbilityItemPF2e, FeatPF2e, SpellPF2e } from "@item";
import { ItemPF2e } from "@item";
import { ActionCost } from "@item/base/data/system.ts";
import type { FeatSheetPF2e } from "@item/feat/sheet.ts";
import { RangeData } from "@item/types.ts";
import type { AbilitySystemData, SelfEffectReference } from "./data.ts";
import type { AbilitySheetPF2e } from "./sheet.ts";

interface SourceWithActionData {
    system: {
        actionType: AbilitySystemData["actionType"];
        actions: AbilitySystemData["actions"];
    };
}
interface SourceWithFrequencyData {
    system: {
        frequency?: AbilitySystemData["frequency"];
    };
}
/** Pre-update helper to ensure actionType and actions are in sync with each other */
declare function normalizeActionChangeData(document: SourceWithActionData, changed: DeepPartial<SourceWithActionData>): void;
/** Adds sheet listeners for modifying frequency */
declare function activateActionSheetListeners(item: ItemPF2e & SourceWithFrequencyData, html: HTMLElement): void;
declare function getActionCostRollOptions(prefix: string, item: {
    actionCost?: ActionCost | null;
}): string[];
/** Create data for the "self-applied effect" drop zone on an ability or feat sheet. */
declare function createSelfEffectSheetData(data: Maybe<SelfEffectReference>): SelfEffectSheetReference | null;
interface SelfEffectSheetReference extends SelfEffectReference {
    id: string | null;
    type: string | null;
    pack: string | null;
}
/** Save data from an effect item dropped on an ability or feat sheet. Returns true if handled */
declare function handleSelfEffectDrop(sheet: AbilitySheetPF2e | FeatSheetPF2e, item: ItemPF2e): Promise<boolean>;
declare function createActionRangeLabel(range: Maybe<RangeData>): string | null;
/**  Add the holy/unholy trait to sanctified actions and spells if the owning actor is also holy/unholy */
declare function processSanctification(item: AbilityItemPF2e | FeatPF2e | SpellPF2e): void;
export { activateActionSheetListeners, createActionRangeLabel, createSelfEffectSheetData, getActionCostRollOptions, handleSelfEffectDrop, normalizeActionChangeData, processSanctification, };
