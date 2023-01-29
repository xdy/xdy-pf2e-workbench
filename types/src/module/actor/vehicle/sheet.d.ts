/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "../sheet/base";
import { VehiclePF2e } from "@actor/vehicle";
import { VehicleSheetData } from "./data";
export declare class VehicleSheetPF2e extends ActorSheetPF2e<VehiclePF2e> {
    static get defaultOptions(): ActorSheetOptions;
    getData(): Promise<VehicleSheetData>;
    prepareItems(sheetData: VehicleSheetData): Promise<void>;
    activateListeners($html: JQuery): void;
}
