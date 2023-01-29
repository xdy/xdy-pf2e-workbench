import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical";
import { ContainerPF2e } from ".";
export declare class ContainerSheetPF2e extends PhysicalItemSheetPF2e<ContainerPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<PhysicalItemSheetData<ContainerPF2e>>;
}
