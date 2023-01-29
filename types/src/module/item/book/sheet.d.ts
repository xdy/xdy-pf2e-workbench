/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical/sheet";
import { BookPF2e } from "./document";
export declare class BookSheetPF2e extends PhysicalItemSheetPF2e<BookPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<PhysicalItemSheetData<BookPF2e>>;
    activateListeners($html: JQuery): void;
}
