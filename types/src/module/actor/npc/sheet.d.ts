/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { NPCPF2e } from "@actor";
import { CreatureSheetPF2e } from "@actor/creature/sheet.ts";
import { SheetClickActionHandlers } from "@actor/sheet/base.ts";
import type { UserPF2e } from "@module/user/document.ts";
import { NPCConfig } from "./config.ts";
import { NPCSheetData, NPCSpellcastingSheetData } from "./types.ts";
declare abstract class AbstractNPCSheet extends CreatureSheetPF2e<NPCPF2e> {
    #private;
    protected readonly actorConfigClass: typeof NPCConfig;
    static get defaultOptions(): ActorSheetOptions;
    /**
     * Prepares items in the actor for easier access during sheet rendering.
     * @param sheetData Data from the actor associated to this sheet.
     */
    prepareItems(sheetData: NPCSheetData): Promise<void>;
    getData(options?: Partial<ActorSheetOptions>): Promise<NPCSheetData>;
    /** Players can view the sheets of lootable NPCs. */
    protected _canUserView(user: UserPF2e): boolean;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected activateClickListener(html: HTMLElement): SheetClickActionHandlers;
}
declare class NPCSheetPF2e extends AbstractNPCSheet {
    #private;
    static get defaultOptions(): ActorSheetOptions;
    /** Show either the actual NPC sheet or a briefened lootable version if the NPC is dead */
    get template(): string;
    /** Use the token name as the title if showing a lootable NPC sheet */
    get title(): string;
    getData(options?: Partial<ActorSheetOptions>): Promise<NPCSheetData>;
    prepareItems(sheetData: NPCSheetData): Promise<void>;
    protected prepareSpellcasting(): Promise<NPCSpellcastingSheetData[]>;
    activateListeners($html: JQuery): void;
    protected activateClickListener(html: HTMLElement): SheetClickActionHandlers;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
declare class SimpleNPCSheet extends AbstractNPCSheet {
    static get defaultOptions(): ActorSheetOptions;
}
export { AbstractNPCSheet, NPCSheetPF2e, SimpleNPCSheet };
