import { PhysicalItemSheetPF2e } from "@item/physical/sheet";
import { PhysicalItemSheetData } from "@item/sheet/data-types";
import { SheetOptions } from "@module/sheet/helpers";
import { ContainerPF2e } from ".";
export declare class ContainerSheetPF2e extends PhysicalItemSheetPF2e<ContainerPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<ContainerSheetData>;
}
interface ContainerSheetData extends PhysicalItemSheetData<ContainerPF2e> {
    bulkTypes: ConfigPF2e["PF2E"]["bulkTypes"];
    sizes: ConfigPF2e["PF2E"]["actorSizes"];
    traits: SheetOptions;
}
export {};
