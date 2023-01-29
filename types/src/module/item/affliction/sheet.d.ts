/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ConditionPF2e } from "@item/condition";
import { ItemSheetPF2e } from "@item/sheet";
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { DamageCategoryUnique } from "@system/damage";
import { AfflictionConditionData, AfflictionStageData } from "./data";
import { AfflictionPF2e } from "./document";
declare class AfflictionSheetPF2e extends ItemSheetPF2e<AfflictionPF2e> {
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<AfflictionSheetData>;
    protected prepareStages(): Promise<Record<string, AfflictionStageSheetData>>;
    activateListeners($html: JQuery<HTMLElement>): void;
    _onDrop(event: ElementDragEvent): Promise<void>;
}
interface AfflictionSheetData extends ItemSheetDataPF2e<AfflictionPF2e> {
    conditionTypes: Omit<ConfigPF2e["PF2E"]["conditionTypes"], "persistent-damage">;
    damageTypes: ConfigPF2e["PF2E"]["damageTypes"];
    damageCategories: Pick<ConfigPF2e["PF2E"]["damageCategories"], DamageCategoryUnique>;
    durationUnits: Omit<ConfigPF2e["PF2E"]["timeUnits"], "encounter">;
    onsetUnits: Omit<ConfigPF2e["PF2E"]["timeUnits"], "unlimited" | "encounter">;
    saves: ConfigPF2e["PF2E"]["saves"];
    stages: Record<string, AfflictionStageSheetData>;
}
interface AfflictionStageSheetData extends AfflictionStageData {
    stage: number;
    conditions: Record<string, AfflictionConditionSheetData>;
    effects: {
        uuid: ItemUUID;
        img?: string;
        name?: string;
    }[];
}
interface AfflictionConditionSheetData extends AfflictionConditionData {
    document: ConditionPF2e | null;
}
export { AfflictionSheetPF2e };
