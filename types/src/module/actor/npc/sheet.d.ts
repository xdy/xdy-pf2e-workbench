/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { CreatureSheetPF2e } from "../creature/sheet";
import { NPCPF2e } from "@actor/index";
import { ItemDataPF2e } from "@item/data";
import { SheetInventory } from "../sheet/data-types";
import { NPCSheetData } from "./types";
export declare class NPCSheetPF2e extends CreatureSheetPF2e<NPCPF2e> {
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
    protected prepareItems(sheetData: NPCSheetData): void;
    private getIdentifyCreatureData;
    getData(): Promise<NPCSheetData>;
    activateListeners($html: JQuery): void;
    private prepareAbilities;
    private prepareSize;
    private prepareAlignment;
    private prepareSkills;
    private prepareSpeeds;
    private prepareSaves;
    /**
     * Prepares the actions list to be accessible from the sheet.
     * @param sheetData Data of the actor to be shown in the sheet.
     */
    private prepareActions;
    private prepareAttacks;
    /**
     * Prepare spells and spell entries
     * @param sheetData Data of the actor to show in the sheet.
     */
    private prepareSpellcasting;
    /**
     * Prepares the equipment list of the actor.
     * @param sheetData Data of the sheet.
     */
    prepareInventory(sheetData: {
        items: ItemDataPF2e[];
    }): SheetInventory;
    private get isWeak();
    private get isElite();
    private getSizeLocalizedKey;
    private getAbilityNameKey;
    private rollPerception;
    private rollAbility;
    private onClickRollable;
    private onClickToChat;
    private onClickMakeWeak;
    private onClickMakeElite;
    private onChangeSpellcastingEntry;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
