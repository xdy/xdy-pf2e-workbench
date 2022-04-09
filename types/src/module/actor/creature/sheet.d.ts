/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "../sheet/base";
import { CreaturePF2e } from "@actor";
import { ZeroToFour } from "@module/data";
import { CreatureSheetItemRenderer } from "@actor/sheet/item-summary-renderer";
import { CharacterStrike } from "@actor/character/data";
import { NPCStrike } from "@actor/npc/data";
import { CreatureSheetData } from "./types";
/**
 * Base class for NPC and character sheets
 * @category Actor
 */
export declare abstract class CreatureSheetPF2e<TActor extends CreaturePF2e> extends ActorSheetPF2e<TActor> {
    itemRenderer: CreatureSheetItemRenderer<TActor>;
    getData(options?: ActorSheetOptions): Promise<CreatureSheetData<TActor>>;
    /** Get the font-awesome icon used to display a certain level of skill proficiency */
    protected getProficiencyIcon(level: ZeroToFour): string;
    /** Preserve browser focus on unnamed input elements when updating */
    protected _render(force?: boolean, options?: RenderOptions): Promise<void>;
    activateListeners($html: JQuery): void;
    protected getStrikeFromDOM(target: HTMLElement): CharacterStrike | NPCStrike | null;
    private onToggleSignatureSpell;
    private onClickBrowseSpellCompendia;
    protected _onSubmit(event: Event, options?: OnSubmitFormOptions): Promise<Record<string, unknown>>;
    /** Redirect an update to shield HP to the actual item */
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
