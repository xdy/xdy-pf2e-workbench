/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActorPF2e, CreaturePF2e } from "@actor";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data/index.ts";
import { SpellcastingSheetData } from "@item/spellcasting-entry/index.ts";
import { DropCanvasItemDataPF2e } from "@module/canvas/drop-canvas-data.ts";
import { ZeroToFour } from "@module/data.ts";
import { ActorSheetPF2e } from "../sheet/base.ts";
import { CreatureConfig } from "./config.ts";
import { CreatureSheetData } from "./types.ts";
/**
 * Base class for NPC and character sheets
 * @category Actor
 */
export declare abstract class CreatureSheetPF2e<TActor extends CreaturePF2e> extends ActorSheetPF2e<TActor> {
    #private;
    /** A DocumentSheet class presenting additional, per-actor settings */
    protected abstract readonly actorConfigClass: ConstructorOf<CreatureConfig<CreaturePF2e>> | null;
    getData(options?: ActorSheetOptions): Promise<CreatureSheetData<TActor>>;
    /** Opens the spell preparation sheet, but only if its a prepared entry */
    protected openSpellPreparationSheet(entryId: string): void;
    protected prepareSpellcasting(): Promise<SpellcastingSheetData[]>;
    /** Get the font-awesome icon used to display a certain level of skill proficiency */
    protected getProficiencyIcon(level: ZeroToFour): string;
    activateListeners($html: JQuery): void;
    /** Adds support for moving spells between spell levels, spell collections, and spell preparation */
    protected _onSortItem(event: ElementDragEvent, itemSource: ItemSourcePF2e): Promise<ItemPF2e<TActor>[]>;
    /** Handle dragging spells onto spell slots. */
    protected _handleDroppedItem(event: ElementDragEvent, item: ItemPF2e<ActorPF2e | null>, data: DropCanvasItemDataPF2e): Promise<ItemPF2e<ActorPF2e | null>[]>;
    /** Replace sheet config with a special PC config form application */
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    /** Redirect an update to shield HP to the actual item */
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
