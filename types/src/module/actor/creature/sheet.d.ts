/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ActorPF2e, CreaturePF2e } from "@actor";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types.ts";
import { AttributeString, SaveType } from "@actor/types.ts";
import { type ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { SpellcastingSheetData } from "@item/spellcasting-entry/index.ts";
import { DropCanvasItemDataPF2e } from "@module/canvas/drop-canvas-data.ts";
import { ZeroToFour } from "@module/data.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import { ActorSheetPF2e, SheetClickActionHandlers } from "../sheet/base.ts";
import { CreatureConfig } from "./config.ts";
import { AbilityData, CreatureSystemData, SaveData, SkillData } from "./data.ts";
/**
 * Base class for NPC and character sheets
 * @category Actor
 */
declare abstract class CreatureSheetPF2e<TActor extends CreaturePF2e> extends ActorSheetPF2e<TActor> {
    #private;
    /** A DocumentSheet class presenting additional, per-actor settings */
    protected abstract readonly actorConfigClass: ConstructorOf<CreatureConfig<CreaturePF2e>> | null;
    getData(options?: Partial<ActorSheetOptions>): Promise<CreatureSheetData<TActor>>;
    /** Opens the spell preparation sheet, but only if its a prepared entry */
    protected openSpellPreparationSheet(entryId: string): void;
    protected prepareSpellcasting(): Promise<SpellcastingSheetData[]>;
    /** Get the font-awesome icon used to display a certain level of skill proficiency */
    protected getProficiencyIcon(level: ZeroToFour): string;
    activateListeners($html: JQuery): void;
    protected activateClickListener(html: HTMLElement): SheetClickActionHandlers;
    /** Adds support for moving spells between spell levels, spell collections, and spell preparation */
    protected _onSortItem(event: DragEvent, itemSource: ItemSourcePF2e): Promise<CollectionValue<TActor["items"]>[]>;
    /** Handle dragging spells onto spell slots. */
    protected _handleDroppedItem(event: DragEvent, item: ItemPF2e<ActorPF2e | null>, data: DropCanvasItemDataPF2e): Promise<ItemPF2e<ActorPF2e | null>[]>;
    /** Replace sheet config with a special PC config form application */
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    /** Redirect an update to shield HP to the actual item */
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
type WithRank = {
    icon?: string;
    hover?: string;
    rank: ZeroToFour;
};
interface CreatureSheetData<TActor extends CreaturePF2e> extends ActorSheetDataPF2e<TActor> {
    data: CreatureSystemData & {
        abilities: Record<AttributeString, AbilityData & {
            label?: string;
        }>;
        attributes: {
            perception: CreatureSystemData["attributes"]["perception"] & WithRank;
        };
        saves: Record<SaveType, SaveData & WithRank>;
        skills: Record<string, SkillData & WithRank>;
    };
    languages: SheetOptions;
    abilities: typeof CONFIG.PF2E.abilities;
    actorSizes: typeof CONFIG.PF2E.actorSizes;
    rarity: typeof CONFIG.PF2E.rarityTraits;
    frequencies: typeof CONFIG.PF2E.frequencies;
    attitude: typeof CONFIG.PF2E.attitude;
    pfsFactions: typeof CONFIG.PF2E.pfsFactions;
    dying: {
        maxed: boolean;
        remainingDying: number;
        remainingWounded: number;
    };
}
export { CreatureSheetPF2e, type CreatureSheetData };
