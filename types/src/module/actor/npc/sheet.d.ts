/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { CreatureSheetPF2e } from "../creature/sheet";
import { NPCPF2e } from "@actor/index";
import { NPCSheetData } from "./types";
export declare class NPCSheetPF2e<TActor extends NPCPF2e> extends CreatureSheetPF2e<TActor> {
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
    protected prepareItems(sheetData: NPCSheetData<TActor>): void;
    private getIdentifyCreatureData;
    getData(): Promise<NPCSheetData<TActor>>;
    activateListeners($html: JQuery): void;
    /** Replace sheet config with a special NPC config form application */
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    /**
     * Shim for {@link DocumentSheet#_onConfigureSheet} that will be replaced in v10 when this class subclasses it.
     */
    protected _onConfigureSheet(event: Event): void;
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
