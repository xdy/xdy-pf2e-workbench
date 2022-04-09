/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemPF2e } from "@item/base";
import { ItemSourcePF2e } from "@item/data";
import { CharacterPF2e } from ".";
import { CreatureSheetPF2e } from "../creature/sheet";
import { CharacterStrike } from "./data";
import { CraftingFormula } from "./crafting";
import { CharacterSheetData, CraftingEntriesSheetData } from "./data/sheet";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types";
export declare class CharacterSheetPF2e extends CreatureSheetPF2e<CharacterPF2e> {
    private knownFormulas;
    static get defaultOptions(): ActorSheetOptions & {
        classes: string[];
        width: number;
        height: number;
        tabs: {
            navSelector: string;
            contentSelector: string;
            initial: string;
        }[];
        showUnpreparedSpells: boolean;
    };
    get template(): string;
    getData(options?: ActorSheetOptions): Promise<CharacterSheetData>;
    /** Organize and classify Items for Character sheets */
    protected prepareItems(sheetData: ActorSheetDataPF2e<CharacterPF2e>): void;
    protected prepareSpellcasting(sheetData: CharacterSheetData): void;
    protected prepareCraftingFormulas(): Promise<Record<number, CraftingFormula[]>>;
    protected prepareCraftingEntries(): Promise<CraftingEntriesSheetData>;
    /** Disable the initiative button located on the sidebar */
    disableInitiativeButton(): void;
    /** Enable the initiative button located on the sidebar */
    enableInitiativeButton(): void;
    activateListeners($html: JQuery): void;
    /** Contextually search the feats tab of the Compendium Browser */
    private onClickBrowseFeatCompendia;
    /** Handle changing of proficiency-rank via dropdown */
    private onChangeAdjustStat;
    /** Handle clicking of proficiency-rank adjustment buttons */
    private onClickAdjustStat;
    /** Handle changing of lore and spellcasting entry proficiency-rank via dropdown */
    private onChangeAdjustItemStat;
    /** Handle clicking of lore and spellcasting entry adjustment buttons */
    private onClickAdjustItemStat;
    private onIncrementModifierValue;
    private onDecrementModifierValue;
    private onAddCustomModifier;
    private onRemoveCustomModifier;
    private isFeatValidInFeatSlot;
    /** Handle cycling of dying, wounded, or doomed */
    private onClickDyingWounded;
    private getNearestSlotId;
    protected _onDropItem(event: ElementDragEvent, data: DropCanvasData<"Item", ItemPF2e>): Promise<ItemPF2e[]>;
    protected _onDrop(event: ElementDragEvent): Promise<boolean | void>;
    /**
     * Handle a drop event for an existing Owned Item to sort that item
     * @param event
     * @param itemData
     */
    protected _onSortItem(event: ElementDragEvent, itemData: ItemSourcePF2e): Promise<ItemPF2e[]>;
    /** Get the font-awesome icon used to display a certain level of dying */
    private getDyingIcon;
    /**
     * Get the font-awesome icon used to display a certain level of wounded
     */
    private getWoundedIcon;
    /** Get the font-awesome icon used to display hero points */
    private getHeroPointsIcon;
}
export interface CharacterSheetPF2e extends CreatureSheetPF2e<CharacterPF2e> {
    getStrikeFromDOM(target: HTMLElement): CharacterStrike | null;
}
