import { CreatureConfig, CreatureConfigData } from "@actor/creature/config.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import { NPCPF2e } from "./document.ts";
export declare class NPCConfig extends CreatureConfig<NPCPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<NPCConfigData>;
    /** Remove stored properties if they're consistent with defaults; otherwise, store changes */
    _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface NPCConfigData extends CreatureConfigData<NPCPF2e> {
    lootable: SheetOptions;
}
export {};
