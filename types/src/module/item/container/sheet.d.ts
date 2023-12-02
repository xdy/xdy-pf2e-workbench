import { ItemSheetOptions } from "@item/base/sheet/sheet.ts";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical/index.ts";
import type { ContainerPF2e } from "./document.ts";
export declare class ContainerSheetPF2e extends PhysicalItemSheetPF2e<ContainerPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ContainerSheetData>;
}
interface ContainerSheetData extends PhysicalItemSheetData<ContainerPF2e> {
    stackGroups: {
        sacks: string;
    };
}
export {};
