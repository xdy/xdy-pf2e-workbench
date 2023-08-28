/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { AbilityItemPF2e } from "@item/ability/document.ts";
import { ItemSheetDataPF2e } from "@item/sheet/data-types.ts";
import { ItemSheetPF2e } from "../sheet/base.ts";
import { SelfEffectReference } from "./index.ts";
export declare class ActionSheetPF2e extends ItemSheetPF2e<AbilityItemPF2e> {
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<ActionSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    _onDrop(event: ElementDragEvent): Promise<void>;
}
interface ActionSheetData extends ItemSheetDataPF2e<AbilityItemPF2e> {
    categories: ConfigPF2e["PF2E"]["actionCategories"];
    actionTypes: ConfigPF2e["PF2E"]["actionTypes"];
    actionsNumber: ConfigPF2e["PF2E"]["actionsNumber"];
    actionTraits: ConfigPF2e["PF2E"]["actionTraits"];
    frequencies: ConfigPF2e["PF2E"]["frequencies"];
    skills: ConfigPF2e["PF2E"]["skillList"];
    proficiencies: ConfigPF2e["PF2E"]["proficiencyLevels"];
    selfEffect: SelfEffectReference | null;
}
export {};
