/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemSheetPF2e } from "@item/sheet/base";
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { SheetOptions } from "@module/sheet/helpers";
import { MeleePF2e } from ".";
export declare class MeleeSheetPF2e extends ItemSheetPF2e<MeleePF2e> {
    getData(): Promise<MeleeSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
}
interface MeleeSheetData extends ItemSheetDataPF2e<MeleePF2e> {
    damageTypes: ConfigPF2e["PF2E"]["damageTypes"];
    attackEffects: SheetOptions;
}
export {};
