/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { PhysicalItemSheetPF2e } from "@item/physical/sheet";
import { PhysicalItemSheetData } from "@item/sheet/data-types";
import { BookPF2e } from "./document";
export declare class BookSheetPF2e extends PhysicalItemSheetPF2e<BookPF2e> {
    getData(): Promise<PhysicalItemSheetData<BookPF2e>>;
    activateListeners($html: JQuery): void;
}
