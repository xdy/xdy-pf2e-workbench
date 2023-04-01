/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { CreatureSheetPF2e } from "@actor/creature/sheet";
import { NPCPF2e } from "@actor/index";
import { NPCConfig } from "./config";
import { NPCSheetData, NPCSpellcastingSheetData } from "./types";
declare class NPCSheetPF2e<TActor extends NPCPF2e> extends CreatureSheetPF2e<TActor> {
    #private;
    protected readonly actorConfigClass: typeof NPCConfig;
    static get defaultOptions(): ActorSheetOptions;
    /** Show either the actual NPC sheet or a briefened lootable version if the NPC is dead */
    get template(): string;
    /** Use the token name as the title if showing a lootable NPC sheet */
    get title(): string;
    get isLootSheet(): boolean;
    /**
     * Prepares items in the actor for easier access during sheet rendering.
     * @param sheetData Data from the actor associated to this sheet.
     */
    prepareItems(sheetData: NPCSheetData<TActor>): Promise<void>;
    getData(): Promise<NPCSheetData<TActor>>;
    activateListeners($html: JQuery): void;
    protected prepareSpellcasting(): Promise<NPCSpellcastingSheetData[]>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
export { NPCSheetPF2e };
