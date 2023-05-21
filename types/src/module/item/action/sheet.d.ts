/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActionItemPF2e } from "@item/action/document.ts";
import { ItemSheetDataPF2e } from "@item/sheet/data-types.ts";
import { ItemSheetPF2e } from "../sheet/base.ts";
export declare class ActionSheetPF2e extends ItemSheetPF2e<ActionItemPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<ActionSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _getSubmitData(updateData?: Record<string, unknown>): Record<string, unknown>;
}
interface ActionSheetData extends ItemSheetDataPF2e<ActionItemPF2e> {
    categories: ConfigPF2e["PF2E"]["actionCategories"];
    actionTypes: ConfigPF2e["PF2E"]["actionTypes"];
    actionsNumber: ConfigPF2e["PF2E"]["actionsNumber"];
    actionTraits: ConfigPF2e["PF2E"]["actionTraits"];
    frequencies: ConfigPF2e["PF2E"]["frequencies"];
    skills: ConfigPF2e["PF2E"]["skillList"];
    proficiencies: ConfigPF2e["PF2E"]["proficiencyLevels"];
}
export {};
