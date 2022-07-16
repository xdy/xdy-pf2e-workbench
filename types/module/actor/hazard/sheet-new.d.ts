/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "@actor/sheet/base";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types";
import { HazardPF2e } from ".";
import { HazardSheetData } from "./types";
/** In development version of the hazard sheet. */
export declare class HazardSheetGreenPF2e extends ActorSheetPF2e<HazardPF2e> {
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    get title(): string;
    get editing(): boolean;
    getData(): Promise<HazardSheetData>;
    private prepareActions;
    private prepareSaves;
    prepareItems(sheetData: ActorSheetDataPF2e<HazardPF2e>): void;
    activateListeners($html: JQuery): void;
}
