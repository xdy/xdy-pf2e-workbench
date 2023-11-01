/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { SheetOptions } from "@module/sheet/helpers.ts";
import { ItemSheetDataPF2e, ItemSheetPF2e } from "../base/sheet/base.ts";
import { CoinsPF2e, ItemActivation, MaterialValuationData, PhysicalItemPF2e, PreciousMaterialGrade } from "./index.ts";
declare class PhysicalItemSheetPF2e<TItem extends PhysicalItemPF2e> extends ItemSheetPF2e<TItem> {
    /** Show the identified data for editing purposes */
    getData(options?: Partial<DocumentSheetOptions>): Promise<PhysicalItemSheetData<TItem>>;
    /** If the item is unidentified, prevent players from opening this sheet. */
    render(force?: boolean, options?: RenderOptions): this | Promise<this>;
    protected prepareMaterials(valuationData: MaterialValuationData): MaterialSheetData;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface PhysicalItemSheetData<TItem extends PhysicalItemPF2e> extends ItemSheetDataPF2e<TItem> {
    isPhysical: true;
    baseLevel: number;
    basePrice: CoinsPF2e;
    priceAdjustment: "higher" | "lower" | null;
    adjustedPriceHint: string | null;
    adjustedLevelHint: string | null;
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
interface MaterialSheetEntry {
    label: string;
    grades: Partial<Record<PreciousMaterialGrade, {
        value: string;
        label: string;
    }>>;
}
interface MaterialSheetData {
    value: string;
    materials: Record<string, MaterialSheetEntry>;
}
export { PhysicalItemSheetPF2e };
export type { MaterialSheetData, MaterialSheetEntry, PhysicalItemSheetData };
