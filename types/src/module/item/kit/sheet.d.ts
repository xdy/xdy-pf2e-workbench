/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { CoinsPF2e } from "@item/physical/index.ts";
import { ItemSheetDataPF2e } from "@item/sheet/data-types.ts";
import { ItemSheetPF2e } from "../sheet/base.ts";
import { KitEntryData } from "./data.ts";
import { KitPF2e } from "./document.ts";
declare class KitSheetPF2e extends ItemSheetPF2e<KitPF2e> {
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<KitSheetData>;
    protected _onDrop(event: ElementDragEvent): Promise<void>;
    removeItem(event: MouseEvent): Promise<KitPF2e>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface KitSheetData extends ItemSheetDataPF2e<KitPF2e> {
    priceString: CoinsPF2e;
    items: Record<string, KitEntrySheetData>;
}
interface KitEntrySheetData extends KitEntryData {
    fromWorld: boolean;
}
export { KitSheetPF2e };
