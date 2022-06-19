/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { SheetOptions } from "@module/sheet/helpers";
import { NPCPF2e } from ".";
export declare class NPCConfig extends DocumentSheetConfig<NPCPF2e> {
    static get defaultOptions(): FormApplicationOptions;
    get title(): string;
    get actor(): NPCPF2e;
    getData(options?: Partial<FormApplicationOptions>): Promise<NPCConfigData>;
    activateListeners($html: JQuery): void;
    /** Remove stored properties if they're consistent with defaults; otherwise, store changes */
    _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface NPCConfigData extends DocumentSheetConfigData<NPCPF2e> {
    alliances: SheetOptions;
    lootable: SheetOptions;
}
export {};
