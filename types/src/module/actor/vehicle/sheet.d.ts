/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "../sheet/base";
import { VehiclePF2e } from "@actor/vehicle";
export declare class VehicleSheetPF2e extends ActorSheetPF2e<VehiclePF2e> {
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(): Promise<any>;
    protected prepareItems(sheetData: any): void;
    activateListeners($html: JQuery): void;
}
