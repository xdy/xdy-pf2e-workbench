/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ItemSheetDataPF2e } from "@item/sheet/data-types.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import { ItemSheetPF2e } from "../sheet/base.ts";
import { CoinsPF2e, ItemActivation, MaterialGradeData, MaterialValuationData, PhysicalItemPF2e, PreciousMaterialGrade } from "./index.ts";
declare class PhysicalItemSheetPF2e<TItem extends PhysicalItemPF2e> extends ItemSheetPF2e<TItem> {
    /** Show the identified data for editing purposes */
    getData(options?: Partial<DocumentSheetOptions>): Promise<PhysicalItemSheetData<TItem>>;
    /** If the item is unidentified, prevent players from opening this sheet. */
    render(force?: boolean, options?: RenderOptions): this | Promise<this>;
    protected prepareMaterials(valuationData: MaterialValuationData): PreparedMaterials;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface PhysicalItemSheetData<TItem extends PhysicalItemPF2e> extends ItemSheetDataPF2e<TItem> {
    isPhysical: true;
    basePrice: CoinsPF2e;
    priceAdjustment: "higher" | "lower" | null;
    actionTypes: ConfigPF2e["PF2E"]["actionTypes"];
    actionsNumber: ConfigPF2e["PF2E"]["actionsNumber"];
    bulkTypes: ConfigPF2e["PF2E"]["bulkTypes"];
    frequencies: ConfigPF2e["PF2E"]["frequencies"];
    sizes: ConfigPF2e["PF2E"]["actorSizes"];
    stackGroups: ConfigPF2e["PF2E"]["stackGroups"];
    usages: ConfigPF2e["PF2E"]["usages"];
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
