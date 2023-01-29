/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { SheetOptions } from "@module/sheet/helpers";
import { ItemActivation, MaterialGradeData, MaterialValuationData, PhysicalItemPF2e, PreciousMaterialGrade } from ".";
import { ItemSheetPF2e } from "../sheet/base";
declare class PhysicalItemSheetPF2e<TItem extends PhysicalItemPF2e = PhysicalItemPF2e> extends ItemSheetPF2e<TItem> {
    /** Show the identified data for editing purposes */
    getData(options?: Partial<DocumentSheetOptions>): Promise<PhysicalItemSheetData<TItem>>;
    activateListeners($html: JQuery): void;
    protected prepareMaterials(valuationData: MaterialValuationData): PreparedMaterials;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface PhysicalItemSheetData<TItem extends PhysicalItemPF2e> extends ItemSheetDataPF2e<TItem> {
    isPhysical: true;
    basePriceString: string;
    priceString: string;
    actionTypes: ConfigPF2e["PF2E"]["actionTypes"];
    actionsNumber: ConfigPF2e["PF2E"]["actionsNumber"];
    bulkTypes: ConfigPF2e["PF2E"]["bulkTypes"];
    frequencies: ConfigPF2e["PF2E"]["frequencies"];
    sizes: ConfigPF2e["PF2E"]["actorSizes"];
    stackGroups: ConfigPF2e["PF2E"]["stackGroups"];
    usage: ConfigPF2e["PF2E"]["usageTraits"];
    bulkDisabled: boolean;
    activations: {
        action: ItemActivation;
        id: string;
        base: string;
        description: string;
        traits: SheetOptions;
    }[];
}
interface PreparedMaterials {
    value: string;
    materials: Record<string, {
        label: string;
        grades: {
            [K in PreciousMaterialGrade]?: MaterialGradeData;
        };
    }>;
}
type MaterialSheetEntry = {
    label: string;
    grades: Partial<Record<PreciousMaterialGrade, MaterialGradeData>>;
};
type MaterialSheetData = {
    value: string;
    materials: Record<string, MaterialSheetEntry>;
};
export { MaterialSheetData, MaterialSheetEntry, PhysicalItemSheetData, PhysicalItemSheetPF2e, PreparedMaterials };
