/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { FeatPF2e } from "@item/feat/document.ts";
import { ItemSheetDataPF2e, ItemSheetPF2e } from "@item/sheet/index.ts";
declare class FeatSheetPF2e extends ItemSheetPF2e<FeatPF2e> {
    get validTraits(): Record<string, string>;
    getData(options?: Partial<DocumentSheetOptions>): Promise<FeatSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface FeatSheetData extends ItemSheetDataPF2e<FeatPF2e> {
    categories: ConfigPF2e["PF2E"]["featCategories"];
    actionTypes: ConfigPF2e["PF2E"]["actionTypes"];
    actionsNumber: ConfigPF2e["PF2E"]["actionsNumber"];
    frequencies: ConfigPF2e["PF2E"]["frequencies"];
    damageTypes: ConfigPF2e["PF2E"]["damageTypes"] & ConfigPF2e["PF2E"]["healingTypes"];
    prerequisites: string;
    isFeat: boolean;
    mandatoryTakeOnce: boolean;
    hasLineageTrait: boolean;
    canHaveKeyOptions: boolean;
}
export { FeatSheetPF2e };
