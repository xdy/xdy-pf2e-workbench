/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { type AfflictionPF2e, type ConditionPF2e } from "@item";
import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "@item/base/sheet/sheet.ts";
import { DamageCategoryUnique } from "@system/damage/types.ts";
import type { AfflictionConditionData, AfflictionStageData } from "./data.ts";
declare class AfflictionSheetPF2e extends ItemSheetPF2e<AfflictionPF2e> {
    static get defaultOptions(): ItemSheetOptions;
    getData(options?: Partial<ItemSheetOptions>): Promise<AfflictionSheetData>;
    protected prepareStages(): Promise<Record<string, AfflictionStageSheetData>>;
    activateListeners($html: JQuery<HTMLElement>): void;
    _onDrop(event: DragEvent): Promise<void>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface AfflictionSheetData extends ItemSheetDataPF2e<AfflictionPF2e> {
    conditionTypes: Omit<ConfigPF2e["PF2E"]["conditionTypes"], "persistent-damage">;
    damageTypes: ConfigPF2e["PF2E"]["damageTypes"];
    damageCategories: Pick<ConfigPF2e["PF2E"]["damageCategories"], DamageCategoryUnique>;
    durationUnits: Omit<ConfigPF2e["PF2E"]["timeUnits"], "encounter">;
    onsetUnits: Omit<ConfigPF2e["PF2E"]["timeUnits"], "unlimited" | "encounter">;
    saves: ConfigPF2e["PF2E"]["saves"];
    stages: Record<string, AfflictionStageSheetData>;
    stageOptions: Record<string, string>;
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
