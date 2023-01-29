/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActionItemPF2e } from "@item/action";
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { ItemSheetPF2e } from "../sheet/base";
export declare class ActionSheetPF2e extends ItemSheetPF2e<ActionItemPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<ActionSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
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
