/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { AbilityItemPF2e } from "@item/ability/document.ts";
import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "@item/base/sheet/sheet.ts";
import type { AbilitySystemSchema, SelfEffectReference } from "./data.ts";

declare class AbilitySheetPF2e extends ItemSheetPF2e<AbilityItemPF2e> {
    static get defaultOptions(): ItemSheetOptions;
    protected get validTraits(): Record<string, string>;
    getData(options?: Partial<ItemSheetOptions>): Promise<ActionSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    _onDrop(event: DragEvent): Promise<void>;
}
interface ActionSheetData extends ItemSheetDataPF2e<AbilityItemPF2e> {
    fields: AbilitySystemSchema;
    actionTypes: typeof CONFIG.PF2E.actionTypes;
    actionsNumber: typeof CONFIG.PF2E.actionsNumber;
    actionTraits: typeof CONFIG.PF2E.actionTraits;
    frequencies: typeof CONFIG.PF2E.frequencies;
    proficiencies: typeof CONFIG.PF2E.proficiencyLevels;
    selfEffect: SelfEffectReference | null;
}
export { AbilitySheetPF2e };
