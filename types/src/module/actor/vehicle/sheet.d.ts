/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActorSheetDataPF2e } from "@actor/sheet/data-types.ts";
import { VehiclePF2e } from "@actor/vehicle/index.ts";
import { AbilityItemPF2e } from "@item";
import { ActionCost, Frequency } from "@item/data/base.ts";
import { ActorSheetPF2e } from "../sheet/base.ts";
export declare class VehicleSheetPF2e extends ActorSheetPF2e<VehiclePF2e> {
    static get defaultOptions(): ActorSheetOptions;
    getData(): Promise<VehicleSheetData>;
    activateListeners($html: JQuery): void;
}
interface AdjustedValue {
    value: number;
    adjustmentClass: "adjusted-higher" | "adjusted-lower" | null;
}
interface VehicleSheetData extends ActorSheetDataPF2e<VehiclePF2e> {
    actions: ActionsSheetData;
    actorRarities: typeof CONFIG.PF2E.rarityTraits;
    actorRarity: string;
    actorSizes: typeof CONFIG.PF2E.actorSizes;
    actorSize: string;
    ac: AdjustedValue;
    saves: {
        fortitude: AdjustedValue;
    };
}
type ActionsSheetData = Record<"action" | "reaction" | "free", {
    label: string;
    actions: ActionSheetData[];
}>;
interface ActionSheetData extends RawObject<AbilityItemPF2e> {
    id: string;
    actionCost: ActionCost | null;
    glyph: string | null;
    frequency: Frequency | null;
    hasEffect: boolean;
}
export {};
