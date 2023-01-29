/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetDataPF2e } from "@actor/sheet/data-types";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
import { DropCanvasItemDataPF2e } from "@module/canvas/drop-canvas-data";
import { CharacterPF2e } from ".";
import { CreatureSheetPF2e } from "../creature/sheet";
import { CharacterConfig } from "./config";
import { CraftingFormula } from "./crafting";
import { CharacterStrike } from "./data";
import { CharacterSheetData, CraftingEntriesSheetData } from "./data/sheet";
declare class CharacterSheetPF2e extends CreatureSheetPF2e<CharacterPF2e> {
    #private;
    protected readonly actorConfigClass: typeof CharacterConfig;
    /** A cache of this PC's known formulas, for use by sheet callbacks */
    private knownFormulas;
    /** Non-persisted tweaks to formula data */
    private formulaQuantities;
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(options?: ActorSheetOptions): Promise<CharacterSheetData>;
    /** Organize and classify Items for Character sheets */
    prepareItems(sheetData: ActorSheetDataPF2e<CharacterPF2e>): Promise<void>;
    protected prepareCraftingFormulas(): Promise<Record<number, CraftingFormula[]>>;
    protected prepareCraftingEntries(): Promise<CraftingEntriesSheetData>;
    private prepareFeats;
    /** Disable the initiative button located on the sidebar */
    disableInitiativeButton(): void;
    /** Enable the initiative button located on the sidebar */
    enableInitiativeButton(): void;
    activateListeners($html: JQuery): void;
    protected _onDropItem(event: ElementDragEvent, data: DropCanvasItemDataPF2e): Promise<ItemPF2e[]>;
    protected _onDrop(event: ElementDragEvent): Promise<boolean | void>;
    /** Handle a drop event for an existing Owned Item to sort that item */
    protected _onSortItem(event: ElementDragEvent, itemData: ItemSourcePF2e): Promise<ItemPF2e[]>;
    /** Get the font-awesome icon used to display hero points */
    private getHeroPointsIcon;
}
interface CharacterSheetPF2e extends CreatureSheetPF2e<CharacterPF2e> {
    getStrikeFromDOM(target: HTMLElement): CharacterStrike | null;
}
export { CharacterSheetPF2e };
