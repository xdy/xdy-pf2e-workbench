/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "../sheet/base";
import { VehiclePF2e } from "@actor/vehicle";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types";
export declare class VehicleSheetPF2e extends ActorSheetPF2e<VehiclePF2e> {
    static get defaultOptions(): ActorSheetOptions;
    getData(): Promise<VehicleSheetData>;
    prepareItems(sheetData: VehicleSheetData): Promise<void>;
    activateListeners($html: JQuery): void;
}
interface AdjustedValue {
    value: number;
    adjustmentClass: "adjusted-higher" | "adjusted-lower" | null;
}
interface VehicleSheetData extends ActorSheetDataPF2e<VehiclePF2e> {
    actorRarities: typeof CONFIG.PF2E.rarityTraits;
    actorRarity: string;
    actorSizes: typeof CONFIG.PF2E.actorSizes;
    actorSize: string;
    ac: AdjustedValue;
    saves: {
        fortitude: AdjustedValue;
    };
}
export {};
