/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { AbilityViewData, ActorSheetDataPF2e } from "@actor/sheet/data-types.ts";
import { VehiclePF2e } from "@actor/vehicle/index.ts";
import { AdjustedValue } from "@module/sheet/helpers.ts";
import { ActorSheetPF2e } from "../sheet/base.ts";

export declare class VehicleSheetPF2e extends ActorSheetPF2e<VehiclePF2e> {
    static get defaultOptions(): ActorSheetOptions;
    getData(): Promise<VehicleSheetData>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface VehicleSheetData extends ActorSheetDataPF2e<VehiclePF2e> {
    actions: ActionsSheetData;
    actorRarities: typeof CONFIG.PF2E.rarityTraits;
    actorRarity: string;
    actorSizes: typeof CONFIG.PF2E.actorSizes;
    actorSize: string;
    ac: AdjustedValue;
    frequencies: typeof CONFIG.PF2E.frequencies;
    saves: {
        fortitude: AdjustedValue;
    };
    emitsSoundOptions: FormSelectOption[];
}
type ActionsSheetData = Record<"action" | "reaction" | "free", {
    label: string;
    actions: AbilityViewData[];
}>;
export {};
