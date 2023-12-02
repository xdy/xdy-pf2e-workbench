/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "@item/base/sheet/sheet.ts";
import type { CampaignFeaturePF2e } from "./document.ts";
declare class CampaignFeatureSheetPF2e extends ItemSheetPF2e<CampaignFeaturePF2e> {
    static get defaultOptions(): ItemSheetOptions;
    get validTraits(): Record<string, string>;
    getData(options?: Partial<ItemSheetOptions>): Promise<CampaignFeatureSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface CampaignFeatureSheetData extends ItemSheetDataPF2e<CampaignFeaturePF2e> {
    categories: Record<string, string>;
    actionTypes: ConfigPF2e["PF2E"]["actionTypes"];
    actionsNumber: ConfigPF2e["PF2E"]["actionsNumber"];
    frequencies: ConfigPF2e["PF2E"]["frequencies"];
    prerequisites: string;
    isFeat: boolean;
}
export { CampaignFeatureSheetPF2e };
