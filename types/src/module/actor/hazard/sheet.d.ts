/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "@actor/sheet/base";
import { HazardPF2e } from ".";
import { HazardSheetData } from "./types";
export declare class HazardSheetPF2e extends ActorSheetPF2e<HazardPF2e> {
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    get title(): string;
    get editing(): boolean;
    getData(): Promise<HazardSheetData>;
    private prepareActions;
    private prepareSaves;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
